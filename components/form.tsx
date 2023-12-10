"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              toast.error(error);
            } else {
              router.refresh();
              router.push("/");
            }
          });
        } else {
          fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: e.currentTarget.fullname.value,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("Conta criada com sucesso! Redirecionando para o login...");
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            } else {
              const { error } = await res.json();
              toast.error(error);
            }
          });
        }
      }}
      className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
      autoComplete="off"
    >
      {type === "register" ? (
        <div>
          <label
            htmlFor="fullname"
            className="block text-xs text-inherit uppercase"
          >
            Nome Completo
          </label>
          <input
            id="fullname"
            name="fullname"
            type="fullname"
            placeholder="John Doe"
            autoComplete="off"
            required
            className="mt-1 block w-full appearance-none rounded-md border bg-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      ): null }
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-inherit uppercase"
        >
          Endereço de e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="panic@thedis.co"
          autoComplete="off"
          required
          className="mt-1 block w-full appearance-none rounded-md border bg-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-inherit uppercase"
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          required
          className="mt-1 block w-full appearance-none rounded-md border bg-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="text-center text-sm text-inherit">{type === "login" ? "Fazer Login" : "Cadastrar"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-sm text-inherit">
          Ainda não tem uma conta?<br/>
          <Link href="/register" className="font-semibold text-inherit">
            Cadastre-se gratuitamente.
          </Link>{" "}
        </p>
      ) : (
        <p className="text-center text-sm text-inherit">
          Já tem uma conta?{" "} Em vez disso, {" "}
          <Link href="/login" className="font-semibold text-inherit">
            faça seu login.
          </Link>
        </p>
      )}
    </form>
  );
}
