import React, { useRef, useState } from 'react';
import { UploadCloud, File, FileText, X, AlertCircle } from 'lucide-react';

export default function FileUploadDropzone({ file, setFile, onFileLoaded, disabled = false }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const validateAndSetFile = (selectedFile) => {
    setError(null);
    if (!selectedFile) return;

    const lower = selectedFile.name.toLowerCase();
    if (!lower.endsWith('.txt') && !lower.endsWith('.pdf')) {
      setError('Unsupported file type. Please upload a .txt or .pdf document.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit.');
      return;
    }

    setFile(selectedFile);
    if (onFileLoaded) {
      onFileLoaded(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer
          transition-all duration-200
          ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50 border-slate-200' : ''}
          ${isDragOver 
            ? 'border-brand-500 bg-brand-50/50 scale-[1.005]' 
            : file 
              ? 'border-brand-300 bg-brand-50/20' 
              : 'border-slate-200 hover:border-brand-300 bg-white hover:bg-slate-50/50'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt,.pdf"
          className="hidden"
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              validateAndSetFile(e.target.files[0]);
            }
          }}
        />

        {file ? (
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-brand-200 shadow-sm">
            <div className="flex items-center space-x-3 text-left overflow-hidden">
              <div className="p-2.5 rounded-lg bg-brand-100 text-brand-700 flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-500 font-mono">
                  {(file.size / 1024).toFixed(1)} KB • {file.name.endsWith('.pdf') ? 'PDF' : 'Plain Text'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100/80">
              <UploadCloud className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="text-sm">
              <span className="font-semibold text-brand-600 hover:text-brand-700">Click to upload</span>
              <span className="text-slate-500"> or drag and drop</span>
            </div>
            <p className="text-xs text-slate-400">
              Supports .TXT and .PDF text documents (Max 10 MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-xs text-rose-600 flex items-center space-x-1.5 font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

