import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Search, MapPin, Calendar, Users, PlusCircle, Edit, Globe, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { supabase } from '../lib/supabase';

interface Event {
    id: string;
    name: string;
    organizer: string;
    date: string;
    time: string;
    mode: 'Online' | 'Offline';
    location?: string;
    fee: 'Free' | string;
    status: 'Open' | 'Closed' | 'Full';
    attendees: number;
    image: string;
    description?: string;
}

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [newEvent, setNewEvent] = useState<Partial<Event>>({});

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching events:', error);
        } else {
            setEvents(data || []);
        }
        setIsLoading(false);
    };

    const handleCreate = async () => {
        const eventData = {
            name: newEvent.name || "New Event",
            organizer: "Admin",
            date: newEvent.date || new Date().toISOString().split('T')[0],
            time: newEvent.time || "10:00 AM",
            mode: (newEvent.mode as 'Online' | 'Offline') || 'Offline',
            location: newEvent.location || "TBD",
            fee: newEvent.fee || "Free",
            status: "Open",
            attendees: 0,
            image: newEvent.image || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60",
            description: newEvent.description || ""
        };

        const { data, error } = await supabase
            .from('events')
            .insert([eventData])
            .select();

        if (error) {
            console.error('Error creating event:', error);
        } else if (data) {
            setEvents([...events, data[0]]);
            setIsCreateOpen(false);
            setNewEvent({});
        }
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting event:', error);
        } else {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const upcomingEvents = events.filter(e => e.date >= today);
    const pastEvents = events.filter(e => e.date < today);

    const filteredUpcoming = upcomingEvents.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredPast = pastEvents.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Events</h2>
                    <p className="text-slate-500">Manage club events and workshops.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Create Event
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 md:max-w-xs">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Search events..."
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past Events</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUpcoming.map((event) => (
                            <EventCard key={event.id} event={event} onDelete={handleDelete} />
                        ))}
                        {!isLoading && filteredUpcoming.length === 0 && (
                            <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border-2 border-dashed">
                                No upcoming events found.
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="past">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPast.map((event) => (
                            <EventCard key={event.id} event={event} onDelete={handleDelete} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="drafts">
                    <div className="flex flex-col items-center justify-center p-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                        <Calendar className="w-12 h-12 mb-3 opacity-20" />
                        <p>No drafts yet</p>
                    </div>
                </TabsContent>
            </Tabs>

            {isLoading && (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                        <DialogDescription>Fill in the details for the new event.</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Event Name</Label>
                                <Input
                                    placeholder="e.g. React Workshop"
                                    value={newEvent.name || ''}
                                    onChange={e => setNewEvent({ ...newEvent, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        value={newEvent.date || ''}
                                        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Time</Label>
                                    <Input
                                        type="time"
                                        value={newEvent.time || ''}
                                        onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Fee (₹)</Label>
                                <Input
                                    placeholder="0 for Free"
                                    value={newEvent.fee || ''}
                                    onChange={e => setNewEvent({ ...newEvent, fee: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Mode</Label>
                                <Select onValueChange={(val: any) => setNewEvent({ ...newEvent, mode: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Online">Online</SelectItem>
                                        <SelectItem value="Offline">Offline</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Venue / Link</Label>
                                <Input
                                    placeholder="e.g. Lab 2 or Zoom Link"
                                    value={newEvent.location || ''}
                                    onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Cover Image URL</Label>
                                <Input
                                    placeholder="https://..."
                                    value={newEvent.image || ''}
                                    onChange={e => setNewEvent({ ...newEvent, image: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <Label>Description</Label>
                            <Input
                                className="h-20"
                                value={newEvent.description || ''}
                                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreate}>Create Event</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function EventCard({ event, onDelete }: { event: Event, onDelete: (id: string) => void }) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none shadow-sm flex flex-col h-full bg-white">
            <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className={
                        event.status === 'Open' ? 'bg-green-500/90 hover:bg-green-600' :
                            event.status === 'Full' ? 'bg-red-500/90 hover:bg-red-600' : 'bg-slate-500/90'
                    }>
                        {event.status}
                    </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="backdrop-blur-md bg-white/80 text-black shadow-sm font-bold">
                        {event.fee}
                    </Badge>
                </div>
            </div>
            <CardContent className="p-5 flex-1 relative">
                <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{event.organizer}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{event.name}</h3>

                <div className="space-y-2 text-sm text-slate-600 mt-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {event.mode === 'Online' ? <Globe className="w-4 h-4 text-slate-400" /> : <MapPin className="w-4 h-4 text-slate-400" />}
                        <span className="truncate">{event.location || 'Online'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>{event.attendees} Registered</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex gap-2">
                <Button className="flex-1 rounded-xl group-hover:bg-primary/90" variant="outline">Detailed View</Button>
                <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="rounded-xl"><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(event.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
