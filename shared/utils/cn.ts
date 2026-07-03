import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스 이름을 조건에 따라 병합하고 중복되는 Tailwind CSS 클래스를 정리합니다.
 *
 * @param classNames 병합할 클래스 목록
 * @returns 병합된 클래스 문자열
 */
export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
