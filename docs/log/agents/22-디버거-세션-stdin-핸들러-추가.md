# 22. 디버거 세션 stdin 핸들러 추가

## 사용한 에이전트 도구
- `read_file`: 현재 코드 상태 확인
- `replace`: stdin 핸들러 추가

## 위임 범위와 판단 근거
- `src/features/debugger/_hooks/useDebugger.ts` 파일의 `createSession` 함수 수정
- 달빛약속 런타임에서 사용자 입력을 요구할 때 핸들러가 없으면 발생하는 런타임 에러 또는 무한 대기 방지를 위해 기본 `stdin` 핸들러 추가

## 검증 방법
- `npm run lint` 및 `tsc`를 통한 정적 분석 확인

## 교정 사항
- 없음
