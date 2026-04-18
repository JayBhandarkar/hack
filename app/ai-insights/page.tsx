'use client';
import PageWrapper from '@/components/PageWrapper';
import { Brain, TrendingUp, AlertTriangle, Leaf, Users } from 'lucide-react';

const insights = [
  { icon: '📈', category: 'Footfall', title: 'Weekend surge at Lodhi Garden', desc: 'Footfall up 23% this weekend. Consider deploying 3 additional staff on Saturdays and Sundays.', priority: 'high', action: 'Add Staff' },
  { icon: '⚠️', category: 'Maintenance', title: 'Predictive maintenance alert', desc: 'Deer Park lighting system shows 78% failure probability in next 14 days based on usage patterns.', priority: 'high', action: 'Schedule Repair' },
  { icon: '🌱', category: 'Ecology', title: 'Eco activity participation spike', desc: 'Tree plantation participation up 40% this month. Expand program to Nehru Park and Sunder Nursery.', priority: 'medium', action: 'Expand Program' },
  { icon: '🔒', category: 'Safety', title: "Women's safety improvement needed", desc: 'Deer Park south pathway has 3 safety reports this week. Install additional lighting and CCTV.', priority: 'high', action: 'Take Action' },
  { icon: '💧', category: 'Environment', title: 'Water usage optimization', desc: 'Irrigation at Nehru Park can be reduced by 30% using smart scheduling based on weather data.', priority: 'medium', action: 'Optimize' },
  { icon: '🎪', category: 'Events', title: 'Event demand forecasting', desc: 'Yoga and wellness events have 94% fill rate. Increase frequency from 2 to 4 sessions per week.', priority: 'low', action: 'Plan Events' },
];

const priorityColor: Record<string, string> = { high: '#f87171', medium: '#fbbf24', low: '#34d399' };

export default function AIInsightsPage() {
  return (
    <PageWrapper activeNav="AI Insights" allowedRoles={['admin']}>
      {() => (
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(167,139,250,0.12)' }}>
              <Brain className="w-5 h-5" style={{ color: '#a78bfa' }} />
            </div>
            <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Insights</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Smart recommendations powered by usage data</p></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[{ label: 'High Priority', count: insights.filter(i => i.priority === 'high').length, color: '#f87171' },
              { label: 'Medium', count: insights.filter(i => i.priority === 'medium').length, color: '#fbbf24' },
              { label: 'Low', count: insights.filter(i => i.priority === 'low').length, color: '#34d399' }].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4 text-center" style={{ border: '1px solid var(--border-subtle)' }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {insights.map((ins, i) => (
              <div key={i} className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${ins.priority === 'high' ? 'rgba(248,113,113,0.2)' : 'var(--border-subtle)'}` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl flex-shrink-0">{ins.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa' }}>{ins.category}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${priorityColor[ins.priority]}18`, color: priorityColor[ins.priority] }}>{ins.priority}</span>
                      </div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{ins.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ins.desc}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all hover:-translate-y-0.5"
                    style={{ background: 'var(--accent)', color: '#fff' }}>{ins.action}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
