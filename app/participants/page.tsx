'use client';
import PageWrapper from '@/components/PageWrapper';
import { Users, Search, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const participants = [
  { name: 'Ananya Singh',  event: 'Morning Yoga',        joined: '2h ago',  paid: true,  email: 'ananya@email.com' },
  { name: 'Rohan Mehta',   event: 'Photography Workshop', joined: '3h ago',  paid: true,  email: 'rohan@email.com'  },
  { name: 'Kavya Patel',   event: 'Morning Yoga',        joined: '5h ago',  paid: false, email: 'kavya@email.com'  },
  { name: 'Arjun Sharma',  event: 'Tree Plantation',     joined: '1d ago',  paid: true,  email: 'arjun@email.com'  },
  { name: 'Neha Gupta',    event: 'Photography Workshop', joined: '1d ago',  paid: true,  email: 'neha@email.com'   },
  { name: 'Vikram Singh',  event: 'Tree Plantation',     joined: '2d ago',  paid: true,  email: 'vikram@email.com' },
  { name: 'Priya Sharma',  event: 'Morning Yoga',        joined: '2d ago',  paid: false, email: 'priya@email.com'  },
  { name: 'Rahul Kumar',   event: 'Tree Plantation',     joined: '3d ago',  paid: true,  email: 'rahul@email.com'  },
];

export default function ParticipantsPage() {
  const [search, setSearch] = useState('');
  const filtered = participants.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.event.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageWrapper activeNav="Participants" allowedRoles={['event_organizer']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Participants</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>All registered participants across your events</p></div>
          <div className="grid grid-cols-3 gap-4">
            {[{ label: 'Total', value: participants.length, color: '#a78bfa' }, { label: 'Paid', value: participants.filter(p => p.paid).length, color: '#34d399' }, { label: 'Pending Payment', value: participants.filter(p => !p.paid).length, color: '#fbbf24' }].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 text-center" style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)' }}>
            <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search participants or events..."
              className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="glass-card rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="grid grid-cols-4 px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>Name</span><span>Event</span><span>Joined</span><span>Payment</span>
            </div>
            {filtered.map((p, i) => (
              <div key={i} className="grid grid-cols-4 px-4 py-3 items-center text-sm" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.email}</p>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{p.event}</span>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><Clock className="w-3 h-3" />{p.joined}</span>
                <span className="text-xs px-2 py-0.5 rounded-full w-fit" style={{ background: p.paid ? 'rgba(52,211,153,0.12)' : 'rgba(251,191,36,0.12)', color: p.paid ? '#34d399' : '#fbbf24' }}>
                  {p.paid ? '✓ Paid' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
