import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Users, UserCheck, Clock, FileCheck, TrendingUp, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';

const stats = [
    { label: 'Total Members', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Members', value: '856', change: '+5%', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Approvals', value: '24', change: '-2', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Today\'s Submissions', value: '142', change: '+18%', icon: FileCheck, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const data = [
    { name: 'Mon', submissions: 120 },
    { name: 'Tue', submissions: 132 },
    { name: 'Wed', submissions: 101 },
    { name: 'Thu', submissions: 134 },
    { name: 'Fri', submissions: 190 },
    { name: 'Sat', submissions: 230 },
    { name: 'Sun', submissions: 210 },
];

const contributors = [
    { name: 'Alex Johnson', role: 'Full Stack', points: 1240, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { name: 'Sarah Williams', role: 'UI/UX Designer', points: 1180, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { name: 'Michael Chen', role: 'Backend dev', points: 940, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
    { name: 'Emily Davis', role: 'Data Scientist', points: 890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
];

export default function Dashboard() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
                    <p className="text-slate-500">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Download Report</Button>
                    <Button>Create New Event</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1 text-slate-900">{stat.value}</h3>
                                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'} flex items-center gap-1 mt-1`}>
                                    {stat.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : null}
                                    {stat.change} from last week
                                </span>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Weekly Submissions</CardTitle>
                        <CardDescription>Daily problem submissions over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="submissions" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={40}>
                                        {data.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 5 ? 'hsl(var(--primary))' : '#bfdbfe'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Top Contributors</CardTitle>
                            <CardDescription>Most active members</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreHorizontal className="w-4 h-4" /></Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {contributors.map((user, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="relative">
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-slate-100" />
                                        {i < 3 && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-[10px] flex items-center justify-center font-bold text-yellow-900 border border-white">
                                                {i + 1}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-primary">{user.points}</p>
                                        <p className="text-[10px] text-slate-400">pts</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6 rounded-xl border-dashed">View Leaderboard</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
