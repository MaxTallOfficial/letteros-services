import { ReactNode } from "react";
import { colors, breakpoints, radius } from "@/tokens";
import { Typography } from "@/src/components/ui/Typography";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

interface FeatureHighlightProps {
  title: ReactNode;
  paragraphs: string[];
  screenshotCaption: string;
  imageSrc?: string;
  reverse?: boolean;
}

export default function FeatureHighlight({
  title,
  paragraphs,
  screenshotCaption,
  imageSrc,
  reverse = false,
}: FeatureHighlightProps) {
  const cls = reverse
    ? "l-feature-highlight l-feature-highlight--reverse"
    : "l-feature-highlight";

  return (
    <>
      <style>{`
        .l-feature-highlight {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: ${colors.bg.alt};
          border-radius: ${radius.card};
          overflow: hidden;
        }
        .l-feature-highlight__text {
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .l-feature-highlight__visual {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .l-feature-highlight__placeholder {
          width: 100%;
          max-width: 580px;
          aspect-ratio: 580 / 308;
        }
        .l-feature-highlight--reverse .l-feature-highlight__visual {
          order: -1;
        }
        @media (max-width: ${breakpoints.mobile}) {
          .l-feature-highlight {
            grid-template-columns: 1fr;
          }
          .l-feature-highlight__text {
            padding: 32px 24px;
            order: 1;
          }
          .l-feature-highlight__visual {
            padding: 24px;
            order: 2;
          }
          .l-feature-highlight--reverse .l-feature-highlight__visual {
            order: 2;
          }
          .l-feature-highlight__placeholder {
            max-width: 100%;
          }
        }
      `}</style>
      <div className={cls}>
        <div className="l-feature-highlight__text">
          <Typography level="h4" style={{ marginBottom: "20px" }}>
            {title}
          </Typography>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: "16px",
                lineHeight: "22.4px",
                color: colors.text.main,
                margin: 0,
                marginBottom: i < paragraphs.length - 1 ? "16px" : 0,
              }}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
        <div className="l-feature-highlight__visual">
          <div className="l-feature-highlight__placeholder">
            <ScreenshotPlaceholder caption={screenshotCaption} imageSrc={imageSrc} />
          </div>
        </div>
      </div>
    </>
  );
}
