# 04. Sidebar 공용 컴포넌트 분리

## 사용한 에이전트 도구
- Claude Code (Edit, Read, Bash)

## 위임 범위와 판단 근거
- `DebuggerPage`와 `ExamplesPage`에 각각 중복으로 존재하던 사이드바 내비게이션을 `Sidebar` 공용 컴포넌트로 통합
- 라우트 구조상 두 페이지가 이미 `PageLayout`으로 감싸져 있어, `PageLayout`에 `<Sidebar />`를 추가하면 별도 코드 없이 두 페이지에 일괄 적용 가능하다는 판단 하에 작업 진행

### 작업 내용
1. `src/widgets/layouts/components/Sidebar.tsx`: 플레이스홀더(`<div>Sidebar</div>`)를 실제 내비게이션으로 구현
   - `useLocation`으로 현재 경로를 감지해 활성 메뉴 표시
   - `ROUTE_PATHS` 상수로 경로 비교
   - `ICON_STYLE.nav` 토큰으로 아이콘 스타일 적용
2. `src/widgets/layouts/ui/PageLayout.tsx`: flex 레이아웃에 `<Sidebar />`와 `<Outlet />` 배치
3. `src/pages/debugger/DebuggerPage.tsx`: `leftMenus` 상수, `<aside>` 사이드바, 관련 아이콘 import 제거
4. `src/pages/examples/ExamplesPage.tsx`: `menuItems` 상수, `<aside>` 사이드바, 관련 아이콘/토큰 import 제거

## 검증 방법
- `pnpm run lint && pnpm run tsc` 실행 → 에러 0건 확인
- styled-system 자동생성 파일의 warning 18건은 기존부터 존재하던 것으로 무시

## 교정 사항
- 없음
