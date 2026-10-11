
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '✦',
    title: 'Bayesian AI Models',
    description: 'Predict multi-channel demand spikes for Gillette, Healthcare & FMCG categories.',
  },
  {
    icon: '▣',
    title: 'Field POS Van Dispatch',
    description: 'Offline-ready Bluetooth thermal printing & live route GPS telemetry.',
  },
  {
    icon: '⇄',
    title: 'SAP S/4HANA ERP',
    description: 'Sub-second ledger synchronization across all 5 provincial hubs.',
  },
  {
    icon: '◇',
    title: 'Role-Based Access (RBAC)',
    description: 'Role-based access and audit trail support for stock transactions.',
  },
];

function Icon({ name, size = 18 }) {
  const paths = {
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    eyeOff: (
      <>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13 13 0 0 1-1.67 2.68M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <path d="M2 2l20 20" />
      </>
    ),
    arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setNotice('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setNotice('');

    // Demo only. Replace with backend authentication later.
    window.setTimeout(() => {
      setLoading(false);

      if (mode === 'signup') {
        setNotice(
          'Demo only: Account registration requires IT administrator approval. No request was sent.'
        );
      } else {
        navigate('/inventory');
      }
    }, 600);
  }

  const inputWrap =
    'flex items-center rounded-xl bg-[#f5f9f6] border border-slate-200 focus-within:border-[#054332] focus-within:ring-2 focus-within:ring-emerald-700/20 transition-all';

  const tab = (selected) =>
    `w-1/2 rounded-full px-3 py-3 text-xs font-bold transition ${
      selected
        ? 'bg-[#054332] text-white shadow-sm'
        : 'text-[#065f46] hover:bg-emerald-100'
    }`;

  return (
    <div
      className="relative min-h-screen bg-[#021e15] text-slate-200 flex flex-col justify-center overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}
      </style>

      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: '38px 38px',
          backgroundImage:
            'linear-gradient(to right,rgba(52,211,153,.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(52,211,153,.035) 1px,transparent 1px)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 15% 35%,rgba(16,185,129,.14),transparent 60%),radial-gradient(circle at 85% 65%,rgba(52,211,153,.09),transparent 65%)',
        }}
      />

      <main className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">

          {/* LEFT SIDE */}
          <section className="lg:col-span-7 flex flex-col gap-7 xl:pr-4">

            {/* Logo */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-3 shadow-lg">
                <div className="flex flex-col">
                  <span className="text-emerald-950 font-black text-lg tracking-tight leading-none">
                    Hayleys
                  </span>
                  <span className="text-[#d81e05] font-extrabold text-[8px] tracking-[.22em] mt-1">
                    CONSUMER
                  </span>
                </div>

                <svg width="26" height="26" viewBox="0 0 32 32">
                  <circle cx="16" cy="6.5" r="3.2" fill="#E11D48" />
                  <circle cx="23.5" cy="11" r="3.2" fill="#F59E0B" />
                  <circle cx="23.5" cy="21" r="3.2" fill="#10B981" />
                  <circle cx="16" cy="25.5" r="3.2" fill="#0284C7" />
                  <circle cx="8.5" cy="21" r="3.2" fill="#6366F1" />
                  <circle cx="8.5" cy="11" r="3.2" fill="#EA580C" />
                  <circle cx="16" cy="16" r="2.2" fill="#047857" />
                </svg>
              </div>

              <div>
                <span className="inline-block bg-[#052b1f] border border-[#14563f] text-[#34d399] font-bold text-xs px-3 py-1 rounded-md">
                  StockPulse IMS
                </span>
                <p className="text-[10px] font-bold text-emerald-300/60 uppercase tracking-[.14em] mt-1.5">
                  Hayleys Consumer Supply Chain & Distribution
                </p>
              </div>
            </div>

            {/* Gateway badge */}
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#052e20]/80 border border-[#124f3a] text-emerald-300 text-[11px] font-bold tracking-wider">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                ENTERPRISE LOGIN • DEMO
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl xl:text-[46px] font-extrabold text-white tracking-tight leading-[1.15]">
                Next-Generation
                <br />
                Inventory Intelligence & AI
                <br />
                Demand Forecasting.
              </h1>

              <p className="text-emerald-100/75 text-sm sm:text-base leading-relaxed max-w-2xl">
                Empowering Hayleys PLC logistics hubs, island-wide FMCG
                distribution centers, and field POS fleets with real-time
                stock synchronization and predictive forecasting.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-2xl">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-[#062d20]/80 hover:bg-[#083526] border border-[#114837] hover:border-[#1d6b52] rounded-2xl p-4 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-[#34d399] text-xl">
                      {feature.icon}
                    </span>
                    <h3 className="text-sm font-bold text-[#34d399]">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-xs text-emerald-200/65 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 flex flex-wrap gap-3 items-center justify-between max-w-2xl text-xs text-emerald-300/65 font-medium border-t border-[#0d3c2e]/60">
              <span>© 2026 Hayleys PLC • Advantis Group</span>
              <span>System Health: Demo</span>
            </div>
          </section>

          {/* RIGHT SIDE - LOGIN FORM */}
          <section className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] bg-white rounded-[32px] p-7 sm:p-10 shadow-2xl border border-emerald-950/10 text-slate-800">

              {/* Tabs */}
              <div className="bg-[#edf5f0] p-1.5 rounded-full flex mb-8 border border-emerald-900/5">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setNotice('');
                  }}
                  className={tab(mode === 'signin')}
                >
                  Sign In (Login)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setNotice('');
                  }}
                  className={tab(mode === 'signup')}
                >
                  Sign Up (Register)
                </button>
              </div>

              {/* Form heading */}
              <div className="mb-7">
                <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
                  {mode === 'signin'
                    ? 'Welcome back'
                    : 'Register Enterprise Account'}
                </h2>

                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  {mode === 'signin'
                    ? 'Sign in with your corporate email to access StockPulse.'
                    : 'Request role provisioning through Hayleys HR & IT Directory (demo).'}
                </p>
              </div>

              {notice && (
                <div
                  role="status"
                  className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800"
                >
                  {notice}
                </div>
              )}

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="corporate-email"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700"
                  >
                    Corporate Email Address
                  </label>

                  <div className={inputWrap}>
                    <span className="pl-3.5 pr-2.5 text-slate-500">
                      <Icon name="mail" />
                    </span>

                    <input
                      id="corporate-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pr-3.5 text-xs sm:text-sm font-medium text-slate-800 bg-transparent outline-none"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="security-password"
                      className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700"
                    >
                      Security Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setNotice(
                          'Password recovery is unavailable in demo mode. Contact your IT administrator.'
                        )
                      }
                      className="text-xs font-semibold text-slate-500 hover:text-[#054332]"
                    >
                      Forgot?
                    </button>
                  </div>

                  <div className={inputWrap}>
                    <span className="pl-3.5 pr-2.5 text-slate-500">
                      <Icon name="lock" />
                    </span>

                    <input
                      id="security-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete={
                        mode === 'signin'
                          ? 'current-password'
                          : 'new-password'
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pr-2 text-xs sm:text-sm font-medium text-slate-800 bg-transparent outline-none"
                      placeholder="••••••••••••"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3.5 text-slate-400 hover:text-slate-700"
                    >
                      <Icon name={showPassword ? 'eyeOff' : 'eye'} />
                    </button>
                  </div>
                </div>

                {/* Demo indicator */}
                <div className="flex items-center justify-end pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-[#e6f7ef] text-[#056042] text-[11px] font-extrabold">
                    Demo Login UI
                  </span>
                </div>

                {/* Submit */}
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#054332] hover:bg-[#033326] disabled:opacity-60 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  {loading
                    ? 'Processing demo...'
                    : mode === 'signin'
                    ? 'Sign In to Inventory'
                    : 'Submit Provisioning Request'}

                  {!loading && <Icon name="arrow" size={17} />}
                </button>
              </form>

              {/* Login footer */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold">
                  <span className="text-emerald-600">
                    <Icon name="shield" />
                  </span>
                  <span className="text-[11px]">
                    Hayleys Corporate Directory
                  </span>
                </div>

                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Demo UI
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
