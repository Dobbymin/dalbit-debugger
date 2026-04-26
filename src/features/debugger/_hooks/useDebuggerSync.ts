import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FALLBACK_EXAMPLE_CODE } from "../_constants";

/**
 * Level 2: URL location 또는 기본 예제 코드로 에디터 코드를 초기화하는 책임을 가짐
 */
export const useDebuggerSync = (code: string, setCode: (code: string) => void) => {
  const location = useLocation();
  const initialCodeFromLocation = (location.state as { code?: string })?.code;

  useEffect(() => {
    if (initialCodeFromLocation) {
      setCode(initialCodeFromLocation);
      return;
    }

    if (!code) {
      setCode(FALLBACK_EXAMPLE_CODE);
    }
  }, [code, initialCodeFromLocation, setCode]);
};
