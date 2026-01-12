import {
    LayoutDashboard,
    Megaphone,
    Calendar,
    CodeXml,
    FolderGit2,
    FileText,
    Users,
    Trophy,
    Settings,
    UserCircle,
    ClipboardList
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { NavLink, useLocation } from 'react-router-dom';

const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Megaphone, label: 'Announcements', path: '/admin/announcements' },
    { icon: Calendar, label: 'Events', path: '/admin/events' },
    { icon: CodeXml, label: 'Daily Problems', path: '/admin/daily-problems' },
    { icon: FolderGit2, label: 'Projects', path: '/admin/projects' },
    { icon: FileText, label: 'OD Requests', path: '/admin/od-requests' },
    { icon: Users, label: 'Members', path: '/admin/members' },
    { icon: Trophy, label: 'Leaderboard', path: '/admin/leaderboard' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const studentNavItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/student' },
    { icon: ClipboardList, label: 'Daily Task', path: '/student/daily-task' },
    { icon: Calendar, label: 'Events', path: '/student/events' },
    { icon: FileText, label: 'OD', path: '/student/od' },
    { icon: UserCircle, label: 'Profile', path: '/student/profile' },
];

export function Sidebar() {
    const location = useLocation();
    const isStudentPath = location.pathname.startsWith('/student');
    const navItems = isStudentPath ? studentNavItems : adminNavItems;

    return (
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-100 bg-white h-screen fixed left-0 top-0 pt-16 z-30">
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin' || item.path === '/student'}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group font-medium text-sm",
                                isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/30"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )
                        }
                    >
                        <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110")} />
                        {item.label}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                        {isStudentPath ? 'Tech Club Student' : 'Tech Club Admin'}
                    </p>
                    <p className="text-[10px] text-slate-400">v1.0.0 • © 2026</p>
                </div>
            </div>
        </aside>
    );
}
