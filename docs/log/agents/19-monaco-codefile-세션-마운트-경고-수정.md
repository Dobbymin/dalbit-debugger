# 19. Monaco CodeFile 세션 마운트 경고 수정

## 사용한 에이전트 도구
- Read, Grep, Glob, Bash, Edit, Write

## 위임 범위와 판단 근거

### 문제
Monaco 에디터에서 키 입력 시마다 콘솔에 두 가지 경고가 반복 출력됨:
```
CodeFile is not mounted to Session, skips mentioning files
Parse: X.XXX ms
```

### 원인 분석 범위
1. `@dalbit-yaksok/monaco-language-provider` 라이브러리 소스 추적
   - `BaseProvider.createColorParts()` → `new CodeFile(code, TEMP_FILE_NAME)` 생성 후 세션 미마운트
   - `codeFile.ast` 접근 시 `parse()` → `createDynamicRule()` → `getRulesFromMentioningFile()` 호출
   - `codeFile.mounted === false` 이므로 `console.warn` 출력 후 `[]` 반환

2. `CodeEditor.tsx`의 double-update 버그
   - `useMemo(() => new DalbitYaksokApplier(value), [value])` — `value` 변경마다 applier 재생성
   - `handleMount`에서 `applier.configEditor(editor)` 호출 → `onDidChangeModelContent` 리스너는 최초 applier에만 연결됨
   - 키 입력 시 `onDidChangeModelContent`(초기 applier) + `onChange`의 `applier.updateCode(val)`(현재 applier) 두 번 실행 → 경고 2회 발생

## 수정 내용

### 1. pnpm patch — `BaseProvider.createColorParts()` 수정
**파일**: `node_modules/.pnpm_patches/@jsr/dalbit-yaksok__monaco-language-provider@6.0.5/provider/base.js`

```js
// Before
import { CodeFile } from "@jsr/dalbit-yaksok__core";
// ...
createColorParts(code) {
    const codeFile = new CodeFile(code, this.TEMP_FILE_NAME);

// After
import { YaksokSession } from "@jsr/dalbit-yaksok__core";
// ...
createColorParts(code) {
    const session = new YaksokSession();
    const codeFile = session.addModule(this.TEMP_FILE_NAME, code);
```

`YaksokSession.addModule()`이 내부적으로 `codeFile.mount(session)`을 호출하므로
`codeFile.mounted === true` → `getRulesFromMentioningFile` 경고 미출력.

### 2. `CodeEditor.tsx` — double-update 제거
- `useMemo` 의존성에서 `value` 제거 → applier 최초 1회 생성
- `onChange`에서 `applier.updateCode(val)` 제거 → `configEditor`의 `onDidChangeModelContent`가 단독 처리

## 검증 방법
- `pnpm run lint` — 오류 없음
- `pnpm run tsc` — 타입 오류 없음
- `pnpm patch-commit` 성공적으로 완료 → `package.json`에 `patchedDependencies` 항목 자동 추가

## 교정 사항
- 초기에 `codeFile.parseOptimistically()` 사용을 검토했으나, `parse(this, true)` 역시 동일하게 `createDynamicRule()` → `getRulesFromMentioningFile()`을 거치므로 경고를 막을 수 없음 — 최종적으로 `YaksokSession` 마운트 방식으로 수정
