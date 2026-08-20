'use client';

import { useState } from 'react';

import { BottomNavigation } from '@/widgets/bottom-navigation';
import { CategoryFilterBar } from '@/widgets/category-filter-bar';
import { PickGridCard } from '@/widgets/pick-grid-card';

import { DEFAULT_PICK_CATEGORY_ID, PICK_CATEGORIES, useExplorePicks } from '@/entities/pick';

import { AppBar } from '@/shared/ui/app-bar';

export function ExploreContent() {
  const [categoryId, setCategoryId] = useState(DEFAULT_PICK_CATEGORY_ID);
  const { data: picks = [], isLoading } = useExplorePicks(categoryId);

  return (
    <div className="container-app min-h-dvh pb-24">
      <AppBar>
        <AppBar.Title>탐색</AppBar.Title>
      </AppBar>

      <div className="pt-15">
        <div className="bg-surface-background sticky top-15 z-10">
          <CategoryFilterBar
            categories={PICK_CATEGORIES}
            selectedId={categoryId}
            onSelect={setCategoryId}
          />
        </div>

        {isLoading ? (
          <p className="typo-body-s text-text-secondary py-16 text-center">불러오는 중이에요…</p>
        ) : picks.length === 0 ? (
          <p className="typo-body-s text-text-secondary py-16 text-center">
            해당 카테고리의 Pick이 아직 없어요.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 p-4">
            {picks.map((pick) => (
              <li key={pick.id}>
                <PickGridCard pick={pick} className="h-full" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
