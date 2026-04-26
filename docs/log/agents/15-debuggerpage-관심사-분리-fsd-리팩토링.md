# 15. DebuggerPage 관심사 분리 FSD 리팩토링

## 사용한 에이전트 도구
- GitHub Copilot AI Agent (copilot-ai-agent)
- read_file
- apply_patch
- create_file
- run_in_terminal

## 위임 범위와 판단 근거
- `src/pages/debugger/DebuggerPage.tsx`에 집중된 UI/상태/행동을 분리해, pages 레이어를 조합 전용으로 축소.
- FSD 규칙에 맞춰 디버거 화면 구성 요소를 `src/features/debugger/ui/`로 이동하고, pages는 feature public API만 사용하도록 변경.
- 분리 단위: 컨트롤 바, 에디터 패널, 변수 패널, 출력 패널, 푸터, 전체 조합 컴포넌트.

## 검증 방법
- `pnpm run lint`
- `pnpm run lint:fix`
- `pnpm run format`
- `pnpm run tsc`
- 결과: lint/format/tsc 모두 통과.

## 교정 사항
- `execution_subagent` 실행이 주간 한도(rate limit)로 실패하여, 동일 검증 절차를 `run_in_terminal`로 대체 수행.
- import 정합성을 위해 `src/features/debugger/index.ts`와 `src/features/debugger/ui/index.ts`의 public export를 보강.
