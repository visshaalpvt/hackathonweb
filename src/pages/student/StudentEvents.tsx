import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Calendar, MapPin, Users, ArrowRight, Star, Clock } from 'lucide-react';

export default function StudentEvents() {
    const events = [
        {
            title: "Winter Hackathon 2026",
            date: "Jan 18, 2026",
            time: "09:00 AM",
            location: "Main Auditorium",
            category: "Competition",
            status: "Open",
            participants: "128 Registered",
            points: "500 XP",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400"
        },
        {
            title: "React Workshop for Beginners",
            date: "Jan 22, 2026",
            time: "10:30 AM",
            location: "Lab 3",
            category: "Workshop",
            status: "Coming Soon",
            participants: "45/50 Slots",
            points: "200 XP",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
        },
        {
            title: "Tech Career Fair",
            date: "Feb 05, 2026",
            time: "11:00 AM",
            location: "Campus Square",
            category: "Meetup",
            status: "Registration Full",
            participants: "200 Registered",
            points: "100 XP",
            image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=400"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Events & Workshops</h2>
                    <p className="text-slate-500 text-sm">Join exciting events and level up your skills.</p>
                </div>
                <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                    <Button variant="ghost" size="sm" className="bg-slate-100 text-slate-900 rounded-lg px-6">All Events</Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 rounded-lg px-6">My Bookings</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, i) => (
                    <Card key={i} className="group border-none shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className={`${event.status === 'Open' ? 'bg-emerald-500' :
                                        event.status === 'Coming Soon' ? 'bg-blue-500' : 'bg-slate-500'
                                    } text-white border-none`}>
                                    {event.status}
                                </Badge>
                            </div>
                            <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                                <Button size="sm" className="rounded-full shadow-lg bg-white text-blue-600 hover:bg-blue-50 border-none">
                                    Join Now
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded cursor-default">
                                    {event.category}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1 cursor-default">
                                    <Star className="w-2.5 h-2.5 fill-amber-600" />
                                    {event.points}
                                </span>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-1">{event.title}</h3>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-xs text-slate-500 gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {event.date}
                                </div>
                                <div className="flex items-center text-xs text-slate-500 gap-2">
                                    <Clock className="w-3.5 h-3.5" />
                                    {event.time}
                                </div>
                                <div className="flex items-center text-xs text-slate-500 gap-2">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {event.location}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                                    <Users className="w-3.5 h-3.5" />
                                    {event.participants}
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto hover:bg-transparent">
                                    Details <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
