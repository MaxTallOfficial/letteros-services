"use client";

import { useState, useRef, useCallback } from "react";
import { colors, shadows } from "@/tokens";
import { FormInput } from "@/src/components/ui/FormInput";
import { Button } from "@/src/components/ui/Button";
import dynamic from "next/dynamic";

const QRCodeCanvas = dynamic(
  () => import("qrcode.react").then((m) => m.QRCodeCanvas),
  { ssr: false }
);

export function QRGenerator() {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = url.trim();
      if (!trimmed) {
        setError("Введите ссылку");
        return;
      }
      try {
        const parsed = new URL(trimmed);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          setError("Допустимы только http и https ссылки");
          return;
        }
      } catch {
        setError("Неверный формат URL. Пример: https://example.com");
        return;
      }
      setError(null);
      setQrUrl(trimmed);
    },
    [url]
  );

  const handleDownload = useCallback(() => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const handleReset = useCallback(() => {
    setQrUrl(null);
    setUrl("");
    setError(null);
  }, []);

  const cardStyle = {
    background: colors.bg.white,
    borderRadius: "20px",
    boxShadow: shadows.cardSoft,
    padding: "40px",
    maxWidth: "640px",
    margin: "0 auto",
  };

  if (qrUrl) {
    return (
      <div style={cardStyle}>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, marginTop: 0, marginBottom: "16px" }}>
          QR-код сгенерирован
        </p>
        <div
          ref={qrRef}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "24px",
            border: `1px solid ${colors.border.default}`,
            borderRadius: "15px",
            marginBottom: "16px",
          }}
        >
          <QRCodeCanvas value={qrUrl} size={280} />
        </div>
        <p
          style={{
            fontSize: "14px",
            color: colors.text.placeholder,
            margin: "0 0 24px",
            wordBreak: "break-all",
          }}
        >
          {qrUrl}
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button variant="blue" size="m" onClick={handleDownload}>
            Скачать PNG
          </Button>
          <Button variant="transparentBlack" size="m" onClick={handleReset}>
            Новый QR-код
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <form onSubmit={handleGenerate} noValidate>
        <div style={{ marginBottom: "20px" }}>
          <FormInput
            type="url"
            placeholder="Вставьте ссылку для QR-кода"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="URL для QR-кода"
          />
        </div>
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
        <Button type="submit" variant="blue" size="m" full>
          Сгенерировать QR-код
        </Button>
      </form>
    </div>
  );
}
