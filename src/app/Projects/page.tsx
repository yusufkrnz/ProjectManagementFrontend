'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Sidebar } from '../Dashboard/components';
import { ProjectHeader, ProjectSetupModal, TaskCreateModal, ProjectTabs, KanbanBoard } from './components';

type TaskStatus = 'assigned' | 'started' | 'in_progress' | 'done';

type Task = {
  id: string;
  title: string;
  description?: string;
  assignees?: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: string;
  dueDate?: string;
  tags?: string[];
  status: TaskStatus;
};

type TimelineEvent = {
  id: string;
  taskId: string;
  taskTitle: string;
  from?: TaskStatus;
  to: TaskStatus;
  at: number;
};

export default function ProjectsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'board' | 'timeline'>('board');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  const columns = useMemo(
    () => [
      { id: 'assigned' as TaskStatus, title: 'Atandı' },
      { id: 'started' as TaskStatus, title: 'Başlandı' },
      { id: 'in_progress' as TaskStatus, title: 'Devam ediyor' },
      { id: 'done' as TaskStatus, title: 'Bitti' },
    ],
    []
  );

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      assigned: [],
      started: [],
      in_progress: [],
      done: [],
    };
    for (const t of tasks) map[t.status].push(t);
    return map;
  }, [tasks]);

  const handleCreateProject = useCallback((data: any) => {
    console.log('Project created:', data);
    setShowCreateModal(false);
  }, []);

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

  const handleAddTask = useCallback(() => {
    setShowTaskModal(true);
  }, []);

  const handleCreateTask = useCallback((taskData: any) => {
    const newTask: Task = {
      id: `${Date.now()}`,
      title: taskData.title,
      description: taskData.description,
      assignees: taskData.assignees,
      priority: taskData.priority,
      startDate: taskData.startDate,
      dueDate: taskData.dueDate,
      tags: taskData.tags,
      status: 'assigned',
    };
    setTasks((prev) => [newTask, ...prev]);
    setTimeline((prev) => [
      { id: `${Date.now()}-ev`, taskId: newTask.id, taskTitle: taskData.title, to: 'assigned', at: Date.now() },
      ...prev,
    ]);
    setShowTaskModal(false);
  }, []);

  const handleMoveTask = useCallback((taskId: string, to: TaskStatus) => {
    setTasks((prev) => {
      const current = prev.find((t) => t.id === taskId);
      if (!current || current.status === to) return prev;
      const from = current.status;
      const next = prev.map((t) => (t.id === taskId ? { ...t, status: to } : t));
      setTimeline((p) => [
        { id: `${taskId}-${Date.now()}`, taskId, taskTitle: current.title, from, to, at: Date.now() },
        ...p,
      ]);
      return next;
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className={`flex-1 transition-all duration-300 relative ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} ml-0`}>
        <div className="h-full p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <ProjectHeader onNewProject={() => setShowCreateModal(true)} onNewTask={handleAddTask} />
            <ProjectTabs activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === 'board' ? (
              <KanbanBoard columns={columns} tasksByStatus={tasksByStatus} onMoveTask={handleMoveTask} />
            ) : (
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Timeline</h3>
                {timeline.length === 0 ? (
                  <div className="text-sm text-gray-500">Henüz aktivite yok.</div>
                ) : (
                  <ul className="space-y-2">
                    {timeline.map((e) => (
                      <li key={e.id} className="text-sm text-gray-800 dark:text-gray-200">
                        <span className="font-medium">{e.taskTitle}</span> → {e.to}
                        {e.from ? <span className="text-gray-500"> (önce: {e.from})</span> : null}
                        <span className="text-gray-500"> · {new Date(e.at).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <ProjectSetupModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />

        <TaskCreateModal
          open={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          onCreate={handleCreateTask}
          teamMembers={['ali@mail.com', 'ayse@mail.com', 'mehmet@mail.com']}
        />
      </main>
    </div>
  );
}