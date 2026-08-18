import { expect, test } from '@playwright/test';

test.describe('로그인 페이지', () => {
  test('OAuth 버튼이 모두 노출된다', async ({ page }) => {
    const response = await page.goto('/login');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole('button', { name: '카카오로 시작하기' })).toBeVisible();
    await expect(page.getByRole('button', { name: '네이버로 시작하기' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Google로 시작하기' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apple로 시작하기' })).toBeVisible();
  });

  test('기존 유저는 로그인 후 홈으로 리다이렉트된다', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '네이버로 시작하기' }).click();

    await page.waitForURL('/');
  });

  test('기존 유저는 redirect 쿼리가 있으면 해당 경로로 이동한다', async ({ page }) => {
    await page.goto('/login?redirect=%2F');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Google로 시작하기' }).click();

    await page.waitForURL('/');
  });

  test('최초 유저는 로그인 → 프로필 설정 → 온보딩까지 마치면 홈으로 이동한다', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '카카오로 시작하기' }).click();
    await page.waitForURL('/profile-setup');

    await page.getByPlaceholder('닉네임을 입력해주세요').fill('테스트닉네임');
    await page.getByRole('button', { name: '저장' }).click();
    await page.waitForURL('/onboarding');

    await page.getByRole('button', { name: '건너뛰기' }).click();
    await page.getByRole('button', { name: '건너뛰기' }).click();
    await page.getByRole('button', { name: '건너뛰기' }).click();

    await page.waitForURL('/');
  });
});
