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
  loading?: boolean;
}

export function CodeOutput({ value, tab, loading }: CodeOutputProps) {
  const wrapperStyle: CSSProperties = {
    padding: "18px",
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
  };

  if (loading) {
    return (
      <div style={wrapperStyle}>
        <span style={{ color: colors.text.placeholder, fontFamily: "var(--l-font-family)", fontSize: "14px" }}>
          Обрабатываем…
        </span>
      </div>
    );
  }

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

  return (
    <div style={wrapperStyle}>
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
  );
}
