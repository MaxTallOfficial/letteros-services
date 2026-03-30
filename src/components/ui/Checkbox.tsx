"use client";

import { InputHTMLAttributes, CSSProperties, useId } from "react";
import { colors } from "@/tokens";

type CheckboxVariant = "default" | "simple" | "tiny" | "large";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "style"> {
  label: React.ReactNode;
  variant?: CheckboxVariant;
}

export function Checkbox({ label, variant = "default", className = "", ...props }: CheckboxProps) {
  const labelStyles: Record<CheckboxVariant, CSSProperties> = {
    default: {
      position: "relative",
      paddingLeft: "22px",
      color: colors.text.placeholder,
      fontFamily: "var(--l-font-family)",
      fontSize: "14px",
      cursor: "pointer",
      display: "inline-block",
      lineHeight: "normal",
    },
    simple: {
      position: "relative",
      paddingLeft: "32px",
      color: colors.text.main,
      fontFamily: "var(--l-font-family)",
      fontSize: "14px",
      cursor: "pointer",
      display: "inline-block",
      lineHeight: "normal",
    },
    tiny: {
      position: "relative",
      paddingLeft: "22px",
      color: colors.text.placeholder,
      fontFamily: "var(--l-font-family)",
      fontSize: "10px",
      lineHeight: "1.2",
      cursor: "pointer",
      display: "inline-block",
    },
    large: {
      position: "relative",
      paddingLeft: "49px",
      color: colors.text.main,
      fontFamily: "var(--l-font-family)",
      fontSize: "24px",
      fontWeight: 500,
      cursor: "pointer",
      display: "inline-block",
      lineHeight: "normal",
    },
  };

  const reactId = useId();
  const id = (props as { id?: string }).id ?? reactId;

  return (
    <div className={className} style={{ display: "flex", alignItems: "flex-start" }}>
      <style>{`
        .l-checkbox-input { opacity: 0; position: absolute; height: 0; width: 0; }
        .l-checkbox-label { position: relative; }
        .l-checkbox-label::before {
          content: "";
          position: absolute;
          top: 1px;
          left: 0;
          width: 16px;
          height: 16px;
          border: 1px solid ${colors.border.default};
          border-radius: 5px;
          background: ${colors.bg.white};
          transition: border-color 0.2s;
        }
        .l-checkbox-label::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          width: 10px;
          height: 6px;
          border-left: 2px solid ${colors.text.main};
          border-bottom: 2px solid ${colors.text.main};
          transform: rotate(-45deg);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .l-checkbox-input:checked + .l-checkbox-label::before {
          border-color: ${colors.text.main};
        }
        .l-checkbox-input:checked + .l-checkbox-label::after {
          opacity: 1;
        }
      `}</style>
      <input type="checkbox" id={id} className="l-checkbox-input" {...props} />
      <label htmlFor={id} className="l-checkbox-label" style={labelStyles[variant]}>
        {label}
      </label>
    </div>
  );
}
