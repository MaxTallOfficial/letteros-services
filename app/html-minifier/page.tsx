import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { MinifierTool } from "@/src/components/minifier/MinifierTool";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import CTABlock from "@/src/components/landing/CTABlock";
import AudienceCards from "@/src/components/landing/AudienceCards";
import { FAQ } from "@/src/components/landing/FAQ";
import { SchemaOrg } from "@/src/components/seo/SchemaOrg";

export const metadata: Metadata = {
  title: "Компрессор HTML онлайн — сжатие HTML без отправки на сервер | Letteros",
  description:
    "Сжатие HTML прямо в браузере: уберём комментарии, пробелы и опциональные теги. Структура и вёрстка сохраняются. Бесплатно.",
  openGraph: {
    title: "Компрессор HTML онлайн — сжатие HTML без отправки на сервер | Letteros",
    description:
      "Сжатие HTML прямо в браузере: уберём комментарии, пробелы и опциональные теги. Структура и вёрстка сохраняются. Бесплатно.",
    type: "website",
  },
};

const howSteps = [
  {
    id: "paste",
    label: "Вставьте код",
    description:
      "Скопируйте HTML-фрагмент и вставьте в левое поле — шаблон письма, виджет или блок страницы. Компрессор принимает код любого объёма и обрабатывает его на вашем устройстве.",
    screenshotCaption: "Скриншот с вставленным HTML",
    imageSrc: "/images/html-minifier/howto_1.jpg",
  },
  {
    id: "result",
    label: "Получите результат",
    description:
      "Сжатый HTML появится в правом поле автоматически — кнопку нажимать не нужно. Компрессор уберёт комментарии, пробелы и опциональные атрибуты, сохранив структуру и порядок тегов.",
    screenshotCaption: "Скриншот с результатом",
    imageSrc: "/images/html-minifier/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Нажмите кнопку копирования — минифицированный код готов к вставке в письмо, на сайт или в сборку проекта.",
    screenshotCaption: "Скриншот с кнопкой копирования",
    imageSrc: "/images/html-minifier/howto_3.jpg",
  },
];

const audienceCards = [
            {
              title: "Email-верстальщики",
              description: "HTML-письмо нужно сжать перед отправкой, чтобы не упереться в лимит размера почтовых клиентов. Компрессор уберёт лишнее, не трогая структуру и вёрстку.",
              imageSrc: "/images/html-minifier/audience_1.png",
            },
            {
              title: "Фронтенд-разработчики",
              description: "Сжать один HTML-файл, когда сборщик и терминал избыточны. Вставьте код в браузер — результат появится без npm и зависимостей.",
              imageSrc: "/images/html-minifier/audience_2.png",
            },
            {
              title: "Контент-менеджеры",
              description: "HTML-виджеты и встраиваемые блоки нужно сжать перед добавлением на сайт. Вставьте код — результат появится сам, технические знания не нужны.",
              imageSrc: "/images/html-minifier/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Очистите HTML от лишнего за секунды. Код обрабатывается в браузере и не передаётся на сторонний сервер.",
              imageSrc: "/images/html-minifier/audience_4.png",
            },
          ];

const faqItems = [
    {
      question: "Не сломает ли сжатие вёрстку письма в Outlook?",
      answer: "Нет. Компрессор не трогает структуру, теги и атрибуты, важные для рендеринга. Убираются только пробелы, комментарии и опциональные элементы — то, что не влияет на отображение в любом почтовом клиенте.",
    },
    {
      question: "Зачем сжимать HTML-письмо?",
      answer: "Почтовые клиенты ограничивают размер сообщения — Gmail обрезает письма тяжелее 102 КБ. Сжатие уменьшает вес HTML без изменения вёрстки и помогает сложиться в лимит.",
    },
    {
      question: "Сохраняются ли inline-стили?",
      answer: "Да. Атрибуты <code>style</code> остаются на местах со всеми правилами — это критично для email-вёрстки, где почтовые клиенты не поддерживают внешние таблицы стилей.",
    },
    {
      question: "Можно ли сжать HTML-виджет от стороннего сервиса?",
      answer: "Да. Компрессор работает с любым валидным HTML — будь то форма, чат-виджет или блок аналитики. Достаточно вставить код в поле и скопировать результат.",
    },
    {
      question: "Куда уходит мой код при сжатии?",
      answer: "Никуда. Сжатие работает полностью в браузере на вашем устройстве. Код не передаётся по сети, не сохраняется на сервере и не попадает в логи.",
    },
    {
      question: "Есть ли ограничение на размер файла?",
      answer: "Нет. Вставляйте фрагменты любого объёма — обработка идёт на вашем устройстве, поэтому ограничений со стороны сервиса нет.",
    },
    {
      question: "Нужна ли регистрация?",
      answer: "Нет. Откройте страницу, вставьте код и получите сжатый результат. Аккаунты и пароли не требуются.",
    },
];

export default function Page() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Компрессор HTML",
    url: "https://letteros.com/html-minifier",
    description: "Сжатие HTML прямо в браузере: уберём комментарии, пробелы и опциональные теги. Структура и вёрстка сохраняются. Бесплатно.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: 0, priceCurrency: "RUB" },
  };

  return (
    <>
      <SchemaOrg data={appSchema} />
      <Header />

      <main style={{ paddingTop: "50px" }}>
        {/* Hero */}
        <section
          style={{
            background: colors.surface.dark,
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
          aria-label="Компрессор HTML"
        >
          <Container>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Typography
                level="h1Hero"
                color={colors.text.white}
                style={{ marginBottom: "20px" }}
              >
                Компрессор HTML
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "640px", margin: "0 auto" }}
              >
                Сожмите HTML-код прямо в браузере — без сборщика, терминала и отправки на сервер.
              </Typography>
            </div>

            <MinifierTool language="html" />
          </Container>
        </section>

        {/* Для кого */}
        <Section bg="alt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Typography level="h2Sections" style={{ marginBottom: "16px" }}>
              Для кого
            </Typography>
            <p style={{ fontSize: "18px", lineHeight: "25.2px", color: colors.text.main, margin: 0, opacity: 0.7 }}>
              Компрессор HTML для email-верстальщиков, фронтендеров и контент-менеджеров
            </p>
          </div>

          <AudienceCards cards={audienceCards} />
        </Section>

        {/* Как это работает */}
        <Section bg="white">
          <Typography
            level="h2Sections"
            style={{ marginBottom: "48px", textAlign: "center" }}
          >
            Как это работает
          </Typography>
          <StepSwitcher steps={howSteps} />
        </Section>

        {/* Возможности сервиса */}
        <Section bg="white">
          <Typography
            level="h2Sections"
            style={{ marginBottom: "48px", textAlign: "center" }}
          >
            Возможности сервиса
          </Typography>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <FeatureHighlight
              title="Приватность"
              paragraphs={[
                "Сжатие выполняется полностью в браузере. Код не передаётся по сети, не сохраняется на сервере и не попадает в логи.",
              ]}
              imageSrc="/images/html-minifier/features_1.jpg"
              screenshotCaption="Визуал — приватность"
            />
            <FeatureHighlight
              title="Сжатие без потерь"
              paragraphs={[
                "Компрессор убирает только то, что не влияет на отображение: комментарии, лишние пробелы, переносы строк, необязательные атрибуты. Структура DOM и порядок тегов сохраняются — вёрстка письма или страницы не пострадает.",
              ]}
              imageSrc="/images/html-minifier/features_2.jpg"
              screenshotCaption="Визуал — сжатие без потерь" reverse
            />
            <FeatureHighlight
              title="Под лимиты почтовых клиентов"
              paragraphs={[
                "Gmail обрезает письма тяжелее 102 КБ — обрезанная часть прячется под ссылку «View entire message». Сжатие HTML помогает сложиться в лимит и не потерять трекинг переходов.",
              ]}
              imageSrc="/images/html-minifier/features_3.jpg"
              screenshotCaption="Визуал — под лимиты"
            />
          </div>
        </Section>

        {/* FAQ */}
        <Section bg="alt">
          <FAQ items={faqItems} />
        </Section>

        {/* CTA */}
        <CTABlock bannerSrc="/images/html-minifier/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
