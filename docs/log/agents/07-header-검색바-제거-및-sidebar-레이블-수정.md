# 07. Header 검색바 제거 및 Sidebar 레이블 수정

## 사용한 에이전트 도구
- Claude Code (메인 에이전트, 직접 파일 편집)

## 위임 범위와 판단 근거
두 가지 소규모 정리 작업을 수행했다.

1. Header 검색바 제거: ExamplesPage에서 보이던 "Search examples..." UI를 사용하지 않을 예정으로 제거
2. Sidebar "Snippets" 레이블 → "Examples"로 변경: 이동 대상 경로(`/examples`), 페이지명(`ExamplesPage`), Header 탭명(`Library`)과의 일관성을 고려하여 명확한 네이밍으로 수정

수정 범위:
- `src/widgets/layouts/components/Header.tsx`
- `src/widgets/layouts/ui/RootLayout.tsx`
- `src/widgets/layouts/components/Sidebar.tsx`

## 변경 내용

### Header.tsx (검색바 제거)
- `SearchIcon`, `cx`, `icon` import 제거
- `showSearch` prop 및 검색바 렌더링 블록 전부 제거
- `Props` 타입에서 `showSearch?: boolean` 제거

### RootLayout.tsx
- Examples 경로 설정에서 `showSearch: true` 제거

### Sidebar.tsx
- `{ label: "Snippets" }` → `{ label: "Examples" }`로 변경

## 검증 방법
- `pnpm run tsc` 실행 → 타입 에러 없음 확인

## 교정 사항
- 없음
