# 01. lint 검사 및 수정

## 사용한 에이전트 도구
- `pnpm lint`: 프로젝트 내의 lint 오류 확인
- `read_file`: 오류가 발생한 파일(`ErrorBoundary.tsx`) 및 설정 파일(`eslint.config.js`, `package.json`) 분석
- `replace`: lint 오류 수정

## 위임 범위와 판단 근거
- lint 검사 수행: 프로젝트의 코드 품질을 유지하기 위해 전체 검사 수행
- `ErrorBoundary.tsx` 수정: `componentDidCatch` 메서드에서 사용되지 않는 매개변수(`_error`, `_info`)가 lint 에러를 발생시킴. 현재 로직에서 해당 매개변수가 필요하지 않으므로 제거 결정.

## 검증 방법
- 수정 후 `pnpm lint`를 재실행하여 모든 오류가 해결되었는지 확인

## 교정 사항
- 없음
