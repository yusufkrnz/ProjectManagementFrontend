'use client';

import React from 'react';

type Item = { id: string; title: string; updatedAt?: string; href: string };

type Props = {
  title: string;
  items: Item[];
  emptyText?: string;
};

export default function ProjectIdeaList({ title, items, emptyText = 'Kayıt yok' }: Props) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h2>
        {items.length > 0 && (
          <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700">Tümünü Gör</a>
        )}
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {emptyText}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <a key={it.id} href={it.href} className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{it.title}</div>
                  {it.updatedAt && <div className="text-xs text-gray-500 dark:text-gray-400">{it.updatedAt}</div>}
                </div>
                <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}


