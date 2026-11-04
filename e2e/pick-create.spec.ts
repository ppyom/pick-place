import { expect, test } from '@playwright/test';

const TITLE_PLACEHOLDER = 'Pick 이름을 입력해주세요';
const DESCRIPTION_PLACEHOLDER = '어떤 장소들을 모았나요?';
const TAG_PLACEHOLDER = '태그를 입력해보세요';
const MEMO_PLACEHOLDER = '메모를 남겨보세요';

test.describe('Pick 작성', () => {
  test('진입 시 폼 기본 상태가 노출된다', async ({ page }) => {
    const response = await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(400);

    await expect(page.getByRole('heading', { name: 'Pick 만들기' })).toBeVisible();
    await expect(page.getByPlaceholder(TITLE_PLACEHOLDER)).toHaveValue('');
    await expect(page.getByPlaceholder(DESCRIPTION_PLACEHOLDER)).toHaveValue('');
    await expect(page.getByPlaceholder(TAG_PLACEHOLDER)).toBeVisible();
    await expect(page.getByRole('switch', { name: '공개 여부' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await expect(page.getByRole('button', { name: '장소 추가' })).toBeVisible();
    await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  });

  test('제목과 장소 없이 저장하면 에러 문구가 노출되고 이동하지 않는다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '저장' }).click();

    await expect(page.getByText('제목을 입력해주세요.')).toBeVisible();
    await expect(page.getByText('장소를 1개 이상 추가해주세요.')).toBeVisible();
    await expect(page).toHaveURL(/\/picks\/new$/);
  });

  test('태그 입력창에서 Enter를 눌러도 폼이 제출되지 않는다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder(TAG_PLACEHOLDER).fill('성수');
    await page.getByPlaceholder(TAG_PLACEHOLDER).press('Enter');

    await expect(page.getByText('제목을 입력해주세요.')).not.toBeVisible();
    await expect(page.getByText('#성수', { exact: true })).not.toBeVisible();
  });

  test('태그를 추가/삭제하고 중복과 최대 개수를 막는다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    const tagInput = page.getByPlaceholder(TAG_PLACEHOLDER);
    const addButton = page.getByRole('button', { name: '추가', exact: true });

    await tagInput.fill('#데이트');
    await addButton.click();
    await expect(page.getByText('#데이트', { exact: true })).toBeVisible();
    await expect(tagInput).toHaveValue('');

    await tagInput.fill('데이트');
    await expect(addButton).toBeDisabled();

    await page.getByRole('button', { name: '데이트 태그 삭제' }).click();
    await expect(page.getByText('#데이트', { exact: true })).not.toBeVisible();

    for (const tag of ['하나', '둘', '셋', '넷', '다섯']) {
      await tagInput.fill(tag);
      await addButton.click();
    }
    await expect(page.getByPlaceholder('최대 5개까지 추가할 수 있어요')).toBeDisabled();
  });

  test('공개 여부를 토글할 수 있다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    const toggle = page.getByRole('switch', { name: '공개 여부' });
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'false');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  test('장소 추가 시트에서 검색하고, 닫으면 선택이 초기화된다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '장소 추가' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('checkbox')).toHaveCount(3);
    await expect(dialog.getByRole('button', { name: '장소를 선택해주세요' })).toBeDisabled();

    await dialog.getByPlaceholder('장소 검색').fill('onion');
    await expect(dialog.getByRole('checkbox')).toHaveCount(1);

    await dialog.getByPlaceholder('장소 검색').fill('없는장소');
    await expect(dialog.getByText('검색 결과가 없어요')).toBeVisible();

    await dialog.getByPlaceholder('장소 검색').fill('');
    await dialog.getByRole('checkbox', { name: /카페 성수연방/ }).click();
    await expect(dialog.getByRole('button', { name: '1개 추가', exact: true })).toBeVisible();

    await dialog.getByRole('button', { name: '닫기' }).click();
    await expect(dialog).toBeHidden();

    await page.getByRole('button', { name: '장소 추가' }).click();
    await expect(page.getByRole('dialog').getByRole('checkbox', { checked: true })).toHaveCount(0);
    await expect(
      page.getByRole('dialog').getByRole('button', { name: '장소를 선택해주세요' }),
    ).toBeDisabled();
  });

  test('시트에서 장소를 선택해 추가하고, 폼에서 삭제할 수 있다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    const form = page.locator('form');

    await page.getByRole('button', { name: '장소 추가' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('checkbox', { name: /카페 성수연방/ }).click();
    await dialog.getByRole('checkbox', { name: /onion 성수/ }).click();
    await dialog.getByRole('button', { name: '2개 추가', exact: true }).click();
    await expect(dialog).toBeHidden();

    await expect(form.getByText('카페 성수연방')).toBeVisible();
    await expect(form.getByText('onion 성수')).toBeVisible();
    await expect(form.getByPlaceholder(MEMO_PLACEHOLDER)).toHaveCount(2);

    await form.getByRole('button', { name: 'onion 성수 삭제' }).click();
    await expect(form.getByText('onion 성수')).not.toBeVisible();
    await expect(form.getByPlaceholder(MEMO_PLACEHOLDER)).toHaveCount(1);
  });

  test('시트에서 이미 담긴 장소는 선택된 상태이고, 해제하면 삭제된다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    const form = page.locator('form');

    await page.getByRole('button', { name: '장소 추가' }).click();
    await page
      .getByRole('dialog')
      .getByRole('checkbox', { name: /블루보틀 성수/ })
      .click();
    await page.getByRole('dialog').getByRole('button', { name: '1개 추가', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(form.getByText('블루보틀 성수')).toBeVisible();

    await page.getByRole('button', { name: '장소 추가' }).click();
    const dialog = page.getByRole('dialog');
    const added = dialog.getByRole('checkbox', { name: /블루보틀 성수/ });
    await expect(added).toHaveAttribute('aria-checked', 'true');

    await added.click();
    await expect(added).toHaveAttribute('aria-checked', 'false');
    await dialog.getByRole('button', { name: '1개 삭제', exact: true }).click();
    await expect(dialog).toBeHidden();

    await expect(form.getByText('블루보틀 성수')).not.toBeVisible();
  });

  test('폼을 채워 저장하면 Pick 상세로 이동해 입력한 내용이 노출된다', async ({ page }) => {
    await page.goto('/picks/new');
    await page.waitForLoadState('networkidle');

    const form = page.locator('form');

    await page.getByPlaceholder(TITLE_PLACEHOLDER).fill('성수 데이트 코스');
    await page.getByPlaceholder(DESCRIPTION_PLACEHOLDER).fill('둘이 가기 좋은 곳');

    const tagInput = page.getByPlaceholder(TAG_PLACEHOLDER);
    const addTagButton = page.getByRole('button', { name: '추가', exact: true });
    await tagInput.fill('데이트');
    await addTagButton.click();
    await tagInput.fill('성수');
    await addTagButton.click();
    await page.getByRole('button', { name: '성수 태그 삭제' }).click();

    await page.getByRole('switch', { name: '공개 여부' }).click();

    await page.getByRole('button', { name: '장소 추가' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('checkbox', { name: /카페 성수연방/ }).click();
    await dialog.getByRole('checkbox', { name: /블루보틀 성수/ }).click();
    await dialog.getByRole('button', { name: '2개 추가', exact: true }).click();
    await expect(dialog).toBeHidden();

    await form.getByPlaceholder(MEMO_PLACEHOLDER).first().fill('웨이팅 있음');

    await page.getByRole('button', { name: '저장' }).click();

    await expect(page.getByText('Pick이 만들어졌어요.')).toBeVisible();
    await page.waitForURL(/\/picks\/pick-\d+$/);

    await expect(page.getByRole('heading', { name: '성수 데이트 코스' })).toBeVisible();
    await expect(page.getByText('둘이 가기 좋은 곳')).toBeVisible();
    await expect(page.getByText('#데이트', { exact: true })).toBeVisible();
    await expect(page.getByText('#성수', { exact: true })).not.toBeVisible();
    await expect(page.getByText('카페 성수연방')).toBeVisible();
    await expect(page.getByText('블루보틀 성수')).toBeVisible();
    await expect(page.getByText('웨이팅 있음')).toBeVisible();
  });

  test('장소 상세에서 진입하면 해당 장소가 미리 담겨 있다', async ({ page }) => {
    await page.goto('/picks/new?placeId=place-1');
    await page.waitForLoadState('networkidle');

    const form = page.locator('form');
    await expect(form.getByText('카페 성수연방')).toBeVisible();
    await expect(form.getByPlaceholder(MEMO_PLACEHOLDER)).toHaveCount(1);

    await page.getByRole('button', { name: '장소 추가' }).click();
    await expect(
      page.getByRole('dialog').getByRole('checkbox', { name: /카페 성수연방/ }),
    ).toHaveAttribute('aria-checked', 'true');
  });

  test('뒤로가기 버튼을 누르면 이전 페이지로 이동한다', async ({ page }) => {
    await page.goto('/my');
    await page.goto('/picks/new');

    await page.getByRole('button', { name: '뒤로가기' }).click();

    await page.waitForURL('/my');
  });
});
