import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { FileText, Plus, Clock, CheckCircle2, XCircle, MoreVertical, FileDown } from 'lucide-react';

export default function StudentOD() {
    const odHistory = [
        { id: "OD-9021", event: "Internal Hackathon 2026", date: "Jan 18, 2026", duration: "Full Day", status: "Approved" },
        { id: "OD-8842", event: "Tech Talk by Google", date: "Jan 12, 2026", duration: "10:30 - 12:30", status: "Pending" },
        { id: "OD-8563", event: "Competitive Coding Round 2", date: "Dec 15, 2025", duration: "02:00 - 04:30", status: "Rejected" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">On Duty (OD) Requests</h2>
                    <p className="text-slate-500 text-sm">Manage your OD requests for events and competitions.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Stats */}
                <Card className="border-none shadow-sm lg:col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <span className="text-xs text-slate-500">Total Requests</span>
                            <span className="font-bold text-slate-900">12</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                            <span className="text-xs text-emerald-600">Approved</span>
                            <span className="font-bold text-emerald-600">8</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                            <span className="text-xs text-amber-600">Pending</span>
                            <span className="font-bold text-amber-600">2</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-rose-50 rounded-xl">
                            <span className="text-xs text-rose-600">Total Hours</span>
                            <span className="font-bold text-rose-600">42h</span>
                        </div>
                        <Button variant="outline" className="w-full mt-2 rounded-xl border-dashed">
                            <FileDown className="w-3.5 h-3.5 mr-2" />
                            Report
                        </Button>
                    </CardContent>
                </Card>

                {/* OD History Table */}
                <Card className="border-none shadow-sm lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Request History</CardTitle>
                            <CardDescription>View and track your previous OD submissions.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="pl-6">Request ID</TableHead>
                                    <TableHead>Event Details</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {odHistory.map((od) => (
                                    <TableRow key={od.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="font-medium text-blue-600 pl-6">{od.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 text-sm">{od.event}</span>
                                                <span className="text-xs text-slate-400">Tech Club Official</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{od.date}</span>
                                                <span className="text-xs text-slate-400">{od.duration}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={
                                                od.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                    od.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-rose-100 text-rose-700'
                                            } variant="secondary">
                                                {od.status === 'Approved' && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
                                                {od.status === 'Pending' && <Clock className="w-3 h-3 mr-1.5" />}
                                                {od.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1.5" />}
                                                {od.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
