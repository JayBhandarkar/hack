export type Role = 'citizen' | 'admin' | 'maintenance_staff' | 'event_organizer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export const ROLES: { value: Role; label: string; description: string; color: string; icon: string }[] = [
  {
    value: 'citizen',
    label: 'Citizen',
    description: 'Explore parks, report issues, share experiences',
    color: 'from-emerald-500 to-teal-600',
    icon: '🌿',
  },
  {
    value: 'admin',
    label: 'Administrator',
    description: 'Full platform access, analytics & management',
    color: 'from-orange-500 to-red-600',
    icon: '⚙️',
  },
  {
    value: 'maintenance_staff',
    label: 'Maintenance Staff',
    description: 'Manage tasks, schedules & incident reporting',
    color: 'from-blue-500 to-cyan-600',
    icon: '🔧',
  },
  {
    value: 'event_organizer',
    label: 'Event Organizer',
    description: 'Create events, book parks & manage participants',
    color: 'from-violet-500 to-purple-600',
    icon: '🎪',
  },
];
