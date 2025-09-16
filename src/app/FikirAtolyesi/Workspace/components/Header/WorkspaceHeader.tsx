'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, ArrowLeftIcon, PencilIcon, Square3Stack3DIcon, CircleStackIcon, ArrowRightIcon, DocumentTextIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface WorkspaceHeaderProps {
  workspaceName: string;
  setWorkspaceName: (name: string) => void;
  activeTool: string;
  setActiveTool: (tool: string) => void;
  gridType: string;
  setGridType: (type: string) => void;
  onSave: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ 
  workspaceName, 
  setWorkspaceName, 
  activeTool, 
  setActiveTool,
  gridType,
  setGridType,
  onSave
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [gridDropdownOpen, setGridDropdownOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setGridDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tools = [
    { id: 'select', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>, label: 'Seçim' },
    { id: 'hand', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>, label: 'El' },
    { id: 'pen', icon: <PencilIcon className="w-4 h-4" />, label: 'Kalem' },
    { id: 'rectangle', icon: <Square3Stack3DIcon className="w-4 h-4" />, label: 'Dikdörtgen' },
    { id: 'circle', icon: <CircleStackIcon className="w-4 h-4" />, label: 'Elips' },
    { id: 'arrow', icon: <ArrowRightIcon className="w-4 h-4" />, label: 'Ok' },
    { id: 'text', icon: <DocumentTextIcon className="w-4 h-4" />, label: 'Metin' },
    { id: 'eraser', icon: <TrashIcon className="w-4 h-4" />, label: 'Silgi' },
    { id: 'zoom', icon: <MagnifyingGlassIcon className="w-4 h-4" />, label: 'Yakınlaştır' },
  ];

  const gridOptions = [
    { id: 'white', label: 'Beyaz Sayfa', icon: '📄' },
    { id: 'dots', label: 'Nokta Izgara', icon: '⚪' },
    { id: 'lines', label: 'Çizgi Izgara', icon: '📏' },
    { id: 'grid', label: 'Kare Izgara', icon: '⬜' },
  ];

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingName(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Left: Workspace name and info */}
          <div className="flex items-center gap-4">
            {/* Editable workspace name */}
            {isEditingName ? (
              <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="bg-transparent border-none outline-none font-semibold text-gray-800 dark:text-gray-100 text-sm"
                  autoFocus
                  onBlur={() => setIsEditingName(false)}
                />
                <button type="submit" className="text-green-600 hover:text-green-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="font-semibold text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
              >
                {workspaceName}
              </button>
            )}
            
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">Zoom: 100%</span>
            <span className="text-gray-400">•</span>
            
            {/* Grid dropdown */}
            <div className="relative" ref={gridRef}>
              <button
                onClick={() => setGridDropdownOpen(!gridDropdownOpen)}
                className="text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1 text-sm"
              >
                {gridOptions.find(g => g.id === gridType)?.icon} {gridOptions.find(g => g.id === gridType)?.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              {gridDropdownOpen && (
                <div className="absolute top-6 left-0 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl z-50">
                  {gridOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setGridType(option.id);
                        setGridDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 ${
                        gridType === option.id ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Tools */}
          <div className="flex items-center gap-1">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-2 rounded-md transition-colors ${
                  activeTool === tool.id 
                    ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
                title={tool.label}
              >
                {tool.icon}
              </button>
            ))}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <button
              onClick={() => onSave()}
              className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
            >
              Kaydet
            </button>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/FikirAtolyesi"
              className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              title="Atölyeme Dön"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};