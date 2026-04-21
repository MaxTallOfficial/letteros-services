import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { TypographTool } from "@/src/components/typograph/TypographTool";
import { IconBolt, IconQuotes, IconFree, IconPencil, IconDocument, IconEnvelope, IconPerson, IconPointBook, IconPointType, IconPointClick, IconPointCheck, IconPointClipboard, IconPointBrain, IconPointQuote, IconPointClock } from "@/src/components/ui/icons";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import FeatureGrid from "@/src/components/landing/FeatureGrid";
import CTABlock from "@/src/components/landing/CTABlock";
import AudienceCards from "@/src/components/landing/AudienceCards";

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
      "Скопируйте текст из любого источника — документа, письма, CMS, мессенджера — и вставьте в левое поле. Типограф начнёт обработку автоматически, результат появится в правом поле.",
    screenshotCaption: "Скриншот с вставленным текстом — до",
    imageSrc: "/images/typograph/howto_1.jpg",
  },
  {
    id: "check",
    label: "Проверьте изменения",
    description:
      "Счётчик исправлений покажет количество замен по категориям: сколько кавычек заменено, сколько тире расставлено, сколько неразрывных пробелов добавлено. Наведите на иконку — и увидите детальную статистику.",
    screenshotCaption: "Скриншот результата с тултипом статистики",
    imageSrc: "/images/typograph/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Нажмите кнопку копирования в поле результата и вставьте готовый текст туда, где он нужен: в CMS, в письмо, в документ.",
    screenshotCaption: "Скриншот с кнопкой копирования",
    imageSrc: "/images/typograph/howto_3.jpg",
  }
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
                Приводит текст в порядок по правилам русской типографики.
                <br />
                Кавычки, тире, неразрывные пробелы и спецсимволы.
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
              description: "Типограф автоматически применяет правила русской типографики: заменяет прямые кавычки на «ёлочки», расставляет тире, убирает лишние пробелы и добавляет неразрывные. Текст готов к публикации за секунды.",
              points: [
                { icon: <IconPointBook />, text: "Полный набор правил русской типографики" },
                { icon: <IconPointType />, text: "Кавычки, тире, пробелы и спецсимволы — автоматически" },
                { icon: <IconPointClick />, text: "Обработка всего текста за одно действие" },
              ],
              imageSrc: "/images/typograph/audience_1.png",
            },
            {
              title: "Контент-менеджеры",
              description: "Типограф приводит в порядок текст из любого источника — CMS, документа, письма. Достаточно вставить текст, и результат появится автоматически.",
              points: [
                { icon: <IconPointCheck />, text: "Чистит текст из любого источника" },
                { icon: <IconPointClipboard />, text: "Автоматическая обработка при вставке" },
                { icon: <IconPointBrain />, text: "Не нужно запоминать правила типографики" },
              ],
              imageSrc: "/images/typograph/audience_2.png",
            },
            {
              title: "Email-маркетологи",
              description: "Типограф обрабатывает текст рассылки перед вёрсткой: корректные кавычки, правильные тире, отсутствие висячих предлогов. Аккуратная типографика формирует впечатление о бренде.",
              points: [
                { icon: <IconPointQuote />, text: "Корректные кавычки и тире в тексте рассылки" },
                { icon: <IconPointCheck />, text: "Отсутствие висячих предлогов в каждом письме" },
                { icon: <IconPointClock />, text: "Обработка за секунды перед вёрсткой" },
              ],
              imageSrc: "/images/typograph/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Типограф приводит в порядок любой текст — от письма клиенту до подписи в презентации. Обработка происходит в браузере, текст никуда не отправляется.",
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

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "60px" }}>
            <FeatureHighlight
              title="Правильные символы вместо суррогатов"
              paragraphs={[
                'Типограф заменяет прямые кавычки на «ёлочки», корректно обрабатывает вложенные конструкции и расставляет тире вместо дефисов между словами. Дефисы внутри слов остаются на месте.'
              ]}
              imageSrc="/images/typograph/features_1.jpg"
              screenshotCaption="Визуал — примеры до/после: кавычки и тире"
            />
            <FeatureHighlight
              title="Никаких висячих предлогов"
              paragraphs={[
                "Типограф вставляет неразрывный пробел после предлогов, союзов и инициалов. Короткое слово «приклеивается» к следующему и переносится вместе с ним."
              ]}
              imageSrc="/images/typograph/features_2.jpg"
              screenshotCaption="Визуал — пример текста с висячими предлогами и без"
              reverse
            />
            <FeatureHighlight
              title="Текст не покидает ваш браузер"
              paragraphs={[
                "Текст обрабатывается полностью в браузере. Не передаётся по сети, не сохраняется на сервере, не попадает в логи."
              ]}
              imageSrc="/images/typograph/features_3.jpg"
              screenshotCaption="Визуал — схема «текст → браузер → результат», без сервера"
            />
          </div>

          <FeatureGrid
            features={[
              {
                icon: <IconBolt />,
                title: "Автоматическая обработка",
                text: "Результат появляется при вставке текста. При ручном вводе — с небольшой задержкой.",
              },
              {
                icon: <IconQuotes />,
                title: "Статистика исправлений",
                text: "Количество замен по категориям: кавычки, тире, пробелы. Видно сразу после обработки.",
              },
              {
                icon: <IconFree />,
                title: "Бесплатно",
                text: "Без лимитов и скрытых условий.",
              }
            ]}
          />
        </Section>

        {/* CTA */}
        <CTABlock bannerSrc="/images/typograph/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
