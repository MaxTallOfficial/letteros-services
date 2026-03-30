"use client";

import { CSSProperties } from "react";
import { Button } from "@/src/components/ui/Button";

interface ActionButtonsProps {
  onPaste: () => void;
  onCompress: () => void;
  onClear: () => void;
  onCopy: () => void;
  loading: boolean;
  hasOutput: boolean;
  copied: boolean;
}

export function ActionButtons({
  onPaste,
  onCompress,
  onClear,
  onCopy,
  loading,
  hasOutput,
  copied,
}: ActionButtonsProps) {
  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  };

  return (
    <div style={rowStyle}>
      <Button variant="transparentBlack" size="s" onClick={onPaste} disabled={loading}>
        Вставить из буфера
      </Button>

      <Button variant="blue" size="m" onClick={onCompress} disabled={loading}>
        {loading ? "Сжимаем..." : "Сжать"}
      </Button>

      <Button variant="transparentBlack" size="s" onClick={onClear} disabled={loading}>
        Очистить
      </Button>

      <Button
        variant="transparentBlack"
        size="s"
        onClick={onCopy}
        disabled={!hasOutput || loading}
      >
        {copied ? "Скопировано!" : "Копировать"}
      </Button>
    </div>
  );
}
