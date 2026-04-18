'use client';
import PageWrapper from '@/components/PageWrapper';
import { Wrench, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const allTasks = [
  { id: 'T-201', task: 'Fix broken bench near Gate 2',    park: 'Lodhi Garden',   priority: 'high',   status: 'pending',     due: 'Today 2 PM'   },
  { id: 'T-202', task: 'Clean restrooms Block A',         park: 'Nehru Park',     priority: 'medium', status: 'in-progress', due: 'Today 4 PM'   },
  { id: 'T-203', task: 'Replace broken water fountain',   park: 'Deer Park',      priority: 'high',   status: 'pending',     due: 'Today 5 PM'   },
  { id: 'T-204', task: 'Trim overgrown hedges Zone C',    park: 'Sunder Nursery', priority: 'low',    status: 'pending',     due: 'Tomorrow'     },
  { id: 'T-205', task: 'Fix pathway lighting',            park: 'Talkatora',      priority: 'medium', status: 'completed',   due: 'Done'         },
  { id: 'T-206', task: 'Repaint park benches',            park: 'Lodhi Garden',   priority: 'low',    status: 'completed',   due: 'Done'         },
];

const priorityColor: Record<string, string> = { high: '#f87171', medium: '#fbbf24', low: '#34d399' };
const statusColor: Record<string, string>   = { pending: '#fb923c', 'in-progress': '#60a5fa', completed: '#34d399' };

export default function TasksPage() {
  const [tasks, setTasks] = useState(allTasks);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);
  const markDone = (id: string) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed', due: 'Done' } : t));

  return (
    <PageWrapper activeNav="Task Assignment">
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Task Assignment</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Your assigned maintenance tasks</p></div>
          <div className="grid grid-cols-3 gap-4">
            {[['pending', '#fb923c'], ['in-progress', '#60a5fa'], ['completed', '#34d399']].map(([s, c]) => (
              <div key={s} className="glass-card rounded-2xl p-4 text-center" style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-2xl font-bold" style={{ color: c }}>{tasks.filter(t => t.status === s).length}</p>
                <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{s}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'in-progress', 'completed'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{ background: filter === f ? 'var(--accent)' : 'var(--bg-card)', color: filter === f ? '#fff' : 'var(--text-secondary)', border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border-base)'}` }}>
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map((t) => (
              <div key={t.id} className="glass-card rounded-2xl p-4" style={{ border: `1px solid ${t.priority === 'high' && t.status !== 'completed' ? 'rgba(248,113,113,0.2)' : 'var(--border-subtle)'}` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-1.5 h-10 rounded-full flex-shrink-0 mt-0.5" style={{ background: priorityColor[t.priority] }} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: t.status === 'completed' ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: t.status === 'completed' ? 'line-through' : 'none' }}>{t.task}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{t.park}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.due}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: `${statusColor[t.status]}18`, color: statusColor[t.status] }}>{t.status}</span>
                    {t.status !== 'completed' && (
                      <button onClick={() => markDone(t.id)} className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>Mark Done</button>
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
