# 05. Header · Sidebar 네비게이션 수정

## 사용한 에이전트 도구
- Claude Code (메인 에이전트, 직접 파일 편집)

## 위임 범위와 판단 근거
Header와 Sidebar가 `button` 엘리먼트로 구성되어 실제 페이지 이동이 불가능한 상태였고, 불필요한 UI 요소와 hover 스타일 누락 문제를 함께 수정했다.

수정 범위:
- `src/widgets/layouts/components/Header.tsx`
- `src/widgets/layouts/components/Sidebar.tsx`
- `src/widgets/layouts/ui/RootLayout.tsx`

## 변경 내용

### Header.tsx
- 네비게이션 탭을 `button` → `Link` (react-router-dom)으로 교체, 실제 라우팅 동작
- "Documentation" 탭 제거: 대응하는 라우트(`ROUTE_PATHS`)가 없어 불필요
- "Start Debugging" CTA 버튼 제거: 네비게이션 탭과 기능 중복
- `NAV_TABS` 배열을 `{ label, path }` 구조로 변경하여 경로 매핑 명시
- 탭 hover 시 색상 + 하단 테두리(`borderBottomColor`) 동시 전환 추가
- `ActiveTab` 타입을 `"Debugger" | "Library"`로 축소

### Sidebar.tsx
- 네비게이션 항목을 `button` → `Link`로 교체
- Settings 항목 제거: `path: null`로 동작 없는 불필요한 요소
- `SettingsIcon` import 제거
- hover 시 비활성 항목에 `surfaceContainerLow` 배경색 전환 추가
- 활성 항목은 hover 시에도 `surfaceContainerLowest` 유지

### RootLayout.tsx
- `ActiveTab` 타입을 Header와 동기화: `"Debugger" | "Library" | "Documentation"` → `"Debugger" | "Library"`

## 검증 방법
- `pnpm run tsc` 실행 → 타입 에러 없음 확인

## 교정 사항
- 없음
