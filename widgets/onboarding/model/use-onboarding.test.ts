import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ONBOARDING_STEPS } from '../config/steps';
import { useOnboarding } from './use-onboarding';

const LAST_INDEX = ONBOARDING_STEPS.length - 1;

describe('useOnboarding', () => {
  describe('초기 상태', () => {
    it('첫 스텝에서 시작하고 선택값은 비어있다', () => {
      const { result } = renderHook(() => useOnboarding());

      expect(result.current.stepIndex).toBe(0);
      expect(result.current.currentStep).toBe(ONBOARDING_STEPS[0]);
      expect(result.current.isFirst).toBe(true);
      expect(result.current.isLast).toBe(false);
      expect(result.current.selection).toEqual({
        interests: [],
        companion: [],
        region: [],
      });
    });
  });

  describe('toggleOption (multi)', () => {
    it('선택 시 값이 쌓인다', () => {
      const { result } = renderHook(() => useOnboarding());

      act(() => result.current.toggleOption('interests', 'food'));
      act(() => result.current.toggleOption('interests', 'cafe'));

      expect(result.current.selection.interests).toEqual(['food', 'cafe']);
    });

    it('같은 값을 다시 누르면 해제된다', () => {
      const { result } = renderHook(() => useOnboarding());

      act(() => result.current.toggleOption('interests', 'food'));
      act(() => result.current.toggleOption('interests', 'food'));

      expect(result.current.selection.interests).toEqual([]);
    });

    it('스텝별 선택값은 서로 섞이지 않는다', () => {
      const { result } = renderHook(() => useOnboarding());

      act(() => result.current.toggleOption('interests', 'food'));
      act(() => result.current.toggleOption('companion', 'solo'));

      expect(result.current.selection.interests).toEqual(['food']);
      expect(result.current.selection.companion).toEqual(['solo']);
      expect(result.current.selection.region).toEqual([]);
    });
  });

  describe('goNext / goPrev 경계', () => {
    it('goNext로 다음 스텝으로 이동한다', () => {
      const { result } = renderHook(() => useOnboarding());

      act(() => result.current.goNext());

      expect(result.current.stepIndex).toBe(1);
      expect(result.current.isFirst).toBe(false);
    });

    it('첫 스텝에서 goPrev를 눌러도 인덱스가 음수로 깨지지 않는다', () => {
      const { result } = renderHook(() => useOnboarding());

      act(() => result.current.goPrev());

      expect(result.current.stepIndex).toBe(0);
      expect(result.current.isFirst).toBe(true);
    });

    it('마지막 스텝에서 goNext를 눌러도 인덱스가 넘어가지 않는다', () => {
      const { result } = renderHook(() => useOnboarding());

      act(() => {
        for (let i = 0; i < ONBOARDING_STEPS.length; i += 1) {
          result.current.goNext();
        }
      });

      expect(result.current.stepIndex).toBe(LAST_INDEX);
      expect(result.current.isLast).toBe(true);
    });
  });

  describe('reset', () => {
    it('스텝 인덱스와 선택값을 모두 초기화한다', () => {
      const { result } = renderHook(() => useOnboarding());

      act(() => result.current.toggleOption('interests', 'food'));
      act(() => result.current.goNext());
      act(() => result.current.reset());

      expect(result.current.stepIndex).toBe(0);
      expect(result.current.selection).toEqual({
        interests: [],
        companion: [],
        region: [],
      });
    });
  });
});
