'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROLES, User } from '@/lib/roles';
import Sidebar from '@/components/Sidebar';
import { Loader2 } from 'lucide-react';

interface PageWrapperProps {
  activeNav: string;
  allowedRoles?: string[];
  children: (user: User) => React.ReactNode;
}

export default function PageWrapper({ activeNav, allowedRoles, children }: PageWrapperProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { router.push('/login'); return; }
    const u = JSON.parse(stored);
    if (allowedRoles && !allowedRoles.includes(u.role)) { router.push('/dashboard'); return; }
    setUser(u);
  }, [router, allowedRoles]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
    </div>
  );

  const roleInfo = ROLES.find(r => r.value === user.role)!;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Sidebar user={user} roleIcon={roleInfo.icon} roleLabel={roleInfo.label}
        activeNav={activeNav} setActiveNav={() => {}} />
      <main className="flex-1 overflow-y-auto" style={{ marginLeft: '16rem' }}>
        {children(user)}
      </main>
    </div>
  );
}
