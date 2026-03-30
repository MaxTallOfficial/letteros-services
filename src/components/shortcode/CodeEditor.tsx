"use client";

import { CSSProperties } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import { colors } from "@/tokens";
import type { TabId } from "./TabSwitcher";

const langMap: Record<TabId, Prism.Grammar> = {
  html: Prism.languages.markup,
  css: Prism.languages.css,
  js: Prism.languages.javascript,
};

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  tab: TabId;
  disabled?: boolean;
  onClear?: () => void;
}

/**
 * Редактируемое поле с подсветкой синтаксиса.
 * Использует react-simple-code-editor (прозрачная textarea поверх <pre>) + prismjs.
 * Визуально соответствует FormInput из UIKit (border #E1E1E1, radius 15px).
 */
export function CodeEditor({ value, onChange, tab, disabled = false, onClear }: CodeEditorProps) {
  const showClear = !!(value && onClear && !disabled);

  const wrapperStyle: CSSProperties = {
    border: `1px solid ${colors.border.default}`,
    borderRadius: "15px",
    background: colors.bg.white,
    overflow: "auto",
    transition: "border-color 0.25s",
    opacity: disabled ? 0.6 : 1,
    minHeight: "240px",
    maxHeight: "400px",
  };

  return (
    <>
      <style>{`
        .l-code-editor textarea { outline: none !important; }
        .l-code-editor textarea::placeholder { color: ${colors.text.placeholder}; }
        .token.tag, .token.doctype { color: #22863a; }
        .token.attr-name { color: #6f42c1; }
        .token.attr-value, .token.string { color: #032f62; }
        .token.comment, .token.prolog, .token.cdata { color: ${colors.text.placeholder}; font-style: italic; }
        .token.selector { color: #6f42c1; }
        .token.property { color: #005cc5; }
        .token.keyword { color: #d73a49; }
        .token.function { color: #6f42c1; }
        .token.number, .token.boolean { color: #005cc5; }
        .token.operator { color: #d73a49; }
        .token.punctuation { color: ${colors.text.main}; }
        .token.unit { color: #d73a49; }
        .token.atrule { color: #e36209; }
      `}</style>
      <div style={{ position: "relative" }}>
        <div
          style={wrapperStyle}
          onFocus={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = colors.text.main;
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = colors.border.default;
          }}
        >
          <Editor
            className="l-code-editor"
            value={value}
            onValueChange={disabled ? () => {} : onChange}
            highlight={(code) => Prism.highlight(code, langMap[tab], tab === "js" ? "javascript" : tab)}
            padding={showClear ? "18px 96px 18px 18px" : "18px"}
            placeholder="Вставьте ваш код здесь"
            style={{
              fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              fontSize: "14px",
              lineHeight: "1.6",
              minHeight: "240px",
              background: "transparent",
            }}
            disabled={disabled}
          />
        </div>
        {showClear && (
          <button
            onClick={onClear}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              height: "32px",
              padding: "0 14px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(0,0,0,0.06)",
              color: colors.text.main,
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s",
              fontFamily: "var(--l-font-family)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.surface.dark;
              e.currentTarget.style.color = colors.text.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.06)";
              e.currentTarget.style.color = colors.text.main;
            }}
          >
            Очистить
          </button>
        )}
      </div>
    </>
  );
}
