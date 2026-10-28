import React from 'react';
import { Calendar, Package, MapPin, FileText } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick: () => void;
}

export function SidebarItem({ icon, label, active = false, count = 0, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
        active
          ? 'bg-[#cc6548] text-white'
          : 'text-[#9ca3af] hover:bg-[#264b42] hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3 font-medium">
        {icon}
        {label}
      </div>
      {count > 0 && (
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            active ? 'bg-[#0f211d] text-[#cc6548]' : 'bg-[#264b42] text-white'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  counts: {
    bookings: number;
    packages: number;
    destinations: number;
    articles: number;
  };
  onLogout: () => void;
}

export function Sidebar({ activeTab, onNavigate, counts, onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#1a362f] border-r border-[#264b42] flex flex-col justify-between">
      <div>
        <div className="h-20 flex items-center px-6 border-b border-[#264b42]">
          <div className="flex items-center gap-3 flex-col items-start">
            <span className="text-[#cc6548] font-bold text-xl tracking-wide uppercase">
              Ancient Path
            </span>
            <span className="text-[#9ca3af] text-xs font-semibold tracking-widest">CONSOLE</span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarItem
            icon={<Calendar size={20} />}
            label="Bookings"
            active={activeTab === 'bookings'}
            count={counts.bookings}
            onClick={() => onNavigate('bookings')}
          />
          <SidebarItem
            icon={<Package size={20} />}
            label="Packages"
            active={activeTab === 'packages'}
            count={counts.packages}
            onClick={() => onNavigate('packages')}
          />
          <SidebarItem
            icon={<MapPin size={20} />}
            label="Destinations"
            active={activeTab === 'destinations'}
            count={counts.destinations}
            onClick={() => onNavigate('destinations')}
          />
          <SidebarItem
            icon={<FileText size={20} />}
            label="Articles"
            active={activeTab === 'articles'}
            count={counts.articles}
            onClick={() => onNavigate('articles')}
          />
        </nav>
      </div>

      <div className="p-4 border-t border-[#264b42]">
        <div className="mb-4 px-2">
          <p className="text-xs text-[#9ca3af]">ADMIN ACCOUNT</p>
          <p className="text-sm font-medium truncate">
            {typeof window !== 'undefined'
              ? (JSON.parse(localStorage.getItem('ap_admin_email') || '"admin@ancientpathethiopia.com"'))
              : 'admin@ancientpathethiopia.com'}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#9ca3af] hover:text-white hover:bg-[#264b42] rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

