# 01. Header 컴포넌트 분리 및 Stop Hook 수정

## 사용한 에이전트 도구
- Read, Edit, Glob, Grep, Bash, Write

## 위임 범위와 판단 근거

### Header 컴포넌트 분리
각 페이지(`MainPage`, `DebuggerPage`, `ExamplesPage`)에 중복 구현된 인라인 `<header>` 블록을 `src/widgets/layouts/components/Header.tsx`로 추출.
- FSD 원칙상 공유 레이아웃 컴포넌트는 `widgets` 레이어에 위치해야 하므로 이 범위를 에이전트에 위임
- 각 페이지별 헤더 스타일 차이(MainPage: sticky + 최대 너비 컨테이너 / 나머지: full-width flex)를 `sticky` prop으로 분기 처리

### Stop Hook 수정
기존 Stop hook이 `systemMessage`를 사용해 UI에만 표시되고 Claude가 실제 행동을 하지 않는 문제를 수정.
- `hookSpecificOutput.additionalContext`로 변경하여 모델 컨텍스트에 직접 주입되도록 함

### widgets/layouts/index.ts 수정
FSD public API 준수를 위해 `./components` export 추가.

## 검증 방법
- `pnpm run lint` — 경고 없이 통과
- `pnpm run format` — 자동 포맷 통과
- `pnpm run tsc --noEmit` — 타입 오류 없음
- Stop hook JSON 유효성: `jq -e '.hooks.Stop[0].hooks[0].command'` 통과
- hook command 출력 JSON: `echo ... | jq .` 통과

## 교정 사항
- 초기 Stop hook 설정(`systemMessage`)이 Claude에게 행동을 강제하지 않는 구조였음. `additionalContext`로 교체하여 모델 컨텍스트 주입 방식으로 수정.
