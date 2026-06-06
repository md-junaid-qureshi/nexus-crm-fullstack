import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusCRM | Sales & Operations Panel",
  description: "Premium corporate Lead Management CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
