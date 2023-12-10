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

  const enhanceWithAI = async () => {
    if (enhancing) return;
    if (content.length < 1) {
      setEnhanceError(true);
      return;
    }
    setEnhancing(true);
    setEnhanceError(false);

    const res = await fetch("/api/enhanceMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: content,
      }),
    });

    if (res.ok) {
      const GPTdata = await res.json();
      setContent(GPTdata.content);
    } else {
      setEnhanceError(true);
    }
    setEnhancing(false);
  };

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
    <main>
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 max-w-3xl mt-6 items-center">
        <Spacer y={0.5} />

        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <Link href="/prompthub" className="underline decoration-sky-600 text-sky-500 font-bold leading-7">Meus Prompts</Link> / Novo Prompt
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="titulo" className="block text-sm font-medium leading-6">
                    Título
                  </label>
                  <div className="mt-2">
                    {/* <input
                      type="text"
                      name="titulo"
                      id="titulo"
                      autoComplete="titulo"
                      className="w-full rounded-md border-0 padding-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    /> */}
                    <input id="titulo" autoComplete="off" className="outline-0 text-sm text-slate-900 border border-slate-300 rounded-md bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200/5 dark:border-slate-200/10 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none p-2.5 w-full" placeholder="Título" />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="content" className="block text-sm font-medium leading-6 ">
                    Conteúdo
                  </label>
                  <span className="mb-2 block text-xs text-slate-600 dark:text-slate-400">Para tornar certas partes do prompt editáveis, basta colocá-las entre chaves <span className="leading-tight inline-block border-[1.5px] border-blue-500/50 outline-none bg-blue-500/10 px-1 py-[1px] rounded-md">{"{ text }"}</span></span>
                  <div className="mt-2">
                    <textarea
                      id="content"
                      name="content"
                      rows={6}
                      className="outline-0 text-sm text-slate-900 border border-slate-300 rounded-md bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200/5 dark:border-slate-200/10 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none w-full p-2.5 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-200/5 scrollbar-track-slate-200/20 dark:scrollbar-track-slate-200/2"
                      placeholder="Conteúdo" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 ">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
