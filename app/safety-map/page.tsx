'use client';
import PageWrapper from '@/components/PageWrapper';
import { Shield, MapPin, AlertTriangle, CheckCircle, Navigation } from 'lucide-react';

const zones = [
  { park: 'Lodhi Garden',   zone: 'Main Entrance',    status: 'Safe',    note: 'Well lit, CCTV active'         },
  { park: 'Lodhi Garden',   zone: 'Back Gate Area',   status: 'Caution', note: 'Poor lighting after 7 PM'      },
  { park: 'Nehru Park',     zone: 'Jogging Track',    status: 'Safe',    note: 'Patrolled regularly'            },
  { park: 'Nehru Park',     zone: 'Parking Zone',     status: 'Caution', note: 'Isolated area, avoid at night' },
  { park: 'Sunder Nursery', zone: 'Heritage Walk',    status: 'Safe',    note: 'Guards present'                },
  { park: 'Deer Park',      zone: 'Deer Enclosure',   status: 'Safe',    note: 'Monitored zone'                },
  { park: 'Deer Park',      zone: 'South Pathway',    status: 'Unsafe',  note: 'Reported incidents — avoid'    },
  { park: 'Talkatora',      zone: 'Rose Garden',      status: 'Safe',    note: 'Open and visible'              },
];

const statusConfig: Record<string, { color: string; icon: any; bg: string }> = {
  Safe:    { color: '#34d399', icon: CheckCircle,  bg: 'rgba(52,211,153,0.1)'  },
  Caution: { color: '#fbbf24', icon: AlertTriangle, bg: 'rgba(251,191,36,0.1)' },
  Unsafe:  { color: '#f87171', icon: AlertTriangle, bg: 'rgba(248,113,113,0.1)'},
};

export default function SafetyMapPage() {
  return (
    <PageWrapper activeNav="Safety Map">
      {() => (
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Safety Map</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Zone-wise safety status across Delhi parks</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {(['Safe', 'Caution', 'Unsafe'] as const).map((s) => {
              const cfg = statusConfig[s];
              const Icon = cfg.icon;
              const count = zones.filter(z => z.status === s).length;
              return (
                <div key={s} className="glass-card rounded-2xl p-4 text-center" style={{ border: `1px solid ${cfg.color}30` }}>
                  <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: cfg.color }} />
                  <p className="text-2xl font-bold" style={{ color: cfg.color }}>{count}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s} Zones</p>
                </div>
              );
            })}
          </div>
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Zone Details</h2>
            <div className="space-y-2">
              {zones.map((z, i) => {
                const cfg = statusConfig[z.status];
                const Icon = cfg.icon;
                return (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: `1px solid ${z.status === 'Unsafe' ? cfg.color + '30' : 'var(--border-subtle)'}` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: cfg.bg }}>
                        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{z.zone}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{z.park} · {z.note}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cfg.bg, color: cfg.color }}>{z.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: '#f87171' }}>🚨 Safety Tip</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>If you feel unsafe, use the SOS button immediately. Avoid isolated zones after sunset.</p>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
