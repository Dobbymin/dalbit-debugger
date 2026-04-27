# 달빛약속 스텝 디버거 — 프로젝트 제출 정보

## 저장소 및 배포 URL

| 항목 | URL |
|------|-----|
| GitHub 저장소 | https://github.com/Dobbymin/dalbit-debugger |
| 배포 URL | https://dalbit.dobbymin.cloud/ |

## 프로젝트 개요

**달빛약속 스텝 디버거(Dalbit Step Debugger)**는 한국어 프로그래밍 언어 [달빛약속](https://dalbit-yaksok.postica.app)의 코드 실행 과정을 한 줄씩 시각화하는 인터랙티브 웹 디버거입니다.

코딩을 처음 배우는 사람도 "코드가 어떻게 동작하는가"를 직관적으로 이해할 수 있도록 설계했습니다.

## 핵심 기능

- **단계별 실행(Step-by-step)**: 버튼을 누를 때마다 한 줄씩 실행, 실행 줄 하이라이트
- **자동 실행(Auto-run)**: 속도 슬라이더(100ms~2000ms)로 자유롭게 속도 조절
- **전체 실행(Run All)**: 지연 없이 전체 코드 즉시 실행
- **변수 패널**: 각 단계마다 현재 스코프의 변수 이름·타입·값 실시간 표시
- **출력 패널**: 표준 출력(`보여주기`) 로그 누적 표시
- **예제 라이브러리**: 달빛약속 학습용 기본 예제 코드 제공
- **모바일 반응형**: 480px 이하 모바일 화면 최적화 레이아웃

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | React 19 |
| 스타일링 | PandaCSS |
| 빌드 도구 | Vite |
| 언어 | TypeScript (strict) |
| 에디터 | Monaco Editor + @dalbit-yaksok/monaco-language-provider |
| 런타임 | @dalbit-yaksok/core (JSR) |
| 상태 관리 | Zustand + Immer |
| 아키텍처 | Feature-Sliced Design (FSD) |
| 패키지 매니저 | pnpm |

## 에이전트 협업 환경

- **Claude Code** (claude-sonnet-4-6) — 주 코딩 에이전트
- **ECC 하네스 엔지니어링** ([everything-claude-code](https://github.com/affaan-m/everything-claude-code)) — MCP 플러그인·스킬·훅·프로젝트 메모리 확장
- **oh-my-claudecode** — LSP 진단, 세션 관리
- **MCP 서버**: Context7, Playwright, GitHub, Sequential Thinking, Notion, Memory

## 배포 환경

개인 라즈베리파이 우분투 기반 웹 서버에 Docker 컨테이너로 배포:

- **서버**: Raspberry Pi (Ubuntu Linux)
- **도메인**: `dalbit.dobbymin.cloud`
- **빌드**: `pnpm build` → `dist/` 폴더 정적 파일 서빙

## 제출 문서 목록

| 분류 | 위치 |
|------|------|
| 아이디에이션 | `docs/common/ideation.md` |
| 아키텍처 | `docs/common/architecture.md` |
| ADR (6개) | `docs/adr/01~06-*.md` |
| 에이전트 협업 기록 (30개) | `docs/log/agents/` |
| 에이전트 환경 구성 | `docs/common/agent-environment.md` |
| 회고 | `docs/common/retrospective.md` |
| CLAUDE.md | `CLAUDE.md` |
