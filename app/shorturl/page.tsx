import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { ShortenForm } from "@/src/components/shorturl/ShortenForm";
import {
  IconFree,
  IconUserCheck,
  IconQR,
  IconPencil,
  IconShieldCheck,
  IconTimer,
} from "@/src/components/ui/icons";
import { colors, shadows } from "@/tokens";

export const metadata: Metadata = {
  title: "Letteros Short URL — сокращатель ссылок",
  description:
    "Короткий адрес, кастомный слаг и\u00a0QR-код за\u00a0одно действие. Работает без регистрации.",
  openGraph: {
    title: "Letteros Short URL — сокращатель ссылок",
    description:
      "Короткий адрес, кастомный слаг и\u00a0QR-код за\u00a0одно действие. Работает без регистрации.",
    type: "website",
  },
};

const sectionStyle = {
  paddingBottom: "100px",
};

const featureCards = [
  {
    icon: <IconUserCheck />,
    title: "Без регистрации",
    text: "Открываете страницу и\u00a0сразу работаете. Никаких аккаунтов и\u00a0паролей.",
  },
  {
    icon: <IconPencil />,
    title: "Кастомный слаг",
    text: "Прописывайте собственное окончание ссылки вместо случайного набора символов.",
  },
  {
    icon: <IconQR />,
    title: "QR-код",
    text: "Генерируется вместе со\u00a0ссылкой и\u00a0скачивается в\u00a0PNG.",
  },
  {
    icon: <IconShieldCheck />,
    title: "Проверка URL",
    text: "Сервис проверяет доступность страницы до\u00a0сокращения ссылки.",
  },
  {
    icon: <IconTimer />,
    title: "Срок 90 дней",
    text: "Дата деактивации видна сразу после создания ссылки.",
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
    title: "Вставьте URL",
    text: "Скопируйте любой адрес и\u00a0вставьте в\u00a0поле\u00a0— страницу, документ, ссылку с\u00a0UTM-параметрами.",
  },
  {
    num: "02",
    title: "Настройте под себя",
    text: "Задайте свой слаг, включите генерацию QR-кода или отключите проверку доступности, если уверены в\u00a0ссылке.",
  },
  {
    num: "03",
    title: "Скопируйте результат",
    text: "Короткая ссылка готова. Копируйте одной кнопкой или скачайте QR-код в\u00a0PNG.",
  },
];

const audienceCards = [
  {
    title: "Email-маркетологи",
    text: "UTM-метки делают ссылку нечитаемой. Короткий адрес выглядит опрятно в\u00a0любом почтовике и\u00a0не\u00a0ломает вёрстку письма.",
  },
  {
    title: "SMM-специалисты",
    text: "В\u00a0описании профиля и\u00a0в\u00a0постах место ограничено. Кастомный слаг делает ссылку узнаваемой даже без контекста.",
  },
  {
    title: "Дизайнеры и\u00a0редакторы",
    text: "Длинный URL в\u00a0макете, презентации или документе\u00a0— визуальный мусор. Короткий адрес не\u00a0отвлекает от\u00a0содержания.",
  },
  {
    title: "Все остальные",
    text: "Иногда нужно просто отправить ссылку, не\u00a0превращая её в\u00a0абзац.",
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
                Сокращение ссылок
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Превращает любой длинный адрес в{"\u00a0"}короткую ссылку.
                <br />
                Кастомный слаг, QR-код и{"\u00a0"}проверка URL.
              </Typography>
            </div>

            <ShortenForm />
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
              Всем, кто работает со{"\u00a0"}ссылками
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

        {/* Features */}
        <section
          style={{ ...sectionStyle, paddingTop: "80px", background: colors.bg.alt }}
          aria-label="Возможности сервиса"
        >
          <Container>
            <style>{`
              @media (max-width: 900px) { .su-features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 600px) { .su-features-grid { grid-template-columns: 1fr !important; } }
            `}</style>
            <Typography
              level="h2Sections"
              color={colors.text.main}
              style={{ marginBottom: "48px", textAlign: "center" }}
            >
              Возможности сервиса
            </Typography>
            <div
              className="su-features-grid"
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
