# 03. MainPage 리팩토링 및 구조화

## 사용한 에이전트 도구
- `write_file`, `replace`

## 위임 범위와 판단 근거
- `src/pages/main/MainPage.tsx`에 집중되어 있던 UI 로직을 `src/features/main`으로 분리하여 유지보수성을 높이고 관심사를 분리함.

## 검증 방법
- 컴포넌트 분리 후 `npm run build`를 통해 타입 체크 진행.
- 상대 경로 오류(`styled-system`)를 발견하여 수정 완료 (`../../../../` -> `../../../../../`).
- `shared` 모듈의 `FastForwardIcon` 누락으로 인한 빌드 에러를 `SparkIcon`으로 대체하여 해결.

## 교정 사항
- 컴포넌트가 깊은 구조(`src/features/main/components/features`)에 위치함에 따라 루트의 `styled-system`을 참조하기 위한 상대 경로를 한 단계 더 깊게 수정함.
