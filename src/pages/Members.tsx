import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Trophy, Ban, UserCheck, Key, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Member {
    id: string;
    name: string;
    email: string;
    role: 'Member' | 'Core' | 'Lead' | 'Admin';
    points: number;
    status: 'Active' | 'Banned';
    badges: string[];
}

export default function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [newRole, setNewRole] = useState<Member['role']>("Member");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('members')
            .select('*')
            .order('points', { ascending: false });

        if (error) {
            console.error('Error fetching members:', error);
        } else {
            setMembers(data || []);
        }
        setIsLoading(false);
    };

    const handleRoleChange = async () => {
        if (selectedMember) {
            const { error } = await supabase
                .from('members')
                .update({ role: newRole })
                .eq('id', selectedMember.id);

            if (error) {
                console.error('Error updating role:', error);
            } else {
                setMembers(members.map(m => m.id === selectedMember.id ? { ...m, role: newRole } : m));
                setRoleDialogOpen(false);
            }
        }
    };

    const toggleBan = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Active' ? 'Banned' : 'Active';
        const { error } = await supabase
            .from('members')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error toggling ban:', error);
        } else {
            setMembers(members.map(m => m.id === id ? { ...m, status: newStatus } : m));
        }
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Members</h2>
                    <p className="text-slate-500">Manage club members and roles.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                    <Button className="gap-2">
                        <UserCheck className="w-4 h-4" /> Add Member
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 md:max-w-xs">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Search members..."
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Points</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredMembers.map((member) => (
                            <TableRow key={member.id} className={member.status === 'Banned' ? 'bg-red-50/50' : ''}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {member.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{member.name}</p>
                                            <p className="text-xs text-slate-500">{member.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        member.role === 'Admin' ? 'destructive' :
                                            member.role === 'Lead' ? 'default' :
                                                member.role === 'Core' ? 'secondary' : 'outline'
                                    } className="font-medium">
                                        {member.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                                        <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                                        {member.points}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={member.status === 'Active' ? 'success' : 'destructive'}>
                                        {member.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Dialog open={roleDialogOpen && selectedMember?.id === member.id} onOpenChange={(open) => {
                                            if (open) {
                                                setSelectedMember(member);
                                                setNewRole(member.role);
                                            }
                                            setRoleDialogOpen(open);
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Change Role">
                                                    <Key className="w-4 h-4 text-slate-400" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Change Role</DialogTitle>
                                                    <DialogDescription>Update the access level for {member.name}.</DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <div className="space-y-2">
                                                        <Label>Role</Label>
                                                        <Select value={newRole} onValueChange={(val: any) => setNewRole(val)}>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Member">Member</SelectItem>
                                                                <SelectItem value="Core">Core</SelectItem>
                                                                <SelectItem value="Lead">Lead</SelectItem>
                                                                <SelectItem value="Admin">Admin</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleRoleChange}>Update Role</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Ban/Unban" onClick={() => toggleBan(member.id, member.status)}>
                                            <Ban className={`w-4 h-4 ${member.status === 'Banned' ? 'text-red-600' : 'text-slate-400'}`} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            {isLoading && (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}
        </div>
    );
}
