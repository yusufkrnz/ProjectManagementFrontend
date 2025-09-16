'use client';

import React, { useEffect, useState } from 'react';

export const FabMenu: React.FC = () => {
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [fabRadius, setFabRadius] = useState(58);

  useEffect(() => {
    const handleResize = () => {
      let radius = 58;
      const w = window.innerWidth;
      if (w < 640) radius = 44;       // sm
      else if (w < 1024) radius = 52; // md
      else if (w < 1440) radius = 58; // lg
      else radius = 64;               // xl+
      setFabRadius(radius);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Items config (orbital buttons)
  const items = [
    {
      key: 'github',
      title: 'GitHub Projesi',
      bg: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      key: 'normal',
      title: 'Normal Proje',
      bg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2M5 9V7a2 2 0 012-2h10a2 2 0 012 2v2M5 9h14" />
        </svg>
      ),
    },
    {
      key: 'fikir',
      title: 'Fikir Atölyesi',
      bg: 'bg-amber-500 hover:bg-amber-600 text-white',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a7.5 7.5 0 004.573 4.573c.921.3.921 1.603 0 1.902a7.5 7.5 0 00-4.573 4.573c-.3.921-1.603.921-1.902 0a7.5 7.5 0 00-4.573-4.573c-.921-.3-.921-1.603 0-1.902a7.5 7.5 0 004.573-4.573z" />
        </svg>
      ),
      onClick: () => {
        window.location.href = '/FikirAtolyesi';
      },
    },
    {
      key: 'team',
      title: 'Takım Projesi',
      bg: 'bg-purple-600 hover:bg-purple-700 text-white',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  // Distribute items over first quadrant 0° (right) -> 90° (top)
  const startDeg = 0;
  const endDeg = 90;
  const steps = items.length > 1 ? items.length - 1 : 1;
  const stepDeg = (endDeg - startDeg) / steps;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items - Generated in an arc (0° -> 90°) */}
      <div
        className={`absolute transition-opacity duration-200 ${fabMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} relative`}
        style={{ width: `${fabRadius + 80}px`, height: `${fabRadius + 80}px`, bottom: 0, right: 0 }}
      >
        {items.map((item, idx) => {
          const deg = startDeg - stepDeg * idx; // 180, 150, 120, 90 (4 item)
          const rad = (deg * Math.PI) / 180;
          // Place items around bottom-right anchored FAB:
          // 0° = right, 90° = up
          const x = Math.cos(rad) * fabRadius; // x offset from FAB center
          const y = Math.sin(rad) * fabRadius; // y offset from FAB center
          // Position relative to container's bottom-right corner
          const right = Math.max(0, Math.round(x));
          const bottom = Math.max(0, Math.round(y));

          return (
            <button
              key={item.key}
              onClick={() => {
                setFabMenuOpen(false);
                if ((item as any).onClick) (item as any).onClick();
              }}
              className={`absolute w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-colors duration-200 flex items-center justify-center ${item.bg}`}
              style={{ bottom: `${bottom}px`, right: `${right}px` }}
              title={item.title}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setFabMenuOpen(!fabMenuOpen)}
        className={`w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          fabMenuOpen ? 'rotate-45' : ''
        }`}
        title={fabMenuOpen ? 'Menüyü Kapat' : 'Yeni Proje Ekle'}
      >
        <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {fabMenuOpen && (
        <div className="fixed inset-0 -z-10" onClick={() => setFabMenuOpen(false)} />
      )}
    </div>
  );
};


