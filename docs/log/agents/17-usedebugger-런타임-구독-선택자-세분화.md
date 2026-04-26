# 17. useDebugger 런타임 구독 선택자 세분화

## 사용한 에이전트 도구
- GitHub Copilot AI Agent (copilot-ai-agent)
- read_file
- apply_patch
- run_in_terminal
- create_file

## 위임 범위와 판단 근거
- `useDebugger`가 `useDebugStore()` 전체를 구독하던 구조를, 런타임 제어에 필요한 상태/액션만 구독하도록 세분화.
- `useDebugSelectors`에 런타임 전용 선택자 훅을 추가해, 디버거 실행 로직이 페이지 표시 상태 변화에 불필요하게 반응하지 않도록 구독 범위를 축소.

## 검증 방법
- `pnpm run lint && pnpm run tsc`
- 결과: lint/tsc 모두 통과.

## 교정 사항
- 없음.
