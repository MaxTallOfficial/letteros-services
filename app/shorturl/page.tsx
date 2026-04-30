import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { HeroTabs } from "@/src/components/shorturl/HeroTabs";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import CTABlock from "@/src/components/landing/CTABlock";
import AudienceCards from "@/src/components/landing/AudienceCards";

export const metadata: Metadata = {
  title: "Letteros Short URL — сокращатель ссылок",
  description:
    "Короткий адрес, кастомный слаг и QR-код за одно действие. Работает без регистрации.",
  openGraph: {
    title: "Letteros Short URL — сокращатель ссылок",
    description:
      "Короткий адрес, кастомный слаг и QR-код за одно действие. Работает без регистрации.",
    type: "website",
  },
};

const howSteps = [
  {
    id: "paste",
    label: "Вставьте URL",
    description:
      "Скопируйте любой адрес и вставьте в поле — страницу сайта, документ, ссылку с UTM-параметрами. Сервис принимает адреса любой длины и проверяет их доступность перед сокращением.",
    screenshotCaption: "Скриншот формы с вставленной ссылкой",
    imageSrc: "/images/shorturl/howto_1.jpg",
  },
  {
    id: "customize",
    label: "Настройте под себя",
    description:
      "Задайте своё окончание адреса, чтобы ссылка читалась и запоминалась. Отключите проверку доступности, если уверены в ссылке или не хотите лишних запросов к серверу.",
    screenshotCaption: "Скриншот настроек — чекбоксы, поле кастомного слага",
    imageSrc: "/images/shorturl/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Короткая ссылка готова — скопируйте её одной кнопкой и поставьте в письмо, пост или макет. Срок действия — 90 дней.",
    screenshotCaption: "Скриншот результата — короткая ссылка + кнопка копирования",
    imageSrc: "/images/shorturl/howto_3.jpg",
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
                Сокращатель ссылок
              </Typography>
              <Typography
                level="body"
                as="p"
                color="rgba(255,255,255,0.7)"
                style={{ maxWidth: "640px", margin: "0 auto" }}
              >
                Получите короткий адрес с понятным окончанием, QR-код и проверку ссылки за одно действие.
              </Typography>
            </div>

            <HeroTabs />
          </Container>
        </section>

        {/* Для кого */}
        <Section bg="alt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Typography level="h2Sections" style={{ marginBottom: "16px" }}>
              Для кого
            </Typography>
            <p style={{ fontSize: "18px", lineHeight: "25.2px", color: colors.text.main, margin: 0, opacity: 0.7 }}>
              Для специалистов и команд, которые используют ссылки в коммуникации каждый день
            </p>
          </div>

          <AudienceCards cards={[
            {
              title: "Email-маркетологи",
              description: "Длинные адреса с UTM-метками выглядят подозрительно и ломают вёрстку. Получите короткий адрес с понятным окончанием — он не вызовет настороженности у получателя и аккуратно ляжет в текст рассылки.",
              imageSrc: "/images/shorturl/audience_1.png",
            },
            {
              title: "SMM-специалисты",
              description: "Длинная ссылка съедает символы и теряется в потоке. Сократите адрес и задайте собственное окончание — он будет узнаваемым и сообщит суть ещё до перехода.",
              imageSrc: "/images/shorturl/audience_2.png",
            },
            {
              title: "Дизайнеры и редакторы",
              description: "Длинный URL не помещается на слайд, визитку или в буклет. Сократите его до читаемой строки — её можно разместить в макете или поставить на печать.",
              imageSrc: "/images/shorturl/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Когда длинная ссылка не помещается в чат, мешает в документе или просто выглядит неаккуратно. Сократите её за секунды — без аккаунта, лимитов и условий.",
              imageSrc: "/images/shorturl/audience_4.png",
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
              title="Понятный адрес"
              paragraphs={[
                "Задайте окончание ссылки сами — и адрес перестанет выглядеть случайным набором символов. <code style=\"background:#F1F1F1;padding:2px 6px;border-radius:4px;font-size:14px\">letteros.com/s/price-list</code> читается, запоминается и нормально смотрится на визитке, слайде или в буклете. Допустимы латиница, цифры и дефис, длина — от 3 до 30 символов.",
              ]}
              imageSrc="/images/shorturl/features_1.jpg"
              screenshotCaption="Визуал — пример кастомного слага"
            />
            <FeatureHighlight
              title="QR-код"
              paragraphs={[
                "QR-код нужен там, где ссылку нельзя нажать: на печатных материалах, в офлайн-рекламе, на упаковке. Генератор работает на отдельной вкладке — вставьте адрес и скачайте код в PNG.",
              ]}
              imageSrc="/images/shorturl/features_2.jpg"
              screenshotCaption="Визуал — пример QR-кода"
              reverse
            />
            <FeatureHighlight
              title="Проверка URL"
              paragraphs={[
                "Сервис проверяет, что страница по указанному адресу существует и отвечает. Это защищает от распространения нерабочих ссылок. Проверка включена по умолчанию, но её можно отключить одним чекбоксом.",
              ]}
              imageSrc="/images/shorturl/features_3.jpg"
              screenshotCaption="Визуал — пример проверки URL"
            />
          </div>
        </Section>

        {/* CTA */}
        <CTABlock bannerSrc="/images/shorturl/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
