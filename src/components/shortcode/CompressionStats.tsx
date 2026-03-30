"use client";

import { CSSProperties } from "react";
import { colors } from "@/tokens";

export interface Stats {
  before: number;
  after: number;
}

interface CompressionStatsProps {
  stats: Stats;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  return `${(bytes / 1024).toFixed(1)} КБ`;
}

export function CompressionStats({ stats }: CompressionStatsProps) {
  const ratio = stats.before > 0
    ? Math.round((1 - stats.after / stats.before) * 100)
    : 0;

  const wrapperStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
    padding: "14px 18px",
    background: colors.bg.alt,
    borderRadius: "12px",
    fontFamily: "var(--l-font-family)",
    fontSize: "14px",
  };

  const labelStyle: CSSProperties = {
    color: colors.text.placeholder,
    marginRight: "6px",
  };

  const valueStyle: CSSProperties = {
    color: colors.text.main,
    fontWeight: 600,
  };

  const ratioStyle: CSSProperties = {
    color: ratio > 0 ? "#2D8962" : colors.text.main,
    fontWeight: 700,
  };

  return (
    <div style={wrapperStyle}>
      <span>
        <span style={labelStyle}>До:</span>
        <span style={valueStyle}>
          {stats.before.toLocaleString("ru")} символов ({formatSize(stats.before)})
        </span>
      </span>
      <span>
        <span style={labelStyle}>После:</span>
        <span style={valueStyle}>
          {stats.after.toLocaleString("ru")} символов ({formatSize(stats.after)})
        </span>
      </span>
      <span>
        <span style={labelStyle}>Сжатие:</span>
        <span style={ratioStyle}>{ratio}%</span>
      </span>
    </div>
  );
}
