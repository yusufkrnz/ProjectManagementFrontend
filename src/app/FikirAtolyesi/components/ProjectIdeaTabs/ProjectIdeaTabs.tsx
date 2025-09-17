'use client';

import React, { useState } from 'react';

type Item = { id: string; title: string; updatedAt?: string; href: string };

type Props = {
  projects?: Item[];
  ideas?: Item[];
};

export default function ProjectIdeaTabs({ projects = [], ideas = [] }: Props) {
  const [activeTab, setActiveTab] = useState<'projeler' | 'fikirler'>('projeler');
  
  const currentItems = activeTab === 'projeler' ? projects : ideas;
  const emptyText = activeTab === 'projeler' 
    ? 'Henüz projeniz yok. + ile oluşturun.' 
    : 'Henüz fikriniz yok. Boş Atölye ile başlayın.';

  return (
    <div className="mt-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('projeler')}
          className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
            activeTab === 'projeler' 
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Projelerim
        </button>
        <button
          onClick={() => setActiveTab('fikirler')}
          className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
            activeTab === 'fikirler' 
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Fikirlerim
        </button>
      </div>

      {/* Content */}
      {currentItems.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2M5 9V7a2 2 0 012-2h10a2 2 0 012 2v2M5 9h14" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {activeTab === 'projeler' ? 'Henüz projeniz yok' : 'Henüz fikriniz yok'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {emptyText}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ">
          {currentItems.map((item) => (
            <a key={item.id} href={item.href} className="block rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</div>
                  {item.updatedAt && <div className="text-xs text-gray-500 dark:text-gray-400">{item.updatedAt}</div>}
                </div>
                <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
