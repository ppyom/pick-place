'use client';

import { useContext } from 'react';

import { PROVIDER_ERROR_MESSAGE } from './constants';
import { ToastContext } from './toast-context';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(PROVIDER_ERROR_MESSAGE);
  }

  return context;
}
