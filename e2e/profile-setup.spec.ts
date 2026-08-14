import { expect, test } from '@playwright/test';

test.describe('프로필 설정 페이지', () => {
  test('폼이 정상적으로 노출된다', async ({ page }) => {
    const response = await page.goto('/profile-setup');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByPlaceholder('닉네임을 입력해주세요')).toBeVisible();
    await expect(page.getByRole('button', { name: '취소' })).not.toBeVisible();
  });

  test('닉네임 없이 저장하면 검증 에러가 노출된다', async ({ page }) => {
    await page.goto('/profile-setup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '저장' }).click();

    await expect(page.getByText('닉네임은 2자 이상 입력해주세요.')).toBeVisible();
  });

  test('닉네임을 입력하고 저장하면 온보딩으로 이동한다', async ({ page }) => {
    await page.goto('/profile-setup');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('닉네임을 입력해주세요').fill('테스트닉네임');
    await page.getByRole('button', { name: '저장' }).click();

    await page.waitForURL('/onboarding');
  });
});
