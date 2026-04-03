import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { CompressorTool } from "@/src/components/shortcode/CompressorTool";
import { IconFree, IconUserCheck, IconCode, IconTextSelect, IconChartDown } from "@/src/components/ui/icons";
import { colors, shadows } from "@/tokens";

export const metadata: Metadata = {
  title: "Компрессор кода (HTML, CSS, JS) — Letteros",
  description:
    "Бесплатный онлайн-сервис минификации HTML, CSS и JavaScript без регистрации. Код обрабатывается прямо в браузере — ничего не отправляется на сервер.",
  openGraph: {
    title: "Letteros — компрессор кода HTML, CSS и JS бесплатно",
    description:
      "Минификация кода прямо в браузере. Поддержка HTML, CSS и JavaScript с подсветкой синтаксиса.",
    type: "website",
  },
};

const sectionStyle = { paddingBottom: "100px" };

const featureCards = [
  {
    icon: <IconFree />,
    title: "Бесплатно",
    text: "Сервис полностью бесплатный\u00a0— без регистрации, без лимитов на количество запросов.",
  },
  {
    icon: <IconCode />,
    title: "HTML, CSS и JS",
    text: "Поддержка трёх языков в\u00a0одном инструменте. Переключайтесь между вкладками\u00a0— состояние сохраняется.",
  },
  {
    icon: <IconTextSelect />,
    title: "Подсветка синтаксиса",
    text: "Оба поля\u00a0— исходный код и\u00a0результат\u00a0— отображаются с\u00a0подсветкой синтаксиса для удобной работы.",
  },
  {
    icon: <IconChartDown />,
    title: "Статистика сжатия",
    text: "После минификации видите размер до\u00a0и\u00a0после, а\u00a0также процент уменьшения кода.",
  },
  {
    icon: <IconUserCheck />,
    title: "Без регистрации",
    text: "Просто откройте страницу и начните работу. Никаких аккаунтов и подписок.",
  },
];

const howsSteps = [
  {
    num: "01",
    title: "Выберите тип кода",
    text: "Нажмите на\u00a0вкладку HTML, CSS или\u00a0JS\u00a0— в\u00a0зависимости от того, что хотите сжать.",
  },
  {
    num: "02",
    title: "Вставьте код",
    text: "Вставьте код вручную или нажмите «Вставить из буфера»\u00a0— содержимое буфера обмена попадёт в\u00a0поле ввода.",
  },
  {
    num: "03",
    title: "Нажмите «Сжать»",
    text: "Инструмент удалит лишние пробелы, переносы строк и\u00a0комментарии, сократит значения и объединит селекторы.",
  },
  {
    num: "04",
    title: "Скопируйте результат",
    text: "Нажмите «Копировать»\u00a0— минифицированный код окажется в\u00a0буфере обмена, готовый к\u00a0использованию.",
  },
];

const audienceCards = [
  {
    title: "Верстальщики и фронтенд-разработчики",
    text: "Быстро минифицируйте HTML, CSS и\u00a0JS перед деплоем без настройки сборщиков.",
  },
  {
    title: "Email-маркетологи",
    text: "Сжимайте HTML-письма перед отправкой\u00a0— меньше код, быстрее загрузка, меньше проблем с\u00a0почтовыми клиентами.",
  },
  {
    title: "Разработчики без сборки",
    text: "Если в\u00a0проекте нет Webpack или Vite\u00a0— используйте этот инструмент для ручной минификации файлов.",
  },
  {
    title: "Все, кто работает с кодом",
    text: "Дизайнеры, технические писатели, контент-менеджеры\u00a0— быстро обработайте кодовый сниппет без лишних инструментов.",
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
                Компрессор кода онлайн
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Минификация HTML, CSS и{"\u00a0"}JS прямо в{"\u00a0"}браузере. Бесплатно, без регистрации, код никуда не{"\u00a0"}отправляется.
              </Typography>
            </div>

            <CompressorTool />
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
                Letteros Code Compressor{"\u00a0"}— бесплатный инструмент для минификации HTML, CSS и{"\u00a0"}JavaScript.
                Вставьте исходный код в{"\u00a0"}поле ввода, нажмите «Сжать»{"\u00a0"}— и{"\u00a0"}получите компактную версию без лишних
                пробелов, переносов и комментариев.
              </Typography>
              <Typography
                level="body"
                as="p"
                color={colors.text.main}
                style={{ marginTop: "20px" }}
              >
                Вся обработка происходит в{"\u00a0"}браузере{"\u00a0"}— ваш код не{"\u00a0"}передаётся на{"\u00a0"}сервер и{"\u00a0"}никуда не{"\u00a0"}сохраняется.
                Инструмент поддерживает три вкладки (HTML, CSS, JS) с{"\u00a0"}независимым состоянием каждой и{"\u00a0"}отображает
                статистику сжатия: размер до{"\u00a0"}и{"\u00a0"}после, процент уменьшения.
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
