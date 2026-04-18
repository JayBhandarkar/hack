'use client';
import PageWrapper from '@/components/PageWrapper';
import { ClipboardList, CheckCircle, Clock, AlertTriangle, MapPin } from 'lucide-react';
import { useState } from 'react';

const complaints = [
  { id: '#1042', issue: 'Broken bench near Gate 2',    park: 'Lodhi Garden',   status: 'open',        priority: 'high',   by: 'Priya S.',   time: '2h ago'  },
  { id: '#1041', issue: 'Overflowing dustbin',         park: 'Nehru Park',     status: 'in-progress', priority: 'medium', by: 'Rahul M.',   time: '5h ago'  },
  { id: '#1040', issue: 'Broken water fountain',       park: 'Deer Park',      status: 'resolved',    priority: 'low',    by: 'Ananya P.',  time: '1d ago'  },
  { id: '#1039', issue: 'Unsafe lighting at night',    park: 'Sunder Nursery', status: 'open',        priority: 'high',   by: 'Arjun K.',   time: '1d ago'  },
  { id: '#1038', issue: 'Stray dogs near playground',  park: 'Deer Park',      status: 'in-progress', priority: 'high',   by: 'Neha G.',    time: '2d ago'  },
  { id: '#1037', issue: 'Graffiti on park wall',       park: 'Talkatora',      status: 'resolved',    priority: 'medium', by: 'Vikram S.',  time: '3d ago'  },
];

const statusColor: Record<string, string> = { open: '#f87171', 'in-progress': '#fbbf24', resolved: '#34d399' };
const priorityColor: Record<string, string> = { high: '#f87171', medium: '#fbbf24', low: '#34d399' };

export default function ComplaintsPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? complaints : complaints.filter(c => c.status === filter);

  return (
    <PageWrapper activeNav="Complaint Management" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Complaint Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Track and resolve citizen complaints</p></div>
          <div className="grid grid-cols-3 gap-4">
            {[['open', '#f87171'], ['in-progress', '#fbbf24'], ['resolved', '#34d399']].map(([s, c]) => (
              <div key={s} className="glass-card rounded-2xl p-4 text-center" style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-2xl font-bold" style={{ color: c }}>{complaints.filter(x => x.status === s).length}</p>
                <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{s}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'open', 'in-progress', 'resolved'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{ background: filter === f ? 'var(--accent)' : 'var(--bg-card)', color: filter === f ? '#fff' : 'var(--text-secondary)', border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border-base)'}` }}>
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map((c) => (
              <div key={c.id} className="glass-card rounded-2xl p-4" style={{ border: `1px solid ${c.priority === 'high' && c.status === 'open' ? 'rgba(248,113,113,0.25)' : 'var(--border-subtle)'}` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.id}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{c.issue}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.park}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.time}</span>
                        <span>by {c.by}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: `${priorityColor[c.priority]}18`, color: priorityColor[c.priority] }}>{c.priority}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: `${statusColor[c.status]}18`, color: statusColor[c.status] }}>{c.status}</span>
                    {c.status !== 'resolved' && (
                      <button className="text-[10px] px-2 py-1 rounded-lg" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>Resolve</button>
                    )}
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
