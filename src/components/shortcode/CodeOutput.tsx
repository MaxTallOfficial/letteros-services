"use client";

import { CSSProperties } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import { colors } from "@/tokens";
import type { TabId } from "./TabSwitcher";

interface CodeOutputProps {
  value: string;
  tab: TabId;
  onCopy?: () => void;
  copied?: boolean;
}

/**
 * Read-only блок с подсветкой синтаксиса для результата минификации.
 * Тот же визуальный стиль, что и CodeEditor (border #E1E1E1, radius 15px).
 */
export function CodeOutput({ value, tab, onCopy, copied }: CodeOutputProps) {
  const wrapperStyle: CSSProperties = {
    border: `1px solid ${colors.border.default}`,
    borderRadius: "15px",
    background: colors.bg.white,
    overflow: "auto",
    minHeight: "160px",
    maxHeight: "400px",
    padding: "18px",
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
  };

  if (!value) {
    return (
      <div style={wrapperStyle}>
        <span style={{ color: colors.text.placeholder, fontFamily: "var(--l-font-family)", fontSize: "14px" }}>
          Результат появится здесь
        </span>
      </div>
    );
  }

  const langKey = tab === "js" ? "javascript" : tab;
  const highlighted = Prism.highlight(value, Prism.languages[langKey === "html" ? "markup" : langKey], langKey);

  const outputWrapperStyle: CSSProperties = {
    ...wrapperStyle,
    paddingRight: onCopy ? "100px" : "18px",
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={outputWrapperStyle}>
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            fontFamily: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
      {onCopy && (
        <button
          onClick={onCopy}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            height: "32px",
            padding: "0 14px",
            borderRadius: "8px",
            border: "none",
            background: copied ? colors.surface.dark : "rgba(0,0,0,0.06)",
            color: copied ? colors.text.white : colors.text.main,
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s",
            fontFamily: "var(--l-font-family)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.background = colors.surface.dark;
              e.currentTarget.style.color = colors.text.white;
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.background = "rgba(0,0,0,0.06)";
              e.currentTarget.style.color = colors.text.main;
            }
          }}
        >
          {copied ? "Скопировано!" : "Копировать"}
        </button>
      )}
    </div>
  );
}
