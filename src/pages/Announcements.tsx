import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Pin, Share2, ThumbsUp, Plus, Search, Filter, Trash2, Edit } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Announcement {
    id: string;
    title: string;
    description: string;
    created_at: string;
    author: string;
    is_important: boolean;
    likes: number;
    is_pinned: boolean;
    visibility: 'All' | 'Members' | 'Core';
}

export default function Announcements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // New announcement state
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newVisibility, setNewVisibility] = useState("All");
    const [newIsImportant, setNewIsImportant] = useState(false);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .order('is_pinned', { ascending: false })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching announcements:', error);
        } else {
            setAnnouncements(data || []);
        }
        setIsLoading(false);
    };

    const handleCreate = async () => {
        const newEntry = {
            title: newTitle,
            description: newContent,
            author: "Admin",
            is_important: newIsImportant,
            likes: 0,
            is_pinned: false,
            visibility: newVisibility as 'All' | 'Members' | 'Core'
        };

        const { data, error } = await supabase
            .from('announcements')
            .insert([newEntry])
            .select();

        if (error) {
            console.error('Error creating announcement:', error);
        } else if (data) {
            setAnnouncements([data[0], ...announcements]);
            setIsCreateOpen(false);
            // Reset form
            setNewTitle("");
            setNewContent("");
            setNewVisibility("All");
            setNewIsImportant(false);
        }
    };

    const deleteAnnouncement = async (id: string) => {
        const { error } = await supabase
            .from('announcements')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting announcement:', error);
        } else {
            setAnnouncements(announcements.filter(a => a.id !== id));
        }
    };

    const togglePin = async (id: string, currentPinned: boolean) => {
        const { error } = await supabase
            .from('announcements')
            .update({ is_pinned: !currentPinned })
            .eq('id', id);

        if (error) {
            console.error('Error toggling pin:', error);
        } else {
            setAnnouncements(announcements.map(a =>
                a.id === id ? { ...a, is_pinned: !a.is_pinned } : a
            ));
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Announcements</h2>
                    <p className="text-slate-500">Manage club updates and news.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="Search updates..."
                            className="pl-9 w-64 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Search className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                    </Button>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" />
                                New Announcement
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Announcement</DialogTitle>
                                <DialogDescription>
                                    Post a new update to the club members.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        placeholder="e.g. Workshop Rescheduled"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Content (Rich Text support planned)</Label>
                                    <Textarea
                                        placeholder="Type your announcement details here..."
                                        className="min-h-[120px]"
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Visibility</Label>
                                        <Select value={newVisibility} onValueChange={setNewVisibility}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All Users</SelectItem>
                                                <SelectItem value="Members">Members Only</SelectItem>
                                                <SelectItem value="Core">Core Team Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-row items-center justify-between rounded-xl border p-3">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Important</Label>
                                            <div className="text-[10px] text-muted-foreground">Mark as high priority</div>
                                        </div>
                                        <Switch
                                            checked={newIsImportant}
                                            onCheckedChange={setNewIsImportant}
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreate}>Post Update</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-4">
                {announcements.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map((announcement) => (
                    <Card key={announcement.id} className={`transition-all hover:shadow-md ${announcement.is_pinned ? 'border-primary/20 bg-primary/5' : ''}`}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {announcement.is_pinned && (
                                            <Badge variant="secondary" className="gap-1 text-primary bg-white shadow-sm">
                                                <Pin className="w-3 h-3 fill-current" /> Pinned
                                            </Badge>
                                        )}
                                        {announcement.is_important && (
                                            <Badge variant="destructive" className="gap-1">
                                                Important
                                            </Badge>
                                        )}
                                        <Badge variant="outline" className="text-slate-500 font-normal">
                                            {announcement.visibility}
                                        </Badge>
                                        <span className="text-xs text-slate-400">• {new Date(announcement.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">{announcement.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{announcement.description}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => togglePin(announcement.id, announcement.is_pinned)}>
                                        <Pin className={`w-4 h-4 ${announcement.is_pinned ? 'fill-primary text-primary' : 'text-slate-400'}`} />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => deleteAnnouncement(announcement.id)}>
                                        <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 p-3 px-6 rounded-b-2xl border-t border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                                        {announcement.author[0]}
                                    </div>
                                    {announcement.author}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-xs font-semibold">{announcement.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-slate-500">
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-xs">Share</span>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {isLoading && (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}
        </div>
    );
}
