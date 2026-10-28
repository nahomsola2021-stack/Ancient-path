import React, { useState, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  Plus, 
  Trash2, 
  MapPin, 
  Image as ImageIcon,
  List,
  Info,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { cloudinaryConfig } from '../config/firebase';

interface AdminTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tourData: any) => Promise<void>;
  initialData?: any;
}

export const AdminTourModal: React.FC<AdminTourModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'itinerary' | 'media'>('basic');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    route: initialData?.route || '',
    duration: initialData?.duration || '',
    daysCount: initialData?.daysCount || 1,
    category: initialData?.category || 'cultural',
    price: initialData?.price || '',
    summary: initialData?.summary || '',
    image: initialData?.image || '',
    itinerary: initialData?.itinerary || [
      { day: 1, title: '', description: '', accommodation: '', meals: 'Breakfast, Lunch, Dinner' }
    ]
  });

  // Auto-fill form when the modal opens in edit mode, or reset for new packages
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          route: initialData.route || '',
          duration: initialData.duration || '',
          daysCount: initialData.daysCount || 1,
          category: initialData.category || 'cultural',
          price: initialData.price || '',
          summary: initialData.summary || '',
          image: initialData.image || '',
          itinerary: initialData.itinerary || [
            { day: 1, title: '', description: '', accommodation: '', meals: 'Breakfast, Lunch, Dinner' }
          ]
        });
      } else {
        setFormData({
          title: '',
          route: '',
          duration: '',
          daysCount: 1,
          category: 'cultural',
          price: '',
          summary: '',
          image: '',
          itinerary: [
            { day: 1, title: '', description: '', accommodation: '', meals: 'Breakfast, Lunch, Dinner' }
          ]
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  // --- ITINERARY LOGIC ---
  const handleAddDay = () => {
    const nextDay = formData.itinerary.length + 1;
    setFormData({
      ...formData,
      daysCount: nextDay,
      itinerary: [
        ...formData.itinerary,
        { day: nextDay, title: '', description: '', accommodation: '', meals: '' }
      ]
    });
  };

  const handleUpdateItinerary = (index: number, field: string, value: string) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleRemoveDay = (index: number) => {
    // Added explicit types here to fix TS errors
    const newItinerary = formData.itinerary.filter((_: any, i: number) => i !== index);
    const reindexed = newItinerary.map((day: any, i: number) => ({ ...day, day: i + 1 }));
    setFormData({ ...formData, daysCount: reindexed.length, itinerary: reindexed });
  };

  // --- CLOUDINARY DIRECT UPLOAD ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', cloudinaryConfig.uploadPreset || 'car_images');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      );

      if (!response.ok) {
        throw new Error('Cloudinary upload failed');
      }

      const data = await response.json();
      setFormData({ ...formData, image: data.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please ensure your Cloudinary upload preset allows unsigned uploads.');
    } finally {
      setIsUploading(false);
    }
  };

  // --- SUBMIT ---
  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save the package.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#173C35]/20 focus:border-[#173C35] transition-all";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-gray-50 w-full max-w-5xl h-[90vh] flex flex-col rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white">
          <div>
            <h2 className="font-serif text-2xl text-black font-bold">
              {initialData ? 'Edit Tour Package' : 'Create New Package'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Configure itinerary details, pricing, and media.</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Layout: Sidebar Tabs + Content Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('basic')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'basic' ? 'bg-[#173C35]/10 text-[#173C35]' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Info className="w-4 h-4" /> Basic Details
            </button>
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'itinerary' ? 'bg-[#173C35]/10 text-[#173C35]' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" /> Itinerary Builder
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'media' ? 'bg-[#173C35]/10 text-[#173C35]' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Media & Cover
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8">
            
            {/* TAB: BASIC INFO */}
            {activeTab === 'basic' && (
              <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-right-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Package Title</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClass} placeholder="e.g. The Historic North" />
                  </div>
                  <div>
                    <label className={labelClass}>Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputClass}>
                      <option value="historical">Historical</option>
                      <option value="cultural">Cultural</option>
                      <option value="adventure">Adventure</option>
                      <option value="wildlife">Wildlife</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className={labelClass}><MapPin className="w-3 h-3 inline mr-1"/> Route / Region</label>
                    <input type="text" value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} className={inputClass} placeholder="e.g. Northern Circuit" />
                  </div>
                  <div>
                    <label className={labelClass}>Total Days</label>
                    <input type="number" min="1" value={formData.daysCount} onChange={e => setFormData({...formData, daysCount: parseInt(e.target.value) || 1})} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Base Price (USD)</label>
                    <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className={inputClass} placeholder="e.g. From $1,200" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Executive Summary</label>
                  <textarea rows={4} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className={`${inputClass} resize-none`} placeholder="A short, captivating description of the journey..." />
                </div>
              </div>
            )}

            {/* TAB: ITINERARY */}
            {activeTab === 'itinerary' && (
              <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-right-4">
                {/* Added explicit types to map parameters */}
                {formData.itinerary.map((day: any, index: number) => (
                  <div key={index} className="bg-white border border-gray-200 p-6 rounded-2xl relative shadow-sm group">
                    <div className="absolute top-4 right-4">
                      <button onClick={() => handleRemoveDay(index)} aria-label={`Remove Day ${day.day}`} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-[#173C35] mb-5 flex items-center gap-3">
                      <span className="bg-[#173C35]/10 text-[#173C35] w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        {day.day}
                      </span>
                      Day {day.day}
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Headline Activity</label>
                        <input type="text" value={day.title} onChange={e => handleUpdateItinerary(index, 'title', e.target.value)} className={inputClass} placeholder="e.g. Arrival & Addis Ababa City Tour" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Detailed Description</label>
                        <textarea rows={3} value={day.description} onChange={e => handleUpdateItinerary(index, 'description', e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the day's activities..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Accommodation</label>
                          <input type="text" value={day.accommodation} onChange={e => handleUpdateItinerary(index, 'accommodation', e.target.value)} className={inputClass} placeholder="e.g. Skylight Hotel" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Meals Included</label>
                          <input type="text" value={day.meals} onChange={e => handleUpdateItinerary(index, 'meals', e.target.value)} className={inputClass} placeholder="e.g. Breakfast, Dinner" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button onClick={handleAddDay} className="w-full py-4 border-2 border-dashed border-[#173C35]/30 text-[#173C35] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#173C35]/5 transition-colors">
                  <Plus className="w-5 h-5" /> Add Day {formData.itinerary.length + 1}
                </button>
              </div>
            )}

            {/* TAB: MEDIA */}
            {activeTab === 'media' && (
              <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-right-4">
                <div>
                  <label className={labelClass}>Featured Cover Image</label>
                  
                  <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 py-12 bg-white hover:bg-gray-50 transition-colors relative overflow-hidden">
                    {isUploading ? (
                      <div className="text-center flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-[#173C35] animate-spin mb-4" />
                        <span className="text-sm font-bold text-gray-700">Uploading to Cloudinary...</span>
                      </div>
                    ) : formData.image ? (
                      <div className="relative w-full">
                        <img src={formData.image} alt="Preview" className="w-full h-72 object-cover rounded-xl shadow-sm" />
                        <label className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-lg text-sm font-bold cursor-pointer hover:bg-white transition-colors flex items-center gap-2">
                          <UploadCloud className="w-4 h-4" /> Replace Image
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[#173C35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <UploadCloud className="h-8 w-8 text-[#173C35]" />
                        </div>
                        <div className="flex text-sm leading-6 text-gray-600 justify-center">
                          <label className="relative cursor-pointer rounded-md font-bold text-[#173C35] hover:text-[#0e2722]">
                            <span>Click to browse</span>
                            <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-500 mt-2">Upload directly to Cloudinary (dw1ohipim)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-gray-200 bg-white flex items-center justify-between">
          <div className="text-sm text-gray-500 font-medium">
            Draft: <span className="text-black font-bold">{formData.title || 'Untitled Journey'}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={isSaving} 
              className="px-8 py-3 bg-[#173C35] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#173C35]/20 hover:bg-[#0e2722] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Save Package</>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

