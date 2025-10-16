// ----------------------------------------------
// layout.tsx — базовый шаблон Next.js (App Router)
// ----------------------------------------------
// Здесь подключаются глобальные стили и оборачиваются все страницы.
// ----------------------------------------------

import "./globals.scss";
import type { ReactNode } from "react";

export const metadata = {
  title: "mark-inc | Admin",
  description: "Next.js + Express + Prisma test admin panel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
    <body
      style={{
        margin: 0,
        background: "#f8fafc",
        color: "#111",
        fontFamily: "system-ui, sans-serif",
      }}
    >
    {children}
    </body>
    </html>
  );
}
