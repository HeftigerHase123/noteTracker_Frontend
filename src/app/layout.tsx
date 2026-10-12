import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/Header/Header";
import { Toaster } from "sonner";
import { Inter, Space_Grotesk } from "next/font/google";
import FooterComponent from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Note Tracker - For Students",
  description: "With this webapp you have an overview of your school note.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body"
})

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <HeaderComponent />
      <main>{children}</main>
      <FooterComponent />
      <Toaster position="top-center" richColors />
    </body>
  </html>
);
}
