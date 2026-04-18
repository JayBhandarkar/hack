'use client';
import PageWrapper from '@/components/PageWrapper';
import { AlertTriangle, Camera, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const incidents = [
  { id: '#I-45', desc: 'Vandalism on park wall',    park: 'Deer Park',    time: '2h ago',  photo: true,  status: 'open'     },
  { id: '#I-44', desc: 'Stray dog near playground', park: 'Nehru Park',   time: '1d ago',  photo: false, status: 'resolved' },
  { id: '#I-43', desc: 'Broken gate latch',         park: 'Lodhi Garden', time: '2d ago',  photo: true,  status: 'resolved' },
];

export default function IncidentsPage() {
  const [desc, setDesc] = useState('');
  const [park, setPark] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageWrapper activeNav="Incident Reporting">
      {() => (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Incident Reporting</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Log and track park incidents with photo evidence</p></div>

          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Report New Incident</h2>
            {submitted ? (
              <div className="text-center py-6">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3" style={{ color: '#34d399' }} />
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Incident Reported!</p>
                <p className="text-sm mt-1 mb-4" style={{ color: 'var(--text-muted)' }}>Admin has been notified.</p>
                <button onClick={() => { setSubmitted(false); setDesc(''); setPark(''); }} className="px-4 py-2 rounded-xl text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}>Report Another</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Park</p>
                  <select value={park} onChange={e => setPark(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }}>
                    <option value="">Select park...</option>
                    {['Lodhi Garden', 'Nehru Park', 'Sunder Nursery', 'Deer Park', 'Talkatora Garden'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Description</p>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Describe the incident..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ background: 'var(--bg-elevated)', border: '1px dashed var(--border-strong)' }}>
                  <Camera className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Attach photo evidence (optional)</span>
                </div>
                <button onClick={() => desc && park && setSubmitted(true)} disabled={!desc || !park}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
                  style={{ background: '#f87171' }}>
                  <Send className="w-4 h-4" /> Submit Incident Report
                </button>
              </div>
            )}
          </div>

          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Incidents</h2>
            <div className="space-y-2">
              {incidents.map((inc) => (
                <div key={inc.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{inc.id}</span>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{inc.desc}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{inc.park} · {inc.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {inc.photo && <Camera className="w-3.5 h-3.5" style={{ color: '#38bdf8' }} />}
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: inc.status === 'resolved' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)', color: inc.status === 'resolved' ? '#34d399' : '#f87171' }}>{inc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
