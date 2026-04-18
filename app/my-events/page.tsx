'use client';
import PageWrapper from '@/components/PageWrapper';
import { Ticket, MapPin, Clock, Users, CheckCircle, Edit } from 'lucide-react';

const events = [
  { id: 'E-01', name: 'Morning Yoga Session',   park: 'Lodhi Garden',   date: 'Sat, 6:00 AM',  participants: 24, capacity: 30, status: 'approved', revenue: '₹2,400' },
  { id: 'E-02', name: 'Photography Workshop',   park: 'Sunder Nursery', date: 'Sun, 9:00 AM',  participants: 18, capacity: 20, status: 'approved', revenue: '₹5,400' },
  { id: 'E-03', name: 'Tree Plantation Drive',  park: 'Nehru Park',     date: 'Mon, 8:00 AM',  participants: 45, capacity: 50, status: 'pending',  revenue: 'Free'   },
  { id: 'E-04', name: 'Zumba in the Park',      park: 'Deer Park',      date: 'Tue, 7:00 AM',  participants: 0,  capacity: 40, status: 'draft',    revenue: '₹800'   },
];

const statusColor: Record<string, string> = { approved: '#34d399', pending: '#fbbf24', draft: '#9ca3af' };

export default function MyEventsPage() {
  return (
    <PageWrapper activeNav="My Events" allowedRoles={['event_organizer']}>
      {() => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>My Events</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage all your created events</p></div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#a78bfa' }}>+ Create Event</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[{ label: 'Total Events', value: events.length, color: '#a78bfa' }, { label: 'Approved', value: events.filter(e => e.status === 'approved').length, color: '#34d399' }, { label: 'Total Participants', value: events.reduce((a, e) => a + e.participants, 0), color: '#60a5fa' }].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 text-center" style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {events.map((e) => {
              const pct = Math.round((e.participants / e.capacity) * 100);
              return (
                <div key={e.id} className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{e.id}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${statusColor[e.status]}18`, color: statusColor[e.status] }}>{e.status}</span>
                      </div>
                      <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{e.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.park}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.date}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{e.participants}/{e.capacity}</span>
                        <span style={{ color: '#34d399' }}>{e.revenue}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa' }}>
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'var(--text-muted)' }}>Capacity</span>
                      <span style={{ color: '#a78bfa' }}>{pct}% full</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #a78bfa, #7c3aed)' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
