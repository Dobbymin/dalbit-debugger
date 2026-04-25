---
name: pr-writer
description: Writes a GitHub Pull Request body for the current branch by reading commit history and following the project PR template. Use when the user asks to write, create, or draft a PR.
---

# PR Writer

PR 본문을 커밋 기록과 PR 템플릿을 기반으로 자동 작성한다.

## Execution Process

아래 순서를 반드시 따른다.

### 1. 브랜치 및 이슈 번호 확인

```bash
git branch --show-current
```

브랜치 이름에서 이슈 번호를 추출한다.

- 규칙: `<type>#<issue_number>-<description>`
- 예시: `feat#01-debugger-page-ui` → 이슈 번호 `#1`
- 이슈 번호가 `01`, `02`처럼 0이 붙어있으면 `#1`, `#2`로 변환한다.

### 2. 커밋 기록 조회

main 브랜치 분기 이후의 커밋만 가져온다.

```bash
git log main..HEAD --oneline
```

커밋 메시지를 분석해 변경 내용의 큰 흐름을 파악한다.

### 3. PR 본문 작성

아래 템플릿을 그대로 사용하되, 각 섹션을 커밋 기록 기반으로 채운다.

```markdown
## 📝 요약 (Summary)

(커밋 전체 흐름을 한두 문장으로 요약한다. 무엇을 왜 했는지 중심으로 작성.)

## ✅ 주요 변경 사항 (Key Changes)

- (커밋 메시지에서 도출한 핵심 변경 항목을 bullet로 나열)
- (기능/구조/설정 등 카테고리별로 묶어서 작성)
- (파일 경로는 포함하지 않는다)

## 💻 상세 구현 내용 (Implementation Details)

(변경 내용 중 기술적으로 설명이 필요한 부분을 작성한다. 코드 스니펫이나 이미지를 활용해도 좋다. 단순 CRUD나 UI 변경은 간략히 작성해도 무방하다.)

## 🚀 트러블 슈팅 (Trouble Shooting)

(커밋 기록이나 문맥에서 트러블 슈팅이 유추되면 작성하고, 없으면 "해당 없음"으로 작성한다.)

## ⚠️ 알려진 이슈 및 참고 사항 (Known Issues & Notes)

(이번 PR에서 해결하지 않았지만 리뷰어가 알아야 할 사항을 작성한다. 없으면 "해당 없음"으로 작성한다.)

## #️⃣ 관련 이슈 (Related Issues)

- #<이슈번호>
```

### 4. 작성 규칙

- **파일 경로를 절대 포함하지 않는다.** 변경된 기능/개념 중심으로 서술한다.
- 커밋 메시지가 한국어면 PR 본문도 한국어로 작성한다.
- 구현 세부 내용이 충분하지 않으면 커밋 diff를 추가로 확인한다.

```bash
git diff main..HEAD --stat
```

- `관련 이슈` 섹션의 이슈 번호는 반드시 브랜치 이름에서 추출한 번호를 사용한다.
- PR 본문만 출력한다. 부가 설명을 앞뒤로 붙이지 않는다.
