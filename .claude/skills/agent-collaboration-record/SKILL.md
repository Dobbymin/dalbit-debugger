---
name: agent-collaboration-record
description: "Use when documenting agent-assisted work by task scope, creating docs/log/agents/*.md files, or writing evidence for AI agent orchestration. Enforces per-scope records with tools used, delegated scope, verification, and correction notes."
origin: custom
---

# Agent Collaboration Record

Use this skill when you need to document how AI agents were used during a task.

## Purpose

Create one file per work scope so the record stays readable and reviewable.

## Required File Pattern

- Place files under `docs/log/agents/`
- Use numbered filenames such as `01-초기-구조-설계.md`, `02-런타임-연동.md`
- Keep one file focused on one task scope

## Each File Must Include

- Used agent tools
- Task scope delegated to the agent, and why that scope was chosen
- How the agent output was verified
- How bad directions or mistakes were corrected, when applicable

## Writing Rules

- Keep the record factual and concise
- Describe decisions and checks, not the full conversational transcript
- Mention the exact validation used when possible
- If an agent suggested the wrong direction, write what was wrong and how it was corrected

## Suggested Template

```markdown
# 01. 작업명

## 사용한 에이전트 도구
- ...

## 위임 범위와 판단 근거
- ...

## 검증 방법
- ...

## 교정 사항
- ...
```

## Quality Gate

Before finishing, check that:

- each scope has its own file
- the file names are numbered consistently
- verification is specific and reproducible
- corrections are recorded when a wrong path was suggested