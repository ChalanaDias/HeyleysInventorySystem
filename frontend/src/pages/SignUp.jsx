
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = [
  'Warehouse Manager',
  'Inventory Controller',
  'Procurement Specialist',
  'QA Auditor',
  'Logistics Dispatcher',
];

const facilities = [
  'Central Hub A (Kelaniya)',
  'North Distribution Hub',
  'South Distribution Hub',
  'East Distribution Hub',
];

const initialForm = {
  name: '',
  email: '',
  employeeId: '',
  role: 'Inventory Controller',
  facility: 'Central Hub A (Kelaniya)',
  password: '',
  confirmPassword: '',
  agreed: false,
};

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!form.agreed) {
      setError('Please accept the security agreement.');
      return;
    }

    // Frontend demonstration only.
    // No account is created or stored.
    setSuccess(
      'Registration form validated successfully. Demo only: no account was created. Contact your administrator for account provisioning.'
    );
  };

  const inputClass =
    'w-full rounded-xl border border-emerald-100 bg-[#f0faf4] px-4 py-3 text-sm text-[#09271d] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100';

  const labelClass =
    'mb-2 block text-xs font-extrabold uppercase text-[#09271d]';

  return (
    <div className="min-h-screen bg-[#062318] font-sans lg:grid lg:grid-cols-2">
      {/* Left branding panel */}
      <section className="flex flex-col justify-center bg-[#062318] px-7 py-12 text-white sm:px-12 lg:min-h-screen lg:px-14">
        <div className="mb-16 flex flex-wrap items-center gap-5">
          <div className="rounded-xl bg-white px-5 py-3">
            <div className="text-xl font-black text-[#064532]">
              Hayleys
            </div>
            <div className="text-[9px] font-bold tracking-[0.3em] text-red-600">
              CONSUMER
            </div>
          </div>

          <div>
            <span className="rounded-lg border border-emerald-700 px-3 py-2 font-mono font-bold text-emerald-400">
              StockPulse IMS
            </span>
            <p className="mt-3 text-xs uppercase tracking-wider text-emerald-300">
              Hayleys Consumer Supply Chain & Distribution
            </p>
          </div>
        </div>

        <div className="mb-7">
          <span className="rounded-full border border-emerald-700 bg-emerald-950 px-4 py-2 text-xs font-bold text-emerald-300">
            ● ENTERPRISE REGISTRATION • DEMO
          </span>
        </div>

        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Next-Generation Inventory Intelligence & AI Demand Forecasting.
        </h1>

        <p className="mt-7 max-w-xl leading-7 text-emerald-200">
          Empowering Hayleys PLC logistics hubs, island-wide FMCG
          distribution centers, and field POS fleets with real-time
          stock synchronization and predictive forecasting.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            '✦ Bayesian AI Models',
            '▣ Field POS Van Dispatch',
            '⇄ SAP S/4HANA ERP',
            '◇ Role-Based Access (RBAC)',
          ].map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-emerald-900 bg-[#092e21] p-4 text-sm font-semibold text-emerald-300"
            >
              {feature}
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-emerald-300/60">
          © 2026 Hayleys PLC • StockPulse IMS Demo
        </p>
      </section>

      {/* Right registration panel */}
      <section className="flex items-center justify-center bg-[#f5faf7] px-4 py-10 sm:px-8 lg:py-12">
        <div className="w-full max-w-[400px] rounded-[32px] border border-emerald-950/10 bg-white p-7 shadow-2xl sm:p-10 text-slate-800">
          <div className="mb-8 flex rounded-full bg-[#edf7f1] p-1.5">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-1/2 rounded-full px-3 py-3 text-sm font-bold text-[#065f46]"
            >
              Sign In (Login)
            </button>

            <button
              type="button"
              className="w-1/2 rounded-full bg-[#005b3b] px-3 py-3 text-sm font-bold text-white"
            >
              Sign Up (Register)
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-[#09271d]">
            Register Employee Account
          </h2>
          <p className="mb-7 mt-2 text-sm text-emerald-800">
            Provision your digital access badge for Hayleys Advantis IMS.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Full Legal Name</label>
              <input
                className={inputClass}
                placeholder="e.g. Kasun Jayawardena"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Corporate Email</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="k.jaya@hayleys.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Employee ID / EPF</label>
                <input
                  className={inputClass}
                  placeholder="HL-EMP-8831"
                  value={form.employeeId}
                  onChange={(e) => update('employeeId', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Operational Role</label>
                <select
                  className={inputClass}
                  value={form.role}
                  onChange={(e) => update('role', e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Primary Facility / Hub</label>
                <select
                  className={inputClass}
                  value={form.facility}
                  onChange={(e) => update('facility', e.target.value)}
                >
                  {facilities.map((facility) => (
                    <option key={facility}>{facility}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Create Password</label>
                <input
                  type="password"
                  className={inputClass}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Confirm Password</label>
                <input
                  type="password"
                  className={inputClass}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    update('confirmPassword', e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-3 text-xs leading-5 text-emerald-900">
              <input
                type="checkbox"
                className="mt-1 accent-emerald-700"
                checked={form.agreed}
                onChange={(e) => update('agreed', e.target.checked)}
              />
              <span>
                I agree to the Hayleys Information Security Standard
                and acknowledge that stock transactions are audited.
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#005b3b] px-4 py-4 font-bold text-white shadow-md transition hover:bg-[#03432e]"
            >
              Validate Registration (Demo) →
            </button>
          </form>

          <div className="mt-7 border-t border-emerald-100 pt-5 text-center text-xs text-slate-500">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-bold text-emerald-800 hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
