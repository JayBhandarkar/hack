'use client';
import PageWrapper from '@/components/PageWrapper';
import { CalendarClock, MapPin, Clock, CheckCircle } from 'lucide-react';

const schedule = [
  { day: 'Monday',    shifts: [{ time: '7 AM – 3 PM', park: 'Lodhi Garden',   task: 'Morning inspection & cleaning' }, { time: '3 PM – 7 PM', park: 'Nehru Park', task: 'Evening patrol' }] },
  { day: 'Tuesday',   shifts: [{ time: '7 AM – 3 PM', park: 'Deer Park',      task: 'Maintenance & repairs' }] },
  { day: 'Wednesday', shifts: [{ time: '9 AM – 5 PM', park: 'Sunder Nursery', task: 'Landscaping & trimming' }] },
  { day: 'Thursday',  shifts: [{ time: '7 AM – 3 PM', park: 'Lodhi Garden',   task: 'Deep cleaning & inspection' }] },
  { day: 'Friday',    shifts: [{ time: '7 AM – 3 PM', park: 'Nehru Park',     task: 'Facility check & repairs' }] },
  { day: 'Saturday',  shifts: [{ time: '6 AM – 2 PM', park: 'Lodhi Garden',   task: 'Weekend crowd management' }, { time: '2 PM – 8 PM', park: 'Deer Park', task: 'Evening maintenance' }] },
  { day: 'Sunday',    shifts: [{ time: 'Off', park: '', task: 'Rest day' }] },
];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

export default function DutySchedulePage() {
  return (
    <PageWrapper activeNav="Duty Schedule" allowedRoles={['maintenance_staff']}>
      {() => (
        <div className="p-6 space-y-6">
          <div><h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Duty Schedule</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Your weekly timetable and shift assignments</p></div>
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)' }}>
            <p className="text-xs font-semibold" style={{ color: '#38bdf8' }}>Today — {today}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {schedule.find(s => s.day === today)?.shifts.map(sh => `${sh.time} at ${sh.park}`).join(' · ') || 'Rest day'}
            </p>
          </div>
          <div className="space-y-3">
            {schedule.map((day) => (
              <div key={day.day} className="glass-card rounded-2xl p-4" style={{ border: `1px solid ${day.day === today ? 'rgba(56,189,248,0.25)' : 'var(--border-subtle)'}`, background: day.day === today ? 'rgba(56,189,248,0.04)' : undefined }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold" style={{ color: day.day === today ? '#38bdf8' : 'var(--text-primary)' }}>{day.day}</span>
                  {day.day === today && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8' }}>Today</span>}
                </div>
                <div className="space-y-2">
                  {day.shifts.map((shift, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                      <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#38bdf8' }} />
                      <div className="flex-1">
                        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{shift.time}</p>
                        {shift.park && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{shift.park} — {shift.task}</p>}
                      </div>
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
