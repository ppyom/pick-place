import { expect, test } from '@playwright/test';

test.describe('로그인 페이지', () => {
  test('OAuth 버튼이 모두 노출된다', async ({ page }) => {
    const response = await page.goto('/login');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole('button', { name: '카카오로 시작하기' })).toBeVisible();
    await expect(page.getByRole('button', { name: '네이버로 시작하기' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Google로 시작하기' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apple로 시작하기' })).toBeVisible();
  });

  test('기존 유저는 로그인 후 홈으로 리다이렉트된다', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: '네이버로 시작하기' }).click();

    await page.waitForURL('/');
  });

  test('기존 유저는 redirect 쿼리가 있으면 해당 경로로 이동한다', async ({ page }) => {
    await page.goto('/login?redirect=%2F');

    await page.getByRole('button', { name: 'Google로 시작하기' }).click();

    await page.waitForURL('/');
  });

  // NOTE(#54 후속): /profile-setup 라우트가 생기면
  // 최초 유저 로그인 → 프로필 설정 → 온보딩 완료 → / 도착까지 이어지는
  // 전체 스모크 시나리오로 확장한다. 온보딩 단독 스모크는 e2e/onboarding.spec.ts에서 커버 중.
  test('최초 유저는 로그인 후 프로필 설정 페이지로 이동한다', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: '카카오로 시작하기' }).click();

    await page.waitForURL('/profile-setup');
  });
});
