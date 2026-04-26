# 18. Console Ninja 172 런타임 오류 수정

## 사용한 에이전트 도구
- `console-ninja_runtimeErrorById` (ID 172 단건 오류 분석)
- `console-ninja_runtimeLogsAndErrors` / `console-ninja_runtimeErrors` (선행/후속 런타임 오류 상태 확인)
- `read_file`, `grep_search` (스택에 기록된 파일 경로 기반 코드 확인)
- `apply_patch` (훅 선택자 코드 수정)
- `execution_subagent` (타입체크/린트 검증)

## 위임 범위와 판단 근거
- 위임 범위: 런타임 에러 ID 172의 직접 원인 파악, 로그 근거 수집, 최소 코드 수정
- 판단 근거: 스택 트레이스가 `src/features/debugger/_hooks/useDebugSelectors.ts`와 Zustand `useStore` 경로를 직접 가리켰고, 동일 시점에 Hook order 경고가 함께 관찰되어 선택자 훅 영역을 우선 교정하는 것이 재현/수정 비용이 가장 낮았음

## 검증 방법
- Console Ninja 재조회:
  - `console-ninja_runtimeErrorById(172)` 결과 `Application runtime error not found`
  - `console-ninja_runtimeErrors()` 결과 `errors: []`
- 정적 검증:
  - `pnpm run tsc` 통과
  - `pnpm run lint` 통과

## 교정 사항
- 초기 점검 중 `useDebugger` 관련 타입 진단이 간헐적으로 표시되어, 실제 소스 재확인 후 `step` 경로에서 `sessionRef.current` 직접 접근 대신 로컬 변수로 null-guard를 명시해 안정화함
- 최종적으로 런타임 오류(172)와 린트/타입체크 모두 정상 상태를 확인함
