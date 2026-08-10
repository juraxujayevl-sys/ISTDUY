import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateAdminCode } from '../services/supabaseService';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const storedCode = localStorage.getItem('istudy-admin-code');
        const loginTs = Number(localStorage.getItem('istudy-admin-login-ts'));

        if (storedCode && loginTs && Date.now() - loginTs < 3600 * 1000) {
          await validateAdminCode(storedCode);
          navigate('/admin', { replace: true });
        }
      } catch {
        // Ignore, stay on login page.
      }
    };

    verifySession();
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await validateAdminCode(adminCode.trim());
      localStorage.setItem('istudy-admin-code', adminCode.trim());
      localStorage.setItem('istudy-admin-login-ts', `${Date.now()}`);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-800/90 bg-slate-900/95 p-10 shadow-2xl shadow-black/30">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-400">Enter the admin code stored in Supabase to access the admin panel.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2" htmlFor="admin-code">
              Admin Code
            </label>
            <input
              id="admin-code"
              type="text"
              value={adminCode}
              onChange={(event) => setAdminCode(event.target.value)}
              placeholder="Enter your admin code"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-2xl bg-rose-950/80 border border-rose-700 p-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-400">
          <p>Admin panel access is protected by Supabase Auth.</p>
          <p className="mt-2">Sessions are enforced with an hourly re-login requirement.</p>
        </div>
      </div>
    </div>
  );
};
