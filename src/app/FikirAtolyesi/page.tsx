'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../Dashboard/components';
import { FAHeader, ProjectIdeaTabs } from './components';

export default function FikirAtolyesiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
      // Büyük ekranlarda da sidebar'ı açmıyoruz, kullanıcı manuel olarak açacak
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
        <div className="px-6 pt-4 pb-12 max-w-7xl mx-auto">
          <ProjectIdeaTabs projects={[]} ideas={[]} />
        </div>
      </main>
    </div>
  );
}


