# 24. Error Boundary 페이지 구현

## 사용한 에이전트 도구
- Agent (sub-agent, 병렬 실행)

## 위임 범위와 판단 근거
PRD 7.1에 에러 바운더리 페이지(`/error`)가 명시되어 있으나 미구현 상태였음.
다른 코드 품질 작업(25번)과 독립적이므로 병렬 sub-agent로 위임.

위임 범위:
- `src/shared/constants/route-path.ts`: `ERROR: '/error'` 상수 추가
- `src/pages/error/ErrorPage.tsx`: 에러 페이지 컴포넌트 신규 생성 (props: `error?: Error | null`, `resetError?: () => void`)
- `src/pages/error/index.ts`: named export 신규 생성
- `src/pages/index.ts`: error 모듈 export 추가
- `src/app/provider/components/ErrorBoundary.tsx`: React class-based ErrorBoundary 신규 생성 (`getDerivedStateFromError`, `componentDidCatch`, `handleReset`)
- `src/app/provider/components/index.ts`: ErrorBoundary export 추가
- `src/app/provider/ApplicationProvider.tsx`: QueryProvider를 ErrorBoundary로 감싸기
- `src/app/routes/Routes.tsx`: `/error` 라우트 추가

## 검증 방법
- `pnpm run lint && pnpm run format && pnpm run tsc` 통과 확인
- 최종 빌드: 325 modules transformed, 0 errors

## 교정 사항
- 특이사항 없음. Agent 2(코드 품질)가 ErrorPage.tsx props를 일부 정리했으나 충돌 없이 최종 통과.
