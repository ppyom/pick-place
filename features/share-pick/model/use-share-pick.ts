import { env } from '@/shared/config/env';
import { useToast } from '@/shared/ui/toast';

interface SharePickParams {
  pickId: string;
  title: string;
}

export function useSharePick() {
  const { showToast } = useToast();

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

    try {
      await navigator.clipboard.writeText(url);
      showToast('링크가 복사되었습니다');
    } catch {
      showToast('링크 복사에 실패했어요');
    }
  }

  return { share };
}
