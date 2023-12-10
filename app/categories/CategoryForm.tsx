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
import { useEffect, useState } from "react";
import Filter from "bad-words";

const filter = new Filter();

import { FaUserCircle } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import Link from "next/link";

import useDynamicIcon from '../../components/DynamicIcons'

import { FaInfoCircle } from "react-icons/fa";

import { toast } from 'react-hot-toast';


export default function AddCategory({
  category,
}: {
  category?: {
    id: string;
    content: string;
    iconName: string;
  };
}): JSX.Element {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error creating post.");
  const router = useRouter();

  const categoryId = category ? category.id : null;
  const [categoryName, setCategoryName] = useState(category ? category.content : '');
  const [iconName, setIconName] = useState<string>(category ? category.iconName : 'md/MdAdjust');

  const IconComponent = useDynamicIcon(iconName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(false);

    if (!categoryId) {
      if (categoryName.length < 1) {
        setErrorMessage("Nome da categoria não pode estar vazio.");
        setError(true);
      } else if (filter.isProfane(categoryName) || filter.isProfane(iconName)) {
        setErrorMessage("Profanity is not allowed.");
        setError(true);
      } else {
        try {
          const filteredCategoryName = filter.clean(categoryName);
          const filteredIconName = filter.clean(iconName);
          console.log("48", "filteredCategoryName", filteredCategoryName)
          console.log("48", "filteredIconName", filteredIconName)
          const res = await fetch("/api/categories/addCategories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              categoryName: filteredCategoryName,
              iconName: filteredIconName
            }),
          });
          if (res.ok) {
            setContent("");
            toast.success("Cadastrado com sucesso!");
            router.refresh();
          }
          setError(false);
        } catch {
          setErrorMessage("Error creating post.");
          setError(true);
        }
      }
    }
    else {
      if (categoryName.length < 1) {
        setErrorMessage("Nome da categoria não pode estar vazio.");
        setError(true);
      } else if (filter.isProfane(categoryName) || filter.isProfane(iconName)) {
        setErrorMessage("Profanity is not allowed.");
        setError(true);
      } else {
        try {
          const filteredCategoryName = filter.clean(categoryName);
          const filteredIconName = filter.clean(iconName);
          const res = await fetch("/api/categories/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              categoryId: categoryId,
              categoryName: filteredCategoryName,
              iconName: filteredIconName
            }),
          });
          if (res.ok) {
            setContent("");
            toast.success("Atualizado com sucesso!");
            router.refresh();
          }
          setError(false);
        } catch {
          setErrorMessage("Error updating category.");
          setError(true);
        }
      }    
    }

    setLoading(false);
    console.log({ categoryName, iconName });
  };

  return (
    <>
      <div className="mb-5 text-slate-900 dark:text-slate-200">
        <div className="mb-3 text-slate-500 space-x-3 text-sm">
          <a href="/categories" className="text-blue-500 hover:text-blue-300 transition-colors">Todas categorias</a>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-slate-200 font-semibold">Nova Categoria</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <label htmlFor="categoryName" className="block text-sm font-semibold text-slate-900 dark:text-white">Nome da Categoria</label>
          </div>
          <div className="relative">
            <input
              required
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="outline-0 text-sm text-slate-900 border border-slate-300 rounded-md bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200/5 dark:border-slate-200/10 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none p-2.5 w-full"
              placeholder="Nome da Categoria" />
          </div>
        </div>
        <div className="relative mt-4">
          <div className="flex items-center gap-2 mb-1">
            <label htmlFor="iconName" className="block text-sm font-semibold text-slate-900 dark:text-white">Nome do Ícone</label>
          </div>
          <Popover>
            <PopoverTrigger>
              <span className="cursor-pointer mb-2 inline-flex text-xs text-slate-600 dark:text-slate-400">
                <FaInfoCircle />
                <Spacer x={1} />
                Para encontrar os ícones
                <Spacer x={1} />
                <a target="_blank" href="https://react-icons.github.io/react-icons/" className="text-blue-500 hover:text-blue-300 transition-colors">CLIQUE AQUI</a>
              </span>
            </PopoverTrigger>
            <PopoverContent>
              {/* <p className="p-2">Utilize a opção que possui o tipo do ícone seguido por uma barra "/" e o nome do ícone. Exemplo: "md/MdAdjust", "pi/PiAirplayDuotone" ou "ci/CiUser"</p> */}

              <div className="px-1 py-2">
                <div className="text-small font-bold">Como encontrar os ícones?</div>
                <Spacer y={1.5} />
                <div className="text-tiny">Utilize a opção que possui o tipo do ícone seguido por uma barra {'"/"'} e o nome do ícone.</div>
                <Spacer y={1} />
                <div className="text-tiny">{'Exemplo: "md/MdAdjust", "pi/PiAirplayDuotone" ou "ci/CiUser"'}</div>
              </div>
            </PopoverContent>
          </Popover>
          <div className="relative">
            <div className="absolute outline-0 text-sm text-slate-200 rounded-tl rounded-bl bg-slate-950 inset-y-0 ring-2 ring-blue-800 border-blue-800 ring-inset start-0 flex justify-center items-center px-3 py-0">
              {IconComponent ? <IconComponent /> : <p>n/a</p>}
            </div>
            <Spacer x={40} />
            <input
              required
              type="text"
              id="iconName"
              name="iconName"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="outline-0 ml-4 text-sm text-slate-900 border border-slate-300 rounded-md bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200/5 dark:border-slate-200/10 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none ps-10 p-2.5 w-full"
              placeholder="md/MdAdjust ou si/SiOpenai" />
          </div>
        </div>
        <Popover isOpen={error} onOpenChange={setError} placement="right">
          <PopoverTrigger>
            <Button
              className="text-white transition-all focus:ring-4 font-medium rounded-lg text-sm max-md:px-3 max-md:py-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-blue-800 flex gap-2 items-center justify-center mt-6 max-sm:w-full"
              color="primary"
              type="submit"
              isDisabled={!session || enhancing}
              // auto
              style={{ minWidth: "100px" }}
            >
              {loading ? (
                  <Spinner size="sm" />
                ):(
                  categoryId ? "Atualizar Categoria" : "Adicionar Categoria"
                )
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="p-2">{errorMessage}</p>
          </PopoverContent>
        </Popover>
      </form>
    </>
  );
}
