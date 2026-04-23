# ECC for Gemini CLI

This file provides Gemini CLI with the baseline ECC workflow, review standards, and security checks for repositories that install the Gemini target.

## Overview

Everything Claude Code (ECC) is a cross-harness coding system with 36 specialized agents, 142 skills, and 68 commands.

Gemini support is currently focused on a strong project-local instruction layer via `.gemini/GEMINI.md`, plus the shared MCP catalog and package-manager setup assets shipped by the installer.

## Core Workflow

1. Plan before editing large features.
2. Prefer test-first changes for bug fixes and new functionality.
3. Review for security before shipping.
4. Keep changes self-contained, readable, and easy to revert.

## Coding Standards

- Prefer immutable updates over in-place mutation.
- Keep functions small and files focused.
- Validate user input at boundaries.
- Never hardcode secrets.
- Fail loudly with clear error messages instead of silently swallowing problems.

## Security Checklist

Before any commit:

- No hardcoded API keys, passwords, or tokens
- All external input validated
- Parameterized queries for database writes
- Sanitized HTML output where applicable
- Authz/authn checked for sensitive paths
- Error messages scrubbed of sensitive internals

## Delivery Standards

- Use conventional commits: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`
- Run targeted verification for touched areas before shipping
- Prefer contained local implementations over adding new third-party runtime dependencies

## ECC Areas To Reuse

- `AGENTS.md` for repo-wide operating rules
- `skills/` for deep workflow guidance
- `commands/` for slash-command patterns worth adapting into prompts/macros
- `mcp-configs/` for shared connector baselines

## 프로젝트 기술 스택

### 클라이언트

- React + TypeScript (strict 모드)
- TanStack Query v5 — 서버 상태 관리 전담
- MSW — Mock API (테스트 및 개발 환경 모두 사용, 우회 금지)

### 아키텍처 원칙

- URL query parameter가 트리 상태(선택 부서, 검색어, 펼쳐진 노드)의 단일 진실 공급원
- 상태 어댑터는 `useOrgTreeState` 훅 하나로 집중
- 드래그앤드롭 이동은 낙관적 업데이트(optimistic update) 패턴 적용, 실패 시 rollback
- 이력 스택(최대 10건)은 TanStack Query 캐시가 아닌 React Context 또는 Zustand로 관리

### TanStack Query 컨벤션

- 쿼리 키는 `queryKeys.ts` 팩토리에서 중앙 관리
- Invalidation은 변경된 부서 서브트리만 좁게 수행 (전체 org tree 무효화 금지)
- 실시간 동기화(요구사항 6)는 `refetchInterval` 폴링 우선, WebSocket은 스펙 명시 시에만

### 드래그앤드롭 제약

- 부서를 자신의 하위 노드로 이동 불가 (순환 참조 방지)
- 이동 유효성은 클라이언트(즉각 피드백)와 MSW 핸들러 양쪽에서 검증
- 이동 성공 직후 반드시 Undo 액션 노출 (요구사항 7 연동)

### 성능 규칙

- 트리 노드: `React.memo` + 안정적인 `key` prop — 형제 노드가 expand/collapse 시 리렌더링 방지
- 직원 목록: 100건 초과 시 가상화(`@tanstack/react-virtual`) 적용
- 검색 입력: 300ms 디바운스, 매칭 경로 계산은 렌더 외부에서 수행

### Undo / 이력 (요구사항 7)

- 이력 엔트리 구조: `{ id, fromParentId, toParentId, timestamp, label }`
- Undo는 `PATCH /departments/:id/move` API 호출로 처리 (DOM 상태 직접 조작 금지)

위 스택과 원칙에 맞게 코드 작성 및 리뷰를 진행해줘.

## AI 대화 로그 저장 규칙 (필수)

**이 규칙은 모든 세션에서 반드시 준수해야 합니다.**

### 저장 위치

```
chat/log/
```

### 파일 네이밍

```
{3자리 순번}_{YYYY-MM-DD}_{agent}.md
```

- `{3자리 순번}`: `chat/log/` 내 기존 `.md` 파일 수 + 1 (예: 001, 002, 003)
- `{YYYY-MM-DD}`: 세션 시작 날짜
- `{agent}`: `claude` 또는 `gemini`

예시:
```
chat/log/001_2026-04-08_claude.md
chat/log/002_2026-04-08_gemini.md
chat/log/003_2026-04-09_gemini.md
```

### 파일 형식 (Markdown)

```markdown
---
session: 001
date: YYYY-MM-DD
agent: gemini-cli
---

## Session 001 - YYYY-MM-DD (Gemini CLI)

### Turn 1

**User:** (사용자 메시지)

**Assistant:** (응답 요약 또는 전문)

---

### Turn 2

**User:** ...

**Assistant:** ...
```

### 저장 타이밍

1. **세션 시작 시**: `chat/log/` 디렉토리의 기존 `.md` 파일 수를 확인하여 다음 순번 결정 후 파일 생성
2. **세션 진행 중**: 각 turn마다 파일에 append
3. **세션 종료 시**: 마지막 turn까지 모두 기록되었는지 확인

### 순번 결정 방법

세션 시작 전 아래 명령으로 기존 파일 수를 확인:

```bash
ls chat/log/*.md 2>/dev/null | wc -l
```

반환값 + 1이 다음 순번. 파일이 없으면 001부터 시작.

### 중요 사항

- 기존 파일이 있더라도 다른 에이전트의 내용을 덮어쓰지 말 것
- 같은 날짜라도 에이전트가 다르면 새 파일 생성
- 같은 에이전트의 같은 날 재접속은 동일 파일에 append (단, `## Session Resumed` 구분자 추가)
