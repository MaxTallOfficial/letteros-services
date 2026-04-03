"use client";

import { CSSProperties } from "react";
import { colors, zIndex } from "@/tokens";
import { LogoMark, LogoWordmark, TelegramIcon, VkIcon } from "@/src/components/ui/icons";

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: colors.bg.white,
  zIndex: zIndex.mobileMenu,
  overflowY: "auto",
  fontFamily: "var(--l-font-family)",
};

const topBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "50px",
  padding: "0 20px",
  borderBottom: `1px solid ${colors.border.default}`,
};

const linkStyle: CSSProperties = {
  display: "block",
  padding: "12px 20px",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "22.4px",
  color: colors.text.main,
  textDecoration: "none",
  borderBottom: `1px solid ${colors.border.default}`,
  transition: "color 0.2s",
  cursor: "pointer",
};

const navItems = [
  { label: "Редактор", href: "https://letteros.com/editor/" },
  { label: "Short URL", href: "/shorturl/" },
  { label: "Shortcode", href: "/shortcode/" },
  { label: "Typograph", href: "/typograph/" },
  { label: "Шаблоны", href: "https://letteros.com/templates/" },
  { label: "Миграция", href: "https://letteros.com/migration/" },
  { label: "Тарифы", href: "https://letteros.com/pricing-new/" },
  { label: "Кейсы", href: "https://letteros.com/projects/" },
  { label: "Блог", href: "https://letteros.com/blog/" },
  { label: "О\u00a0нас", href: "https://letteros.com/contacts/" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={topBarStyle}>
        <a
          href="https://letteros.com/"
          style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}
        >
          <LogoMark size={28} color="#151515" />
          <LogoWordmark color="#151515" />
        </a>
        <button
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: colors.text.main,
          }}
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {navItems.map((item, i) => (
        <a
          key={i}
          href={item.href}
          style={linkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent.blue; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.text.main; }}
        >
          {item.label}
        </a>
      ))}

      <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
        <a
          href="https://t.me/letteros"
          target="_blank"
          rel="noopener"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: colors.surface.dark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
          title="Telegram"
        >
          <TelegramIcon size={18} />
        </a>
        <a
          href="https://vk.com/letteroscom"
          target="_blank"
          rel="noopener"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: colors.surface.dark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
          title="VK"
        >
          <VkIcon size={18} />
        </a>
      </div>
    </div>
  );
}
