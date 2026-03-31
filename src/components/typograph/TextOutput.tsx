"use client";

import { CSSProperties } from "react";
import { colors } from "@/tokens";

interface TextOutputProps {
  value: string;
  loading?: boolean;
}

export function TextOutput({ value, loading }: TextOutputProps) {
  const wrapperStyle: CSSProperties = {
    padding: "18px",
    fontFamily: "var(--l-font-family)",
    fontSize: "16px",
    lineHeight: "1.6",
    color: colors.text.main,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  if (loading) {
    return (
      <div style={wrapperStyle}>
        <span style={{ color: colors.text.placeholder }}>Обрабатываем…</span>
      </div>
    );
  }

  if (!value) {
    return (
      <div style={wrapperStyle}>
        <span style={{ color: colors.text.placeholder }}>Результат появится здесь</span>
      </div>
    );
  }

  return <div style={wrapperStyle}>{value}</div>;
}
