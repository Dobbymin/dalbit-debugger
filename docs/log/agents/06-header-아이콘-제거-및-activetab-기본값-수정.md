# 06. Header 우측 아이콘 제거 및 activeTab 기본값 수정

## 사용한 에이전트 도구
- Claude Code (메인 에이전트, 직접 파일 편집)

## 위임 범위와 판단 근거
Header 컴포넌트의 두 가지 문제를 수정했다.

1. 우측 아이콘 버튼(설정/도움말/계정): 현재 사용 계획 없는 기능으로 불필요
2. MainPage에서 "Debugger" 탭이 활성화되는 문제: `/` 경로는 홈 페이지이므로 어떤 탭도 활성화되어서는 안 됨

수정 범위:
- `src/widgets/layouts/components/Header.tsx`
- `src/widgets/layouts/ui/RootLayout.tsx`

## 변경 내용

### Header.tsx
- `AccountCircleIcon`, `HelpCircleIcon`, `SettingsIcon`, `ICON_HOVER_TOKENS`, `ICON_MOTION` import 제거
- `ICON_ACTIONS` 배열 및 아이콘 버튼 렌더링 블록 전부 제거
- `activeTab` prop의 기본값 `"Debugger"` 제거 → 값이 없으면 `undefined`로 처리되어 탭이 활성화되지 않음

### RootLayout.tsx
- MainPage(`ROUTE_PATHS.MAIN`) 헤더 설정에서 `activeTab: "Debugger"` 제거
- 결과: `/` 경로 접근 시 어떤 탭도 하이라이트되지 않음

## 검증 방법
- `pnpm run tsc` 실행 → 타입 에러 없음 확인

## 교정 사항
- 없음
