'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, FabMenu, DashHero, OverviewCards, RecentProjects, Inbox, ActivityFeed } from './components';

const Dashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // FAB menüsü bileşene taşındı

  useEffect(() => {
    // Authentication kontrolü
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Mobil responsive davranış
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }

    };

    // İlk yükleme
    handleResize();

    // Resize event listener
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FAB menüsü hesaplamaları bileşene taşındı

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Ana İçerik Alanı */}
      <main className={`flex-1 transition-all duration-300 relative ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} ml-0`}>
        {/* Ana İçerik Container */}
        <div className="h-full p-6">
          <div className="h-full max-w-7xl mx-auto">
            <div className="space-y-6">
              <DashHero onCreateProject={() => {}} />
              <OverviewCards />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <RecentProjects />
                </div>
                <div className="space-y-6">
                  <Inbox />
                  <ActivityFeed />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAB Menu */}
        <FabMenu />
      </main>
    </div>
  );
};

export default Dashboard;
