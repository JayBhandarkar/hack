'use client';
import PageWrapper from '@/components/PageWrapper';
import { TreePine, Leaf } from 'lucide-react';

const parks = [
  { name: 'Lodhi Garden',   ndvi: 0.74, carbon: '28t', canopy: '42%', species: 68, health: 'Excellent' },
  { name: 'Nehru Park',     ndvi: 0.71, carbon: '24t', canopy: '38%', species: 54, health: 'Good'      },
  { name: 'Sunder Nursery', ndvi: 0.76, carbon: '31t', canopy: '45%', species: 72, health: 'Excellent' },
  { name: 'Deer Park',      ndvi: 0.68, carbon: '35t', canopy: '52%', species: 89, health: 'Good'      },
  { name: 'Talkatora',      ndvi: 0.62, carbon: '14t', canopy: '28%', species: 41, health: 'Fair'      },
];

const healthColor: Record<string, string> = { Excellent: '#34d399', Good: '#4ade80', Fair: '#fbbf24', Poor: '#f87171' };

export default function EcoMonitoringPage() {
  return (
    <PageWrapper activeNav="Ecological Monitoring" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Ecological Monitoring</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>NDVI, carbon offset, canopy & biodiversity data</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: 'Avg NDVI', value: '0.72', color: '#34d399' }, { label: 'Total Carbon', value: '142t', color: '#4ade80' }, { label: 'Avg Canopy', value: '41%', color: '#22d3ee' }, { label: 'Total Species', value: '324', color: '#a78bfa' }].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 text-center" style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {parks.map((p) => (
              <div key={p.name} className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-4 h-4" style={{ color: '#34d399' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${healthColor[p.health]}18`, color: healthColor[p.health] }}>{p.health}</span>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center">
                  {[{ label: 'NDVI', value: p.ndvi, color: '#34d399' }, { label: 'Carbon', value: p.carbon, color: '#4ade80' }, { label: 'Canopy', value: p.canopy, color: '#22d3ee' }, { label: 'Species', value: p.species, color: '#a78bfa' }].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                      <p className="text-sm font-bold" style={{ color: m.color }}>{m.value}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
