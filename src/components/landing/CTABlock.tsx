import { colors, radius } from "@/tokens";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { Button } from "@/src/components/ui/Button";

interface CTABlockProps {
  bannerSrc?: string;
}

export default function CTABlock({ bannerSrc }: CTABlockProps) {
  return (
    <section
      style={{
        backgroundColor: colors.surface.dark,
        padding: "80px 0",
      }}
    >
      <Container>
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <Typography level="h2Sections" color={colors.text.white} style={{ marginBottom: "24px" }}>
            Больше инструментов{"\u00a0"}в&nbsp;Letteros
          </Typography>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "25.2px",
              color: colors.text.white,
              marginBottom: "40px",
              opacity: 0.8,
            }}
          >
            Рассылки, презентации, баннеры, статьи, формы для&nbsp;сбора данных
            и&nbsp;другие инструменты для&nbsp;маркетинга и&nbsp;коммуникаций&nbsp;&mdash; в&nbsp;одной платформе.
          </p>
          {bannerSrc ? (
            <img
              src={bannerSrc}
              alt="Letteros"
              style={{
                width: "754px",
                maxWidth: "100%",
                height: "auto",
                borderRadius: radius.card,
                margin: "0 auto 40px",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "580px",
                maxWidth: "100%",
                height: "190px",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: radius.card,
                margin: "0 auto 40px",
              }}
            />
          )}
          <Button variant="white" size="m" href="https://app.letteros.com">
            Попробовать Letteros
          </Button>
        </div>
      </Container>
    </section>
  );
}
