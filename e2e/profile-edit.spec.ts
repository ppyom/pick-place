import { expect, test } from '@playwright/test';

test.describe('마이페이지 프로필 수정', () => {
  test('기존 프로필 값이 채워진 채로 노출된다', async ({ page }) => {
    const response = await page.goto('/my/profile');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole('heading', { name: '프로필 수정' })).toBeVisible();
    await expect(page.getByPlaceholder('닉네임을 입력해주세요')).toHaveValue('예진');
  });

  test('수정 후 저장하면 마이페이지로 이동한다', async ({ page }) => {
    await page.goto('/my/profile');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('닉네임을 입력해주세요').fill('수정된닉네임');
    await page.getByRole('button', { name: '저장' }).click();

    await page.waitForURL('/my');
  });

  test('취소 버튼을 누르면 이전 페이지로 돌아간다', async ({ page }) => {
    await page.goto('/');
    await page.goto('/my/profile');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '취소' }).click();

    await page.waitForURL('/');
  });
});
