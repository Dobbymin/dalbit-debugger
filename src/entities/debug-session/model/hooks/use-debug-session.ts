import { useCallback, useReducer, useRef } from "react";

import { Scope, ValueType, YaksokSession } from "@dalbit-yaksok/core";

import type { DebugState, RunType, ScopeVariable } from "../types";

type Action =
  | { type: "START"; runType: RunType }
  | { type: "RUNNING_CODE"; line: number; variables: ScopeVariable[] }
  | { type: "PAUSED" }
  | { type: "RESUMED" }
  | { type: "OUTPUT"; message: string }
  | { type: "FINISHED" }
  | { type: "ERROR"; error: string }
  | { type: "RESET" }
  | { type: "SET_SPEED"; speed: number };

const INITIAL_STATE: DebugState = {
  mode: "idle",
  runType: "none",
  currentLine: null,
  variables: [],
  output: [],
  error: null,
  speed: 300,
};

function reducer(state: DebugState, action: Action): DebugState {
  switch (action.type) {
    case "START":
      return { ...INITIAL_STATE, speed: state.speed, mode: "running", runType: action.runType };
    case "RUNNING_CODE":
      return { ...state, mode: "paused", currentLine: action.line, variables: action.variables };
    case "PAUSED":
      return { ...state, mode: "paused" };
    case "RESUMED":
      return { ...state, mode: "running" };
    case "OUTPUT":
      return { ...state, output: [...state.output, action.message] };
    case "FINISHED":
      return { ...state, mode: "finished" };
    case "ERROR":
      return { ...state, mode: "error", error: action.error };
    case "RESET":
      return { ...INITIAL_STATE, speed: state.speed };
    case "SET_SPEED":
      return { ...state, speed: action.speed };
    default:
      return state;
  }
}

function extractVariables(scope: Scope): ScopeVariable[] {
  const result: ScopeVariable[] = [];
  const seen = new Set<string>();
  let current: Scope | undefined = scope;

  while (current) {
    for (const [name, value] of Object.entries(current.variables as Record<string, ValueType>)) {
      if (!seen.has(name)) {
        seen.add(name);
        result.push({
          name,
          value: value.toPrint(),
          type: (value.constructor as typeof ValueType).friendlyName ?? "값",
        });
      }
    }
    current = current.parent;
  }

  return result;
}

export function useDebugSession() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const sessionRef = useRef<YaksokSession | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    sessionRef.current = null;
    dispatch({ type: "RESET" });
  }, []);

  const createSession = useCallback((runType: RunType) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const session = new YaksokSession({
      signal: controller.signal,
      stdout: (message) => dispatch({ type: "OUTPUT", message }),
      stdin: async () => "",
      stderr: (_msg, err) => dispatch({ type: "ERROR", error: err.message ?? String(err) }),
      flags: {},
      threadYieldInterval: 300,
      stepUnit: null,
      canRunNode: null,
      events: {
        runningCode: (start, _end, scope) => {
          dispatch({
            type: "RUNNING_CODE",
            line: start.line,
            variables: extractVariables(scope),
          });
        },
        pause: () => dispatch({ type: "PAUSED" }),
        resume: () => dispatch({ type: "RESUMED" }),
      },
    });

    session.stepByStep = runType === "step";
    sessionRef.current = session;

    return { session, controller };
  }, []);

  const startStep = useCallback(
    async (code: string) => {
      dispatch({ type: "START", runType: "step" });
      const { session } = createSession("step");
      session.addModule("main", code, {});

      try {
        await session.runModule("main");
        dispatch({ type: "FINISHED" });
      } catch {
        // aborted or handled via stderr
        dispatch({ type: "FINISHED" });
      }
    },
    [createSession],
  );

  const startAuto = useCallback(
    async (code: string, speed: number) => {
      dispatch({ type: "START", runType: "auto" });
      const { session } = createSession("auto");
      session.addModule("main", code, { executionDelay: speed });

      try {
        await session.runModule("main");
        dispatch({ type: "FINISHED" });
      } catch {
        dispatch({ type: "FINISHED" });
      }
    },
    [createSession],
  );

  const startFull = useCallback(
    async (code: string) => {
      dispatch({ type: "START", runType: "full" });
      const { session } = createSession("full");
      session.addModule("main", code, {});

      try {
        await session.runModule("main");
        dispatch({ type: "FINISHED" });
      } catch {
        dispatch({ type: "FINISHED" });
      }
    },
    [createSession],
  );

  const step = useCallback(async () => {
    const session = sessionRef.current;
    if (!session) return;
    dispatch({ type: "RESUMED" });
    await session.resume();
  }, []);

  const pause = useCallback(() => {
    sessionRef.current?.pause();
  }, []);

  const resume = useCallback(async () => {
    const session = sessionRef.current;
    if (!session) return;
    dispatch({ type: "RESUMED" });
    await session.resume();
  }, []);

  const setSpeed = useCallback((speed: number) => {
    dispatch({ type: "SET_SPEED", speed });
  }, []);

  return {
    state,
    startStep,
    startAuto,
    startFull,
    step,
    pause,
    resume,
    stop,
    setSpeed,
  };
}
