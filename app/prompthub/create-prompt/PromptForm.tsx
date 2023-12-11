"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Filter from "bad-words";

const filter = new Filter();

import { FaUserCircle } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import Link from "next/link";
import CategoryList from "@/app/categories/CategoryList";

export default function AddPrompt({
  categories,
}: {
  categories: {
    id: string;
    content: string;
    iconName: string;
  }[];
}) : JSX.Element {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error creating post.");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(false);

    if (content.length < 1) {
      setErrorMessage("Post cannot be empty.");
      setError(true);
    } else if (filter.isProfane(content)) {
      setErrorMessage("Profanity is not allowed.");
      setError(true);
    } else {
      try {
        const filteredContent = filter.clean(content);
        const res = await fetch("/api/addPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: filteredContent,
          }),
        });
        if (res.ok) {
          setContent("");
          router.refresh();
        }
        setError(false);
      } catch {
        setErrorMessage("Error creating post.");
        setError(true);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className="mb-5 text-slate-900 dark:text-slate-200">
        <div className="mb-3 text-slate-500 space-x-3 text-sm">
          <a href="/prompthub/my-prompts" className="text-blue-500 hover:text-blue-300 transition-colors">Meus Prompts</a>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-slate-200 font-semibold">Novo Prompt</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className="space-y-4 text-white">
          <div className="select-none">
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white">Título</label>

            </div>
            <div className="relative">

              <input required type="text" className="outline-0 text-sm text-slate-900 border border-slate-300 rounded-md bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200/5 dark:border-slate-200/10 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none p-2.5 w-full" placeholder="Título" />
            </div>
          </div>
          <div>
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white">Conteúdo</label>
              <span className="mb-2 block text-xs text-slate-600 dark:text-slate-400">Para tornar certas partes do prompt editáveis, basta colocá-las entre chaves <span className="leading-tight inline-block border-[1.5px] border-blue-500/50 outline-none bg-blue-500/10 px-1 py-[1px] rounded-md">{" {text} "}</span>
              </span>
              <div className="select-none">

                <textarea rows={6} className="outline-0 text-sm text-slate-900 border border-slate-300 rounded-md bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200/5 dark:border-slate-200/10 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none w-full p-2.5 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-200/5 scrollbar-track-slate-200/20 dark:scrollbar-track-slate-200/2" placeholder="Conteúdo" />
              </div>
              <div className="absolute bottom-3 right-2 text-right text-xs text-slate-500">2000</div>
            </div>
          </div>
          <CategoryList categories={categories}/>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-semibold text-slate-900 dark:text-white">Idioma</label>
            <div className="select-none">

              <div className="relative text-slate-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-2 w-3.5 h-3.5 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none">
                  </path>
                  <path d="M6 9l6 6l6 -6">
                  </path>
                </svg>
                <select className="outline-0 text-sm text-slate-900 border border-slate-300 rounded-md bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200/5 dark:border-slate-200/10 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none p-2.5 pr-3 w-full min-w-[110px] !p-1.5" required>
                  <option className="appearance" value="en">English</option>
                  <option className="appearance" value="pt">Português</option>
                  <option className="appearance" value="es">Español</option>
                </select>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div className="select-none">

              <label className="w-full !font-bold relative cursor-pointer flex items-center gap-2">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-500">
                  </div>
                </div>
                <span className="block text-sm font-medium text-slate-900 dark:text-white flex-1">Tornar público</span>
              </label>

            </div>
          </div>

        </div>
        <button type="submit" className="text-white transition-all focus:ring-4 font-medium rounded-lg text-sm max-md:px-3 max-md:py-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-blue-800 flex gap-2 items-center justify-center mt-6 max-sm:w-full">
          Criar prompt</button>
      </form>
    </>
  );
}
