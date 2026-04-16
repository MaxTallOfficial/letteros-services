import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { CompressorTool } from "@/src/components/shortcode/CompressorTool";
import { IconFree, IconCode, IconBolt, IconEnvelope, IconDocument, IconPerson } from "@/src/components/ui/icons";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import FeatureGrid from "@/src/components/landing/FeatureGrid";
import CTABlock from "@/src/components/landing/CTABlock";

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
      "Переключите вкладку на HTML, CSS или JS. Каждая вкладка работает независимо: содержимое сохраняется при переключении. Можно параллельно сжимать HTML-шаблон и CSS-файл, не теряя результаты.",
    screenshotCaption: "Скриншот с выбором вкладки HTML/CSS/JS",
    imageSrc: "/images/shortcode/howto_1.jpg",
  },
  {
    id: "paste",
    label: "Вставьте код",
    description:
      "Скопируйте фрагмент и вставьте в левое поле. Сжатый результат появится в правом поле автоматически — нажимать ничего не нужно. Статистика под полями покажет размер до и после в символах и байтах.",
    screenshotCaption: "Скриншот с вставленным кодом и результатом",
    imageSrc: "/images/shortcode/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Нажмите кнопку копирования в поле результата. Минифицированный код готов к вставке — в письмо, на сайт, в сборку.",
    screenshotCaption: "Скриншот результата со статистикой и кнопкой копирования",
    imageSrc: "/images/shortcode/howto_3.jpg",
  }
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
                Letteros Shortcode
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Сжимает HTML, CSS и JS до минимального размера.
                <br />
                Работает в браузере, код остаётся у вас.
              </Typography>
            </div>

            <CompressorTool />
          </Container>
        </section>

        {/* Для кого */}
        <Section bg="alt">
          <Typography
            level="h2Sections"
            style={{ marginBottom: "48px", textAlign: "center" }}
          >
            Всем, кто работает с кодом
          </Typography>

          <style>{`
            .l-audience-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px 60px; }
            @media (max-width: 767px) { .l-audience-grid { grid-template-columns: 1fr; gap: 40px; } }
          `}</style>
          <div className="l-audience-grid">
            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconEnvelope size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Email-верстальщики
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                HTML-письмо перед отправкой должно весить как можно меньше — почтовые клиенты обрезают письма, превышающие допустимый объём. Минификация убирает комментарии, пробельные символы и необязательные атрибуты, сохраняя структуру.
              </p>
                          </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconCode size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Фронтенд-разработчики
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                Иногда нужно сжать конкретный файл или блок кода перед вставкой в продакшен, не запуская сборщик. Компрессор делает ровно одну вещь — принимает код и возвращает минифицированную версию. Без настройки окружения.
              </p>
                          </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconDocument size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Контент-менеджеры
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                HTML-виджеты, встраиваемые блоки, сторонние скрипты — всё это можно сжать перед добавлением на сайт. Навыков программирования не требуется: вставьте код, скопируйте результат.
              </p>
                          </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconPerson size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Все остальные
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: 0 }}>
                Иногда нужно убрать из кода лишнее. Компрессор делает это за секунду — без регистрации и без передачи кода на сервер.
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
              title="Код не покидает ваш браузер"
              paragraphs={[
                "Минификация выполняется полностью в браузере. Код не передаётся по сети, не сохраняется на сервере, не попадает в логи."
              ]}
              imageSrc="/images/shortcode/features_1.jpg"
              screenshotCaption="Визуал — схема «код → браузер → результат», без сервера"
            />
            <FeatureHighlight
              title="HTML, CSS и JS без переключения между инструментами"
              paragraphs={[
                "Три вкладки — три независимых редактора. Переключение не сбрасывает данные. Подсветка синтаксиса работает в обоих полях и переключается вместе с вкладкой."
              ]}
              imageSrc="/images/shortcode/features_2.jpg"
              screenshotCaption="Визуал — три вкладки с разным кодом"
              reverse
            />
            <FeatureHighlight
              title="Результат появляется сразу при вставке"
              paragraphs={[
                "Кнопки «Сжать» нет — результат генерируется автоматически. Статистика (размер до, после и процент экономии) обновляется вместе с результатом."
              ]}
              imageSrc="/images/shortcode/features_3.jpg"
              screenshotCaption="Визуал — автообработка, статистика"
            />
          </div>

          <FeatureGrid
            features={[
              {
                icon: <IconCode />,
                title: "Без регистрации",
                text: "Открываете страницу и сразу работаете. Никаких аккаунтов и паролей.",
              },
              {
                icon: <IconBolt />,
                title: "Без ограничений по размеру кода",
                text: "Вставляйте фрагменты любого объёма. Обработка происходит на вашем устройстве.",
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
        <CTABlock bannerSrc="/images/shortcode/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
