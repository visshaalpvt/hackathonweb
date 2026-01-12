import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Code2, Clock, Trophy, BookOpen, MessageSquare } from 'lucide-react';

export default function DailyTask() {
    const todayTask = {
        id: "DT-2026-001",
        title: "Palindrome Linked List",
        difficulty: "Medium",
        category: "Data Structures",
        points: 50,
        deadline: "23:59:59",
        description: "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.",
        constraints: [
            "The number of nodes in the list is in the range [1, 10^5].",
            "0 <= Node.val <= 9"
        ],
        stats: {
            solved: 156,
            averageTime: "15 mins"
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Today's Daily Task</h2>
                    <p className="text-slate-500 text-sm">Consistent practice leads to excellence. Solve the daily problem and earn points.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        Expires in: {todayTask.deadline}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                            <Badge className={
                                todayTask.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none' :
                                    todayTask.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-none' :
                                        'bg-rose-100 text-rose-700 hover:bg-rose-100 border-none'
                            }>
                                {todayTask.difficulty}
                            </Badge>
                            <span className="text-xs font-medium text-slate-400">ID: {todayTask.id}</span>
                        </div>
                        <CardTitle className="text-2xl">{todayTask.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            {todayTask.category}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="font-semibold text-slate-900 mb-2">Problem Description</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{todayTask.description}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wider">Constraints</h4>
                            <ul className="space-y-2">
                                {todayTask.constraints.map((c, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-xl py-6">
                                <Code2 className="w-4 h-4 mr-2" />
                                Submit Solution
                            </Button>
                            <Button variant="outline" className="rounded-xl py-6">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Discussion
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Rewards</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-blue-800">Points</span>
                                </div>
                                <span className="text-xl font-bold text-blue-600">+{todayTask.points}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Solved by</span>
                                <span className="text-sm font-semibold">{todayTask.stats.solved} students</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Avg. Time</span>
                                <span className="text-sm font-semibold">{todayTask.stats.averageTime}</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Previous Winners</h5>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <img
                                            key={i}
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100"
                                        />
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        +152
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                        <CardContent className="p-6">
                            <h4 className="font-bold mb-1">Your Streak</h4>
                            <p className="text-slate-400 text-xs mb-4">Don't break the chain!</p>
                            <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">5</p>
                                    <p className="text-[10px] uppercase text-slate-400">Current</p>
                                </div>
                                <div className="h-8 w-px bg-white/20"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">12</p>
                                    <p className="text-[10px] uppercase text-slate-400">Best</p>
                                </div>
                                <div className="h-8 w-px bg-white/20"></div>
                                <div className="p-2 bg-orange-500 rounded-lg">
                                    <Clock className="w-5 h-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
