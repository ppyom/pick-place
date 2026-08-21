import { expect, test } from '@playwright/test';

test.describe('설정 페이지', () => {
  test('계정/앱 섹션 항목과 버전 정보가 노출된다', async ({ page }) => {
    const response = await page.goto('/my/settings');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole('heading', { name: '설정' })).toBeVisible();
    await expect(page.getByRole('link', { name: '프로필 편집' })).toBeVisible();
    await expect(page.getByRole('link', { name: '관심사 설정' })).toBeVisible();
    await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
    await expect(page.getByRole('button', { name: '회원 탈퇴' })).toBeVisible();
    await expect(page.getByText('0.1.0')).toBeVisible();
  });

  test('프로필 편집 항목을 누르면 프로필 편집 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my/settings');
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: '프로필 편집' }).click();

    await page.waitForURL('/my/profile');
  });

  test('뒤로가기 버튼을 누르면 이전 페이지로 돌아간다', async ({ page }) => {
    await page.goto('/my');
    await page.goto('/my/settings');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '뒤로가기' }).click();

    await page.waitForURL('/my');
  });

  test('로그아웃을 누르면 로그인 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my/settings');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '로그아웃' }).click();

    await page.waitForURL('/login');
  });

  test('회원 탈퇴를 누르면 로그인 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my/settings');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '회원 탈퇴' }).click();

    await page.waitForURL('/login');
  });
});
