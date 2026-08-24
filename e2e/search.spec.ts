import { expect, test } from '@playwright/test';

test.describe('검색 페이지', () => {
  test('최근 검색어가 없으면 빈 상태 메시지가 노출된다', async ({ page }) => {
    const response = await page.goto('/search');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText('최근 검색어가 없어요')).toBeVisible();
  });

  test('검색어를 입력하고 Enter를 누르면 검색 결과 페이지로 이동한다', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('장소, 지역, 태그 검색').fill('성수동');
    await page.getByPlaceholder('장소, 지역, 태그 검색').press('Enter');

    await page.waitForURL('/search/results?q=%EC%84%B1%EC%88%98%EB%8F%99');
    await expect(page.getByText('성수동 조용한 카페 모음')).toBeVisible();
  });

  test('검색 결과가 없으면 빈 상태 메시지가 노출된다', async ({ page }) => {
    await page.goto('/search/results?q=존재하지않는검색어');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText("'존재하지않는검색어'에 대한 검색 결과가 없어요.")).toBeVisible();
  });

  test('검색 결과 페이지의 검색창을 누르면 검색어가 채워진 채로 검색 페이지로 돌아간다', async ({
    page,
  }) => {
    await page.goto('/search/results?q=성수동');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('장소, 지역, 태그 검색').click();

    await page.waitForURL('/search?q=%EC%84%B1%EC%88%98%EB%8F%99');
    await expect(page.getByPlaceholder('장소, 지역, 태그 검색')).toHaveValue('성수동');
  });

  test('검색을 실행하면 최근 검색어 목록에 추가된다', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('장소, 지역, 태그 검색').fill('성수동');
    await page.getByPlaceholder('장소, 지역, 태그 검색').press('Enter');
    await page.waitForURL('/search/results?q=%EC%84%B1%EC%88%98%EB%8F%99');

    await page.goBack();
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: '성수동', exact: true })).toBeVisible();
  });

  test('최근 검색어를 개별 삭제할 수 있다', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('장소, 지역, 태그 검색').fill('성수동');
    await page.getByPlaceholder('장소, 지역, 태그 검색').press('Enter');
    await page.waitForURL('/search/results?q=%EC%84%B1%EC%88%98%EB%8F%99');

    await page.goBack();
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '성수동 검색어 삭제' }).click();

    await expect(page.getByText('최근 검색어가 없어요')).toBeVisible();
  });

  test('전체삭제를 누르면 최근 검색어가 모두 삭제된다', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('장소, 지역, 태그 검색').fill('성수동');
    await page.getByPlaceholder('장소, 지역, 태그 검색').press('Enter');
    await page.waitForURL('/search/results?q=%EC%84%B1%EC%88%98%EB%8F%99');

    await page.goBack();
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '전체삭제' }).click();

    await expect(page.getByText('최근 검색어가 없어요')).toBeVisible();
  });
});
