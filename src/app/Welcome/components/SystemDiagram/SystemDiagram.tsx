'use client';

import { useState } from 'react';

type Layer = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string; // tailwind gradient classes for active state
};

const LAYERS: Layer[] = [
  {
    key: 'core',
    title: 'Ana Proje Yönetimi',
    subtitle: 'Görevler, sprintler, roadmap',
    description:
      'Takımlarınızı, iş akışlarını ve sprint planlarını tek merkezden yönetin. Rol tabanlı yetkilendirme, bildirimler ve detaylı raporlama ile kontrol sizde.',
    gradient:
      'from-indigo-600 via-violet-600 to-fuchsia-600',
  },
  {
    key: 'integrations',
    title: 'Entegrasyonlar',
    subtitle: 'GitHub, Slack, Notion, Jira',
    description:
      'Kod depoları, iletişim ve dokümantasyon araçları ile çift yönlü senkronizasyon. Webhook ve API ile esnek entegrasyon mimarisi.',
    gradient:
      'from-emerald-500 via-teal-500 to-cyan-500',
  },
  {
    key: 'myris',
    title: 'Myris',
    subtitle: 'Olay güdümlü otomasyon katmanı',
    description:
      'Gerçek zamanlı kural motoru ve otomasyon. Olayları dinleyin, tetikleyiciler tanımlayın, süreçleri akıllı aksiyonlarla otomatize edin.',
    gradient:
      'from-orange-500 via-rose-500 to-red-500',
  },
];

export const SystemDiagram = () => {
  const [active, setActive] = useState<string>(LAYERS[0].key);

  const current = LAYERS.find((l) => l.key === active) ?? LAYERS[0];

  return (
    <div className="w-full">
      {/* Layers */}
      <div className="grid gap-3">
        {LAYERS.map((layer) => {
          const isActive = layer.key === active;
          return (
            <button
              key={layer.key}
              type="button"
              onMouseEnter={() => setActive(layer.key)}
              onFocus={() => setActive(layer.key)}
              className={
                `relative w-full text-left rounded-xl p-4 ring-1 transition-all duration-300 ` +
                (isActive
                  ? `ring-indigo-600 shadow-lg text-white bg-gradient-to-r ${layer.gradient}`
                  : 'ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 opacity-70 hover:opacity-100')
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-wide opacity-90">{layer.subtitle}</div>
                  <div className="mt-1 text-lg font-semibold">{layer.title}</div>
                </div>
                <div
                  className={
                    'h-8 w-8 rounded-lg border transition-colors ' +
                    (isActive
                      ? 'border-white/70 bg-white/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white/20')
                  }
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <div className="mt-5 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 p-4 bg-white dark:bg-gray-900">
        <div className="text-sm text-gray-500 dark:text-gray-400">Seçilen modül</div>
        <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{current.title}</div>
        <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">{current.description}</p>
      </div>
    </div>
  );
};


