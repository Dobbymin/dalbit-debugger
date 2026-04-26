# ADR-02: Monaco Editor 채택

## 상태
승인됨

## 맥락

프로젝트의 핵심 기능은 사용자가 달빛약속 코드를 작성하고, 한 줄씩 실행 흐름을 추적하는 것입니다. 이를 위해 다음 요구사항을 만족하는 코드 에디터가 필요합니다:

- 달빛약속 문법에 대한 **문법 강조(Syntax Highlighting)** 지원
- 현재 실행 중인 줄을 **정확히 지시**하는 기능
- 에러 발생 시 **코드 위치 추적**
- 사용자의 코드 변경에 따른 **반응형 업데이트**
- 안정적이고 성숙한 에디터 구현

단순히 `<textarea>`를 사용하면 문법 강조나 코드 추적이 불가능하고, 커뮤니티 에디터들은 달빛약속 언어 지원이 부족합니다.

## 선택지

### 1. HTML Textarea
```html
<textarea>{code}</textarea>
```

**장점:**
- 구현이 매우 간단
- 번들 크기가 작음
- 의존성 최소화

**단점:**
- 문법 강조 불가능
- 줄 번호 표시 어려움
- 현재 실행 줄 표시 불가능
- 사용자 경험이 떨어짐
- 달빛약속 언어 지원 없음

### 2. CodeMirror 6
```typescript
import { EditorView } from "@codemirror/view"
```

**장점:**
- 가볍고 빠름
- 플러그인 기반 아키텍처
- 커스터마이징 가능

**단점:**
- 달빛약속 언어 정의가 별도로 필요
- 공식 지원 부재
- 커뮤니티 플러그인 검증 필요
- 달빛약속 런타임 API와 통합 복잡

### 3. Monaco Editor ✅
```typescript
import { Editor } from "@monaco-editor/react"
```

**장점:**
- Visual Studio Code 기반 (성숙하고 안정적)
- 문법 강조, 자동 완성, 코드 포맷팅 등 풍부한 기능
- `@dalbit-yaksok/monaco-language-provider` 패키지로 공식 언어 지원
- 코드 위치 추적 API 완벽 호환
- 대규모 프로덕션 사용 사례 풍부
- 성능 최적화 기능 내장 (가상 스크롤, 코드 폴딩)

**단점:**
- 번들 크기가 큼 (3-4MB, gzip 약 1MB)
- 메모리 사용량 다소 높음
- 초기 로딩 시간 다소 증가
- 학습 곡선 있음

### 비교표

| 항목 | Textarea | CodeMirror | Monaco |
|------|----------|-----------|--------|
| 번들 크기 | <10KB | ~150KB | ~1MB (gzip) |
| 문법 강조 | ❌ | ✅ | ✅ |
| 달빛약속 지원 | ❌ | ❌ | ✅ |
| 줄 번호 | ❌ | ✅ | ✅ |
| 코드 위치 추적 API 호환 | ❌ | ⚠️ | ✅ |
| 프로덕션 성숙도 | ✅ | ✅ | ✅ |
| IDE 수준 기능 | ❌ | △ | ✅ |
| 공식 커뮤니티 지원 | - | △ | ✅ |

## 결정

**Monaco Editor를 채택합니다.**

구체적으로 다음을 사용합니다:
- `@monaco-editor/react` (React 래퍼, 버전 ^4.7.0)
- `@dalbit-yaksok/monaco-language-provider` (달빛약속 언어 정의)
- `monaco-editor` (기본 에디터, 버전 0.55.1)

## 근거

### 1. 달빛약속 공식 지원
`@dalbit-yaksok/monaco-language-provider`는 달빛약속 팀이 공식적으로 제공하는 패키지입니다. 이는:
- 언어 문법 정의가 최신으로 유지됨
- 런타임 변경 시 즉시 반영됨
- 코뮤니티 fork 대비 신뢰도 높음

### 2. 코드 위치 추적 호환성
달빛약속의 `YaksokSession` API는 `events.runningCode(start, end, scope, tokens)` 콜백에서 정확한 코드 위치(`start.line`, `start.column`)를 제공합니다. Monaco Editor의 다음 기능으로 이를 효과적으로 활용할 수 있습니다:

```typescript
const decoration = {
  range: new monaco.Range(
    start.line + 1,  // 1-based
    start.column + 1,
    end.line + 1,
    end.column + 1
  ),
  options: { isWholeLine: false, className: 'current-step' }
}
editor.deltaDecorations([], [decoration])
```

### 3. 성숙도와 안정성
Visual Studio Code의 동일 엔진을 사용하므로:
- 버그와 성능 최적화가 지속적으로 이루어짐
- 대규모 프로덕션 프로젝트에서 검증됨
- 보안 취약점에 빠른 대응

### 4. 기능 풍부도
다음 디버거 기능을 구현할 때 Monaco 내장 기능 활용:
- 현재 실행 줄 강조 (decorations)
- 중단점 표시 (gutterDecoration)
- 에러 마커 (markers)
- 코드 포맷팅 (formatters)
- 자동 완성 (completionProviders)

### 5. 커뮤니티와 문서화
- 공식 문서가 풍부하고 명확
- 스택 오버플로우, GitHub 등에 사례 많음
- 한국 커뮤니티에서도 사용 사례 풍부

### 6. React 통합 용이성
`@monaco-editor/react` 패키지가 다음을 제공합니다:
- `<Editor>` 컴포넌트로 선언적 사용
- `useMonaco()` 훅으로 동적 접근
- onChange, onMount 콜백으로 생명주기 관리

## 결과

### 적용된 구현

#### 1. 에디터 컴포넌트 구조
```
src/entities/code-editor/ui/
├── CodeEditor.tsx         # Monaco 래퍼 컴포넌트
└── index.ts
```

#### 2. 언어 제공자 초기화
```typescript
// src/entities/code-editor/model/
import { setup } from '@dalbit-yaksok/monaco-language-provider'

export const initializeYaksokLanguage = (monaco: Monaco) => {
  setup(monaco)
}
```

#### 3. 에디터 마운트 시 언어 초기화
```typescript
const handleEditorMount = (editor: IStandaloneCodeEditor, monaco: Monaco) => {
  initializeYaksokLanguage(monaco)
  onEditorReady?.(editor)
}
```

#### 4. 현재 실행 줄 강조
```typescript
// YaksokSession 콜백에서
session.events.runningCode = (start, end, scope, tokens) => {
  const decoration = {
    range: new monaco.Range(start.line + 1, start.column + 1, end.line + 1, end.column + 1),
    options: { isWholeLine: true, className: 'current-step-line' }
  }
  editor.deltaDecorations(prevDecorations, [decoration])
}
```

#### 5. PandaCSS를 통한 스타일링
```typescript
const editorStyles = css({
  width: '100%',
  height: '100%',
  border: '1px solid token(colors.gray.200)',
  '& .current-step-line': {
    backgroundColor: 'token(colors.yellow.100)',
    borderLeft: '3px solid token(colors.yellow.500)',
  }
})
```

### 번들 크기 최적화

Monaco 번들 크기 감소를 위해:
- `lazy: true` 옵션으로 지연 로딩
- 필요한 언어 정의만 로드
- Production 빌드 시 tree-shaking 활성화

```typescript
<Editor
  lazy
  loading={<LoadingSpinner />}
  height="100%"
  defaultLanguage="yaksok"
  value={code}
  options={{
    minimap: { enabled: false },  // 번들 크기 감소
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
  }}
  onMount={handleEditorMount}
/>
```

### 성능 특성

| 항목 | 목표 | 달성 방식 |
|------|------|---------|
| 첫 에디터 표시 | <2초 | lazy loading + 코드 스플리팅 |
| 코드 입력 반응성 | <100ms | 가상 스크롤 + 최적화된 렌더링 |
| 줄 강조 속도 | <50ms | 직접 decoration API 사용 |

### 기대 효과

- **개발자 경험**: IDE 수준의 편의성으로 사용자 만족도 향상
- **디버깅 명확성**: 정확한 줄 추적으로 혼동 최소화
- **안정성**: 검증된 에디터로 예상 외 동작 방지
- **확장성**: 향후 자동 완성, 린팅 등 기능 추가 용이

---

**참고 문서**:
- `docs/adr/01-fsd-architecture.md` (에디터 컴포넌트 배치)
- `docs/rule/fsd-rule.md` (import 경로 규칙)

**도입일**: 2026-04-23

**관련 패키지**:
- `@monaco-editor/react` (React 바인딩)
- `@dalbit-yaksok/monaco-language-provider` (언어 정의)
- `monaco-editor` (기본 에디터)
