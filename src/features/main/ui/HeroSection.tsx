import { Link } from "react-router-dom";

import { PlayIcon } from "@/shared";

import { css } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";

export const HeroSection = () => {
  return (
    <section
      className={css({
        textAlign: "center",
        maxWidth: "900px",
        marginX: "auto",
      })}
    >
      <p
        className={css({
          display: "inline-flex",
          marginBottom: "16px",
          paddingX: "10px",
          paddingY: "4px",
          borderRadius: "full",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "outlineVariant",
          backgroundColor: "rgba(216, 234, 255, 0.6)",
          color: "onPrimaryFixedVariant",
          fontFamily: "code",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        })}
      >
        Logic &amp; Lumen
      </p>

      <h1
        className={css({
          margin: 0,
          marginBottom: "14px",
          textStyle: "headlineLg",
          fontSize: { base: "40px", md: "56px" },
          lineHeight: 1.12,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "primary",
        })}
      >
        달빛약속 스텝 디버거
      </h1>

      <p
        className={css({
          margin: 0,
          marginX: "auto",
          marginBottom: "30px",
          maxWidth: "720px",
          fontSize: { base: "18px", md: "24px" },
          lineHeight: 1.5,
          color: "onSurfaceVariant",
        })}
      >
        코드의 실행 흐름을 단계별로 시각화해 복잡한 로직을 차분하게 이해하세요. 코드 라인, 변수 상태, 출력 로그를 한
        화면에서 이어서 읽을 수 있습니다.
      </p>

      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        })}
      >
        <Link
          to="/debugger"
          className={css({
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            minWidth: "200px",
            paddingX: "18px",
            paddingY: "14px",
            borderRadius: "lg",
            backgroundColor: "primaryContainer",
            color: "onPrimary",
            textDecoration: "none",
            fontFamily: "headline",
            fontSize: "18px",
            fontWeight: 600,
            transition: "all 180ms ease",
            _hover: {
              backgroundColor: "primary",
              transform: "translateY(-1px)",
            },
          })}
        >
          <PlayIcon className={icon({ usage: "cta" })} />
          <span>디버깅 시작하기</span>
        </Link>

        <Link
          to="/examples"
          className={css({
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "190px",
            paddingX: "18px",
            paddingY: "14px",
            borderRadius: "lg",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "primaryContainer",
            backgroundColor: "transparent",
            color: "primaryContainer",
            textDecoration: "none",
            fontFamily: "headline",
            fontSize: "18px",
            fontWeight: 600,
            transition: "all 180ms ease",
            _hover: { backgroundColor: "surfaceContainerLow" },
          })}
        >
          예제 보기
        </Link>
      </div>
    </section>
  );
};
