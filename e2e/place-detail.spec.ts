import { expect, test } from '@playwright/test';

test.describe('장소 상세', () => {
  test('진입 시 이름/주소와 이 장소가 담긴 Pick 목록이 노출된다', async ({ page }) => {
    const response = await page.goto('/places/place-1');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);

    await expect(page.getByRole('heading', { name: '카페 성수연방' })).toBeVisible();
    await expect(page.getByText('서울 성동구 연무장길')).toBeVisible();

    await expect(page.getByText('이 장소가 담긴 Pick')).toBeVisible();
    await expect(page.getByText('성수동 조용한 카페 모음')).toBeVisible();
  });

  test('존재하지 않는 장소면 에러 상태가 노출된다', async ({ page }) => {
    await page.goto('/places/place-999');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('삭제되었거나 존재하지 않는 장소예요.')).toBeVisible();
    await expect(page.getByRole('button', { name: '돌아가기' })).toBeVisible();
  });

  test('저장 버튼을 누르면 Pick 생성 페이지로 이동한다', async ({ page }) => {
    await page.goto('/places/place-1');
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: /1,234/ }).click();

    await page.waitForURL('/picks/new?placeId=place-1');
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

    await page.goto('/places/place-1');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '공유' }).click();

    await expect(page.getByText('링크가 복사되었습니다')).toBeVisible();
  });

  test('Pick 아이템을 탭하면 Pick 상세로 이동한다', async ({ page }) => {
    await page.goto('/places/place-1');
    await page.waitForLoadState('networkidle');

    await page.getByText('성수동 조용한 카페 모음').click();

    await page.waitForURL('/picks/pick-1');
  });

  test('뒤로가기 버튼을 누르면 이전 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my');
    await page.goto('/places/place-1');

    await page.getByRole('button', { name: '뒤로가기' }).click();

    await page.waitForURL('/my');
  });
});
