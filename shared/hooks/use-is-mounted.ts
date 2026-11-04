import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * 클라이언트에 마운트된 이후(true)인지 여부를 반환합니다.
 * `createPortal` 등 `document`가 필요한 로직에서 SSR/hydration mismatch를 피하기 위해 사용합니다.
 *
 * `useEffect` 내부에서 `setState`를 호출하면 cascading render를 유발한다는
 * `react-hooks/set-state-in-effect` 룰을 피하기 위해 `useSyncExternalStore`로 구현합니다.
 */
export function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}
