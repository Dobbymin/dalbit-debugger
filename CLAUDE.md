# CLAUDE.md — 달빛약속 스텝 디버거 프로젝트

> 이 파일은 Claude Code(코딩 에이전트)가 프로젝트 전반을 이해하고 작업하기 위한 컨텍스트 문서입니다.
> **작업 전 반드시 전체를 읽고**, 기술 결정을 내릴 때 이 문서를 최우선으로 참고하세요.

## 프로젝트 개요

**달빛약속 스텝 디버거(Dalbit Step Debugger)**는 한국어 프로그래밍 언어 [달빛약속](https://dalbit-yaksok.postica.app)의 코드 실행 과정을 한 줄씩 시각화하는 인터랙티브 웹 디버거입니다.

### 핵심 목표
- 사용자가 달빛약속 코드를 작성하고, 실행 흐름을 **단계별로** 관찰할 수 있게 한다
- 각 단계마다 현재 실행 줄 하이라이트, 변수(스코프) 상태, 출력 로그를 실시간으로 보여준다
- 코딩을 처음 배우는 사람도 "코드가 어떻게 동작하는가"를 직관적으로 이해할 수 있게 한다

## 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| 프레임워크 | React 19 | |
| 스타일링 | PandaCSS | 유틸리티-first, 타입 안전 CSS-in-JS |
| 빌드 도구 | Vite 8 | |
| 언어 | TypeScript (strict) | `any` 사용 금지 |
| 에디터 | Monaco Editor | `@dalbit-yaksok/monaco-language-provider` 통합 |
| 달빛약속 런타임 | `@dalbit-yaksok/core` | JSR 패키지 |
| 패키지 매니저 | pnpm | 런타임 수정 시 `pnpm patch` 사용 |
| 아키텍처 | Feature-Sliced Design (FSD) | `docs/rule/fsd-rule.md` 참고 |

### 달빛약속 패키지 설치 방식
```bash
# JSR 패키지이므로 아래 방식으로 설치
pnpm dlx jsr add @dalbit-yaksok/core
pnpm dlx jsr add @dalbit-yaksok/monaco-language-provider
```

## 아키텍처

이 프로젝트는 **Feature-Sliced Design (FSD)** 를 아키텍처 원칙으로 채택합니다.
레이어 구조, 단방향 의존성, import 경로 규칙 등 FSD 전반에 대한 상세 규칙은 아래 문서를 참고하세요.

📄 **[docs/rule/fsd-rule.md](./docs/rule/fsd-rule.md)**

### 이 프로젝트의 FSD 디렉토리 구조

```
src/
├── app/
│   ├── provider/
│   │   ├── components/
│   │   ├── ApplicationProvider.tsx
│   │   └── index.ts
│   ├── routes/
│   │   ├── components/
│   │   ├── Routes.tsx
│   │   └── index.ts
│   └── index.ts
│
├── pages/
│   ├── main/
│   │   ├── MainPage.tsx
│   │   └── index.ts
│   ├── debugger/
│   │   ├── DebuggerPage.tsx
│   │   └── index.ts
│   ├── examples/
│   │   ├── ExamplesPage.tsx
│   │   └── index.ts
│   ├── not-found/
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   └── index.ts
│
├── widgets/
│   ├── layouts/
│   │   ├── components/
│   │   ├── ui/
│   │   └── index.ts
│   └── index.ts
│
├── features/                         # 현재 상태: 스캐폴딩 중심(대부분 index.ts)
│   ├── debugger/                     # 디버거 화면 기능 조합용 피처
│   │   ├── _apis/
│   │   │   └── index.ts
│   │   ├── _components/
│   │   │   ├── common/
│   │   │   │   └── index.ts
│   │   │   ├── features/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── _constants/
│   │   │   └── index.ts
│   │   ├── _hooks/
│   │   │   └── index.ts
│   │   ├── _stores/
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── main/
│   │   └── index.ts
│   ├── examples/
│   │   └── index.ts
│   ├── not-found/
│   │   └── index.ts
│   └── index.ts
│
├── entities/                         # 현재 상태: 스캐폴딩 중심(대부분 index.ts)
│   ├── debug-session/
│   │   ├── model/
│   │   │   ├── apis/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── code-editor/
│   │   ├── model/
│   │   │   ├── apis/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
│
└── shared/
    ├── _assets/
    ├── constants/
    ├── stores/
    ├── types/
    └── index.ts
```

---

## 달빛약속 핵심 API (반드시 숙지)

### 1. 세션 생성 및 실행

```typescript
import { YaksokSession } from '@dalbit-yaksok/core'

const session = new YaksokSession({
  stdout(message: string) { /* 출력 처리 */ },
  events: {
    runningCode(start, end, scope, tokens) {
      // 각 실행 단위 직전에 호출됨
      // start/end: { line, column } — 현재 실행 중인 코드 위치
      // scope: 현재 스코프의 변수 상태
      // tokens: 현재 실행 단위의 토큰 배열
    },
    pause() { /* UI: 일시정지 상태로 전환 */ },
    resume() { /* UI: 실행 중 상태로 전환 */ },
  },
})

session.addModule('main', codeString, {
  executionDelay: 300, // ms 단위, 자동 실행 시 속도 조절
})

await session.runModule('main')
```

### 2. 스텝 실행 제어

```typescript
// 단계별 실행 모드: resume() 호출 시마다 한 줄씩 실행 후 자동 일시정지
session.stepByStep = true

// 일시 정지 (현재 실행 단위 완료 후 멈춤)
session.pause()

// 실행 재개 (stepByStep 모드에서는 한 단계만 진행 후 다시 멈춤)
await session.resume()
```

### 3. 실행 모드 정의 (프로젝트 내부 용어)

| 모드 | 설명 | 사용 API |
|------|------|----------|
| **스텝 모드** | 버튼을 누를 때마다 한 줄씩 실행 | `stepByStep = true` + `resume()` |
| **자동 실행 모드** | 설정된 속도로 자동으로 연속 실행 | `executionDelay` + `pause()`/`resume()` |
| **전체 실행 모드** | 즉시 전부 실행, 결과만 표시 | delay 없이 `runModule()` |

### 4. 중요 런타임 규칙

- `YaksokSession`은 **코드가 변경될 때마다 새로 생성**한다. 세션 재사용 시 상태 오염이 발생한다.
- `runModule()`은 항상 `try-catch`로 감싼다. 에러는 `MachineReadableError` 타입으로 처리한다.
- 런타임 수정이 필요한 경우 **반드시 `pnpm patch`를 사용**한다. `node_modules` 직접 수정 금지.

---

## 핵심 타입 정의

현재 구조 기준으로 타입은 `src/entities/debug-session/model/types/`, `src/entities/code-editor/model/types/`에 배치하는 것을 기준으로 한다.
(현 시점에는 타입 파일이 대부분 스캐폴딩 상태이며, 아래 타입은 구현 목표 명세다.)

```typescript
export type RunMode = 'idle' | 'running' | 'paused' | 'finished' | 'error'

export type ScopeVariable = {
  name: string
  value: string   // 렌더링용 문자열로 변환된 값
  type: string    // 'number' | 'string' | 'boolean' | 'list' | ...
}

export type StepFrame {
  stepIndex: number
  line: number          // 1-based
  columnStart: number
  columnEnd: number
  scope: ScopeVariable[]
  output: string[]      // 이 스텝까지의 누적 출력
}

export type DebugState {
  mode: RunMode
  currentLine: number | null
  frames: StepFrame[]
  currentFrameIndex: number
  output: string[]
  error: string | null
  speed: number         // executionDelay ms (자동 실행 모드)
}
```

## 검사 명령어 (작업 완료 후 반드시 실행)

모든 작업을 완료한 이후, 아래 검사를 **반드시 순서대로 수행**하세요.

```bash
# Lint 검사 및 자동 수정
pnpm run lint
pnpm run lint:fix

# 포맷 자동 수정
pnpm run format

# 타입 검사
pnpm run tsc

# 한 번에 실행
pnpm run lint && pnpm run format && pnpm run tsc
```

---

## 에이전트 일반 작업 규칙

### 코드 품질
- TypeScript `strict` 모드 준수. `any`, `as unknown` 사용 금지
- **Export 규칙**:
  - `pages` 레이어: `[PageName]Page.tsx`는 **default export** (라우터의 진입점)
  - 나머지 모든 레이어: **named export** 사용 (`export default` 지양)
- PandaCSS의 `css()`, `cva()` 함수만 사용. inline style 사용 금지
- 컴포넌트 파일당 하나의 컴포넌트 원칙
- `console.log`를 프로덕션 코드에 남기지 말 것. 디버깅 시 `// DEV` 주석 명시

### 절대 금지 사항
- `@dalbit-yaksok/core` 레포지토리 fork 금지
- `node_modules` 직접 수정 금지
- FSD 레이어 역방향 참조 금지 (`docs/rule/fsd-rule.md` 참고)
- 같은 레이어 간 슬라이스 직접 참조 금지

### 에이전트 협업 기록 (필수)
의미 있는 작업(기능 구현, 버그 수정, 리팩터링 등)을 완료한 후 **반드시** `agent-collaboration-record` skill을 사용해 `docs/logs/agents/` 에 기록을 남긴다.
- 파일명은 `01-작업명.md` 형식으로 순번을 붙여 관리한다
- 기존 파일이 있으면 다음 번호를 이어서 사용한다
- 단순 질문·조회성 대화는 기록 생략 가능

---

## 실행 방법

```bash
pnpm install
pnpm dev       # 개발 서버 (localhost:5173)
pnpm build     # 프로덕션 빌드
pnpm tsc       # 타입 검사
```

---

## 달빛약속 문법 예시 (테스트용 기본 코드)

에이전트가 기능을 테스트할 때 아래 코드를 기본 예제로 사용하세요.

```
# 변수와 조건문 예제
나이 : 20

만약 나이 >= 18 이면
    "성인입니다" 보여주기
아니면
    "미성년자입니다" 보여주기

# 반복문 예제
1 부터 5 까지 반복
    반복값 보여주기
```

## 참고 문서 링크

### 프로젝트 내부 문서
- FSD 규칙: `docs/rule/fsd-rule.md`

### 달빛약속 외부 문서
- 달빛약속 문서: https://dalbit-yaksok.postica.app
- 코드 위치 추적 API: https://dalbit-yaksok.postica.app/library/5.%20code-location-tracking.html
- pause/resume API: https://dalbit-yaksok.postica.app/library/7.%20pause-and-resume.html
- Monaco 에디터 통합: https://dalbit-yaksok.postica.app/monaco/usage-guide.html
- 런타임 변수 가져오기: https://dalbit-yaksok.postica.app/library/2.%20runtime-variables.html
- `@dalbit-yaksok/core` JSR: https://jsr.io/@dalbit-yaksok/core
