import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Note Tracker - For Students",
  description: "With this webapp you have an overview of your school note.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderComponent />
        <main>{children}</main>
      </body>
    </html>
  );
}
