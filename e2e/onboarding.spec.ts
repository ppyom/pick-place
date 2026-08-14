import { expect, test } from '@playwright/test';

test.describe('온보딩 페이지', () => {
  test('첫 스텝이 정상적으로 노출된다', async ({ page }) => {
    const response = await page.goto('/onboarding');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
    await expect(page.getByRole('button', { name: '이전' })).not.toBeVisible();
  });

  test('선택 없이 건너뛰기로 3단계를 모두 완료하면 홈으로 리다이렉트된다', async ({ page }) => {
    await page.goto('/onboarding');

    await page.getByRole('button', { name: '건너뛰기' }).click();
    await page.getByRole('button', { name: '건너뛰기' }).click();
    await page.getByRole('button', { name: '건너뛰기' }).click();

    await page.waitForURL('/');
  });

  test('옵션 선택 후 다음으로 진행하다 마지막에 시작하기를 누르면 완료된다', async ({ page }) => {
    await page.goto('/onboarding');

    await page.getByRole('button', { name: '맛집' }).click();
    await page.getByRole('button', { name: '다음' }).click();

    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');

    await page.getByRole('button', { name: '다음' }).click();
    await expect(page.getByRole('button', { name: '시작하기' })).toBeVisible();

    await page.getByRole('button', { name: '시작하기' }).click();

    await page.waitForURL('/');
  });

  test('redirect 쿼리로 진입하면 완료 후 해당 경로로 이동한다', async ({ page }) => {
    await page.goto('/onboarding?redirect=%2Fmy%2Fsettings');

    await page.getByRole('button', { name: '건너뛰기' }).click();
    await page.getByRole('button', { name: '건너뛰기' }).click();
    await page.getByRole('button', { name: '건너뛰기' }).click();

    await page.waitForURL('/my/settings');
  });
});
