'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteAccount, logout } from '@/entities/session';

import { APP_VERSION } from '@/shared/config/app';
import { AppBar } from '@/shared/ui/app-bar';
import { ListItem } from '@/shared/ui/list-item';

type PendingAction = 'logout' | 'withdraw' | null;

export function SettingsContent() {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  async function handleLogout() {
    setPendingAction('logout');
    await logout();
    router.push('/login');
  }

  async function handleWithdraw() {
    setPendingAction('withdraw');
    await deleteAccount();
    router.push('/login');
  }

  return (
    <div className="container-app min-h-dvh">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Title>설정</AppBar.Title>
      </AppBar>

      <div className="space-y-4 pt-15 pb-8">
        <section className="space-y-2 px-6 pt-4">
          <p className="typo-label-m text-text-tertiary">계정</p>
          <ListItem label="프로필 편집" href="/my/profile" />
          <ListItem label="관심사 설정" href="/my/interests" />
          <ListItem
            label={pendingAction === 'logout' ? '로그아웃 중…' : '로그아웃'}
            onClick={handleLogout}
            disabled={pendingAction !== null}
          />
          <ListItem
            label={pendingAction === 'withdraw' ? '탈퇴 처리 중…' : '회원 탈퇴'}
            variant="danger"
            onClick={handleWithdraw}
            disabled={pendingAction !== null}
          />
        </section>

        <section className="space-y-2 px-6">
          <p className="typo-label-m text-text-tertiary">앱</p>
          <ListItem label="개인정보 처리방침" href="/policy/privacy" />
          <ListItem label="서비스 이용약관" href="/policy/terms" />
          <ListItem label="버전" value={APP_VERSION} />
        </section>
      </div>
    </div>
  );
}
