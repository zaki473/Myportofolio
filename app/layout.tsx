import type { Metadata } from "next";
import "./globals.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Zaki's Portfolio — Windows XP Edition",
  description: "Portfolio Zaki, Informatics Engineering Student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}