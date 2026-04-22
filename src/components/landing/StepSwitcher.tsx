"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
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

const CYCLE_MS = 8000;
const SHRINK_MS = 400;

export default function StepSwitcher({ steps }: StepSwitcherProps) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [shrinkingId, setShrinkingId] = useState<string | null>(null);
  const [shrinkStart, setShrinkStart] = useState(0);
  const startRef = useRef<number>(Date.now());

  const switchTo = (id: string) => {
    if (id === activeId) return;
    const elapsed = Date.now() - startRef.current;
    const progress = Math.min(elapsed / CYCLE_MS, 1) * 100;
    setShrinkStart(progress);
    setShrinkingId(activeId);
    setActiveId(id);
    startRef.current = Date.now();
  };

  // Auto-advance every 8s
  useEffect(() => {
    const t = setTimeout(() => {
      const idx = steps.findIndex((s) => s.id === activeId);
      const next = steps[(idx + 1) % steps.length];
      if (next) {
        const elapsed = Date.now() - startRef.current;
        const progress = Math.min(elapsed / CYCLE_MS, 1) * 100;
        setShrinkStart(progress);
        setShrinkingId(activeId);
        setActiveId(next.id);
        startRef.current = Date.now();
      }
    }, CYCLE_MS);
    return () => clearTimeout(t);
  }, [activeId, steps]);

  // Clear shrinking flag after animation ends
  useEffect(() => {
    if (!shrinkingId) return;
    const t = setTimeout(() => setShrinkingId(null), SHRINK_MS);
    return () => clearTimeout(t);
  }, [shrinkingId]);

  return (
    <>
      <style>{`
        @keyframes step-grow {
          from { width: 0% }
          to { width: 100% }
        }
        @keyframes step-shrink {
          from { width: var(--start) }
          to { width: 0% }
        }
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
          gap: 24px;
        }
        .l-step-desc-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 400ms ease;
        }
        .l-step-desc-wrap--open {
          grid-template-rows: 1fr;
        }
        .l-step-desc-inner {
          overflow: hidden;
        }
        .l-step-switcher__visual {
          display: flex;
          border-radius: ${radius.card};
          overflow: hidden;
          position: relative;
        }
        .l-step-switcher__visual-layer {
          position: absolute;
          inset: 0;
          transition: opacity 500ms ease;
        }
        .l-step-switcher__visual-layer--first {
          position: relative;
        }
        .l-step-switcher__visual img,
        .l-step-switcher__visual-layer > div {
          width: 100%;
          min-height: 100%;
          object-fit: cover;
          border-radius: 0;
        }
        .l-step-bar {
          position: relative;
          height: 2px;
          background: ${colors.border.default};
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .l-step-bar__fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: ${colors.accent.blue};
          border-radius: 2px;
        }
        .l-step-bar__fill--grow {
          animation: step-grow ${CYCLE_MS}ms linear forwards;
        }
        .l-step-bar__fill--shrink {
          animation: step-shrink ${SHRINK_MS}ms linear forwards;
        }
        @media (max-width: ${breakpoints.mobile}) {
          .l-step-switcher {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .l-step-switcher__visual {
            order: -1;
          }
          .l-step-switcher__visual img,
          .l-step-switcher__visual-layer > div {
            aspect-ratio: 16/9;
            min-height: auto;
          }
        }
      `}</style>
      <div className="l-step-switcher">
        <div className="l-step-switcher__steps">
          {steps.map((step) => {
            const isActive = step.id === activeId;
            const isShrinking = step.id === shrinkingId;
            const isHovered = step.id === hoveredId && !isActive;
            const parts = step.label.split(" — ");
            const title = parts[1] || parts[0];
            return (
              <div
                key={step.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => switchTo(step.id)}
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: "pointer" }}
              >
                <div className="l-step-bar">
                  {isActive && (
                    <div
                      key={`grow-${activeId}-${startRef.current}`}
                      className="l-step-bar__fill l-step-bar__fill--grow"
                    />
                  )}
                  {isShrinking && (
                    <div
                      key={`shrink-${shrinkingId}-${shrinkStart}`}
                      className="l-step-bar__fill l-step-bar__fill--shrink"
                      style={{ ["--start" as string]: `${shrinkStart}%` } as CSSProperties}
                    />
                  )}
                </div>
                <h4
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    lineHeight: "30.8px",
                    color: isActive ? colors.text.main : isHovered ? colors.text.main : colors.text.placeholder,
                    margin: 0,
                    transition: "color 0.25s",
                  }}
                >
                  {title}
                </h4>
                <div className={`l-step-desc-wrap${isActive ? " l-step-desc-wrap--open" : ""}`}>
                  <div className="l-step-desc-inner">
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "22.4px",
                        color: colors.text.main,
                        margin: "12px 0 0",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="l-step-switcher__visual">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`l-step-switcher__visual-layer${i === 0 ? " l-step-switcher__visual-layer--first" : ""}`}
              style={{ opacity: s.id === activeId ? 1 : 0 }}
            >
              <ScreenshotPlaceholder caption={s.screenshotCaption} imageSrc={s.imageSrc} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
