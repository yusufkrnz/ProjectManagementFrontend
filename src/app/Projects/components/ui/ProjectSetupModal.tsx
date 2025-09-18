'use client';

import React, { useState } from 'react';

type ProjectData = {
  name: string;
  type: 'software' | 'fashion' | 'social' | 'marketing' | 'design' | 'other';
  description: string;
  requirements: string;
  teamMembers: string[];
  startDate: string;
  endDate: string;
  category: 'corporate' | 'freelance' | 'weekend' | 'side' | 'personal' | 'startup';
};

interface ProjectSetupModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: ProjectData) => void;
}

export const ProjectSetupModal: React.FC<ProjectSetupModalProps> = ({ open, onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectData>({
    name: '',
    type: 'software',
    description: '',
    requirements: '',
    teamMembers: [],
    startDate: '',
    endDate: '',
    category: 'side',
  });

  const [newMember, setNewMember] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(data);
    // Reset form
    setData({
      name: '',
      type: 'software',
      description: '',
      requirements: '',
      teamMembers: [],
      startDate: '',
      endDate: '',
      category: 'side',
    });
    setStep(1);
  };

  const addTeamMember = () => {
    if (newMember.trim() && !data.teamMembers.includes(newMember.trim())) {
      setData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, newMember.trim()]
      }));
      setNewMember('');
    }
  };

  const removeTeamMember = (member: string) => {
    setData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m !== member)
    }));
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-white dark:bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Yeni Proje Oluştur</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step > stepNum ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proje Adı</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Proje adını girin..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proje Türü</label>
                <select
                  value={data.type}
                  onChange={(e) => setData(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2"
                >
                  <option value="software">Yazılım</option>
                  <option value="fashion">Moda</option>
                  <option value="social">Sosyal</option>
                  <option value="marketing">Pazarlama</option>
                  <option value="design">Tasarım</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proje Kategorisi</label>
                <select
                  value={data.category}
                  onChange={(e) => setData(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2"
                >
                  <option value="corporate">Kurumsal İş</option>
                  <option value="freelance">Freelancer İş</option>
                  <option value="weekend">Hafta Sonu Projesi</option>
                  <option value="side">Side Project</option>
                  <option value="personal">Kişisel Proje</option>
                  <option value="startup">Startup Projesi</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Açıklama</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Proje açıklamasını girin..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gereksinimler</label>
                <textarea
                  value={data.requirements}
                  onChange={(e) => setData(prev => ({ ...prev, requirements: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Proje gereksinimlerini girin..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Team & Timeline */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Takım Üyeleri</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="email"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="E-posta adresi girin..."
                  />
                  <button
                    type="button"
                    onClick={addTeamMember}
                    disabled={!isEmailValid(newMember)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Ekle
                  </button>
                </div>
                {data.teamMembers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.teamMembers.map((member, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                        {member}
                        <button
                          type="button"
                          onClick={() => removeTeamMember(member)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Başlangıç Tarihi</label>
                  <input
                    type="date"
                    value={data.startDate}
                    onChange={(e) => setData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bitiş Tarihi</label>
                  <input
                    type="date"
                    value={data.endDate}
                    onChange={(e) => setData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 mt-6">
            <div className="flex gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50"
                >
                  Geri
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50"
              >
                İptal
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  İleri
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Proje Oluştur
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};