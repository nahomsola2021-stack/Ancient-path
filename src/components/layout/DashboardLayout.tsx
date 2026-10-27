import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: {
    bookings: number;
    packages: number;
    destinations: number;
    articles: number;
  };
  onLogout: () => void;
  children: React.ReactNode;
}

export function DashboardLayout({
  activeTab,
  onTabChange,
  counts,
  onLogout,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#0f211d] text-[#f8fafc] font-sans overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onNavigate={onTabChange}
        counts={counts}
        onLogout={onLogout}
      />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}