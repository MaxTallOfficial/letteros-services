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
  title: "Компрессор CSS онлайн — сжатие стилей без отправки на сервер | Letteros",
  description:
    "Сжатие CSS прямо в браузере: уберём пробелы, комментарии, дубли и сократим запись цветов. Бесплатно, без регистрации.",
  openGraph: {
    title: "Компрессор CSS онлайн — сжатие стилей без отправки на сервер | Letteros",
    description:
      "Сжатие CSS прямо в браузере: уберём пробелы, комментарии, дубли и сократим запись цветов. Бесплатно, без регистрации.",
    type: "website",
  },
};

const howSteps = [
  {
    id: "paste",
    label: "Вставьте код",
    description:
      "Скопируйте CSS и вставьте в левое поле — отдельный файл стилей, inline-стили из email-письма или фрагмент кода с лендинга. Компрессор принимает фрагменты любого размера.",
    screenshotCaption: "Скриншот с вставленным CSS",
    imageSrc: "/images/css-minifier/howto_1.jpg",
  },
  {
    id: "result",
    label: "Получите результат",
    description:
      "Сжатый CSS появится в правом поле автоматически — кнопку нажимать не нужно. Компрессор уберёт пробелы, комментарии и лишние точки с запятой, сократит запись цветов и значений CSS.",
    screenshotCaption: "Скриншот с результатом",
    imageSrc: "/images/css-minifier/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Нажмите кнопку копирования — минифицированный код готов к вставке в письмо, на сайт или в сборку проекта.",
    screenshotCaption: "Скриншот с кнопкой копирования",
    imageSrc: "/images/css-minifier/howto_3.jpg",
  },
];

const audienceCards = [
            {
              title: "Фронтенд-разработчики",
              description: "Сжать CSS-файл для продакшена, когда полноценный пайплайн с PostCSS избыточен. Вставьте код в браузер — получите минифицированную версию без npm и зависимостей.",
              imageSrc: "/images/css-minifier/audience_1.png",
            },
            {
              title: "Email-верстальщики",
              description: "После CSS-инлайнера в стилях остаётся много лишнего — комментарии, пробелы, дубли. Компрессор почистит код перед вставкой в шаблон письма.",
              imageSrc: "/images/css-minifier/audience_2.png",
            },
            {
              title: "Веб-дизайнеры",
              description: "Сожмите CSS перед передачей в разработку или загрузкой на лендинг. Меньший вес — выше скорость загрузки и лучше Core Web Vitals.",
              imageSrc: "/images/css-minifier/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Очистите CSS от лишнего за секунды. Код обрабатывается в браузере и не передаётся на сторонний сервер.",
              imageSrc: "/images/css-minifier/audience_4.png",
            },
          ];

const faqItems = [
    {
      question: "Сохраняются ли медиазапросы и анимации?",
      answer: "Да. Компрессор не трогает <code>@media</code>, <code>@keyframes</code> и другие правила верхнего уровня. Изменяется только форматирование — пробелы, переносы, комментарии.",
    },
    {
      question: "Что происходит с цветами и единицами измерения?",
      answer: "Длинные записи сокращаются до коротких эквивалентов: <code>#ffffff</code> — <code>#fff</code>, <code>0px</code> — <code>0</code>, <code>margin: 5px 5px 5px 5px</code> — <code>margin: 5px</code>. Визуально результат не меняется.",
    },
    {
      question: "Зачем сжимать CSS, если есть препроцессор?",
      answer: "Препроцессоры (Sass, Less) генерируют читаемый CSS для разработки — там много пробелов и комментариев. Перед публикацией стили имеет смысл сжать, особенно если в проекте нет полного пайплайна.",
    },
    {
      question: "Можно ли сжать inline-стили из email-письма?",
      answer: "Да. После CSS-инлайнера в <code>style</code>-атрибутах остаётся лишнее — компрессор почистит каждый блок и вернёт компактную версию для вставки в шаблон.",
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
    name: "Компрессор CSS",
    url: "https://letteros.com/css-minifier",
    description: "Сжатие CSS прямо в браузере: уберём пробелы, комментарии, дубли и сократим запись цветов. Бесплатно, без регистрации.",
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
          aria-label="Компрессор CSS"
        >
          <Container>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Typography
                level="h1Hero"
                color={colors.text.white}
                style={{ marginBottom: "20px" }}
              >
                Компрессор CSS
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "640px", margin: "0 auto" }}
              >
                Сожмите CSS-код прямо в браузере — без сборщика, терминала и отправки на сервер.
              </Typography>
            </div>

            <MinifierTool language="css" />
          </Container>
        </section>

        {/* Для кого */}
        <Section bg="alt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Typography level="h2Sections" style={{ marginBottom: "16px" }}>
              Для кого
            </Typography>
            <p style={{ fontSize: "18px", lineHeight: "25.2px", color: colors.text.main, margin: 0, opacity: 0.7 }}>
              Компрессор CSS для фронтендеров, email-верстальщиков и веб-дизайнеров
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
              imageSrc="/images/css-minifier/features_1.jpg"
              screenshotCaption="Визуал — приватность"
            />
            <FeatureHighlight
              title="Сжатие без поломки правил"
              paragraphs={[
                "Компрессор не трогает медиазапросы, важные «!important»-правила и порядок селекторов. Убираются только пробелы, комментарии и избыточный синтаксис — каскад работает как до сжатия.",
              ]}
              imageSrc="/images/css-minifier/features_2.jpg"
              screenshotCaption="Визуал — сжатие без поломки" reverse
            />
            <FeatureHighlight
              title="Меньший вес для скорости"
              paragraphs={[
                "Сжатый CSS грузится быстрее — это влияет на Core Web Vitals и позиции в поисковой выдаче. Особенно заметно на стилях, прошедших через инлайнер или препроцессор.",
              ]}
              imageSrc="/images/css-minifier/features_3.jpg"
              screenshotCaption="Визуал — скорость"
            />
          </div>
        </Section>

        {/* FAQ */}
        <Section bg="alt">
          <FAQ items={faqItems} />
        </Section>

        {/* CTA */}
        <CTABlock bannerSrc="/images/css-minifier/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
