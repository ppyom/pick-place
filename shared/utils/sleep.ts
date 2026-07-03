/**
 * 지정한 시간(ms) 동안 실행을 지연합니다.
 *
 * @param ms 대기 시간(ms)
 * @returns 지정한 시간이 지난 후 완료되는 Promise
 */
export function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
