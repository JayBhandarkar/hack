'use client';
import PageWrapper from '@/components/PageWrapper';
import { Sprout, TreePine, Star, Award, Camera } from 'lucide-react';

export default function EcoPassportPage() {
  return (
    <PageWrapper activeNav="EcoPassport">
      {(user) => (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>EcoPassport 🌱</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Your ecological journey and achievements</p>
          </div>
          {/* Profile card */}
          <div className="glass-card rounded-2xl p-6" style={{ border: '1px solid rgba(74,222,128,0.25)' }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'rgba(74,222,128,0.12)' }}>🌿</div>
              <div>
                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                <p className="text-sm" style={{ color: '#4ade80' }}>Level 4 — Park Explorer</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Member since Jan 2025</p>
              </div>
            </div>
            <div className="mb-2 flex justify-between text-xs">
              <span style={{ color: 'var(--text-muted)' }}>240 / 300 XP to Level 5</span>
              <span style={{ color: '#4ade80' }}>80%</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
              <div className="h-full rounded-full" style={{ width: '80%', background: 'linear-gradient(90deg, #4ade80, #34d399)' }} />
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🌳', label: 'Trees Adopted', value: '12' },
              { icon: '🦋', label: 'Species Logged', value: '8'  },
              { icon: '♻️', label: 'Eco Drives',     value: '5'  },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4 text-center" style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          {/* Badges */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Badges Earned</h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: '🌱', name: 'Seedling',    earned: true  },
                { icon: '🌿', name: 'Explorer',    earned: true  },
                { icon: '🌳', name: 'Tree Hugger', earned: true  },
                { icon: '🦋', name: 'Naturalist',  earned: true  },
                { icon: '🔬', name: 'Researcher',  earned: false },
                { icon: '🏆', name: 'Champion',    earned: false },
                { icon: '⭐', name: 'Star Citizen', earned: false },
                { icon: '🌍', name: 'Eco Warrior', earned: false },
              ].map((b) => (
                <div key={b.name} className="text-center p-3 rounded-xl" style={{ background: b.earned ? 'rgba(74,222,128,0.08)' : 'var(--bg-elevated)', border: `1px solid ${b.earned ? 'rgba(74,222,128,0.2)' : 'var(--border-subtle)'}`, opacity: b.earned ? 1 : 0.4 }}>
                  <p className="text-2xl mb-1">{b.icon}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{b.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Tree ID */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>My Adopted Trees</h2>
            {[
              { name: 'Peepal Tree',  park: 'Lodhi Garden',   id: 'TREE-001', health: 'Healthy' },
              { name: 'Neem Tree',    park: 'Nehru Park',     id: 'TREE-042', health: 'Healthy' },
              { name: 'Banyan Tree',  park: 'Sunder Nursery', id: 'TREE-118', health: 'Needs Water' },
            ].map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl mb-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌳</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.park} · {t.id}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: t.health === 'Healthy' ? 'rgba(52,211,153,0.12)' : 'rgba(251,191,36,0.12)', color: t.health === 'Healthy' ? '#34d399' : '#fbbf24' }}>{t.health}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
