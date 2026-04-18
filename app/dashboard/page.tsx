'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Loader2 } from 'lucide-react';
import { User, ROLES } from '@/lib/roles';
import Sidebar from '@/components/Sidebar';
import CitizenDashboard    from './citizen/page';
import AdminDashboard      from './admin/page';
import MaintenanceDashboard from './maintenance/page';
import OrganizerDashboard  from './organizer/page';

const roleAccent: Record<string, string> = {
  citizen:           '#34d399',
  admin:             '#fb923c',
  maintenance_staff: '#38bdf8',
  event_organizer:   '#a78bfa',
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser]           = useState<User | null>(null);
  const [activeNav, setActiveNav] = useState('Dashboard');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { router.push('/login'); return; }
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
      </div>
    </div>
  );

  const roleInfo = ROLES.find((r) => r.value === user.role)!;
  const accent   = roleAccent[user.role] ?? '#34d399';
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const date     = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const renderDashboard = () => {
    switch (user.role) {
      case 'citizen':           return <CitizenDashboard user={user} />;
      case 'admin':             return <AdminDashboard user={user} />;
      case 'maintenance_staff': return <MaintenanceDashboard user={user} />;
      case 'event_organizer':   return <OrganizerDashboard user={user} />;
      default:                  return <CitizenDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Sidebar
        user={user}
        roleIcon={roleInfo.icon}
        roleLabel={roleInfo.label}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      <main className="flex-1 min-h-screen flex flex-col" style={{ marginLeft: '16rem' }}>

        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-8 sticky top-0 z-30"
          style={{ background: 'var(--bg-nav)', borderBottom: '1px solid var(--border-subtle)', backdropFilter: 'blur(16px)' }}>
          <div>
            <h1 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Good {greeting}, {user.name.split(' ')[0]} {roleInfo.icon}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{date}</p>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
            {roleInfo.label} Dashboard
          </div>

          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <Bell className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          </button>
        </header>

        {/* Role-specific dashboard content */}
        <div className="flex-1 overflow-y-auto">
          {renderDashboard()}
        </div>
      </main>
    </div>
  );
}
