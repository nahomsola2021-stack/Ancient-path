import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.code === 'auth/invalid-credential'
        ? 'Invalid email or password. Please check your credentials and try again.'
        : err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f211d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#cc6548] flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Ancient Path</h1>
          <p className="text-[#9ca3af] text-sm tracking-widest uppercase mt-1">Admin Console</p>
        </div>

        <div className="bg-[#1a362f] border border-[#264b42] rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Sign In to Your Dashboard</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0f211d] border border-[#264b42] rounded-lg px-4 py-3 text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#cc6548] focus:ring-1 focus:ring-[#cc6548] transition-all"
                placeholder="admin@ancientpathethiopia.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0f211d] border border-[#264b42] rounded-lg px-4 py-3 pr-12 text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#cc6548] focus:ring-1 focus:ring-[#cc6548] transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#cc6548] hover:bg-[#b5543a] text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#264b42]">
            <p className="text-xs text-[#9ca3af] text-center">
              Secure admin authentication powered by Firebase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;