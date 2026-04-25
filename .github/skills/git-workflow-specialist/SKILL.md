---
name: git-workflow-specialist
description: Manages Git workflow including GitHub issue creation, branch naming conventions, and Korean commit messages. Use this skill when initiating new tasks (features, fixes, chores) that require source control.
---

# Git Workflow Specialist

This skill enforces strict branching strategies and commit conventions for the project.

## 1. Branching Rules

All branch names must be in **English**, lowercase, and include the issue number.

- **Format**: `<type>#<issue_number>-<description>`
- **Allowed Types**: `feat`, `chore`, `fix`, `refactor`, `docs`
- **Naming Conventions**:
  - Use lowercase letters only.
  - Connect words with hyphens (`-`).
  - Example: `feat#01-mainpage`, `fix#12-auth-bug`

## 2. Commit Message Rules

Commit messages must be written in **Korean** and follow the Conventional Commits format.

- **Format**: `<type>: <subject>`
- **Allowed Types**: `feat`, `chore`, `fix`, `refactor`, `docs`
- **Guidelines**:
  - **Subject**: Describe the changes clearly and concisely in Korean (Noun-ending style recommended).
  - **Footer**: If an issue needs to be closed, add `이슈: #<issue_number>` or `Closes #<issue_number>` on the last line.
- **Example**:
  - `feat: 메인 페이지 레이아웃 구현`
  - `fix: 로그인 시 발생하는 무한 루프 에러 수정`
  - `refactor: 중복되는 스타일 코드 유틸 함수로 분리`

## 3. Execution Process

Follow this sequence for every task:

1. **Issue Creation**: Create a GitHub issue using `github.create_issue` BEFORE starting any work.
2. **Branch Creation**: Identify the issue number and create a new branch following the **[Branching Rules]**.
3. **Implementation**: Modify the code as required by the issue.
4. **Commit**: Analyze the changes using `git diff` and create a commit message in Korean following the **[Commit Message Rules]**.

## Workflow Example

When starting a new feature for "User Authentication":
1. Call `mcp_github_create_issue(title="사용자 인증 기능 구현", ...)` -> Get issue #10.
2. Run `git checkout -b feat#10-user-auth`.
3. Perform coding tasks.
4. Commit: `git commit -m "feat: 사용자 인증 로직 및 JWT 연동 구현" -m "이슈: #10"`.
