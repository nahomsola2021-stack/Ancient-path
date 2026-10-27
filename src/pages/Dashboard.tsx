import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, cloudinaryConfig } from '../config/firebase';
import { 
  LayoutDashboard, 
  Map, 
  MapPin,
  FileText,
  CalendarCheck, 
  Bell, 
  Search, 
  LogOut,
  Check,
  X,
  Trash2,
  Compass,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Plus,
  UploadCloud,
  Loader2,
  Image as ImageIcon,
  Filter
} from 'lucide-react';

import { BookingDetailModal } from '../components/BookingDetailModal';
import { AdminTourModal } from '../components/AdminModal';

// Local Data imports for the Migration Tool
import { TOURS_DATA } from '../data/toursData';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { JOURNAL_ARTICLES } from '../data/journalData';

const ITEMS_PER_PAGE = 7;

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [globalSearch, setGlobalSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Data States
  const [bookings, setBookings] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  
  // Specific Tab Filter States
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals State
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState<any>(null);

  // Generic CMS Modal
  const [isGenericEditorOpen, setIsGenericEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [editorData, setEditorData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { show, ToastComponent } = useToast();

  useEffect(() => {
    if (user?.email) localStorage.setItem('ap_admin_email', JSON.stringify(user.email));
  }, [user]);

  // --- REAL-TIME FIREBASE SYNC ---
  useEffect(() => {
    const unsubBookings = onSnapshot(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')), (snap) => {
      setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubTours = onSnapshot(collection(db, 'tours'), (snap) => {
      setPackages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubDestinations = onSnapshot(collection(db, 'destinations'), (snap) => {
      setDestinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubArticles = onSnapshot(collection(db, 'articles'), (snap) => {
      setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubBookings(); unsubTours(); unsubDestinations(); unsubArticles(); };
  }, []);

  // Reset pagination and filters when changing tabs
  useEffect(() => {
    setCurrentPage(1);
    setCategoryFilter('All');
    setStatusFilter('All');
  }, [activeTab, globalSearch]);

  const handleAccept = async (id: string) => { await updateDoc(doc(db, 'bookings', id), { status: 'confirmed' }); show('Booking confirmed', 'success'); };
  const handleReject = async (id: string) => { await updateDoc(doc(db, 'bookings', id), { status: 'cancelled' }); show('Booking cancelled', 'success'); };
  const handleDeleteBooking = async (id: string) => { if (window.confirm('Delete this booking?')) { await deleteDoc(doc(db, 'bookings', id)); show('Booking deleted', 'success'); } };
  const handleLogout = async () => { await logout(); navigate('/login'); };

  const handleOpenEditor = (mode: 'add' | 'edit', item: any = null) => {
    if (activeTab === 'packages') { setTourToEdit(mode === 'edit' ? item : null); setIsTourModalOpen(true); } 
    else { setEditorMode(mode); setEditorData(mode === 'edit' && item ? { ...item } : {}); setIsGenericEditorOpen(true); }
  };

  const handleSaveTour = async (tourData: any) => {
    try {
      if (tourToEdit) await updateDoc(doc(db, 'tours', tourToEdit.id), { ...tourData, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, 'tours'), { ...tourData, createdAt: serverTimestamp() });
      setIsTourModalOpen(false); show('Tour saved', 'success');
    } catch (e) { show('Failed to save tour', 'error'); }
  };

  const handleSaveGenericItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return; // Prevent double submission!
    setIsSaving(true);
    
    try {
      const collectionName = activeTab === 'destinations' ? 'destinations' : 'articles';
      let dataToSave = { ...editorData };
      if (activeTab === 'articles' && !dataToSave.author) dataToSave.author = { name: 'Admin', avatar: '' };

      if (editorMode === 'edit' && editorData.id) await updateDoc(doc(db, collectionName, editorData.id), { ...dataToSave, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, collectionName), { ...dataToSave, createdAt: serverTimestamp() });
      
      setIsGenericEditorOpen(false); 
      show(`${activeTab.slice(0, -1)} saved.`, 'success');
    } catch (e) { 
      show('Failed to save item', 'error'); 
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string, tab: string) => {
    if (window.confirm('Delete this item?')) {
      let collectionName = tab === 'packages' ? 'tours' : tab;
      await deleteDoc(doc(db, collectionName, id)); show('Item deleted.', 'success');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setIsUploading(true);
    const uploadData = new FormData(); uploadData.append('file', file); uploadData.append('upload_preset', cloudinaryConfig.uploadPreset || 'car_images');
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, { method: 'POST', body: uploadData });
      const data = await response.json();
      if (activeTab === 'articles') setEditorData({ ...editorData, coverImage: data.secure_url });
      else setEditorData({ ...editorData, image: data.secure_url });
    } catch (e) { alert('Upload failed'); } finally { setIsUploading(false); }
  };

  // --- ROBUST TAB FILTERING LOGIC ---
  const currentTabData = useMemo(() => {
    let data = [];
    const q = globalSearch.toLowerCase();

    switch (activeTab) {
      case 'bookings':
        data = bookings.filter(b => {
          const matchSearch = !q || b.clientName?.toLowerCase().includes(q) || b.email?.toLowerCase().includes(q) || b.packageName?.toLowerCase().includes(q);
          const matchStatus = statusFilter === 'All' || b.status === statusFilter.toLowerCase();
          return matchSearch && matchStatus;
        });
        break;
      case 'packages':
        data = packages.filter(p => {
          const matchSearch = !q || p.title?.toLowerCase().includes(q) || p.route?.toLowerCase().includes(q);
          const matchCat = categoryFilter === 'All' || (p.category || '').toLowerCase() === categoryFilter.toLowerCase();
          return matchSearch && matchCat;
        });
        break;
      case 'destinations':
        data = destinations.filter(d => {
          const matchSearch = !q || d.name?.toLowerCase().includes(q) || d.region?.toLowerCase().includes(q);
          const matchRegion = categoryFilter === 'All' || d.region === categoryFilter;
          return matchSearch && matchRegion;
        });
        break;
      case 'articles':
        data = articles.filter(a => {
          const matchSearch = !q || a.title?.toLowerCase().includes(q) || a.author?.name?.toLowerCase().includes(q);
          const matchCat = categoryFilter === 'All' || a.category === categoryFilter;
          return matchSearch && matchCat;
        });
        break;
      default:
        data = [];
    }
    return data;
  }, [activeTab, globalSearch, categoryFilter, statusFilter, bookings, packages, destinations, articles]);

  const totalPages = Math.max(1, Math.ceil(currentTabData.length / ITEMS_PER_PAGE));
  const paginatedData = currentTabData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: bookings.length },
    { id: 'packages', label: 'Tour Packages', icon: Map, badge: packages.length },
    { id: 'destinations', label: 'Destinations', icon: MapPin, badge: destinations.length },
    { id: 'articles', label: 'Journal Articles', icon: FileText, badge: articles.length },
  ];

  return (
    <>
      {ToastComponent}
      <div className="flex h-screen bg-[#F2F6F4] font-sans text-[#1A2E26] overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-[280px] bg-[#0B1B15] flex flex-col z-20 shadow-2xl shrink-0">
          <div className="h-28 flex items-center px-8 border-b border-white/5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Compass className="text-white w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white leading-none block mb-0.5">Ancient Path</span>
                <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Workspace</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-5 py-8 space-y-2 overflow-y-auto">
            <p className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Main Menu</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  activeTab === item.id ? 'bg-emerald-500 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-white' : 'text-white/40 group-hover:text-emerald-400'}`} />
                  <span className={activeTab === item.id ? 'font-bold' : ''}>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] py-1 px-2.5 rounded-full font-bold transition-colors ${activeTab === item.id ? 'bg-white/20' : 'bg-white/5 text-white/40 group-hover:bg-white/10'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5">
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white/5 text-white/70 hover:bg-red-500 hover:text-white rounded-2xl transition-all font-bold text-sm">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col h-full relative overflow-hidden">
          
          {/* HEADER */}
          <header className="h-28 px-12 lg:px-16 flex items-center justify-between bg-[#F2F6F4]/90 backdrop-blur-xl border-b border-emerald-900/5 shrink-0">
            <div className="flex items-center bg-white px-5 py-3 rounded-2xl w-[460px] shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20">
              <Search className="w-4 h-4 text-emerald-900/40" />
              <input 
                type="text" 
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder={`Search ${activeTab === 'overview' ? 'dashboard' : activeTab}...`} 
                className="bg-transparent border-none outline-none pl-3 text-sm w-full placeholder-emerald-900/40 font-medium"
              />
              {globalSearch && <X className="w-4 h-4 text-gray-400 cursor-pointer" onClick={() => setGlobalSearch('')} />}
            </div>

            <div className="flex items-center gap-6">
              <button className="relative p-2.5 text-emerald-900/40 hover:text-emerald-600 rounded-full hover:bg-emerald-500/10">
                <Bell className="w-5 h-5" />
                {bookings.filter(b => b.status === 'pending').length > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F2F6F4]"></span>}
              </button>
              <div className="h-8 w-px bg-emerald-900/10"></div>
              <div className="flex items-center gap-3.5 group">
                <div className="text-right">
                  <p className="text-sm font-extrabold text-[#1A2E26]">Admin User</p>
                  <p className="text-[11px] font-bold text-emerald-900/40 uppercase tracking-wider">{user?.email || 'System'}</p>
                </div>
                <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-lg border-2 border-white shadow-md">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
              </div>
            </div>
          </header>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-auto p-12 lg:p-16">
            <div className="max-w-[1400px] mx-auto space-y-12">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h1 className="text-4xl font-black text-[#1A2E26] tracking-tight">Dashboard Overview</h1>
                    <p className="text-emerald-900/60 mt-2 font-medium">Real-time statistics and activity for Ancient Path Ethiopia.</p>
                  </div>

                  {/* Migration Tool */}
                  <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2rem] shadow-sm">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">Database Migration Tool</h3>
                    <p className="text-amber-700 text-sm mb-6 max-w-2xl">Push your hardcoded sample data into the live Firebase database.</p>
                    <button onClick={async () => {
                        if(!window.confirm("Upload local data to Firebase?")) return;
                        try {
                          for (const tour of TOURS_DATA) await addDoc(collection(db, 'tours'), { ...tour, createdAt: serverTimestamp() });
                          for (const dest of DESTINATIONS_DATA) await addDoc(collection(db, 'destinations'), { ...dest, createdAt: serverTimestamp() });
                          for (const article of JOURNAL_ARTICLES) await addDoc(collection(db, 'articles'), { ...article, createdAt: serverTimestamp() });
                          alert("Migration Complete!");
                        } catch (e) { alert("Migration failed."); }
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center gap-2"
                    >
                      <UploadCloud className="w-5 h-5" /> Migrate Local Data
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { title: 'Total Bookings', value: bookings.length, icon: CalendarCheck, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
                      { title: 'Active Packages', value: packages.length, icon: Map, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                      { title: 'Destinations', value: destinations.length, icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
                      { title: 'Published Articles', value: articles.length, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
                    ].map((stat, index) => (
                      <div key={index} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className={`p-4 inline-block rounded-2xl ${stat.bg} ${stat.border} border ${stat.color} mb-6`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-5xl font-black text-[#1A2E26] mb-2">{stat.value}</p>
                        <h3 className="text-emerald-900/50 font-bold text-sm uppercase tracking-wider">{stat.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DYNAMIC DATA TABLES */}
              {['bookings', 'packages', 'destinations', 'articles'].includes(activeTab) && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Header & Add Button */}
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h1 className="text-4xl font-black text-[#1A2E26] capitalize">{activeTab}</h1>
                      <p className="text-emerald-900/60 mt-2 font-medium">Manage your live {activeTab} data.</p>
                    </div>
                    {activeTab !== 'bookings' && (
                      <button onClick={() => handleOpenEditor('add')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 text-sm transition-transform hover:-translate-y-0.5">
                        <Plus className="w-4 h-4" /> Add New
                      </button>
                    )}
                  </div>

                  {/* INTERNAL TAB FILTER BAR */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <Filter className="w-5 h-5 text-gray-400 ml-2" />
                    
                    {/* Filter Type Logic based on Active Tab */}
                    {activeTab === 'bookings' && (
                      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none">
                        <option value="All">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                    
                    {activeTab === 'packages' && (
                      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none">
                        <option value="All">All Categories</option>
                        <option value="historical">Historical</option>
                        <option value="cultural">Cultural</option>
                        <option value="adventure">Adventure</option>
                        <option value="wildlife">Wildlife</option>
                      </select>
                    )}

                    {activeTab === 'destinations' && (
                      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none">
                        <option value="All">All Regions</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="Central">Central</option>
                      </select>
                    )}

                    {activeTab === 'articles' && (
                      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none">
                        <option value="All">All Categories</option>
                        <option value="Culture & Faith">Culture & Faith</option>
                        <option value="Food & Coffee">Food & Coffee</option>
                        <option value="Nature & Wildlife">Nature & Wildlife</option>
                        <option value="Heritage">Heritage</option>
                      </select>
                    )}
                    
                    <span className="ml-auto text-xs font-bold uppercase tracking-widest text-emerald-900/40">
                      {currentTabData.length} Results
                    </span>
                  </div>

                  {/* DATA TABLE */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-emerald-900/5 text-emerald-900/50 text-[11px] font-bold uppercase tracking-widest border-b border-emerald-900/5">
                            {activeTab === 'bookings' && (
                              <><th className="px-8 py-5">Client</th><th className="px-8 py-5">Package</th><th className="px-8 py-5">Dates</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Actions</th></>
                            )}
                            {activeTab === 'packages' && (
                              <><th className="px-8 py-5">Package Name</th><th className="px-8 py-5">Route</th><th className="px-8 py-5">Duration</th><th className="px-8 py-5 text-right">Actions</th></>
                            )}
                            {activeTab === 'destinations' && (
                              <><th className="px-8 py-5">Location</th><th className="px-8 py-5">Region</th><th className="px-8 py-5">Tagline</th><th className="px-8 py-5 text-right">Actions</th></>
                            )}
                            {activeTab === 'articles' && (
                              <><th className="px-8 py-5">Article Title</th><th className="px-8 py-5">Category</th><th className="px-8 py-5">Author</th><th className="px-8 py-5 text-right">Actions</th></>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-900/5">
                          
                          {paginatedData.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-8 py-20 text-center">
                                <Search className="w-8 h-8 text-emerald-300 mx-auto mb-4" />
                                <p className="text-emerald-900/50 font-bold text-lg">No {activeTab} found matching your filters.</p>
                              </td>
                            </tr>
                          )}

                          {activeTab === 'bookings' && paginatedData.map((booking) => (
                            <tr key={booking.id} onClick={() => setSelectedBooking(booking)} className="hover:bg-emerald-50/50 transition-colors group cursor-pointer">
                              <td className="px-8 py-5">
                                <p className="text-sm font-bold text-[#1A2E26]">{booking.clientName}</p>
                                <p className="text-xs font-medium text-emerald-900/50">{booking.email}</p>
                              </td>
                              <td className="px-8 py-5"><span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F2F6F4] text-xs font-bold"><Map className="w-3.5 h-3.5 text-emerald-600" /> {booking.packageName}</span></td>
                              <td className="px-8 py-5"><p className="text-sm font-bold">{booking.date}</p><p className="text-xs text-gray-500">{booking.travelers}</p></td>
                              <td className="px-8 py-5">
                                <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {booking.status !== 'confirmed' && <button onClick={(e) => { e.stopPropagation(); handleAccept(booking.id); }} className="p-2 text-emerald-600 bg-emerald-50 rounded-lg"><Check className="w-4 h-4" /></button>}
                                  {booking.status !== 'cancelled' && <button onClick={(e) => { e.stopPropagation(); handleReject(booking.id); }} className="p-2 text-amber-600 bg-amber-50 rounded-lg"><X className="w-4 h-4" /></button>}
                                  <button onClick={(e) => { e.stopPropagation(); handleDeleteBooking(booking.id); }} className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}

                          {['packages', 'destinations', 'articles'].includes(activeTab) && paginatedData.map((item: any) => (
                            <tr key={item.id} className="hover:bg-emerald-50/50 transition-colors group">
                              <td className="px-8 py-5">
                                <p className="text-sm font-bold text-[#1A2E26] max-w-sm truncate">{item.title || item.name}</p>
                                {activeTab === 'articles' && <p className="text-xs text-emerald-900/50">{item.publishedDate}</p>}
                              </td>
                              <td className="px-8 py-5">
                                {activeTab === 'packages' && <span className="text-xs font-bold bg-[#F2F6F4] px-3 py-1.5 rounded-xl"><MapPin className="w-3.5 h-3.5 inline text-emerald-600 mr-1" />{item.route}</span>}
                                {activeTab === 'destinations' && <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F2F6F4] px-3 py-1.5 rounded-full">{item.region}</span>}
                                {activeTab === 'articles' && <span className="text-[10px] font-bold uppercase tracking-widest bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-100">{item.category}</span>}
                              </td>
                              <td className="px-8 py-5 text-sm font-medium">
                                {activeTab === 'packages' && <span className="font-bold">{item.daysCount} Days</span>}
                                {activeTab === 'destinations' && <span className="text-gray-500">{item.tagline}</span>}
                                {activeTab === 'articles' && <div className="flex items-center gap-2"><img src={item.author?.avatar} className="w-6 h-6 rounded-full" /><span className="text-xs font-bold">{item.author?.name}</span></div>}
                              </td>
                              <td className="px-8 py-5 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleOpenEditor('edit', item)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                                  <button onClick={() => handleDeleteItem(item.id, activeTab)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}

                        </tbody>
                      </table>
                    </div>

                    {/* PAGINATION FOOTER */}
                    {totalPages > 1 && (
                      <div className="px-8 py-4 border-t border-emerald-900/5 bg-[#F2F6F4]/40 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-900/40 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
                        <div className="flex gap-2">
                          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Booking Details Overlay */}
      {selectedBooking && <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} onAccept={handleAccept} onReject={handleReject} onDelete={handleDeleteBooking} />}

      {/* Tour Package SaaS Modal */}
      <AdminTourModal isOpen={isTourModalOpen} onClose={() => { setIsTourModalOpen(false); setTourToEdit(null); }} onSave={handleSaveTour} initialData={tourToEdit} />

      {/* Generic SaaS Editor for Destinations and Articles */}
      {isGenericEditorOpen && activeTab !== 'packages' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsGenericEditorOpen(false)} />
          <div className="bg-gray-50 w-full max-w-4xl h-[85vh] rounded-[2rem] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            
            <div className="px-8 py-6 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-serif text-2xl font-bold capitalize">{editorMode === 'add' ? 'Add New' : 'Edit'} {activeTab.slice(0, -1)}</h2>
              </div>
              <button onClick={() => setIsGenericEditorOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleSaveGenericItem} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-8 flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-6">
                  
                  {activeTab === 'destinations' && (
                    <>
                      <input required value={editorData.name || ''} onChange={(e) => setEditorData({...editorData, name: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="Destination Name" />
                      <div className="grid grid-cols-2 gap-4">
                        <select required value={editorData.region || ''} onChange={(e) => setEditorData({...editorData, region: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none cursor-pointer">
                          <option value="" disabled>Select Region</option><option value="North">North</option><option value="South">South</option><option value="East">East</option><option value="Central">Central</option>
                        </select>
                        <input required value={editorData.tagline || ''} onChange={(e) => setEditorData({...editorData, tagline: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none" placeholder="Tagline" />
                      </div>
                      <textarea required rows={4} value={editorData.summary || ''} onChange={(e) => setEditorData({...editorData, summary: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none resize-none" placeholder="Summary Description" />
                    </>
                  )}

                  {activeTab === 'articles' && (
                    <>
                      <input required value={editorData.title || ''} onChange={(e) => setEditorData({...editorData, title: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none" placeholder="Article Title" />
                      <div className="grid grid-cols-2 gap-4">
                        <input required value={editorData.category || ''} onChange={(e) => setEditorData({...editorData, category: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none" placeholder="Category" />
                        <input required value={editorData.publishedDate || ''} onChange={(e) => setEditorData({...editorData, publishedDate: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none" placeholder="Date (e.g. Nov 14, 2026)" />
                      </div>
                      <textarea required rows={4} value={editorData.excerpt || ''} onChange={(e) => setEditorData({...editorData, excerpt: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none resize-none" placeholder="Excerpt" />
                    </>
                  )}
                </div>

                {/* Media Uploader */}
                <div className="w-full md:w-[320px]">
                  <div className="h-[260px] flex justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white relative overflow-hidden">
                    {isUploading ? (
                      <div className="flex flex-col items-center justify-center w-full h-full"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" /></div>
                    ) : (activeTab === 'articles' ? editorData.coverImage : editorData.image) ? (
                      <div className="relative w-full h-full">
                        <img src={activeTab === 'articles' ? editorData.coverImage : editorData.image} className="w-full h-full object-cover" />
                        <label className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-white shadow-lg"><UploadCloud className="w-4 h-4 inline mr-2" /> Replace<input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} /></label>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full text-center">
                        <UploadCloud className="h-8 w-8 text-emerald-600 mb-3" />
                        <label className="cursor-pointer font-bold text-emerald-600 hover:underline">Click to browse<input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} /></label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Strict Modal Footer inside form */}
              <div className="px-8 py-5 border-t border-gray-200 bg-white flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsGenericEditorOpen(false)} className="px-6 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-8 py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all disabled:opacity-70 flex items-center gap-2">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 stroke-[3]" />}
                  Save {activeTab.slice(0, -1)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}