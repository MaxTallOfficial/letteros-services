"use client";

import React, { useState, useCallback, useRef, useEffect, CSSProperties } from "react";
import { colors, shadows } from "@/tokens";
import { TextInput } from "./TextInput";
import { TextOutput } from "./TextOutput";
import { ProcessingStats } from "./ProcessingStats";
import type Typograf from "typograf";

// Singleton instance, initialised lazily on first use
let tp: InstanceType<typeof Typograf> | null = null;

async function getTypograf(): Promise<InstanceType<typeof Typograf>> {
  if (!tp) {
    // CJS module: webpack wraps module.exports as default export
    const mod = await import("typograf");
    const TypografClass = (mod.default ?? mod) as typeof Typograf;
    tp = new TypografClass({ locale: ["ru", "en-US"] });
    tp.disableRule("ru/optalign/*");
  }
  return tp;
}

function countChanges(a: string, b: string): number {
  let count = 0;
  let inDiff = false;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const diff = a[i] !== b[i];
    if (diff && !inDiff) { count++; inDiff = true; }
    else if (!diff) { inDiff = false; }
  }
  return count;
}

function countChar(str: string, ch: string): number {
  return str.split(ch).length - 1;
}

function categorizeChanges(input: string, output: string): Array<{ label: string; count: number }> {
  const result: Array<{ label: string; count: number }> = [];

  const nbsp = countChar(output, "\u00a0") - countChar(input, "\u00a0");
  if (nbsp > 0) result.push({ label: "Неразрывные пробелы", count: nbsp });

  const dash =
    Math.max(0, countChar(output, "\u2014") - countChar(input, "\u2014")) +
    Math.max(0, countChar(output, "\u2013") - countChar(input, "\u2013"));
  if (dash > 0) result.push({ label: "Тире", count: dash });

  const quotes = ["\u00ab", "\u00bb", "\u201e", "\u201c"].reduce(
    (sum, q) => sum + Math.max(0, countChar(output, q) - countChar(input, q)), 0
  );
  if (quotes > 0) result.push({ label: "Кавычки", count: quotes });

  const symbols = ["\u00a9", "\u00ae", "\u2122", "\u2026"].reduce(
    (sum, s) => sum + Math.max(0, countChar(output, s) - countChar(input, s)), 0
  );
  if (symbols > 0) result.push({ label: "Спецсимволы", count: symbols });

  return result;
}

export function TypographTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [changes, setChanges] = useState<number | null>(null);
  const [categories, setCategories] = useState<Array<{ label: string; count: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPasteRef = useRef(false);

  const runTypograph = useCallback(async (text: string) => {
    if (!text.trim()) {
      setOutput("");
      setChanges(null);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const typograf = await getTypograf();
      const result = typograf.execute(text);
      setOutput(result);
      setChanges(countChanges(text, result));
      setCategories(categorizeChanges(text, result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Не удалось обработать текст.\n${msg.slice(0, 200)}`);
      setOutput("");
      setChanges(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback(
    (v: string) => {
      setInput(v);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const delay = isPasteRef.current ? 0 : 500;
      isPasteRef.current = false;
      debounceRef.current = setTimeout(() => runTypograph(v), delay);
    },
    [runTypograph]
  );

  const handlePaste = useCallback(() => {
    isPasteRef.current = true;
  }, []);

  const handleClear = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setInput("");
    setOutput("");
    setChanges(null);
    setCategories([]);
    setError(null);
    setCopied(false);
    setLoading(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = output;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const [inputFocused, setInputFocused] = useState(false);

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
        <div style={{ height: "28px", display: "flex", alignItems: "center", flexShrink: 0 }}>
          {action}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>{content}</div>
    </div>
  );

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
        .l-typograph-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 767px) {
          .l-typograph-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Error */}
      {error && (
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
          {error}
        </div>
      )}

      {/* Two-column grid */}
      <div className="l-typograph-grid">
        {/* Left: input */}
        <div>
          {fieldBox(
            <span style={{ fontSize: "13px", fontWeight: 600, color: colors.text.placeholder, fontFamily: "var(--l-font-family)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Исходный текст</span>,
            input && !loading ? actionBtn("Очистить", handleClear) : null,
            <TextInput
              value={input}
              onChange={handleInputChange}
              onPaste={handlePaste}
              disabled={loading}
            />,
            inputFocused,
            () => setInputFocused(true),
            () => setInputFocused(false),
          )}
        </div>

        {/* Right: output */}
        <div>
          {fieldBox(
            <>
              <span style={{ fontSize: "13px", fontWeight: 600, color: colors.text.placeholder, fontFamily: "var(--l-font-family)", letterSpacing: "0.5px", textTransform: "uppercase" }}>После типографа</span>
              {changes !== null && <ProcessingStats changes={changes} categories={categories} />}
            </>,
            output
              ? actionBtn(copied ? "Скопировано!" : "Копировать", handleCopy, copied)
              : null,
            <TextOutput value={output} loading={loading} />,
            false,
            () => {},
            () => {},
          )}
        </div>
      </div>
    </div>
  );
}
