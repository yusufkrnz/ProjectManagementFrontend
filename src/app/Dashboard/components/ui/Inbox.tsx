'use client';

import React from 'react';

type Message = { id: string; project: string; user: string; text: string; time: string };

const mock: Message[] = [
  { id: 'm1', project: 'CRM Entegrasyonu', user: 'Ayşe', text: 'Yeni API anahtarı eklendi.', time: '10 dk' },
  { id: 'm2', project: 'RAG Bilgi Bankası', user: 'Mehmet', text: 'Chunk sayısı 1200 oldu.', time: '1 saat' },
  { id: 'm3', project: 'MVP', user: 'Zeynep', text: 'Design feedback hazırlandı.', time: 'Dün' },
];

export default function Inbox({ items = mock }: { items?: Message[] }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Gelen Kutusu</h3>
        <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700">Mesajlar</a>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {items.map((m) => (
          <li key={m.id} className="py-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4 4 0 017 17h10a4 4 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-900 dark:text-white truncate">
                <span className="font-medium">{m.user}</span> · {m.project}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{m.text}</div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">{m.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


