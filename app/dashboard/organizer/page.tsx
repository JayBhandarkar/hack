'use client';
import { Ticket, MapPin, Users, Flower2, PlusCircle, Clock, CheckCircle, AlertTriangle, ChevronRight, CalendarDays, Send, Upload } from 'lucide-react';

const stats = [
  { label: 'My Events',     value: '5',   delta: '2 upcoming',    icon: Ticket,      color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { label: 'Park Bookings', value: '3',   delta: '1 pending',     icon: MapPin,      color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  { label: 'Participants',  value: '128', delta: '+24 this week',  icon: Users,       color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  { label: 'Eco Activities',value: '4',   delta: '1 plant drive',  icon: Flower2,     color: '#4ade80', bg: 'rgba(74,222,128,0.12)'  },
];

const myEvents = [
  { name: 'Morning Yoga Session',    park: 'Lodhi Garden',   date: 'Sat, 6:00 AM',  participants: 24, capacity: 30, status: 'approved' },
  { name: 'Photography Workshop',    park: 'Sunder Nursery', date: 'Sun, 9:00 AM',  participants: 18, capacity: 20, status: 'approved' },
  { name: 'Tree Plantation Drive',   park: 'Nehru Park',     date: 'Mon, 8:00 AM',  participants: 45, capacity: 50, status: 'pending'  },
  { name: 'Zumba in the Park',       park: 'Deer Park',      date: 'Tue, 7:00 AM',  participants: 0,  capacity: 40, status: 'draft'    },
];

const bookings = [
  { park: 'Lodhi Garden',   ground: 'Open Lawn A', date: 'Sat 6–9 AM',  status: 'confirmed', event: 'Morning Yoga'       },
  { park: 'Sunder Nursery', ground: 'Garden Zone', date: 'Sun 9–12 PM', status: 'confirmed', event: 'Photography Workshop'},
  { park: 'Nehru Park',     ground: 'Ground B',    date: 'Mon 8–11 AM', status: 'pending',   event: 'Tree Plantation'    },
];

const participants = [
  { name: 'Ananya Singh',  event: 'Morning Yoga',       joined: '2h ago',  paid: true  },
  { name: 'Rohan Mehta',   event: 'Photography Workshop',joined: '3h ago', paid: true  },
  { name: 'Kavya Patel',   event: 'Morning Yoga',       joined: '5h ago',  paid: false },
  { name: 'Arjun Sharma',  event: 'Tree Plantation',    joined: '1d ago',  paid: true  },
  { name: 'Neha Gupta',    event: 'Photography Workshop',joined: '1d ago', paid: true  },
];

const ecoActivities = [
  { name: 'Tree Plantation Drive',  trees: 50,  planted: 32, park: 'Nehru Park'     },
  { name: 'Seed Bomb Workshop',     trees: 0,   planted: 0,  park: 'Lodhi Garden'   },
  { name: 'Composting Session',     trees: 0,   planted: 0,  park: 'Sunder Nursery' },
];

const statusColor: Record<string, string> = {
  approved: '#34d399', pending: '#fbbf24', draft: '#9ca3af', confirmed: '#34d399',
};

export default function OrganizerDashboard({ user }: { user: any }) {
  const accent = '#a78bfa';

  return (
    <div className="p-6 space-y-6">

      {/* ── Welcome banner ── */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.12), rgba(139,92,246,0.06))', border: '1px solid rgba(167,139,250,0.2)' }}>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20">🎪</div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: accent }}>Event Organizer</p>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Hello, {user?.name?.split(' ')[0]}!</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          2 upcoming events this weekend. 128 participants registered across all events.
        </p>
        <div className="flex gap-3 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: accent, boxShadow: '0 4px 14px rgba(167,139,250,0.3)' }}>
            <PlusCircle className="w-4 h-4" /> Create Event
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>
            <MapPin className="w-4 h-4" /> Book Park
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

          {/* My Events */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>My Events</h3>
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{ background: `${accent}15`, color: accent }}>
                <PlusCircle className="w-3 h-3" /> New Event
              </button>
            </div>
            <div className="space-y-3">
              {myEvents.map((e) => {
                const pct = Math.round((e.participants / e.capacity) * 100);
                return (
                  <div key={e.name} className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{e.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          <MapPin className="w-3 h-3 inline mr-1" />{e.park} · {e.date}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize font-medium"
                        style={{ background: `${statusColor[e.status]}18`, color: statusColor[e.status] }}>
                        {e.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span style={{ color: 'var(--text-muted)' }}>{e.participants}/{e.capacity} participants</span>
                      <span style={{ color: accent }}>{pct}% full</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, #7c3aed)` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Park Bookings */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Park Bookings ⭐</h3>
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium"
                style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>
                <MapPin className="w-3 h-3" /> Book Park
              </button>
            </div>
            <div className="space-y-2">
              {bookings.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{ background: 'rgba(52,211,153,0.1)' }}>🏞️</div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{b.park} — {b.ground}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{b.date} · {b.event}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{ background: `${statusColor[b.status]}18`, color: statusColor[b.status] }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Participants */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Participants</h3>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>128 total</span>
            </div>
            <div className="space-y-2">
              {participants.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${accent}20`, color: accent }}>
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{p.event} · {p.joined}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: p.paid ? 'rgba(52,211,153,0.12)' : 'rgba(251,146,60,0.12)', color: p.paid ? '#34d399' : '#fb923c' }}>
                    {p.paid ? 'Paid' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right col ── */}
        <div className="space-y-5">

          {/* Quick Actions */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: PlusCircle, label: 'Create New Event',      color: accent,     bg: `${accent}15`              },
                { icon: MapPin,     label: 'Book Park Slot ⭐',     color: '#34d399',  bg: 'rgba(52,211,153,0.12)'    },
                { icon: Upload,     label: 'Upload Event Details',  color: '#60a5fa',  bg: 'rgba(96,165,250,0.12)'    },
                { icon: Send,       label: 'Submit for Approval',   color: '#fbbf24',  bg: 'rgba(251,191,36,0.12)'    },
                { icon: Flower2,    label: 'Add Eco Activity',      color: '#4ade80',  bg: 'rgba(74,222,128,0.12)'    },
              ].map(({ icon: Icon, label, color, bg }) => (
                <button key={label} className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 text-left"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg, color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span style={{ color: 'var(--text-primary)' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Eco Activities */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid rgba(74,222,128,0.2)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="w-4 h-4" style={{ color: '#4ade80' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Eco Activities</h3>
            </div>
            {ecoActivities.map((e, i) => (
              <div key={i} className="p-3 rounded-xl mb-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{e.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{e.park}</p>
                {e.trees > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span style={{ color: 'var(--text-muted)' }}>{e.planted}/{e.trees} trees planted</span>
                      <span style={{ color: '#4ade80' }}>{Math.round((e.planted / e.trees) * 100)}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                      <div className="h-full rounded-full" style={{ width: `${(e.planted / e.trees) * 100}%`, background: '#4ade80' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Approval Status */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Approval Status</h3>
            {[
              { label: 'Morning Yoga',       status: 'Approved', color: '#34d399' },
              { label: 'Photography WS',     status: 'Approved', color: '#34d399' },
              { label: 'Tree Plantation',    status: 'Pending',  color: '#fbbf24' },
              { label: 'Zumba in the Park',  status: 'Draft',    color: '#9ca3af' },
            ].map((a) => (
              <div key={a.label} className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{a.label}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: `${a.color}18`, color: a.color }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
