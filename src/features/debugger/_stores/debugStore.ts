import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type DebugStatus = "idle" | "running" | "paused" | "finished" | "stopped" | "error";

export type VariableRow = {
  name: string;
  value: string;
  kind: string;
  tone: "primary" | "secondary";
};

export type LogEntry = {
  timestamp: string;
  message: string;
};

interface DebugState {
  code: string;
  currentLine: number | null;
  variables: VariableRow[];
  output: LogEntry[];
  status: DebugStatus;
  error: string | null;
  autoRunSpeed: number; // ms or 1-10 scale
}

interface DebugActions {
  setCode: (code: string) => void;
  setCurrentLine: (line: number | null) => void;
  setVariables: (variables: VariableRow[]) => void;
  addOutput: (message: string) => void;
  clearOutput: () => void;
  setStatus: (status: DebugStatus) => void;
  setError: (error: string | null) => void;
  setAutoRunSpeed: (speed: number) => void;
  reset: () => void;
}

const INITIAL_STATE: DebugState = {
  code: "",
  currentLine: null,
  variables: [],
  output: [],
  status: "idle",
  error: null,
  autoRunSpeed: 5,
};

export const useDebugStore = create<DebugState & DebugActions>()(
  immer(
    combine(INITIAL_STATE, (set) => ({
      setCode: (code) =>
        set((state) => {
          state.code = code;
        }),
      setCurrentLine: (line) =>
        set((state) => {
          state.currentLine = line;
        }),
      setVariables: (variables) =>
        set((state) => {
          state.variables = variables;
        }),
      addOutput: (message) =>
        set((state) => {
          state.output.push({
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            message,
          });
        }),
      clearOutput: () =>
        set((state) => {
          state.output = [];
        }),
      setStatus: (status) =>
        set((state) => {
          state.status = status;
        }),
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
      setAutoRunSpeed: (speed) =>
        set((state) => {
          state.autoRunSpeed = speed;
        }),
      reset: () =>
        set((state) => {
          state.currentLine = null;
          state.variables = [];
          state.error = null;
          state.status = "idle";
        }),
    })),
  ),
);
