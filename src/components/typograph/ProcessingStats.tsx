"use client";

import { CSSProperties, useState } from "react";
import { colors } from "@/tokens";

interface Category {
  label: string;
  count: number;
}

interface ProcessingStatsProps {
  changes: number;
  categories?: Category[];
}

function countLabel(n: number): string {
  if (n === 0) return "Изменений нет";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n}\u00a0исправление`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n}\u00a0исправления`;
  return `${n}\u00a0исправлений`;
}

export function ProcessingStats({ changes, categories }: ProcessingStatsProps) {
  const [hovered, setHovered] = useState(false);

  const textStyle: CSSProperties = {
    fontSize: "13px",
    fontFamily: "var(--l-font-family)",
    fontWeight: 600,
    color: changes > 0 ? colors.green : colors.text.placeholder,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: `1px solid ${hovered ? colors.text.main : colors.text.placeholder}`,
    fontSize: "11px",
    fontWeight: 700,
    color: hovered ? colors.text.main : colors.text.placeholder,
    background: hovered ? "rgba(0,0,0,0.05)" : "transparent",
    cursor: "default",
    flexShrink: 0,
    position: "relative",
    fontStyle: "normal",
    transition: "all 0.15s",
  };

  const tooltipStyle: CSSProperties = {
    position: "absolute",
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    background: colors.surface.dark,
    color: colors.text.white,
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "13px",
    fontFamily: "var(--l-font-family)",
    fontWeight: 400,
    lineHeight: "1.6",
    whiteSpace: "nowrap",
    minWidth: "260px",
    zIndex: 100,
    pointerEvents: "none",
    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
  };

  const hasCategories = categories && categories.length > 0;

  return (
    <span style={textStyle}>
      {countLabel(changes)}
      {changes > 0 && hasCategories && (
        <span
          style={iconStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          i
          {hovered && (
            <span style={tooltipStyle}>
              {categories!.map((cat, i) => (
                <span key={i} style={{ display: "flex", justifyContent: "space-between", gap: "24px" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{cat.label}</span>
                  <span style={{ fontWeight: 600 }}>{cat.count}</span>
                </span>
              ))}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
