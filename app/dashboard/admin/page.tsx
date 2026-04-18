'use client';
import { Users, MapPin, BarChart3, CheckCircle, AlertTriangle, TrendingUp, Brain, Wallet, TreePine, Clock, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const stats = [
  { label: 'Total Users',     value: '12,430', delta: '+234',  up: true,  icon: Users,        color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
  { label: 'Active Parks',    value: '500+',   delta: '+12',   up: true,  icon: MapPin,       color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  { label: 'Pending Actions', value: '15',     delta: '5 urgent',up:false,icon: AlertTriangle,color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  { label: 'System Health',   value: '99.9%',  delta: 'Normal', up: true, icon: CheckCircle,  color: '#4ade80', bg: 'rgba(74,222,128,0.12)'  },
];

const pendingApprovals = [
  { type: 'Event',   name: 'Morning Yoga at Lodhi Garden',    by: 'Priya Sharma',   time: '2h ago',  urgent: false },
  { type: 'Booking', name: 'Ground B — Nehru Park (Sat)',     by: 'Rahul Events Co',time: '3h ago',  urgent: false },
  { type: 'Event',   name: 'Tree Plantation Drive',           by: 'EcoClub Delhi',  time: '5h ago',  urgent: false },
  { type: 'Staff',   name: 'New Maintenance Staff Request',   by: 'HR Dept',        time: '1d ago',  urgent: true  },
];

const footfallData = [
  { park: 'Lodhi Garden',   today: 1240, week: 8430, trend: 'up'   },
  { park: 'Nehru Park',     today: 890,  week: 6120, trend: 'up'   },
  { park: 'Sunder Nursery', today: 560,  week: 3890, trend: 'down' },
  { park: 'Deer Park',      today: 720,  week: 5010, trend: 'up'   },
  { park: 'Talkatora',      today: 340,  week: 2340, trend: 'down' },
];

const complaints = [
  { id: '#1042', issue: 'Broken bench near Gate 2',    park: 'Lodhi Garden',   status: 'open',        priority: 'high'   },
  { id: '#1041', issue: 'Overflowing dustbin',         park: 'Nehru Park',     status: 'in-progress', priority: 'medium' },
  { id: '#1040', issue: 'Broken water fountain',       park: 'Deer Park',      status: 'resolved',    priority: 'low'    },
  { id: '#1039', issue: 'Unsafe lighting at night',    park: 'Sunder Nursery', status: 'open',        priority: 'high'   },
];

const budget = [
  { category: 'Maintenance',   spent: 42000,  total: 60000  },
  { category: 'Events',        spent: 18000,  total: 30000  },
  { category: 'Eco Projects',  spent: 9500,   total: 20000  },
  { category: 'Infrastructure',spent: 75000,  total: 100000 },
];

const statusColor: Record<string, string> = {
  open: '#f87171', 'in-progress': '#fbbf24', resolved: '#34d399',
};
const priorityColor: Record<string, string> = {
  high: '#f87171', medium: '#fbbf24', low: '#34d399',
};

export default function AdminDashboard({ user }: { user: any }) {
  const accent = '#fb923c';

  return (
    <div className="p-6 space-y-6">

      {/* ── Welcome banner ── */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(239,68,68,0.06))', border: '1px solid rgba(251,146,60,0.2)' }}>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20">⚙️</div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: accent }}>Admin Control Center</p>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Welcome, {user?.name?.split(' ')[0]}!</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          15 pending actions require your attention today. 5 are urgent.
        </p>
        <div className="flex gap-3 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: accent, boxShadow: '0 4px 14px rgba(251,146,60,0.3)' }}>
            <CheckCircle className="w-4 h-4" /> Review Approvals
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(251,146,60,0.1)', color: accent, border: '1px solid rgba(251,146,60,0.25)' }}>
            <BarChart3 className="w-4 h-4" /> Analytics
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{ border: '1px solid var(--border-subtle)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: s.up ? '#34d399' : '#f87171' }}>
                  {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {s.delta}
                </div>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">

          {/* Pending Approvals */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Pending Approvals</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171' }}>
                {pendingApprovals.length} pending
              </span>
            </div>
            <div className="space-y-2">
              {pendingApprovals.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: `1px solid ${a.urgent ? 'rgba(248,113,113,0.2)' : 'var(--border-subtle)'}` }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{ background: a.type === 'Event' ? 'rgba(167,139,250,0.12)' : a.type === 'Booking' ? 'rgba(96,165,250,0.12)' : 'rgba(248,113,113,0.12)', color: a.type === 'Event' ? '#a78bfa' : a.type === 'Booking' ? '#60a5fa' : '#f87171' }}>
                      {a.type}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{a.name}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>by {a.by} · {a.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>✓ Approve</button>
                    <button className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171' }}>✗ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footfall Analytics */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Footfall Analytics</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>Today</span>
            </div>
            <div className="space-y-3">
              {footfallData.map((f) => {
                const pct = Math.round((f.today / 1500) * 100);
                return (
                  <div key={f.park}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{f.park}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{f.today.toLocaleString()} visitors</span>
                        <span style={{ color: f.trend === 'up' ? '#34d399' : '#f87171' }}>
                          {f.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, #ef4444)` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complaint Management */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Complaint Management</h3>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>4 total</span>
            </div>
            <div className="space-y-2">
              {complaints.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{c.id}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{c.issue}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{c.park}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full capitalize"
                      style={{ background: `${priorityColor[c.priority]}18`, color: priorityColor[c.priority] }}>
                      {c.priority}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full capitalize"
                      style={{ background: `${statusColor[c.status]}18`, color: statusColor[c.status] }}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right col ── */}
        <div className="space-y-5">

          {/* AI Insights */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid rgba(167,139,250,0.2)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4" style={{ color: '#a78bfa' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>AI Insights</h3>
            </div>
            {[
              { icon: '📈', text: 'Lodhi Garden footfall up 23% this week — consider adding more staff on weekends.' },
              { icon: '⚠️', text: 'Deer Park lighting complaints increased. Predictive maintenance recommended.' },
              { icon: '🌱', text: 'Eco activity participation up 40%. Expand tree plantation drives.' },
            ].map((ins, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl mb-2"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <span className="text-base flex-shrink-0">{ins.icon}</span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ins.text}</p>
              </div>
            ))}
          </div>

          {/* Budget Tracker */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-4 h-4" style={{ color: '#60a5fa' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Budget Tracker</h3>
            </div>
            {budget.map((b) => {
              const pct = Math.round((b.spent / b.total) * 100);
              return (
                <div key={b.category} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>{b.category}</span>
                    <span style={{ color: 'var(--text-muted)' }}>₹{(b.spent / 1000).toFixed(0)}k / ₹{(b.total / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 80 ? '#f87171' : pct > 60 ? '#fbbf24' : '#34d399' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ecological Monitoring */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid rgba(74,222,128,0.2)' }}>
            <div className="flex items-center gap-2 mb-4">
              <TreePine className="w-4 h-4" style={{ color: '#4ade80' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Ecological Monitoring</h3>
            </div>
            {[
              { label: 'NDVI Score',      value: '0.72', status: 'Healthy',  color: '#34d399' },
              { label: 'Carbon Offset',   value: '142t', status: 'On Track', color: '#34d399' },
              { label: 'Canopy Coverage', value: '38%',  status: 'Good',     color: '#4ade80' },
              { label: 'Species Count',   value: '284',  status: 'Stable',   color: '#60a5fa' },
            ].map((e) => (
              <div key={e.label} className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{e.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{e.value}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${e.color}18`, color: e.color }}>{e.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
