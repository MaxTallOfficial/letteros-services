import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { TypographTool } from "@/src/components/typograph/TypographTool";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import CTABlock from "@/src/components/landing/CTABlock";
import AudienceCards from "@/src/components/landing/AudienceCards";
import { FAQ } from "@/src/components/landing/FAQ";
import { SchemaOrg } from "@/src/components/seo/SchemaOrg";

export const metadata: Metadata = {
  title: "Letteros Typograph — типограф онлайн",
  description:
    "Расставляет кавычки-ёлочки, тире и неразрывные пробелы автоматически. Текст обрабатывается в браузере и никуда не отправляется.",
  openGraph: {
    title: "Letteros Typograph — типограф онлайн",
    description:
      "Расставляет кавычки-ёлочки, тире и неразрывные пробелы автоматически. Текст обрабатывается в браузере и никуда не отправляется.",
    type: "website",
  },
};

const howSteps = [
  {
    id: "paste",
    label: "Вставьте текст",
    description:
      "Скопируйте текст из любого источника — документа, письма, CMS, мессенджера — и вставьте в левое поле. Типограф начнёт обработку автоматически, результат появится справа.",
    screenshotCaption: "Скриншот с вставленным текстом — до",
    imageSrc: "/images/typograph/howto_1.jpg",
  },
  {
    id: "check",
    label: "Проверьте изменения",
    description:
      "Счётчик исправлений покажет количество замен по категориям: сколько кавычек заменено, сколько тире расставлено, сколько неразрывных пробелов добавлено. Наведите на иконку — увидите детальную статистику.",
    screenshotCaption: "Скриншот результата с тултипом статистики",
    imageSrc: "/images/typograph/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Нажмите кнопку копирования и вставьте готовый текст туда, где он нужен: в CMS, в письмо или в готовый документ.",
    screenshotCaption: "Скриншот с кнопкой копирования",
    imageSrc: "/images/typograph/howto_3.jpg",
  },
];


const faqItems = [
  { question: "Какие правила типографики применяет сервис?", answer: "Полный набор для русского языка: замена прямых кавычек на «ёлочки», расстановка тире вместо дефисов между словами, неразрывные пробелы после предлогов и инициалов, удаление лишних пробелов." },
  { question: "Куда уходит мой текст при обработке?", answer: "Никуда. Типограф работает в браузере на вашем устройстве. Текст не передаётся по сети, не сохраняется на сервере и не попадает в логи." },
  { question: "Что такое висячий предлог и почему его нужно убирать?", answer: "Это короткое слово (предлог, союз) в конце строки, оторванное от своего существительного. Типограф ставит после таких слов неразрывный пробел — слово переносится на следующую строку вместе с парой." },
  { question: "Сохраняет ли типограф разметку текста?", answer: "Простое форматирование (абзацы, переносы строк) сохраняется. HTML-теги и markdown-разметка остаются нетронутыми — обрабатывается только сам текст." },
  { question: "Можно ли применить только часть правил, например только кавычки?", answer: "Сейчас типограф применяет полный набор правил за одно действие. Точечная настройка не предусмотрена — это сделано ради скорости и предсказуемости результата." },
  { question: "Нужна ли регистрация?", answer: "Нет. Откройте страницу, вставьте текст и получите обработанный результат. Аккаунты и пароли не требуются." },
  { question: "Бесплатно ли это?", answer: "Да. Сервис бесплатный, без лимитов на длину текста и количество обработок. Нет скрытых условий и платных тарифов." },
];

export default function TypographPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Letteros Typograph — типограф онлайн",
    url: "https://letteros.com/typograph",
    description: "Расставит кавычки, тире и неразрывные пробелы по правилам русской типографики. Текст обрабатывается в браузере.",
    applicationCategory: "BusinessApplication",
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
          aria-label="Инструмент типографа"
        >
          <Container>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Typography
                level="h1Hero"
                color={colors.text.white}
                style={{ marginBottom: "20px" }}
              >
                Типограф
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "640px", margin: "0 auto" }}
              >
                Приведите текст к нормам русской типографики за секунды — без отправки на сторонний сервер. Без регистрации.
              </Typography>
            </div>

            <TypographTool />
          </Container>
        </section>

        {/* Для кого */}
        <Section bg="alt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Typography level="h2Sections" style={{ marginBottom: "16px" }}>
              Для кого
            </Typography>
            <p style={{ fontSize: "18px", lineHeight: "25.2px", color: colors.text.main, margin: 0, opacity: 0.7 }}>
              Для специалистов, которые каждый день готовят текст к публикации
            </p>
          </div>

          <AudienceCards cards={[
            {
              title: "Копирайтеры и редакторы",
              description: "Готовый текст требует ручной вычитки на типографику — это съедает время на каждой публикации. Типограф применит весь набор правил за одно действие: кавычки, тире, неразрывные пробелы.",
              imageSrc: "/images/typograph/audience_1.png",
            },
            {
              title: "Контент-менеджеры",
              description: "Текст из CMS, документа или письма приходит с разной типографикой. Вставьте его в типограф — результат появится автоматически, правила запоминать не нужно.",
              imageSrc: "/images/typograph/audience_2.png",
            },
            {
              title: "Email-маркетологи",
              description: "Текст рассылки нужно подготовить до вёрстки: корректные кавычки, правильные тире, никаких висячих предлогов. Типограф приведёт всё к норме за секунды — впечатление о бренде не пострадает.",
              imageSrc: "/images/typograph/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Любой текст — от письма клиенту до подписи в презентации — приведите к норме за одно действие. Обработка идёт в браузере, текст никуда не отправляется.",
              imageSrc: "/images/typograph/audience_4.png",
            },
          ]} />
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
              title="Кавычки и тире"
              paragraphs={[
                "Типограф заменяет прямые кавычки на «ёлочки», корректно обрабатывает вложенные конструкции и расставляет тире вместо дефисов между словами. Дефисы внутри слов остаются на месте.",
              ]}
              imageSrc="/images/typograph/features_1.jpg"
              screenshotCaption="Визуал — кавычки и тире"
            />
            <FeatureHighlight
              title="Неразрывные пробелы"
              paragraphs={[
                "Неразрывный пробел вставляется после предлогов, союзов и инициалов. Короткое слово «приклеивается» к следующему и переносится вместе с ним.",
              ]}
              imageSrc="/images/typograph/features_2.jpg"
              screenshotCaption="Визуал — неразрывные пробелы"
              reverse
            />
            <FeatureHighlight
              title="Приватность"
              paragraphs={[
                "Текст обрабатывается полностью в браузере. Не передаётся по сети, не сохраняется на сервере и не попадает в логи.",
              ]}
              imageSrc="/images/typograph/features_3.jpg"
              screenshotCaption="Визуал — приватность"
            />
          </div>
        </Section>

        {/* FAQ */}
        <Section bg="alt">
          <FAQ items={faqItems} />
        </Section>

        {/* CTA */}
        <CTABlock bannerSrc="/images/typograph/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
