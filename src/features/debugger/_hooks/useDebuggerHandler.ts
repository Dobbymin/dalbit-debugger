import { useDebugActionSlice, useDebugStateSlice } from "./useDebugSelectors";
import { useDebugger } from "./useDebugger";
import { useDebuggerProgress } from "./useDebuggerProgress";
import { useDebuggerSync } from "./useDebuggerSync";

/**
 * Level 3: 디버거 페이지에서 필요한 모든 상태와 액션을 Level 2 훅들을 조합하여 제공함
 */
export const useDebuggerHandler = () => {
  // Level 2: 상태 선택
  const state = useDebugStateSlice();
  const actions = useDebugActionSlice();

  // Level 2: 런타임 제어
  const manager = useDebugger();

  // Level 2: 부수 효과 및 파생 상태 (정렬된 추상화)
  useDebuggerSync();
  const progressWidth = useDebuggerProgress(state.code, state.currentLine);

  return {
    ...state,
    ...actions,
    ...manager,
    progressWidth,
  };
};
