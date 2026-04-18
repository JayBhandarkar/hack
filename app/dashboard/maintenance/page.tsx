'use client';
import { Wrench, CheckCircle, Siren, AlertTriangle, Clock, Camera, CalendarClock, MapPin, ChevronRight, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const stats = [
  { label: 'Tasks Today',     value: '6',  delta: '2 urgent',    icon: Wrench,       color: '#38bdf8', bg: 'rgba(56,189,248,0.12)'  },
  { label: 'Resolved',        value: '14', delta: 'This week',   icon: CheckCircle,  color: '#4ade80', bg: 'rgba(74,222,128,0.12)'  },
  { label: 'SOS Alerts',      value: '1',  delta: 'Active now',  icon: Siren,        color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  { label: 'Incidents Filed', value: '3',  delta: 'This month',  icon: AlertTriangle,color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
];

const tasks = [
  { id: 'T-201', task: 'Fix broken bench near Gate 2',    park: 'Lodhi Garden',   priority: 'high',   status: 'pending',     due: 'Today 2 PM'   },
  { id: 'T-202', task: 'Clean restrooms Block A',         park: 'Nehru Park',     priority: 'medium', status: 'in-progress', due: 'Today 4 PM'   },
  { id: 'T-203', task: 'Replace broken water fountain',   park: 'Deer Park',      priority: 'high',   status: 'pending',     due: 'Today 5 PM'   },
  { id: 'T-204', task: 'Trim overgrown hedges Zone C',    park: 'Sunder Nursery', priority: 'low',    status: 'pending',     due: 'Tomorrow'     },
  { id: 'T-205', task: 'Fix pathway lighting',            park: 'Talkatora',      priority: 'medium', status: 'completed',   due: 'Done'         },
  { id: 'T-206', task: 'Repaint park benches',            park: 'Lodhi Garden',   priority: 'low',    status: 'completed',   due: 'Done'         },
];

const schedule = [
  { time: '7:00 AM',  task: 'Morning inspection — Lodhi Garden',  done: true  },
  { time: '9:00 AM',  task: 'Fix bench Gate 2',                   done: false },
  { time: '11:00 AM', task: 'Restroom cleaning — Nehru Park',     done: false },
  { time: '2:00 PM',  task: 'Water fountain repair — Deer Park',  done: false },
  { time: '4:00 PM',  task: 'Evening patrol — Sunder Nursery',    done: false },
];

const incidents = [
  { id: '#I-45', desc: 'Vandalism on park wall',    park: 'Deer Park',    time: '2h ago',  photo: true  },
  { id: '#I-44', desc: 'Stray dog near playground', park: 'Nehru Park',   time: '1d ago',  photo: false },
  { id: '#I-43', desc: 'Broken gate latch',         park: 'Lodhi Garden', time: '2d ago',  photo: true  },
];

const priorityColor: Record<string, string> = { high: '#f87171', medium: '#fbbf24', low: '#34d399' };
const statusColor: Record<string, string>   = { pending: '#fb923c', 'in-progress': '#60a5fa', completed: '#34d399' };

export default function MaintenanceDashboard({ user }: { user: any }) {
  const accent = '#38bdf8';

  return (
    <div className="p-6 space-y-6">

      {/* ── Welcome banner ── */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.12), rgba(6,182,212,0.06))', border: '1px solid rgba(56,189,248,0.2)' }}>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20">🔧</div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: accent }}>Staff Dashboard</p>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Good day, {user?.name?.split(' ')[0]}!</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          You have 6 tasks today. 2 are urgent. 1 active SOS alert needs attention.
        </p>
        <div className="flex gap-3 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: accent, boxShadow: '0 4px 14px rgba(56,189,248,0.3)' }}>
            <Wrench className="w-4 h-4" /> My Tasks
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 animate-pulse"
            style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}>
            <Siren className="w-4 h-4" /> 1 Active SOS
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
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.delta}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">

          {/* Task List */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Task Assignment</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>
                {tasks.filter(t => t.status !== 'completed').length} active
              </span>
            </div>
            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: `1px solid ${t.priority === 'high' && t.status !== 'completed' ? 'rgba(248,113,113,0.2)' : 'var(--border-subtle)'}` }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: priorityColor[t.priority] }} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: t.status === 'completed' ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: t.status === 'completed' ? 'line-through' : 'none' }}>
                        {t.task}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MapPin className="w-2.5 h-2.5" style={{ color: 'var(--text-muted)' }} />
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{t.park}</span>
                        <Clock className="w-2.5 h-2.5" style={{ color: 'var(--text-muted)' }} />
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{t.due}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full capitalize flex-shrink-0"
                    style={{ background: `${statusColor[t.status]}18`, color: statusColor[t.status] }}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Reports */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Incidents</h3>
              <button className="flex items-center gap-1 text-xs transition-colors" style={{ color: accent }}>
                Report new <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {incidents.map((inc) => (
                <div key={inc.id} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{inc.id}</span>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{inc.desc}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{inc.park} · {inc.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {inc.photo && <Camera className="w-3.5 h-3.5" style={{ color: accent }} />}
                    <button className="text-[10px] px-2 py-1 rounded-lg" style={{ background: `${accent}15`, color: accent }}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right col ── */}
        <div className="space-y-5">

          {/* Today's Schedule */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock className="w-4 h-4" style={{ color: accent }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Today's Schedule</h3>
            </div>
            <div className="space-y-3">
              {schedule.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                      style={{ background: s.done ? '#34d399' : 'var(--border-base)', border: `2px solid ${s.done ? '#34d399' : 'var(--border-strong)'}` }} />
                    {i < schedule.length - 1 && <div className="w-0.5 h-6 mt-1" style={{ background: 'var(--border-base)' }} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold" style={{ color: accent }}>{s.time}</p>
                    <p className="text-xs" style={{ color: s.done ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: s.done ? 'line-through' : 'none' }}>
                      {s.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOS Alert */}
          <div className="glass-card rounded-2xl p-5 animate-pulse"
            style={{ border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.04)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Siren className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-semibold text-red-400">Active SOS Alert</h3>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'rgba(248,113,113,0.08)' }}>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Priya Sharma</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Emergency! I need immediate help.</p>
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                <MapPin className="w-3 h-3" /> Riverside Park — Zone B
              </p>
              <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>2 minutes ago</p>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-white"
                style={{ background: '#ef4444' }}>Acknowledge</button>
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>Resolve</button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>This Week</h3>
            {[
              { label: 'Tasks Completed', value: '14', color: '#34d399' },
              { label: 'Avg Resolution',  value: '2.4h', color: accent  },
              { label: 'Parks Covered',   value: '5',   color: '#a78bfa'},
              { label: 'Incidents Filed', value: '3',   color: '#fb923c'},
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
