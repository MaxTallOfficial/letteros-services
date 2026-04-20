import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { HeroTabs } from "@/src/components/shorturl/HeroTabs";
import { IconFree, IconUserCheck, IconTimer, IconEnvelope, IconMegaphone, IconPencil, IconPerson, IconPointButton, IconPointSparkle, IconPointShield, IconPointCompress, IconPointStar, IconPointLink, IconPointEye, IconPointPhone, IconPointPrint } from "@/src/components/ui/icons";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import FeatureGrid from "@/src/components/landing/FeatureGrid";
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
      "Скопируйте любой адрес и вставьте в поле — страницу сайта, документ, ссылку с UTM-параметрами. Сервис принимает адреса любой длины и автоматически проверяет их доступность перед сокращением.",
    screenshotCaption: "Скриншот формы с вставленной ссылкой",
    imageSrc: "/images/shorturl/howto_1.jpg",
  },
  {
    id: "customize",
    label: "Настройте под себя",
    description:
      "Задайте тематическое окончание ссылки, если хотите сделать адрес осмысленным. Отключите проверку доступности, если уверены в ссылке или не хотите лишних запросов к вашему серверу.",
    screenshotCaption: "Скриншот настроек — чекбоксы, поле кастомного слага",
    imageSrc: "/images/shorturl/howto_2.jpg",
  },
  {
    id: "copy",
    label: "Скопируйте результат",
    description:
      "Короткая ссылка готова. Скопируйте её одной кнопкой. Дата деактивации видна сразу — ссылка работает 90 дней с момента создания.",
    screenshotCaption: "Скриншот результата — короткая ссылка + кнопка копирования",
    imageSrc: "/images/shorturl/howto_3.jpg",
  }
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
                style={{ maxWidth: "480px", margin: "0 auto" }}
              >
                Превращает любой длинный адрес в короткую ссылку.
                <br />
                Кастомный слаг, QR-код и проверка URL.
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
              description: "Короткая ссылка с понятным окончанием выглядит профессионально в тексте письма и не вызывает настороженности у получателя. Подписчик видит осмысленный адрес, а не случайный набор символов.",
              points: [
                { icon: <IconPointButton />, text: "Аккуратный адрес в тексте и кнопках рассылки" },
                { icon: <IconPointSparkle />, text: "Понятное окончание вместо случайных символов" },
                { icon: <IconPointShield />, text: "Доверие получателя к ссылке в письме" },
              ],
              imageSrc: "/images/shorturl/audience_1.png",
            },
            {
              title: "SMM-специалисты",
              description: "Короткий адрес с собственным окончанием экономит символы в любом тексте — от поста до описания профиля. Ссылка становится запоминаемой и сообщает суть ещё до перехода.",
              points: [
                { icon: <IconPointCompress />, text: "Экономит символы в постах, описаниях и комментариях" },
                { icon: <IconPointStar />, text: "Собственное окончание делает ссылку узнаваемой" },
                { icon: <IconPointLink />, text: "Один адрес для всех площадок" },
              ],
              imageSrc: "/images/shorturl/audience_2.png",
            },
            {
              title: "Дизайнеры и редакторы",
              description: "Короткий адрес не отвлекает от содержания макета, презентации или документа. Его можно разместить на визитке, слайде или в буклете — и он останется читаемым.",
              points: [
                { icon: <IconPointEye />, text: "Читаемая ссылка на слайде или визитке" },
                { icon: <IconPointPhone />, text: "Можно продиктовать по телефону или запомнить" },
                { icon: <IconPointPrint />, text: "Не нарушает оформление печатных материалов" },
              ],
              imageSrc: "/images/shorturl/audience_3.png",
            },
            {
              title: "Все остальные",
              description: "Сокращатель превращает любую ссылку в короткий и понятный адрес за одно действие. Удобно для отправки в чат, вставки в комментарий или устного диктования.",
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

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "60px" }}>
            <FeatureHighlight
              title="Кастомный слаг"
              paragraphs={[
                "Кастомный слаг заменяет случайный код на осмысленное слово. Вместо <code style=\"background:#F1F1F1;padding:2px 6px;border-radius:4px;font-size:14px\">letteros.com/s/x7k9m2</code> вы получаете <code style=\"background:#F1F1F1;padding:2px 6px;border-radius:4px;font-size:14px\">letteros.com/s/price-list</code> — такой адрес можно разместить на слайде или продиктовать по телефону. Допустимые символы — латиница, цифры и дефис. Длина — от трёх до тридцати символов."
              ]}
              imageSrc="/images/shorturl/features_1.jpg"
              screenshotCaption="Визуал — пример кастомного слага"
            />
            <FeatureHighlight
              title="Генератор QR-кода для любой ссылки"
              paragraphs={[
                "QR-код нужен там, где ссылку нельзя нажать: на печатных материалах, в офлайн-рекламе, на упаковке. Генератор работает на отдельной вкладке — вставьте любую ссылку и скачайте QR-код в PNG."
                
              ]}
              imageSrc="/images/shorturl/features_2.jpg"
              screenshotCaption="Визуал — пример QR-кода"
              reverse
            />
            <FeatureHighlight
              title="Проверка доступности перед сокращением"
              paragraphs={[
                "Сервис проверяет, что страница по указанному адресу существует и отвечает. Это защищает от распространения нерабочих ссылок. Проверка включена по умолчанию, но её можно отключить одним чекбоксом."
                
              ]}
              imageSrc="/images/shorturl/features_3.jpg"
              screenshotCaption="Визуал — пример проверки URL"
            />
          </div>

          <FeatureGrid
            features={[
              {
                icon: <IconUserCheck />,
                title: "Без регистрации",
                text: "Открываете страницу и сразу работаете. Никаких аккаунтов и паролей.",
              },
              {
                icon: <IconTimer />,
                title: "Срок 90 дней",
                text: "Дата деактивации видна сразу после создания ссылки.",
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
        <CTABlock bannerSrc="/images/shorturl/cta_banner.jpg" />
      </main>

      <Footer />
    </>
  );
}
