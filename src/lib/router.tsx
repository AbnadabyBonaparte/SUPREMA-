import React, { ReactNode, Suspense, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface RouteObject {
  path?: string;
  index?: boolean;
  element: ReactNode;
  children?: RouteObject[];
}

export interface Router {
  routes: RouteObject[];
}

interface RouterContextValue {
  location: { pathname: string };
  navigate: (to: string, options?: { replace?: boolean; state?: any }) => void;
  params: Record<string, string>;
}

const RouterContext = React.createContext<RouterContextValue | null>(null);
const OutletContext = React.createContext<ReactNode>(null);

interface MatchResult {
  matches: RouteObject[];
  params: Record<string, string>;
}

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$|\s+/g, '');

const matchPath = (pattern: string | undefined, pathname: string): { matched: boolean; remaining: string; params: Record<string, string> } => {
  if (!pattern || pattern === '/') {
    return { matched: true, remaining: trimSlashes(pathname), params: {} };
  }

  if (pattern === '*') {
    return { matched: true, remaining: '', params: {} };
  }

  const patternParts = trimSlashes(pattern).split('/').filter(Boolean);
  const pathParts = trimSlashes(pathname).split('/').filter(Boolean);

  if (patternParts.length > pathParts.length) {
    return { matched: false, remaining: pathname, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const currentPattern = patternParts[i];
    const currentPath = pathParts[i];

    if (!currentPath) {
      return { matched: false, remaining: pathname, params: {} };
    }

    if (currentPattern.startsWith(':')) {
      params[currentPattern.slice(1)] = decodeURIComponent(currentPath);
      continue;
    }

    if (currentPattern !== currentPath) {
      return { matched: false, remaining: pathname, params: {} };
    }
  }

  const remainingParts = pathParts.slice(patternParts.length).join('/');
  return { matched: true, remaining: remainingParts, params };
};

const findMatches = (routes: RouteObject[], pathname: string, inheritedParams: Record<string, string> = {}): MatchResult | null => {
  for (const route of routes) {
    if (route.index) {
      const isRoot = trimSlashes(pathname) === '';
      if (isRoot) {
        return { matches: [route], params: { ...inheritedParams } };
      }
      continue;
    }

    const { matched, remaining, params } = matchPath(route.path, pathname);
    if (!matched) continue;

    const combinedParams = { ...inheritedParams, ...params };

    if (route.children) {
      const childMatch = findMatches(route.children, remaining, combinedParams);
      if (childMatch) {
        return { matches: [route, ...childMatch.matches], params: childMatch.params };
      }
    }

    if (!remaining || remaining.length === 0) {
      return { matches: [route], params: combinedParams };
    }
  }

  return null;
};

export const createBrowserRouter = (routes: RouteObject[]): Router => ({ routes });

const renderMatches = (matches: RouteObject[], params: Record<string, string>) => {
  return matches.reduceRight<ReactNode>((child, match) => {
    const element = match.element ?? null;
    return (
      <OutletContext.Provider value={child}>
        {typeof element === 'function' ? (element as () => ReactNode)() : element}
      </OutletContext.Provider>
    );
  }, null);
};

export const RouterProvider: React.FC<{ router: Router; fallback?: ReactNode }> = ({ router, fallback = null }) => {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  const navigate = useCallback((to: string, options?: { replace?: boolean; state?: any }) => {
    if (options?.replace) {
      window.history.replaceState(options?.state ?? null, '', to);
    } else {
      window.history.pushState(options?.state ?? null, '', to);
    }
    setPathname(to.startsWith('/') ? to : `/${trimSlashes(to)}`);
  }, []);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const matched = useMemo(() => findMatches(router.routes, pathname), [pathname, router.routes]);
  const content = matched ? renderMatches(matched.matches, matched.params) : fallback;

  const contextValue = useMemo<RouterContextValue>(() => ({
    location: { pathname },
    navigate,
    params: matched?.params ?? {}
  }), [navigate, pathname, matched?.params]);

  return (
    <RouterContext.Provider value={contextValue}>
      <Suspense fallback={fallback}>
        {content}
      </Suspense>
    </RouterContext.Provider>
  );
};

export const Outlet: React.FC = () => {
  const outlet = useContext(OutletContext);
  return <>{outlet}</>;
};

export const useLocation = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useLocation must be used within RouterProvider');
  return context.location;
};

export const useNavigate = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useNavigate must be used within RouterProvider');
  return context.navigate;
};

export const useParams = <T extends Record<string, string | undefined> = Record<string, string>>() => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useParams must be used within RouterProvider');
  return context.params as T;
};

export const Navigate: React.FC<{ to: string; replace?: boolean; state?: any }> = ({ to, replace }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, to, replace]);
  return null;
};

export const Link: React.FC<{ to: string; children: ReactNode; replace?: boolean }>
  = ({ to, children, replace }) => {
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      navigate(to, { replace });
    };
    return <a href={to} onClick={handleClick}>{children}</a>;
  };

export default RouterProvider;
