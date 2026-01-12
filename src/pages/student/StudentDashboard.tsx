import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Bell, Calendar, CheckCircle2, Star, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function StudentDashboard() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h2>
                    <p className="text-blue-100 max-w-md">You're doing great! You have solved 12 problems this week and earned 450 points. Keep it up!</p>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95">
                            Solve Today's Task
                        </button>
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 text-white border border-white/30 px-6 py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur-sm active:scale-95">
                            View My Rank
                        </button>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Club Rank</p>
                                <h3 className="text-2xl font-bold text-slate-900">#42</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                                <Star className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Points Earned</p>
                                <h3 className="text-2xl font-bold text-slate-900">2,450</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Tasks Completed</p>
                                <h3 className="text-2xl font-bold text-slate-900">128</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Announcements */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Announcements</CardTitle>
                            <CardDescription>Stay updated with the latest club news</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "Internal Hackathon 2026", date: "2 hours ago", type: "Event" },
                                { title: "New Python Course resources added", date: "5 hours ago", type: "Resource" },
                                { title: "OD Requests for Friday Hackathon", date: "Yesterday", type: "Notice" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                                    <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-3 h-fit">
                                        <Bell className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{item.type}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Upcoming Events</CardTitle>
                            <CardDescription>Don't miss out these opportunities</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">View Calendar</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { title: "Web Development Workshop", date: "Jan 15, 2026", time: "10:00 AM", color: "bg-purple-500" },
                                { title: "Competitive Coding Contest", date: "Jan 18, 2026", time: "02:00 PM", color: "bg-blue-500" },
                            ].map((event, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-blue-100 transition-all">
                                    <div className={`w-12 h-12 ${event.color} rounded-xl flex flex-col items-center justify-center text-white`}>
                                        <p className="text-[10px] font-bold uppercase">{event.date.split(' ')[0]}</p>
                                        <p className="text-lg font-bold leading-none">{event.date.split(' ')[1].replace(',', '')}</p>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-slate-900">{event.title}</h4>
                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                            <Calendar className="w-3 h-3" /> {event.time}
                                        </p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="rounded-full">
                                        <ArrowRight className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-4 rounded-xl" variant="outline">Browse All Events</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
