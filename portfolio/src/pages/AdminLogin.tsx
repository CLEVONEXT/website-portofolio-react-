import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import authService from '../services/authService';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const checkExisting = async () => {
      const session = await authService.getSession();
      if (session) {
        navigate('/admin/dashboard');
      }
      setCheckingAuth(false);
    };

    checkExisting();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.signIn(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-surface border border-accent-soft rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-strong mb-2">
              Admin <span className="text-accent">Login</span>
            </h1>
            <p className="text-muted">Manage your portfolio certificates</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-body mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-3 text-accent" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-body mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3 text-accent" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-start">
                <AlertCircle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2 bg-accent hover:opacity-90 disabled:opacity-50 text-[#16181d] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader size={20} className="mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-muted text-xs mt-6">
            Only authorized users can access this panel
          </p>
        </div>
      </motion.div>
    </div>
  );
}

