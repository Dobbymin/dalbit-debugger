import { useMemo } from "react";

/**
 * Level 2: 현재 코드와 실행 줄을 바탕으로 시각적 진척도(너비 %)를 계산하는 책임을 가짐
 */
export const useDebuggerProgress = (code: string, currentLine: number | null) => {
  const progressWidth = useMemo(() => {
    const codeLineCount = code ? code.split("\n").length : 0;
    if (codeLineCount === 0) return "0%";

    return `${((currentLine ?? 0) / codeLineCount) * 100}%`;
  }, [code, currentLine]);

  return progressWidth;
};
