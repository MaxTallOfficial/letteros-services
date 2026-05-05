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
  title: "Компрессор JavaScript онлайн — сжатие JS без отправки на сервер | Letteros",
  description:
    "Сжатие JavaScript прямо в браузере: уберём пробелы и комментарии, сократим локальные переменные. Логика сохраняется. Бесплатно.",
  openGraph: {
    title: "Компрессор JavaScript онлайн — сжатие JS без отправки на сервер | Letteros",
    description:
      "Сжатие JavaScript прямо в браузере: уберём пробелы и комментарии, сократим локальные переменные. Логика сохраняется. Бесплатно.",
    type: "website",
  },
};

const howSteps = [
  {
    id: "paste",
    label: "Вставьте код",
    description:
      "Скопируйте JS-фрагмент и вставьте в левое поле — скрипт виджета, скрипт аналитики или модуль для лендинга. Компрессор принимает код любого объёма и обрабатывает локально.",
    screenshotCaption: "Скриншот с вставленным JS",
    imageSrc: "/images/js-minifier/howto_1.jpg",
  },
  {
    id: "result",
    label: "Получите результат",
    description:
      "Сжатый JS появится в правом поле автоматически — кнопку нажимать не нужно. Компрессор уберёт комментарии и пробелы, сократит имена локальных переменных. Логика скрипта сохраняется.",
    screenshotCaption: "Скриншот с результатом",
    imageSrc: "/images/js-minifier/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Нажмите кнопку копирования — минифицированный код готов к вставке в письмо, на сайт или в сборку проекта.",
    screenshotCaption: "Скриншот с кнопкой копирования",
    imageSrc: "/images/js-minifier/howto_3.jpg",
  },
];

const audienceCards = [
            {
              title: "Фронтенд-разработчики",
              description: "Сжать один скрипт без подключения сборщика — когда нужен компактный JS для лендинга, виджета или подключения к стороннему сайту. Без npm, без webpack, без выгрузки.",
              imageSrc: "/images/js-minifier/audience_1.png",
            },
            {
              title: "Веб-разработчики",
              description: "Сжать JS-фрагмент перед коммитом, отправкой на ревью или передачей клиенту. Логика сохраняется — переименовываются только локальные переменные.",
              imageSrc: "/images/js-minifier/audience_2.png",
            },
            {
              title: "Контент-менеджеры",
              description: "Скрипты аналитики, форм и чат-виджетов лучше добавлять на сайт в сжатом виде. Вставьте код — получите компактную версию без технических знаний.",
              imageSrc: "/images/js-minifier/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Очистите JavaScript от лишнего за секунды. Код обрабатывается в браузере и не передаётся на сторонний сервер.",
              imageSrc: "/images/js-minifier/audience_4.png",
            },
          ];

const faqItems = [
    {
      question: "Не сломается ли логика после сжатия?",
      answer: "Нет. Компрессор переименовывает только локальные переменные внутри функций — те, что не видны снаружи. Глобальные имена, обращения к API и внешние зависимости остаются как были.",
    },
    {
      question: "Поддерживается ли современный JavaScript?",
      answer: "Да. Стрелочные функции, async/await, деструктуризация, классы, шаблонные строки — всё это сжимается корректно. Транспилировать через Babel перед сжатием не нужно.",
    },
    {
      question: "Чем сервис отличается от Terser или UglifyJS?",
      answer: "Это те же подходы, упакованные в браузерный интерфейс. Сборщики оправданы для проектов с CI и пайплайном. Для разовой задачи — один скрипт, один виджет — проще вставить код в браузер.",
    },
    {
      question: "Можно ли сжать скрипт от стороннего сервиса (Google Analytics, чат)?",
      answer: "Да, если у вас есть исходный код. Компрессор работает с любым валидным JS — независимо от того, чей он и куда будет вставлен.",
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
    name: "Компрессор JavaScript",
    url: "https://letteros.com/js-minifier",
    description: "Сжатие JavaScript прямо в браузере: уберём пробелы и комментарии, сократим локальные переменные. Логика сохраняется. Бесплатно.",
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
          aria-label="Компрессор JavaScript"
        >
          <Container>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Typography
                level="h1Hero"
                color={colors.text.white}
                style={{ marginBottom: "20px" }}
              >
                Компрессор JavaScript
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "640px", margin: "0 auto" }}
              >
                Сожмите JavaScript-код прямо в браузере — без сборщика и без отправки на сервер.
              </Typography>
            </div>

            <MinifierTool language="js" />
          </Container>
        </section>

        {/* Для кого */}
        <Section bg="alt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Typography level="h2Sections" style={{ marginBottom: "16px" }}>
              Для кого
            </Typography>
            <p style={{ fontSize: "18px", lineHeight: "25.2px", color: colors.text.main, margin: 0, opacity: 0.7 }}>
              Компрессор JavaScript для фронтендеров, веб-разработчиков и контент-менеджеров
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
              imageSrc="/images/js-minifier/features_1.jpg"
              screenshotCaption="Визуал — приватность"
            />
            <FeatureHighlight
              title="Сохранение логики"
              paragraphs={[
                "Компрессор не меняет поведение скрипта: убираются только комментарии и пробелы, локальные переменные получают короткие имена. Глобальные функции, API и внешние ссылки остаются нетронутыми.",
              ]}
              imageSrc="/images/js-minifier/features_2.jpg"
              screenshotCaption="Визуал — сохранение логики" reverse
            />
            <FeatureHighlight
              title="Современный синтаксис"
              paragraphs={[
                "Поддерживаются стрелочные функции, async/await, классы, шаблонные строки и другие конструкции ES6+. Скрипт сжимается без потерь и без необходимости в Babel.",
              ]}
              imageSrc="/images/js-minifier/features_3.jpg"
              screenshotCaption="Визуал — современный JS"
            />
          </div>
        </Section>

        {/* FAQ */}
        <Section bg="alt">
          <FAQ items={faqItems} />
        </Section>

        {/* CTA */}
        <CTABlock bannerSrc="/images/js-minifier/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
