'use client';

import React from 'react';

type Activity = { id: string; text: string; time: string };

const mock: Activity[] = [
  { id: 'a1', text: 'Proje "RAG Bilgi Bankası" oluşturuldu.', time: '2 saat önce' },
  { id: 'a2', text: 'Yeni görev: "Chunk embedding pipeline" atandı.', time: 'Dün' },
  { id: 'a3', text: 'Use case taslağı güncellendi.', time: '3 gün önce' },
];

export default function ActivityFeed({ items = mock }: { items?: Activity[] }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm w-full">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Aktivite</h3>
      </div>
      <ul className="space-y-3">
        {items.map((a) => (
          <li key={a.id} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
            <div>
              <div className="text-sm text-gray-900 dark:text-white">{a.text}</div>
              <div className="text-xs text-gray-500">{a.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


