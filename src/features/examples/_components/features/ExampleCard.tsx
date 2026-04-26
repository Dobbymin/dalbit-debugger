import { PlayIcon } from "@/shared";

import { css } from "../../../../../styled-system/css";
import { icon } from "../../../../../styled-system/recipes";

type Props = {
  title: string;
  description: string;
  code: readonly string[];
  badge?: string | null;
  onOpen: (code: string) => void;
};

export const ExampleCard = ({ title, description, code, badge, onOpen }: Props) => {
  return (
    <article
      className={css({
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#d5ddeb",
        borderRadius: "xl",
        backgroundColor: "#fff",
        padding: "12px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        transition: "border-color 160ms ease",
        _hover: {
          borderColor: "#1e4b91",
        },
      })}
    >
      <div>
        <div
          className={css({
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "8px",
          })}
        >
          <h3
            className={css({
              margin: 0,
              fontFamily: "headline",
              fontSize: "17px",
              lineHeight: "1.3",
              color: "#162a43",
            })}
          >
            {title}
          </h3>
          {badge ? (
            <span
              className={css({
                borderRadius: "DEFAULT",
                paddingX: "6px",
                paddingY: "2px",
                fontSize: "10px",
                fontFamily: "code",
                backgroundColor: "#ffdcd7",
                color: "#8e1610",
                whiteSpace: "nowrap",
              })}
            >
              {badge}
            </span>
          ) : null}
        </div>

        <p
          className={css({
            margin: 0,
            marginTop: "6px",
            fontSize: "13px",
            color: "#6b778d",
            lineHeight: "1.45",
          })}
        >
          {description}
        </p>
      </div>

      <div
        className={css({
          marginTop: "10px",
          backgroundColor: "#f6f9ff",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#dce5f5",
          borderRadius: "lg",
          padding: "10px",
          position: "relative",
          overflow: "hidden",
        })}
      >
        <div
          className={css({
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "#1e4b91",
          })}
        />
        <pre
          className={css({
            margin: 0,
            paddingLeft: "8px",
            fontFamily: "code",
            fontSize: "12px",
            color: "#334155",
            lineHeight: "1.4",
          })}
        >
          {code.join("\n")}
        </pre>
      </div>

      <div
        className={css({
          marginTop: "auto",
          paddingTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        <button
          type="button"
          onClick={() => onOpen(code.join("\n"))}
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            height: "30px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#1e4b91",
            borderRadius: "DEFAULT",
            paddingX: "10px",
            backgroundColor: "#fff",
            color: "#1e4b91",
            fontFamily: "code",
            fontSize: "11px",
            cursor: "pointer",
            _hover: {
              backgroundColor: "#eef4ff",
            },
          })}
        >
          <PlayIcon className={icon({ usage: "inline" })} />
          <span>디버거에서 열기</span>
        </button>
      </div>
    </article>
  );
};
