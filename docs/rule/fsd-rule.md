# Feature-Sliced Design (FSD) 규칙

## 개요: 관심사 분리의 철학

FSD(Feature-Sliced Design)는 **기능 중심**으로 코드를 조직하는 아키텍처 패턴입니다. 기존의 역할 중심(components, hooks, utils) 구조에서 벗어나, **"하나의 기능(또는 도메인)에 필요한 모든 코드를 같은 곳에 모아 관리"**하는 방식으로 전환합니다.

### 핵심 원칙

- **도메인 친화적**: 개발자의 멘탈 모델과 코드 구조가 일치
- **응집도 높음**: 같은 기능의 컴포넌트, 훅, 모델이 한 폴더에 있음
- **낮은 결합도**: 각 레이어와 슬라이스는 명확한 경계를 가짐
- **단방향 의존성**: 상위 레이어만 하위 레이어를 사용 가능

---

## 1. 레이어 구조 및 역할

```
src/
├── app/          # 앱 진입점, 전역 설정, 라우터, Provider
├── pages/        # 라우트와 1:1 대응하는 페이지 (완전한 화면)
├── widgets/      # 독립적인 기능을 조합한 거시적 UI 블록
├── features/     # 사용자 경험 중심의 핵심 기능 단위 (캡슐화)
├── entities/     # 도메인 비즈니스 로직 및 데이터 모델
└── shared/       # 프로젝트 전반의 인프라 및 공통 모듈
```

### 각 레이어의 역할

| 레이어 | 역할 | 예시 |
|--------|------|------|
| **app** | 앱 진입점, 라우터, 전역 Provider, 에러 바운더리 | App.tsx, routes |
| **pages** | URL별 완전한 화면. 위젯과 피처를 조합하는 컨테이너 | `/debugger`, `/examples`, `/main` |
| **widgets** | 여러 피처/엔터티를 조합한 독립적인 UI 블록 | `widgets/layouts` |
| **features** | 하나의 사용자 경험/기능 단위. 내부 로직 캡슐화 | `debugger`, `main`, `examples`, `not-found` |
| **entities** | 도메인 모델과 비즈니스 로직. 특정 기능과 무관한 순수 데이터 | `debug-session`, `code-editor` |
| **shared** | UI 컴포넌트, 유틸, 타입 등 프로젝트 전반의 인프라 | Button, type Response |

### Pages vs Features vs Widgets 차이

**Pages (라우트 진입점)**
- URL과 1:1 대응. `/debugger`, `/examples` 등
- 완전한 화면을 그린다
- 여러 위젯과 피처를 조합하는 컨테이너
- 페이지 컴포넌트(`*Page.tsx` 또는 `NotFound.tsx`)와 `index.ts`로 구성

**Features (캡슐화된 기능)**
- 하나의 사용자 경험/기능을 제공
- 내부 로직을 캡슐화 (외부는 `ui/` 폴더만 노출)
- **다른 Features와 직접 통신하지 않음** (widgets가 중계)
- 예: "코드 실행 제어", "에디터 설정"

**Widgets (조합 블록)**
- Features와 Entities를 조합한 거시적 UI 블록
- 기능을 제공하지 않고, 기존 기능들을 연결만 한다
- 예: "디버거 화면 전체" = 에디터 + 스코프 패널 + 출력 패널

---

## 2. 단방향 의존성 (엄격 준수)

```
app
 ↑
 ├← pages (모든 하위 레이어 사용 가능)
 ├← widgets (features, entities, shared 사용)
 ├← features (entities, shared만 사용)
 ├← entities (shared만 사용)
 └← shared (외부 라이브러리만 사용)
```

### 핵심 규칙

1. **상위 레이어는 하위 레이어를 사용할 수 있다**
   - pages → widgets, features, entities, shared ✅

2. **하위 레이어는 상위 레이어를 절대 참조하지 않는다**
   - features → pages ❌
   - entities → features ❌
   - shared → entities ❌

3. **같은 레이어 간 참조 금지**
   - features/debugger → features/main ❌
   - pages/debugger → pages/main ❌
   - widgets/layout-1 → widgets/layout-2 ❌

### ❌ 금지된 패턴

```typescript
// 1. 역방향 참조: entities에서 features 참조
import { DebugControls } from '@/features'  // ❌ shared가 아닌 features

// 2. 같은 레이어 간 직접 참조: features에서 features 참조
import { MainFeature } from '@/features/main'  // ❌ 동일 레이어

// 3. 하위에서 상위 참조: features에서 pages 참조
import { DebuggerPage } from '@/pages'  // ❌ 상위 레이어 참조

// 4. shared에서 도메인 레이어 참조
export { DebugSessionState } from '@/entities'  // ❌ shared는 인프라만
```

### ✅ 올바른 패턴

```typescript
// 1. pages는 모든 하위 레이어 참조 가능
import { DebuggerLayout } from '@/widgets'
import { DebugControls } from '@/features'
import { DebugSessionState } from '@/entities'
import { Button } from '@/shared'

// 2. widgets는 features, entities, shared 참조
import { DebugControls } from '@/features'
import { CodeEditorState } from '@/entities'

// 3. features는 entities, shared만 참조
import { DebugSessionState } from '@/entities'
import { Button, cn } from '@/shared'

// 4. entities는 shared만 참조
import { cn } from '@/shared'
```

---

## 3. Pages 레이어 구조

Pages는 라우트와 1:1 대응되며, **완전한 화면을 담당**합니다. 현재 프로젝트에는 4개의 페이지가 있습니다:

```
pages/
├── debugger/           # /debugger — 메인 디버거 페이지
├── main/               # / — 랜딩 페이지
├── examples/           # /examples — 예제 목록
└── not-found/          # * — 404 페이지
```

### Pages 레이어 구조 규칙

Pages는 **PageName.tsx + index.ts** 두 파일만 존재합니다.

```
pages/
└── [pageName]/
    ├── [PageName].tsx      # 페이지 컴포넌트 (export default)
    └── index.ts            # barrel export (named re-export)
```

**규칙:**
- 페이지 컴포넌트 파일은 default export (라우터 진입점)
- `index.ts`는 `export { default as [PageName] } from './[PageName]'` 형태로 재-export
- 페이지에 필요한 UI 컴포넌트는 반드시 `widgets/` 또는 `features/`로 추상화
- 페이지 내부에 `_components/`, `_hooks/` 등 추가 파일/폴더를 만들지 않는다
- Pages는 조합(composition)만 담당하며, 직접 로직을 갖지 않는다

**잘못된 예:**
```
pages/main/
├── MainPage.tsx
├── index.ts
├── _components/       ❌ pages 안에 컴포넌트 추가
│   └── HeroSection.tsx
└── _hooks/            ❌ pages 안에 훅 추가
    └── useHero.ts
```

**올바른 예:**
```
pages/main/
├── MainPage.tsx
└── index.ts           ✅ 조합만 담당

widgets/hero/          ✅ 재사용 가능한 UI 블록
└── ui/HeroSection.tsx

features/example-preview/  ✅ 기능 단위 캡슐화
└── ui/ExampleCard.tsx
```

---

## 4. Features 레이어 캡슐화 규칙

Features는 **하나의 사용자 경험/기능**을 캡슐화합니다. 현재 프로젝트는 구현 초기 단계이며, `features/debugger`를 중심으로 스캐폴딩을 먼저 구성했습니다.

이 프로젝트의 Features:

```
features/
├── debugger/                    # 디버거 기능 집합
│   ├── _apis/
│   │   └── index.ts
│   ├── _components/
│   │   ├── common/
│   │   │   └── index.ts
│   │   ├── features/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── _constants/
│   │   └── index.ts
│   ├── _hooks/
│   │   └── index.ts
│   ├── _stores/
│   │   └── index.ts
│   ├── ui/
│   │   └── index.ts
│   └── index.ts
├── main/
│   └── index.ts
├── examples/
│   └── index.ts
├── not-found/
│   └── index.ts
└── index.ts
```

### Slice 구조 규칙

현재 프로젝트 기준으로는 `debugger` 슬라이스에서 아래 내부 세그먼트를 사용합니다.

```
features/debugger/
├── _apis/                 # API 연동/런타임 연계
├── _components/           # 슬라이스 내부 컴포넌트
│   ├── common/            # 공통 표현 컴포넌트
│   └── features/          # 기능별 컴포넌트
├── _constants/            # 내부 상수
├── _hooks/                # 내부 훅
├── _stores/               # 내부 상태 저장소
├── ui/                    # 외부 공개 UI(필요 시)
└── index.ts               # 슬라이스 Public API
```

### Barrel Export 규칙

`features/[slice]/index.ts`는 슬라이스 Public API만 export합니다.
현재는 스캐폴딩 단계라 다수의 `index.ts`가 비어 있을 수 있습니다.

```typescript
// src/features/debugger/index.ts (예시)
export * from './ui'
```

내부 세그먼트(`_apis`, `_components`, `_constants`, `_hooks`, `_stores`)는 필요 전까지 외부 직접 노출을 지양합니다.

### Features 내부에서의 참조 규칙

Feature **내부**에서는 상대 경로 우선으로 참조합니다.

```typescript
// ✅ features/debugger 내부 파일 간 상대 경로 참조
import { something } from '../_hooks'

// ❌ pages/widgets에서 내부 경로 직접 참조
import { something } from '@/features/debugger/_hooks'
```

---

## 5. Entities 레이어 구조

Entities는 **도메인 비즈니스 로직과 데이터 모델**을 담습니다. 특정 기능과 무관한 순수 도메인 개념이어야 합니다.

이 프로젝트의 Entities:

```
entities/
├── debug-session/
│   ├── model/
│   │   ├── apis/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.ts
│   ├── ui/
│   │   └── index.ts
│   └── index.ts
├── code-editor/
│   ├── model/
│   │   ├── apis/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.ts
│   ├── ui/
│   │   └── index.ts
│   └── index.ts
└── index.ts
```

### Entities Barrel Export

```typescript
// src/entities/index.ts
export * from './debug-session'
export * from './code-editor'
```

```typescript
// src/entities/debug-session/index.ts
// src/entities/code-editor/index.ts
export * from './model'
export * from './ui'
```

---

## 6. Widgets 레이어 구조

Widgets는 **여러 Features와 Entities를 조합한 거시적 UI 블록**입니다. 기능을 제공하지 않고, 기존 컴포넌트들을 연결하기만 합니다.

이 프로젝트의 Widgets:

```
widgets/
└── layouts/
    ├── components/
    ├── ui/
    └── index.ts
```

### Widgets의 역할

- **Features와 Features의 중계자**
  - 서로 다른 Features가 직접 참조하지 않도록 중간에서 조합

- **Entities/Features를 표시하는 방식 결정**
  - 현재는 `layouts`에서 화면 조합 책임을 가진다

- **페이지 구조 제공**
  - Pages가 완전한 화면을 그리도록 돕는 레이아웃

---

## 7. Shared 레이어 구조

Shared는 **프로젝트 전반의 인프라**입니다. 순수 UI 컴포넌트, 유틸리티, 공통 타입 등을 제공합니다.

```
shared/
├── components/            # 순수 UI 컴포넌트
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── index.ts
│   └── index.ts
├── utils/                 # 순수 유틸리티 함수
│   ├── cn.ts
│   └── index.ts
├── types/                 # 공통 타입
│   ├── api.ts
│   └── index.ts
└── index.ts               # ⭐ 전체 export
```

### Shared Barrel Export

```typescript
// src/shared/index.ts
export * from './components'
export * from './utils'
export type * from './types'
```

---

## 8. Import 경로 규칙

### 규칙 1 — `shared`: 항상 `@/shared`에서 import

Shared의 모든 항목은 `@/shared`를 통해 접근합니다.

```typescript
// ❌ 금지 — 깊은 경로
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import type { ApiResponse } from '@/shared/types/api'

// ✅ 올바른 방식
import { Button, cn, type ApiResponse } from '@/shared'
```

### 규칙 2 — `entities`: 슬라이스 루트까지만

Entities 슬라이스의 모든 export는 슬라이스 루트(`@/entities`)를 통해 접근합니다.

```typescript
// ❌ 금지 — 내부 파일 직접 참조
import { DebugSessionState } from '@/entities/debug-session/model/types'
import { CodeEditorState } from '@/entities/code-editor/model/types'

// ✅ 올바른 방식
import { DebugSessionState, CodeEditorState } from '@/entities'
```

### 규칙 3 — `features`: Public API만 외부 노출

Features는 슬라이스 루트 `index.ts`로 정의한 Public API만 외부에 노출합니다.

```typescript
// ❌ 금지 — 내부 세그먼트 직접 참조
import { useDebuggerStore } from '@/features/debugger/_stores'
import { runDebugger } from '@/features/debugger/_apis'

// ✅ 올바른 방식 — 루트 Public API 사용
import { DebuggerFeature } from '@/features'

// ✅ 피처 내부에서 동일 피처의 내부 참조는 상대경로 사용
// features/debugger/ui/* 내부에서:
import { useDebuggerStore } from '../_stores'
```

### 규칙 4 — `widgets`: 슬라이스 루트까지만

Widgets는 슬라이스 루트를 통해 접근합니다.

```typescript
// ❌ 금지
import { DebuggerLayout } from '@/widgets/layouts/ui/DebuggerLayout'

// ✅ 올바른 방식
import { DebuggerLayout } from '@/widgets'
```

### 규칙 5 — `pages`: 라우터 진입점

Pages는 각 페이지의 `index.ts`를 통해 export합니다. 페이지 내부 컴포넌트는 외부 노출하지 않습니다.

```typescript
// ✅ 라우터에서 pages 참조
import { DebuggerPage } from '@/pages'

// ❌ 페이지 내부 컴포넌트 참조 금지
import { PageHeader } from '@/pages/debugger/_components'  // ❌
```

### 규칙 6 — 외부 라이브러리: 원본 패키지에서 직접 import

외부 라이브러리는 원본 패키지에서 직접 import합니다. Shared로 재노출하지 않습니다.

```typescript
// ❌ 금지 — shared를 통한 재노출
// (shared/index.ts에서)
export { YaksokSession } from '@dalbit-yaksok/core'
export { useQuery } from '@tanstack/react-query'

// ✅ 올바른 방식 — 원본 패키지 직접 import
import { YaksokSession } from '@dalbit-yaksok/core'
import { useQuery } from '@tanstack/react-query'
```

---

## 9. Barrel Export 구조 요약

각 레이어/슬라이스는 `index.ts`를 통해 Public API를 명확히 정의합니다.

| 레이어 | `index.ts` 위치 | 역할 | export 대상 |
|--------|----------------|------|-------------|
| **shared** | `shared/index.ts` | 인프라 정의 | 모든 세그먼트 (components, utils, types) |
| **entities** | `entities/index.ts` | 도메인 집계 | 각 슬라이스 |
| **entities/[slice]** | `entities/[slice]/index.ts` | 슬라이스 공개 API | model, ui 전체 |
| **features/[slice]** | `features/[slice]/index.ts` | 기능 캡슐화 | 슬라이스 Public API |
| **widgets** | `widgets/index.ts` | 조합 블록 집계 | 각 슬라이스 |
| **pages** | 각 페이지의 `index.ts` | 라우트 진입점 | 페이지 컴포넌트 export |

---

## 10. 실제 Import 경로 체크리스트

아래 표를 참고하여 import 경로의 정확성을 검증하세요.

| 상황 | 올바른 경로 | 금지 경로 | 이유 |
|------|------------|----------|------|
| 공용 UI 컴포넌트 | `@/shared` | `@/shared/components/ui/button` | Barrel export 통일 |
| 유틸 함수 | `@/shared` | `@/shared/utils/cn` | Barrel export 통일 |
| 공통 타입 | `@/shared` | `@/shared/types/api` | Barrel export 통일 |
| Entity 타입/컴포넌트 | `@/entities` | `@/entities/debug-session/model/types` | 슬라이스 캡슐화 |
| Feature 컴포넌트 | `@/features` | `@/features/debugger/_components/features` | Public API만 노출 |
| Feature 훅/모델 | 피처 내부만 | `@/features`로 참조 | 캡슐화 유지 |
| Widget | `@/widgets` | `@/widgets/layouts/ui/DebuggerLayout` | 슬라이스 캡슐화 |
| 외부 라이브러리 | 원본 패키지 | `@/shared`로 재노출 | 의존성 명시 |
| 페이지 로컬 컴포넌트 | 페이지 내부만 | `@/pages`에서 참조 | 페이지 격리 |

---

## 11. 절대 금지 사항 (FSD 규칙 위반)

아래는 FSD 원칙을 위반하는 패턴들입니다. 반드시 회피하세요.

```typescript
// ❌ 1. 역방향 의존성: shared가 entities/features 참조
// shared/index.ts
export { DebugSessionState } from '@/entities'
export { DebugControls } from '@/features'

// ❌ 2. 같은 레이어 간 직접 참조
// features/debugger/ui/index.ts
import { MainFeature } from '@/features/main'  // 동일 레이어 참조

// ❌ 3. Features 내부 캡슐화 위반
// pages/debugger/DebuggerPage.tsx
import { useDebuggerStore } from '@/features/debugger/_stores'  // 내부 세그먼트 직접 참조

// ❌ 4. Entities 내부 파일 직접 참조
// features/debugger/ui/index.ts
import { DebugSessionState } from '@/entities/debug-session/model/types'  // 깊은 경로

// ❌ 5. Pages 간 참조
// pages/debugger/DebuggerPage.tsx
import { MainPage } from '@/pages/main'  // 다른 페이지 직접 참조

// ❌ 6. 하위 레이어에서 상위 참조
// entities/debug-session/model/index.ts
import { DebuggerPage } from '@/pages/debugger'  // 상위 레이어

// ❌ 7. 특정 파일 깊은 경로 import
// features/debugger/ui/index.ts
import Button from '@/shared/components/ui/Button'  // 세그먼트 우회
```

---

## 12. 마이그레이션 가이드 (기존 코드 개선)

만약 기존 코드가 FSD를 따르지 않는다면, 아래 순서로 개선하세요.

### Step 1: 역할별 폴더를 도메인별로 재구성

```
// ❌ 기존 (역할 중심)
src/
├── components/
│   ├── Button.tsx
│   ├── ScopePanel.tsx
│   └── DebugControls.tsx
├── hooks/
│   ├── useButton.ts
│   ├── useScope.ts
│   └── useDebugSession.ts
└── utils/

// ✅ 개선 (기능 중심)
src/
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   └── index.ts
├── entities/
│   ├── debug-session/
│   │   ├── model/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   └── index.ts
│   │   └── index.ts
│   └── code-editor/
│       ├── model/
│       │   ├── types/
│       │   └── index.ts
│       ├── ui/
│       │   └── index.ts
│       └── index.ts
└── features/
    └── debugger/
        ├── _hooks/
        ├── _stores/
        ├── _components/
        ├── ui/
        └── index.ts
```

### Step 2: 캡슐화 규칙 적용

각 피처의 내부 파일을 `_`로 시작하는 폴더로 이동하고, `index.ts`를 통해 Public API만 노출합니다.

### Step 3: Import 경로 통일

모든 import를 슬라이스 루트 또는 `@/` 절대 경로로 통일합니다.

---

## 검사 명령어 (작업 완료 후 필수 실행)

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

## 참고 자료

- [teo님의 FSD 설명 - 관심사 분리](https://velog.io/@teo/separation-of-concerns-of-frontend)
- [teo님의 FSD 설명 - FSD 구조](https://velog.io/@teo/fsd)
- [teo님의 FSD 설명 - 폴더 구조](https://velog.io/@teo/folder-structure)
- [공식 FSD 가이드](https://feature-sliced.design/)
