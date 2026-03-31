"use client";

import { CSSProperties, useRef } from "react";
import { colors } from "@/tokens";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onPaste: () => void;
  disabled?: boolean;
}

export function TextInput({ value, onChange, onPaste, disabled = false }: TextInputProps) {
  const textareaStyle: CSSProperties = {
    display: "block",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    minHeight: "200px",
    resize: "none",
    border: "none",
    padding: "18px",
    fontFamily: "var(--l-font-family)",
    fontSize: "16px",
    lineHeight: "1.6",
    color: colors.text.main,
    background: "transparent",
    outline: "none",
    opacity: disabled ? 0.6 : 1,
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onPaste={onPaste}
      placeholder="Вставьте текст"
      disabled={disabled}
      style={textareaStyle}
    />
  );
}
