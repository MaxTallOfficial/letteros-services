import { ReactNode } from "react";
import { colors } from "@/tokens";
import { Container } from "@/src/components/layout/Container";

const bgMap = {
  white: colors.bg.white,
  alt: colors.bg.alt,
  dark: colors.surface.dark,
} as const;

type SectionBg = keyof typeof bgMap;

interface SectionProps {
  bg: SectionBg;
  children: ReactNode;
  noPadding?: boolean;
}

export default function Section({ bg, children, noPadding }: SectionProps) {
  const isDark = bg === "dark";
  return (
    <section
      style={{
        backgroundColor: bgMap[bg],
        color: isDark ? colors.text.white : colors.text.main,
        padding: noPadding ? 0 : "80px 0",
      }}
    >
      <Container>{children}</Container>
    </section>
  );
}
