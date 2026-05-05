"use client";

import { useEffect, useRef, useState } from "react";
import { colors, breakpoints, radius, shadows } from "@/tokens";
import { CodeEditor, type MinifierLang } from "./CodeEditor";
import { CodeOutput } from "./CodeOutput";
import { CompressionStats, type Stats } from "./CompressionStats";

interface MinifierToolProps {
  language: MinifierLang;
}

const LABELS: Record<MinifierLang, { input: string; output: string }> = {
  html: { input: "Исходный HTML", output: "Сжатый HTML" },
  css: { input: "Исходный CSS", output: "Сжатый CSS" },
  js: { input: "Исходный JavaScript", output: "Сжатый JavaScript" },
};

async function minifyHtml(code: string): Promise<string> {
  const { minify } = await import("html-minifier-terser");
  return minify(code, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeOptionalTags: false,
    minifyCSS: true,
    minifyJS: true,
  });
}

async function minifyCss(code: string): Promise<string> {
  const csso: typeof import("csso") = await import("csso");
  return csso.minify(code).css;
}

async function minifyJs(code: string): Promise<string> {
  const { minify } = await import("terser");
  const result = await minify(code, { mangle: false });
  return result.code ?? "";
}

const minifiers: Record<MinifierLang, (code: string) => Promise<string>> = {
  html: minifyHtml,
  css: minifyCss,
  js: minifyJs,
};

export function MinifierTool({ language }: MinifierToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isPasteRef = useRef(false);
  const debounceRef = useRef<number | null>(null);

  const labels = LABELS[language];

  const runMinify = async (code: string) => {
    if (!code.trim()) {
      setOutput("");
      setStats(null);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const minified = await minifiers[language](code);
      const before = new TextEncoder().encode(code).length;
      const after = new TextEncoder().encode(minified).length;
      setOutput(minified);
      setStats({ before, after });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message.slice(0, 200));
      setOutput("");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }
    const delay = isPasteRef.current ? 0 : 500;
    isPasteRef.current = false;
    debounceRef.current = window.setTimeout(() => {
      runMinify(input);
    }, delay);
    return () => {
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, language]);

  const handlePaste = () => {
    isPasteRef.current = true;
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats(null);
    setError(null);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const cardStyle = {
    background: colors.bg.white,
    borderRadius: radius.card,
    boxShadow: shadows.cardSoft,
    padding: "32px 40px 40px",
  } as const;

  const fieldHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "14px",
    fontWeight: 600,
    color: colors.text.main,
  } as const;

  const fieldBoxStyle = {
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.blogCard,
    background: colors.bg.white,
    minHeight: "286px",
    maxHeight: "446px",
    overflow: "auto" as const,
    transition: "border-color 0.25s",
  };

  const actionBtn = (label: string, onClick: () => void, active = false) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: "28px",
        padding: "0 12px",
        borderRadius: "8px",
        border: "none",
        background: active ? colors.accent.blue : "transparent",
        color: active ? colors.text.white : colors.accent.blue,
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <style>{`
        .l-minifier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: ${breakpoints.mobile}) {
          .l-minifier-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={cardStyle}>
        {error && (
          <div
            style={{
              background: "#FFF3F3",
              color: "#B91C1C",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div className="l-minifier-grid">
          <div>
            <div style={fieldHeader}>
              <span>{labels.input}</span>
              {input && !loading && actionBtn("Очистить", handleClear)}
            </div>
            <div style={fieldBoxStyle}>
              <CodeEditor value={input} onChange={setInput} tab={language} onPaste={handlePaste} />
            </div>
          </div>
          <div>
            <div style={fieldHeader}>
              <span>{labels.output}</span>
              {output && actionBtn(copied ? "Скопировано" : "Копировать", handleCopy, copied)}
            </div>
            <div style={fieldBoxStyle}>
              <CodeOutput value={output} tab={language} loading={loading} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <CompressionStats stats={stats} />
        </div>
      </div>
    </>
  );
}
