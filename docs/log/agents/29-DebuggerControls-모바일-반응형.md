# 29. DebuggerControls 모바일 반응형 수정

## 사용한 에이전트 도구
- 없음 (직접 코드 수정)

## 위임 범위와 판단 근거
- `src/features/debugger/ui/DebuggerControls.tsx`의 모바일 레이아웃 개선
- 기존 구조: 단일 flex row에 버튼 6개 + 실행 속도 슬라이더 + 상태 표시 → 모바일에서 `overflowX: auto` 스크롤 발생
- 목표: 스크롤 없이 모든 요소가 화면 안에 표시되도록 재구성

## 수정 내역

**레이아웃 구조 변경:**
- 외부 div를 `flexDirection: "column"` 2행 구조로 변경
  - 1행: 버튼 그룹 (`flexWrap: "wrap"` — 넘치면 자동 줄바꿈)
  - 2행: 실행 속도 슬라이더 (`flex: 1`) + 상태 표시 (`flexShrink: 0`)

**모바일 버튼 텍스트 숨김:**
- `sm`(480px) 미만에서 버튼 레이블 `display: "none"` → 아이콘만 표시
- 버튼 6개가 한 줄에 수용 가능한 크기로 축소

**슬라이더 확장:**
- label에 `flex: 1`, input에 `style={{ flex: 1, minWidth: 0 }}` 적용 → 남은 너비를 모두 채움

## 검증 방법
- `pnpm run tsc` 통과 (타입 오류 없음)

## 교정 사항
- 없음
