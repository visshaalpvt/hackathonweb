import { Card, CardContent, CardTitle } from '../components/ui/card';

export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <Card className="border-dashed border-2 min-h-[400px] flex items-center justify-center bg-slate-50/50">
                <CardContent className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🚧</span>
                    </div>
                    <CardTitle className="text-lg">Under Construction</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                        The {title} interface is currently being built. Check back soon for updates!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
