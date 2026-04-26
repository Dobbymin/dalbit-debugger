export type RunMode = "idle" | "running" | "paused" | "finished" | "error";

export type RunType = "none" | "step" | "auto" | "full";

export type ScopeVariable = {
  name: string;
  value: string;
  type: string;
};

export type DebugState = {
  mode: RunMode;
  runType: RunType;
  currentLine: number | null;
  variables: ScopeVariable[];
  output: string[];
  error: string | null;
  speed: number;
};
