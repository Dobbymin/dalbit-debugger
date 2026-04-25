# 02. Header 중복 렌더링 제거

## 사용한 에이전트 도구
- Claude Code (Read, Edit, Bash)

## 위임 범위와 판단 근거

### 문제
- `RootLayout`에 `<Header />`가 렌더링되고 있었음
- `MainPage`, `DebuggerPage`, `ExamplesPage` 각 페이지에도 `<Header>`가 렌더링되어 화면에 Header가 2개 나타나는 버그 발생

### 판단 근거
- Header는 RootLayout에서 한 번만 렌더링하는 것이 적절 (레이아웃 책임 분리)
- 단, 각 페이지는 다른 props를 Header에 전달하고 있었음:
  - `MainPage`: `activeTab="Debugger"`, `sticky=true`
  - `DebuggerPage`: `activeTab="Debugger"`
  - `ExamplesPage`: `activeTab="Library"`, `showSearch=true`
- `useLocation`으로 현재 경로를 파악해 RootLayout에서 라우트별 props를 결정하는 방식을 채택
- 경로 문자열 하드코딩 대신 `@/shared`의 `ROUTE_PATHS` 상수를 활용

### 수정 내용
- `RootLayout.tsx`: `useLocation` + `ROUTE_HEADER_CONFIG` 맵으로 라우트별 Header props 주입
- `MainPage.tsx`: `<Header>` 렌더링 및 import 제거
- `DebuggerPage.tsx`: `<Header>` 렌더링 및 import 제거
- `ExamplesPage.tsx`: `<Header>` 렌더링 및 import 제거

## 검증 방법
- `pnpm run tsc` 타입 검사 통과 (오류 없음)

## 교정 사항
- 초기 접근(RootLayout에서 Header 제거하여 각 페이지에 위임 유지)은 사용자 요청과 반대 방향이어서 취소됨
- 사용자 지시에 따라 RootLayout에 Header를 두고 각 페이지에서 제거하는 방향으로 수정
- 경로 하드코딩 지적 후 `ROUTE_PATHS` 상수를 활용하도록 즉시 수정
