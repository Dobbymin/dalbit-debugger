# 에이전트 환경 구성

> 달빛약속 스텝 디버거 프로젝트에서 사용하는 에이전트 도구, 시스템 프롬프트, MCP 서버, 스킬 구성을 정리한 문서입니다.

## 1. 기본 에이전트 도구

### Claude Code (기본 도구)
- **모델**: Claude Sonnet 4.6
- **역할**: 코드 작성, 디버깅, 리팩토링, 문서화
- **기본 도구**:
  - `Read`: 파일 및 디렉토리 내용 조회
  - `Edit`: 파일 내용 수정 (diff 기반)
  - `Write`: 새 파일 생성 또는 전체 덮어쓰기
  - `Glob`: 파일 패턴 매칭 및 검색
  - `Grep`: 정규식 기반 코드 검색
  - `Bash`: 쉘 명령 실행 (검증 및 테스트용)
  - `Jupyter Notebook`: 노트북 셀 편집 및 실행

---

## 2. 시스템 프롬프트

### CLAUDE.md (프로젝트 컨텍스트)
**위치**: `/Users/gimgangmin/Desktop/Dev/homework/dalbit-debugger/CLAUDE.md`

프로젝트에 참여하는 모든 에이전트가 반드시 숙지해야 하는 문서입니다.

#### 포함 내용

1. **프로젝트 개요**
   - 달빛약속 스텝 디버거의 정의와 핵심 목표
   - 대상 사용자 (코딩 초심자)

2. **기술 스택**
   - React 19, PandaCSS, Vite, TypeScript (strict mode)
   - Monaco Editor, @dalbit-yaksok/core (JSR), pnpm
   - Feature-Sliced Design (FSD) 아키텍처

3. **달빛약속 API 가이드**
   - `YaksokSession` 생성 및 실행
   - 스텝 실행 제어 (`stepByStep`, `pause()`, `resume()`)
   - 실행 모드 정의 (스텝 모드, 자동 실행 모드, 전체 실행 모드)
   - 런타임 규칙 및 타입 정의

4. **코드 품질 기준**
   - TypeScript strict mode 준수, `any` 사용 금지
   - Export 규칙 (pages는 default export, 나머지는 named export)
   - PandaCSS 사용, inline style 금지
   - 컴포넌트 파일당 하나의 컴포넌트 원칙

5. **절대 금지 사항**
   - `@dalbit-yaksok/core` 레포지토리 fork 금지
   - `node_modules` 직접 수정 금지 (`pnpm patch` 사용)
   - FSD 레이어 역방향 참조 금지
   - 같은 레이어 간 슬라이스 직접 참조 금지

6. **에이전트 협업 기록 규칙**
   - 의미 있는 작업 완료 후 `agent-collaboration-record` 스킬 사용
   - `docs/log/agents/` 에 `01-작업명.md` 형식으로 기록
   - 단순 질문·조회는 기록 생략 가능

7. **검사 명령어**
   ```bash
   pnpm run lint && pnpm run lint:fix
   pnpm run format
   pnpm run tsc
   ```

8. **달빛약속 테스트용 기본 코드**
   - 변수와 조건문 예제
   - 반복문 예제

---

## 3. MCP 서버 및 플러그인

이 프로젝트에서는 다음의 MCP 서버 및 Claude Code 플러그인을 활용합니다.

### 3.1 Context7 (`mcp__plugin_ecc_context7`)
**용도**: 최신 라이브러리 문서 조회 및 코드 예제 검색

**활용 사례**:
- `@dalbit-yaksok/core` JSR 패키지의 최신 API 확인
- `@dalbit-yaksok/monaco-language-provider` 통합 가이드 조회
- React 19, Zustand, PandaCSS 최신 문서 조회

**함수**:
- `mcp__plugin_ecc_context7__resolve-library-id`: 라이브러리 ID 해석
- `mcp__plugin_ecc_context7__query-docs`: 문서 검색 및 예제 조회

---

### 3.2 GitHub (`mcp__plugin_ecc_github`)
**용도**: PR 생성, 이슈 관리, 저장소 작업

**활용 사례**:
- 기능 구현 완료 후 PR 생성
- 버그 리포트 및 이슈 관리
- 저장소 파일 직접 생성/수정 (Bash를 사용하지 않는 경우)

**주요 함수**:
- `create_pull_request`: PR 작성 및 생성
- `list_issues`: 오픈 이슈 확인
- `create_issue`: 버그/개선 사항 이슈 등록
- `push_files`: 복수 파일 동시 커밋

---

### 3.3 Playwright (`mcp__plugin_ecc_playwright`)
**용도**: 브라우저 자동화를 통한 UI 검증

**활용 사례**:
- 로컬 개발 서버(localhost:5173) 접속하여 UI 렌더링 확인
- 디버거 페이지의 단계별 실행 기능 시뮬레이션
- 에러 바운더리, 라우팅 검증

**주요 함수**:
- `browser_navigate`: URL 이동
- `browser_snapshot`: 접근성 스냅샷 (아이템 선택, 클릭용)
- `browser_take_screenshot`: 시각적 스크린샷
- `browser_click`, `browser_type`: 사용자 상호작용 시뮬레이션
- `browser_wait_for`: 요소 렌더링 대기

---

### 3.4 Sequential Thinking (`mcp__plugin_ecc_sequential-thinking`)
**용도**: 복잡한 문제 단계적 분석 및 해결

**활용 사례**:
- 런타임 아키텍처 설계 (예: 디버그 상태 관리, 훅 설계)
- 다단계 리팩토링 계획 수립
- 타입 시스템 재설계

**특징**:
- 각 단계를 명확히 하고, 필요시 이전 단계를 재검토 가능
- 가설 생성 및 검증 반복

---

### 3.5 Notion (`mcp__claude_ai_Notion`)
**용도**: 노션 워크스페이스 연동 (문서, 데이터베이스 관리)

**활용 사례**:
- 프로젝트 문서 조회 및 업데이트
- 데이터베이스에서 태스크/이슈 조회

**주요 함수**:
- `notion-fetch`: 페이지/데이터베이스 내용 조회
- `notion-create-pages`: 새로운 문서 생성
- `notion-update-page`: 기존 문서 수정
- `notion-search`: 노션 워크스페이스 검색

---

### 3.6 oh-my-claudecode (`mcp__plugin_oh-my-claudecode_t`)
**용도**: 프로젝트 메모리, LSP 진단, 세션 관리

**주요 모듈**:

#### LSP 도구 (코드 분석)
- `lsp_hover`: 심볼 정보 및 문서 조회
- `lsp_goto_definition`: 정의 위치 찾기
- `lsp_find_references`: 심볼 참조 찾기
- `lsp_document_symbols`: 파일 구조 아웃라인
- `lsp_workspace_symbols`: 전체 워크스페이스 심볼 검색
- `lsp_diagnostics`: LSP 진단 (에러, 경고, 힌트)
- `lsp_diagnostics_directory`: 디렉토리 단위 타입 검사 (`tsc --noEmit`)
- `lsp_rename`: 심볼 이름 변경 (전체 프로젝트)
- `lsp_code_actions`: 코드 액션/리팩토링 제안

#### 프로젝트 메모리 도구
- `project_memory_read`: 프로젝트 메모리 조회
- `project_memory_write`: 프로젝트 메모리 업데이트
- `project_memory_add_note`: 메모 추가
- `project_memory_add_directive`: 지시사항 저장 (세션 간 유지)

#### 메모장 (Notepad)
- `notepad_read`: 우선순위, 작업 메모 조회
- `notepad_write_priority`: 우선 컨텍스트 작성
- `notepad_write_working`: 작업 메모 추가

#### 지식 그래프 (Memory)
- `create_entities`: 엔티티 생성 (개념, 패턴, 결정사항)
- `create_relations`: 엔티티 간 관계 정의
- `search_nodes`: 지식 그래프 검색

---

## 4. 에이전트 협업 스킬

### agent-collaboration-record
**용도**: 에이전트 작업 기록 자동화

**사용법**:
```bash
/agent-collaboration-record "작업 제목" "작업 설명" "사용 도구" "검증 방법"
```

**파일 생성 위치**: `docs/log/agents/[번호]-[작업명].md`

**포함 내용**:
- 사용한 에이전트 도구
- 위임 범위와 판단 근거
- 검증 방법
- 교정 사항 (발견된 버그/문제)

**예시**:
- `01-header-컴포넌트-분리-및-stop-hook-수정.md`
- `11-달빛약속-런타임-연동-및-상태-관리-구현.md`
- `24-error-boundary-페이지-구현.md`

---

### git-workflow-specialist
**용도**: Git 커밋 및 브랜치 관리

**기능**:
- 브랜치 생성 및 체크아웃
- 변경사항 스테이징
- 커밋 메시지 작성 및 커밋
- PR 준비

---

### pr-writer
**용도**: GitHub PR 설명 자동 작성

**활용 사례**:
- 기능 구현 완료 후 PR 설명 생성
- 템플릿 기반 PR 본문 작성 (Summary, Test plan, Screenshots 등)

---

## 5. 에이전트 운용 방식

### 5.1 작업 흐름

1. **작업 분석**
   - CLAUDE.md 숙지
   - 프로젝트 메모리 확인
   - 관련 타입/API 조사 (LSP, Context7 활용)

2. **구현 단계**
   - FSD 규칙 준수하여 코드 작성
   - 테스트 코드 작성 (Bash로 로컬 검증)
   - Playwright로 UI 검증 (필요시)

3. **검증 단계**
   ```bash
   pnpm run lint && pnpm run lint:fix
   pnpm run format
   pnpm run tsc
   ```

4. **문서화**
   - agent-collaboration-record 스킬로 기록 남김
   - PR 작성 (pr-writer 스킬 활용)

5. **협업**
   - sub-agent 병렬 실행으로 독립적 작업 동시 처리 (예: 기능 + 코드 품질)
   - 각 작업 범위 명확히 분리

---

### 5.2 병렬 실행 예시

**시나리오**: 기능 구현 + 코드 품질 동시 진행

```
1. Agent 1 (기능): 에러 바운더리 페이지 구현
   - src/pages/error/ErrorPage.tsx 생성
   - src/app/provider/components/ErrorBoundary.tsx 생성
   - 라우트 추가

2. Agent 2 (코드 품질): 기존 코드 리팩토링
   - 미사용 엔티티 제거
   - 중복 코드 정리
   - 타입 시스템 개선

→ 최종 병합: lint, format, tsc 통과 확인
```

---

## 6. 프로젝트 메모리 구조

oh-my-claudecode의 프로젝트 메모리는 다음 섹션으로 구성됩니다.

| 섹션 | 목적 | 예시 |
|------|------|------|
| `techStack` | 사용 기술 및 버전 | React 19, Zustand, PandaCSS, Vite 8 |
| `build` | 빌드 및 개발 설정 | pnpm, JSR 패키지 설치 방식 |
| `conventions` | 코딩 컨벤션 | FSD 레이어 규칙, Export 규칙 |
| `structure` | 프로젝트 구조 | FSD 디렉토리 트리, 슬라이스 정의 |
| `notes` | 주요 결정사항 | "런타임은 매 코드 변경마다 재생성" |
| `directives` | 지시사항 | "TypeScript strict mode 준수", "console.log 금지" |

---

## 7. 검증 및 모니터링

### 7.1 로컬 개발 검증

```bash
# 타입 검사
pnpm run tsc

# Lint 및 포맷
pnpm run lint:fix
pnpm run format

# 개발 서버 시작
pnpm dev
```

### 7.2 브라우저 검증 (Playwright)

```bash
# 로컬 서버 (localhost:5173) 접속 후 UI 검증
- 라우팅 (/, /debugger, /examples, /error)
- 디버거 기능 (코드 입력, 단계 실행, 변수 확인)
- 에러 처리 및 에러 바운더리
```

### 7.3 협업 기록 검증

생성된 기록 파일이 다음을 포함하는지 확인:
- 사용 도구 명시
- 위임 범위 명확화
- 검증 방법 기술
- 교정 사항 문서화

---

## 8. 참고 링크

### 프로젝트 내부 문서
- FSD 규칙: `docs/rule/fsd-rule.md`
- 에이전트 협업 기록: `docs/log/agents/`

### 외부 문서
- **달빛약속**: https://dalbit-yaksok.postica.app
  - 코드 위치 추적 API: https://dalbit-yaksok.postica.app/library/5.%20code-location-tracking.html
  - pause/resume API: https://dalbit-yaksok.postica.app/library/7.%20pause-and-resume.html
  - 런타임 변수: https://dalbit-yaksok.postica.app/library/2.%20runtime-variables.html
  - Monaco 통합: https://dalbit-yaksok.postica.app/monaco/usage-guide.html

- **라이브러리**:
  - `@dalbit-yaksok/core` JSR: https://jsr.io/@dalbit-yaksok/core
  - React 19: https://react.dev
  - Zustand: https://github.com/pmndrs/zustand
  - PandaCSS: https://panda-css.com
  - Monaco Editor: https://microsoft.github.io/monaco-editor/

---

## 9. 일반 질문 및 답변

### Q: 새로운 에이전트가 시작할 때 먼저 읽어야 할 문서는?
**A**:
1. CLAUDE.md (전체)
2. docs/rule/fsd-rule.md (아키텍처)
3. docs/log/agents/ (최근 3-5개 기록)

### Q: 코드를 변경한 후 검사 명령어를 매번 실행해야 하나?
**A**: 예. CLAUDE.md의 "검사 명령어" 섹션을 필수로 따릅니다.
```bash
pnpm run lint && pnpm run lint:fix
pnpm run format
pnpm run tsc
```

### Q: 의존성을 수정하려면?
**A**: `node_modules` 직접 수정은 금지. `pnpm patch` 사용.
```bash
pnpm patch @dalbit-yaksok/core
# 수정 후
pnpm patch-commit
```

### Q: FSD 레이어 간 참조 규칙은?
**A**: 단방향만 허용. `shared ← entities ← features ← widgets ← pages ← app`

### Q: 기능 구현 후 반드시 에이전트 기록을 남겨야 하나?
**A**: 의미 있는 작업(기능, 버그 수정, 리팩토링)은 필수. 단순 질문/조회는 생략 가능.

---

## 10. 버전 정보

| 항목 | 버전 | 비고 |
|------|------|------|
| Node.js | 18+ | pnpm 호환 |
| pnpm | 9+ | JSR 패키지 설치 지원 |
| React | 19 | Latest |
| TypeScript | strict mode | 최신 안정 버전 |
| Vite | 8 | Latest |
| PandaCSS | v0.x+ | 최신 안정 버전 |

---

마지막 업데이트: 2026-04-26
