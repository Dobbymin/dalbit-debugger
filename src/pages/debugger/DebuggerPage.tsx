import {
  DebuggerControls,
  DebuggerEditorPane,
  DebuggerFooter,
  DebuggerOutputPanel,
  DebuggerVariablesPanel,
  useDebuggerHandler,
} from "@/features";

import { css } from "../../../styled-system/css";

export default function DebuggerPage() {
  const {
    code,
    currentLine,
    variables,
    output,
    status,
    error,
    autoRunSpeed,
    progressWidth,
    setCode,
    setAutoRunSpeed,
    clearOutput,
    step,
    run,
    runFull,
    pause,
    resume,
    stop,
  } = useDebuggerHandler();

  return (
    <div
      className={css({
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        backgroundColor: "background",
        color: "onBackground",
        display: "flex",
        flexDirection: "column",
        fontFamily: "body",
      })}
    >
      <main
        className={css({
          flex: 1,
          minWidth: "0",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "surfaceContainerLowest",
        })}
      >
        <DebuggerControls
          status={status}
          autoRunSpeed={autoRunSpeed}
          onAutoRunSpeedChange={setAutoRunSpeed}
          onStep={step}
          onRun={run}
          onRunFull={runFull}
          onPause={pause}
          onResume={resume}
          onStop={stop}
        />

        {error ? (
          <div
            className={css({
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "error",
              backgroundColor: "color-mix(in srgb, token(colors.error) 14%, transparent)",
              color: "error",
              fontFamily: "code",
              fontSize: "12px",
              paddingX: { base: "8px", md: "24px" },
              paddingY: "8px",
            })}
          >
            실행 오류: {error}
          </div>
        ) : null}

        <div
          className={css({
            display: "flex",
            flex: 1,
            minHeight: "0",
            flexDirection: { base: "column", lg: "row" },
            overflowY: { base: "auto", lg: "visible" },
          })}
        >
          <DebuggerEditorPane
            code={code}
            currentLine={currentLine}
            progressWidth={progressWidth}
            onCodeChange={setCode}
          />
          <DebuggerVariablesPanel variables={variables} />
        </div>

        <DebuggerOutputPanel output={output} onClearOutput={clearOutput} />
      </main>

      <DebuggerFooter />
    </div>
  );
}
