'use client';
import Link from 'next/link';
import { ArrowRight, Leaf, Shield, BarChart3, Users, MapPin, Wind, Droplets, Sun, TreePine, Globe } from 'lucide-react';
import { ROLES } from '@/lib/roles';
import ThemeToggle from '@/components/ThemeToggle';

const stats = [
  { value: '500+', label: 'Green Spaces', sub: 'Mapped & monitored' },
  { value: '12K+', label: 'Active Citizens', sub: 'Engaged daily' },
  { value: '98%', label: 'Resolution Rate', sub: 'Safety reports' },
  { value: '40+', label: 'Cities', sub: 'Across the country' },
];

const features = [
  { icon: MapPin,    title: 'Interactive Park Maps',    desc: 'Real-time spatial data, heatmaps, and amenity discovery with dynamic mapping.', accent: '#34d399' },
  { icon: Shield,    title: "Women's Safety First",     desc: 'Priority safety reporting with real-time alerts and inclusive access tools.',    accent: '#60a5fa' },
  { icon: Wind,      title: 'Microclimate Monitoring',  desc: 'Live temperature, humidity, and air quality sensors across all parks.',          accent: '#22d3ee' },
  { icon: BarChart3, title: 'Actionable Insights',      desc: 'Data-driven dashboards helping managers optimize resources and maintenance.',     accent: '#a78bfa' },
  { icon: TreePine,  title: 'Ecological Resilience',    desc: 'Track biodiversity, canopy coverage, and sustainable material usage.',           accent: '#4ade80' },
  { icon: Users,     title: 'Community Engagement',     desc: 'Events, feedback loops, and co-creation tools for vibrant communities.',         accent: '#fb923c' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>

      {/* ── Navbar ── */}
      <nav className="glass-nav fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 14px var(--shadow-accent)' }}>
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              PARK<span style={{ color: 'var(--accent)' }}>LY</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {['Features', 'Roles', 'Impact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm rounded-lg transition-all"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="px-4 py-2 text-sm rounded-lg transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Sign in
            </Link>
            <Link href="/register" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all"
              style={{ background: 'var(--accent)', boxShadow: '0 4px 14px var(--shadow-accent)' }}>
              Get started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[120px]" style={{ background: 'var(--glow-1)' }} />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[100px]" style={{ background: 'var(--glow-2)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`, backgroundSize: '72px 72px' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--bg-base) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-8 tracking-wide"
            style={{ borderColor: 'var(--accent-border)', background: 'var(--accent-bg)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            Smart Urban Park Platform
          </div>

          <h1 className="text-5xl md:text-[72px] font-bold leading-[1.05] tracking-tight mb-6">
            Your City's Parks,
            <br />
            <span className="gradient-text">Smarter & Safer</span>
          </h1>

          <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Technology-driven platform connecting citizens, event organizers, maintenance staff, and administrators
            to build more inclusive, data-informed urban parks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/register"
              className="group flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', boxShadow: '0 8px 24px var(--shadow-accent)' }}>
              Start for free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/login"
              className="flex items-center gap-2 px-7 py-3.5 font-medium rounded-xl transition-all hover:-translate-y-0.5 glass"
              style={{ color: 'var(--text-secondary)' }}>
              Sign in to dashboard
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              { icon: '🗺️', text: 'Live Park Maps' }, { icon: '🌡️', text: 'Microclimate Data' },
              { icon: '🔒', text: 'Safety Reporting' }, { icon: '🌱', text: 'Eco Tracking' },
              { icon: '📊', text: 'Analytics' }, { icon: '👥', text: 'Community' },
            ].map((p) => (
              <span key={p.text} className="flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-full text-xs"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
                <span>{p.icon}</span>{p.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="impact" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6 text-center transition-all hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border-subtle)' }}>
                <p className="text-3xl font-bold gradient-text mb-1">{s.value}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{s.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Platform Features</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>Built for every need</h2>
            <p className="max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              From casual park visitors to urban planners — powerful tools for every stakeholder.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="glass-card rounded-2xl p-6 transition-all group hover:-translate-y-1"
                  style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: `${f.accent}18`, color: f.accent }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section id="roles" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Who It's For</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>Four roles, one platform</h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Each role gets a tailored experience with dedicated tools and dashboards.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROLES.map((role) => (
              <div key={role.value} className="glass-card rounded-2xl p-6 transition-all group hover:-translate-y-1.5 flex flex-col"
                style={{ borderColor: 'var(--border-subtle)' }}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-xl mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                  {role.icon}
                </div>
                <h3 className="font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{role.label}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--text-muted)' }}>{role.description}</p>
                <Link href={`/register?role=${role.value}`}
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors group/link"
                  style={{ color: 'var(--accent)' }}>
                  Join as {role.label} <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden glow-emerald"
            style={{ borderColor: 'var(--accent-border)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, var(--accent-bg), transparent)' }} />
            <div className="relative z-10">
              <div className="flex justify-center gap-3 mb-6">
                {[Sun, Leaf, Droplets, Globe].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 glass rounded-xl flex items-center justify-center" style={{ borderColor: 'var(--border-base)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                Ready to transform your city's parks?
              </h2>
              <p className="mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Join thousands of citizens, organizers, and staff building smarter, safer, and more inclusive parks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/register"
                  className="flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--accent)', boxShadow: '0 8px 24px var(--shadow-accent)' }}>
                  Create free account <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login"
                  className="px-8 py-3.5 glass font-medium rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-base)' }}>
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              PARK<span style={{ color: 'var(--accent)' }}>LY</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2025 Parkly Platform. All rights reserved.</p>
          <div className="flex gap-5 text-xs" style={{ color: 'var(--text-muted)' }}>
            {['Privacy', 'Terms', 'Contact'].map((l) => (
              <a key={l} href="#" className="transition-colors hover:opacity-80">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
