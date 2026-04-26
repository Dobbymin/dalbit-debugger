import { ICON_MOTION, PauseIcon, PlayIcon, SettingsIcon, SparkIcon, StopIcon } from "@/shared";

import { css } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";
import type { DebugStatus } from "../_stores";

type DebuggerControlsProps = {
  status: DebugStatus;
  autoRunSpeed: number;
  onAutoRunSpeedChange: (speed: number) => void;
  onStep: () => void;
  onRun: () => void;
  onRunFull: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
};

type Control = {
  label: string;
  active: boolean;
  Icon: typeof PlayIcon;
  onClick: () => void;
};

export function DebuggerControls({
  status,
  autoRunSpeed,
  onAutoRunSpeedChange,
  onStep,
  onRun,
  onRunFull,
  onPause,
  onResume,
  onStop,
}: DebuggerControlsProps) {
  const controls: Control[] = [
    {
      label: "단계 실행",
      active: status !== "running",
      Icon: PlayIcon,
      onClick: onStep,
    },
    {
      label: "자동 실행",
      active: status !== "running",
      Icon: SparkIcon,
      onClick: onRun,
    },
    {
      label: "전체 실행",
      active: status !== "running",
      Icon: SettingsIcon,
      onClick: onRunFull,
    },
    {
      label: "일시정지",
      active: status === "running",
      Icon: PauseIcon,
      onClick: onPause,
    },
    {
      label: "재개",
      active: status === "paused",
      Icon: PlayIcon,
      onClick: onResume,
    },
    {
      label: "정지",
      active: status !== "idle" && status !== "stopped",
      Icon: StopIcon,
      onClick: onStop,
    },
  ];

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "outlineVariant",
        paddingX: { base: "8px", md: "24px" },
        paddingY: "8px",
        gap: "6px",
        backgroundColor: "surfaceBright",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "6px",
        })}
      >
        {controls.map((control) => (
          <button
            key={control.label}
            type="button"
            disabled={!control.active}
            onClick={control.onClick}
            className={css({
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: control.active ? "primary" : "outlineVariant",
              borderRadius: "DEFAULT",
              height: "30px",
              paddingX: { base: "8px", md: "10px" },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              backgroundColor: "transparent",
              color: !control.active ? "outline" : control.label === "정지" ? "error" : "onSurface",
              fontFamily: "code",
              fontSize: "12px",
              whiteSpace: "nowrap",
              cursor: control.active ? "pointer" : "not-allowed",
              transition: ICON_MOTION.transition.interactive,
              _hover: control.active ? { backgroundColor: "surfaceContainerLow" } : {},
            })}
          >
            <control.Icon className={icon({ usage: "control" })} />
            <span className={css({ display: { base: "none", sm: "inline" } })}>{control.label}</span>
          </button>
        ))}
      </div>

      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        })}
      >
        <label
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            height: "30px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "outline",
            borderRadius: "DEFAULT",
            paddingX: "8px",
            color: "onSurface",
            fontFamily: "code",
            fontSize: "12px",
            flex: 1,
            minWidth: 0,
          })}
        >
          <span className={css({ whiteSpace: "nowrap" })}>실행 속도</span>
          <input
            value={autoRunSpeed}
            onChange={(event) => onAutoRunSpeedChange(Number(event.target.value))}
            type="range"
            min={1}
            max={10}
            style={{ flex: 1, minWidth: 0 }}
          />
        </label>

        <div
          className={css({
            fontFamily: "code",
            fontSize: "12px",
            color: "primary",
            fontWeight: 600,
            flexShrink: 0,
            whiteSpace: "nowrap",
          })}
        >
          상태: {status.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
