'use client';
import PageWrapper from '@/components/PageWrapper';
import { Wallet, TrendingUp } from 'lucide-react';

const budget = [
  { category: 'Maintenance & Repairs', allocated: 60000,  spent: 42000, color: '#38bdf8' },
  { category: 'Events & Programs',     allocated: 30000,  spent: 18000, color: '#a78bfa' },
  { category: 'Eco Projects',          allocated: 20000,  spent: 9500,  color: '#4ade80' },
  { category: 'Infrastructure',        allocated: 100000, spent: 75000, color: '#fb923c' },
  { category: 'Staff & Training',      allocated: 50000,  spent: 31000, color: '#34d399' },
];

const votes = [
  { project: 'Solar lights at Deer Park',       votes: 342, total: 500 },
  { project: 'New playground at Nehru Park',    votes: 289, total: 500 },
  { project: 'Composting units — all parks',    votes: 421, total: 500 },
  { project: 'Bird watching towers',            votes: 198, total: 500 },
];

export default function BudgetPage() {
  return (
    <PageWrapper activeNav="Budget & Materials" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Budget & GreenBudget Voting</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Track spending and community-voted projects</p></div>
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Budget Tracker</h2>
            <div className="space-y-4">
              {budget.map((b) => {
                const pct = Math.round((b.spent / b.allocated) * 100);
                return (
                  <div key={b.category}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: 'var(--text-secondary)' }}>{b.category}</span>
                      <span style={{ color: 'var(--text-muted)' }}>₹{(b.spent / 1000).toFixed(0)}k / ₹{(b.allocated / 1000).toFixed(0)}k ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct > 80 ? '#f87171' : pct > 60 ? '#fbbf24' : b.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5" style={{ border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>GreenBudget Community Voting</h2>
            <div className="space-y-4">
              {votes.map((v) => {
                const pct = Math.round((v.votes / v.total) * 100);
                return (
                  <div key={v.project}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: 'var(--text-secondary)' }}>{v.project}</span>
                      <span style={{ color: '#34d399' }}>{v.votes} votes ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-base)' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #34d399, #14b8a6)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
