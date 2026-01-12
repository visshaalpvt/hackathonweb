import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Medal, Search, Crown, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
    rank: number;
    name: string;
    avatar: string;
    points: number;
    change: 'up' | 'down' | 'same';
    department: string;
}

export default function Leaderboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('members')
            .select('*')
            .order('points', { ascending: false });

        if (error) {
            console.error('Error fetching leaderboard:', error);
        } else if (data) {
            const entries: LeaderboardEntry[] = data.map((user, index) => ({
                rank: index + 1,
                name: user.name,
                avatar: user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2),
                points: user.points,
                change: 'same', // Mocked as not in DB
                department: user.department || 'General'
            }));
            setLeaderboard(entries);
        }
        setIsLoading(false);
    };

    const filteredData = leaderboard.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-100" />;
            case 2: return <Medal className="w-6 h-6 text-slate-400 fill-slate-100" />;
            case 3: return <Medal className="w-6 h-6 text-amber-700 fill-amber-100" />;
            default: return <span className="font-bold text-slate-500 w-6 text-center">{rank}</span>;
        }
    };

    const getChangeIcon = (change: string) => {
        switch (change) {
            case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
            default: return <Minus className="w-4 h-4 text-slate-300" />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Leaderboard</h2>
                    <p className="text-slate-500">Top performers and contributors.</p>
                </div>

                <Tabs defaultValue="all-time" className="w-[300px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="all-time">All Time</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : (
                <>
                    {/* Top 3 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        {[leaderboard[1], leaderboard[0], leaderboard[2]].filter(Boolean).map((user) => (
                            <Card key={user.rank} className={`relative overflow-hidden border-none shadow-md ${user.rank === 1 ? 'md:-mt-8 z-10 ring-4 ring-primary/20' : ''} transition-all hover:-translate-y-1`}>
                                <div className={`absolute top-0 left-0 w-full h-2 ${user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-slate-300' : 'bg-amber-600'}`}></div>
                                <CardContent className="pt-8 flex flex-col items-center">
                                    <div className="relative mb-3">
                                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg ${user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-slate-300' : 'bg-amber-600'}`}>
                                            {user.avatar}
                                        </div>
                                        <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-1.5 shadow-sm">
                                            {getRankIcon(user.rank)}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mt-2">{user.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium mb-4">{user.department}</p>
                                    <div className="bg-slate-50 rounded-full py-1.5 px-4 flex items-center gap-2">
                                        <span className="font-bold text-primary">{user.points}</span>
                                        <span className="text-xs text-slate-400">pts</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Rankings</CardTitle>
                            <div className="relative w-64">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input
                                    placeholder="Search student..."
                                    className="pl-9 h-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                                        <TableHead className="w-[80px]">Rank</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead className="text-center">Change</TableHead>
                                        <TableHead className="text-right">Points</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.map((user) => (
                                        <TableRow key={user.rank} className="hover:bg-slate-50/80">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center justify-center w-8 h-8">
                                                    {getRankIcon(user.rank)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                                                        {user.avatar}
                                                    </div>
                                                    <span className="font-medium text-slate-700">{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-500">{user.department}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-center">
                                                    {getChangeIcon(user.change)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-slate-900">{user.points}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
