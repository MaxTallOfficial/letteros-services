"use client";

import { useState, useRef, useCallback } from "react";
import { colors, shadows } from "@/tokens";
import { FormInput } from "@/src/components/ui/FormInput";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Button } from "@/src/components/ui/Button";
import dynamic from "next/dynamic";

const QRCodeCanvas = dynamic(
  () => import("qrcode.react").then((m) => m.QRCodeCanvas),
  { ssr: false }
);

interface ShortenResult {
  shortUrl: string;
  code: string;
  expiresAt: string;
}

function TooltipIcon({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: "6px", verticalAlign: "middle", cursor: "help" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onTouchStart={() => setVisible((v) => !v)}
    >
      <span
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          border: `1px solid ${colors.text.placeholder}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 600,
          color: colors.text.placeholder,
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        ?
      </span>
      {visible && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: colors.surface.dark,
            color: colors.text.white,
            fontSize: "13px",
            lineHeight: "1.5",
            padding: "10px 14px",
            borderRadius: "10px",
            width: "280px",
            zIndex: 100,
            boxShadow: shadows.cardSoft,
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

export function ShortenForm() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [useCustomSlug, setUseCustomSlug] = useState(false);
  const [skipCheck, setSkipCheck] = useState(false);
  const [generateQr, setGenerateQr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShortenResult | null>(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!url.trim()) {
        setError("Введите ссылку");
        return;
      }

      // Client-side URL validation
      try {
        const parsed = new URL(url.trim());
        if (!["http:", "https:"].includes(parsed.protocol)) {
          setError("Допустимы только http и https ссылки");
          return;
        }
      } catch {
        setError("Неверный формат URL. Пример: https://example.com/page");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: url.trim(),
            skipCheck,
            customSlug: useCustomSlug ? customSlug.trim() || undefined : undefined,
            generateQr,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Произошла ошибка. Попробуйте ещё раз.");
        } else {
          setResult(data);
        }
      } catch {
        setError("Ошибка сети. Проверьте подключение и попробуйте ещё раз.");
      } finally {
        setLoading(false);
      }
    },
    [url, customSlug, useCustomSlug, skipCheck, generateQr]
  );

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = result.shortUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  const handleDownloadQr = useCallback(() => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `qr-${result?.code ?? "link"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [result]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    setUrl("");
    setCustomSlug("");
    setUseCustomSlug(false);
    setSkipCheck(false);
    setGenerateQr(false);
    setCopied(false);
  }, []);

  const formCardStyle = {
    background: colors.bg.white,
    borderRadius: "20px",
    boxShadow: shadows.cardSoft,
    padding: "40px",
    maxWidth: "640px",
    margin: "0 auto",
  };

  // Result state
  if (result) {
    const expiryDate = new Date(result.expiresAt).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div style={formCardStyle}>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, marginTop: 0, marginBottom: "16px" }}>
          Ссылка сокращена
        </p>

        {/* Short URL display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 18px",
            border: `1px solid ${colors.border.default}`,
            borderRadius: "15px",
            marginBottom: "12px",
          }}
        >
          <a
            href={result.shortUrl}
            target="_blank"
            rel="noopener"
            style={{
              color: colors.accent.blue,
              fontWeight: 600,
              fontSize: "16px",
              textDecoration: "none",
              flexGrow: 1,
              wordBreak: "break-all",
            }}
          >
            {result.shortUrl}
          </a>
          <button
            onClick={handleCopy}
            style={{
              flexShrink: 0,
              height: "36px",
              padding: "0 16px",
              borderRadius: "10px",
              border: "none",
              background: copied ? colors.surface.dark : "rgba(0,0,0,0.06)",
              color: copied ? colors.text.white : colors.text.main,
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s",
              fontFamily: "var(--l-font-family)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.background = colors.surface.dark;
                e.currentTarget.style.color = colors.text.white;
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                e.currentTarget.style.color = colors.text.main;
              }
            }}
          >
            {copied ? "Скопировано!" : "Копировать"}
          </button>
        </div>

        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 24px" }}>
          Ссылка будет активна до {expiryDate}
        </p>

        {/* QR Code */}
        {generateQr && (
          <div style={{ marginBottom: "24px" }}>
            <div
              ref={qrRef}
              style={{
                display: "inline-block",
                padding: "16px",
                border: `1px solid ${colors.border.default}`,
                borderRadius: "15px",
                marginBottom: "12px",
              }}
            >
              <QRCodeCanvas value={result.shortUrl} size={280} />
            </div>
            <br />
            <button
              onClick={handleDownloadQr}
              style={{
                height: "42px",
                padding: "0 20px",
                borderRadius: "10px",
                border: `1px solid ${colors.border.default}`,
                background: colors.bg.white,
                color: colors.text.main,
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s",
                fontFamily: "var(--l-font-family)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.surface.dark;
                e.currentTarget.style.color = colors.text.white;
                e.currentTarget.style.borderColor = colors.surface.dark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.bg.white;
                e.currentTarget.style.color = colors.text.main;
                e.currentTarget.style.borderColor = colors.border.default;
              }}
            >
              Скачать QR-код (PNG)
            </button>
          </div>
        )}

        <Button variant="transparentBlack" size="m" onClick={handleReset}>
          Сократить ещё одну ссылку
        </Button>
      </div>
    );
  }

  // Form state
  return (
    <div style={formCardStyle}>
      <form onSubmit={handleSubmit} noValidate>
        {/* URL input */}
        <div style={{ marginBottom: "20px" }}>
          <FormInput
            type="url"
            placeholder="Вставьте ссылку"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="URL для сокращения"
            disabled={loading}
          />
        </div>

        {/* Checkboxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {/* 1. Не проверять ссылку */}
          <Checkbox
            variant="simple"
            label={
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                Не проверять ссылку перед сокращением
                <TooltipIcon text="По умолчанию URL-адрес будет проверен перед сокращением. Сервер выполнит запрос по URL-адресу и дождётся корректного ответа. Если вы получаете ошибку, что URL не работает, но уверены в правильности ссылки, или не хотите, чтобы к вашему URL добавлялись дополнительные запросы — отметьте этот флажок." />
              </span>
            }
            checked={skipCheck}
            onChange={(e) => setSkipCheck(e.target.checked)}
            disabled={loading}
          />

          {/* 2. QR-код */}
          <Checkbox
            variant="simple"
            label="Сгенерировать QR-код"
            checked={generateQr}
            onChange={(e) => setGenerateQr(e.target.checked)}
            disabled={loading}
          />

          {/* 3. Уникальный адрес */}
          <div>
            <Checkbox
              variant="simple"
              label={
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Уникальный адрес
                  <TooltipIcon text="Вы можете задать своё окончание для короткой ссылки. Например, вместо случайного кода letteros.com/s/abc123 получить letteros.com/s/my-promo. Это удобно для брендированных или запоминающихся ссылок." />
                </span>
              }
              checked={useCustomSlug}
              onChange={(e) => {
                setUseCustomSlug(e.target.checked);
                if (!e.target.checked) setCustomSlug("");
              }}
              disabled={loading}
            />
            {/* Expandable input */}
            <div
              style={{
                overflow: "hidden",
                maxHeight: useCustomSlug ? "80px" : "0px",
                opacity: useCustomSlug ? 1 : 0,
                transition: "max-height 0.25s ease, opacity 0.2s ease",
                marginTop: useCustomSlug ? "10px" : "0",
              }}
            >
              <FormInput
                type="text"
                placeholder="Введите окончание ссылки"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                aria-label="Уникальный адрес"
                disabled={loading || !useCustomSlug}
              />
            </div>
          </div>
        </div>

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
            }}
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="blue"
          size="m"
          full
          disabled={loading}
        >
          {loading ? "Сокращаем..." : "Сократить ссылку"}
        </Button>
      </form>
    </div>
  );
}
