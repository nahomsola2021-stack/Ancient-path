import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f211d] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#cc6548] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#9ca3af]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

