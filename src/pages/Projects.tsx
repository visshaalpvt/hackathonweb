import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Check, X, Trophy, Github, ExternalLink, Code2, Layers, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
    id: string;
    title: string;
    team_name: string;
    description: string;
    members: string[];
    tech_stack: string[];
    repo_link: string;
    demo_link?: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Winner';
    points?: number;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [pointsDialogOpen, setPointsDialogOpen] = useState(false);
    const [pointsToAssign, setPointsToAssign] = useState("50");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
        } else {
            setProjects(data || []);
        }
        setIsLoading(false);
    };

    const handleAction = async (id: string, status: Project['status']) => {
        const { error } = await supabase
            .from('projects')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating project status:', error);
        } else {
            setProjects(projects.map(p => p.id === id ? { ...p, status } : p));
        }
    };

    const handleAssignPoints = async () => {
        if (selectedProject) {
            const points = parseInt(pointsToAssign);
            const { error } = await supabase
                .from('projects')
                .update({ points })
                .eq('id', selectedProject.id);

            if (error) {
                console.error('Error assigning points:', error);
            } else {
                setProjects(projects.map(p => p.id === selectedProject.id ? { ...p, points } : p));
                setPointsDialogOpen(false);
            }
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Project Approvals</h2>
                <p className="text-slate-500">Review and approve student projects.</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className={`flex flex-col h-full ${project.status === 'Winner' ? 'border-yellow-400 bg-yellow-50/30' : ''}`}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="mb-1 flex items-center gap-2">
                                            {project.title}
                                            {project.status === 'Winner' && <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-100" />}
                                        </CardTitle>
                                        <CardDescription>{project.team_name}</CardDescription>
                                    </div>
                                    <Badge variant={
                                        project.status === 'Approved' ? 'secondary' :
                                            project.status === 'Winner' ? 'default' :
                                                project.status === 'Rejected' ? 'destructive' : 'outline'
                                    } className="uppercase tracking-wider">
                                        {project.status === 'Winner' ? 'Winner 🏆' : project.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <p className="text-sm text-slate-600">{project.description}</p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Code2 className="w-4 h-4" />
                                        <div className="flex flex-wrap gap-1">
                                            {project.tech_stack?.map(stack => (
                                                <Badge key={stack} variant="outline" className="text-[10px] py-0 h-5 font-normal">{stack}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Layers className="w-4 h-4" />
                                        <span>{project.members?.join(", ")}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-slate-500" asChild>
                                        <a href={project.repo_link} target="_blank" rel="noreferrer"><Github className="w-3.5 h-3.5" /> Code</a>
                                    </Button>
                                    {project.demo_link && (
                                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-slate-500" asChild>
                                            <a href={project.demo_link} target="_blank" rel="noreferrer"><ExternalLink className="w-3.5 h-3.5" /> Demo</a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-wrap gap-2 pt-0 border-t border-slate-100 bg-slate-50/50 p-4">
                                {project.status === 'Pending' && (
                                    <>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-9" onClick={() => handleAction(project.id, 'Approved')}>
                                            <Check className="w-4 h-4 mr-1.5" /> Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" className="h-9" onClick={() => handleAction(project.id, 'Rejected')}>
                                            <X className="w-4 h-4 mr-1.5" /> Reject
                                        </Button>
                                    </>
                                )}
                                {project.status !== 'Rejected' && (
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button size="sm" variant="outline" className={`${project.status === 'Winner' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : ''}`} onClick={() => handleAction(project.id, 'Winner')}>
                                            <Trophy className="w-4 h-4 mr-1.5" /> Winner
                                        </Button>
                                        <Dialog open={pointsDialogOpen && selectedProject?.id === project.id} onOpenChange={(open) => {
                                            if (open) {
                                                setSelectedProject(project);
                                                setPointsToAssign(project.points?.toString() || "50");
                                            }
                                            setPointsDialogOpen(open);
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="secondary">
                                                    {project.points ? `✨ ${project.points} pts` : 'Assign Points'}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Assign Points</DialogTitle>
                                                    <DialogDescription>Award points to {project.team_name} for this project.</DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <div className="space-y-2">
                                                        <Label>Points</Label>
                                                        <Input
                                                            type="number"
                                                            value={pointsToAssign}
                                                            onChange={(e) => setPointsToAssign(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleAssignPoints}>Assign</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}

                                <Button size="sm" variant="ghost" className="ml-auto">
                                    <MessageSquare className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border-2 border-dashed">
                            No projects submitted for review yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
