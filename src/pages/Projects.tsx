import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Check, X, Trophy, Github, ExternalLink, Code2, Layers, MessageSquare } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    teamName: string;
    description: string;
    members: string[];
    techStack: string[];
    repoLink: string;
    demoLink?: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Winner';
    points?: number;
}

const mockProjects: Project[] = [
    {
        id: 1,
        title: "Campus Connect App",
        teamName: "Pixel Pioneers",
        description: "A mobile app to connect students across different departments for collaborative projects.",
        members: ["Alice", "Bob", "Charlie"],
        techStack: ["Flutter", "Firebase", "Dart"],
        repoLink: "https://github.com",
        status: "Pending"
    },
    {
        id: 2,
        title: "Smart Attendance System",
        teamName: "AI Wizards",
        description: "Automated attendance using facial recognition and geolocation.",
        members: ["David", "Eve"],
        techStack: ["Python", "OpenCV", "React"],
        repoLink: "https://github.com",
        status: "Approved",
        points: 50
    },
    {
        id: 3,
        title: "DeFi Crowdfunding",
        teamName: "BlockChain Gang",
        description: "Decentralized crowdfunding platform for student startups.",
        members: ["Frank", "Grace", "Heidi", "Ivan"],
        techStack: ["Solidity", "Next.js", "Ethereum"],
        repoLink: "https://github.com",
        status: "Winner",
        points: 100
    },
];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [pointsDialogOpen, setPointsDialogOpen] = useState(false);
    const [pointsToAssign, setPointsToAssign] = useState("50");

    const handleAction = (id: number, status: Project['status']) => {
        setProjects(projects.map(p => p.id === id ? { ...p, status } : p));
    };

    const handleAssignPoints = () => {
        if (selectedProject) {
            setProjects(projects.map(p => p.id === selectedProject.id ? { ...p, points: parseInt(pointsToAssign) } : p));
            setPointsDialogOpen(false);
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Project Approvals</h2>
                <p className="text-slate-500">Review and approve student projects.</p>
            </div>

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
                                    <CardDescription>{project.teamName}</CardDescription>
                                </div>
                                <Badge variant={
                                    project.status === 'Approved' ? 'success' :
                                        project.status === 'Winner' ? 'warning' :
                                            project.status === 'Rejected' ? 'destructive' : 'secondary'
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
                                        {project.techStack.map(stack => (
                                            <Badge key={stack} variant="outline" className="text-[10px] py-0 h-5 font-normal">{stack}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Layers className="w-4 h-4" />
                                    <span>{project.members.join(", ")}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-slate-500" asChild>
                                    <a href={project.repoLink} target="_blank" rel="noreferrer"><Github className="w-3.5 h-3.5" /> Code</a>
                                </Button>
                                {project.demoLink && (
                                    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-slate-500" asChild>
                                        <a href={project.demoLink} target="_blank" rel="noreferrer"><ExternalLink className="w-3.5 h-3.5" /> Demo</a>
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
                                        setPointsDialogOpen(open);
                                        if (!open) setSelectedProject(null);
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="secondary" onClick={() => setSelectedProject(project)}>
                                                {project.points ? `✨ ${project.points} pts` : 'Assign Points'}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Assign Points</DialogTitle>
                                                <DialogDescription>Award points to {project.teamName} for this project.</DialogDescription>
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
            </div>
        </div>
    )
}
