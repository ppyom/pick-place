import { expect, test } from '@playwright/test';

test.describe('탐색 페이지', () => {
  test('기본 진입 시 전체 카테고리가 선택되고 모든 Pick이 노출된다', async ({ page }) => {
    const response = await page.goto('/explore');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole('button', { name: '전체' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.getByText('성수동 조용한 카페 모음')).toBeVisible();
    await expect(page.getByText('혼자 가기 좋은 을지로 맛집')).toBeVisible();
    await expect(page.getByText('한강 뷰 좋은 카페')).toBeVisible();
  });

  test('카테고리를 선택하면 해당 카테고리의 Pick만 노출된다', async ({ page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '카페' }).click();

    await expect(page.getByRole('button', { name: '카페' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.getByText('성수동 조용한 카페 모음')).toBeVisible();
    await expect(page.getByText('한강 뷰 좋은 카페')).toBeVisible();
    await expect(page.getByText('혼자 가기 좋은 을지로 맛집')).not.toBeVisible();
  });

  test('해당하는 Pick이 없는 카테고리는 빈 상태 메시지가 노출된다', async ({ page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '여행' }).click();

    await expect(page.getByText('해당 카테고리의 Pick이 아직 없어요.')).toBeVisible();
  });
});
