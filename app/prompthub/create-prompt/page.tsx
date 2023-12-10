import React from 'react';
import PromptForm from './PromptForm'; // Certifique-se de que o caminho está correto

export default function AddPrompt() {
  return (
    <main>
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 max-w-3xl mt-6 items-center">
        <PromptForm />
      </div>
    </main >
  );
}