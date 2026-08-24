import { expect, test } from '@playwright/test';

test.describe('마이페이지', () => {
  test('프로필 정보와 내 Pick 탭이 기본으로 노출된다', async ({ page }) => {
    const response = await page.goto('/my');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText('예진', { exact: true })).toBeVisible();
    await expect(page.getByText('안녕하세요. 이예진입니다.')).toBeVisible();
    await expect(page.getByRole('tab', { name: '내 Pick' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(page.getByText('성수동 조용한 카페 모음')).toBeVisible();
  });

  test('저장한 Pick 탭으로 전환하면 북마크한 Pick이 노출된다', async ({ page }) => {
    await page.goto('/my');
    await page.waitForLoadState('networkidle');

    await page.getByRole('tab', { name: '저장한 Pick' }).click();

    await expect(page.getByRole('tab', { name: '저장한 Pick' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(page.getByText('혼자 가기 좋은 을지로 맛집')).toBeVisible();
    await expect(page.getByText('성수동 조용한 카페 모음')).not.toBeVisible();
  });

  test('프로필 편집 버튼을 누르면 프로필 편집 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '프로필 편집' }).click();

    await page.waitForURL('/my/profile');
  });

  test('설정 아이콘을 누르면 설정 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '설정' }).click();

    await page.waitForURL('/my/settings');
  });

  test('내 Pick 탭에서 Pick 만들기 버튼을 누르면 Pick 생성 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Pick 만들기' })).toBeVisible();
    await page.getByRole('button', { name: 'Pick 만들기' }).click();

    await page.waitForURL('/collections/new');
  });

  test('저장한 Pick 탭에서는 Pick 만들기 버튼이 노출되지 않는다', async ({ page }) => {
    await page.goto('/my');
    await page.waitForLoadState('networkidle');

    await page.getByRole('tab', { name: '저장한 Pick' }).click();

    await expect(page.getByRole('button', { name: 'Pick 만들기' })).not.toBeVisible();
  });
});
