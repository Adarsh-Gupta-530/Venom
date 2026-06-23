import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useChatStore from '../store/useChatStore';

export default function VerifyCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyResetCode } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await verifyResetCode(email, fullCode);
      navigate('/reset-password', { state: { email, code: fullCode } });
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
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Check your email</h1>
          <p className="text-dark-400">We sent a 6-digit code to <span className="text-white">{email}</span></p>
        </div>

        <div className="glass-card border border-white/5 rounded-3xl p-8 shadow-2xl relative">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 bg-dark-900/50 border border-white/10 rounded-xl text-center text-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-500 to-secondary-500 hover:from-brand-400 hover:to-secondary-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 btn-magnetic"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>

          <p className="text-center text-dark-400 mt-8 text-sm">
            Didn't receive a code?{' '}
            <Link to="/forgot-password" className="text-white hover:text-brand-400 font-medium transition-colors link-lift">
              Try again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
