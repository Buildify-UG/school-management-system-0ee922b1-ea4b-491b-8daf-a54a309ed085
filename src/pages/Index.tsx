import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Award,
  Clock,
} from "lucide-react";

// Sample data
const students = [
  { id: 1, name: "Amina Nakato", class: "P.5", status: "Active" },
  { id: 2, name: "David Ssemanda", class: "P.6", status: "Active" },
  { id: 3, name: "Grace Mwase", class: "P.4", status: "Active" },
];

const classes = [
  { id: 1, name: "Primary 1", teacher: "Mrs. Nakabugo", students: 35 },
  { id: 2, name: "Primary 2", teacher: "Mr. Kyeyune", students: 38 },
  { id: 3, name: "Primary 3", teacher: "Miss Nambi", students: 36 },
  { id: 4, name: "Primary 4", teacher: "Mr. Okiror", students: 40 },
  { id: 5, name: "Primary 5", teacher: "Mrs. Nankunda", students: 37 },
  { id: 6, name: "Primary 6", teacher: "Mr. Kasozi", students: 39 },
];

const events = [
  { id: 1, title: "Term 1 Exams", date: "2024-03-15", type: "Exam" },
  { id: 2, title: "Sports Day", date: "2024-03-22", type: "Event" },
  { id: 3, title: "Parent Meeting", date: "2024-03-29", type: "Meeting" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Kabojja Parents' Primary School
              </h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-3xl font-bold text-foreground mt-2">225</p>
                  </div>
                  <Users className="w-8 h-8 text-primary opacity-20" />
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Classes</p>
                    <p className="text-3xl font-bold text-foreground mt-2">6</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-primary opacity-20" />
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <p className="text-3xl font-bold text-foreground mt-2">94%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary opacity-20" />
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Performance</p>
                    <p className="text-3xl font-bold text-foreground mt-2">78%</p>
                  </div>
                  <Award className="w-8 h-8 text-primary opacity-20" />
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-4">Recent Students</h3>
                <div className="space-y-3">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background"
                    >
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.class}</p>
                      </div>
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        {student.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background"
                    >
                      <Calendar className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">
                          {event.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                        {event.type}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="mt-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground text-lg">
                  Student Directory
                </h3>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Student
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Class
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...students, ...students].map((student, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border hover:bg-background transition"
                      >
                        <td className="py-3 px-4 text-sm text-foreground">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {student.class}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <Card key={cls.id} className="p-6 bg-card border-border hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">
                        {cls.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cls.teacher}
                      </p>
                    </div>
                    <Users className="w-5 h-5 text-primary opacity-20" />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">Students</span>
                    <span className="text-lg font-semibold text-foreground">
                      {cls.students}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="mt-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground text-lg mb-6">
                School Calendar
              </h3>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border"
                  >
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded">
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
