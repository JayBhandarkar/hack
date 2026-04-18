'use client';
import PageWrapper from '@/components/PageWrapper';
import { Building2, MapPin, Users, Star, TrendingUp } from 'lucide-react';

const parks = [
  { name: 'Lodhi Garden',    area: '90 acres',  visitors: 1240, rating: 4.6, status: 'Active',   staff: 12 },
  { name: 'Nehru Park',      area: '80 acres',  visitors: 890,  rating: 4.4, status: 'Active',   staff: 9  },
  { name: 'Sunder Nursery',  area: '90 acres',  visitors: 560,  rating: 4.6, status: 'Active',   staff: 8  },
  { name: 'Deer Park',       area: '214 acres', visitors: 720,  rating: 4.4, status: 'Active',   staff: 15 },
  { name: 'Talkatora Garden',area: '22 acres',  visitors: 340,  rating: 4.3, status: 'Maintenance',staff: 6},
  { name: 'Mughal Garden',   area: '13 acres',  visitors: 0,    rating: 4.7, status: 'Closed',   staff: 4  },
  { name: 'Qudsia Garden',   area: '25 acres',  visitors: 210,  rating: 4.1, status: 'Active',   staff: 5  },
  { name: 'Roshanara Garden',area: '50 acres',  visitors: 380,  rating: 4.2, status: 'Active',   staff: 7  },
];

const statusColor: Record<string, string> = { Active: '#34d399', Maintenance: '#fbbf24', Closed: '#f87171' };

export default function ParksOverviewPage() {
  return (
    <PageWrapper activeNav="All Parks Overview" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>All Parks Overview</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Monitor all Delhi parks under Parkly</p></div>
            <div className="flex gap-3">
              {[['Active', '#34d399'], ['Maintenance', '#fbbf24'], ['Closed', '#f87171']].map(([s, c]) => (
                <span key={s} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${c}18`, color: c }}>{parks.filter(p => p.status === s).length} {s}</span>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {parks.map((p) => (
              <div key={p.name} className="glass-card rounded-2xl p-5 transition-all hover:-translate-y-0.5" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(52,211,153,0.1)' }}>🌳</div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.area}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${statusColor[p.status]}18`, color: statusColor[p.status] }}>{p.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{p.visitors.toLocaleString()}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Visitors</p>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                    <p className="text-sm font-bold" style={{ color: '#f59e0b' }}>★ {p.rating}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Rating</p>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{p.staff}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Staff</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
