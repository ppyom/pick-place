'use client';

import { useEffect, useRef } from 'react';

interface Options {
  onIntersect: () => void;
  enabled?: boolean;
}

/**
 * 반환된 ref를 리스트 하단의 sentinel 엘리먼트에 붙이면,
 * 해당 엘리먼트가 뷰포트에 들어올 때 onIntersect를 호출합니다.
 */
export function useInfiniteScroll<T extends Element>({ onIntersect, enabled = true }: Options) {
  const targetRef = useRef<T>(null);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersectRef.current();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [enabled]);

  return targetRef;
}
