'use client';

import React from 'react';

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

interface Column {
  id: TaskStatus;
  title: string;
}

interface KanbanBoardProps {
  columns: Column[];
  tasksByStatus: Record<TaskStatus, Task[]>;
  onMoveTask: (taskId: string, to: TaskStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, tasksByStatus, onMoveTask }) => {
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onMoveTask(taskId, columnId);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div
          key={column.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            {column.title} ({tasksByStatus[column.id].length})
          </h3>
          <div className="space-y-3">
            {tasksByStatus[column.id].map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
              >
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {task.description}
                  </p>
                )}
                {task.priority && (
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'urgent' ? 'Acil' : 
                     task.priority === 'high' ? 'Yüksek' :
                     task.priority === 'medium' ? 'Orta' : 'Düşük'}
                  </span>
                )}
                {task.assignees && task.assignees.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {task.assignees.map((assignee, idx) => (
                      <span key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                        {assignee.split('@')[0]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};