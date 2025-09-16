import React from 'react';

export const FAHeader: React.FC = () => {
  return (
    <header className="sticky top-4 z-40 flex justify-center">
      <div className="pointer-events-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-5 py-3 shadow-sm">
        <div className="text-center">
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">Fikir Atölyesi</h1>
        </div>
      </div>
    </header>
  );
};


