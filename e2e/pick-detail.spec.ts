import { expect, test } from '@playwright/test';

test.describe('Pick 상세', () => {
  test('진입 시 제목/작성자/태그/장소 목록이 노출된다', async ({ page }) => {
    const response = await page.goto('/picks/pick-1');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);

    await expect(page.getByRole('heading', { name: '성수동 조용한 카페 모음' })).toBeVisible();
    await expect(page.getByText('작업하기 좋은 성수동 카페 리스트')).toBeVisible();
    await expect(page.getByText('#카페', { exact: true })).toBeVisible();
    await expect(page.getByText('#성수동', { exact: true })).toBeVisible();
    await expect(page.getByText('jb', { exact: true })).toBeVisible();

    await expect(page.getByText('카페 성수연방')).toBeVisible();
    await expect(page.getByText('블루보틀 성수')).toBeVisible();
    await expect(page.getByText('onion 성수')).toBeVisible();
    await expect(page.getByText('노트북 펼치기 좋은 2층 자리 있음')).toBeVisible();
  });

  test('존재하지 않는 Pick이면 에러 상태가 노출된다', async ({ page }) => {
    await page.goto('/picks/pick-999');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('삭제되었거나 존재하지 않는 Pick이에요.')).toBeVisible();
    await expect(page.getByRole('button', { name: '돌아가기' })).toBeVisible();
  });

  test('북마크를 토글하면 카운트와 상태가 즉시 반영된다', async ({ page }) => {
    await page.goto('/picks/pick-1');
    await page.waitForLoadState('networkidle');

    const bookmarkButton = page.getByRole('button', { name: /^128/ });
    await expect(bookmarkButton).toBeVisible();
    await expect(bookmarkButton).toHaveAttribute('aria-pressed', 'false');

    await bookmarkButton.click();

    await expect(page.getByRole('button', { name: /^129/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('공유 버튼을 누르면 링크가 복사되었다는 토스트가 노출된다', async ({
    page,
    context,
    browserName,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window.navigator, 'share', {
        value: undefined,
        configurable: true,
      });
    });
    if (browserName === 'chromium') {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    }

    await page.goto('/picks/pick-1');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '공유' }).click();

    await expect(page.getByText('링크가 복사되었습니다')).toBeVisible();
  });

  test('장소 아이템을 탭하면 장소 상세로 이동한다', async ({ page }) => {
    await page.goto('/picks/pick-1');
    await page.waitForLoadState('networkidle');

    await page.getByText('카페 성수연방').click();

    await page.waitForURL('/places/place-1');
  });

  test('뒤로가기 버튼을 누르면 이전 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my');
    await page.goto('/picks/pick-1');

    await page.getByRole('button', { name: '뒤로가기' }).click();

    await page.waitForURL('/my');
  });
});
