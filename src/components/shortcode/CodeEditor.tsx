"use client";

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
  onPaste?: () => void;
}

export function CodeEditor({ value, onChange, tab, disabled = false, onPaste }: CodeEditorProps) {
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
      <div onPaste={onPaste} style={{ opacity: disabled ? 0.6 : 1 }}>
        <Editor
          className="l-code-editor"
          value={value}
          onValueChange={disabled ? () => {} : onChange}
          highlight={(code) => Prism.highlight(code, langMap[tab], tab === "js" ? "javascript" : tab)}
          padding="18px"
          placeholder="Вставьте ваш код здесь"
          style={{
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            fontSize: "14px",
            lineHeight: "1.6",
            minHeight: "200px",
            background: "transparent",
          }}
          disabled={disabled}
        />
      </div>
    </>
  );
}
