import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useChatStore from '../store/useChatStore';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { requestPasswordReset } = useChatStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestPasswordReset(email);
      // Navigate to verify code page, passing email in state
      navigate('/verify-code', { state: { email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-brand-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6 link-lift">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-secondary-500 flex items-center justify-center shadow-xl shadow-brand-500/20 btn-magnetic">
              <span className="text-white font-bold text-xl">V</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Forgot Password</h1>
          <p className="text-dark-400">Enter your email to receive a reset code.</p>
        </div>

        <div className="glass-card border border-white/5 rounded-3xl p-8 shadow-2xl relative">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-500 to-secondary-500 hover:from-brand-400 hover:to-secondary-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 btn-magnetic"
            >
              {loading ? 'Sending code...' : 'Send Reset Code'}
            </button>
          </form>

          <p className="text-center text-dark-400 mt-8 text-sm">
            Remembered your password?{' '}
            <Link to="/login" className="text-white hover:text-brand-400 font-medium transition-colors link-lift">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
