import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { submitOnboardingSelection } from '../api/submit-onboarding-selection';
import { useOnboardingSubmit } from './use-onboarding-submit';

const push = vi.fn();
let searchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => searchParams,
}));

vi.mock('../api/submit-onboarding-selection', () => ({
  submitOnboardingSelection: vi.fn(),
}));

const SELECTION = { interests: ['food'], companion: ['solo'], region: ['seoul'] };

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return Wrapper;
}

describe('useOnboardingSubmit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams = new URLSearchParams();
    vi.mocked(submitOnboardingSelection).mockResolvedValue(undefined);
  });

  it('선택값으로 submitOnboardingSelection을 호출한다', async () => {
    const { result } = renderHook(() => useOnboardingSubmit(), { wrapper: createWrapper() });

    act(() => result.current.handleComplete(SELECTION));

    await waitFor(() =>
      expect(submitOnboardingSelection).toHaveBeenCalledWith(SELECTION, expect.anything()),
    );
  });

  it('redirect 쿼리가 없으면 기본 경로(/)로 이동한다', async () => {
    const { result } = renderHook(() => useOnboardingSubmit(), { wrapper: createWrapper() });

    act(() => result.current.handleComplete(SELECTION));

    await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
  });

  it('redirect 쿼리가 있으면 해당 경로로 이동한다', async () => {
    searchParams = new URLSearchParams({ redirect: '/my/settings' });
    const { result } = renderHook(() => useOnboardingSubmit(), { wrapper: createWrapper() });

    act(() => result.current.handleComplete(SELECTION));

    await waitFor(() => expect(push).toHaveBeenCalledWith('/my/settings'));
  });

  it('외부 도메인 redirect는 무시하고 기본 경로로 이동한다', async () => {
    searchParams = new URLSearchParams({ redirect: '//evil.com' });
    const { result } = renderHook(() => useOnboardingSubmit(), { wrapper: createWrapper() });

    act(() => result.current.handleComplete(SELECTION));

    await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
  });
});
