import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Mail, Phone, BookOpen, GraduationCap, Github, Linkedin, ExternalLink, Edit2, Award, ArrowRight } from 'lucide-react';

export default function Profile() {
    const user = {
        name: "Sanjay Kumar",
        role: "Student",
        email: "sanjay.techclub@simats.edu.in",
        phone: "+91 98765 43210",
        department: "Computer Science Engineering",
        year: "3rd Year",
        id: "211501045",
        bio: "Full Stack Developer | Competitive Programmer | Hackathon Enthusiast. Love building things with React and Node.js.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjay",
        stats: {
            problemsSolved: 142,
            eventsAttended: 8,
            hackathonsWon: 2
        },
        skills: ["React", "TypeScript", "Node.js", "Python", "Docker", "AWS"]
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl bg-slate-100"
                        />
                        <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-lg border border-slate-100 text-blue-600 hover:text-blue-700 transition-colors">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-1">{user.name}</h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                            <Badge className="bg-blue-600 text-white rounded-lg px-3 py-1 border-none">{user.role}</Badge>
                            <Badge variant="outline" className="text-slate-500 border-slate-200 rounded-lg px-3 py-1 font-medium">{user.department}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user.email}</span>
                            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {user.phone}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-auto flex gap-3">
                    <Button variant="outline" className="flex-1 md:flex-initial rounded-xl border-slate-200 shadow-sm">
                        <Github className="w-4 h-4 mr-2" /> GitHub
                    </Button>
                    <Button className="flex-1 md:flex-initial bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md">
                        <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Details */}
                <Card className="lg:col-span-2 border-none shadow-sm h-fit">
                    <CardHeader>
                        <CardTitle className="text-lg">About Me</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <p className="text-slate-600 leading-relaxed italic border-l-4 border-blue-100 pl-4">
                            "{user.bio}"
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Academic Info</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-slate-50 rounded-lg text-slate-500 w-9 h-9 flex items-center justify-center"><GraduationCap className="w-4 h-4" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-xs">Register Number</span>
                                            <span className="text-slate-900 font-semibold">{user.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-slate-50 rounded-lg text-slate-500 w-9 h-9 flex items-center justify-center"><BookOpen className="w-4 h-4" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-xs">Academic Year</span>
                                            <span className="text-slate-900 font-semibold">{user.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills & Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Achievements</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    { title: "Smart India Hackathon Finalist", year: "2025", category: "Competition" },
                                    { title: "Top 1% in CodeChef Contest", year: "2025", category: "Skill" }
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
                                        <div className="p-2 bg-amber-50 rounded-xl text-amber-500"><Award className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{badge.title}</p>
                                            <p className="text-[10px] text-slate-400">{badge.category} • {badge.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Performance Stats */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
                        <CardHeader>
                            <CardTitle className="text-lg">Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-2">
                            <div className="relative z-10">
                                <div className="flex items-end justify-between mb-2">
                                    <p className="text-4xl font-bold">{user.stats.problemsSolved}</p>
                                    <ArrowRight className="w-6 h-6 text-blue-200" />
                                </div>
                                <p className="text-blue-100 text-sm font-medium">Problems Solved</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                    <p className="text-2xl font-bold">{user.stats.eventsAttended}</p>
                                    <p className="text-xs text-blue-200">Events</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                    <p className="text-2xl font-bold">{user.stats.hackathonsWon}</p>
                                    <p className="text-xs text-blue-200">Wins</p>
                                </div>
                            </div>

                            {/* Decorative blur */}
                            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {[
                                { label: "My Submitted Tasks", icon: ExternalLink },
                                { label: "Event Participation History", icon: ExternalLink },
                                { label: "Tech Club Leaderboard", icon: ExternalLink },
                                { label: "Resume Portfolio", icon: ExternalLink }
                            ].map((link, i) => (
                                <button key={i} className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">{link.label}</span>
                                    <link.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
                                </button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
