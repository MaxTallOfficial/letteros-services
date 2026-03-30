import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--l-font-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Letteros Services",
  description: "Бесплатные сервисы Letteros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
