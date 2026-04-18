'use client';
import PageWrapper from '@/components/PageWrapper';
import { TrendingUp, ArrowUp, ArrowDown, Users } from 'lucide-react';

const data = [
  { park: 'Lodhi Garden',   mon: 980, tue: 1100, wed: 890, thu: 1240, fri: 1380, sat: 2100, sun: 1950 },
  { park: 'Nehru Park',     mon: 720, tue: 810,  wed: 690, thu: 890,  fri: 1020, sat: 1560, sun: 1430 },
  { park: 'Sunder Nursery', mon: 430, tue: 510,  wed: 480, thu: 560,  fri: 620,  sat: 980,  sun: 890  },
  { park: 'Deer Park',      mon: 560, tue: 640,  wed: 590, thu: 720,  fri: 810,  sat: 1230, sun: 1120 },
];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function FootfallPage() {
  return (
    <PageWrapper activeNav="Footfall Analytics" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Footfall Analytics</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Visitor trends across all Delhi parks this week</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: 'Total Today', value: '3,410', up: true }, { label: 'This Week', value: '24,830', up: true }, { label: 'Peak Day', value: 'Saturday', up: true }, { label: 'Avg Daily', value: '3,547', up: false }].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-1 mb-2" style={{ color: s.up ? '#34d399' : '#f87171' }}>
                  {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span className="text-xs">vs last week</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          {data.map((park) => {
            const max = Math.max(...days.map(d => park[d.toLowerCase() as keyof typeof park] as number));
            return (
              <div key={park.park} className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{park.park}</h3>
                <div className="flex items-end gap-2 h-28">
                  {days.map((d) => {
                    const val = park[d.toLowerCase() as keyof typeof park] as number;
                    const pct = (val / max) * 100;
                    return (
                      <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{val}</span>
                        <div className="w-full rounded-md" style={{ height: `${pct}%`, background: d === 'Sat' || d === 'Sun' ? '#fb923c' : 'var(--accent)', opacity: 0.7 }} />
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
}
