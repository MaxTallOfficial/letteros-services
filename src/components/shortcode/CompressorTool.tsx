"use client";

import { useState, useCallback, CSSProperties } from "react";
import { colors, shadows } from "@/tokens";
import { Button } from "@/src/components/ui/Button";
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
}

const emptyTab = (): TabState => ({ input: "", output: "", stats: null, error: null });

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
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const current = tabs[activeTab];

  const updateTab = useCallback(
    (patch: Partial<TabState>) => {
      setTabs((prev) => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], ...patch },
      }));
    },
    [activeTab]
  );

  const handleCompress = useCallback(async () => {
    if (!current.input.trim()) {
      updateTab({ error: "Введите код для сжатия" });
      return;
    }
    setLoading(true);
    updateTab({ error: null });
    try {
      const output = await minifiers[activeTab](current.input);
      const stats: Stats = {
        before: new TextEncoder().encode(current.input).length,
        after: new TextEncoder().encode(output).length,
      };
      updateTab({ output, stats, error: null });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      updateTab({
        output: "",
        stats: null,
        error: `Не удалось сжать код. Проверьте синтаксис.\n${msg.slice(0, 200)}`,
      });
    } finally {
      setLoading(false);
    }
  }, [activeTab, current.input, updateTab]);

  const handleClear = useCallback(() => {
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

  const cardStyle: CSSProperties = {
    background: colors.bg.white,
    borderRadius: "20px",
    boxShadow: shadows.cardSoft,
    padding: "32px 40px 40px",
  };

  const labelStyle: CSSProperties = {
    fontSize: "13px",
    fontWeight: 600,
    color: colors.text.placeholder,
    fontFamily: "var(--l-font-family)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "10px",
  };

  return (
    <div style={cardStyle}>
      {/* Tabs */}
      <div style={{ marginBottom: "24px" }}>
        <TabSwitcher active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Input field with inline clear button */}
      <div style={{ marginBottom: "20px" }}>
        <div style={labelStyle}>Исходный код</div>
        <CodeEditor
          value={current.input}
          onChange={(v) => updateTab({ input: v })}
          tab={activeTab}
          disabled={loading}
          onClear={handleClear}
        />
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

      {/* Compress button — left-aligned */}
      <div style={{ marginBottom: "20px" }}>
        <Button variant="blue" size="m" onClick={handleCompress} disabled={loading}>
          {loading ? "Сжимаем..." : "Сжать"}
        </Button>
      </div>

      {/* Stats */}
      {current.stats && (
        <div style={{ marginBottom: "16px" }}>
          <CompressionStats stats={current.stats} />
        </div>
      )}

      {/* Output field with inline copy button */}
      <div>
        <div style={labelStyle}>Результат</div>
        <CodeOutput
          value={current.output}
          tab={activeTab}
          onCopy={handleCopy}
          copied={copied}
        />
      </div>
    </div>
  );
}
