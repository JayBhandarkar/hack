'use client';
import PageWrapper from '@/components/PageWrapper';
import { CheckSquare, X, Clock, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

const bookings = [
  { id: 'B-01', park: 'Lodhi Garden',   ground: 'Open Lawn A', by: 'Priya Sharma',    date: 'Sat 6–9 AM',  event: 'Morning Yoga',       status: 'pending' },
  { id: 'B-02', park: 'Nehru Park',     ground: 'Ground B',    by: 'EcoClub Delhi',   date: 'Sun 8–11 AM', event: 'Tree Plantation',     status: 'pending' },
  { id: 'B-03', park: 'Sunder Nursery', ground: 'Garden Zone', by: 'Lens & Light Co', date: 'Sun 9–12 PM', event: 'Photography Workshop',status: 'pending' },
  { id: 'B-04', park: 'Deer Park',      ground: 'Main Ground', by: 'FitLife Events',  date: 'Mon 7–9 AM',  event: 'Zumba Session',       status: 'pending' },
];

export default function ApproveBookingsPage() {
  const [items, setItems] = useState(bookings.map(b => ({ ...b })));
  const update = (id: string, status: string) => setItems(prev => prev.map(b => b.id === id ? { ...b, status } : b));

  return (
    <PageWrapper activeNav="Approve Bookings" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Approve Bookings</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Review park ground booking requests</p></div>
          <div className="space-y-4">
            {items.map((b) => (
              <div key={b.id} className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${b.status === 'pending' ? 'rgba(251,191,36,0.2)' : b.status === 'confirmed' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{b.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: b.status === 'pending' ? 'rgba(251,191,36,0.12)' : b.status === 'confirmed' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)', color: b.status === 'pending' ? '#fbbf24' : b.status === 'confirmed' ? '#34d399' : '#f87171' }}>{b.status}</span>
                    </div>
                    <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{b.event}</p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{b.park} — {b.ground}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>
                      <span>by {b.by}</span>
                    </div>
                  </div>
                  {b.status === 'pending' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => update(b.id, 'confirmed')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: '#34d399' }}>
                        <CheckSquare className="w-3.5 h-3.5" /> Confirm
                      </button>
                      <button onClick={() => update(b.id, 'rejected')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: '#f87171' }}>
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
