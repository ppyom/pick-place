'use client';

import { createContext } from 'react';

interface ToastContextValue {
  showToast: (message: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
