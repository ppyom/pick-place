import { expect, test } from '@playwright/test';

test.describe('홈 페이지', () => {
  test('피드가 정상적으로 노출된다', async ({ page }) => {
    const response = await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole('button', { name: '더보기' })).toHaveCount(4);
  });

  test('검색바를 누르면 검색 페이지로 이동한다', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('장소, 지역, 태그 검색').click();

    await page.waitForURL('/search');
  });

  test('스크롤을 내리면 다음 페이지 피드가 추가로 로드된다', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: '더보기' })).toHaveCount(4);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.getByRole('button', { name: '더보기' })).toHaveCount(8);
  });
});
