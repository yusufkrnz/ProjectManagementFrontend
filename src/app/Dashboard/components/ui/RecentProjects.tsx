'use client';

import React from 'react';

type Project = { id: string; name: string; updatedAt: string; status?: 'active' | 'paused' | 'completed' };

const mock: Project[] = [
  { id: '1', name: 'CRM Entegrasyonu', updatedAt: '2 gün önce', status: 'active' },
  { id: '2', name: 'Mobil Uygulama MVP', updatedAt: '5 gün önce', status: 'paused' },
  { id: '3', name: 'RAG Bilgi Bankası', updatedAt: '1 saat önce', status: 'active' },
];

export default function RecentProjects({ projects = mock }: { projects?: Project[] }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Son Projeler</h3>
        <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700">Tümünü Gör</a>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {projects.map((p) => (
          <li key={p.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M5 11h14M7 15h10M9 19h6"/></svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{p.updatedAt}</div>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full border ${p.status === 'completed' ? 'text-emerald-700 border-emerald-200 dark:text-emerald-300 dark:border-emerald-700' : p.status === 'paused' ? 'text-amber-700 border-amber-200 dark:text-amber-300 dark:border-amber-700' : 'text-indigo-700 border-indigo-200 dark:text-indigo-300 dark:border-indigo-700'}`}>{p.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


