"use client";

import { CSSProperties, useState } from "react";
import { colors, zIndex, shadows } from "@/tokens";
import { LogoMark, LogoWordmark } from "@/src/components/ui/icons";
import { MobileMenu } from "./MobileMenu";

const ArrowDown = () => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ marginLeft: "6px" }}>
    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.2" />
    <ellipse cx="10" cy="10" rx="4" ry="9" stroke="white" strokeWidth="1.2" />
    <line x1="1" y1="7" x2="19" y2="7" stroke="white" strokeWidth="1.2" />
    <line x1="1" y1="13" x2="19" y2="13" stroke="white" strokeWidth="1.2" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
    <rect width="20" height="2" rx="1" fill="white" />
    <rect y="6" width="20" height="2" rx="1" fill="white" />
    <rect y="12" width="20" height="2" rx="1" fill="white" />
  </svg>
);

const headerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "50px",
  zIndex: zIndex.header,
  fontFamily: "var(--l-font-family)",
};

const headerMainStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: "50px",
  padding: "0 24px",
  background: colors.surface.dark,
};

const logoStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: colors.text.white,
  gap: "6px",
  flexShrink: 0,
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  columnGap: "40px",
  marginLeft: "40px",
  flexGrow: 1,
};

const navLinkStyle: CSSProperties = {
  color: colors.text.white,
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "19.6px",
  textDecoration: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const dropdownToggleStyle: CSSProperties = {
  ...navLinkStyle,
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  padding: 0,
  fontFamily: "inherit",
};

const dropdownListStyle: CSSProperties = {
  position: "absolute",
  top: "calc(100% + 10px)",
  left: "-15px",
  background: colors.bg.alt,
  borderRadius: "15px",
  padding: "15px 22px 12px",
  boxShadow: shadows.cardSoft,
  zIndex: zIndex.dropdown,
  listStyle: "none",
  margin: 0,
  minWidth: "160px",
  transition: "opacity 0.2s, visibility 0.2s",
};

const rightGroupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  flexShrink: 0,
};

const ctaBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "34px",
  padding: "0 14px",
  borderRadius: "10px",
  background: colors.bg.white,
  color: colors.text.main,
  fontSize: "14px",
  fontWeight: 700,
  border: `1px solid ${colors.bg.white}`,
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "all 0.25s",
};

const loginToggleStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "34px",
  padding: "0 14px",
  borderRadius: "10px",
  background: "transparent",
  color: colors.text.white,
  fontSize: "14px",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  marginRight: "10px",
  position: "relative",
};

function Dropdown({ label, items }: { label: string; items: { text: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button style={dropdownToggleStyle}>
        {label}
        <ArrowDown />
      </button>
      <ul
        style={{
          ...dropdownListStyle,
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={{ padding: "4px 0" }}>
            <a
              href={item.href}
              style={{
                color: colors.text.main,
                fontSize: "14px",
                fontWeight: 400,
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header style={headerStyle}>
        <div style={headerMainStyle}>
          {/* Logo */}
          <a href="https://letteros.com/" style={logoStyle}>
            <LogoMark size={28} />
            <LogoWordmark />
          </a>

          {/* Desktop nav */}
          <nav style={{ ...navStyle, display: "flex" }} className="hidden-mobile">
            <a href="https://letteros.com/editor/" style={navLinkStyle}>Редактор</a>

            <Dropdown
              label="Сервисы"
              items={[
                { text: "Short URL", href: "/shorturl/" },
                { text: "Shortcode", href: "/shortcode/" },
                { text: "Typograph", href: "/typograph/" },
              ]}
            />

            <a href="https://letteros.com/templates/" style={navLinkStyle}>Шаблоны</a>
            <a href="https://letteros.com/migration/" style={navLinkStyle}>Миграция</a>
            <a href="https://letteros.com/pricing-new/" style={navLinkStyle}>Тарифы</a>

            <Dropdown
              label="Компания"
              items={[
                { text: "Кейсы", href: "https://letteros.com/projects/" },
                { text: "Блог", href: "https://letteros.com/blog/" },
                { text: "Вакансии", href: "https://letteros.com/vacancies/" },
                { text: "О\u00a0нас", href: "https://letteros.com/contacts/" },
              ]}
            />
          </nav>

          {/* Lang switcher — desktop */}
          <div
            style={{ position: "relative", marginLeft: "auto" }}
            className="hidden-mobile"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                color: colors.text.white,
                position: "relative",
              }}
            >
              <GlobeIcon />
            </button>
            <ul
              style={{
                ...dropdownListStyle,
                left: "auto",
                right: 0,
                padding: "15px 40px 12px 22px",
                opacity: langOpen ? 1 : 0,
                visibility: langOpen ? "visible" : "hidden",
              }}
            >
              <li style={{ padding: "4px 0" }}>
                <span style={{ color: colors.accent.blue, fontSize: "14px", fontWeight: 500 }}>Русский</span>
              </li>
              <li style={{ padding: "4px 0" }}>
                <a href="/en/" style={{ color: colors.text.main, fontSize: "14px", textDecoration: "none" }}>English</a>
              </li>
            </ul>
          </div>

          {/* Right buttons — desktop */}
          <div style={rightGroupStyle} className="hidden-mobile">
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setLoginOpen(true)}
              onMouseLeave={() => setLoginOpen(false)}
            >
              <button style={loginToggleStyle}>Войти</button>
              <ul
                style={{
                  ...dropdownListStyle,
                  left: "auto",
                  right: 0,
                  opacity: loginOpen ? 1 : 0,
                  visibility: loginOpen ? "visible" : "hidden",
                }}
              >
                <li style={{ padding: "4px 0" }}>
                  <a
                    href="https://app.letteros.com/"
                    style={{ color: colors.text.main, fontSize: "14px", textDecoration: "none", display: "block" }}
                    target="_blank"
                    rel="noopener"
                  >
                    Текущая версия
                  </a>
                </li>
                <li style={{ padding: "4px 0" }}>
                  <a
                    href="https://old.letteros.com"
                    style={{ color: colors.text.main, fontSize: "14px", textDecoration: "none", display: "block" }}
                    target="_blank"
                    rel="noopener"
                  >
                    Старая версия
                  </a>
                </li>
              </ul>
            </div>

            <a
              href="https://app.letteros.com/"
              style={ctaBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.surface.dark;
                e.currentTarget.style.color = colors.text.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.bg.white;
                e.currentTarget.style.color = colors.text.main;
              }}
            >
              Начать бесплатно
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="show-mobile"
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 4px",
              display: "none",
            }}
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть меню"
          >
            <HamburgerIcon />
          </button>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .hidden-mobile { display: none !important; }
            .show-mobile { display: flex !important; }
          }
        `}</style>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
