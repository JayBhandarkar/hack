'use client';
import PageWrapper from '@/components/PageWrapper';
import { CheckSquare, X, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

const events = [
  { id: 'E-01', name: 'Morning Yoga Session',   park: 'Lodhi Garden',   by: 'Priya Sharma',    date: 'Sat 6 AM',  capacity: 30, status: 'pending' },
  { id: 'E-02', name: 'Tree Plantation Drive',  park: 'Nehru Park',     by: 'EcoClub Delhi',   date: 'Sun 9 AM',  capacity: 50, status: 'pending' },
  { id: 'E-03', name: 'Photography Workshop',   park: 'Sunder Nursery', by: 'Lens & Light Co', date: 'Sun 10 AM', capacity: 20, status: 'pending' },
];

export default function ApproveEventsPage() {
  const [items, setItems] = useState(events.map(e => ({ ...e })));
  const update = (id: string, status: string) => setItems(prev => prev.map(e => e.id === id ? { ...e, status } : e));

  return (
    <PageWrapper activeNav="Approve Events" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Approve Events</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Review and approve event organizer requests</p></div>
          <div className="space-y-4">
            {items.map((e) => (
              <div key={e.id} className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${e.status === 'pending' ? 'rgba(251,191,36,0.2)' : e.status === 'approved' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{e.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: e.status === 'pending' ? 'rgba(251,191,36,0.12)' : e.status === 'approved' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)', color: e.status === 'pending' ? '#fbbf24' : e.status === 'approved' ? '#34d399' : '#f87171' }}>{e.status}</span>
                    </div>
                    <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{e.name}</p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.park}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.date}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />Capacity: {e.capacity}</span>
                      <span>by {e.by}</span>
                    </div>
                  </div>
                  {e.status === 'pending' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => update(e.id, 'approved')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: '#34d399' }}>
                        <CheckSquare className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => update(e.id, 'rejected')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: '#f87171' }}>
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
