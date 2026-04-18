'use client';
import PageWrapper from '@/components/PageWrapper';
import { CalendarDays, MapPin, Users, Clock, Search } from 'lucide-react';
import { useState } from 'react';

const events = [
  { name: 'Morning Yoga',         park: 'Lodhi Garden',   date: 'Sat, 6:00 AM',  spots: 12, total: 30, category: 'Wellness',  status: 'open'   },
  { name: 'Bird Watching Walk',   park: 'Sunder Nursery', date: 'Sat, 7:00 AM',  spots: 8,  total: 20, category: 'Nature',    status: 'open'   },
  { name: 'Tree Plantation',      park: 'Nehru Park',     date: 'Sun, 9:00 AM',  spots: 25, total: 50, category: 'Eco',       status: 'open'   },
  { name: 'Photography Workshop', park: 'Sunder Nursery', date: 'Sun, 10:00 AM', spots: 5,  total: 20, category: 'Workshop',  status: 'open'   },
  { name: 'Zumba in the Park',    park: 'Deer Park',      date: 'Mon, 7:00 AM',  spots: 40, total: 40, category: 'Fitness',   status: 'open'   },
  { name: 'Composting Workshop',  park: 'Lodhi Garden',   date: 'Tue, 11:00 AM', spots: 15, total: 25, category: 'Eco',       status: 'open'   },
];

const catColor: Record<string, string> = { Wellness: '#34d399', Nature: '#4ade80', Eco: '#22d3ee', Workshop: '#a78bfa', Fitness: '#f87171' };

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const filtered = events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.park.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageWrapper activeNav="Events">
      {() => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Events</h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Discover and join community park events</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)' }}>
            <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events or parks..."
              className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((e) => (
              <div key={e.name} className="glass-card rounded-2xl p-5 transition-all hover:-translate-y-0.5" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${catColor[e.category]}18`, color: catColor[e.category] }}>{e.category}</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{e.spots} spots left</span>
                </div>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{e.name}</h3>
                <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.park}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.date}</span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text-muted)' }}>{e.total - e.spots}/{e.total} joined</span>
                    <span style={{ color: catColor[e.category] }}>{Math.round(((e.total - e.spots) / e.total) * 100)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                    <div className="h-full rounded-full" style={{ width: `${((e.total - e.spots) / e.total) * 100}%`, background: catColor[e.category] }} />
                  </div>
                </div>
                <button className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: catColor[e.category] }}>Join Event</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
