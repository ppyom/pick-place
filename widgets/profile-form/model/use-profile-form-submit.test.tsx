import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { saveProfile } from '../api/save-profile';
import { useProfileFormSubmit } from './use-profile-form-submit';

const push = vi.fn();
const showToast = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

vi.mock('@/shared/ui/toast', () => ({
  useToast: () => ({ showToast }),
}));

vi.mock('../api/save-profile', () => ({
  saveProfile: vi.fn(),
}));

const VALUES = { nickname: '놀러가요', bio: '맛집 기록' };

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return Wrapper;
}

describe('useProfileFormSubmit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(saveProfile).mockResolvedValue(undefined);
  });

  it('저장 성공 시 성공 토스트를 띄우고 redirectPath로 이동한다', async () => {
    const { result } = renderHook(() => useProfileFormSubmit({ redirectPath: '/onboarding' }), {
      wrapper: createWrapper(),
    });

    act(() => result.current.handleSubmit(VALUES));

    await waitFor(() => expect(push).toHaveBeenCalledWith('/onboarding'));
    expect(showToast).toHaveBeenCalledWith('프로필이 저장되었어요.');
  });

  it('진입 컨텍스트에 따라 다른 경로로 이동한다', async () => {
    const { result } = renderHook(() => useProfileFormSubmit({ redirectPath: '/my' }), {
      wrapper: createWrapper(),
    });

    act(() => result.current.handleSubmit(VALUES));

    await waitFor(() => expect(push).toHaveBeenCalledWith('/my'));
  });

  it('아바타 파일이 선택된 경우 saveProfile에 함께 전달한다', async () => {
    const { result } = renderHook(() => useProfileFormSubmit({ redirectPath: '/onboarding' }), {
      wrapper: createWrapper(),
    });
    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });

    act(() => result.current.handleAvatarChange(file));
    act(() => result.current.handleSubmit(VALUES));

    await waitFor(() => expect(saveProfile).toHaveBeenCalledWith({ ...VALUES, avatarFile: file }));
  });

  it('저장 실패 시 에러 토스트를 띄우고 이동하지 않는다', async () => {
    vi.mocked(saveProfile).mockRejectedValue(new Error('network error'));
    const { result } = renderHook(() => useProfileFormSubmit({ redirectPath: '/onboarding' }), {
      wrapper: createWrapper(),
    });

    act(() => result.current.handleSubmit(VALUES));

    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('프로필 저장에 실패했어요. 다시 시도해주세요.'),
    );
    expect(push).not.toHaveBeenCalled();
  });
});
