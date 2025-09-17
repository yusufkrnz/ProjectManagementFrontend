'use client';

import React, { useState } from 'react';

type Props = {
  apiBaseUrl: string;
  onAnswered?: (ok: boolean) => void;
};

type RagResult = {
  answer: string;
  chunks?: Array<{ id?: string; score?: number; content: string }>;
};

export default function QueryPanel({ apiBaseUrl, onAnswered }: Props) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RagResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSources, setShowSources] = useState(true);

  const suggestions = [
    'Proje isterim: SaaS task yönetim sistemi',
    'Proje isterim: RAG destekli müşteri destek botu',
    'Proje isterim: OKR takip aracı',
  ];

  const handleAsk = async () => {
    if (!query.trim()) {
      setError('Bir istek giriniz.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const resp = await fetch(`${apiBaseUrl}/rag/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!resp.ok) throw new Error('Sorgu başarısız');
      const data: RagResult = await resp.json();
      setResult(data);
      onAnswered?.(true);
    } catch (err: any) {
      setError(err?.message || 'Beklenmeyen bir hata oluştu');
      onAnswered?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/70 dark:border-gray-700/60 shadow-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Proje İsteği Sor</h2>
        <button
          onClick={() => setShowSources((s) => !s)}
          className="text-xs px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-100"
        >
          {showSources ? 'Kaynakları Gizle' : 'Kaynakları Göster'}
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">"Proje isterim: X" şeklinde yaz. Sistem en yakın chunk'ları kullanarak cevap üretecek.</p>

      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Proje isterim: ..."
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
        />
        <button
          onClick={handleAsk}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 disabled:opacity-60"
        >
          {isLoading ? 'Sorgulanıyor...' : 'Sor'}
        </button>
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {!result && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Öneriler</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setQuery(s)}
                className="text-xs px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Cevap</h3>
          <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {result.answer}
          </div>

          {showSources && result.chunks && result.chunks.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Kullanılan Chunk'lar</h4>
              <ul className="space-y-2">
                {result.chunks.map((c, idx) => (
                  <li key={idx} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Skor: {c.score?.toFixed(3) ?? '—'}</div>
                    <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{c.content}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


