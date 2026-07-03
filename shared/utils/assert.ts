/**
 * 조건이 참인지 확인합니다.
 *
 * 조건이 거짓이라면 Error를 발생시키며 이후 코드에서 해당 값의 타입이 좁혀집니다.
 *
 * @param condition 확인할 조건
 * @param message 조건이 거짓일 경우 사용할 에러 메시지
 * @throws {Error} 조건이 거짓인 경우
 */
export function assert(condition: unknown, message = 'Assertion failed'): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
