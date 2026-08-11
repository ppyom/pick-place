import { ToastProvider } from '@/shared/ui/toast';

import { QueryProvider } from './query/query-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </QueryProvider>
  );
}
