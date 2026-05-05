"use client";

import { useState } from "react";
import { colors, radius, breakpoints } from "@/tokens";
import { Typography } from "@/src/components/ui/Typography";
import { SchemaOrg } from "@/src/components/seo/SchemaOrg";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

export function FAQ({ title = "Частые вопросы", items }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <>
      <SchemaOrg data={schema} />
      <style>{`
        .l-faq__wrap {
          max-width: 800px;
          margin: 0 auto;
        }
        .l-faq__item {
          border-bottom: 1px solid ${colors.border.default};
        }
        .l-faq__item:first-child {
          border-top: 1px solid ${colors.border.default};
        }
        .l-faq__btn {
          width: 100%;
          background: none;
          border: none;
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.4;
          color: ${colors.text.main};
        }
        .l-faq__btn:hover { color: ${colors.accent.blue}; }
        .l-faq__icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          position: relative;
          transition: transform 0.3s ease;
        }
        .l-faq__icon::before, .l-faq__icon::after {
          content: "";
          position: absolute;
          background: currentColor;
          border-radius: 1px;
        }
        .l-faq__icon::before {
          top: 9px;
          left: 0;
          width: 20px;
          height: 2px;
        }
        .l-faq__icon::after {
          top: 0;
          left: 9px;
          width: 2px;
          height: 20px;
          transition: transform 0.3s ease;
        }
        .l-faq__icon--open::after {
          transform: rotate(90deg);
        }
        .l-faq__panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }
        .l-faq__panel--open {
          grid-template-rows: 1fr;
        }
        .l-faq__panel-inner {
          overflow: hidden;
        }
        .l-faq__answer {
          font-size: 16px;
          line-height: 22.4px;
          color: ${colors.text.main};
          margin: 0;
          padding: 0 0 24px;
          max-width: 720px;
        }
        @media (max-width: ${breakpoints.mobile}) {
          .l-faq__btn { font-size: 16px; padding: 20px 0; }
          .l-faq__answer { font-size: 15px; padding-bottom: 20px; }
        }
      `}</style>
      <Typography level="h2Sections" style={{ marginBottom: "40px", textAlign: "center" }}>
        {title}
      </Typography>
      <div className="l-faq__wrap">
        {items.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={i} className="l-faq__item">
              <button
                className="l-faq__btn"
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
              >
                <span>{item.question}</span>
                <span className={`l-faq__icon${open ? " l-faq__icon--open" : ""}`} aria-hidden />
              </button>
              <div className={`l-faq__panel${open ? " l-faq__panel--open" : ""}`}>
                <div className="l-faq__panel-inner">
                  <p className="l-faq__answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
