'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '../../Dashboard/components';
import { UploadPanel, QueryPanel } from './components';

export default function RagOperationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const apiBaseUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL || '', []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main
        className={`relative z-10 flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} ml-0 min-h-screen`}
      >
        <div className="px-6 pt-6 pb-12 max-w-7xl mx-auto">
          <div className="relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-4 py-3 shadow-sm mb-3">

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">RAG Operasyonu</h1>
              </div>
              <div />
            </div>

            <div className="relative mt-2">
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{ label: 'Belgeyi Yükle' }, { label: 'Sorgunu Gönder' }, { label: 'Cevabı Gör' }].map((step, idx) => {
                  const stepIndex = (idx + 1) as 1 | 2 | 3;
                  const done = currentStep > stepIndex;
                  const active = currentStep === stepIndex;
                  return (
                    <li key={idx} className="flex items-center gap-3">
                      <div className={`${done ? 'bg-emerald-600 text-white border-emerald-600' : active ? 'bg-white dark:bg-gray-900 text-emerald-700 dark:text-emerald-300 border-emerald-400' : 'bg-white dark:bg-gray-900 text-gray-400 border-gray-300 dark:border-gray-700'} flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition`}>
                        {done ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{step.label}</div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadPanel
              apiBaseUrl={apiBaseUrl}
              onUploaded={(ok) => {
                if (ok) setCurrentStep(2);
              }}
            />
            <QueryPanel
              apiBaseUrl={apiBaseUrl}
              onAnswered={(ok) => {
                if (ok) setCurrentStep(3);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}


