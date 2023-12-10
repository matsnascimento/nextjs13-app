"use client";

import Category from "./Category";

export default function CategoryList({
  categories,
}: {
  categories: {
    id: string;
    content: string;
    iconName: string;
  }[];
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-slate-900 dark:text-white">Categorias Existentes</label>
      <div className="flex flex-wrap gap-2 mt-2 mb-7">
        {categories?.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            categoryName={category.content}
            iconName={category.iconName}
          />
        ))}
      </div>
    </div>
  );
}
