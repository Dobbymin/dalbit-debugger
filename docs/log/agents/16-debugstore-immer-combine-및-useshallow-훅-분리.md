# 16. debugStore immer/combine 및 useShallow 훅 분리

## 사용한 에이전트 도구
- GitHub Copilot AI Agent (copilot-ai-agent)
- read_file
- apply_patch
- create_file
- run_in_terminal

## 위임 범위와 판단 근거
- `src/features/debugger/_stores/debugStore.ts`를 `zustand`의 `combine` + `immer` 미들웨어로 리팩토링해 상태/액션 경계를 명확히 분리.
- `useShallow`를 적용한 선택자 커스텀 훅을 `src/features/debugger/_hooks/useDebugSelectors.ts`로 분리해, 페이지 레이어에서 필요한 slice만 구독하도록 최적화.
- `src/pages/debugger/DebuggerPage.tsx`를 새 커스텀 훅 기반으로 교체해 관심사 분리를 강화.

## 검증 방법
- `pnpm run lint && pnpm run tsc`
- 결과: lint/tsc 모두 통과.

## 교정 사항
- 페이지 컴포넌트의 default export 누락 상태를 함께 보정하여 페이지 barrel export와 일치시킴.
