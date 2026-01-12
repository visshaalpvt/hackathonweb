import {
    LayoutDashboard,
    Calendar,
    Megaphone,
    Menu,
    UserCircle,
    ClipboardList,
    FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { NavLink, useLocation } from 'react-router-dom';

const adminNavItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/admin' },
    { icon: Calendar, label: 'Events', path: '/admin/events' },
    { icon: Megaphone, label: 'Updates', path: '/admin/announcements' },
    { icon: Menu, label: 'More', path: '/admin/menu' },
];

const studentNavItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/student' },
    { icon: ClipboardList, label: 'Tasks', path: '/student/daily-task' },
    { icon: FileText, label: 'OD', path: '/student/od' },
    { icon: UserCircle, label: 'Profile', path: '/student/profile' },
];

export function BottomNav() {
    const location = useLocation();
    const isStudentPath = location.pathname.startsWith('/student');
    const navItems = isStudentPath ? studentNavItems : adminNavItems;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-2 lg:hidden z-50 flex justify-between items-center pb-safe-area">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin' || item.path === '/student'}
                    className={({ isActive }) =>
                        cn(
                            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                            isActive ? "text-primary" : "text-slate-400"
                        )
                    }
                >
                    {({ isActive }) => (
                        <>
                            <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    );
}
