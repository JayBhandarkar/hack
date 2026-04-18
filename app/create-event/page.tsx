'use client';
import PageWrapper from '@/components/PageWrapper';
import { PlusCircle, MapPin, Clock, Users, Upload, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function CreateEventPage() {
  const [form, setForm] = useState({ name: '', park: '', date: '', time: '', capacity: '', price: '', desc: '', category: 'Wellness' });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <PageWrapper activeNav="Create Event ⭐" allowedRoles={['event_organizer']}>
      {() => (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Create Event ⭐</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Create a new event and submit for admin approval</p></div>

          {submitted ? (
            <div className="glass-card rounded-2xl p-10 text-center" style={{ border: '1px solid rgba(167,139,250,0.3)' }}>
              <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: '#a78bfa' }} />
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Event Submitted!</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Your event "{form.name}" has been submitted for admin approval. You'll be notified once approved.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', park: '', date: '', time: '', capacity: '', price: '', desc: '', category: 'Wellness' }); }}
                className="px-6 py-2.5 rounded-xl text-sm font-medium" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}>
                Create Another
              </button>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-6 space-y-4" style={{ border: '1px solid var(--border-subtle)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Event Name *</p>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Morning Yoga Session"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Category</p>
                  <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }}>
                    {['Wellness', 'Fitness', 'Nature', 'Workshop', 'Eco', 'Cultural'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Park *</p>
                  <select value={form.park} onChange={e => set('park', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }}>
                    <option value="">Select park...</option>
                    {['Lodhi Garden', 'Nehru Park', 'Sunder Nursery', 'Deer Park', 'Talkatora Garden'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Date *</p>
                  <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Time *</p>
                  <input type="time" value={form.time} onChange={e => set('time', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Capacity *</p>
                  <input type="number" value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="Max participants"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Price (₹)</p>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0 for free"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Description</p>
                  <textarea value={form.desc} onChange={e => set('desc', e.target.value)} rows={3} placeholder="Describe your event..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
                <div className="col-span-2 flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ background: 'var(--bg-elevated)', border: '1px dashed var(--border-strong)' }}>
                  <Upload className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Upload event banner / poster (optional)</span>
                </div>
              </div>
              <button onClick={() => form.name && form.park && form.date && form.capacity && setSubmitted(true)}
                disabled={!form.name || !form.park || !form.date || !form.capacity}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
                style={{ background: '#a78bfa' }}>
                <Send className="w-4 h-4" /> Submit for Approval
              </button>
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}
