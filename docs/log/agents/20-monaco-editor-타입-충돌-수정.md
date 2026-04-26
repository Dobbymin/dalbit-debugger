# 20. monaco-editor 타입 충돌 수정

## 사용한 에이전트 도구
- `read_file`, `replace`, `run_shell_command`

## 위임 범위와 판단 근거
- `src/entities/code-editor/ui/CodeEditor.tsx`에서 발생하는 Monaco Editor 타입 불일치 오류 수정.
- `@dalbit-yaksok/monaco-language-provider`가 기대하는 `monaco-editor` 버전(0.52.2)과 `@monaco-editor/react`를 통해 제공되는 타입 또는 프로젝트에 설치된 다른 버전 간의 타입 정의가 충돌하여 발생.

## 검증 방법
- `npm run tsc`를 실행하여 해당 파일의 타입 오류가 사라졌는지 확인.

## 교정 사항
- `monaco.languages`를 `any`로 캐스팅하여 라이브러리 간의 버전 파편화로 인한 타입 호환성 문제 해결.
