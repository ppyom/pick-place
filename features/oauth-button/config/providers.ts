import { AppleLogo } from '../ui/icons/apple-logo';
import { GoogleLogo } from '../ui/icons/google-logo';
import { KakaoLogo } from '../ui/icons/kakao-logo';
import { NaverLogo } from '../ui/icons/naver-logo';

export type OAuthProvider = 'kakao' | 'naver' | 'google' | 'apple';

type ProviderConfig = {
  label: string;
  Icon: () => React.ReactElement;
  background: string;
  textColor: string;
  iconOffset: string;
  border?: string;
};

export const oauthProviders: Record<OAuthProvider, ProviderConfig> = {
  kakao: {
    label: '카카오로 시작하기',
    Icon: KakaoLogo,
    background: '#fee500',
    textColor: '#000000',
    iconOffset: '16px',
  },
  naver: {
    label: '네이버로 시작하기',
    Icon: NaverLogo,
    background: '#03a94d',
    textColor: '#ffffff',
    iconOffset: '16px',
  },
  google: {
    label: 'Google로 시작하기',
    Icon: GoogleLogo,
    background: '#ffffff',
    textColor: '#1f1f1f',
    border: '#747775',
    iconOffset: '16px',
  },
  apple: {
    label: 'Apple로 시작하기',
    Icon: AppleLogo,
    background: '#000000',
    textColor: '#ffffff',
    iconOffset: '13px',
  },
};
