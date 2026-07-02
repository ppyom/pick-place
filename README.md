# Pick!Place

Pick!Place는 장소를 발견하고 기록하고 공유하는 서비스입니다.

**Next.js 16**을 기반으로 구축하며 디자인 시스템 중심의 컴포넌트 개발과 유지보수성을 고려한 아키텍처를 목표로 합니다.

## Getting Started

```bash
# 설치
pnpm install

# 개발 서버 실행
pnpm dev

# Storybook 실행
pnpm storybook

# 테스트
pnpm test
```

## Tech Stack

### Framework

- Next.js 16
- React 19
- TypeScript

### Styling

- Tailwind CSS v4
- Motion

### Data Fetching

- TanStack Query
- Fetch API

### Form & Validation

- React Hook Form
- Zod

### Component Development

- Storybook

### Testing

- Vitest
- React Testing Library
- Playwright

### Code Quality

- ESLint
- Prettier

## Architecture

- FSD(Feature-Sliced Design) 기반 구조를 따릅니다.
- 컴포넌트는 가능한 한 작은 단위로 분리합니다.
- 디자인 시스템을 기준으로 컴포넌트를 구현합니다.
- Storybook을 중심으로 컴포넌트를 개발합니다.
- 테스트 가능한 컴포넌트를 작성합니다.

### 폴더 구조 (Next.js App Router + FSD)

Next.js App Router의 라우팅 폴더(`app/`)와 FSD 레이어 이름이 겹치는 것을 피하기 위해 FSD의 `app` 레이어는 `providers`로 대체하고 `pages` 레이어는 사용하지 않습니다. 라우트 조립은 App Router의 `page.tsx`가 담당합니다.

```
app/            # ⚠️ Next.js 라우팅 전용 (FSD 레이어 아님)
├── (routes)/
│   ├── explore/page.tsx
│   ├── collections/[id]/page.tsx
│   ├── places/[id]/page.tsx
│   ├── my/page.tsx
│   └── login/page.tsx
└── layout.tsx

providers/      # 전역 Provider (표준 FSD의 "app" 레이어 역할을 대체)
widgets/        # 여러 feature/entity를 조합한 UI 블록
features/       # 사용자 행동 단위 기능 (동사 단위)
entities/       # 비즈니스 엔티티 (명사 단위: Place, Pick, User)
shared/         # 공통 UI, 유틸, API 클라이언트, 설정
```

**레이어 간 의존성 방향** (위에서 아래로만 import 가능):

```
app(라우팅) → providers → widgets → features → entities → shared
```

| 레이어       | 역할                             | 예시                               |
| ------------ | -------------------------------- | ---------------------------------- |
| `app/`       | Next.js 라우팅 및 페이지 조립    | `explore/page.tsx`                 |
| `providers/` | 도메인 지식 없는 전역 Provider   | `QueryProvider`, `ThemeProvider`   |
| `widgets/`   | 여러 feature/entity 조합 UI 블록 | `PlaceList`, `CategoryFilterBar`   |
| `features/`  | 사용자 행동(동사) 단위           | `save-place`, `create-collection`  |
| `entities/`  | 비즈니스 엔티티(명사) 단위       | `place`, `pick`, `user`            |
| `shared/`    | 순수 공통 코드                   | `Button`, `apiClient`, `constants` |

> `providers/`에는 특정 feature/entity를 몰라도 되는 순수 인프라성 Provider만 둡니다. 특정 도메인 로직을 담은 Context는 해당 `features/*/model/`에 둡니다.

## Coding Convention

### Import

- 절대 경로(`@/`)를 우선 사용합니다.
- Import는 자동으로 정렬됩니다.
- 사용하지 않는 Import는 자동으로 제거됩니다.

### Formatting

- Prettier로 코드 스타일을 통일합니다.
- Tailwind CSS 클래스는 자동으로 정렬됩니다.

### Lint

- ESLint로 코드 품질을 유지합니다.
- `console.log` 사용은 지양하며 필요한 경우 `console.warn`과 `console.error`만 허용합니다.

## Git Convention

Gitmoji를 사용하여 커밋을 관리합니다. 주요 규칙은 다음과 같습니다.

| Emoji | 의미                |
| ----- | ------------------- |
| 🎉    | 프로젝트 시작       |
| ➕    | 의존성 추가         |
| 🔧    | 설정 변경           |
| 🏗️    | 프로젝트 구조 변경  |
| ✨    | 기능 추가           |
| 💄    | UI 및 스타일 변경   |
| ♻️    | 리팩터링            |
| ✅    | 테스트 추가 및 수정 |
| 📝    | 문서 작성           |
