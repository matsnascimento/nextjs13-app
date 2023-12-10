import { Divider, Spacer } from '@nextui-org/react';
import React from 'react';
import CategoryForm from '../CategoryForm'; // Certifique-se de que o caminho está correto
import CategoryList from '../CategoryList';

async function getCategory(categoryId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/categories/${categoryId}`, {
    cache: "no-store",
  });
  // console.log(res);
  return res.json();
}


export default async function CategoryDetails({
  params,
}: {
  params: { categoryId: string };
}) {
  const data: {
    id: string;
    content: string;
    iconName: string;
  } = await getCategory(params.categoryId);

  return (
    <main>
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 max-w-3xl mt-6 items-center">
        <CategoryForm category={data}/>
        <Spacer y={10} />
        <Divider />
        <Spacer y={5} />
      </div>
      <Spacer y={20} />
    </main >
  );
}