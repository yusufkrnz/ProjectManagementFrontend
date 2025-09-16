'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../Dashboard/components';
import { FAHeader } from './components';

export default function FikirAtolyesiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Fixed background layer - independent from content shifts */}
      <div
        className="fixed inset-0 z-0 bg-white bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Illustrator/IdeaIllustrator.jpg')", backgroundSize: '50%' }}
      />

      <main
        className={`relative z-10 flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} ml-0 min-h-screen`}
      >
        <FAHeader />
        <div className="px-6 pt-6 pb-12 max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <a
              href="/FikirAtolyesi/Workspace"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700"
            >
              Yeni Çalışma Başlat
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}


