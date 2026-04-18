'use client';
import PageWrapper from '@/components/PageWrapper';
import { Users, Shield, Search } from 'lucide-react';
import { useState } from 'react';

const users = [
  { name: 'Priya Sharma',   email: 'priya@email.com',  role: 'citizen',           joined: 'Jan 2025', status: 'active'   },
  { name: 'Rahul Mehta',    email: 'rahul@email.com',  role: 'event_organizer',   joined: 'Feb 2025', status: 'active'   },
  { name: 'Ananya Singh',   email: 'ananya@email.com', role: 'citizen',           joined: 'Jan 2025', status: 'active'   },
  { name: 'Vikram Kumar',   email: 'vikram@email.com', role: 'maintenance_staff', joined: 'Mar 2025', status: 'active'   },
  { name: 'Neha Gupta',     email: 'neha@email.com',   role: 'citizen',           joined: 'Feb 2025', status: 'inactive' },
  { name: 'Arjun Patel',    email: 'arjun@email.com',  role: 'event_organizer',   joined: 'Mar 2025', status: 'active'   },
];

const roleColor: Record<string, string> = { citizen: '#34d399', event_organizer: '#a78bfa', maintenance_staff: '#38bdf8', admin: '#fb923c' };

export default function UserManagementPage() {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.role.includes(search.toLowerCase()));

  return (
    <PageWrapper activeNav="User Management" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>User Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage all platform users and roles</p></div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)' }}>
            <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
              className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="glass-card rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="grid grid-cols-5 px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>Name</span><span>Email</span><span>Role</span><span>Joined</span><span>Actions</span>
            </div>
            {filtered.map((u, i) => (
              <div key={i} className="grid grid-cols-5 px-4 py-3 items-center text-sm" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{u.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>{u.email}</span>
                <span className="text-xs px-2 py-0.5 rounded-full w-fit capitalize" style={{ background: `${roleColor[u.role]}18`, color: roleColor[u.role] }}>{u.role.replace('_', ' ')}</span>
                <span style={{ color: 'var(--text-muted)' }}>{u.joined}</span>
                <div className="flex gap-2">
                  <button className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(96,165,250,0.12)', color: '#60a5fa' }}>Edit</button>
                  <button className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
