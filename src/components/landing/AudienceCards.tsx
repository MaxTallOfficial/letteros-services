import { ReactNode } from "react";
import { colors, radius, breakpoints } from "@/tokens";
import { Typography } from "@/src/components/ui/Typography";

export interface AudiencePoint {
  icon: ReactNode;
  text: string;
}

export interface AudienceCard {
  title: string;
  description: string;
  points?: AudiencePoint[];
  imageSrc?: string;
  imageAlt?: string;
}

interface AudienceCardsProps {
  cards: AudienceCard[];
}

export default function AudienceCards({ cards }: AudienceCardsProps) {
  return (
    <>
      <style>{`
        .l-audience {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .l-audience__card {
          display: grid;
          grid-template-columns: 45% 55%;
          background: ${colors.bg.alt};
          border-radius: ${radius.card};
          overflow: hidden;
        }
        .l-audience__card--reverse {
          grid-template-columns: 55% 45%;
        }
        .l-audience__visual {
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.bg.white};
          border-radius: 16px;
          overflow: hidden;
        }
        .l-audience__visual img {
          width: 100%;
          height: auto;
          display: block;
        }
        .l-audience__visual--placeholder {
          background: #E8E8E8;
          min-height: 320px;
        }
        /* Non-reverse: image left — margin on outer (left) and text side (right) = 0 */
        .l-audience__card:not(.l-audience__card--reverse) .l-audience__visual {
          margin: 0 0 0 12px;
        }
        /* Reverse: image right — margin on outer (right) and text side (left) = 0 */
        .l-audience__card--reverse .l-audience__visual {
          margin: 0 12px 0 0;
        }
        .l-audience__text {
          border: 1px solid #D0D0D0;
          background: transparent;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        /* Non-reverse: text right — hide left border, 24px shorter vertically via margin */
        .l-audience__card:not(.l-audience__card--reverse) .l-audience__text {
          margin: 12px 12px 12px 0;
          border-left: none;
          border-radius: 0 16px 16px 0;
        }
        /* Reverse: text left — hide right border */
        .l-audience__card--reverse .l-audience__text {
          margin: 12px 0 12px 12px;
          border-right: none;
          border-radius: 16px 0 0 16px;
        }
        .l-audience__description {
          font-size: 16px;
          line-height: 22.4px;
          color: ${colors.text.main};
          margin: 0 0 20px;
        }
        .l-audience__points {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .l-audience__point {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 15px;
          line-height: 21px;
          color: ${colors.text.main};
        }
        .l-audience__point-icon {
          flex-shrink: 0;
          color: ${colors.accent.blue};
          margin-top: 1px;
        }
        @media (max-width: ${breakpoints.mobile}) {
          .l-audience__card,
          .l-audience__card--reverse {
            grid-template-columns: 1fr;
          }
          .l-audience__visual {
            order: -1;
            min-height: 240px;
          }
          .l-audience__card:not(.l-audience__card--reverse) .l-audience__visual,
          .l-audience__card--reverse .l-audience__visual {
            margin: 12px 12px 0;
            border-radius: 16px 16px 0 0;
          }
          .l-audience__card:not(.l-audience__card--reverse) .l-audience__text,
          .l-audience__card--reverse .l-audience__text {
            margin: 0 12px 12px;
            padding: 24px;
            border: 1px solid #D0D0D0;
            border-top: none;
            border-radius: 0 0 16px 16px;
          }
          .l-audience__card--reverse .l-audience__visual {
            order: -1;
          }
        }
      `}</style>
      <div className="l-audience">
        {cards.map((card, i) => {
          const textLeft = i % 2 === 1;
          const cardCls = textLeft ? "l-audience__card l-audience__card--reverse" : "l-audience__card";

          const visualEl = (
            <div
              className={`l-audience__visual${card.imageSrc ? "" : " l-audience__visual--placeholder"}`}
              key="visual"
            >
              {card.imageSrc && (
                <img src={card.imageSrc} alt={card.imageAlt || card.title} />
              )}
            </div>
          );

          const textEl = (
            <div className="l-audience__text" key="text">
              <Typography level="h4" style={{ marginBottom: "12px" }}>
                {card.title}
              </Typography>
              <p className="l-audience__description">{card.description}</p>
              {card.points && card.points.length > 0 && (
                <ul className="l-audience__points">
                  {card.points.map((p, j) => (
                    <li key={j} className="l-audience__point">
                      <span className="l-audience__point-icon">{p.icon}</span>
                      <span>{p.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          return (
            <article key={i} className={cardCls}>
              {textLeft ? [textEl, visualEl] : [visualEl, textEl]}
            </article>
          );
        })}
      </div>
    </>
  );
}
