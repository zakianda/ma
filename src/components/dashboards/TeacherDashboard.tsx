"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen,
  Users,
  Calendar,
  Bell,
  FileText,
  Settings,
  BarChart3,
  School,
  Award,
  CheckSquare,
  GraduationCap,
  ClipboardList,
  Clock,
  Upload,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileDown,
  FolderOpen,
  BookOpenCheck,
  PenTool,
  FileQuestion,
  CalendarDays,
  UserCheck,
  MessageSquare,
  Send,
  Filter
} from "lucide-react";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { Sidebar } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { ChartCard } from "@/components/shared/Charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";

interface TeacherDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

type TabType = 'overview' | 'classes' | 'subjects' | 'attendance' | 'grades' | 'assignments' | 'lessons' | 'questionbank' | 'planning';

export function TeacherDashboard({ user }: TeacherDashboardProps) {
  const { formatDate } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const [stats, setStats] = useState({
    totalClasses: 12,
    totalStudents: 180,
    todayClasses: 4,
    pendingGrades: 15,
    totalSubjects: 3,
    completedLessons: 45,
    questionBank: 120,
    avgClassPerformance: 82
  });

  const [myClasses, setMyClasses] = useState([
    { id: "1", name: "السنة الأولى أ", students: 28, subject: "الرياضيات", avgGrade: 82, attendance: 94, nextClass: "08:00" },
    { id: "2", name: "السنة الأولى ب", students: 25, subject: "الرياضيات", avgGrade: 78, attendance: 92, nextClass: "10:00" },
    { id: "3", name: "السنة الثانية أ", students: 30, subject: "العلوم", avgGrade: 85, attendance: 96, nextClass: "14:00" },
    { id: "4", name: "السنة الثانية ب", students: 27, subject: "العلوم", avgGrade: 80, attendance: 90, nextClass: "غداً" }
  ]);

  const [todaySchedule, setTodaySchedule] = useState([
    { id: "1", startTime: "08:00", endTime: "08:45", className: "السنة الأولى أ", subject: "الرياضيات", room: "قاعة 1", status: "completed", topic: "الكسور العشرية" },
    { id: "2", startTime: "09:00", endTime: "09:45", className: "الثاني أ", subject: "الرياضيات", room: "قاعة 2", status: "current", topic: "المعادلات" },
    { id: "3", startTime: "10:00", endTime: "10:45", className: "الأول ب", subject: "العلوم", room: "مختبر", status: "upcoming", topic: "التجارب الكيميائية" },
    { id: "4", startTime: "11:00", endTime: "11:45", className: "الثالث أ", subject: "العلوم", room: "قاعة 3", status: "upcoming", topic: "الأجهزة الدورية" },
    { id: "5", startTime: "14:00", endTime: "14:45", className: "الثاني ب", subject: "الرياضيات", room: "قاعة 4", status: "upcoming", topic: "الهندسة" }
  ]);

  const [students, setStudents] = useState([
    { id: "1", name: "أحمد محمد", class: "الأول أ", grades: { midterm: 18, final: 16 }, attendance: 95 },
    { id: "2", name: "فاطمة علي", class: "الأول أ", grades: { midterm: 16, final: 17 }, attendance: 98 },
    { id: "3", name: "محمد سعيد", class: "الأول ب", grades: { midterm: 14, final: 15 }, attendance: 92 },
    { id: "4", name: "سارة أحمد", class: "الثاني أ", grades: { midterm: 19, final: 18 }, attendance: 100 },
    { id: "5", name: "عبدالله خالد", class: "الثاني ب", grades: { midterm: 12, final: 14 }, attendance: 88 }
  ]);

  const [assignments, setAssignments] = useState([
    { id: "1", title: "واجب الكسور العشرية", class: "الأول أ", dueDate: "2025-02-15", submitted: 22, total: 28, status: "active" },
    { id: "2", title: "اختبار المعادلات", class: "الثاني أ", dueDate: "2025-02-12", submitted: 30, total: 30, status: "completed" },
    { id: "3", title: "بحث علمي", class: "الثالث أ", dueDate: "2025-02-20", submitted: 5, total: 35, status: "active" }
  ]);

  const [lessons, setLessons] = useState([
    { id: "1", title: "الكسور العشرية - الجزء الأول", subject: "الرياضيات", class: "الأول أ", date: "2025-02-10", downloads: 45, type: "pdf" },
    { id: "2", title: "المعادلات الخطية", subject: "الرياضيات", class: "الثاني أ", date: "2025-02-08", downloads: 38, type: "video" },
    { id: "3", title: "التجارب الكيميائية", subject: "العلوم", class: "الأول ب", date: "2025-02-05", downloads: 52, type: "pdf" }
  ]);

  const [questions, setQuestions] = useState([
    { id: "1", text: "ما هو ناتج 5/2 + 3/4؟", subject: "الرياضيات", difficulty: "سهل", used: 15 },
    { id: "2", text: "أوجد حل المعادلة: 2x + 5 = 13", subject: "الرياضيات", difficulty: "متوسط", used: 8 },
    { id: "3", text: "ما هي خصائص العناصر الانتقالية؟", subject: "العلوم", difficulty: "صعب", used: 5 }
  ]);

  const classPerformanceData = [
    { name: "الأول أ", value: 82 },
    { name: "الأول ب", value: 78 },
    { name: "الثاني أ", value: 85 },
    { name: "الثاني ب", value: 80 }
  ];

  const attendanceData = [
    { name: "الأحد", value: 95 },
    { name: "الإثنين", value: 92 },
    { name: "الثلاثاء", value: 88 },
    { name: "الأربعاء", value: 94 },
    { name: "الخميس", value: 91 }
  ];

  const gradesDistribution = [
    { name: "ممتاز", value: 25 },
    { name: "جيد جداً", value: 35 },
    { name: "جيد", value: 28 },
    { name: "مقبول", value: 10 },
    { name: "ضعيف", value: 2 }
  ];

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: "نظرة عامة", onClick: () => setActiveTab('overview'), active: activeTab === 'overview' },
    { id: 'classes', icon: School, label: "أقسامي", onClick: () => setActiveTab('classes'), active: activeTab === 'classes' },
    { id: 'subjects', icon: BookOpen, label: "موادي الدراسية", onClick: () => setActiveTab('subjects'), active: activeTab === 'subjects' },
    { id: 'attendance', icon: ClipboardList, label: "الحضور", onClick: () => setActiveTab('attendance'), active: activeTab === 'attendance' },
    { id: 'grades', icon: Award, label: "الدرجات", onClick: () => setActiveTab('grades'), active: activeTab === 'grades' },
    { id: 'assignments', icon: FileText, label: "الواجبات", onClick: () => setActiveTab('assignments'), active: activeTab === 'assignments' },
    { id: 'lessons', icon: BookOpenCheck, label: "الدروس", onClick: () => setActiveTab('lessons'), active: activeTab === 'lessons' },
    { id: 'questionbank', icon: FileQuestion, label: "بنك الأسئلة", onClick: () => setActiveTab('questionbank'), active: activeTab === 'questionbank' },
    { id: 'planning', icon: CalendarDays, label: "تخطيط الدروس", onClick: () => setActiveTab('planning'), active: activeTab === 'planning' },
    { id: 'settings', icon: Settings, label: "الإعدادات", onClick: () => setActiveTab('settings' as TabType), active: activeTab === 'settings' }
  ];

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      title="لوحة الأستاذ"
      icon={GraduationCap}
      gradient="from-green-500 to-emerald-600"
      user={user}
      activeTab={activeTab}
    />
  );

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-l from-green-600/30 to-emerald-600/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <GraduationCap className="w-10 h-10 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">مرحباً، {user.name}!</h2>
                  <p className="text-green-300">نتمنى لك يوماً دراسياً موفقاً</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
                  <Upload className="w-4 h-4" />
                  رفع درس
                </Button>
                <Button variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/10">
                  <FileText className="w-4 h-4 mr-2" />
                  إنشاء واجب
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="أقسامي" value={stats.totalClasses} icon={School} gradient="from-green-500 to-emerald-600" />
        <StatCard title="إجمالي التلاميذ" value={stats.totalStudents} icon={Users} gradient="from-blue-500 to-cyan-600" trend={{ value: 3, isPositive: true }} />
        <StatCard title="حصص اليوم" value={stats.todayClasses} icon={Clock} gradient="from-orange-500 to-amber-600" />
        <StatCard title="درجات معلقة" value={stats.pendingGrades} icon={Award} gradient="from-rose-500 to-pink-600" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.avgClassPerformance}%</p>
            <p className="text-slate-400 text-sm">معدل الأداء</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <BookOpenCheck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.completedLessons}</p>
            <p className="text-slate-400 text-sm">دروس مكتملة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <FileQuestion className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.questionBank}</p>
            <p className="text-slate-400 text-sm">بنك الأسئلة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.totalSubjects}</p>
            <p className="text-slate-400 text-sm">المواد الدراسية</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="أداء الأقسام" type="bar" data={classPerformanceData} dataKey="value" nameKey="name" />
        <ChartCard title="نسبة الحضور الأسبوعي" type="line" data={attendanceData} dataKey="value" nameKey="name" />
        <ChartCard title="توزيع الدرجات" type="pie" data={gradesDistribution} dataKey="value" nameKey="name" />
      </div>

      {/* Today's Schedule & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                جدول اليوم
              </CardTitle>
              <CardDescription className="text-slate-400">الحصص الدراسية لليوم</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
              عرض الجدول الكامل
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-3">
                {todaySchedule.map((schedule, index) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                      schedule.status === 'current' ? 'bg-green-500/20 border border-green-500/50' : 
                      schedule.status === 'completed' ? 'bg-slate-700/30 opacity-60' : 'bg-slate-700/50 hover:bg-slate-700/70'
                    }`}
                  >
                    <div className="text-center min-w-16">
                      <p className="text-white font-bold">{schedule.startTime}</p>
                      <p className="text-slate-400 text-xs">إلى {schedule.endTime}</p>
                    </div>
                    <div className={`h-12 w-1 rounded-full ${
                      schedule.status === 'current' ? 'bg-green-500' : 
                      schedule.status === 'completed' ? 'bg-slate-600' : 'bg-amber-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-medium">{schedule.subject}</p>
                        {schedule.status === 'current' && (
                          <Badge className="bg-green-500 text-xs">جارية</Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{schedule.className} • {schedule.room}</p>
                      <p className="text-slate-500 text-xs">{schedule.topic}</p>
                    </div>
                    {schedule.status !== 'completed' && (
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PenTool className="w-5 h-5 text-amber-400" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12">
                <ClipboardList className="w-5 h-5" />
                تسجيل الحضور
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12">
                <Award className="w-5 h-5" />
                إدخال الدرجات
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12">
                <FileText className="w-5 h-5" />
                إنشاء واجب
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12">
                <Upload className="w-5 h-5" />
                رفع مورد
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12">
                <FileQuestion className="w-5 h-5" />
                إضافة سؤال
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12">
                <MessageSquare className="w-5 h-5" />
                رسالة لولي الأمر
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Classes Tab
  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">أقسامي الدراسية</h2>
          <p className="text-slate-400">جميع الأقسام التي تدرّسها</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myClasses.map((cls, i) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <School className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{cls.name}</h3>
                      <p className="text-slate-500 text-sm">{cls.subject}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">{cls.nextClass}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-white font-bold">{cls.students}</p>
                    <p className="text-slate-500 text-xs">تلميذ</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <Award className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-white font-bold">{cls.avgGrade}%</p>
                    <p className="text-slate-500 text-xs">المعدل</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <UserCheck className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <p className="text-white font-bold">{cls.attendance}%</p>
                    <p className="text-slate-500 text-xs">الحضور</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <ClipboardList className="w-4 h-4 mr-1" />
                    الحضور
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <Award className="w-4 h-4 mr-1" />
                    الدرجات
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <Eye className="w-4 h-4 mr-1" />
                    التفاصيل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Attendance Tab
  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">تسجيل الحضور</h2>
          <p className="text-slate-400">تسجيل حضور التلاميذ اليومي</p>
        </div>
        <div className="flex items-center gap-3">
          <Input type="date" className="bg-slate-700/50 border-slate-600 text-white" defaultValue={new Date().toISOString().split('T')[0]} />
          <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            {myClasses.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-l from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">165</p>
            <p className="text-green-300 text-sm">حاضر</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-red-600/20 to-rose-600/20 border-red-500/30">
          <CardContent className="p-6 text-center">
            <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-red-300 text-sm">غائب</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-amber-600/20 to-orange-600/20 border-amber-500/30">
          <CardContent className="p-6 text-center">
            <Clock className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-amber-300 text-sm">متأخر</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">92%</p>
            <p className="text-blue-300 text-sm">نسبة الحضور</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">قائمة التلاميذ</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {students.map((student, i) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-500 text-white text-xs">{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{student.name}</p>
                      <p className="text-slate-500 text-xs">{student.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-green-500 text-green-400 hover:bg-green-500/20">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-red-500 text-red-400 hover:bg-red-500/20">
                      <XCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-amber-500 text-amber-400 hover:bg-amber-500/20">
                      <Clock className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );

  // Render Grades Tab
  const renderGrades = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">إدارة الدرجات</h2>
          <p className="text-slate-400">إدخال وتعديل درجات التلاميذ</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            {myClasses.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
          <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>امتحان نصف الفصل</option>
            <option>امتحان نهاية الفصل</option>
            <option>اختبار قصير</option>
          </select>
        </div>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400 text-right">التلميذ</TableHead>
                <TableHead className="text-slate-400 text-right">القسم</TableHead>
                <TableHead className="text-slate-400 text-right">درجة نصف الفصل</TableHead>
                <TableHead className="text-slate-400 text-right">درجة نهاية الفصل</TableHead>
                <TableHead className="text-slate-400 text-right">المعدل</TableHead>
                <TableHead className="text-slate-400 text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-500 text-white text-xs">{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{student.class}</TableCell>
                  <TableCell>
                    <Input type="number" className="w-20 bg-slate-700/50 border-slate-600 text-white text-center" defaultValue={student.grades.midterm} min="0" max="20" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" className="w-20 bg-slate-700/50 border-slate-600 text-white text-center" defaultValue={student.grades.final} min="0" max="20" />
                  </TableCell>
                  <TableCell>
                    <Badge className={((student.grades.midterm + student.grades.final) / 2) >= 10 ? 'bg-green-500' : 'bg-red-500'}>
                      {((student.grades.midterm + student.grades.final) / 2).toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      حفظ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Render Assignments Tab
  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الواجبات والاختبارات</h2>
          <p className="text-slate-400">إنشاء وإدارة الواجبات</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
          <Plus className="w-4 h-4" />
          إنشاء واجب
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <FileText className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{assignments.length}</p>
            <p className="text-slate-400 text-sm">إجمالي الواجبات</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Clock className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{assignments.filter(a => a.status === 'active').length}</p>
            <p className="text-slate-400 text-sm">نشط</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{assignments.filter(a => a.status === 'completed').length}</p>
            <p className="text-slate-400 text-sm">مكتمل</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment, i) => (
          <Card key={assignment.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-bold">{assignment.title}</h3>
                    <Badge className={assignment.status === 'active' ? 'bg-amber-500' : 'bg-green-500'}>
                      {assignment.status === 'active' ? 'نشط' : 'مكتمل'}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm">{assignment.class} • موعد التسليم: {assignment.dueDate}</p>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">{assignment.submitted}/{assignment.total}</p>
                  <p className="text-slate-500 text-xs">تم التسليم</p>
                  <Progress value={(assignment.submitted / assignment.total) * 100} className="w-24 h-2 mt-2" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                  <Eye className="w-4 h-4 mr-1" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                  <Edit className="w-4 h-4 mr-1" />
                  تعديل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Render Lessons Tab
  const renderLessons = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الدروس والموارد</h2>
          <p className="text-slate-400">رفع وإدارة الدروس والموارد التعليمية</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
          <Upload className="w-4 h-4" />
          رفع درس جديد
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="بحث..." className="pr-9 bg-slate-700/50 border-slate-600" />
        </div>
        <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
          <option>جميع المواد</option>
          <option>الرياضيات</option>
          <option>العلوم</option>
        </select>
        <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
          <option>جميع الأقسام</option>
          {myClasses.map(c => <option key={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, i) => (
          <Card key={lesson.id} className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  lesson.type === 'pdf' ? 'bg-red-500/20' : 'bg-purple-500/20'
                }`}>
                  {lesson.type === 'pdf' ? <FileDown className="w-6 h-6 text-red-400" /> : <BookOpenCheck className="w-6 h-6 text-purple-400" />}
                </div>
                <Badge variant="outline" className="border-slate-600 text-slate-400">{lesson.type.toUpperCase()}</Badge>
              </div>
              <h3 className="text-white font-bold mb-2">{lesson.title}</h3>
              <p className="text-slate-500 text-sm mb-3">{lesson.subject} • {lesson.class}</p>
              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span>{lesson.date}</span>
                <span className="flex items-center gap-1"><Download className="w-4 h-4" /> {lesson.downloads}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                  <Eye className="w-4 h-4 mr-1" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Render Question Bank Tab
  const renderQuestionBank = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">بنك الأسئلة</h2>
          <p className="text-slate-400">مكتبة الأسئلة للاختبارات والواجبات</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
          <Plus className="w-4 h-4" />
          إضافة سؤال
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <FileQuestion className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.questionBank}</p>
            <p className="text-slate-400 text-sm">إجمالي الأسئلة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.totalSubjects}</p>
            <p className="text-slate-400 text-sm">مواد</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Target className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-slate-400 text-sm">مستويات صعوبة</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">الأسئلة</CardTitle>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm">
                <option>جميع المواد</option>
                <option>الرياضيات</option>
                <option>العلوم</option>
              </select>
              <select className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm">
                <option>جميع المستويات</option>
                <option>سهل</option>
                <option>متوسط</option>
                <option>صعب</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={q.id} className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-medium mb-2">{q.text}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-slate-600 text-slate-400">{q.subject}</Badge>
                      <Badge className={q.difficulty === 'سهل' ? 'bg-green-500' : q.difficulty === 'متوسط' ? 'bg-amber-500' : 'bg-red-500'}>
                        {q.difficulty}
                      </Badge>
                      <span className="text-slate-500 text-xs">استخدم {q.used} مرة</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Planning Tab
  const renderPlanning = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">تخطيط الدروس</h2>
          <p className="text-slate-400">إعداد وتنظيم خطط الدروس</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
          <Plus className="w-4 h-4" />
          خطة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClasses.map((cls, i) => (
          <Card key={cls.id} className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{cls.name}</h3>
                  <p className="text-slate-500 text-sm">{cls.subject}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">تقدم الخطة</span>
                  <span className="text-white font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                  <Eye className="w-4 h-4 mr-1" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                  <Edit className="w-4 h-4 mr-1" />
                  تعديل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout user={user} title="لوحة تحكم الأستاذ" sidebar={sidebar}>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="w-full">
        <TabsContent value="overview" className="mt-0">{renderOverview()}</TabsContent>
        <TabsContent value="classes" className="mt-0">{renderClasses()}</TabsContent>
        <TabsContent value="subjects" className="mt-0">{renderOverview()}</TabsContent>
        <TabsContent value="attendance" className="mt-0">{renderAttendance()}</TabsContent>
        <TabsContent value="grades" className="mt-0">{renderGrades()}</TabsContent>
        <TabsContent value="assignments" className="mt-0">{renderAssignments()}</TabsContent>
        <TabsContent value="lessons" className="mt-0">{renderLessons()}</TabsContent>
        <TabsContent value="questionbank" className="mt-0">{renderQuestionBank()}</TabsContent>
        <TabsContent value="planning" className="mt-0">{renderPlanning()}</TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
