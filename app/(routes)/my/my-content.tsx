'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BottomNavigation } from '@/widgets/bottom-navigation';
import { PickGridCard } from '@/widgets/pick-grid-card';
import { useProfile } from '@/widgets/profile-form';

import { useMyPicks, useSavedPicks } from '@/entities/pick';

import { AppBar } from '@/shared/ui/app-bar';
import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Tabs } from '@/shared/ui/tabs';

type PickTab = 'mine' | 'saved';

const PICK_TABS = [
  { value: 'mine', label: '내 Pick' },
  { value: 'saved', label: '저장한 Pick' },
];

const EMPTY_MESSAGE: Record<PickTab, string> = {
  mine: '아직 만든 Pick이 없어요.',
  saved: '아직 저장한 Pick이 없어요.',
};

export function MyContent() {
  const router = useRouter();
  const [tab, setTab] = useState<PickTab>('mine');

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: myPicks, isLoading: isMyPicksLoading } = useMyPicks();
  const { data: savedPicks, isLoading: isSavedPicksLoading } = useSavedPicks();

  const picks = tab === 'mine' ? myPicks : savedPicks;
  const isPicksLoading = tab === 'mine' ? isMyPicksLoading : isSavedPicksLoading;

  return (
    <div className="container-app min-h-dvh pb-24">
      <AppBar>
        <AppBar.Title>My</AppBar.Title>
        <AppBar.RightAction
          icon="settings"
          label="설정"
          onClick={() => router.push('/my/settings')}
        />
      </AppBar>

      <div className="pt-15">
        <section className="bg-surface-brand-subtle flex flex-col gap-4 p-6">
          {isProfileLoading || !profile ? (
            <p className="typo-body-s text-text-secondary py-6 text-center">불러오는 중이에요…</p>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Avatar size="card" src={profile.avatarUrl} alt={profile.nickname} />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="typo-label-l text-text-primary line-clamp-1">{profile.nickname}</p>
                  {profile.bio && (
                    <p className="typo-body-s text-text-secondary line-clamp-2">{profile.bio}</p>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={() => router.push('/my/profile')}>
                프로필 편집
              </Button>
            </>
          )}
        </section>

        <Tabs
          items={PICK_TABS}
          value={tab}
          onChange={(value) => setTab(value as PickTab)}
          className="bg-surface-background sticky top-15 z-5"
        />

        <div className="p-4">
          {isPicksLoading ? (
            <p className="typo-body-s text-text-secondary py-16 text-center">불러오는 중이에요…</p>
          ) : !picks || picks.length === 0 ? (
            <p className="typo-body-s text-text-secondary py-16 text-center">
              {EMPTY_MESSAGE[tab]}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {picks.map((pick) => (
                <PickGridCard key={pick.id} pick={pick} showAuthor={tab === 'saved'} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-app pointer-events-none fixed inset-x-0 bottom-20 z-10 flex justify-end px-6">
        <Button
          variant="primary"
          size="icon"
          aria-label="Pick 만들기"
          onClick={() => router.push('/collections/new')}
          className="pointer-events-auto rounded-full shadow-lg"
        >
          <Icon name="plus" size="md" />
        </Button>
      </div>
      <BottomNavigation />
    </div>
  );
}
