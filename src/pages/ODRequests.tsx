import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Check, X, FileText, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ODRequest {
    id: string;
    student_name: string;
    roll_no: string;
    date: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    proof_url: string;
    admin_comment?: string;
}

export default function ODRequests() {
    const [requests, setRequests] = useState<ODRequest[]>([]);
    const [commentOpen, setCommentOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ODRequest | null>(null);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('od_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching OD requests:', error);
        } else {
            setRequests(data || []);
        }
        setIsLoading(false);
    };

    const handleAction = async (id: string, status: ODRequest['status'], adminComment?: string) => {
        const { error } = await supabase
            .from('od_requests')
            .update({ status, admin_comment: adminComment })
            .eq('id', id);

        if (error) {
            console.error('Error updating OD request:', error);
        } else {
            setRequests(requests.map(r => r.id === id ? { ...r, status, admin_comment: adminComment } : r));
        }
    };

    const handleRejectWithComment = () => {
        if (selectedRequest) {
            handleAction(selectedRequest.id, 'Rejected', comment);
            setCommentOpen(false);
            setComment("");
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">OD Requests</h2>
                <p className="text-slate-500">Manage On-Duty requests from students.</p>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 hover:bg-slate-50">
                                <TableHead>Student Details</TableHead>
                                <TableHead>Date & Reason</TableHead>
                                <TableHead>Proof</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-slate-900">{req.student_name}</p>
                                            <p className="text-xs text-slate-500">{req.roll_no}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[200px]">
                                            <p className="text-sm font-medium">{req.date}</p>
                                            <p className="text-xs text-slate-500 truncate" title={req.reason}>{req.reason}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" className="gap-2 h-8 text-xs" asChild>
                                            <a href={req.proof_url} target="_blank" rel="noreferrer"><FileText className="w-3 h-3" /> View</a>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            req.status === 'Approved' ? 'secondary' :
                                                req.status === 'Rejected' ? 'destructive' : 'outline'
                                        }>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {req.status === 'Pending' ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0" title="Approve" onClick={() => handleAction(req.id, 'Approved')}>
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Dialog open={commentOpen && selectedRequest?.id === req.id} onOpenChange={(open) => {
                                                    setCommentOpen(open);
                                                    if (!open) setSelectedRequest(null);
                                                }}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="destructive" className="h-8 w-8 p-0" title="Reject" onClick={() => setSelectedRequest(req)}>
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Reject Reason</DialogTitle>
                                                            <DialogDescription>Please provide a reason for rejection.</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-4">
                                                            <div className="space-y-2">
                                                                <Label>Comments</Label>
                                                                <Textarea
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                    placeholder="e.g. Insufficient proof provided..."
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button variant="outline" onClick={() => setCommentOpen(false)}>Cancel</Button>
                                                            <Button variant="destructive" onClick={handleRejectWithComment}>Reject Request</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400">
                                                    <MessageSquare className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {requests.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-12 text-center text-slate-500">
                                        No OD requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </Card>
        </div>
    );
}
