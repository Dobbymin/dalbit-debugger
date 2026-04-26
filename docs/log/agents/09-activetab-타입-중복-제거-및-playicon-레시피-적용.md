# 09. ActiveTab 타입 중복 제거 및 PlayIcon 레시피 적용

## 사용한 에이전트 도구
- Claude Code (메인 에이전트, 직접 파일 편집)

## 위임 범위와 판단 근거
Gemini 코드 리뷰에서 제안된 두 가지 코드 품질 개선 사항을 반영했다.

1. **ActiveTab 타입 중복 제거**: `Header.tsx`와 `RootLayout.tsx` 각각에 동일한 타입이 존재하여 중복 발생. 타입 정의를 단일 파일로 일원화.
2. **PlayIcon 인라인 CSS → 레시피 교체**: `MainPage.tsx`의 PlayIcon이 `css({ w: "30px", h: "30px", flexShrink: 0 })`와 같이 인라인 스타일을 사용하고 있어 PandaCSS 레시피 시스템과 불일치.

수정 범위:
- `src/widgets/layouts/types/active-tab.types.ts` (신규 생성)
- `src/widgets/layouts/types/index.ts` (신규 생성)
- `src/widgets/layouts/components/Header.tsx`
- `src/widgets/layouts/ui/RootLayout.tsx`
- `src/pages/main/MainPage.tsx`

## 변경 내용

### active-tab.types.ts (신규)
- `ActiveTab = "Debugger" | "Library"` 타입을 `src/widgets/layouts/types/` 하위로 분리

### Header.tsx / RootLayout.tsx
- 각 파일의 로컬 `ActiveTab` 타입 정의 제거
- `import type { ActiveTab } from "../types"` 로 공유 타입 참조

### MainPage.tsx
- `<PlayIcon className={css({ w: "30px", h: "30px", flexShrink: 0 })} />`
  → `<PlayIcon className={icon({ usage: "cta" })} />`
- `icon` 레시피의 `cta` variant가 동일한 크기 및 `flexShrink: 0`을 포함

## 검증 방법
- `pnpm run tsc` 실행 → 타입 에러 없음 확인

## 교정 사항
- 없음
