import { Icon } from '@/shared/ui/icon';

import type { OnboardingStepConfig } from '../model/types';

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: 'interests',
    title: '어떤 장소를 좋아하나요?',
    description: '관심 있는 걸 모두 골라주세요',
    selectionMode: 'multi',
    options: [
      { value: 'food', label: '맛집', icon: <Icon name="food" size="lg" /> },
      { value: 'cafe', label: '카페', icon: <Icon name="cafe" size="lg" /> },
      { value: 'travel', label: '여행', icon: <Icon name="travel" size="lg" /> },
      { value: 'nature', label: '자연', icon: <Icon name="nature" size="lg" /> },
      { value: 'culture', label: '문화', icon: <Icon name="culture" size="lg" /> },
      { value: 'shopping', label: '쇼핑', icon: <Icon name="shopping" size="lg" /> },
      { value: 'etc', label: '기타', icon: <Icon name="etc" size="lg" /> },
    ],
  },
  {
    id: 'companion',
    title: '주로 누구와 함께하나요?',
    description: '해당하는 걸 모두 골라주세요',
    selectionMode: 'multi',
    options: [
      { value: 'solo', label: '혼자', icon: <Icon name="alone" size="lg" /> },
      { value: 'family', label: '가족', icon: <Icon name="family" size="lg" /> },
      { value: 'couple', label: '연인', icon: <Icon name="couple" size="lg" /> },
      { value: 'friends', label: '친구', icon: <Icon name="friend" size="lg" /> },
      { value: 'pet', label: '반려동물', icon: <Icon name="pet" size="lg" /> },
      { value: 'etc', label: '기타', icon: <Icon name="etc" size="lg" /> },
    ],
  },
  {
    id: 'region',
    title: '관심 있는 지역을 선택해주세요!',
    description: '관심 있는 지역을 모두 골라주세요',
    selectionMode: 'multi',
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'gyeonggi', label: '경기' },
      { value: 'incheon', label: '인천' },
      { value: 'gangwon', label: '강원' },
      { value: 'daejeon', label: '대전' },
      { value: 'chungbuk', label: '충북' },
      { value: 'chungnam', label: '충남' },
      { value: 'sejong', label: '세종' },
      { value: 'gwangju', label: '광주' },
      { value: 'jeonbuk', label: '전북' },
      { value: 'jeonnam', label: '전남' },
      { value: 'busan', label: '부산' },
      { value: 'daegu', label: '대구' },
      { value: 'ulsan', label: '울산' },
      { value: 'kyeongbuk', label: '경북' },
      { value: 'kyeongnam', label: '경남' },
      { value: 'jeju', label: '제주' },
    ],
  },
];
