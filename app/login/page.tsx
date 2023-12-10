"use client";
import Image from "next/image";
import Form from "@/components/form";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Login() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src={theme === "dark" ? "/next-logo-dark.svg" : "/next-logo.svg"}
              priority
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold text-inherit">
            Bem-vindo ao PromptHub
          </h3>
          <p className="text-sm text-inherit">
            Faça login em sua conta e comece a aventura.
          </p>
        </div>
        <Form type="login" />
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-2 py-4 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Desenvolvido pela Open Maxx ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
