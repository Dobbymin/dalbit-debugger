import { useDebugStore } from "../_stores";

export const useDebugStateSlice = () => {
  const code = useDebugStore((state) => state.code);
  const currentLine = useDebugStore((state) => state.currentLine);
  const variables = useDebugStore((state) => state.variables);
  const output = useDebugStore((state) => state.output);
  const status = useDebugStore((state) => state.status);
  const error = useDebugStore((state) => state.error);
  const autoRunSpeed = useDebugStore((state) => state.autoRunSpeed);

  return { code, currentLine, variables, output, status, error, autoRunSpeed };
};

export const useDebugActionSlice = () => {
  const setCode = useDebugStore((state) => state.setCode);
  const setAutoRunSpeed = useDebugStore((state) => state.setAutoRunSpeed);
  const clearOutput = useDebugStore((state) => state.clearOutput);

  return { setCode, setAutoRunSpeed, clearOutput };
};

export const useDebugRuntimeStateSlice = () => {
  const code = useDebugStore((state) => state.code);
  const status = useDebugStore((state) => state.status);
  const autoRunSpeed = useDebugStore((state) => state.autoRunSpeed);

  return { code, status, autoRunSpeed };
};

export const useDebugRuntimeActionSlice = () => {
  const setStatus = useDebugStore((state) => state.setStatus);
  const setError = useDebugStore((state) => state.setError);
  const setCurrentLine = useDebugStore((state) => state.setCurrentLine);
  const setVariables = useDebugStore((state) => state.setVariables);
  const addOutput = useDebugStore((state) => state.addOutput);
  const clearOutput = useDebugStore((state) => state.clearOutput);
  const reset = useDebugStore((state) => state.reset);

  return { setStatus, setError, setCurrentLine, setVariables, addOutput, clearOutput, reset };
};
