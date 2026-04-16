import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header";
import { Footer } from "@/src/components/shared/Footer";
import { Container } from "@/src/components/layout/Container";
import { Typography } from "@/src/components/ui/Typography";
import { HeroTabs } from "@/src/components/shorturl/HeroTabs";
import { IconFree, IconUserCheck, IconTimer, IconEnvelope, IconMegaphone, IconPencil, IconPerson } from "@/src/components/ui/icons";
import { colors } from "@/tokens";
import Section from "@/src/components/landing/Section";
import StepSwitcher from "@/src/components/landing/StepSwitcher";
import FeatureHighlight from "@/src/components/landing/FeatureHighlight";
import FeatureGrid from "@/src/components/landing/FeatureGrid";
import CTABlock from "@/src/components/landing/CTABlock";

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
                Letteros Short URL
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
          <Typography
            level="h2Sections"
            style={{ marginBottom: "48px", textAlign: "center" }}
          >
            Всем, кто работает со ссылками
          </Typography>

          <style>{`
            .l-audience-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px 60px; }
            @media (max-width: 767px) { .l-audience-grid { grid-template-columns: 1fr; gap: 40px; } }
          `}</style>
          <div className="l-audience-grid">
            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconEnvelope size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Email-маркетологи
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                Ссылки с UTM-метками могут занимать несколько строк и выглядят как случайный набор символов. В email-рассылке такой адрес ломает вёрстку, вызывает настороженность у получателя и снижает кликабельность.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: 0 }}>
                Короткая ссылка решает все эти проблемы. Она компактная, выглядит аккуратно в любом почтовом клиенте и не вызывает подозрений. Тематическое окончание делает адрес осмысленным — получатель видит <code>letteros.com/s/price-list</code>, а не <code>letteros.com/s/x7k9m2</code>.
              </p>
            </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconMegaphone size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                SMM-специалисты
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                В описании профиля и в постах место ограничено. Длинная ссылка с параметрами отслеживания занимает половину допустимого объёма и отвлекает от основного сообщения.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: 0 }}>
                Короткий адрес с тематическим окончанием решает обе задачи: экономит символы и делает ссылку узнаваемой. Подписчик видит понятный адрес и переходит по нему охотнее, чем по случайному набору букв.
              </p>
            </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconPencil size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Дизайнеры и редакторы
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                Длинный URL в макете, презентации или документе — визуальный мусор. Он занимает место, портит внешний вид и отвлекает от содержания. Особенно заметно в печатных материалах, где ссылку невозможно спрятать за текстом.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: 0 }}>
                Короткий адрес не отвлекает от содержания. Его можно разместить на визитке, в буклете или на слайде, и он останется читаемым.
              </p>
            </article>

            <article>
              <div style={{ color: colors.accent.blue, marginBottom: "16px" }}><IconPerson size={40} /></div>
              <Typography level="h4" style={{ marginBottom: "16px" }}>
                Все остальные
              </Typography>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: "0 0 12px" }}>
                Иногда нужно отправить ссылку в мессенджере, вставить в комментарий или продиктовать по телефону. Адрес из восьмидесяти символов с амперсандами и знаками вопроса для этого не подходит.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "22.4px", margin: 0 }}>
                Сокращатель превращает любую ссылку в короткий и понятный адрес за одно действие. Без регистрации, без ограничений, без лишних шагов.
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
