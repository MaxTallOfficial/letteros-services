"use client";

import { useState } from "react";
import SectionTabs from "@/src/components/landing/SectionTabs";
import { ShortenForm } from "./ShortenForm";
import { QRGenerator } from "./QRGenerator";

const tabs = [
  { id: "shorten", label: "\u0421\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u0441\u0441\u044b\u043b\u043e\u043a" },
  { id: "qr", label: "QR-\u043a\u043e\u0434" },
];

export function HeroTabs() {
  const [active, setActive] = useState("shorten");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
        <SectionTabs tabs={tabs} active={active} onChange={setActive} />
      </div>
      {active === "shorten" ? <ShortenForm /> : <QRGenerator />}
    </div>
  );
}
