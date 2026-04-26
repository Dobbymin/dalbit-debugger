# ADR-03: PandaCSS 스타일링 채택

## 상태
승인됨

## 맥락

프로젝트의 스타일 관리 방식을 결정해야 합니다. 달빛약속 스텝 디버거는 다음과 같은 스타일 요구사항을 가집니다:

- 복잡한 레이아웃 (에디터, 변수 패널, 출력 로그 영역 조합)
- 현재 실행 줄 강조 등 **동적 스타일** 변경
- 다크모드/라이트모드 **테마 전환**
- 반응형 디자인 (데스크톱, 태블릿 대응)
- 컴포넌트 재사용성 높은 프로토타이핑
- TypeScript와의 **완벽한 타입 안전성**

기존 CSS 방식들은 다음 문제를 야기합니다:

- 순수 CSS: 클래스명 관리 복잡, 스코핑 어려움
- SASS/SCSS: 번들 크기 증가, 런타임 컴파일 오버헤드
- CSS-in-JS (Emotion, styled-components): 런타임 오버헤드, 타입 안전성 제한
- Tailwind CSS: 커스텀 테마 확장 복잡, 동적 값 처리 어려움

## 선택지

### 1. CSS Modules (Pure CSS)
```typescript
import styles from './Button.module.css'

export const Button = () => <button className={styles.primary} />
```

**장점:**
- CSS 표준 준수
- 성능 최적 (번들 크기 최소)
- 학습 곡선 완만

**단점:**
- 클래스명 네이밍 규칙 자체 관리 필요
- 동적 스타일 추가 시 복잡성 증가
- 테마 전환 어려움
- 타입 안전성 없음

### 2. Tailwind CSS + Headless UI
```typescript
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg" />
```

**장점:**
- 개발 속도 빠름
- 유틸리티 클래스 방식으로 일관성 유지
- 큰 커뮤니티
- 번들 크기 최적화 (purge)

**단점:**
- HTML에 길어지는 클래스 목록
- 커스텀 디자인 시스템 구축 어려움
- 동적 클래스 생성 불안정 (PurgeCSS 우회 위험)
- 테마 커스터마이징 복잡
- 타입 안전성 없음 (autocomplete 플러그인 필요)

### 3. Styled-Components (Runtime CSS-in-JS)
```typescript
const ButtonStyled = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.variant === 'primary' ? '#3b82f6' : '#6b7280'};
  border-radius: 8px;
`
```

**장점:**
- 컴포넌트 단위로 스타일 캡슐화
- JavaScript의 동적 값 활용 가능
- Props를 통한 동적 스타일링
- 프로토타이핑 빠름

**단점:**
- 런타임 스타일 계산 오버헤드
- 번들에 런타임 CSS 엔진 포함
- 성능 최적화 어려움
- 자동 완성 미지원
- 타입 안전성 제한 (제너릭으로 보완 필요)

### 4. PandaCSS ✅
```typescript
const buttonStyle = cva({
  base: { px: '4', py: '2', borderRadius: 'md' },
  variants: {
    variant: {
      primary: { bg: 'blue.500', _hover: { bg: 'blue.600' } },
      secondary: { bg: 'gray.500' }
    }
  }
})

export const Button = (props) => <button className={buttonStyle(props)} />
```

**장점:**
- **빌드타임 CSS 생성** (런타임 오버헤드 없음)
- **완벽한 TypeScript 지원** (타입 안전한 스타일 props)
- 테마 커스터마이징 쉬움
- 동적 스타일링 안전 (생성 시점에 검증)
- 토큰 기반 시스템으로 일관성 유지
- Zero-runtime (styled-components 대비 성능 우수)
- `css()` 유틸리티로 inline 스타일 자동 생성
- `cva()` (Component Variants API)로 다양한 컴포넌트 변형 관리

**단점:**
- 상대적으로 새로운 도구 (커뮤니티 규모 작음)
- 학습 곡선 있음
- 설정 파일 이해 필요

### 비교표

| 항목 | CSS Modules | Tailwind | Styled-Components | PandaCSS |
|------|------------|----------|------------------|----------|
| 번들 크기 | 최소 | 작음 | 중간 | 매우 작음 |
| 런타임 오버헤드 | 0 | 0 | 높음 | 0 |
| 타입 안전성 | ❌ | ⚠️ | △ | ✅ |
| 동적 스타일링 | △ | ⚠️ | ✅ | ✅ |
| 테마 관리 | △ | △ | ✅ | ✅ |
| 프로토타이핑 | △ | ✅ | ✅ | ✅ |
| 커뮤니티 규모 | ✅ | ✅ | ✅ | △ |
| TypeScript 통합 | △ | △ | △ | ✅ |
| DX (IDE 자동완성) | ❌ | ✅ (플러그인) | △ | ✅ |

## 결정

**PandaCSS를 채택합니다.**

구체적으로:
- `@pandacss/dev` (^1.10.0) 개발 도구
- PandaCSS `css()`, `cva()` 함수로 스타일 작성
- `panda.config.ts`를 통한 프로젝트 전역 설정

## 근거

### 1. 완벽한 타입 안전성
```typescript
// 타입 에러: 존재하지 않는 token
const invalid = css({ bg: 'nonexistent' })  // ❌ TypeScript 에러

// 타입 안전: 존재하는 token만 완성
const valid = css({ bg: 'blue.500' })  // ✅
```

이는 런타임 오류를 빌드 시점에 감지하므로, 특히 리팩토링 시 안전성을 보장합니다.

### 2. Zero-Runtime 성능
PandaCSS는 **빌드타임에 CSS를 생성**합니다:

```typescript
// 빌드 시 변환됨
css({ px: '4', py: '2' })

// 다음과 같이 변환됨
<div className="px_4 py_2" />  // 생성된 클래스명
```

따라서 런타임에 스타일 계산이 발생하지 않아 성능이 우수합니다.

### 3. 토큰 기반 일관된 디자인 시스템
프로젝트의 `panda.config.ts`에서 색상, 간격, 타이포그래피 등을 한 곳에서 관리:

```typescript
// panda.config.ts
export default defineConfig({
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'error': '#ef4444',
        'debug-line': '#fef08a'
      },
      spacing: {
        'editor-gutter': '40px'
      }
    }
  }
})
```

이를 통해:
- 디자인 변경 시 한 곳만 수정
- 모든 컴포넌트에서 동일한 토큰 사용 보장
- 테마 전환 시 토큰만 재정의

### 4. CVA (Component Variants API)로 컴포넌트 변형 관리
```typescript
const buttonRecipe = cva({
  base: { px: '4', py: '2', borderRadius: 'md' },
  variants: {
    variant: {
      primary: { bg: 'blue.500', color: 'white' },
      secondary: { bg: 'gray.200', color: 'gray.900' }
    },
    size: {
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' }
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})

// 타입 안전한 사용
<button className={buttonRecipe({ variant: 'secondary', size: 'sm' })} />
```

### 5. 동적 스타일링의 안전성
```typescript
// 안전한 동적 값 (생성 시점에 검증)
const styles = css({
  bg: token('colors.blue.500'),  // ✅ token() 함수로 타입 검증
  p: variable('--custom-padding')  // ✅ CSS 변수로 런타임 값
})

// 위험한 동적 값 (회피됨)
const bad = css({ bg: userInput })  // ❌ 타입 에러
```

### 6. FSD 아키텍처와의 시너지
PandaCSS는 컴포넌트 단위의 스타일 관리를 권장하므로 FSD의 각 슬라이스 내에서 독립적으로 스타일을 관리할 수 있습니다:

```
features/debugger/_components/
├── DebuggerPanel.tsx
├── DebuggerPanel.style.ts  # PandaCSS로 스타일 정의
└── ...

entities/code-editor/ui/
├── CodeEditor.tsx
├── CodeEditor.style.ts  # 독립적 스타일
└── ...
```

### 7. IDE 자동완성과 문서화
TypeScript의 완벽한 지원으로 IDE에서:
- 사용 가능한 토큰 자동 완성
- hover 시 토큰 값 표시
- 잘못된 값 실시간 감지

## 결과

### 적용된 구현 구조

#### 1. 프로젝트 설정
```
root/
├── panda.config.ts           # 전역 토큰, 테마, 프리셋
├── package.json              # @pandacss/dev 명시
└── src/
```

#### 2. 스타일 작성 위치
```
src/entities/code-editor/ui/
├── CodeEditor.tsx
├── codeEditor.style.ts       # PandaCSS css(), cva() 정의
└── index.ts
```

#### 3. 컴포넌트에서 사용
```typescript
// CodeEditor.tsx
import { codeeditorStyle } from './codeEditor.style'

export const CodeEditor = ({ theme }) => (
  <div className={codeeditorStyle.root({ theme })}>
    {/* 에디터 내용 */}
  </div>
)
```

#### 4. 스타일 파일 예시
```typescript
// codeEditor.style.ts
import { css, cva } from '@pandacss/dev'

export const codeeditorStyle = {
  root: cva({
    base: {
      w: '100%',
      h: '100%',
      border: '1px solid',
      borderColor: 'gray.200',
      borderRadius: 'md',
      overflow: 'hidden'
    },
    variants: {
      theme: {
        light: { bg: 'white', color: 'gray.900' },
        dark: { bg: 'gray.900', color: 'white' }
      }
    }
  }),
  highlightedLine: css({
    bg: 'yellow.100',
    borderLeftWidth: '3px',
    borderLeftColor: 'yellow.500'
  })
}
```

#### 5. 테마 전환 구현
```typescript
// panda.config.ts
export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          'bg-primary': { value: '#ffffff', description: '주 배경색' },
          'bg-secondary': { value: '#f5f5f5' }
        }
      }
    }
  },
  conditions: {
    dark: '[data-theme="dark"] &'
  }
})

// 컴포넌트에서
<button className={css({
  bg: 'bg-primary',
  _dark: { bg: 'gray.900' }
})} />
```

### 빌드 최적화

#### 1. CSS 생성 파이프라인
```bash
pnpm prepare-panda  # panda codegen && panda cssgen
```

이 명령으로:
- TypeScript 타입 정의 생성 (`@pandacss/types`)
- CSS 파일 생성 (`./panda/panda.css`)
- 사용하지 않는 클래스는 제거됨

#### 2. 번들 크기 비교 (예상값)
| 스타일링 방식 | CSS 번들 크기 |
|------------|-----------|
| PandaCSS | ~20KB (gzip) |
| Tailwind | ~30-50KB (gzip) |
| Styled-Components | ~50KB + 런타임 |

#### 3. 성능 특성
| 항목 | 목표 | 달성 방식 |
|------|------|---------|
| 스타일 파싱 시간 | <10ms | 빌드타임 생성 |
| 동적 스타일 적용 | <1ms | CSS 클래스 변경만 |
| IDE 자동완성 | <100ms | TypeScript 통합 |

### 기대 효과

- **안정성**: 타입 검증으로 스타일 버그 사전 방지
- **성능**: Zero-runtime으로 사용자 경험 향상
- **유지보수**: 토큰 기반 관리로 리팩토링 안전
- **확장성**: CVA로 새로운 컴포넌트 변형 추가 용이
- **개발 경험**: IDE 통합으로 개발 속도 향상
- **프로토타이핑**: 동적 스타일링 안전하게 지원

---

**참고 문서**:
- `docs/adr/01-fsd-architecture.md` (컴포넌트 배치)
- `docs/rule/fsd-rule.md` (import 경로 규칙)
- PandaCSS 공식 문서: https://panda-css.com

**도입일**: 2026-04-23

**관련 패키지**:
- `@pandacss/dev` (개발 도구 및 컴파일러)
