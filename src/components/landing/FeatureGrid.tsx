import { ReactNode } from "react";
import { colors, breakpoints } from "@/tokens";

interface Feature {
  icon: ReactNode;
  title: string;
  text: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <>
      <style>{`
        .l-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: ${breakpoints.tablet}) {
          .l-feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: ${breakpoints.mobile}) {
          .l-feature-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
      <div className="l-feature-grid">
        {features.map((f, i) => (
          <div key={i}>
            <div style={{ marginBottom: "16px", color: colors.accent.blue }}>{f.icon}</div>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "25.2px",
                marginBottom: "8px",
                color: colors.text.main,
              }}
            >
              {f.title}
            </h4>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "22.4px",
                color: colors.text.main,
                margin: 0,
              }}
            >
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
