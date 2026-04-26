# 02. Docker 설정

## 사용한 에이전트 도구
- `read_file`: 프로젝트 설정(`package.json`, `vite.config.ts`) 확인
- `write_file`: `Dockerfile`, `.dockerignore` 생성

## 위임 범위와 판단 근거
- Docker 설정: 라즈베리 파이 배포를 위해 컨테이너화가 필요함.
- 멀티 스테이지 빌드 사용: 빌드 도구와 소스 코드를 최종 이미지에서 제외하여 이미지 크기를 최소화하고 보안을 강화함.
- `pnpm` 활용: 프로젝트의 패키지 매니저와 일관성을 유지하기 위해 Docker 내부에서도 `pnpm`을 사용하여 빌드하도록 구성.
- Nginx 사용: 정적 웹 사이트를 효율적으로 서빙하기 위해 경량화된 `nginx:alpine` 이미지를 사용.

## 검증 방법
- `Dockerfile` 및 `.dockerignore` 파일 생성 확인
- (직접 실행은 불가능하지만) 아키텍처 호환성 및 빌드 단계의 논리적 결함 검토

## 교정 사항
- 없음
