import React from 'react';
import PromptForm from './PromptForm'; // Certifique-se de que o caminho está correto


async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api/categories/get`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function AddPrompt() {
  const data: {
    id: string;
    content: string;
    iconName: string;
  }[] = await getCategories();
  return (
    <main>
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 max-w-3xl mt-6 items-center">
        <PromptForm categories={data}/>
      </div>
    </main >
  );
}