'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { logout } from '@/entities/session';

import { AppBar } from '@/shared/ui/app-bar';
import { Divider } from '@/shared/ui/divider';

export function SettingsContent() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await logout();
    router.push('/login');
  }

  return (
    <div className="container-app min-h-dvh">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Title>설정</AppBar.Title>
      </AppBar>

      <div className="pt-15">
        <Divider />
        <button
          type="button"
          onClick={handleLogout}
          aria-disabled={isLoggingOut}
          className="typo-body-m text-text-primary flex h-13 w-full items-center px-6 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? '로그아웃 중…' : '로그아웃'}
        </button>
        <Divider />
      </div>
    </div>
  );
}
