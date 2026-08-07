'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'recent-searches';
const MAX_ITEMS = 10;
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (cache === null) {
    cache = readFromStorage();
  }
  return cache;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function persist(next: string[]) {
  cache = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

export function useRecentSearches() {
  const terms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addTerm = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    const next = [trimmed, ...getSnapshot().filter((t) => t !== trimmed)].slice(0, MAX_ITEMS);
    persist(next);
  }, []);

  const removeTerm = useCallback((term: string) => {
    persist(getSnapshot().filter((t) => t !== term));
  }, []);

  const clearAll = useCallback(() => {
    persist([]);
  }, []);

  return { terms, addTerm, removeTerm, clearAll };
}

/** @internal 테스트에서만 사용 — 모듈 스코프 캐시 초기화 */
export function __resetRecentSearchesStoreForTests() {
  cache = null;
}
