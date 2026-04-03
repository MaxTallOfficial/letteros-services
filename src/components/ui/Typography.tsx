import { ReactNode, CSSProperties, ElementType } from "react";
import { typography, fontFamily } from "@/tokens";

type TypographyLevel = keyof typeof typography;

interface TypographyProps {
  level: TypographyLevel;
  as?: ElementType;
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}

export function Typography({ level, as, children, color, style: extraStyle }: TypographyProps) {
  const t = typography[level];

  const defaultTag = (): ElementType => {
    if (level.startsWith("h1")) return "h1";
    if (level.startsWith("h2")) return "h2";
    if (level.startsWith("h3")) return "h3";
    if (level.startsWith("h4")) return "h4";
    return "p";
  };

  const Tag = as ?? defaultTag();

  const mobileClass = (): string => {
    if (level.startsWith("h1")) return "l-h1";
    if (level.startsWith("h2")) return "l-h2";
    if (level.startsWith("h3")) return "l-h3";
    if (level.startsWith("h4")) return "l-h4";
    return "";
  };
  const className = mobileClass() || undefined;

  const mergedStyle: CSSProperties = {
    fontFamily: fontFamily.base,
    fontSize: t.fontSize,
    fontWeight: t.fontWeight,
    lineHeight: t.lineHeight,
    letterSpacing: t.letterSpacing,
    color: color ?? undefined,
    margin: 0,
    ...extraStyle,
  };

  return <Tag className={className} style={mergedStyle}>{children}</Tag>;
}
