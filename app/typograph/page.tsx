import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { TypographTool } from "@/src/components/typograph/TypographTool";
import { IconBolt, IconQuotes, IconFree, IconPencil, IconDocument, IconEnvelope, IconPerson } from "@/src/components/ui/icons";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import FeatureGrid from "@/src/components/landing/FeatureGrid";
import CTABlock from "@/src/components/landing/CTABlock";

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
                Letteros Typograph
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
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
          <Typography
            level="h2Sections"
            style={{ marginBottom: "48px", textAlign: "center" }}
          >
            Всем, кто работает с текстом
          </Typography>

          <style>{`
            .l-audience-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px 60px; }
            @media (max-width: 767px) { .l-audience-grid { grid-template-columns: 1fr; gap: 40px; } }
          `}</style>
          <div className="l-audience-grid">
            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconPencil size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Копирайтеры и редакторы
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                Текст после написания нуждается в типографической чистке. Делать это вручную — рутина, которая отнимает время и пропускает ошибки. Типограф применяет правила русской типографики автоматически — от кавычек до спецсимволов.
              </p>
                          </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconDocument size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Контент-менеджеры
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                Текст из CMS, из писем или из Google Docs приходит с прямыми кавычками и дефисами вместо тире. Вставить в типограф перед публикацией — одно действие, которое решает все проблемы разом.
              </p>
                          </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconEnvelope size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Email-маркетологи
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                Типографически чистый текст в рассылке — признак профессионализма. Разница между дефисом и тире видна читателю, даже если он не может её назвать. Типограф обрабатывает текст перед вёрсткой за секунду.
              </p>
                          </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconPerson size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Все остальные
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: 0 }}>
                Любой текст, который кто-то будет читать, заслуживает правильных кавычек и тире. Типограф приводит в порядок всё за секунду.
              </p>
            </article>
          </div>
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
