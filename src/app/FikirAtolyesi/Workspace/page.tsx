'use client';

import React, { useEffect, useState } from 'react';
import { WorkspaceHeader, CanvasSurface } from './components'; // Workspace'e özel bileşenler

const Workspace = () => {
  const [workspaceName, setWorkspaceName] = useState('Yeni Proje');
  const [activeTool, setActiveTool] = useState('select');
  const [gridType, setGridType] = useState('dots');

  const handleSave = () => {
    // Mock save functionality
    const projectData = {
      name: workspaceName,
      tool: activeTool,
      gridType: gridType,
      timestamp: new Date().toISOString(),
    };
    
    // Save to localStorage as mock backend
    const existingProjects = JSON.parse(localStorage.getItem('fikirAtolyesiProjects') || '[]');
    existingProjects.push(projectData);
    localStorage.setItem('fikirAtolyesiProjects', JSON.stringify(existingProjects));
    
    // Show success message
    alert(`Proje "${workspaceName}" başarıyla kaydedildi!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <WorkspaceHeader 
        workspaceName={workspaceName}
        setWorkspaceName={setWorkspaceName}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        gridType={gridType}
        setGridType={setGridType}
        onSave={handleSave}
      />
      <CanvasSurface gridType={gridType} activeTool={activeTool} />
    </div>
  );
};

export default Workspace;