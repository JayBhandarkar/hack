'use client';
import PageWrapper from '@/components/PageWrapper';
import { MapPin, Clock, Users, CheckCircle, Calendar, Star } from 'lucide-react';
import { useState } from 'react';

const parks = [
  { name: 'Lodhi Garden',   grounds: ['Open Lawn A', 'Open Lawn B', 'Amphitheatre'],  rating: 4.6 },
  { name: 'Nehru Park',     grounds: ['Ground A', 'Ground B', 'Jogging Track'],       rating: 4.4 },
  { name: 'Sunder Nursery', grounds: ['Garden Zone', 'Heritage Walk', 'Open Area'],   rating: 4.6 },
  { name: 'Deer Park',      grounds: ['Main Ground', 'Deer Zone', 'Picnic Area'],     rating: 4.4 },
  { name: 'Talkatora',      grounds: ['Main Lawn', 'Rose Garden', 'Fountain Area'],   rating: 4.3 },
];

const slots = ['6:00 AM – 8:00 AM', '8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '2:00 PM – 4:00 PM', '4:00 PM – 6:00 PM'];

export default function ParkBookingPage() {
  const [step, setStep]         = useState(1);
  const [selPark, setSelPark]   = useState('');
  const [selGround, setSelGround] = useState('');
  const [selSlot, setSelSlot]   = useState('');
  const [selDate, setSelDate]   = useState('');
  const [booked, setBooked]     = useState(false);

  const selectedPark = parks.find(p => p.name === selPark);

  return (
    <PageWrapper activeNav="Park Booking ⭐">
      {() => (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Park Booking ⭐</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Reserve a ground or slot at your favourite Delhi park</p>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-2">
            {['Select Park', 'Choose Slot', 'Confirm'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: step > i + 1 ? '#34d399' : step === i + 1 ? 'var(--accent)' : 'var(--border-base)', color: step >= i + 1 ? '#fff' : 'var(--text-muted)' }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-medium" style={{ color: step === i + 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px" style={{ background: 'var(--border-base)', minWidth: '20px' }} />}
              </div>
            ))}
          </div>

          {!booked ? (
            <div className="glass-card rounded-2xl p-6" style={{ border: '1px solid var(--border-subtle)' }}>
              {step === 1 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Select a Park</h2>
                  {parks.map((p) => (
                    <button key={p.name} onClick={() => setSelPark(p.name)}
                      className="w-full p-4 rounded-xl text-left transition-all hover:-translate-y-0.5"
                      style={{ background: selPark === p.name ? 'var(--accent-bg)' : 'var(--bg-elevated)', border: `1px solid ${selPark === p.name ? 'var(--accent-border)' : 'var(--border-subtle)'}` }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.grounds.length} grounds available</p>
                          </div>
                        </div>
                        <span className="text-xs" style={{ color: '#f59e0b' }}>★ {p.rating}</span>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => selPark && setStep(2)} disabled={!selPark}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2 disabled:opacity-40 transition-all"
                    style={{ background: 'var(--accent)' }}>
                    Continue →
                  </button>
                </div>
              )}

              {step === 2 && selectedPark && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Choose Ground & Slot — {selPark}</h2>
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Ground</p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedPark.grounds.map((g) => (
                        <button key={g} onClick={() => setSelGround(g)}
                          className="p-2.5 rounded-xl text-xs font-medium transition-all"
                          style={{ background: selGround === g ? 'var(--accent-bg)' : 'var(--bg-elevated)', border: `1px solid ${selGround === g ? 'var(--accent-border)' : 'var(--border-subtle)'}`, color: selGround === g ? 'var(--accent)' : 'var(--text-secondary)' }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Date</p>
                    <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Time Slot</p>
                    <div className="space-y-2">
                      {slots.map((s) => (
                        <button key={s} onClick={() => setSelSlot(s)}
                          className="w-full p-3 rounded-xl text-xs font-medium text-left transition-all flex items-center justify-between"
                          style={{ background: selSlot === s ? 'var(--accent-bg)' : 'var(--bg-elevated)', border: `1px solid ${selSlot === s ? 'var(--accent-border)' : 'var(--border-subtle)'}`, color: selSlot === s ? 'var(--accent)' : 'var(--text-secondary)' }}>
                          <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{s}</span>
                          {selSlot === s && <CheckCircle className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}>← Back</button>
                    <button onClick={() => selGround && selSlot && selDate && setStep(3)} disabled={!selGround || !selSlot || !selDate}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-40" style={{ background: 'var(--accent)' }}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Confirm Booking</h2>
                  <div className="p-4 rounded-xl space-y-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                    {[['Park', selPark], ['Ground', selGround], ['Date', selDate], ['Slot', selSlot]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}>← Back</button>
                    <button onClick={() => setBooked(true)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>Confirm Booking ✓</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center" style={{ border: '1px solid rgba(52,211,153,0.3)' }}>
              <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: '#34d399' }} />
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Booking Confirmed!</h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{selPark} · {selGround} · {selDate} · {selSlot}</p>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>Your booking is pending admin approval. You'll be notified shortly.</p>
              <button onClick={() => { setBooked(false); setStep(1); setSelPark(''); setSelGround(''); setSelSlot(''); setSelDate(''); }}
                className="px-6 py-2.5 rounded-xl text-sm font-medium" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}>
                Book Another
              </button>
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}
