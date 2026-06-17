import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadBox({ onFileSelected, onAnalyze, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      onFileSelected(file);
    } else {
      alert("Please upload an image file (PNG, JPG, WEBP).");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    onFileSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-3xl border-2 border-dashed p-8 md:p-12 transition-all duration-300 ${
          dragActive 
            ? 'border-emerald-400 bg-emerald-500/5 shadow-[0_0_25px_rgba(16,185,129,0.15)]' 
            : 'border-white/10 bg-white/5 hover:border-white/20'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        <AnimatePresence mode="wait">
          {!filePreview ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={triggerFileInput}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Drag & drop your waste image here
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mb-4">
                Supports PNG, JPG, or WEBP. Max size 5MB.
              </p>
              <button 
                type="button"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-emerald-400 text-sm font-semibold rounded-xl border border-emerald-500/20 transition-all duration-200"
              >
                Browse Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="file-preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full max-h-[300px] rounded-2xl overflow-hidden border border-white/15 bg-[#030704] flex items-center justify-center">
                <img
                  src={filePreview}
                  alt="Waste Item Preview"
                  className="w-full max-h-[300px] object-contain"
                />
                
                {/* Remove button */}
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 border border-white/15 text-white hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selected File Details */}
              <div className="mt-4 flex items-center justify-between w-full px-2">
                <div className="flex items-center space-x-2 overflow-hidden pr-4">
                  <ImageIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300 truncate font-mono">{selectedFile.name}</span>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {selectedFile.size > 1024 * 1024 
                    ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` 
                    : `${(selectedFile.size / 1024).toFixed(0)} KB`}
                </span>
              </div>

              {/* Analyze CTA */}
              <button
                type="button"
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="mt-6 w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-[#030704] font-bold rounded-2xl cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Analyze Waste Item</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
