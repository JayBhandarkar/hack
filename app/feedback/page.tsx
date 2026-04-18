'use client';
import PageWrapper from '@/components/PageWrapper';
import { MessageSquare, Flag, CheckCircle, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const myReports = [
  { id: '#R-101', type: 'Safety',      issue: 'Broken bench near Gate 2',    park: 'Lodhi Garden',   status: 'resolved', time: '2d ago' },
  { id: '#R-102', type: 'Maintenance', issue: 'Overflowing dustbin',          park: 'Nehru Park',     status: 'open',     time: '1d ago' },
  { id: '#R-103', type: 'Feedback',    issue: 'Great morning yoga session!',  park: 'Lodhi Garden',   status: 'noted',    time: '3h ago' },
];

const statusColor: Record<string, string> = { resolved: '#34d399', open: '#f87171', noted: '#60a5fa', 'in-progress': '#fbbf24' };

export default function FeedbackPage() {
  const [type, setType]     = useState('Feedback');
  const [park, setPark]     = useState('');
  const [msg, setMsg]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageWrapper activeNav="Feedback & Reports">
      {() => (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Feedback & Reports</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Share feedback or report issues at Delhi parks</p>
          </div>

          {/* Submit form */}
          <div className="glass-card rounded-2xl p-6" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Submit New Report</h2>
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#34d399' }} />
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Submitted Successfully!</p>
                <p className="text-sm mt-1 mb-4" style={{ color: 'var(--text-muted)' }}>Your report has been sent to the park management team.</p>
                <button onClick={() => { setSubmitted(false); setMsg(''); }} className="px-4 py-2 rounded-xl text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}>Submit Another</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Type</p>
                  <div className="flex gap-2">
                    {['Feedback', 'Safety', 'Maintenance', 'Suggestion'].map((t) => (
                      <button key={t} onClick={() => setType(t)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{ background: type === t ? 'var(--accent)' : 'var(--bg-card)', color: type === t ? '#fff' : 'var(--text-secondary)', border: `1px solid ${type === t ? 'var(--accent)' : 'var(--border-base)'}` }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Park</p>
                  <select value={park} onChange={e => setPark(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }}>
                    <option value="">Select a park...</option>
                    {['Lodhi Garden', 'Nehru Park', 'Sunder Nursery', 'Deer Park', 'Talkatora Garden'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Message</p>
                  <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} placeholder="Describe the issue or feedback..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <button onClick={() => msg && park && setSubmitted(true)} disabled={!msg || !park}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
                  style={{ background: 'var(--accent)' }}>
                  <Send className="w-4 h-4" /> Submit Report
                </button>
              </div>
            )}
          </div>

          {/* My reports */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>My Reports</h2>
            <div className="space-y-2">
              {myReports.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{r.id}</span>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{r.issue}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{r.park} · {r.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: `${statusColor[r.status]}18`, color: statusColor[r.status] }}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
