import { useCallback, useEffect, useRef } from "react";

import { Scope, ValueType, YaksokSession } from "@dalbit-yaksok/core";

import type { VariableRow } from "../_stores";

import { useDebugRuntimeActionSlice, useDebugRuntimeStateSlice } from "./useDebugSelectors";

type DebugMode = "step" | "auto" | "full";

const speedToDelay = (speed: number) => (11 - speed) * 200;

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const extractVariables = (scope: Scope): VariableRow[] => {
  const result: VariableRow[] = [];
  const seen = new Set<string>();
  let current: Scope | undefined = scope;

  while (current) {
    const vars = current.variables;
    if (vars) {
      // 달빛약속 런타임 버전에 따라 Map일 수도 있고 일반 객체일 수도 있음
      const entries = vars instanceof Map ? Array.from(vars.entries()) : Object.entries(vars);

      for (const [name, value] of entries) {
        if (seen.has(name) || name === "부모" || name === "나") {
          continue;
        }

        seen.add(name);

        try {
          // value가 ValueType 인스턴스인지 확인
          if (value && typeof value === "object") {
            const val = value as ValueType;
            const printedValue = typeof val.toPrint === "function" ? val.toPrint() : String(val);
            const kind = (val.constructor as typeof ValueType).friendlyName || typeof val;

            result.push({
              name,
              value: printedValue,
              kind: kind,
              tone: name.startsWith("_") ? "secondary" : "primary",
            });
          }
        } catch {
          // 변수 추출 실패 시 무시하고 continue
        }
      }
    }

    current = current.parent;
  }

  return result;
};

export const useDebugger = () => {
  const { code, status, autoRunSpeed } = useDebugRuntimeStateSlice();
  const { setStatus, setError, setCurrentLine, setVariables, addOutput, clearOutput, reset } =
    useDebugRuntimeActionSlice();

  const sessionRef = useRef<YaksokSession | null>(null);
  const autoRunTimerRef = useRef<number | null>(null);
  const sessionIdRef = useRef(0);
  const currentModeRef = useRef<DebugMode | null>(null);
  const hadStderrErrorRef = useRef(false);

  const stopAutoRun = useCallback(() => {
    if (autoRunTimerRef.current != null) {
      clearInterval(autoRunTimerRef.current);
      autoRunTimerRef.current = null;
    }
  }, []);

  const runCurrentSession = useCallback(
    (session: YaksokSession, sessionId: number) => {
      void session
        .runModule("main")
        .then(() => {
          if (sessionId !== sessionIdRef.current) {
            return;
          }

          stopAutoRun();

          if (hadStderrErrorRef.current) {
            addOutput("오류가 발생하여 실행이 중단되었습니다.");
          } else {
            setStatus("finished");
            addOutput("실행이 완료되었습니다.");
          }
        })
        .catch((error: unknown) => {
          if (sessionId !== sessionIdRef.current) {
            return;
          }

          stopAutoRun();
          const message = toErrorMessage(error);
          setError(message);
          setStatus("error");
          addOutput(`실행 중 에러가 발생했습니다: ${message}`);
        });
    },
    [addOutput, setError, setStatus, stopAutoRun],
  );

  const startAutoLoop = useCallback(() => {
    stopAutoRun();

    autoRunTimerRef.current = window.setInterval(() => {
      const session = sessionRef.current;

      if (!session) {
        stopAutoRun();
        return;
      }

      void session.resume().catch((error: unknown) => {
        stopAutoRun();
        const message = toErrorMessage(error);
        setError(message);
        setStatus("error");
        addOutput(`자동 실행 중 에러가 발생했습니다: ${message}`);
      });
    }, speedToDelay(autoRunSpeed));
  }, [addOutput, autoRunSpeed, setError, setStatus, stopAutoRun]);

  const prepareNewRun = useCallback(() => {
    stopAutoRun();
    clearOutput();
    setCurrentLine(null);
    setVariables([]);
    setError(null);
    sessionIdRef.current += 1;
    sessionRef.current = null;
    hadStderrErrorRef.current = false;
  }, [clearOutput, setCurrentLine, setError, setVariables, stopAutoRun]);

  const createSession = useCallback(
    (mode: DebugMode) => {
      const sessionId = sessionIdRef.current;

      const session = new YaksokSession({
        stdout: (message) => {
          if (sessionId !== sessionIdRef.current) {
            return;
          }

          addOutput(`[출력] ${message}`);
        },
        stderr: (_message, error) => {
          if (sessionId !== sessionIdRef.current) {
            return;
          }

          hadStderrErrorRef.current = true;
          const message = error?.message ?? "알 수 없는 런타임 에러가 발생했습니다.";
          setError(message);
          setStatus("error");
          addOutput(`[에러] ${message}`);
          stopAutoRun();
        },
        stdin: async () => "",
        events: {
          runningCode: (start, _end, scope) => {
            if (sessionId !== sessionIdRef.current) {
              return;
            }

            setCurrentLine(start.line);
            const vars = extractVariables(scope);
            setVariables(vars);

            if (mode === "step") {
              addOutput(`${start.line}번 줄 실행 중...`);
            }
          },
          pause: () => {
            if (sessionId !== sessionIdRef.current) {
              return;
            }

            setStatus("paused");
          },
          resume: () => {
            if (sessionId !== sessionIdRef.current) {
              return;
            }

            setStatus("running");
          },
        },
      });

      session.stepByStep = mode !== "full";
      session.addModule("main", code, {
        executionDelay: mode === "auto" ? speedToDelay(autoRunSpeed) : 0,
      });

      sessionRef.current = session;
      currentModeRef.current = mode;

      return { session, sessionId };
    },
    [addOutput, autoRunSpeed, code, setCurrentLine, setError, setStatus, setVariables, stopAutoRun],
  );

  const stop = useCallback(() => {
    stopAutoRun();

    sessionIdRef.current += 1;
    sessionRef.current = null;
    currentModeRef.current = null;

    reset();
    setStatus("stopped");
    setError(null);
    addOutput("실행이 정지되었습니다.");
  }, [addOutput, reset, setError, setStatus, stopAutoRun]);

  const step = useCallback(async () => {
    if (status === "running") {
      return;
    }

    const isNewSession =
      !sessionRef.current || status === "idle" || status === "stopped" || status === "finished" || status === "error";

    if (isNewSession) {
      prepareNewRun();
      addOutput("단계 실행을 시작합니다.");

      const { session, sessionId } = createSession("step");
      setStatus("running");
      runCurrentSession(session, sessionId);
      return;
    }

    const session = sessionRef.current;

    if (!session) {
      return;
    }

    try {
      setStatus("running");
      await session.resume();
    } catch (error: unknown) {
      const message = toErrorMessage(error);
      setError(message);
      setStatus("error");
      addOutput(`단계 실행 중 에러가 발생했습니다: ${message}`);
    }
  }, [addOutput, createSession, prepareNewRun, runCurrentSession, setError, setStatus, status]);

  const run = useCallback(() => {
    if (status === "running") {
      return;
    }

    const isNewSession =
      !sessionRef.current || status === "idle" || status === "stopped" || status === "finished" || status === "error";

    if (isNewSession) {
      prepareNewRun();
      addOutput("자동 실행을 시작합니다.");

      const { session, sessionId } = createSession("auto");
      setStatus("running");
      runCurrentSession(session, sessionId);
      startAutoLoop();
      return;
    }

    currentModeRef.current = "auto";
    setStatus("running");
    startAutoLoop();
  }, [addOutput, createSession, prepareNewRun, runCurrentSession, setStatus, startAutoLoop, status]);

  const runFull = useCallback(() => {
    if (status === "running") {
      return;
    }

    prepareNewRun();
    addOutput("전체 실행을 시작합니다.");

    const { session, sessionId } = createSession("full");
    setStatus("running");
    runCurrentSession(session, sessionId);
  }, [addOutput, createSession, prepareNewRun, runCurrentSession, setStatus, status]);

  const pause = useCallback(() => {
    stopAutoRun();
    sessionRef.current?.pause();
    setStatus("paused");
    addOutput("일시정지되었습니다.");
  }, [addOutput, setStatus, stopAutoRun]);

  const resume = useCallback(async () => {
    const session = sessionRef.current;

    if (!session) {
      return;
    }

    setStatus("running");

    if (currentModeRef.current === "auto") {
      startAutoLoop();
      return;
    }

    try {
      await session.resume();
    } catch (error: unknown) {
      const message = toErrorMessage(error);
      setError(message);
      setStatus("error");
      addOutput(`재개 중 에러가 발생했습니다: ${message}`);
    }
  }, [addOutput, setError, setStatus, startAutoLoop]);

  useEffect(() => {
    return () => {
      stopAutoRun();
    };
  }, [stopAutoRun]);

  return {
    step,
    run,
    runFull,
    pause,
    resume,
    stop,
  };
};
