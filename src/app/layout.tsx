import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/header/Header";
import FooterComponent from "@/components/footer/Footer";
import ToastProvider from "@/components/toastProvider/ToastProvider";

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
        <ToastProvider/>
        <main>{children}</main>
        <FooterComponent />
      </body>
    </html>
  );
}
