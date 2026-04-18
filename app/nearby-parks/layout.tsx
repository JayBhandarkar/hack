'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROLES } from '@/lib/roles';
import { User } from '@/lib/roles';
import Sidebar from '@/components/Sidebar';

export default function NearbyParksLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeNav, setActiveNav] = useState('Nearby Parks');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { router.push('/login'); return; }
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: 'var(--accent-border)', borderTopColor: 'var(--accent)' }} />
    </div>
  );

  const roleInfo = ROLES.find((r) => r.value === user.role)!;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Sidebar
        user={user}
        roleIcon={roleInfo.icon}
        roleLabel={roleInfo.label}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
      <div className="flex-1 flex flex-col overflow-hidden" style={{ marginLeft: '16rem' }}>
        {children}
      </div>
    </div>
  );
}
