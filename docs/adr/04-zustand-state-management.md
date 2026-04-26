# ADR-04: Zustand + Immer 상태 관리 채택

## 상태
승인됨

## 맥락

디버거의 상태 관리는 프로젝트의 핵심입니다. 다음 요소들을 관리해야 합니다:

- **디버그 상태**: 실행 모드(idle, running, paused, finished), 현재 프레임 인덱스
- **코드 에디터 상태**: 현재 코드, 편집 이력
- **실행 프레임 시퀀스**: 각 단계의 변수 스코프, 출력, 실행 위치
- **UI 상태**: 패널 레이아웃, 테마, 설정
- **세션 상태**: 활성 YaksokSession, 에러 정보

이 상태들은:
- **컴포넌트 간 공유**: 에디터에서 변경한 코드를 디버거가 수신
- **비동기 업데이트**: YaksokSession 콜백에서 실시간 상태 변경
- **복잡한 중첩 구조**: 배열 내 객체의 깊은 속성 변경
- **성능 최적화 필요**: 불필요한 리렌더링 방지

기존 상태 관리 방식의 문제점:

- **useState 분산**: 상태가 여러 컴포넌트에 분산되면 prop drilling 발생
- **Context API**: 변경 시 모든 구독자가 리렌더링 (성능 저하)
- **Redux**: 보일러플레이트가 많고, 소규모 팀에는 과도함
- **Immer 없이**: 불변성 유지를 위해 스프레드 연산자를 과다하게 사용

## 선택지

### 1. useState + Props Drilling
```typescript
const [debugState, setDebugState] = useState<DebugState>(initialState)

// 여러 레벨의 props 전달 필요
<DebuggerPanel debugState={debugState} setDebugState={setDebugState} />
  <VariableInspector debugState={debugState} />
    <ScopeViewer debugState={debugState} />
```

**장점:**
- React 기본 API (추가 라이브러리 불필요)
- 간단한 로직

**단점:**
- Props drilling: 중간 컴포넌트들이 불필요하게 props 전달
- 코드 리딩 어려움
- 리팩토링 시 모든 중간 컴포넌트 수정 필요
- 상태 복잡도 증가하면 관리 어려움
- 깊은 객체 수정 시 스프레드 연산자 체이닝 복잡

### 2. Context API (useContext)
```typescript
const DebugStateContext = createContext<DebugState>(initialState)

<DebugStateContext.Provider value={debugState}>
  <DebuggerPanel />
</DebugStateContext.Provider>

// 컴포넌트에서
const debugState = useContext(DebugStateContext)
```

**장점:**
- Props drilling 제거
- React 표준 API

**단점:**
- **성능 문제**: Context 값 변경 시 모든 구독자가 리렌더링 (memoisization 필수)
- 상태 업데이트와 조회가 분리되어 관리 복잡
- useCallback, useMemo 의존성 관리 필요
- 다중 Context 필요 시 Provider nesting 증가

### 3. Redux (+ Redux Toolkit)
```typescript
const debugSlice = createSlice({
  name: 'debug',
  initialState,
  reducers: {
    setMode: (state, action) => { state.mode = action.payload },
    addFrame: (state, action) => { state.frames.push(action.payload) }
  }
})

const dispatch = useDispatch()
dispatch(setMode('running'))
```

**장점:**
- 강력한 DevTools (시간 여행 디버깅)
- 예측 가능한 상태 변경 (reducers)
- 미들웨어 지원 (비동기 로직)
- 대규모 프로젝트에 적합

**단점:**
- 보일러플레이트 많음 (actions, reducers, types)
- 초기 설정 복잡
- 소규모 팀에는 과도함
- 깊은 객체 수정 시 Immer 필수 (Redux Toolkit에 포함)
- 학습 곡선 가파름

### 4. Jotai (Primitive Atoms)
```typescript
const debugModeAtom = atom<RunMode>('idle')
const currentFrameAtom = atom<number>(0)

// 컴포넌트에서
const [mode, setMode] = useAtom(debugModeAtom)
```

**장점:**
- 매우 가벼움 (번들 크기 작음)
- 원시적 수준의 세밀한 구독 제어
- TypeScript 지원 우수

**단점:**
- Atom 간 의존성 관리 복잡 (atomFamily 사용 필요)
- 상태 정규화 강제 (denormalized 구조 표현 어려움)
- 커뮤니티 규모 작음
- 복잡한 상태 구조 표현 어려움 (이 프로젝트의 StepFrame 배열 관리 어려움)

### 5. Zustand + Immer ✅
```typescript
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useDebugStore = create<DebugStore>()(
  immer((set) => ({
    mode: 'idle',
    frames: [],
    setMode: (mode) => set((state) => { state.mode = mode }),
    addFrame: (frame) => set((state) => { state.frames.push(frame) })
  }))
)

// 컴포넌트에서
const { mode, setMode } = useDebugStore()
```

**장점:**
- **간단한 문법**: Redux보다 훨씬 적은 보일러플레이트
- **Immer 통합**: Draft 패턴으로 불변성 자동 보장
- **선택적 구독**: 필요한 상태만 선택해서 구독 가능 (성능 최적화)
- **TypeScript 친화적**: 완벽한 타입 추론
- **작은 번들**: Redux 대비 훨씬 가벼움 (~2KB)
- **개발자 경험**: 동기식, 직관적 API
- **미들웨어 지원**: Redux처럼 커스텀 미들웨어 작성 가능
- **DevTools**: Redux DevTools 호환 (옵션)

**단점:**
- 시간 여행 디버깅은 Redux DevTools 플러그인 필요
- 커뮤니티 규모는 Redux보다 작지만 빠르게 성장 중
- 고급 기능 (reselect 같은) 수동 구현 필요

### 비교표

| 항목 | useState | Context | Redux | Jotai | Zustand |
|------|---------|---------|-------|-------|---------|
| 번들 크기 | - | - | ~10KB | ~2KB | ~2KB |
| Props Drilling | ❌ | ✅ | ✅ | ✅ | ✅ |
| 성능 최적화 | ✅ | △ | ✅ | ✅ | ✅ |
| 보일러플레이트 | ✅ | ✅ | ❌ | ✅ | ✅ |
| 깊은 객체 수정 | △ (복잡) | △ | △ | ❌ | ✅ (Immer) |
| TypeScript 지원 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 비동기 지원 | △ | △ | ✅ | ✅ | ✅ |
| 학습 곡선 | 완만 | 완만 | 가파름 | 중간 | 완만 |
| DevTools | ❌ | ❌ | ✅ | △ | △ |
| 프로젝트 규모 | 소 | 소-중 | 중-대 | 소-중 | 소-중 |

## 결정

**Zustand + Immer 미들웨어를 채택합니다.**

구체적으로:
- `zustand` (^5.0.12) 상태 관리 라이브러리
- `immer` (^11.1.4) Zustand의 immer 미들웨어로 통합
- 필요시 `zustand/middleware/devtools` for Redux DevTools 연동

## 근거

### 1. 이 프로젝트의 상태 특성과의 적합성

이 프로젝트의 상태는 **깊은 중첩 구조**를 가집니다:

```typescript
type DebugState = {
  mode: RunMode
  frames: StepFrame[]  // 배열
  currentFrameIndex: number
}

type StepFrame = {
  stepIndex: number
  scope: ScopeVariable[]  // 중첩 배열
  output: string[]
}
```

Immer 없이 이를 업데이트하는 것은 매우 복잡합니다:

```typescript
// 스프레드 연산자 지옥
setDebugState(state => ({
  ...state,
  frames: state.frames.map((frame, idx) =>
    idx === 0
      ? {
          ...frame,
          scope: frame.scope.map(v =>
            v.name === 'x' ? { ...v, value: '10' } : v
          )
        }
      : frame
  )
}))
```

Zustand + Immer로는 매우 간단해집니다:

```typescript
// Zustand + Immer: 직관적이고 간결
useDebugStore.setState(state => {
  state.frames[0].scope[0].value = '10'
})
```

### 2. 선택적 구독으로 성능 최적화

Context API는 값 변경 시 모든 구독자가 리렌더링됩니다. Zustand는 필요한 부분만 선택해서 구독할 수 있습니다:

```typescript
// 오직 mode만 변경될 때만 리렌더링
const mode = useDebugStore(state => state.mode)

// 여러 항목 구독 (selector 함수)
const { mode, currentFrameIndex } = useDebugStore(
  state => ({
    mode: state.mode,
    currentFrameIndex: state.currentFrameIndex
  }),
  shallow  // 얕은 비교로 불필요한 리렌더링 방지
)
```

이는 Context API의 성능 문제를 완벽하게 해결합니다.

### 3. 간단한 문법, 낮은 학습 곡선

Redux는 actions, reducers, selectors 등 개념이 많습니다. Zustand는 매우 직관적입니다:

```typescript
// Zustand: 상태와 액션이 한 곳에
const useDebugStore = create((set) => ({
  mode: 'idle',
  setMode: (mode) => set({ mode })
}))
```

새로운 팀원이 빠르게 이해하고 기여할 수 있습니다.

### 4. TypeScript 완벽 지원

Zustand는 타입 추론이 매우 우수합니다:

```typescript
// 타입이 자동 추론됨
const useDebugStore = create<DebugStore>()((set) => ({
  mode: 'idle' as RunMode,
  setMode: (mode: RunMode) => set({ mode })
}))

// 사용 시 타입 안전성
const mode = useDebugStore(state => state.mode)  // RunMode 타입 자동 추론
```

### 5. 비동기 작업 지원

YaksokSession의 콜백에서 상태를 업데이트할 때, 비동기 처리가 필요할 수 있습니다:

```typescript
session.events.runningCode = async (start, end, scope, tokens) => {
  // 상태 즉시 업데이트 (동기)
  useDebugStore.setState(state => {
    state.mode = 'running'
  })

  // 필요시 비동기 작업
  const result = await processFrame(start, end, scope)

  useDebugStore.setState(state => {
    state.frames.push(result)
  })
}
```

Zustand는 동기와 비동기 모두 일관된 방식으로 처리합니다.

### 6. 작은 번들 크기

- Zustand: ~2KB (gzip)
- Redux: ~10KB (gzip)

작은 웹 애플리케이션에서는 Redux의 초과 번들 크기가 부담입니다.

### 7. FSD 아키텍처와의 시너지

각 entity와 feature에서 독립적인 store를 정의할 수 있습니다:

```
entities/debug-session/model/
├── stores/
│   ├── debugSessionStore.ts
│   └── index.ts
├── types/
├── hooks/
└── index.ts

features/debugger/_stores/
├── debuggerUIStore.ts
└── index.ts
```

## 결과

### 적용된 구현 구조

#### 1. Store 정의 위치
```
src/entities/debug-session/model/stores/
├── debugSessionStore.ts    # 디버그 세션 상태 관리
└── index.ts

src/entities/code-editor/model/stores/
├── codeEditorStore.ts      # 코드 에디터 상태 관리
└── index.ts

src/shared/stores/
├── uiStore.ts             # 전역 UI 상태 (테마, 패널 레이아웃)
└── index.ts
```

#### 2. Store 정의 예시
```typescript
// entities/debug-session/model/stores/debugSessionStore.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type DebugState = {
  mode: RunMode
  frames: StepFrame[]
  currentFrameIndex: number
  output: string[]
  error: string | null
}

export type DebugActions = {
  setMode: (mode: RunMode) => void
  addFrame: (frame: StepFrame) => void
  setCurrentFrame: (index: number) => void
  reset: () => void
}

export type DebugStore = DebugState & DebugActions

const initialState: DebugState = {
  mode: 'idle',
  frames: [],
  currentFrameIndex: -1,
  output: [],
  error: null
}

export const useDebugSessionStore = create<DebugStore>()(
  immer((set) => ({
    ...initialState,
    setMode: (mode) =>
      set((state) => {
        state.mode = mode
      }),
    addFrame: (frame) =>
      set((state) => {
        state.frames.push(frame)
      }),
    setCurrentFrame: (index) =>
      set((state) => {
        state.currentFrameIndex = index
      }),
    reset: () =>
      set(() => initialState)
  }))
)
```

#### 3. 컴포넌트에서 사용
```typescript
// 간단한 구독
export const DebuggerPanel = () => {
  const mode = useDebugSessionStore(state => state.mode)
  const setMode = useDebugSessionStore(state => state.setMode)

  return (
    <button onClick={() => setMode('paused')}>
      Pause ({mode})
    </button>
  )
}

// 여러 항목 구독 (selector)
export const FrameViewer = () => {
  const { frames, currentFrameIndex, setCurrentFrame } = useDebugSessionStore(
    (state) => ({
      frames: state.frames,
      currentFrameIndex: state.currentFrameIndex,
      setCurrentFrame: state.setCurrentFrame
    }),
    shallow
  )

  return (
    <div>
      {frames.map((frame, idx) => (
        <FrameRow
          key={idx}
          frame={frame}
          isActive={idx === currentFrameIndex}
          onSelect={() => setCurrentFrame(idx)}
        />
      ))}
    </div>
  )
}
```

#### 4. YaksokSession 연동
```typescript
export const initializeDebugSession = async (code: string) => {
  const session = new YaksokSession({
    stdout: (message) => {
      useDebugSessionStore.setState((state) => {
        state.output.push(message)
      })
    },
    events: {
      runningCode(start, end, scope, tokens) {
        useDebugSessionStore.setState((state) => {
          state.mode = 'running'
          state.frames.push({
            stepIndex: state.frames.length,
            line: start.line,
            columnStart: start.column,
            columnEnd: end.column,
            scope: scope.map(transformScope),
            output: [...state.output]  // 누적 출력
          })
        })
      },
      pause() {
        useDebugSessionStore.setState((state) => {
          state.mode = 'paused'
        })
      }
    }
  })

  try {
    await session.runModule('main')
    useDebugSessionStore.setState((state) => {
      state.mode = 'finished'
    })
  } catch (error) {
    useDebugSessionStore.setState((state) => {
      state.mode = 'error'
      state.error = error.message
    })
  }
}
```

#### 5. 커스텀 훅으로 재사용성 향상
```typescript
// entities/debug-session/model/hooks/useDebugSession.ts
export const useDebugSession = () => {
  const { mode, frames, currentFrameIndex } = useDebugSessionStore(
    (state) => ({
      mode: state.mode,
      frames: state.frames,
      currentFrameIndex: state.currentFrameIndex
    })
  )

  const currentFrame = frames[currentFrameIndex]

  return { mode, frames, currentFrame, currentFrameIndex }
}

// 컴포넌트에서 더 간단히
export const ScopeViewer = () => {
  const { currentFrame } = useDebugSession()
  return <div>{/* ... */}</div>
}
```

### 성능 특성

| 항목 | 목표 | 달성 방식 |
|------|------|---------|
| 상태 업데이트 | <1ms | Zustand 동기 실행 |
| 선택적 리렌더링 | <10ms | selector로 필요 부분만 |
| store 조회 | <0.1ms | 메모리 접근 |

### 마이그레이션 경로

1. **초기 구현**: 전역 store 생성 (debug-session, code-editor)
2. **컴포넌트 통합**: 기존 useState 제거, store 구독으로 교체
3. **성능 최적화**: selector 도입, 불필요한 리렌더링 제거
4. **DevTools 연동** (옵션): Redux DevTools로 시간 여행 디버깅 활성화

### 기대 효과

- **개발 속도**: 보일러플레이트 최소화로 빠른 개발
- **유지보수**: 간단한 문법으로 코드 이해도 향상
- **성능**: 선택적 구독으로 불필요한 리렌더링 제거
- **타입 안전성**: 완벽한 TypeScript 지원
- **확장성**: 새로운 store 추가 용이

---

**참고 문서**:
- `docs/adr/01-fsd-architecture.md` (store 배치)
- `docs/rule/fsd-rule.md` (import 경로 규칙)

**도입일**: 2026-04-23

**관련 패키지**:
- `zustand` (상태 관리)
- `immer` (불변성 관리)
