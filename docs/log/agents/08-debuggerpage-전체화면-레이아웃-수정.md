# 08. DebuggerPage 전체 화면 레이아웃 수정

## 사용한 에이전트 도구
- Claude Code (메인 에이전트, 직접 파일 편집)

## 위임 범위와 판단 근거
DebuggerPage가 화면의 절반 정도만 차지하는 레이아웃 문제를 수정했다.

원인: `RootLayout.tsx`의 외부 `div`에 height 제약이 없어 내부 `flex: 1` 자식이 효과적으로 공간을 채우지 못함.

수정 범위:
- `src/widgets/layouts/ui/RootLayout.tsx`
- `src/pages/debugger/DebuggerPage.tsx`

## 변경 내용

### RootLayout.tsx
- 외부 `div`에 `height: "100dvh"`, `display: "flex"`, `flexDirection: "column"` 추가
- `<Outlet />` 감싸는 래퍼 `div`에 `flex: 1`, `minHeight: 0`, `display: "flex"`, `flexDirection: "column"` 추가
  - `minHeight: 0`: flex 자식이 부모를 넘치지 않고 올바르게 축소될 수 있도록 하는 필수 설정

### DebuggerPage.tsx
- 루트 요소에 `flex: 1`, `minHeight: 0` 추가하여 RootLayout이 제공하는 남은 공간을 전부 차지하도록 수정

## 검증 방법
- `pnpm run tsc` 실행 → 타입 에러 없음 확인
- 브라우저에서 `/debugger` 경로 접속하여 전체 화면 점유 확인

## 교정 사항
- 없음
