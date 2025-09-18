'use client';

import React from 'react';

interface ProjectTabsProps {
  activeTab: 'board' | 'timeline';
  onChange: (tab: 'board' | 'timeline') => void;
}

export const ProjectTabs: React.FC<ProjectTabsProps> = ({ activeTab, onChange }) => {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onChange('board')}
        className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
          activeTab === 'board'
            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        Kanban Board
      </button>
      <button
        onClick={() => onChange('timeline')}
        className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
          activeTab === 'timeline'
            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        Timeline
      </button>
    </div>
  );
};