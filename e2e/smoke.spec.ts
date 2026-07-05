import { expect, test } from '@playwright/test';

test('홈 페이지가 정상적으로 응답한다', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBeLessThan(400);
});
