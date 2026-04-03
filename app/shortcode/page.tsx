import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { CompressorTool } from "@/src/components/shortcode/CompressorTool";
import { IconFree, IconCode, IconShieldCheck, IconChartDown, IconBolt, IconTextSelect } from "@/src/components/ui/icons";
import { colors, shadows } from "@/tokens";

export const metadata: Metadata = {
  title: "Letteros Shortcode — компрессор кода",
  description:
    "Минифицирует HTML, CSS и\u00a0JS прямо в\u00a0браузере. Код никуда не\u00a0отправляется.",
  openGraph: {
    title: "Letteros Shortcode — компрессор кода",
    description:
      "Минифицирует HTML, CSS и\u00a0JS прямо в\u00a0браузере. Код никуда не\u00a0отправляется.",
    type: "website",
  },
};

const sectionStyle = { paddingBottom: "100px" };

const featureCards = [
  {
    icon: <IconCode />,
    title: "Три языка",
    text: "HTML, CSS и\u00a0JS в\u00a0одном интерфейсе. Переключение между вкладками не\u00a0сбрасывает содержимое.",
  },
  {
    icon: <IconShieldCheck />,
    title: "Приватность",
    text: "Код обрабатывается в\u00a0браузере и\u00a0не\u00a0покидает ваше устройство. Серверных запросов нет.",
  },
  {
    icon: <IconChartDown />,
    title: "Статистика сжатия",
    text: "Размер до\u00a0и\u00a0после в\u00a0символах и\u00a0байтах. Процент экономии виден сразу.",
  },
  {
    icon: <IconBolt />,
    title: "Автоматическая обработка",
    text: "Результат появляется при вставке, без нажатия кнопок. При ручном вводе — с\u00a0небольшой задержкой.",
  },
  {
    icon: <IconTextSelect />,
    title: "Подсветка синтаксиса",
    text: "Код подсвечивается и\u00a0в\u00a0поле ввода, и\u00a0в\u00a0результате. Язык подсветки переключается вместе с\u00a0вкладкой.",
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
    title: "Выберите язык",
    text: "Переключите вкладку на\u00a0HTML, CSS или JS. Каждая вкладка хранит своё содержимое отдельно.",
  },
  {
    num: "02",
    title: "Вставьте код",
    text: "Скопируйте фрагмент и\u00a0вставьте в\u00a0левое поле. Сжатый результат появится справа автоматически.",
  },
  {
    num: "03",
    title: "Скопируйте результат",
    text: "Нажмите кнопку копирования в\u00a0поле результата. Статистика покажет, сколько удалось сэкономить.",
  },
];

const audienceCards = [
  {
    title: "Email-верстальщики",
    text: "HTML-письмо с\u00a0лишними пробелами и\u00a0комментариями весит больше и\u00a0может обрезаться почтовиком. Минификация убирает всё ненужное и\u00a0сохраняет структуру.",
  },
  {
    title: "Фронтенд-разработчики",
    text: "Быстро сжать фрагмент кода перед вставкой в\u00a0продакшен, не\u00a0запуская сборщик. Один таб — один результат.",
  },
  {
    title: "Контент-менеджеры",
    text: "HTML-виджеты, встраиваемые блоки, сторонние скрипты — всё это можно сжать перед добавлением на\u00a0страницу, даже без навыков программирования.",
  },
  {
    title: "Все остальные",
    text: "Иногда нужно убрать из\u00a0кода лишнее и\u00a0получить чистый минифицированный результат.",
  },
];

export default function ShortcodePage() {
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
          aria-label="Инструмент минификации кода"
        >
          <Container>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Typography
                level="h1Hero"
                color={colors.text.white}
                style={{ marginBottom: "20px" }}
              >
                Компрессор кода
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Сжимает HTML, CSS и{"\u00a0"}JS до{"\u00a0"}минимального размера.
                <br />
                Работает в{"\u00a0"}браузере, код остаётся у{"\u00a0"}вас.
              </Typography>
            </div>

            <CompressorTool />
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
              Всем, кто работает с{"\u00a0"}кодом
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
              @media (max-width: 900px) { .sc-features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 600px) { .sc-features-grid { grid-template-columns: 1fr !important; } }
            `}</style>
            <Typography
              level="h2Sections"
              color={colors.text.main}
              style={{ marginBottom: "48px", textAlign: "center" }}
            >
              Возможности сервиса
            </Typography>
            <div
              className="sc-features-grid"
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
