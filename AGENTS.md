# AGENTS.md

Pick!Place 레포에서 작업하는 AI 에이전트를 위한 가이드입니다.

## 1. 프로젝트 구조 및 주요 디렉터리 역할

FSD(Feature-Sliced Design) 기반 구조를 따릅니다. 레이어 간 의존성은 상위 레이어에서 하위 레이어 방향으로만 허용합니다.

```
app(라우팅) → providers → widgets → features → entities → shared
```

| 디렉터리        | 역할                                                                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/(routes)/` | Next.js App Router 라우팅 및 페이지 조립 전용입니다. FSD 레이어가 아니며, 로직이나 스타일을 직접 담지 않습니다.                                          |
| `providers/`    | 도메인 지식이 없는 순수 인프라 Provider를 둡니다 (`QueryProvider` 등). 특정 feature/entity를 아는 Context는 여기 두지 않고 `features/*/model/`에 둡니다. |
| `widgets/`      | 여러 feature/entity를 조합(compose)한 UI 블록입니다.                                                                                                     |
| `features/`     | 사용자 행동(동사) 단위 기능입니다.                                                                                                                       |
| `entities/`     | 비즈니스 엔티티(명사) 단위입니다 (`pick`, `place`, `session`).                                                                                           |
| `shared/`       | 도메인 지식이 없는 순수 공통 코드입니다 (`ui`, `api`, `utils`, `config`).                                                                                |

새로운 코드를 어느 레이어에 둘지는 **"조합 로직이 있는지 여부"**로 판단합니다. 도메인 지식 없이 슬롯을 위임받아 렌더만 하면 `shared`, 여러 entity를 엮으면 `widgets`입니다. 표시 전용 컴포넌트와 인터랙티브 컴포넌트는 분리합니다 (예: `entities/pick/ui/bookmark-count`는 표시 전용, `features/toggle-bookmark`는 인터랙션 담당).

각 레이어 하위에는 필요한 세그먼트만 둡니다 (`ui/`, `model/`, `api/`, `config/`). 사용하지 않는 세그먼트를 미리 만들지 않습니다.

## 2. 사용 중인 기술 스택 및 주요 라이브러리

| 구분                  | 스택                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| Framework             | Next.js 16, React 19, TypeScript                                                                              |
| Styling               | Tailwind CSS v4, Motion(`motion/react`)                                                                       |
| Data Fetching         | TanStack Query v5, Fetch API 기반 자체 `apiClient`                                                            |
| Form & Validation     | React Hook Form, Zod                                                                                          |
| Component Development | Storybook (`@storybook/nextjs-vite`)                                                                          |
| Testing               | Vitest, React Testing Library, Playwright                                                                     |
| Code Quality          | ESLint(`eslint-config-next`, `simple-import-sort`, `unused-imports`), Prettier(`prettier-plugin-tailwindcss`) |
| 기타 유틸             | `class-variance-authority`(cva), `clsx` / `tailwind-merge`(`cn`), `dayjs`, `lucide-react`                     |

## 3. 코드 작성 및 개발 규칙

- 절대경로(`@/`)를 우선 사용합니다. import는 `simple-import-sort`로 자동 정렬되며, 사용하지 않는 import는 자동 제거됩니다.
- Props 타입은 `interface Props`로 정의합니다 (컴포넌트명 접두어를 붙이지 않으며, `type`보다 `interface`를 우선합니다).
- `console.log`는 사용하지 않습니다. `console.warn`, `console.error`, `console.debug`만 허용됩니다.
- 인터랙티브 요소의 비활성화 처리는 native `disabled` 속성 대신 `aria-disabled` + `onClick` 내부 분기로 처리합니다.
- 색상과 타이포그래피는 항상 디자인 시스템 토큰 클래스를 사용합니다 (`typo-{token}`, semantic color 클래스). `text-` 접두어는 컬러 전용이며 타이포그래피는 `typo-` 접두어를 사용합니다.
- Tailwind 클래스는 자동 정렬되므로 순서를 임의로 조정하지 않습니다.
- `cn` 유틸은 `@/shared/utils/cn`에서 가져옵니다 (`lib` 경로가 아닙니다).
- 앱 최대 폭은 `.container-app { width: 100%; max-width: 480px; margin-inline: auto; }` 유틸을 사용합니다. `AppBar`, `BottomNavigation`처럼 고정 배치되는 요소는 `container-app fixed inset-x-0 {top|bottom}-0` 패턴을 사용합니다.
- 로직이 있는 코드(hook, 유틸, api client)만 Vitest 단위 테스트를 작성합니다. 순수 표시용 컴포넌트(Thumbnail, Divider 등)는 Storybook 케이스로 충분합니다.

## 4. 컴포넌트 및 파일 구성 규칙

- 파일명은 kebab-case를 사용합니다 (`oauth-button.tsx`, `apple-logo.tsx`).
- UI 컴포넌트 폴더는 다음 구성을 따릅니다 (예: `shared/ui/button/`).

  ```
  button.tsx      # 컴포넌트 본체
  constants.ts    # variants(cva), 상수 정의
  index.ts        # export * from './button'; export * from './constants';
  stories.tsx     # Storybook 스토리
  docs.mdx        # Storybook 문서
  ```

- Storybook `title`은 다음 규칙을 따릅니다.
  - `shared/ui/{x}` → `UI/{X}` (Shared 생략)
  - `widgets/{x}` → `Widgets/{X}`
  - `features/{x}` → `Features/{X}`
  - `entities/{x}` → `Entities/{X}`
- `docs.mdx`는 `@storybook/addon-docs/blocks`에서 `Meta`, `Canvas`, `Controls`를 import하고, 스토리는 `./stories`에서 가져옵니다. 표는 markdown table을 지원하지 않으므로 HTML `<table>`을 사용합니다.
- 인터랙션이 있는 컴포넌트는 별도의 Vitest 파일 없이 Storybook play function으로 커버할 수 있습니다.

## 5. 작업 시 준수해야 할 프로젝트별 컨벤션

- 기본 작업 브랜치는 `develop`입니다. `main`은 릴리즈용이므로 최신 작업 상태가 반영되어 있지 않을 수 있습니다.
- 브랜치명은 `feature/#00-issue-name`(기능), `fix/#00-issue-name`(버그) 형식을 따릅니다.
- 커밋은 논리적 변경 단위로 분리하고 Gitmoji 컨벤션을 사용합니다. 주요 이모지: `✨` 기능 추가, `📝` 문서 작성, `✅` 테스트, `♻️` 리팩터링, `♿️` 접근성, `🔧` 설정 변경, `🎨` UI/스타일 변경. 전체 목록은 `README.md`를 참고합니다.
- 이슈 제목은 레이어/성격에 맞는 prefix를 사용합니다 (`[Page]`, `[UI]`, `[Entities]`, `[Widgets]`, `[Config]` 등).
- CI는 `feature → develop`, `develop → main` PR에서 lint와 unit test를 실행합니다. `main` 대상 PR/push에서는 Playwright e2e도 함께 실행됩니다. PR 생성 전 `npm run lint`, `npm run test:unit`이 로컬에서 통과해야 합니다.
- PR 본문은 `.github/pull_request_template.md` 형식(작업 내용 / 관련 이슈 / 체크리스트 / 스크린샷)을 따릅니다.
- Playwright 테스트는 `page.goto()` 직후 인터랙션 시 간헐적으로 실패할 수 있으므로, `goto` 다음 줄에 `page.waitForLoadState('networkidle')`을 추가합니다.
- `motion/react`를 사용하는 컴포넌트를 테스트할 때는 exit 애니메이션이 DOM에 남는 문제를 방지하기 위해 `motion/react` 모듈 전체를 mock합니다.
- `useEffect` 내부에서 `setState`를 호출하면 ESLint `react-hooks/set-state-in-effect` 규칙에 위배되므로, 이런 경우 `useSyncExternalStore` 패턴으로 우회합니다. 이때 `getSnapshot`이 매 호출마다 새 레퍼런스를 반환하지 않도록 모듈 스코프 `cache` 변수와 테스트 전용 리셋 함수를 함께 둡니다.
- 백엔드 스펙이 확정되지 않은 부분은 mock으로 구현하되, 교체 지점을 격리해서 문서화합니다. 현재 격리 대상은 `shared/api/api-client.ts`의 `getAuthHeader()`와 `shared/api/types.ts`의 `ErrorResponseBody`입니다.

## 6. 에이전트가 작업할 때 참고해야 할 사항

- 구현 전 실제 코드베이스를 확인하고, 존재하지 않는 함수/필드/컴포넌트를 임의로 만들지 않습니다.
- 커밋 목록과 함께 PR 작성을 요청받으면 PR 본문 텍스트만 작성합니다. git commit/push/PR 생성 등 실제 git 조작은 수행하지 않습니다.
- UI가 확정되기 전에는 과설계하지 않고 단순하게 구현한 뒤 화면을 보면서 조정합니다.
