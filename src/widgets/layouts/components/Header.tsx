import { Link } from "react-router-dom";

import {
  AccountCircleIcon,
  HelpCircleIcon,
  ICON_HOVER_TOKENS,
  ICON_MOTION,
  ROUTE_PATHS,
  SearchIcon,
  SettingsIcon,
} from "@/shared";

import { css, cx } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";

type ActiveTab = "Debugger" | "Library" | "Documentation";

const NAV_TABS: ActiveTab[] = ["Debugger", "Library", "Documentation"];

const ICON_ACTIONS = [
  { label: "설정", Icon: SettingsIcon },
  { label: "도움말", Icon: HelpCircleIcon },
  { label: "계정", Icon: AccountCircleIcon },
] as const;

type Props = {
  activeTab?: ActiveTab;
  sticky?: boolean;
  showSearch?: boolean;
};

export const Header = ({ activeTab = "Debugger", sticky = false, showSearch = false }: Props) => {
  const headerContent = (
    <>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: { base: "12px", md: "24px" },
          minWidth: 0,
        })}
      >
        <Link
          to={ROUTE_PATHS.MAIN}
          className={css({
            fontFamily: "headline",
            fontWeight: 800,
            fontSize: "18px",
            color: "primaryContainer",
            textDecoration: "none",
            whiteSpace: "nowrap",
          })}
        >
          Dalbit Debugger
        </Link>

        <nav
          className={css({
            display: { base: "none", md: "flex" },
            gap: "16px",
            alignItems: "center",
          })}
        >
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={css({
                border: "none",
                borderBottomWidth: tab === activeTab ? "2px" : "0",
                borderBottomStyle: "solid",
                borderBottomColor: "primaryContainer",
                backgroundColor: "transparent",
                color: tab === activeTab ? "primaryContainer" : "onSurfaceVariant",
                fontFamily: "code",
                fontSize: "12px",
                paddingBottom: "4px",
                cursor: "pointer",
                transition: "color 180ms ease",
                _hover: { color: "primaryContainer" },
              })}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: { base: "6px", md: "8px" },
        })}
      >
        {showSearch && (
          <div
            className={css({
              display: { base: "none", lg: "flex" },
              alignItems: "center",
              gap: "6px",
              height: "34px",
              width: "220px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "outlineVariant",
              borderRadius: "DEFAULT",
              paddingX: "10px",
              backgroundColor: "surfaceContainerLowest",
              color: "onSurfaceVariant",
              fontFamily: "code",
              fontSize: "12px",
            })}
          >
            <SearchIcon
              className={cx(
                icon({ usage: "nav" }),
                css({
                  w: "icon.lg",
                  h: "icon.lg",
                }),
              )}
            />
            <span>Search examples...</span>
          </div>
        )}

        <Link
          to={ROUTE_PATHS.DEBUGGER}
          className={css({
            display: { base: "none", sm: "inline-flex" },
            alignItems: "center",
            justifyContent: "center",
            height: "32px",
            paddingX: "10px",
            borderRadius: "DEFAULT",
            backgroundColor: "primaryContainer",
            color: "onPrimary",
            textDecoration: "none",
            fontFamily: "code",
            fontSize: "11px",
            whiteSpace: "nowrap",
            transition: "background-color 180ms ease",
            _hover: { backgroundColor: "primary" },
          })}
        >
          Start Debugging
        </Link>

        {ICON_ACTIONS.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            className={css({
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: { base: "32px", md: "34px" },
              height: { base: "32px", md: "34px" },
              padding: 0,
              border: "none",
              borderRadius: "full",
              backgroundColor: "transparent",
              color: "primary",
              lineHeight: 0,
              flexShrink: 0,
              cursor: "pointer",
              transition: ICON_MOTION.transition.interactive,
              _hover: ICON_HOVER_TOKENS.ghost,
            })}
          >
            <item.Icon
              className={cx(
                icon({ usage: "action" }),
                css({
                  w: "icon.lg",
                  h: "icon.lg",
                }),
              )}
            />
          </button>
        ))}
      </div>
    </>
  );

  if (sticky) {
    return (
      <header
        className={css({
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "outlineVariant",
        })}
      >
        <div
          className={css({
            maxWidth: "1200px",
            marginX: "auto",
            height: "64px",
            paddingX: "margin",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "gutter",
          })}
        >
          {headerContent}
        </div>
      </header>
    );
  }

  return (
    <header
      className={css({
        height: "64px",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "outlineVariant",
        backgroundColor: "surfaceContainerLowest",
        paddingX: { base: "10px", md: "24px" },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
      })}
    >
      {headerContent}
    </header>
  );
};
