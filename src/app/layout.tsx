import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/shared/providers/ReduxProvider";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Toaster } from "@/shared/components/ui/sonner";
import { ThemeProvider } from "@/shared/components/layout/theme-provider";
import { ModeToggle } from "@/shared/components/toggle-mode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fredokaSans = Fredoka({
  weight: ["400"],
  variable: "--font-fredoka-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Letrino",
  description: "Jogo de adivinhação de palavras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fredokaSans.variable} bg-bkg-200 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ReduxProvider>
              {children}
              <Toaster />
              <ModeToggle />
            </ReduxProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
