'use client';

import React, { useState } from 'react';

type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

type TaskData = {
  title: string;
  description: string;
  assignees: string[];
  priority: TaskPriority;
  startDate: string;
  dueDate: string;
  tags: string[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: TaskData & { status: 'assigned' }) => void;
  teamMembers?: string[];
};

export default function TaskCreateModal({ open, onClose, onCreate, teamMembers = [] }: Props) {
  const [data, setData] = useState<TaskData>({
    title: '',
    description: '',
    assignees: [],
    priority: 'medium',
    startDate: '',
    dueDate: '',
    tags: [],
  });

  const [newTag, setNewTag] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title.trim()) return;
    onCreate({ ...data, status: 'assigned' });
    // Reset form
    setData({
      title: '',
      description: '',
      assignees: [],
      priority: 'medium',
      startDate: '',
      dueDate: '',
      tags: [],
    });
    setNewTag('');
  };

  const toggleAssignee = (member: string) => {
    setData(prev => ({
      ...prev,
      assignees: prev.assignees.includes(member)
        ? prev.assignees.filter(m => m !== member)
        : [...prev.assignees, member],
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      setData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const priorityConfig = {
    low: { label: 'Düşük', color: 'bg-gray-400', bgColor: 'bg-gray-50 dark:bg-gray-800', textColor: 'text-gray-700 dark:text-gray-300' },
    medium: { label: 'Orta', color: 'bg-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20', textColor: 'text-blue-700 dark:text-blue-300' },
    high: { label: 'Yüksek', color: 'bg-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-900/20', textColor: 'text-orange-700 dark:text-orange-300' },
    urgent: { label: 'Acil', color: 'bg-red-400', bgColor: 'bg-red-50 dark:bg-red-900/20', textColor: 'text-red-700 dark:text-red-300' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-white dark:bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Görev</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <input
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2.5 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Görev başlığını yazın..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2.5 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Açıklama (opsiyonel)..."
            />
          </div>

          {/* Priority Selector - Single Line */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Öncelik</label>
            <div className="relative">
              {/* Background line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2"></div>
              
              {/* Priority segments */}
              <div className="relative flex">
                {Object.entries(priorityConfig).map(([key, config], index) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setData(prev => ({ ...prev, priority: key as TaskPriority }))}
                    className={`flex-1 relative group transition-all duration-200 ${
                      data.priority === key ? 'z-10' : ''
                    }`}
                  >
                    {/* Segment line */}
                    <div className={`h-0.5 transition-all duration-200 ${
                      data.priority === key ? config.color : 'bg-gray-200 dark:bg-gray-700'
                    }`}></div>
                    
                    {/* Label */}
                    <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      data.priority === key 
                        ? `${config.bgColor} ${config.textColor} shadow-sm` 
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                    }`}>
                      {config.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Başlangıç</label>
              <input
                type="date"
                value={data.startDate}
                onChange={(e) => setData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Bitiş</label>
              <input
                type="date"
                value={data.dueDate}
                onChange={(e) => setData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Assignees - Compact */}
          {teamMembers.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Sorumlu Kişiler</label>
              <div className="flex flex-wrap gap-2">
                {teamMembers.map((member) => (
                  <button
                    key={member}
                    type="button"
                    onClick={() => toggleAssignee(member)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      data.assignees.includes(member)
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {member.split('@')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags - Compact */}
          <div>
            <div className="flex gap-2">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm placeholder:text-gray-500"
                placeholder="Etiket ekle..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 text-sm"
              >
                +
              </button>
            </div>
            {data.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {data.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-gray-700 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs text-gray-500">
              {data.assignees.length > 0 && <span>{data.assignees.length} kişi atandı</span>}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                disabled={!data.title.trim()}
              >
                Oluştur
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
