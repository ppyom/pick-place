import { env } from '@/shared/config/env';

interface SharePickParams {
  pickId: string;
  title: string;
}

export function useSharePick() {
  async function share({ pickId, title }: SharePickParams) {
    const url = `${env.SITE_URL}/picks/${pickId}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // 사용자가 공유 취소한 경우 등, 별도 처리 없음
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    // TODO: Toast로 "링크가 복사되었습니다" 표시 (Toast 컴포넌트 나오면 연결)
  }

  return { share };
}
