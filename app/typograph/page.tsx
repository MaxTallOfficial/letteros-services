import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { TypographTool } from "@/src/components/typograph/TypographTool";
import { IconFree, IconTypoRules, IconBolt } from "@/src/components/ui/icons";
import { colors, shadows } from "@/tokens";

export const metadata: Metadata = {
  title: "Типограф онлайн — Letteros Typograph",
  description:
    "Бесплатный онлайн-типограф для русского текста без регистрации. Расставляет «ёлочки», тире, неразрывные пробелы — прямо в браузере, текст никуда не отправляется.",
  openGraph: {
    title: "Letteros Typograph — типографируйте текст бесплатно",
    description:
      "Автоматическая расстановка кавычек, тире, неразрывных пробелов и спецсимволов. Работает в браузере, без регистрации.",
    type: "website",
  },
};

const sectionStyle = { paddingBottom: "100px" };

const featureCards = [
  {
    icon: <IconFree />,
    title: "Бесплатно",
    text: "Сервис полностью бесплатный\u00a0— без регистрации, без лимитов.",
  },
  {
    icon: <IconTypoRules />,
    title: "Полный набор правил",
    text: "Кавычки, тире, неразрывные пробелы, спецсимволы, числа\u00a0— всё по правилам русской типографики.",
  },
  {
    icon: <IconBolt />,
    title: "Мгновенно",
    text: "Обработка происходит сразу при вводе\u00a0— результат виден в\u00a0режиме реального времени.",
  },
];

const howsSteps = [
  {
    num: "01",
    title: "Вставьте текст",
    text: "Вставьте текст в\u00a0левое поле\u00a0— он\u00a0обработается автоматически.",
  },
  {
    num: "02",
    title: "Смотрите результат",
    text: "В\u00a0правом поле сразу появится типографированный текст. Счётчик покажет количество исправлений.",
  },
  {
    num: "03",
    title: "Скопируйте",
    text: "Нажмите «Копировать»\u00a0— готовый текст окажется в\u00a0буфере обмена.",
  },
];

const audienceCards = [
  {
    title: "Копирайтеры и редакторы",
    text: "Приводите тексты к\u00a0профессиональному виду за секунды, не тратя время на ручную правку.",
  },
  {
    title: "Email-маркетологи",
    text: "Красивая типографика в\u00a0рассылках\u00a0— правильные кавычки, тире и\u00a0пробелы без лишних усилий.",
  },
  {
    title: "Контент-менеджеры",
    text: "Готовьте тексты для публикации на сайте или в\u00a0соцсетях с\u00a0корректными типографическими знаками.",
  },
  {
    title: "Все, кто работает с текстом",
    text: "Дизайнеры, технические писатели, разработчики\u00a0— быстро приведите любой текст в\u00a0порядок.",
  },
];

export default function TypographPage() {
  return (
    <>
      <Header />

      <main style={{ paddingTop: "50px" }}>
        {/* Hero */}
        <section
          style={{
            background: colors.surface.dark,
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
          aria-label="Инструмент типографирования текста"
        >
          <Container>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Typography
                level="h1Hero"
                color={colors.text.white}
                style={{ marginBottom: "20px" }}
              >
                Типограф онлайн
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Расставляет «ёлочки», тире и{"\u00a0"}неразрывные пробелы автоматически. Бесплатно, без регистрации, текст никуда не{"\u00a0"}отправляется.
              </Typography>
            </div>

            <TypographTool />
          </Container>
        </section>

        {/* About */}
        <section style={{ ...sectionStyle, paddingTop: "100px" }} aria-label="О сервисе">
          <Container>
            <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
              <Typography
                level="h2Sections"
                color={colors.text.main}
                style={{ marginBottom: "32px" }}
              >
                Что это за сервис
              </Typography>
              <Typography level="body" as="p" color={colors.text.main}>
                Letteros Typograph{"\u00a0"}— бесплатный инструмент для автоматического типографирования текста. Он расставляет правильные кавычки-«ёлочки», заменяет дефисы на{"\u00a0"}тире, добавляет неразрывные пробелы перед предлогами и{"\u00a0"}союзами, расставляет знаки ©, ® и{"\u00a0"}™, форматирует числа.
              </Typography>
              <Typography
                level="body"
                as="p"
                color={colors.text.main}
                style={{ marginTop: "20px" }}
              >
                Вся обработка происходит прямо в{"\u00a0"}браузере{"\u00a0"}— текст не{"\u00a0"}передаётся на{"\u00a0"}сервер и{"\u00a0"}никуда не{"\u00a0"}сохраняется. Результат появляется мгновенно, по мере ввода.
              </Typography>
            </div>
          </Container>
        </section>

        {/* Audience */}
        <section
          style={{ ...sectionStyle, paddingTop: "80px", background: colors.bg.alt }}
          aria-label="Для кого"
        >
          <Container>
            <Typography
              level="h2Sections"
              color={colors.text.main}
              style={{ marginBottom: "48px", textAlign: "center" }}
            >
              Для кого
            </Typography>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "30px",
              }}
            >
              {audienceCards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: colors.bg.white,
                    borderRadius: "20px",
                    boxShadow: shadows.cardSoft,
                    padding: "40px",
                  }}
                >
                  <Typography level="h4" color={colors.text.main} style={{ marginBottom: "16px" }}>
                    {card.title}
                  </Typography>
                  <Typography level="body" as="p" color={colors.text.main}>
                    {card.text}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section style={{ ...sectionStyle, paddingTop: "100px" }} aria-label="Как это работает">
          <Container>
            <Typography
              level="h2Sections"
              color={colors.text.main}
              style={{ marginBottom: "48px", textAlign: "center" }}
            >
              Как это работает
            </Typography>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "30px",
              }}
            >
              {howsSteps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    background: colors.bg.white,
                    borderRadius: "20px",
                    boxShadow: shadows.cardSoft,
                    padding: "40px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 700,
                      color: colors.accent.blue,
                      marginBottom: "16px",
                      fontFamily: "var(--l-font-family)",
                    }}
                  >
                    {step.num}
                  </div>
                  <Typography level="h4" color={colors.text.main} style={{ marginBottom: "12px" }}>
                    {step.title}
                  </Typography>
                  <Typography level="body" as="p" color={colors.text.main}>
                    {step.text}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Why Letteros */}
        <section
          style={{ ...sectionStyle, paddingTop: "80px", background: colors.bg.alt }}
          aria-label="Почему Letteros"
        >
          <Container>
            <Typography
              level="h2Sections"
              color={colors.text.main}
              style={{ marginBottom: "48px", textAlign: "center" }}
            >
              Почему Letteros
            </Typography>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "30px",
              }}
            >
              {featureCards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: colors.bg.white,
                    borderRadius: "20px",
                    boxShadow: shadows.cardSoft,
                    padding: "40px",
                  }}
                >
                  <div style={{ marginBottom: "16px", color: colors.text.main }}>{card.icon}</div>
                  <Typography level="h4" color={colors.text.main} style={{ marginBottom: "16px" }}>
                    {card.title}
                  </Typography>
                  <Typography level="body" as="p" color={colors.text.main}>
                    {card.text}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
