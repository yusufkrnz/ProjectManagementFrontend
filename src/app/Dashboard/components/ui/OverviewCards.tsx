'use client';

import React from 'react';

type Stat = { label: string; value: string; delta?: string };

const defaultStats: Stat[] = [
  { label: 'Projeler', value: '12', delta: '+2' },
  { label: 'Görevler', value: '87', delta: '+14' },
  { label: 'Tamamlanan', value: '42', delta: '+7' },
  { label: 'Bekleyen', value: '45', delta: '-3' },
];

export default function OverviewCards({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
          <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
          <div className="mt-1 flex items-end justify-between">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">{s.value}</div>
            {s.delta && (
              <div className={`text-xs font-medium ${s.delta.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>{s.delta}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


