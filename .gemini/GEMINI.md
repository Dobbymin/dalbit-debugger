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


## 에이전트 협업 기록 규칙 (agent-collaboration-record) (필수)

**모든 에이전트는 작업을 수행할 때 반드시 `agent-collaboration-record` 스킬을 사용하여 기록을 남겨야 합니다.**

### 기록 위치
`docs/logs/agents/`

### 파일 네이밍 규칙
`{2자리 순번}-{작업명}.md` (예: `01-초기-구조-설계.md`, `02-런타임-연동.md`)

### 기록 내용
각 파일은 반드시 다음 항목을 포함해야 합니다:
1. 사용한 에이전트 도구
2. 위임 범위와 판단 근거
3. 검증 방법
4. 교정 사항 (잘못된 방향 제안 시 수정 내용)

### 실행 원칙
- 작업 범위(scope)마다 하나의 파일을 생성하거나 업데이트합니다.
- 기록은 사실 위주로 간결하게 작성하며, 전체 대화 내용이 아닌 결정 사항과 검증 과정을 기술합니다.
- `activate_skill("agent-collaboration-record")`를 사용하여 상세 가이드를 확인하고 준수하십시오.
