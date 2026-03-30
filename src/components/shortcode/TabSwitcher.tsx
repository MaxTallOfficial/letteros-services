"use client";

import { CSSProperties } from "react";
import { colors } from "@/tokens";

export type TabId = "html" | "css" | "js";

const TABS: { id: TabId; label: string }[] = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "JS" },
];

interface TabSwitcherProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

/**
 * TabSwitcher — адаптация паттерна Toggle из UIKit для 3 вкладок.
 * Использует те же токены: radius.periodToggle (32px), surface.activeBg (#F1F1F1).
 * Новых токенов не вводится.
 */
export function TabSwitcher({ active, onChange }: TabSwitcherProps) {
  const containerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    background: colors.bg.white,
    border: `1px solid ${colors.border.default}`,
    borderRadius: "32px",
    padding: "4px",
    gap: "2px",
    fontFamily: "var(--l-font-family)",
  };

  return (
    <div style={containerStyle} role="tablist" aria-label="Тип кода">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const btnStyle: CSSProperties = {
          height: "34px",
          padding: "0 22px",
          borderRadius: "28px",
          border: "none",
          background: isActive ? colors.surface.activeBg : "transparent",
          color: colors.text.main,
          fontSize: "14px",
          fontWeight: isActive ? 600 : 400,
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "inherit",
          letterSpacing: "0.2px",
        };
        return (
          <button
            key={tab.id}
            style={btnStyle}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
