# ADR-01: FSD(Feature-Sliced Design) 아키텍처 채택

## 상태
승인됨

## 맥락

프로젝트 초기 단계에서 컴포넌트와 비즈니스 로직을 조직하는 방식을 결정해야 했습니다. 달빛약속 스텝 디버거는 다음과 같은 특성을 가지고 있습니다:

- 코드 에디터, 변수 상태 추적, 출력 로그, 실행 제어 등 여러 독립적인 기능들의 조합
- 향후 새로운 기능 추가 및 확장 가능성
- 명확한 책임 분리와 모듈화 필요
- 팀 협업과 코드 리뷰를 위한 일관된 구조 필요

기존의 `components/`, `hooks/`, `utils/` 형태의 역할 중심 구조로는 다음과 같은 문제가 발생합니다:

- 한 기능에 관련된 코드가 여러 폴더에 산재됨
- 기능 간 의존성 관계가 명확하지 않음
- 새로운 개발자가 코드베이스의 구조를 이해하기 어려움
- 리팩터링 시 영향 범위 파악이 어려움

## 선택지

### 1. 역할 중심 구조 (Role-Based)
```
src/
├── components/
├── hooks/
├── utils/
├── stores/
└── types/
```

**장점:**
- 빠른 초기 개발
- 간단한 구조

**단점:**
- 확장성 제한
- 기능별 코드가 분산됨
- 기능 간 의존성 추적 어려움

### 2. 도메인 기반 구조 (Domain-Based)
```
src/
├── debugger/
├── editor/
├── common/
└── types/
```

**장점:**
- 기능별로 코드가 모임
- 확장성 좋음

**단점:**
- 도메인 정의가 모호할 수 있음
- 공통 코드의 위치 결정이 어려움
- 단방향 의존성 강제가 약함

### 3. Feature-Sliced Design (FSD) ✅
```
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
├── shared/
```

**장점:**
- 명확한 계층 구조와 단방향 의존성
- 기능별로 응집된 코드
- 확장성과 유지보수성 우수
- 팀 협업에 적합한 명확한 규칙

**단점:**
- 초기 학습 곡선
- 폴더 구조가 다소 복잡

## 결정

**Feature-Sliced Design (FSD) 아키텍처를 채택합니다.**

FSD는 다음 7개의 계층으로 구성됩니다:

1. **app**: 애플리케이션 진입점, 라우터, 전역 Provider, 에러 바운더리
2. **pages**: URL별 완전한 화면 (라우트와 1:1 대응)
3. **widgets**: 여러 기능을 조합한 독립적인 UI 블록
4. **features**: 사용자 경험 중심의 기능 단위 (캡슐화)
5. **entities**: 도메인 비즈니스 로직 및 데이터 모델
6. **shared**: 프로젝트 전반의 인프라 및 공통 모듈
7. **상향식 참조**: shared ← entities ← features ← widgets ← pages ← app

## 근거

### 1. 단방향 의존성
FSD의 핵심은 명확한 계층 구조로 상위 계층만 하위 계층을 참조할 수 있다는 것입니다. 이를 통해:
- 순환 참조 방지
- 의존성 추적 용이
- 리팩터링 영향 범위 최소화

### 2. 높은 응집도
관련된 컴포넌트, 훅, 타입, 상태 관리 코드가 한 기능(feature/entity) 아래에 모여있어:
- 기능 이해가 쉬움
- 기능 추가/수정 시 한 곳에서 작업
- 코드 네비게이션 효율성 증대

### 3. 확장성
새로운 기능 추가 시 기존 코드에 영향을 주지 않으면서 추가 가능:
- 새로운 feature slice 생성
- 기존 코드 수정 최소화
- 병렬 개발 용이

### 4. 팀 협업
명확한 구조와 규칙으로:
- 새로운 개발자의 온보딩 시간 단축
- 코드 리뷰 포인트 명확화
- 컨벤션 자동화 가능 (lint, import 정렬)

### 5. 프로젝트 특성 부합
달빛약속 스텝 디버거의 특성과 FSD의 맞춤:
- 코드 에디터, 변수 추적, 출력 로그 등 독립적인 기능들 → features/entities
- 디버거 화면 전체 구성 → widgets
- 페이지 조합 → pages

## 결과

### 적용된 구조

프로젝트는 다음과 같이 FSD를 적용합니다:

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
│   ├── debugger/
│   ├── examples/
│   ├── not-found/
│   └── index.ts
│
├── widgets/
│   ├── layouts/
│   │   ├── components/
│   │   ├── ui/
│   │   └── index.ts
│   └── index.ts
│
├── features/
│   ├── debugger/          # 디버거 기능 집합
│   │   ├── _apis/
│   │   ├── _components/
│   │   │   ├── common/
│   │   │   └── features/
│   │   ├── _constants/
│   │   ├── _hooks/
│   │   ├── _stores/
│   │   ├── ui/
│   │   └── index.ts
│   ├── main/
│   ├── examples/
│   ├── not-found/
│   └── index.ts
│
├── entities/
│   ├── debug-session/     # 디버그 세션 도메인 모델
│   │   ├── model/
│   │   │   ├── apis/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── ui/
│   │   └── index.ts
│   ├── code-editor/       # 코드 에디터 도메인 모델
│   │   ├── model/
│   │   │   ├── apis/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── ui/
│   │   └── index.ts
│   └── index.ts
│
└── shared/
    ├── components/
    ├── utils/
    ├── types/
    ├── constants/
    ├── stores/
    └── index.ts
```

### 규칙 및 제약

1. **Import 경로 규칙**
   - shared: `@/shared`
   - entities: `@/entities`
   - features: `@/features` (public API만)
   - widgets: `@/widgets`
   - pages: `@/pages`

2. **캡슐화**
   - features와 entities의 내부 파일(`_*`)은 외부 노출 금지
   - `index.ts`를 통한 public API만 외부 노출

3. **단방향 의존성 검증**
   - 린트 규칙으로 자동 검증
   - PR 리뷰 시 확인

### 기대 효과

- **개발 속도 향상**: 명확한 구조로 새 기능 추가가 빠름
- **유지보수 용이**: 기능별 코드가 모여있어 수정 용이
- **확장성**: 새로운 기능 추가 시 기존 코드 영향 최소화
- **협업 효율성**: 팀원 간 코드 이해도 향상
- **테스트 가능성**: 기능이 잘 격리되어 단위 테스트 작성 용이

---

**참고 문서**: `docs/rule/fsd-rule.md`

**도입일**: 2026-04-23
