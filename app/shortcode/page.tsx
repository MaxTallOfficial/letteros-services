import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { CompressorTool } from "@/src/components/shortcode/CompressorTool";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import CTABlock from "@/src/components/landing/CTABlock";
import AudienceCards from "@/src/components/landing/AudienceCards";

export const metadata: Metadata = {
  title: "Letteros Shortcode — компрессор кода",
  description:
    "Минифицирует HTML, CSS и JS прямо в браузере. Код никуда не отправляется.",
  openGraph: {
    title: "Letteros Shortcode — компрессор кода",
    description:
      "Минифицирует HTML, CSS и JS прямо в браузере. Код никуда не отправляется.",
    type: "website",
  },
};

const howSteps = [
  {
    id: "lang",
    label: "Выберите язык",
    description:
      "Откройте вкладку HTML, CSS или JS под нужный код. Каждая работает независимо — содержимое сохраняется при переключении, можно параллельно сжимать шаблон письма и таблицу стилей.",
    screenshotCaption: "Скриншот с выбором вкладки HTML/CSS/JS",
    imageSrc: "/images/shortcode/howto_1.jpg",
  },
  {
    id: "paste",
    label: "Вставьте код",
    description:
      "Скопируйте фрагмент в левое поле — сжатый результат появится в правом автоматически, кнопку нажимать не нужно. Статистика под полями покажет размер до и после в символах и байтах.",
    screenshotCaption: "Скриншот с вставленным кодом и результатом",
    imageSrc: "/images/shortcode/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Нажмите кнопку копирования — минифицированный код готов к вставке в письмо, на сайт или в сборку проекта.",
    screenshotCaption: "Скриншот результата со статистикой и кнопкой копирования",
    imageSrc: "/images/shortcode/howto_3.jpg",
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
                style={{ maxWidth: "640px", margin: "0 auto" }}
              >
                Сожмите HTML, CSS и JS прямо в браузере — без сборщика и без отправки на сервер.
              </Typography>
            </div>

            <CompressorTool />
          </Container>
        </section>

        {/* Для кого */}
        <Section bg="alt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Typography level="h2Sections" style={{ marginBottom: "16px" }}>
              Для кого
            </Typography>
            <p style={{ fontSize: "18px", lineHeight: "25.2px", color: colors.text.main, margin: 0, opacity: 0.7 }}>
              Для специалистов, которые работают с HTML, CSS и JS каждый день
            </p>
          </div>

          <AudienceCards cards={[
            {
              title: "Email-верстальщики",
              description: "HTML-письмо нужно сжать перед отправкой, чтобы не упереться в лимиты почтовых клиентов. Компрессор уберёт лишнее, не трогая структуру и вёрстку.",
              imageSrc: "/images/shortcode/audience_1.png",
            },
            {
              title: "Фронтенд-разработчики",
              description: "Минифицировать один файл, когда сборщик и терминал избыточны. Вставьте код в браузер — результат появится без npm и зависимостей.",
              imageSrc: "/images/shortcode/audience_2.png",
            },
            {
              title: "Контент-менеджеры",
              description: "Виджеты и сторонние скрипты нужно сжать перед добавлением на сайт. Вставьте код — результат появится сам, технические знания и сборщики не нужны.",
              imageSrc: "/images/shortcode/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Очистите HTML, CSS или JS от лишнего за секунды. Код обрабатывается в браузере и не передаётся на сторонний сервер.",
              imageSrc: "/images/shortcode/audience_4.png",
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
              title="Приватность"
              paragraphs={[
                "Минификация выполняется полностью в браузере. Код не передаётся по сети, не сохраняется на сервере и не попадает в логи.",
              ]}
              imageSrc="/images/shortcode/features_1.jpg"
              screenshotCaption="Визуал — приватность"
            />
            <FeatureHighlight
              title="Три языка в одном интерфейсе"
              paragraphs={[
                "Три вкладки — три независимых редактора. Переключение не сбрасывает данные. Подсветка синтаксиса работает в обоих полях и переключается вместе с вкладкой.",
              ]}
              imageSrc="/images/shortcode/features_2.jpg"
              screenshotCaption="Визуал — три вкладки с разным кодом"
              reverse
            />
            <FeatureHighlight
              title="Мгновенная обработка"
              paragraphs={[
                "Кнопки «Сжать» нет — результат генерируется автоматически. Статистика (размер до, после и процент экономии) обновляется вместе с результатом.",
              ]}
              imageSrc="/images/shortcode/features_3.jpg"
              screenshotCaption="Визуал — автообработка, статистика"
            />
          </div>
        </Section>

        {/* CTA */}
        <CTABlock bannerSrc="/images/shortcode/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
