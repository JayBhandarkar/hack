'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Siren, MapPin, CheckCircle, Loader2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { ROLES, User } from '@/lib/roles';
import Sidebar from '@/components/Sidebar';
import api from '@/lib/api';
import toast from 'react-hot-toast';

type SOSStatus = 'idle' | 'locating' | 'sending' | 'sent';

export default function SOSPage() {
  const router = useRouter();
  const [user, setUser]         = useState<User | null>(null);
  const [activeNav, setActiveNav] = useState('SOS Alert');
  const [status, setStatus]     = useState<SOSStatus>('idle');
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [message, setMessage]   = useState('Emergency! I need immediate help.');
  const [sentAlert, setSentAlert] = useState<any>(null);
  const pulseRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { router.push('/login'); return; }
    const u = JSON.parse(stored);
    if (u.role !== 'citizen') { router.push('/dashboard'); return; }
    setUser(u);
  }, [router]);

  const getLocation = (): Promise<{ lat: number; lng: number; address: string }> =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Geolocation not supported'));
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          try {
            const r = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            );
            const d = await r.json();
            if (d.results?.[0]) address = d.results[0].formatted_address;
          } catch {}
          resolve({ lat, lng, address });
        },
        (err) => reject(err),
        { timeout: 8000 }
      );
    });

  const handleSOS = async () => {
    if (status === 'sent') return;
    setStatus('locating');

    let loc = { lat: 0, lng: 0, address: 'Location unavailable' };
    try {
      loc = await getLocation();
      setLocation(loc);
    } catch {
      toast.error('Could not get location. Sending without GPS.');
    }

    setStatus('sending');
    try {
      const { data } = await api.post('/sos/trigger', {
        message,
        lat: loc.lat,
        lng: loc.lng,
        address: loc.address,
      });
      setSentAlert(data.sos);
      setStatus('sent');
      toast.success('🚨 SOS Alert sent! Help is on the way.');
    } catch (err: any) {
      setStatus('idle');
      toast.error(err.response?.data?.message || 'Failed to send SOS');
    }
  };

  const reset = () => {
    setStatus('idle');
    setSentAlert(null);
    setLocation(null);
    setMessage('Emergency! I need immediate help.');
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
    </div>
  );

  const roleInfo = ROLES.find((r) => r.value === user.role)!;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)' }}>
      <Sidebar user={user} roleIcon={roleInfo.icon} roleLabel={roleInfo.label}
        activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="flex-1 flex flex-col items-center justify-center p-8" style={{ marginLeft: '16rem' }}>
        <div className="w-full max-w-lg">

          {/* Back */}
          <button onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>

          {status !== 'sent' ? (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(248,113,113,0.12)', border: '2px solid rgba(248,113,113,0.3)' }}>
                  <Siren className="w-9 h-9 text-red-400" />
                </div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Emergency SOS</h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Press the button below to instantly alert Admin and Maintenance Staff with your location.
                </p>
              </div>

              {/* Message input */}
              <div className="mb-6">
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Emergency message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all"
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-base)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {/* Location preview */}
              {location && (
                <div className="flex items-center gap-2 p-3 rounded-xl mb-6 text-sm"
                  style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{location.address}</span>
                </div>
              )}

              {/* Warning */}
              <div className="flex items-start gap-2 p-3 rounded-xl mb-8"
                style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)' }}>
                <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Only use in genuine emergencies. This will immediately notify all Admin and Maintenance Staff with your GPS location.
                </p>
              </div>

              {/* SOS Button */}
              <button
                onClick={handleSOS}
                disabled={status !== 'idle'}
                className="w-full py-5 rounded-2xl font-bold text-lg text-white transition-all relative overflow-hidden disabled:opacity-70"
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  boxShadow: status === 'idle' ? '0 8px 32px rgba(239,68,68,0.4)' : 'none',
                  transform: status === 'idle' ? 'scale(1)' : 'scale(0.98)',
                }}>
                {/* Pulse ring */}
                {status === 'idle' && (
                  <span className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                    style={{ background: '#ef4444' }} />
                )}
                <span className="relative flex items-center justify-center gap-3">
                  {status === 'idle' && <><Siren className="w-6 h-6" /> SEND SOS ALERT</>}
                  {status === 'locating' && <><Loader2 className="w-5 h-5 animate-spin" /> Getting your location...</>}
                  {status === 'sending' && <><Loader2 className="w-5 h-5 animate-spin" /> Sending alert...</>}
                </span>
              </button>

              <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                Alert will be sent to all Admin and Maintenance Staff instantly
              </p>
            </>
          ) : (
            /* ── Sent confirmation ── */
            <div className="text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(52,211,153,0.12)', border: '2px solid rgba(52,211,153,0.3)' }}>
                <CheckCircle className="w-12 h-12" style={{ color: 'var(--accent)' }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>SOS Alert Sent!</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Help is on the way. Admin and Maintenance Staff have been notified.
              </p>

              <div className="glass-card rounded-2xl p-5 text-left mb-6"
                style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Alert Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>Status</span>
                    <span className="font-medium px-2 py-0.5 rounded-full text-xs"
                      style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171' }}>🚨 Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>Sent by</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{user.name}</span>
                  </div>
                  {location && (
                    <div className="flex justify-between text-sm gap-4">
                      <span style={{ color: 'var(--text-muted)' }}>Location</span>
                      <span className="font-medium text-right text-xs" style={{ color: 'var(--text-primary)' }}>{location.address}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>Time</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={reset}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}>
                Send Another Alert
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
