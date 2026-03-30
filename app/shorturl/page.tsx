import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { ShortenForm } from "@/src/components/shorturl/ShortenForm";
import { colors, shadows } from "@/tokens";

export const metadata: Metadata = {
  title: "Сокращение ссылок — Letteros Short URL",
  description:
    "Бесплатный сервис сокращения ссылок без регистрации. Короткие ссылки, кастомные слаги, QR-код — всё в одном месте.",
  openGraph: {
    title: "Letteros Short URL — сокращайте ссылки бесплатно",
    description:
      "Сокращайте ссылки без регистрации. Поддержка кастомных слагов, QR-кода и проверки URL.",
    type: "website",
  },
};

const sectionStyle = {
  paddingBottom: "100px",
};

const featureCards = [
  {
    title: "Бесплатно",
    text: "Сервис полностью бесплатный — без регистрации, без лимитов на количество ссылок.",
  },
  {
    title: "Без регистрации",
    text: "Просто вставьте ссылку и получите короткий URL. Никаких аккаунтов и паролей.",
  },
  {
    title: "QR-код",
    text: "Автоматически генерируйте QR-код для любой ссылки и скачивайте его в PNG.",
  },
  {
    title: "Кастомные ссылки",
    text: "Выберите свой вариант короткого кода — например, letteros.com/s/my-campaign.",
  },
  {
    title: "Проверка URL",
    text: "Перед сокращением сервис проверяет, что ссылка работает и возвращает корректный ответ.",
  },
  {
    title: "Срок жизни 90 дней",
    text: "Все ссылки активны 90 дней с момента создания. Дата истечения видна сразу.",
  },
];

const howsSteps = [
  {
    num: "01",
    title: "Вставьте ссылку",
    text: "Скопируйте любой URL и вставьте его в поле ввода.",
  },
  {
    num: "02",
    title: "Настройте по желанию",
    text: "Укажите кастомный слаг или включите генерацию QR-кода — это опционально.",
  },
  {
    num: "03",
    title: "Нажмите «Сократить»",
    text: "Сервис проверит ссылку и мгновенно создаст короткий URL.",
  },
  {
    num: "04",
    title: "Поделитесь",
    text: "Скопируйте короткую ссылку одной кнопкой или скачайте QR-код для оффлайн-материалов.",
  },
];

const audienceCards = [
  {
    title: "Email-маркетологи",
    text: "Короткие ссылки лучше читаются в рассылках и не ломают вёрстку. Следите за переходами.",
  },
  {
    title: "SMM-специалисты",
    text: "Публикуйте чистые, аккуратные ссылки в постах, историях и био профилей.",
  },
  {
    title: "Владельцы бизнеса",
    text: "Передавайте ссылки клиентам в удобном виде — через мессенджеры, печатные материалы или QR-коды.",
  },
  {
    title: "Все, кто работает со ссылками",
    text: "Журналисты, дизайнеры, разработчики — сократите любую длинную ссылку за пару секунд.",
  },
];

export default function ShortUrlPage() {
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
          aria-label="Форма сокращения ссылок"
        >
          <Container>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Typography
                level="h1Hero"
                color={colors.text.white}
                style={{ marginBottom: "20px" }}
              >
                Сокращайте ссылки бесплатно
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Без регистрации. Кастомные слаги, QR-код, проверка URL — всё в одном месте.
              </Typography>
            </div>

            <ShortenForm />
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
                Letteros Short URL — бесплатный инструмент для сокращения ссылок. Вставьте любой
                длинный URL, и мы мгновенно создадим короткую ссылку в формате{" "}
                <span style={{ color: colors.accent.blue, fontWeight: 600 }}>letteros.com/s/…</span>
                , удобную для публикации и отправки.
              </Typography>
              <Typography
                level="body"
                as="p"
                color={colors.text.main}
                style={{ marginTop: "20px" }}
              >
                Никаких аккаунтов, никаких ограничений. Сервис работает анонимно: просто вставьте
                ссылку — и готово. Поддерживаются кастомные слаги, QR-коды и проверка доступности
                URL до сокращения. Все ссылки действуют 90 дней.
              </Typography>
            </div>
          </Container>
        </section>

        {/* Audience */}
        <section
          style={{ ...sectionStyle, paddingTop: "80px", background: colors.bg.alt }}
          aria-label="Для кого этот сервис"
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
                  <Typography
                    level="h4"
                    color={colors.text.main}
                    style={{ marginBottom: "16px" }}
                  >
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
                  <Typography
                    level="h4"
                    color={colors.text.main}
                    style={{ marginBottom: "12px" }}
                  >
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
                  <Typography
                    level="h4"
                    color={colors.text.main}
                    style={{ marginBottom: "16px" }}
                  >
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
