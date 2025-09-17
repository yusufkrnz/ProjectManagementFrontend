import React from 'react';

export const FAHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 flex justify-center pt-4">
      <div className="pointer-events-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-4 py-2 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-900 dark:text-white">Fikir Atölyesi</div>
          <nav className="flex items-center gap-2">
            <a href="/FikirAtolyesi/Workspace?type=empty" className="inline-flex items-center gap-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10"/></svg>
              Boş Atölye
            </a>
            <a href="/FikirAtolyesi/RagOperation" className="inline-flex items-center gap-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m6.364.636l-1.414 1.414M21 12h-2M5 12H3m3.636-6.364L5.222 7.05M12 19v2m6.364-.636l-1.414-1.414M7.05 18.778L5.636 17.364"/></svg>
              RAG
            </a>
            <a href="/FikirAtolyesi/Workspace?type=usecase" className="inline-flex items-center gap-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M8 4h5.586a1 1 0 01.707.293L18.414 8.7a1 1 0 01.293.707V20a1 1 0 01-1 1H8a1 1 0 01-1-1V5a1 1 0 011-1z"/></svg>
              Use Case
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};


