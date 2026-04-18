'use client';
import PageWrapper from '@/components/PageWrapper';
import { Settings as SettingsIcon, User, Bell, Shield, Globe, Moon } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

export default function SettingsPage() {
  const [notif, setNotif] = useState({ sos: true, events: true, bookings: true, microclimate: false });
  const [saved, setSaved] = useState(false);

  return (
    <PageWrapper activeNav="Settings">
      {(user) => (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage your account and preferences</p>
          </div>

          {/* Profile */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-4"><User className="w-4 h-4" style={{ color: 'var(--accent)' }} /><h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Profile</h2></div>
            <div className="space-y-3">
              {[['Full Name', user.name], ['Email', user.email], ['Role', user.role.replace('_', ' ')]].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
                  <input defaultValue={value} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border-base)', color: 'var(--text-primary)' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Moon className="w-4 h-4" style={{ color: 'var(--accent)' }} /><h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Theme</h2></div>
              <ThemeToggle />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Toggle between dark and light mode</p>
          </div>

          {/* Notifications */}
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-4"><Bell className="w-4 h-4" style={{ color: 'var(--accent)' }} /><h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications</h2></div>
            <div className="space-y-3">
              {Object.entries(notif).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize" style={{ color: 'var(--text-secondary)' }}>{key.replace(/([A-Z])/g, ' $1')} alerts</span>
                  <button onClick={() => setNotif(p => ({ ...p, [key]: !val }))}
                    className="w-10 h-5 rounded-full transition-all relative"
                    style={{ background: val ? 'var(--accent)' : 'var(--border-base)' }}>
                    <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: val ? '22px' : '2px' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setSaved(true)} className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
