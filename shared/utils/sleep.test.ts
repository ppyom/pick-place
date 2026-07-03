import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { sleep } from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('지정한 시간이 지나기 전에는 resolve되지 않는다', async () => {
    let resolved = false;
    void sleep(1000).then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(999);

    expect(resolved).toBe(false);
  });

  it('지정한 시간이 지나면 resolve된다', async () => {
    let resolved = false;
    void sleep(1000).then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(1000);

    expect(resolved).toBe(true);
  });
});
