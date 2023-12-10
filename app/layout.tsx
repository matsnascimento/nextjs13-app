import ProvidersWrapper from "./ProvidersWrapper";
import Nav from "./Nav";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Next.js 13 Demo App",
  description: "Created by Yaseen Mustapha",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Server Components",
    "NextUI",
    "NextAuth",
    "Prisma",
    "PostgreSQL",
    "OpenAI",
    "GPT",
    "Stripe",
  ],
  authors: [
    {
      name: "Yaseen Mustapha",
      url: "https://github.com/yaseenmustapha",
    },
  ],
  creator: "Yaseen Mustapha",
  publisher: "Yaseen Mustapha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <Toaster />
        <ProvidersWrapper>
          <Nav />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
