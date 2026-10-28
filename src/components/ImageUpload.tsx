import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  onRemove: () => void;
  folder?: string;
}

export function ImageUpload({ label, currentUrl, onUpload, onRemove, folder = 'uploads' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const { uploadImage } = await import('../services/storage');
      const timestamp = Date.now();
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const path = `${folder}/${timestamp}_${cleanName}`;
      const url = await uploadImage(file, path);
      setPreview(url);
      onUpload(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setPreview(currentUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove();
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">
        {label}
      </label>
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-[#264b42]">
          <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white hover:bg-[#ef4444] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#264b42] rounded-xl cursor-pointer hover:border-[#cc6548] transition-colors">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-[#9ca3af]">
              <div className="w-8 h-8 border-2 border-[#cc6548] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#9ca3af]">
              <ImageIcon size={28} />
              <span className="text-sm">Click to upload image</span>
              <span className="text-xs">PNG, JPG up to 5MB</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}
      {error && (
        <p className="text-xs text-[#ef4444] mt-2">{error}</p>
      )}
    </div>
  );
}

