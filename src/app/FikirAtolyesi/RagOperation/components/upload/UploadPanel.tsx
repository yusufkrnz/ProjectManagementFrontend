'use client';

import React, { useRef, useState } from 'react';

type Props = {
  apiBaseUrl: string;
  onUploaded?: (ok: boolean) => void;
};

export default function UploadPanel({ apiBaseUrl, onUploaded }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [chunksCount, setChunksCount] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startUpload = async (file: File) => {
    const form = new FormData();
    form.append('file', file);

    setIsUploading(true);
    setMessage(null);
    setChunksCount(null);
    setFileName(file.name);

    try {
      const resp = await fetch(`${apiBaseUrl}/rag/upload`, {
        method: 'POST',
        body: form,
      });

      if (!resp.ok) {
        throw new Error('Yükleme başarısız');
      }

      const data = await resp.json();
      setChunksCount(data?.chunksInserted ?? null);
      setMessage('PDF işlendi ve embeddingler kaydedildi.');
    } catch (err: any) {
      setMessage(err?.message || 'Beklenmeyen bir hata oluştu');
      onUploaded?.(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setMessage('Lütfen bir PDF seçin.');
      return;
    }
    const file = fileInputRef.current.files[0];
    await startUpload(file);
    onUploaded?.(true);
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await startUpload(file);
      onUploaded?.(true);
    }
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/70 dark:border-gray-700/60 shadow-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">PDF Yükle ve İşle</h2>
        {fileName && <span className="text-xs text-gray-500">Seçilen: {fileName}</span>}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`rounded-xl border-2 border-dashed p-6 mb-4 transition ${dragOver ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-900/10' : 'border-gray-300 dark:border-gray-600'}`}
      >
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Sürükleyip bırak veya dosya seç.</p>
          <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleUpload} />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 text-xs hover:bg-gray-50"
          >
            Dosya Seç
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium shadow hover:bg-emerald-700 disabled:opacity-60"
        >
          {isUploading ? 'İşleniyor...' : 'Yükle ve Embedle'}
        </button>
        {isUploading && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            İşleniyor, lütfen bekleyin...
          </div>
        )}
      </div>

      {message && (
        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          {message} {chunksCount !== null && `(Chunk: ${chunksCount})`}
        </div>
      )}
    </div>
  );
}


