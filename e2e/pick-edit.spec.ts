import { expect, test } from '@playwright/test';

const TITLE_PLACEHOLDER = 'Pick 이름을 입력해주세요';
const DESCRIPTION_PLACEHOLDER = '어떤 장소들을 모았나요?';
const TAG_PLACEHOLDER = '태그를 입력해보세요';
const MEMO_PLACEHOLDER = '메모를 남겨보세요';

test.describe('Pick 수정', () => {
  test('내 Pick 상세에서 수정 버튼을 누르면 수정 페이지로 이동한다', async ({ page }) => {
    await page.goto('/picks/pick-1');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Pick 수정' }).click();

    await page.waitForURL('/picks/pick-1/edit');
    await expect(page.getByRole('heading', { name: 'Pick 수정' })).toBeVisible();
  });

  test('다른 사람의 Pick 상세에는 수정 버튼이 없다', async ({ page }) => {
    await page.goto('/picks/pick-2');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: '혼자 가기 좋은 을지로 맛집' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pick 수정' })).toHaveCount(0);
  });

  test('수정 페이지 진입 시 기존 내용이 채워져 있다', async ({ page }) => {
    const response = await page.goto('/picks/pick-1/edit');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);

    const form = page.locator('form');

    await expect(page.getByPlaceholder(TITLE_PLACEHOLDER)).toHaveValue('성수동 조용한 카페 모음');
    await expect(page.getByPlaceholder(DESCRIPTION_PLACEHOLDER)).toHaveValue(
      '작업하기 좋은 성수동 카페 리스트',
    );
    await expect(form.getByText('#카페', { exact: true })).toBeVisible();
    await expect(form.getByText('#성수동', { exact: true })).toBeVisible();
    await expect(form.getByText('#작업하기좋은', { exact: true })).toBeVisible();
    await expect(page.getByRole('switch', { name: '공개 여부' })).toHaveAttribute(
      'aria-checked',
      'true',
    );

    await expect(form.getByText('카페 성수연방')).toBeVisible();
    await expect(form.getByText('블루보틀 성수')).toBeVisible();
    await expect(form.getByText('onion 성수')).toBeVisible();
    await expect(form.getByPlaceholder(MEMO_PLACEHOLDER).first()).toHaveValue(
      '노트북 펼치기 좋은 2층 자리 있음',
    );
  });

  test('존재하지 않는 Pick이면 에러 상태가 노출된다', async ({ page }) => {
    await page.goto('/picks/pick-999/edit');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('삭제되었거나 존재하지 않는 Pick이에요.')).toBeVisible();
    await expect(page.getByRole('button', { name: '돌아가기' })).toBeVisible();
  });

  test('다른 사람의 Pick을 수정하려고 하면 안내 문구가 노출된다', async ({ page }) => {
    await page.goto('/picks/pick-2/edit');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('내가 만든 Pick만 수정할 수 있어요.')).toBeVisible();
    await expect(page.getByRole('button', { name: '돌아가기' })).toBeVisible();
    await expect(page.getByPlaceholder(TITLE_PLACEHOLDER)).toHaveCount(0);
  });

  test('제목을 비우고 저장하면 에러 문구가 노출되고 이동하지 않는다', async ({ page }) => {
    await page.goto('/picks/pick-1/edit');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder(TITLE_PLACEHOLDER).fill('');
    await page.getByRole('button', { name: '저장' }).click();

    await expect(page.getByText('제목을 입력해주세요.')).toBeVisible();
    await expect(page).toHaveURL(/\/picks\/pick-1\/edit$/);
  });

  test('내용을 수정해 저장하면 상세로 이동해 변경 내용이 반영된다', async ({ page }) => {
    await page.goto('/picks/pick-1');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Pick 수정' }).click();
    await page.waitForURL('/picks/pick-1/edit');

    const form = page.locator('form');

    await page.getByPlaceholder(TITLE_PLACEHOLDER).fill('수정한 제목');
    await page.getByPlaceholder(DESCRIPTION_PLACEHOLDER).fill('수정한 설명');

    await page.getByRole('button', { name: '카페 태그 삭제' }).click();
    await page.getByPlaceholder(TAG_PLACEHOLDER).fill('신규태그');
    await page.getByRole('button', { name: '추가', exact: true }).click();

    await form.getByPlaceholder(MEMO_PLACEHOLDER).first().fill('수정한 메모');
    await form.getByRole('button', { name: '블루보틀 성수 삭제' }).click();

    await page.getByRole('button', { name: '저장' }).click();

    await expect(page.getByText('Pick이 수정되었어요.')).toBeVisible();
    await page.waitForURL('/picks/pick-1');

    await expect(page.getByRole('heading', { name: '수정한 제목' })).toBeVisible();
    await expect(page.getByText('수정한 설명')).toBeVisible();
    await expect(page.getByText('#카페', { exact: true })).not.toBeVisible();
    await expect(page.getByText('#신규태그', { exact: true })).toBeVisible();
    await expect(page.getByText('수정한 메모')).toBeVisible();
    await expect(page.getByText('카페 성수연방')).toBeVisible();
    await expect(page.getByText('블루보틀 성수')).not.toBeVisible();
  });

  test('시트에서 기존 장소를 해제하면 삭제된다', async ({ page }) => {
    await page.goto('/picks/pick-1/edit');
    await page.waitForLoadState('networkidle');

    const form = page.locator('form');

    await page.getByRole('button', { name: '장소 추가' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('checkbox', { checked: true })).toHaveCount(3);

    await dialog.getByRole('checkbox', { name: /onion 성수/ }).click();
    await dialog.getByRole('button', { name: '1개 삭제', exact: true }).click();
    await expect(dialog).toBeHidden();

    await expect(form.getByText('onion 성수')).not.toBeVisible();
    await expect(form.getByText('카페 성수연방')).toBeVisible();
    await expect(form.getByText('블루보틀 성수')).toBeVisible();
  });

  test('뒤로가기로 나가면 변경 내용이 저장되지 않는다', async ({ page }) => {
    await page.goto('/picks/pick-1');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Pick 수정' }).click();
    await page.waitForURL('/picks/pick-1/edit');

    await page.getByPlaceholder(TITLE_PLACEHOLDER).fill('저장하지 않을 제목');
    await page.getByRole('button', { name: '뒤로가기' }).click();

    await page.waitForURL('/picks/pick-1');
    await expect(page.getByRole('heading', { name: '성수동 조용한 카페 모음' })).toBeVisible();
  });
});
