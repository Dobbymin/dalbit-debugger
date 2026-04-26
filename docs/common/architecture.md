# 달빛약속 스텝 디버거 - 아키텍처 문서

## 1. 아키텍처 개요

### 1.1 Feature-Sliced Design (FSD)

달빛약속 스텝 디버거는 **Feature-Sliced Design (FSD)** 아키텍처 패턴을 채택합니다. FSD는 코드베이스를 기능(Feature) 단위로 분할하며, 각 계층(Layer)이 단방향 의존성을 유지하도록 설계된 구조입니다.

#### 왜 FSD를 선택했는가?

1. **확장성**: 새로운 기능을 쉽게 추가할 수 있는 구조
2. **유지보수성**: 기능별로 관련 코드가 함께 위치해 변경 영향도를 최소화
3. **재사용성**: 명확한 계층 분리로 컴포넌트 재사용 용이
4. **테스트 용이성**: 계층 간 독립성으로 단위 테스트가 수월함
5. **팀 협업**: 개발자들이 서로 다른 피처를 병렬로 작업 가능

### 1.2 FSD 6-계층 구조

```
상위 계층 (더 많은 외부 의존성)
     ↑
   app      - 애플리케이션 초기화, 라우팅, 프로바이더
   pages    - 라우트 진입점, 페이지 조합
   widgets  - 재사용 불가능한 UI 조합(레이아웃, 모달 등)
   features - 사용자 기능, 상호작용 로직
   entities - 도메인 데이터, 비즈니스 로직
   shared   - 공통 유틸, 상수, 기본 타입
     ↓
하위 계층 (낮은 의존성)

의존성 규칙: 하위 계층만 참조 가능 (역방향 참조 금지)
```

---

## 2. 실제 디렉토리 구조

### 2.1 전체 src/ 트리 구조

```
src/
├── app/                              # 애플리케이션 진입점
│   ├── provider/                     # 전역 프로바이더
│   │   ├── components/               # ErrorBoundary, QueryProvider
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── QueryProvider.tsx
│   │   ├── ApplicationProvider.tsx    # 루트 프로바이더 조합
│   │   └── index.ts
│   ├── routes/                       # 라우팅 설정
│   │   ├── Routes.tsx                # 라우터 정의
│   │   └── index.ts
│   └── index.ts
│
├── pages/                            # 페이지 레이어
│   ├── main/
│   │   ├── MainPage.tsx              # 메인 페이지 (default export)
│   │   └── index.ts
│   ├── debugger/
│   │   ├── DebuggerPage.tsx          # 디버거 페이지 (default export)
│   │   └── index.ts
│   ├── examples/
│   │   ├── ExamplesPage.tsx          # 예제 페이지 (default export)
│   │   └── index.ts
│   ├── error/
│   │   ├── ErrorPage.tsx             # 에러 페이지 (default export)
│   │   └── index.ts
│   ├── not-found/
│   │   ├── NotFound.tsx              # 404 페이지 (default export)
│   │   └── index.ts
│   └── index.ts
│
├── widgets/                          # 위젯 레이어
│   ├── layouts/                      # 공통 레이아웃
│   │   ├── RootLayout.tsx            # 앱 전체 레이아웃
│   │   ├── PageLayout.tsx            # 페이지 공통 레이아웃
│   │   └── index.ts
│   └── index.ts
│
├── features/                         # 기능 레이어
│   ├── debugger/                     # 디버거 기능 집합
│   │   ├── ui/                       # UI 컴포넌트
│   │   │   ├── DebuggerControls.tsx
│   │   │   ├── DebuggerEditorPane.tsx
│   │   │   ├── DebuggerVariablesPanel.tsx
│   │   │   ├── DebuggerOutputPanel.tsx
│   │   │   ├── DebuggerFooter.tsx
│   │   │   └── index.ts
│   │   ├── _hooks/                   # 커스텀 훅
│   │   │   ├── useDebuggerHandler.ts
│   │   │   └── index.ts
│   │   ├── _stores/                  # 상태 관리 (Zustand)
│   │   │   ├── debuggerStore.ts
│   │   │   └── index.ts
│   │   ├── _constants/               # 상수
│   │   │   └── index.ts
│   │   ├── _apis/                    # API 호출
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
├── entities/                         # 엔티티 레이어
│   ├── debug-session/                # 디버그 세션 도메인
│   │   ├── model/
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   └── index.ts
│   │   │   ├── apis/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── code-editor/                  # 코드 에디터 도메인
│   │   ├── model/
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   └── index.ts
│   │   │   ├── apis/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
│
└── shared/                           # 공유 계층
    ├── _assets/                      # 이미지, 아이콘
    ├── constants/                    # 전역 상수
    │   ├── route-paths.ts
    │   └── index.ts
    ├── stores/                       # 전역 상태
    │   └── index.ts
    ├── types/                        # 전역 타입
    │   └── index.ts
    ├── utils/                        # 유틸 함수
    │   └── index.ts
    └── index.ts
```

### 2.2 주요 디렉토리 설명

| 디렉토리 | 역할 | 의존성 대상 |
|---------|------|-----------|
| `app` | 애플리케이션 초기화, 프로바이더 설정, 라우팅 | pages, widgets, features, entities, shared |
| `pages` | 라우트별 진입점 (default export만 사용) | widgets, features, shared |
| `widgets` | 페이지 조합, 레이아웃 (재사용 불가능) | features, entities, shared |
| `features` | 사용자 기능, UI 로직, 상호작용 | entities, shared |
| `entities` | 도메인 데이터, 타입, 비즈니스 로직 | shared |
| `shared` | 공통 상수, 유틸, 타입, 아이콘 | 다른 계층 의존 없음 |

---

## 3. 라우팅 구조

### 3.1 라우팅 설정

```
Routes.tsx (src/app/routes/)
│
└─ <Route element={<RootLayout />}>
   │
   ├─ <Route path="/" element={<MainPage />} />
   │
   ├─ <Route path="/error" element={<ErrorPage />} />
   │
   ├─ <Route path="*" element={<NotFound />} />
   │
   └─ <Route element={<PageLayout />}>
      │
      ├─ <Route path="/debugger" element={<DebuggerPage />} />
      │
      └─ <Route path="/examples" element={<ExamplesPage />} />
```

### 3.2 라우트 및 페이지

| 경로 | 페이지 | 레이아웃 | 설명 |
|------|--------|---------|------|
| `/` | MainPage | RootLayout | 메인 진입점 |
| `/debugger` | DebuggerPage | RootLayout + PageLayout | 핵심 디버거 화면 |
| `/examples` | ExamplesPage | RootLayout + PageLayout | 예제 모음 |
| `/error` | ErrorPage | RootLayout | 에러 발생 시 표시 |
| `*` | NotFound | RootLayout | 404 페이지 |

### 3.3 레이아웃 구조

**RootLayout**
- 앱 전체를 감싸는 최상위 레이아웃
- ErrorBoundary, QueryProvider 포함
- 모든 페이지가 공유하는 헤더, 푸터 등 (필요시)

**PageLayout**
- 디버거 페이지와 예제 페이지가 공유하는 중간 레이아웃
- 사이드바, 네비게이션 등 (필요시)

---

## 4. 핵심 데이터 흐름

### 4.1 전체 데이터 흐름 다이어그램

```
┌─────────────────────────────────────────────────────────────────┐
│                     DebuggerPage (pages)                         │
│                                                                   │
│  const { code, currentLine, variables, output, status, ... }   │
│         = useDebuggerHandler()                                   │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│              useDebuggerHandler Hook (features)                  │
│                                                                   │
│  - Zustand Store 접근 (debuggerStore)                           │
│  - YaksokSession 관리                                           │
│  - 실행 모드 제어 (step, run, pause, resume, stop)             │
│  - 코드 변경 감지 및 세션 재생성                               │
└─────────────────────────────────────────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ↓                        ↓                        ↓
   ┌─────────┐            ┌────────────┐          ┌──────────┐
   │ 코드편집 │            │ 실행 제어   │          │ 상태관리  │
   │ (input) │            │ (control)  │          │ (store)  │
   └────┬────┘            └──────┬─────┘          └────┬─────┘
        │                        │                     │
        ↓                        ↓                     ↓
   setCode()            step, run, pause        debuggerStore
        │               resume, stop                   │
        └────────────────────────┼─────────────────────┘
                                 │
                                 ↓
         ┌───────────────────────────────────────────────┐
         │         YaksokSession Runtime                 │
         │  (@dalbit-yaksok/core)                       │
         │                                               │
         │  - addModule(code)                           │
         │  - runModule() → execute code                │
         │  - events.runningCode() → update state      │
         │  - pause/resume() → step control            │
         └───────────────────────┬───────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ↓                        ↓                        ↓
  ┌──────────────┐    ┌────────────────────┐    ┌─────────────┐
  │ 현재줄 정보    │    │  변수 상태 (스코프)  │    │  출력 로그   │
  │(currentLine) │    │ (variables)        │    │ (output)    │
  └──────────────┘    └────────────────────┘    └─────────────┘
        │                      │                       │
        └──────────────────────┼───────────────────────┘
                               ↓
         ┌───────────────────────────────────────────────┐
         │  UI 컴포넌트에 Props 전달                      │
         │  (DebuggerControls, DebuggerEditorPane,      │
         │   DebuggerVariablesPanel, DebuggerOutputPanel) │
         └───────────────────────────────────────────────┘
```

### 4.2 단계별 흐름 설명

#### (1) 초기화 단계
1. DebuggerPage 마운트
2. useDebuggerHandler 호출 → debuggerStore 초기화
3. 빈 코드 상태로 시작

#### (2) 코드 입력 단계
1. DebuggerEditorPane에서 사용자가 코드 작성
2. setCode() 호출
3. useDebuggerHandler 내부에서 코드 변경 감지
4. YaksokSession 새로 생성 (이전 세션 정리)

#### (3) 실행 제어 단계

**단계 실행 (Step)**
1. 사용자가 "단계 실행" 버튼 클릭
2. step() 호출 → session.resume() 실행
3. YaksokSession이 코드 한 줄 실행
4. events.runningCode() 콜백 → 현재줄, 변수, 출력 업데이트

**자동 실행 (Run)**
1. 사용자가 "자동 실행" 버튼 클릭
2. run() 호출 → executionDelay 설정 후 session.resume()
3. YaksokSession이 일정 간격으로 계속 실행
4. 각 단계마다 콜백으로 UI 업데이트

**전체 실행 (Run Full)**
1. 사용자가 "전체 실행" 버튼 클릭
2. runFull() 호출 → session.runModule() 직접 실행 (delay 없음)
3. 코드 전부 실행 후 최종 결과만 표시

**일시정지 (Pause)**
1. 자동 실행 중 "일시정지" 버튼 클릭
2. pause() 호출 → session.pause() 실행
3. 현재 단계 완료 후 멈춤

**재개 (Resume)**
1. 일시정지 상태에서 "재개" 버튼 클릭
2. resume() 호출 → session.resume() 실행
3. 다음 단계 진행

**정지 (Stop)**
1. 실행 중/일시정지 상태에서 "정지" 버튼 클릭
2. stop() 호출 → 세션 리셋, 모든 상태 초기화
3. 디버거 상태 idle로 복원

#### (4) 상태 업데이트 단계
1. YaksokSession의 events.runningCode 콜백 발동
2. 전달된 start, end, scope, tokens로부터 정보 추출
3. Zustand store에서 상태 업데이트:
   - currentLine: 현재 실행 중인 줄
   - variables: 스코프의 변수들 배열로 변환
   - output: 누적 출력 결과
   - progressWidth: 진행 바 너비 계산

#### (5) UI 렌더링 단계
1. Zustand 상태 변경 감지
2. React 재렌더링 트리거
3. 각 컴포넌트가 새로운 props 받음:
   - DebuggerEditorPane: currentLine으로 현재줄 하이라이트
   - DebuggerVariablesPanel: variables 배열 렌더링
   - DebuggerOutputPanel: output 배열 표시
   - DebuggerControls: status로 버튼 활성화 상태 결정

---

## 5. 주요 컴포넌트 설명

### 5.1 DebuggerPage (pages)

**파일**: `src/pages/debugger/DebuggerPage.tsx`

**역할**: 디버거의 메인 페이지 컴포넌트로, 모든 디버거 UI 요소를 조합하고 레이아웃합니다.

**구성**:
- **useDebuggerHandler 훅**으로부터 모든 상태와 액션 함수 받기
- **레이아웃**: Flexbox 기반의 반응형 레이아웃
  - 모바일(base): 세로 배열
  - 데스크톱(lg): 가로 배열 (에디터 + 변수 패널 나란히)

**주요 Props 전달**:
```
├─ DebuggerControls
│   ├─ status (실행 상태)
│   ├─ autoRunSpeed (속도)
│   └─ 6개 핸들러 함수 (onStep, onRun, etc.)
│
├─ 에러 표시 (error 있을 때만)
│
├─ DebuggerEditorPane
│   ├─ code (현재 코드)
│   ├─ currentLine (현재 실행줄)
│   └─ onCodeChange (코드 변경 핸들러)
│
├─ DebuggerVariablesPanel
│   └─ variables (스코프 변수 배열)
│
└─ DebuggerOutputPanel
    ├─ output (출력 결과 배열)
    └─ onClearOutput (초기화 핸들러)
```

### 5.2 useDebuggerHandler (features > _hooks)

**파일**: `src/features/debugger/_hooks/useDebuggerHandler.ts`

**역할**: 디버거의 모든 상태와 로직을 관리하는 커스텀 훅입니다. Zustand store를 감싼 래퍼로, 비즈니스 로직을 포함합니다.

**반환값**:
```typescript
{
  // 상태
  code: string                          // 현재 코드
  currentLine: number | null            // 실행 중인 줄 번호 (1-based)
  variables: VariableRow[]              // 스코프의 변수들
  output: string[]                      // 누적 출력 결과
  status: DebugStatus                   // 'idle' | 'running' | 'paused' | 'stopped' | 'error'
  error: string | null                  // 에러 메시지
  autoRunSpeed: number                  // 자동 실행 속도 (1~10)
  progressWidth: number                 // 진행 바 너비 (%)

  // 액션
  setCode: (code: string) => void
  setAutoRunSpeed: (speed: number) => void
  clearOutput: () => void
  step: () => void                      // 한 줄씩 실행
  run: () => void                       // 자동 실행 시작
  runFull: () => void                   // 전체 실행
  pause: () => void                     // 일시정지
  resume: () => void                    // 재개
  stop: () => void                      // 정지
}
```

**주요 책임**:
1. Zustand store 상태 접근 및 업데이트
2. YaksokSession 생성, 관리, 정리
3. 코드 변경 감지 시 세션 재생성
4. 런타임 콜백 처리 (runningCode, pause, resume)
5. 실행 속도(executionDelay) 계산
6. 에러 처리 및 상태 복원

### 5.3 DebuggerControls (features > ui)

**파일**: `src/features/debugger/ui/DebuggerControls.tsx`

**역할**: 실행 제어 버튼과 속도 슬라이더를 제공하는 UI 컴포넌트입니다.

**구성**:
- **6개 제어 버튼**:
  1. "단계 실행" (PlayIcon) - status !== "running"일 때만 활성
  2. "자동 실행" (SparkIcon) - status !== "running"일 때만 활성
  3. "전체 실행" (SettingsIcon) - status !== "running"일 때만 활성
  4. "일시정지" (PauseIcon) - status === "running"일 때만 활성
  5. "재개" (PlayIcon) - status === "paused"일 때만 활성
  6. "정지" (StopIcon) - 실행/일시정지 상태에서만 활성 (에러 색상)

- **속도 슬라이더**:
  - 범위: 1~10
  - 자동 실행 모드에서만 의미 있음
  - 선택한 속도 값이 useDebuggerHandler의 executionDelay 계산에 사용됨

**상태 표시**:
- 우측 상단에 현재 상태를 대문자로 표시 (IDLE, RUNNING, PAUSED, STOPPED, ERROR)

### 5.4 DebuggerEditorPane (features > ui)

**파일**: `src/features/debugger/ui/DebuggerEditorPane.tsx`

**역할**: Monaco Editor를 사용하여 달빛약속 코드를 작성하고 현재 실행줄을 하이라이트하는 컴포넌트입니다.

**주요 기능**:
1. **코드 편집**: Monaco Editor 통합
   - 달빛약속 문법 하이라이팅 (@dalbit-yaksok/monaco-language-provider)
   - 자동 완성, 에러 표시 지원

2. **현재줄 하이라이트**:
   - currentLine props로부터 실행 중인 줄 번호 받음
   - 에디터에서 해당 줄을 시각적으로 강조

3. **진행 바**:
   - progressWidth props로부터 진행도 표시
   - 코드 실행 진행 상황을 시각화

### 5.5 DebuggerVariablesPanel (features > ui)

**파일**: `src/features/debugger/ui/DebuggerVariablesPanel.tsx`

**역할**: 현재 스코프의 변수들을 카드 형태로 표시하는 사이드 패널입니다.

**구성**:
- **헤더**: "Variables (Scope)" 제목과 Spark 아이콘
- **변수 목록**:
  - 각 변수마다 카드 형태의 아이템
  - 변수 이름, 값, 타입(kind)을 표시
  - 값의 색상(tone): primary 또는 secondary로 시각 차별화

- **빈 상태**:
  - 변수가 없을 때 "활성 변수 없음" 메시지 표시

**레이아웃**:
- 모바일(base): 에디터 아래 전체 너비, 최소 높이 180px
- 데스크톱(lg): 에디터 우측 사이드바, 고정 너비 320px

### 5.6 DebuggerOutputPanel (features > ui)

**파일**: `src/features/debugger/ui/DebuggerOutputPanel.tsx`

**역할**: 프로그램 실행 결과(stdout)를 표시하고 초기화하는 하단 패널입니다.

**구성**:
- **헤더**: "Output" 제목과 초기화 버튼
- **출력 영역**:
  - 한 줄씩 output 배열의 내용 표시
  - 스크롤 가능한 영역
  - 고정 너비 폰트 사용

- **초기화 버튼**:
  - onClearOutput 핸들러 호출
  - 출력 결과 전체 삭제

### 5.7 DebuggerFooter (features > ui)

**파일**: `src/features/debugger/ui/DebuggerFooter.tsx`

**역할**: 디버거 페이지 하단 푸터 영역을 담당합니다.

**구성**:
- 버전 정보, 도움말 링크, 피드백 버튼 등 (구현 내용에 따라 다름)

### 5.8 ErrorBoundary (app > provider > components)

**파일**: `src/app/provider/components/ErrorBoundary.tsx`

**역할**: React 에러 바운더리로, 하위 컴포넌트의 런타임 에러를 포착하고 ErrorPage로 내비게이트합니다.

**기능**:
- 렌더링 에러 캐치
- 콘솔 에러 로깅
- /error 페이지로 자동 이동
- 사용자에게 에러 메시지 표시

### 5.9 ErrorPage (pages)

**파일**: `src/pages/error/ErrorPage.tsx`

**역할**: ErrorBoundary에서 포착된 에러나 의도적인 에러 상황을 사용자에게 표시합니다.

**구성**:
- 에러 메시지 표시
- 메인 페이지로 돌아가기 버튼
- 재시도 옵션 (필요시)

---

## 6. 상태 관리 구조

### 6.1 Zustand Store (debuggerStore)

**파일**: `src/features/debugger/_stores/debuggerStore.ts`

**역할**: 디버거의 모든 상태를 중앙에서 관리하는 Zustand 스토어입니다.

**상태 구조**:
```typescript
{
  // 기본 상태
  code: string                        // 현재 코드
  currentLine: number | null          // 현재 실행 줄
  variables: VariableRow[]            // 스코프 변수들
  output: string[]                    // 누적 출력
  status: DebugStatus                 // 'idle' | 'running' | 'paused' | 'stopped' | 'error'
  error: string | null                // 에러 메시지
  autoRunSpeed: number                // 자동 실행 속도 (1~10)
  progressWidth: number               // 진행 바 너비 (%)

  // 액션 (상태 업데이트 함수)
  setCode: (code: string) => void
  setCurrentLine: (line: number | null) => void
  setVariables: (vars: VariableRow[]) => void
  addOutput: (text: string) => void
  clearOutput: () => void
  setStatus: (status: DebugStatus) => void
  setError: (error: string | null) => void
  setAutoRunSpeed: (speed: number) => void
  setProgressWidth: (width: number) => void
  reset: () => void                   // 모든 상태 초기화
}
```

**타입 정의**:
```typescript
type DebugStatus = 'idle' | 'running' | 'paused' | 'stopped' | 'error'

type VariableRow = {
  name: string                        // 변수 이름
  value: string                       // 렌더링용 값 문자열
  kind: string                        // 타입/종류 ('number', 'string', 'list' 등)
  tone?: 'primary' | 'secondary'      // 색상 구분
}
```

### 6.2 상태 업데이트 흐름

```
useDebuggerHandler
    │
    ├─ setCode() → store.setCode()
    │
    ├─ YaksokSession.runningCode 콜백
    │   │
    │   ├─ store.setCurrentLine(start.line)
    │   ├─ store.setVariables(scope → VariableRow[])
    │   ├─ store.setProgressWidth(계산된 %)
    │   │
    │   └─ 에러 발생 시: store.setError()
    │
    ├─ run() → store.setStatus('running')
    ├─ pause() → store.setStatus('paused')
    ├─ resume() → store.setStatus('running')
    └─ stop() → store.reset()
```

### 6.3 상태 업데이트 원칙

1. **Zustand의 얕은 비교(Shallow Comparison) 활용**
   - 불변성 유지로 리렌더링 최적화
   - 배열/객체 변경 시 새로운 참조 생성

2. **setCode() 호출 시 특수 처리**
   - 기존 YaksokSession 정리
   - 새로운 세션 생성
   - 다른 상태 초기화

3. **에러 상태 관리**
   - 실행 중 에러 발생 → status를 'error'로 설정
   - error 메시지는 DebuggerPage에서 UI로 표시됨

---

## 7. YaksokSession 런타임 통합

### 7.1 YaksokSession 라이프사이클

```
┌──────────────────────────────────────────────────────┐
│         코드 변경 (setCode 호출)                      │
│                                                       │
│  1. 기존 YaksokSession 정리 (만약 있으면)            │
│  2. 새로운 YaksokSession 인스턴스 생성              │
│  3. session.addModule('main', code) 호출           │
│  4. 콜백 함수 등록                                   │
└────────────────┬─────────────────────────────────────┘
                 │
      ┌──────────┴──────────┬──────────┐
      ↓                     ↓          ↓
  ┌────────┐        ┌──────────┐  ┌────────┐
  │단계실행 │        │자동실행   │  │전체실행 │
  │(Step)  │        │(Run)     │  │(Full)  │
  └───┬────┘        └────┬─────┘  └───┬────┘
      │                  │            │
      │        executionDelay        │
      └─────────────┬────────────────┘
                    │
           await session.resume()
           또는
           await session.runModule()
                    │
                    ↓
         ┌──────────────────────────┐
         │  events.runningCode()    │
         │  (각 실행 단위마다 호출)  │
         │                          │
         │  - start, end: 위치      │
         │  - scope: 변수 상태      │
         │  - tokens: 코드 조각     │
         └──────────────────────────┘
                    │
                    ↓
       ┌──────────────────────────────┐
       │  Zustand 상태 업데이트       │
       │  (currentLine, variables 등) │
       └──────────────────────────────┘
```

### 7.2 YaksokSession API 사용 예

```typescript
// (1) 세션 생성 및 코드 등록
const session = new YaksokSession({
  stdout(message: string) {
    // 출력 결과는 직접 여기서 받을 수 없음
    // useDebuggerHandler에서 output 배열로 관리
  },
  events: {
    // (2) 실행 중인 코드 위치 추적 콜백
    runningCode(start, end, scope, tokens) {
      const varRows = Object.entries(scope).map(([name, value]) => ({
        name,
        value: String(value),
        kind: typeof value,
      }))

      store.setCurrentLine(start.line)
      store.setVariables(varRows)
    },

    // (3) 일시정지 이벤트
    pause() {
      store.setStatus('paused')
    },

    // (4) 재개 이벤트
    resume() {
      store.setStatus('running')
    },
  },
})

// (3) 코드 등록
session.addModule('main', userCode, {
  executionDelay: calculateDelay(autoRunSpeed), // ms
})

// (4-1) 단계 실행 모드
session.stepByStep = true
await session.resume()  // 한 줄씩 실행, 각 단계마다 pause

// (4-2) 자동 실행 (executionDelay로 간격 설정)
await session.resume()  // 자동으로 일정 간격으로 계속 실행

// (4-3) 전체 실행
await session.runModule('main')  // delay 없이 전부 실행
```

### 7.3 실행 모드별 동작

#### 스텝 모드 (Step)
```
1. stepByStep = true 설정
2. await session.resume() 호출
3. 한 줄 실행 → runningCode 콜백 → 자동 pause
4. 사용자가 다시 "단계 실행" 클릭 → 다시 resume()
5. 반복
```

#### 자동 실행 모드 (Run)
```
1. stepByStep = false (또는 설정 안 함)
2. addModule에서 executionDelay 설정
   예: autoRunSpeed가 5일 때, executionDelay = 600ms
3. await session.resume() 호출
4. 자동으로 executionDelay 간격으로 계속 진행
5. 사용자가 pause() → 멈춤
```

#### 전체 실행 모드 (Run Full)
```
1. stepByStep = false
2. executionDelay = 0 (또는 매우 작은 값)
3. await session.runModule('main')
4. 즉시 전부 실행 → 최종 결과만 표시
```

### 7.4 에러 처리

```typescript
try {
  await session.runModule('main')
} catch (err) {
  const errorMessage = err instanceof Error ? err.message : String(err)
  store.setError(errorMessage)
  store.setStatus('error')
}
```

---

## 8. 의존성 관계도

### 8.1 계층별 의존성

```
app (최상위)
├─ depends on: pages, widgets, features, entities, shared
│
pages (라우트 진입점)
├─ DebuggerPage depends on: features (useDebuggerHandler), shared
├─ MainPage depends on: shared
└─ ...

widgets (레이아웃)
├─ RootLayout depends on: features, entities, shared
├─ PageLayout depends on: features, entities, shared
└─ ...

features (기능)
├─ debugger depends on: entities, shared
│   ├─ useDebuggerHandler depends on: entities (YaksokSession 타입), shared
│   ├─ DebuggerControls depends on: shared (타입, 아이콘)
│   ├─ DebuggerEditorPane depends on: entities, shared
│   └─ DebuggerVariablesPanel depends on: shared (타입)
└─ ...

entities (도메인)
├─ debug-session (YaksokSession 타입, 콜백 정의)
├─ code-editor (에디터 타입)
└─ depends on: shared

shared (공유)
├─ constants (ROUTE_PATHS, 기타 상수)
├─ types (전역 타입)
├─ utils (유틸 함수)
├─ stores (전역 상태)
└─ _assets (아이콘, 이미지)
```

### 8.2 순환 의존성 금지

```
❌ 잘못된 예:
shared → features → entities → features (순환!)

✅ 올바른 예:
pages → features → entities → shared (단방향)
```

---

## 9. 개발 워크플로우

### 9.1 새로운 기능 추가 시

1. **기능 요구사항 분석** → entities에 타입 추가
2. **도메인 로직 구현** → entities에 구현
3. **UI 컴포넌트 작성** → features의 ui/ 에 작성
4. **커스텀 훅 작성** → features의 _hooks/ 에 작성
5. **페이지에 통합** → pages에서 조합
6. **라우팅 설정** → app/routes/ 에서 라우트 추가

### 9.2 코드 구조 예

```
features/debugger/
├─ _stores/
│  └─ debuggerStore.ts        ← Zustand 스토어
├─ _hooks/
│  └─ useDebuggerHandler.ts    ← 커스텀 훅 (비즈니스 로직)
├─ ui/
│  ├─ DebuggerControls.tsx     ← UI 컴포넌트
│  ├─ DebuggerEditorPane.tsx
│  └─ ...
└─ index.ts                    ← 공개 인터페이스
```

---

## 10. 주요 기술 용어 정리

| 용어 | 설명 |
|------|------|
| **FSD** | Feature-Sliced Design, 기능 단위로 코드를 계층화하는 아키텍처 패턴 |
| **YaksokSession** | @dalbit-yaksok/core에서 제공하는 코드 실행 엔진 |
| **executionDelay** | 자동 실행 모드에서 각 단계 사이의 시간 간격 (ms) |
| **stepByStep** | 한 줄씩 실행하는 모드 설정 |
| **Zustand** | 경량 상태 관리 라이브러리 |
| **runningCode** | YaksokSession의 콜백, 각 실행 단위가 진행될 때 호출됨 |
| **VariableRow** | 스코프에서 추출한 변수 정보의 렌더링 단위 |
| **이벤트 바운더리** | React의 에러 핸들링 메커니즘 |

---

## 11. 참고 문서

- **FSD 규칙**: `docs/rule/fsd-rule.md`
- **제품 요구사항**: `docs/common/prd.md`
- **YaksokSession API**: https://dalbit-yaksok.postica.app/library
- **Monaco Editor 통합**: https://dalbit-yaksok.postica.app/monaco/usage-guide.html
