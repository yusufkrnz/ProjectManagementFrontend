import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Management Frontend",
  description: "Project Management Frontend Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
