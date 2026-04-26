# 25. 프로덕션 console.error 제거

## 사용한 에이전트 도구
- Agent (sub-agent, 병렬 실행)

## 위임 범위와 판단 근거
CLAUDE.md 규칙: `console.log`/`console.error`를 프로덕션 코드에 남기지 말 것.
`useDebugger.ts:54`에 `console.error`가 잔존해 있었음.
Error Boundary 구현 작업(24번)과 독립적이므로 병렬 sub-agent로 위임.

위임 범위:
- `src/features/debugger/_hooks/useDebugger.ts`: `console.error` 제거, `catch (e)` → `catch`로 변경

## 검증 방법
- `pnpm run lint && pnpm run format && pnpm run tsc` 통과 확인
- 빌드 후 0 errors 확인

## 교정 사항
- 특이사항 없음.
