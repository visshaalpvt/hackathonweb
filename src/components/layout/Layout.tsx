import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';

export function Layout() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Top Navbar */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Logo Image */}
                    <div className="h-10 w-auto overflow-hidden rounded-lg">
                        <img src="/logo.png" alt="Hackathon Club Logo" className="h-full w-auto object-contain" />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold leading-none text-slate-900 tracking-tight">
                            HACKATHON CLUB
                        </h1>
                        <span className="text-[10px] font-semibold text-slate-500 tracking-wider">
                            SIMATS ENGINEERING
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-2 bg-slate-50 rounded-full text-sm border-none focus:ring-2 focus:ring-primary/20 w-48 lg:w-64 outline-none transition-all"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100 text-slate-500">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </Button>

                    <div className="flex items-center gap-2 pl-2 border-l border-slate-100 ml-1">
                        <div className="hidden lg:flex flex-col items-end mr-1">
                            <span className="text-xs font-bold text-slate-900">User Profile</span>
                            <span className="text-[10px] text-slate-500 font-medium">Tech Club Member</span>
                        </div>
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100 bg-gradient-to-tr from-blue-400 to-indigo-500">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                                alt="User"
                                className="w-full h-full rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                <Sidebar />

                <main className="flex-1 w-full lg:ml-64 p-4 md:p-8 pb-24 lg:pb-8 min-h-[calc(100vh-4rem)]">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>

            <BottomNav />
        </div>
    );
}
