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

export default function AddPost(): JSX.Element {
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
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white">Categorias</label>
            <div className="flex flex-wrap gap-2 mt-2 mb-7">
              <label>
                <input id="category-1" type="checkbox" className="peer sr-only" value="1" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M11.217 19.384a3.501 3.501 0 0 0 6.783 -1.217v-5.167l-6 -3.35">

                      </path>
                      <path d="M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34 -2.534v-6.946">

                      </path>
                      <path d="M6 7.63c-1.391 -.236 -2.787 .395 -3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514l6 -3.348">

                      </path>
                      <path d="M12.783 4.616a3.501 3.501 0 0 0 -6.783 1.217v5.067l6 3.45">

                      </path>
                      <path d="M18.786 8.986a3.501 3.501 0 0 0 -4.446 -5.266l-4.34 2.534v6.946">

                      </path>
                      <path d="M18 16.302c1.391 .236 2.787 -.395 3.534 -1.689a3.474 3.474 0 0 0 -1.271 -4.745l-4.308 -2.514l-5.955 3.42">

                      </path>
                    </svg>
                  </span> Inteligência Artificial</div>
              </label>
              <label>
                <input id="category-2" type="checkbox" className="peer sr-only" value="2" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z">

                      </path>
                      <path d="M16 7h4">

                      </path>
                      <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3">

                      </path>
                    </svg>
                  </span> Copywriting</div>
              </label>
              <label>
                <input id="category-3" type="checkbox" className="peer sr-only" value="3" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0">

                      </path>
                      <path d="M13.867 9.75c-.246 -.48 -.708 -.769 -1.2 -.75h-1.334c-.736 0 -1.333 .67 -1.333 1.5c0 .827 .597 1.499 1.333 1.499h1.334c.736 0 1.333 .671 1.333 1.5c0 .828 -.597 1.499 -1.333 1.499h-1.334c-.492 .019 -.954 -.27 -1.2 -.75">

                      </path>
                      <path d="M12 7v2">

                      </path>
                      <path d="M12 15v2">

                      </path>
                    </svg>
                  </span> Finanças</div>
              </label>
              <label>
                <input id="category-5" type="checkbox" className="peer sr-only" value="5" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0">

                      </path>
                      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1">

                      </path>
                      <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0">

                      </path>
                      <path d="M17 10h2a2 2 0 0 1 2 2v1">

                      </path>
                      <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0">

                      </path>
                      <path d="M3 13v-1a2 2 0 0 1 2 -2h2">

                      </path>
                    </svg>
                  </span> Recursos Humanos</div>
              </label>
              <label>
                <input id="category-6" type="checkbox" className="peer sr-only" value="6" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z">

                      </path>
                      <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z">

                      </path>
                      <path d="M5 8h4">

                      </path>
                      <path d="M9 16h4">

                      </path>
                      <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z">

                      </path>
                      <path d="M14 9l4 -1">

                      </path>
                      <path d="M16 16l3.923 -.98">

                      </path>
                    </svg>
                  </span> Aprendizagem e Educação</div>
              </label>
              <label>
                <input id="category-7" type="checkbox" className="peer sr-only" value="7" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M3 21l18 0">

                      </path>
                      <path d="M9 8l1 0">

                      </path>
                      <path d="M9 12l1 0">

                      </path>
                      <path d="M9 16l1 0">

                      </path>
                      <path d="M14 8l1 0">

                      </path>
                      <path d="M14 12l1 0">

                      </path>
                      <path d="M14 16l1 0">

                      </path>
                      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16">

                      </path>
                    </svg>
                  </span> Gestão</div>
              </label>
              <label>
                <input id="category-8" type="checkbox" className="peer sr-only" value="8" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0">

                      </path>
                      <path d="M12 7a5 5 0 1 0 5 5">

                      </path>
                      <path d="M13 3.055a9 9 0 1 0 7.941 7.945">

                      </path>
                      <path d="M15 6v3h3l3 -3h-3v-3z">

                      </path>
                      <path d="M15 9l-3 3">

                      </path>
                    </svg>
                  </span> Marketing e Vendas</div>
              </label>
              <label>
                <input id="category-9" type="checkbox" className="peer sr-only" value="9" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M3.5 5.5l1.5 1.5l2.5 -2.5">

                      </path>
                      <path d="M3.5 11.5l1.5 1.5l2.5 -2.5">

                      </path>
                      <path d="M3.5 17.5l1.5 1.5l2.5 -2.5">

                      </path>
                      <path d="M11 6l9 0">

                      </path>
                      <path d="M11 12l9 0">

                      </path>
                      <path d="M11 18l9 0">

                      </path>
                    </svg>
                  </span> Produtividade</div>
              </label>
              <label>
                <input id="category-10" type="checkbox" className="peer sr-only" value="10" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M7 8l-4 4l4 4">

                      </path>
                      <path d="M17 8l4 4l-4 4">

                      </path>
                      <path d="M14 4l-4 16">

                      </path>
                    </svg>
                  </span> Programação</div>
              </label>
              <label>
                <input id="category-11" type="checkbox" className="peer sr-only" value="11" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M21 12a9 9 0 1 0 -9 9">

                      </path>
                      <path d="M3.6 9h16.8">

                      </path>
                      <path d="M3.6 15h7.9">

                      </path>
                      <path d="M11.5 3a17 17 0 0 0 0 18">

                      </path>
                      <path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62">

                      </path>
                      <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0">

                      </path>
                      <path d="M20.2 20.2l1.8 1.8">

                      </path>
                    </svg>
                  </span> SEO</div>
              </label>
              <label>
                <input id="category-12" type="checkbox" className="peer sr-only" value="12" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0">

                      </path>
                      <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0">

                      </path>
                      <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0">

                      </path>
                      <path d="M8.7 10.7l6.6 -3.4">

                      </path>
                      <path d="M8.7 13.3l6.6 3.4">

                      </path>
                    </svg>
                  </span> Social Media</div>
              </label>
              <label>
                <input id="category-13" type="checkbox" className="peer sr-only" value="13" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0">

                      </path>
                      <path d="M4 17l5 1l.75 -1.5">

                      </path>
                      <path d="M15 21l0 -4l-4 -3l1 -6">

                      </path>
                      <path d="M7 12l0 -3l5 -1l3 3l3 1">

                      </path>
                    </svg>
                  </span> Esportes e Fitness</div>
              </label>
              <label>
                <input id="category-14" type="checkbox" className="peer sr-only" value="14" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4">

                      </path>
                      <path d="M14.5 5.5l4 4">

                      </path>
                      <path d="M12 8l-5 -5l-4 4l5 5">

                      </path>
                      <path d="M7 8l-1.5 1.5">

                      </path>
                      <path d="M16 12l5 5l-4 4l-5 -5">

                      </path>
                      <path d="M16 17l-1.5 1.5">

                      </path>
                    </svg>
                  </span> UI/UX Design</div>
              </label>
              <label>
                <input id="category-15" type="checkbox" className="peer sr-only" value="15" />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                  <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none">

                      </path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0">

                      </path>
                      <path d="M8 12l0 .01">

                      </path>
                      <path d="M12 12l0 .01">

                      </path>
                      <path d="M16 12l0 .01">

                      </path>
                    </svg>
                  </span> Outro</div>
              </label>
            </div>
          </div>
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
