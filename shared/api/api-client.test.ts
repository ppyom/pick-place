import { afterEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from './api-client';
import { ApiError } from './api-error';

describe('apiClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('성공 응답을 JSON으로 반환한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ id: '1' }),
      }),
    );

    const result = await apiClient.get<{ id: string }>('/picks/1');

    expect(result).toEqual({ id: '1' });
  });

  it('204 응답은 undefined를 반환한다', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 204 }));

    const result = await apiClient.delete('/picks/1/bookmark');

    expect(result).toBeUndefined();
  });

  it('실패 응답이면 ApiError를 throw한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Pick을 찾을 수 없습니다.', code: 'PICK_NOT_FOUND' }),
      }),
    );

    await expect(apiClient.get('/picks/1')).rejects.toMatchObject({
      message: 'Pick을 찾을 수 없습니다.',
      status: 404,
      code: 'PICK_NOT_FOUND',
    });
    await expect(apiClient.get('/picks/1')).rejects.toBeInstanceOf(ApiError);
  });

  it('FormData body면 Content-Type을 직접 설정하지 않는다', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);

    const formData = new FormData();
    formData.append('file', new Blob(['test']));

    await apiClient.post('/upload', formData);

    const [, requestInit] = fetchMock.mock.calls[0];
    expect(requestInit.headers['Content-Type']).toBeUndefined();
    expect(requestInit.body).toBe(formData);
  });
});
