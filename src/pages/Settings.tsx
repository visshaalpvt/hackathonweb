import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User, Save } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h2>
                <p className="text-slate-500">Manage your account and preferences.</p>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-4">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-500">
                                    <User className="w-8 h-8" />
                                </div>
                                <Button variant="outline">Change Avatar</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input defaultValue="Admin User" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input defaultValue="admin@college.edu" disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>Department</Label>
                                    <Select defaultValue="CSE">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CSE">CSE</SelectItem>
                                            <SelectItem value="IT">IT</SelectItem>
                                            <SelectItem value="ECE">ECE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Input defaultValue="Administrator" disabled />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Choose what you want to be notified about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { title: "New Daily Problems", desc: "Get notified when a new problem is posted." },
                                { title: "Event Reminders", desc: "Receive reminders for upcoming events." },
                                { title: "Project Approvals", desc: "Notify when a project needs review." },
                                { title: "Mentioned in Announcements", desc: "When someone tags you in a post." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">{item.title}</Label>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the interface look and feel.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Theme</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="border-2 border-primary rounded-xl p-2 bg-white cursor-pointer text-center">
                                        <div className="h-20 bg-slate-100 rounded-lg mb-2"></div>
                                        <span className="text-xs font-semibold">Light</span>
                                    </div>
                                    <div className="border rounded-xl p-2 bg-slate-950 text-white cursor-pointer text-center opacity-60 hover:opacity-100">
                                        <div className="h-20 bg-slate-800 rounded-lg mb-2"></div>
                                        <span className="text-xs font-semibold">Dark</span>
                                    </div>
                                    <div className="border rounded-xl p-2 bg-slate-100 cursor-pointer text-center opacity-60 hover:opacity-100">
                                        <div className="h-20 bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg mb-2"></div>
                                        <span className="text-xs font-semibold">System</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your password and security settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Current Password</Label>
                                <Input type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <Input type="password" />
                            </div>
                            <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50">Log out of all devices</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
