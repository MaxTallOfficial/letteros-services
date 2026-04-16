"use client";

import { colors, radius } from "@/tokens";

interface Tab {
  id: string;
  label: string;
}

interface SectionTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export default function SectionTabs({ tabs, active, onChange }: SectionTabsProps) {
  return (
    <div
      role="tablist"
      style={{
        display: "inline-flex",
        backgroundColor: colors.bg.white,
        borderRadius: radius.periodToggle,
        border: `1px solid ${colors.border.default}`,
        padding: "4px",
        gap: "4px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            style={{
              height: "34px",
              padding: "0 22px",
              borderRadius: radius.periodButton,
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? colors.surface.activeBg : "transparent",
              color: colors.text.main,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
