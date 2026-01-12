import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Check, X, FileText, ChevronRight, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Problem {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    deadline: string;
    submissions_count: number;
    status: 'Active' | 'Closed';
}

interface Submission {
    id: string;
    student_name: string;
    submitted_at: string;
    score?: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    file_url: string;
    problem_id: string;
}

export default function DailyProblems() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmissionsLoading, setIsSubmissionsLoading] = useState(false);

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('problems')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching problems:', error);
        } else {
            setProblems(data || []);
        }
        setIsLoading(false);
    };

    const handleOpenSubmissions = async (problem: Problem) => {
        setSelectedProblem(problem);
        setSheetOpen(true);
        setIsSubmissionsLoading(true);

        const { data, error } = await supabase
            .from('submissions')
            .select('*')
            .eq('problem_id', problem.id);

        if (error) {
            console.error('Error fetching submissions:', error);
        } else {
            setSubmissions(data || []);
        }
        setIsSubmissionsLoading(false);
    }

    const handleEvaluate = async (submissionId: string, status: 'Approved' | 'Rejected', score?: number) => {
        const { error } = await supabase
            .from('submissions')
            .update({ status, score })
            .eq('id', submissionId);

        if (error) {
            console.error('Error evaluating submission:', error);
        } else {
            setSubmissions(submissions.map(s => s.id === submissionId ? { ...s, status, score } : s));
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Daily Problems</h2>
                <p className="text-slate-500">Manage daily coding challenges and evaluate submissions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-dashed border-2 bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors min-h-[200px]">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                            <span className="text-2xl">+</span>
                        </div>
                        <h3 className="font-semibold text-slate-900">Post New Problem</h3>
                        <p className="text-sm text-slate-500">Create a challenge for today</p>
                    </div>
                </Card>
                {problems.map((problem) => (
                    <Card key={problem.id} className="group relative hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant={
                                    problem.difficulty === 'Easy' ? 'secondary' :
                                        problem.difficulty === 'Medium' ? 'default' : 'destructive'
                                } className="mb-2">
                                    {problem.difficulty}
                                </Badge>
                                <Badge variant="outline" className={problem.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-slate-500'}>
                                    {problem.status}
                                </Badge>
                            </div>
                            <CardTitle className="leading-tight">{problem.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-2">
                                <Clock className="w-4 h-4" />
                                Ends: {problem.deadline}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                                <span>{problem.submissions_count || 0} Submissions</span>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                                    ))}
                                    <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold">+</div>
                                </div>
                            </div>
                            <Button className="w-full" onClick={() => handleOpenSubmissions(problem)}>
                                Evaluate Submissions <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {isLoading && (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Submissions: {selectedProblem?.title}
                        </DialogTitle>
                        <DialogDescription>
                            Review and grade student submissions.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="pending">
                        <TabsList>
                            <TabsTrigger value="pending" className="gap-2">
                                Pending
                                <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                                    {submissions.filter(s => s.status === 'Pending').length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="graded">Graded</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="mt-4">
                            <div className="rounded-xl border min-h-[200px]">
                                {isSubmissionsLoading ? (
                                    <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Student</TableHead>
                                                <TableHead>Time</TableHead>
                                                <TableHead>Solution</TableHead>
                                                <TableHead>Score (0-100)</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {submissions.filter(s => s.status === 'Pending').map((sub) => (
                                                <TableRow key={sub.id}>
                                                    <TableCell className="font-medium">{sub.student_name}</TableCell>
                                                    <TableCell>{new Date(sub.submitted_at).toLocaleTimeString()}</TableCell>
                                                    <TableCell>
                                                        <Button variant="outline" size="sm" className="gap-2 h-8 text-xs" asChild>
                                                            <a href={sub.file_url} target="_blank" rel="noreferrer">
                                                                <FileText className="w-3 h-3" /> View PDF
                                                            </a>
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            className="w-20 h-8"
                                                            placeholder="0"
                                                            type="number"
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                sub.score = val;
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button size="sm" variant="outline"
                                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() => handleEvaluate(sub.id, 'Rejected', sub.score)}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm"
                                                                className="h-8 w-8 p-0 text-green-500 border-green-200 hover:border-green-500 bg-green-50 hover:bg-green-100 dark:bg-green-900/20"
                                                                onClick={() => handleEvaluate(sub.id, 'Approved', sub.score)}
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="graded" className="mt-4">
                            <div className="rounded-xl border bg-slate-50/50 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead className="text-right">Evaluated</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {submissions.filter(s => s.status !== 'Pending').map((sub) => (
                                            <TableRow key={sub.id}>
                                                <TableCell className="font-medium">{sub.student_name}</TableCell>
                                                <TableCell>
                                                    <Badge variant={sub.status === 'Approved' ? 'secondary' : 'destructive'}>
                                                        {sub.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-bold">{sub.score}</TableCell>
                                                <TableCell className="text-right text-muted-foreground text-xs">
                                                    Just now
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSheetOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
