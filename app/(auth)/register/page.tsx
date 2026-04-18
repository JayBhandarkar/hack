'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Leaf, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ROLES, Role } from '@/lib/roles';
import api from '@/lib/api';
import ThemeToggle from '@/components/ThemeToggle';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get('role') as Role) || 'citizen';

  const [selectedRole, setSelectedRole] = useState<Role>(defaultRole);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getStrength = (p: string) => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = getStrength(form.password);
  const strengthMeta = [
    { color: '#ef4444', label: 'Weak' },
    { color: '#ef4444', label: 'Weak' },
    { color: '#f97316', label: 'Fair' },
    { color: '#eab308', label: 'Good' },
    { color: '#22c55e', label: 'Strong' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name, email: form.email, password: form.password, role: selectedRole,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(`Welcome to Parkly, ${data.user.name}!`);
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const activeRole = ROLES.find((r) => r.value === selectedRole)!;

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: 'var(--bg-base)' }}>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col w-[460px] flex-shrink-0 relative p-10 overflow-hidden"
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
          <div className="absolute top-0 left-0 w-full h-64" style={{ background: 'radial-gradient(ellipse at top left, var(--glow-1), transparent 70%)' }} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 14px var(--shadow-accent)' }}>
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              PARK<span style={{ color: 'var(--accent)' }}>LY</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center py-12">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
              style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
              {activeRole.icon}
            </div>
            <h2 className="text-3xl font-bold mb-3 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Join as<br /><span style={{ color: 'var(--accent)' }}>{activeRole.label}</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              {activeRole.description}. Get access to your personalized dashboard and tools.
            </p>
            <div className="space-y-3">
              {['Free to join, no credit card needed', 'Role-specific dashboard & tools', 'Real-time park data & community access'].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
                    <Check className="w-2.5 h-2.5" style={{ color: 'var(--accent)' }} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2025 Parkly Platform</p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-y-auto">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[400px] py-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm transition-colors mb-8 group"
            style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to home
          </Link>

          <div className="mb-7">
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Create account</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Select your role and fill in your details</p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-muted)' }}>I am a</p>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((role) => (
                <button key={role.value} type="button" onClick={() => setSelectedRole(role.value)}
                  className={`role-btn ${selectedRole === role.value ? 'active' : ''} relative`}>
                  {selectedRole === role.value && (
                    <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--accent)' }}>
                      <Check className="w-2 h-2 text-white" strokeWidth={3} />
                    </span>
                  )}
                  <span className="text-base">{role.icon}</span>
                  <span>{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full name</label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="theme-input w-full rounded-xl px-4 py-3 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email address</label>
              <input type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="theme-input w-full rounded-xl px-4 py-3 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 6 characters"
                  className="theme-input w-full rounded-xl px-4 py-3 pr-11 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? strengthMeta[strength].color : 'var(--border-base)' }} />
                    ))}
                  </div>
                  <span className="text-xs w-10 text-right" style={{ color: 'var(--text-muted)' }}>{strengthMeta[strength].label}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Confirm password</label>
              <input type="password" required value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="theme-input w-full rounded-xl px-4 py-3 text-sm"
                style={form.confirmPassword && form.password !== form.confirmPassword
                  ? { borderColor: 'rgba(239,68,68,0.5)' } : {}} />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>Passwords do not match</p>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ background: 'var(--accent)', boxShadow: '0 4px 16px var(--shadow-accent)' }}>
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
              ) : (
                <>Create account as {activeRole.label} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <Link href={`/login?role=${selectedRole}`} className="font-medium transition-colors" style={{ color: 'var(--accent)' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return <Suspense><RegisterForm /></Suspense>;
}
