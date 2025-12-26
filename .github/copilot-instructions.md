# GitHub Copilot Instructions - SUPREMA BELEZA

## Critical Rules

### 1. NO Hardcoded Colors
NEVER suggest:
- `#D4AF37`, `#1A1A1A`, `#fff`, `#000`
- `bg-white`, `bg-gray-*`, `text-gray-*`, `text-white`

ALWAYS suggest:
- `bg-[var(--color-background)]`
- `bg-[var(--color-surface)]`
- `text-[var(--color-foreground)]`
- `text-[var(--color-muted)]`
- `border-[var(--color-border)]`
- Or use Tailwind classes mapped to CSS variables: `bg-background`, `text-foreground`, `text-muted`, `border-border`

### 2. Use shadcn/ui Components
NEVER suggest custom divs/buttons when a component exists
ALWAYS suggest imports from '@/components/ui/':
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
```

### 3. Real Data Only
NEVER suggest mock arrays, fake data, or placeholder arrays
ALWAYS suggest Supabase queries via hooks:
```typescript
import { useProducts } from '@/hooks/useProducts'
import { useSalons } from '@/hooks/useSalons'
import { useAppointments } from '@/hooks/useAppointments'
import { supabase } from '@/lib/supabaseClient'
```

### 4. Dynamic Themes
ALWAYS use CSS variables from `src/styles/theme.css`
NEVER hardcode theme values
Theme toggle is functional via `AppContext`

### 5. Required UI States
ALWAYS include loading, error, and empty states for pages with Supabase data:
```typescript
const { data, loading, error } = useHook()

if (loading) return <Loader />
if (error) return <Error message={error} />
if (!data.length) return <EmptyState />
```

### 6. Canonical Structure
Follow this structure:
```
src/
├── components/ui/     # shadcn/ui (DO NOT MODIFY)
├── components/layout/ # SupremeHeader, SupremeFooter
├── hooks/             # useAuth, useProducts, useSalons, etc.
├── lib/               # supabaseClient.ts (UNIQUE)
├── styles/theme.css   # SSOT for variables
```

### 7. Single Supabase Client
ALWAYS import from '@/lib/supabaseClient':
```typescript
import { supabase } from '@/lib/supabaseClient'
```
NEVER create new Supabase clients

## Pre-Commit Validation
Before suggesting code, ensure:
- No hex colors in src/ (except assets)
- No hardcoded Tailwind color classes
- No mock/fake/placeholder data
- Build passes: `npm run build`

## Project Context
SUPREMA BELEZA 5.0 — Premium beauty platform with 18 AI agents, AR try-on, luxury e-commerce.

Stack: React 19 + TypeScript + Vite + Tailwind + shadcn/ui + Supabase + Gemini 2.5

