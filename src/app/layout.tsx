import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import SessionAuthProvider from "@/core/context/SessionAuthProvider";
import FiltersProvider from "@/core/context/filters";

// Metadata is key for SEO
export const metadata: Metadata = {
  title: "Mi app de finanzas",
  description: "Esta es la pagina de inicio de mi app de finanzas",
  keywords: "Next.js, TypeScript, Tailwind CSS, Finanzas personales",
  icons: {
    icon: "/myfiper.ico", // /public path
  },
};

// Load Robot Font
const roboto = Roboto({
  weight: ["300", "400", "500", "700"], // Thin, Regular, Medium, Bold
  style: ["normal", "italic"], // Normal, Italic
  subsets: ["latin"], // Latin
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionAuthProvider>
          <FiltersProvider>
            <Navbar/>
            <div>{children}</div>
          </FiltersProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
