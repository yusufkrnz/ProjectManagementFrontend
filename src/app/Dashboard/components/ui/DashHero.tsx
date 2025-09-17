'use client';

import React from 'react';

type Props = {
  onCreateProject?: () => void;
};

export default function DashHero({ onCreateProject }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-800/60 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-indigo-900/20 dark:via-gray-900 dark:to-gray-900 p-6 shadow">
      <div className="pointer-events-none absolute -top-10 -right-16 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-400/25 to-fuchsia-400/25 blur-3xl" />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Hoş geldin 👋</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Projelerini yönet, fikirlerini düzenle ve ekibinle iş birliği yap.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onCreateProject}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 shadow"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            Yeni Proje
          </button>
          <a href="/FikirAtolyesi/RagOperation" className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-white/10 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium px-4 py-2 hover:bg-gray-50">
            RAG Operasyonu
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}


