# ADR-05: pnpm Patch 의존성 관리 전략

## 상태
승인됨

## 맥락

프로젝트는 다음 세 가지 달빛약속 공식 패키지에 의존합니다:

- `@dalbit-yaksok/core` (JSR, ^6.0.5): 런타임 엔진
- `@dalbit-yaksok/monaco-language-provider` (JSR, ^6.0.5): 언어 정의
- `monaco-editor` (npm, 0.55.1): 에디터 기본

이들 패키지는 다음과 같은 특성을 가집니다:

- **활발한 개발**: 버그 수정과 기능 추가가 지속됨
- **프로젝트 초기 단계**: 런타임 환경이 안정화되지 않을 수 있음
- **특수한 요구사항**: 달빛약속 스텝 디버거의 특정 요구를 만족하지 않을 수 있음
- **직접 수정 불가능**: npm/JSR 저장소 직접 수정 불가능

런타임 수정이 필요한 상황은 다음과 같습니다:

- 버그 핫픽스가 필요하지만 공식 릴리스 전
- 런타임 동작을 프로젝트 특화로 수정 필요
- 성능 최적화가 긴급하게 필요한 경우
- 타입 정의 수정 필요

## 선택지

### 1. node_modules 직접 수정
```
node_modules/@dalbit-yaksok/core/dist/
└── [버그 수정 코드 직접 입력]
```

**장점:**
- 빠른 테스트 가능

**단점:**
- **절대 금지**: pnpm install 실행 시 덮어써짐
- 형상관리 불가능 (git에 올릴 수 없음)
- 다른 개발자 환경에서 재현 불가능
- CI/CD에서 동작하지 않음
- 버전 업그레이드 시 모든 수정 손실

### 2. 패키지 Fork 및 관리
```
https://github.com/our-org/dalbit-yaksok-core
↓
package.json의 dependencies에 fork URL 사용
```

**장점:**
- 완전한 제어
- 버전 관리 가능
- CI/CD와 호환

**단점:**
- **프로젝트 규칙 위반**: 공식 저장소 fork 금지
- 유지보수 부담 높음 (업스트림 변경 추적 필요)
- 불필요한 복제 (공식 저장소와 동기화 필요)
- 팀 협력 복잡도 증가

### 3. pnpm patch ✅
```bash
pnpm patch @dalbit-yaksok/core
# → 에디터에서 패키지 수정
pnpm patch-commit [패치 경로]
```

**장점:**
- **pnpm 공식 기능**: 표준 방식
- 변경사항이 `patches/` 디렉토리에 저장됨
- git으로 형상 관리 가능
- pnpm install 시 자동 적용
- 다른 개발자 환경에서도 재현 가능
- 버전 업그레이드 시 기존 패치 검토 후 적용
- `pnpmfile.cjs`로 자동화 가능

**단점:**
- 패치가 버전 특정적 (버전 업그레이드 시 재작성 필요)
- 복잡한 변경사항은 유지보수 어려움
- 패치 크기가 크면 관리 복잡

### 4. 상위 버전 업그레이드 요청 (Pull Request)
```
https://github.com/dalbit-yaksok/core
→ PR 제출로 공식 수정 요청
```

**장점:**
- 장기적 해결책
- 커뮤니티 전체 혜택
- 공식 지원

**단점:**
- 수정까지의 시간 불확실 (차단 위험)
- 긴급 버그 핫픽스 불가능
- 단기 해결이 아님

### 비교표

| 항목 | node_modules 직접 수정 | Fork | pnpm patch | PR 요청 |
|------|-----------------|------|-----------|---------|
| 빠른 테스트 | ✅ | ✅ | ✅ | ❌ |
| 형상관리 | ❌ | ✅ | ✅ | - |
| 재현 가능 | ❌ | ✅ | ✅ | ✅ |
| 자동화 가능 | ❌ | ✅ | ✅ | - |
| 규칙 준수 | ❌ | ❌ | ✅ | ✅ |
| 유지보수 | ❌ | △ | ✅ | - |
| CI/CD 호환 | ❌ | ✅ | ✅ | ✅ |

## 결정

**pnpm patch를 표준 의존성 관리 전략으로 채택합니다.**

구체적으로:
- `pnpm patch [패키지명]`으로 필요시 의존성 수정
- 변경사항을 `patches/` 디렉토리에 저장
- `pnpmfile.cjs`에 자동 적용 설정 기록
- PR 수정 병렬 진행 (장기 해결책)

## 근거

### 1. 프로젝트 규칙 준수
CLAUDE.md에 명시된 규칙:
- "node_modules 직접 수정 금지"
- "@dalbit-yaksok/core 레포지토리 fork 금지"

pnpm patch는 이 두 규칙을 모두 준수합니다.

### 2. pnpm의 표준 기능
pnpm은 다음과 같은 이유로 patch를 적극 권장합니다:

- 크로스 플랫폼 호환성
- npm 스크립트 간소화
- 커뮤니티 관례 (많은 오픈소스 프로젝트에서 사용)

### 3. 형상관리와 재현성
```bash
# 1차: 개발자가 수정
pnpm patch @dalbit-yaksok/core
# → 에디터에서 수정

# 2차: 패치 커밋
pnpm patch-commit patches/[생성된-경로]
# → patches/ 디렉토리에 .patch 파일 저장

# 3차: 다른 개발자가 자동 적용
pnpm install
# → pnpmfile.cjs 설정에 따라 자동 적용
```

### 4. 자동화 가능성

pnpm은 `pnpmfile.cjs`를 통해 patch 자동 적용을 지원합니다:

```javascript
// pnpmfile.cjs
function readPackage(pkg, context) {
  // 특정 패키지에 패치 적용
  if (pkg.name === '@dalbit-yaksok/core') {
    // 조건부 처리 가능
    pkg.dependencies = pkg.dependencies || {}
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
```

### 5. 버전 업그레이드 시 관리
버전 업그레이드 시에도 패치가 유지됩니다:

```bash
# 버전 업그레이드
pnpm update @dalbit-yaksok/core@^6.0.10

# 기존 패치 검토
pnpm patch @dalbit-yaksok/core
# → 충돌 시 수정, 아니면 그대로 적용
```

### 6. 단기 해결책과 장기 해결책의 병렬 진행
pnpm patch는 긴급 대응이 필요한 동안, PR 수정은 장기적으로 추진할 수 있게 합니다:

```
즉시 해결: pnpm patch 적용
↓
[코드 개발 계속]
↓
장기 해결: 공식 저장소에 PR (동시 진행)
↓
공식 버전 릴리스 시 patch 제거
```

## 결과

### 적용된 워크플로우

#### 1. 패치 생성 프로세스
```bash
# Step 1: 패치 대상 패키지 선정
# 예: @dalbit-yaksok/core의 버그 수정 필요

# Step 2: 임시 수정 환경 생성
pnpm patch @dalbit-yaksok/core
# → 임시 디렉토리가 열리고 에디터에서 수정 가능

# Step 3: 필요한 변경사항 적용
# 예: src/runtime/executor.ts에서 버그 수정

# Step 4: 패치 커밋
pnpm patch-commit [생성된-경로]
# → patches/@dalbit-yaksok__core@6.0.5.patch 생성
```

#### 2. 디렉토리 구조
```
root/
├── pnpm-lock.yaml          # 패치 참조 기록
├── pnpmfile.cjs            # 자동 적용 설정 (필요시)
├── package.json
└── patches/
    ├── @dalbit-yaksok__core@6.0.5.patch
    ├── @dalbit-yaksok__monaco-language-provider@6.0.5.patch
    └── monaco-editor@0.55.1.patch
```

#### 3. pnpmfile.cjs 설정 예시
```javascript
// pnpmfile.cjs
function readPackage(pkg, context) {
  // 주석으로 patch 이유 기록
  if (pkg.name === '@dalbit-yaksok/core') {
    // PATCH: 실행 흐름 추적 이벤트의 race condition 수정
    // Issue: https://github.com/dalbit-yaksok/core/issues/123
    // PR: https://github.com/dalbit-yaksok/core/pull/124 (진행 중)
  }

  if (pkg.name === '@dalbit-yaksok/monaco-language-provider') {
    // PATCH: 일부 달빛약속 문법이 인식되지 않는 버그
    // Issue: https://github.com/dalbit-yaksok/monaco-language-provider/issues/45
    // Workaround: 임시 토큰화 규칙 추가
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
```

#### 4. 버전 업그레이드 워크플로우
```bash
# 1. 새 버전 릴리스 확인
pnpm update @dalbit-yaksok/core

# 2. 기존 패치가 여전히 필요한지 확인
pnpm patch @dalbit-yaksok/core
# → 새 버전의 코드 검토
# → 이미 수정됨: 패치 폐기
# → 여전히 필요: 재적용

# 3. 패치 재적용 또는 제거
pnpm patch-commit [경로]  # 재적용
# 또는
rm patches/@dalbit-yaksok__core@*.patch  # 폐기
```

#### 5. 패치 이력 관리
```bash
# git으로 패치 추적
git log --oneline -- patches/

# 예시:
# abc1234 fix: @dalbit-yaksok/core에서 race condition 수정
# def5678 patch: monaco-language-provider 토큰화 버그 개선
```

### 패치 작성 가이드라인

#### 패치 크기 제약
| 범위 | 권장 |
|------|------|
| 버그 핫픽스 | 100줄 이하 |
| 성능 개선 | 50줄 이하 |
| 타입 수정 | 20줄 이하 |
| 복잡한 기능 추가 | ❌ 금지 (PR로 요청) |

#### 패치 작성 체크리스트
- [ ] 문제를 명확히 설명하는 주석 포함
- [ ] 공식 저장소 이슈 링크 기록
- [ ] 임시 해결책임을 명시
- [ ] pnpmfile.cjs에 이유와 PR 링크 기록
- [ ] git commit 메시지에 패치 이유 설명
- [ ] 코드 리뷰 및 테스트 완료

### 성능 영향

| 작업 | 영향도 | 비고 |
|------|--------|------|
| pnpm install | <100ms 추가 | 패치 적용 시간 |
| pnpm update | <500ms 추가 | 패치 재적용 확인 |
| 빌드 | 영향 없음 | 런타임에만 적용 |

### 기대 효과

- **신속한 대응**: 긴급 버그 수정 가능
- **추적 가능성**: 모든 수정사항을 git에 기록
- **재현성**: 모든 개발자와 CI/CD에서 동일한 환경
- **지속성**: 버전 업그레이드해도 패치 유지
- **협업**: PR을 통해 공식 수정과 병렬 진행

### 피해야 할 패턴

```bash
# ❌ 절대 금지: node_modules 직접 편집
vi node_modules/@dalbit-yaksok/core/dist/executor.js

# ❌ 절대 금지: fork 생성
# (공식 저장소 외에 독립적 fork 생성)

# ✅ 올바른 방식
pnpm patch @dalbit-yaksok/core
# [수정]
pnpm patch-commit [경로]
```

---

**참고 문서**:
- pnpm 공식 문서: https://pnpm.io/cli/patch
- CLAUDE.md (절대 금지 사항)
- 프로젝트 규칙 (docs/rule/project-rule.md)

**도입일**: 2026-04-23

**관련 명령어**:
- `pnpm patch [패키지명]`: 패치 생성
- `pnpm patch-commit [경로]`: 패치 저장
- `pnpm install`: 자동 적용
