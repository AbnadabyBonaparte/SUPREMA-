// src/components/ui/use-toast.ts
import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
}

const toasts: Toast[] = [];
const listeners: Array<(toasts: Toast[]) => void> = [];

let toastCount = 0;

function genId() {
  toastCount = (toastCount + 1) % Number.MAX_VALUE;
  return toastCount.toString();
}

function addToast(toast: Omit<Toast, 'id'>) {
  const id = genId();
  const newToast = { ...toast, id };
  toasts.push(newToast);
  listeners.forEach((listener) => listener([...toasts]));

  const duration = toast.duration || 3000;
  setTimeout(() => {
    removeToast(id);
  }, duration);

  return id;
}

function removeToast(id: string) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) {
    toasts.splice(index, 1);
    listeners.forEach((listener) => listener([...toasts]));
  }
}

export function useToast() {
  const [, setToastList] = useState<Toast[]>([...toasts]);

  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    return addToast(props);
  }, []);

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, []);

  return {
    toast,
    dismiss,
    toasts: [...toasts]
  };
}

export const toast = {
  success: (description: string, title = 'Sucesso!') => 
    addToast({ title, description, variant: 'success' }),
  
  error: (description: string, title = 'Erro!') => 
    addToast({ title, description, variant: 'error' }),
  
  warning: (description: string, title = 'Atenção!') => 
    addToast({ title, description, variant: 'warning' }),
  
  info: (description: string, title = 'Info') => 
    addToast({ title, description, variant: 'default' })
};
