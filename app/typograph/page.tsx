import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { colors } from "@/tokens";

export const metadata: Metadata = {
  title: "Типограф — Letteros",
  description: "Сервис типографа Letteros — скоро.",
};

export default function TypographPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "50px", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <Container>
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <Typography level="h2Sections" color={colors.text.main} style={{ marginBottom: "20px" }}>
              Типограф
            </Typography>
            <Typography level="body" as="p" color={colors.text.placeholder}>
              Страница в разработке. Скоро здесь появится новый сервис.
            </Typography>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
