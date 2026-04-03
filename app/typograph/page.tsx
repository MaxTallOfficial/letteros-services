import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { TypographTool } from "@/src/components/typograph/TypographTool";
import { IconFree, IconShieldCheck, IconBolt, IconQuotes, IconDash, IconNbsp } from "@/src/components/ui/icons";
import { colors, shadows } from "@/tokens";

export const metadata: Metadata = {
  title: "Letteros Typograph — типограф онлайн",
  description:
    "Расставляет кавычки-ёлочки, тире и\u00a0неразрывные пробелы автоматически. Текст обрабатывается в\u00a0браузере и\u00a0никуда не\u00a0отправляется.",
  openGraph: {
    title: "Letteros Typograph — типограф онлайн",
    description:
      "Расставляет кавычки-ёлочки, тире и\u00a0неразрывные пробелы автоматически. Текст обрабатывается в\u00a0браузере и\u00a0никуда не\u00a0отправляется.",
    type: "website",
  },
};

const sectionStyle = { paddingBottom: "100px" };

const featureCards = [
  {
    icon: <IconQuotes />,
    title: "Кавычки-ёлочки",
    text: 'Прямые кавычки заменяются на\u00a0«ёлочки», вложенные\u00a0— на\u00a0\u201elапки\u201c. Работает и\u00a0для одиночных, и\u00a0для вложенных конструкций.',
  },
  {
    icon: <IconDash />,
    title: "Тире и\u00a0дефисы",
    text: "Дефис между словами заменяется на\u00a0длинное тире. Дефисы внутри слов остаются на\u00a0месте.",
  },
  {
    icon: <IconNbsp />,
    title: "Неразрывные пробелы",
    text: "Предлоги, союзы и\u00a0инициалы не\u00a0отрываются от\u00a0следующего слова. Висячих предлогов в\u00a0тексте не\u00a0будет.",
  },
  {
    icon: <IconShieldCheck />,
    title: "Приватность",
    text: "Текст обрабатывается в\u00a0браузере и\u00a0не\u00a0покидает ваше устройство. Серверных запросов нет.",
  },
  {
    icon: <IconBolt />,
    title: "Автоматическая обработка",
    text: "Результат появляется при вставке, без нажатия кнопок. При ручном вводе — с\u00a0небольшой задержкой.",
  },
  {
    icon: <IconFree />,
    title: "Бесплатно",
    text: "Без лимитов и\u00a0скрытых условий.",
  },
];

const howsSteps = [
  {
    num: "01",
    title: "Вставьте текст",
    text: "Скопируйте текст из\u00a0любого источника и\u00a0вставьте в\u00a0левое поле. Результат появится справа автоматически.",
  },
  {
    num: "02",
    title: "Проверьте изменения",
    text: "Счётчик исправлений покажет количество замен по\u00a0категориям: кавычки, тире, неразрывные пробелы.",
  },
  {
    num: "03",
    title: "Скопируйте результат",
    text: "Нажмите кнопку копирования и\u00a0вставьте готовый текст туда, где он\u00a0нужен.",
  },
];

const audienceCards = [
  {
    title: "Копирайтеры и\u00a0редакторы",
    text: "Ручная расстановка кавычек-ёлочек и\u00a0тире отнимает время и\u00a0всё равно пропускает ошибки. Типограф обрабатывает весь текст за\u00a0секунду.",
  },
  {
    title: "Контент-менеджеры",
    text: "Текст из\u00a0CMS, из\u00a0писем клиентов или из\u00a0Google Docs приходит с\u00a0прямыми кавычками и\u00a0дефисами вместо тире. Вставить и\u00a0скопировать — быстрее, чем править вручную.",
  },
  {
    title: "Email-маркетологи",
    text: "Типографически чистый текст в\u00a0рассылке — признак профессионализма. Разница между дефисом и\u00a0тире видна подписчику, даже если он\u00a0не\u00a0может её назвать.",
  },
  {
    title: "Все остальные",
    text: "Любой текст, который кто-то будет читать, заслуживает правильных кавычек.",
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
                Letteros Typograph
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Приводит текст в{"\u00a0"}порядок по{"\u00a0"}правилам русской типографики.
                <br />
                Кавычки, тире, неразрывные пробелы и{"\u00a0"}спецсимволы.
              </Typography>
            </div>

            <TypographTool />
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
              Всем, кто работает с{"\u00a0"}текстом
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

        {/* Features */}
        <section
          style={{ ...sectionStyle, paddingTop: "80px", background: colors.bg.alt }}
          aria-label="Возможности сервиса"
        >
          <Container>
            <style>{`
              @media (max-width: 900px) { .typo-features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 600px) { .typo-features-grid { grid-template-columns: 1fr !important; } }
            `}</style>
            <Typography
              level="h2Sections"
              color={colors.text.main}
              style={{ marginBottom: "48px", textAlign: "center" }}
            >
              Возможности сервиса
            </Typography>
            <div
              className="typo-features-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
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
