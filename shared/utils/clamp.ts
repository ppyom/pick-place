/**
 * 값을 지정한 범뮈 내로 제한합니다.
 *
 * @param value 제한할 값
 * @param min 최소값
 * @param max 최대값
 * @returns 범위 내로 제한된 값
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
