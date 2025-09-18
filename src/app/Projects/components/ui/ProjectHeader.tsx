'use client';

import React from 'react';

interface ProjectHeaderProps {
  onNewProject: () => void;
  onNewTask: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onNewProject, onNewTask }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projeler</h1>
        <p className="text-gray-600 dark:text-gray-400">Projelerinizi yönetin ve takip edin</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onNewProject}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Yeni Proje
        </button>
        <button
          onClick={onNewTask}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Yeni Görev
        </button>
      </div>
    </div>
  );
};