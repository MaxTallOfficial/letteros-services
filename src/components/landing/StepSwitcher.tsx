"use client";

import { useState } from "react";
import { colors, radius, breakpoints } from "@/tokens";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

interface Step {
  id: string;
  label: string;
  description: string;
  screenshotCaption: string;
  imageSrc?: string;
}

interface StepSwitcherProps {
  steps: Step[];
}

export default function StepSwitcher({ steps }: StepSwitcherProps) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = steps.find((s) => s.id === activeId) ?? steps[0];

  return (
    <>
      <style>{`
        .l-step-switcher {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: stretch;
        }
        .l-step-switcher__steps {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
        }
        .l-step-switcher__visual {
          display: flex;
          border-radius: ${radius.card};
          overflow: hidden;
        }
        .l-step-switcher__visual > img,
        .l-step-switcher__visual > div {
          width: 100%;
          min-height: 100%;
          object-fit: cover;
          border-radius: 0;
        }
        @media (max-width: ${breakpoints.mobile}) {
          .l-step-switcher {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .l-step-switcher__visual {
            order: -1;
          }
          .l-step-switcher__visual > img,
          .l-step-switcher__visual > div {
            aspect-ratio: 16/9;
            min-height: auto;
          }
        }
      `}</style>
      <div className="l-step-switcher">
        <div className="l-step-switcher__steps">
          {steps.map((step, idx) => {
            const isActive = step.id === activeId;
            const isHovered = step.id === hoveredId && !isActive;
            const parts = step.label.split(" \u2014 ");
            const number = String(idx + 1);
            const title = parts[1] || parts[0];
            return (
              <div
                key={step.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(step.id)}
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: isActive ? colors.accent.blue : isHovered ? colors.accent.blueHover : colors.text.placeholder,
                    marginBottom: "8px",
                    transition: "color 0.25s",
                  }}
                >
                  {number}
                </div>
                <h4
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    lineHeight: "30.8px",
                    color: isActive ? colors.text.main : isHovered ? colors.text.main : colors.text.placeholder,
                    marginBottom: "12px",
                    transition: "color 0.25s",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: isActive ? colors.text.main : isHovered ? colors.text.main : colors.text.placeholder,
                    margin: 0,
                    transition: "color 0.25s",
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="l-step-switcher__visual">
          <ScreenshotPlaceholder caption={active.screenshotCaption} imageSrc={active.imageSrc} />
        </div>
      </div>
    </>
  );
}
