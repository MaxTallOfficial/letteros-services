"use client";

import React, { useState, useCallback, useRef, useEffect, CSSProperties } from "react";
import { colors, shadows } from "@/tokens";
import { TabSwitcher } from "./TabSwitcher";
import { CodeEditor } from "./CodeEditor";
import { CodeOutput } from "./CodeOutput";
import { CompressionStats } from "./CompressionStats";
import type { TabId } from "./TabSwitcher";
import type { Stats } from "./CompressionStats";

interface TabState {
  input: string;
  output: string;
  stats: Stats | null;
  error: string | null;
  loading: boolean;
}

const emptyTab = (): TabState => ({ input: "", output: "", stats: null, error: null, loading: false });

const initialTabs: Record<TabId, TabState> = {
  html: emptyTab(),
  css: emptyTab(),
  js: emptyTab(),
};

// Lazy-load minifiers to avoid SSR issues and reduce initial bundle
async function minifyHtml(code: string): Promise<string> {
  const { minify } = await import("html-minifier-terser");
  return minify(code, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
  });
}

async function minifyCss(code: string): Promise<string> {
  const csso = await import("csso");
  return csso.minify(code).css;
}

async function minifyJs(code: string): Promise<string> {
  const { minify } = await import("terser");
  const result = await minify(code, {
    mangle: false,
    compress: { defaults: true },
    format: { comments: false },
  });
  return result.code ?? code;
}

const minifiers: Record<TabId, (code: string) => Promise<string>> = {
  html: minifyHtml,
  css: minifyCss,
  js: minifyJs,
};

export function CompressorTool() {
  const [tabs, setTabs] = useState<Record<TabId, TabState>>(initialTabs);
  const [activeTab, setActiveTab] = useState<TabId>("html");
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPasteRef = useRef(false);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  // Clear pending debounce when switching tabs
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, [activeTab]);

  const current = tabs[activeTab];

  const runMinify = useCallback(async (input: string, tab: TabId) => {
    if (!input.trim()) {
      setTabs((prev) => ({
        ...prev,
        [tab]: { ...prev[tab], output: "", stats: null, error: null, loading: false },
      }));
      return;
    }
    setTabs((prev) => ({ ...prev, [tab]: { ...prev[tab], loading: true, error: null } }));
    try {
      const output = await minifiers[tab](input);
      const stats: Stats = {
        before: new TextEncoder().encode(input).length,
        after: new TextEncoder().encode(output).length,
      };
      setTabs((prev) => ({
        ...prev,
        [tab]: { ...prev[tab], output, stats, error: null, loading: false },
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setTabs((prev) => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          output: "",
          stats: null,
          error: `Не удалось сжать код. Проверьте синтаксис.\n${msg.slice(0, 200)}`,
          loading: false,
        },
      }));
    }
  }, []);

  const handleInputChange = useCallback(
    (v: string) => {
      const tab = activeTabRef.current;
      setTabs((prev) => ({ ...prev, [tab]: { ...prev[tab], input: v } }));
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const delay = isPasteRef.current ? 0 : 500;
      isPasteRef.current = false;
      debounceRef.current = setTimeout(() => runMinify(v, tab), delay);
    },
    [runMinify]
  );

  const handlePaste = useCallback(() => {
    isPasteRef.current = true;
  }, []);

  const handleClear = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setTabs((prev) => ({ ...prev, [activeTab]: emptyTab() }));
    setCopied(false);
  }, [activeTab]);

  const handleCopy = useCallback(async () => {
    if (!current.output) return;
    try {
      await navigator.clipboard.writeText(current.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = current.output;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [current.output]);

  const fieldBox = (
    labelContent: React.ReactNode,
    action: React.ReactNode | null,
    content: React.ReactNode,
    focused: boolean,
    onFocus: () => void,
    onBlur: () => void,
  ) => (
    <div
      style={{
        border: `1px solid ${focused ? colors.text.main : colors.border.default}`,
        borderRadius: "15px",
        background: colors.bg.white,
        display: "flex",
        flexDirection: "column",
        minHeight: "286px",
        maxHeight: "446px",
        transition: "border-color 0.25s",
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Inner header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: `1px solid ${colors.border.default}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
          {labelContent}
        </div>
        {/* Fixed-height slot so header never changes size */}
        <div style={{ height: "28px", display: "flex", alignItems: "center", flexShrink: 0 }}>
          {action}
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>{content}</div>
    </div>
  );

  const [inputFocused, setInputFocused] = useState(false);
  const [outputFocused, setOutputFocused] = useState(false);

  const actionBtn = (label: string, onClick: () => void, active = false) => (
    <button
      style={{
        height: "28px",
        padding: "0 12px",
        borderRadius: "8px",
        border: "none",
        background: active ? colors.surface.dark : "rgba(0,0,0,0.06)",
        color: active ? colors.text.white : colors.text.main,
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "var(--l-font-family)",
        whiteSpace: "nowrap" as const,
        transition: "all 0.25s",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = colors.surface.dark;
          e.currentTarget.style.color = colors.text.white;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(0,0,0,0.06)";
          e.currentTarget.style.color = colors.text.main;
        }
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        background: colors.bg.white,
        borderRadius: "20px",
        boxShadow: shadows.cardSoft,
        padding: "32px 40px 40px",
      }}
    >
      <style>{`
        .l-compressor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 767px) {
          .l-compressor-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Tabs + stats */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <TabSwitcher active={activeTab} onChange={setActiveTab} />
        <CompressionStats stats={current.stats} />
      </div>

      {/* Error */}
      {current.error && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#FFF3F3",
            border: "1px solid #FFD0D0",
            color: "#CC0000",
            fontSize: "14px",
            lineHeight: "1.5",
            fontFamily: "var(--l-font-family)",
            whiteSpace: "pre-wrap",
          }}
        >
          {current.error}
        </div>
      )}

      {/* Two-column grid */}
      <div className="l-compressor-grid">
        {/* Left: input */}
        <div>
          {fieldBox(
            <span style={{ fontSize: "13px", fontWeight: 600, color: colors.text.placeholder, fontFamily: "var(--l-font-family)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Исходный код</span>,
            current.input && !current.loading
              ? actionBtn("Очистить", handleClear)
              : null,
            <CodeEditor
              value={current.input}
              onChange={handleInputChange}
              onPaste={handlePaste}
              tab={activeTab}
              disabled={current.loading}
            />,
            inputFocused,
            () => setInputFocused(true),
            () => setInputFocused(false),
          )}
        </div>

        {/* Right: output */}
        <div>
          {fieldBox(
            <span style={{ fontSize: "13px", fontWeight: 600, color: colors.text.placeholder, fontFamily: "var(--l-font-family)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Результат</span>,
            current.output
              ? actionBtn(
                  copied ? "Скопировано!" : "Копировать",
                  handleCopy,
                  copied,
                )
              : null,
            <CodeOutput
              value={current.output}
              tab={activeTab}
              loading={current.loading}
            />,
            outputFocused,
            () => setOutputFocused(true),
            () => setOutputFocused(false),
          )}
        </div>
      </div>
    </div>
  );
}
