"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap,
  Calendar,
  Bell,
  Award,
  ClipboardList,
  BookOpen,
  BarChart3,
  Clock,
  CheckSquare,
  TrendingUp,
  Settings,
  FileText,
  School,
  Target,
  Users,
  Download,
  Eye,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trophy,
  Star,
  Medal,
  Flame,
  Zap,
  BookMarked,
  PenTool,
  MessageSquare,
  Upload,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  Clock as ClockIcon
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

interface StudentDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    student?: {
      admissionNo: string;
      class: { name: string } | null;
    };
  };
}

type TabType = 'overview' | 'grades' | 'schedule' | 'subjects' | 'attendance' | 'homework' | 'exams' | 'achievements' | 'library' | 'settings';

export function StudentDashboard({ user }: StudentDashboardProps) {
  const { formatDate } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const [stats, setStats] = useState({
    averageGrade: 85,
    attendanceRate: 94,
    totalSubjects: 12,
    rank: 5,
    completedHomework: 28,
    pendingHomework: 4,
    achievements: 15,
    studyHours: 45,
    points: 1250,
    level: 8
  });

  const gradesData = [
    { name: "الرياضيات", value: 85, trend: "up" },
    { name: "اللغة العربية", value: 92, trend: "up" },
    { name: "اللغة الفرنسية", value: 78, trend: "down" },
    { name: "العلوم", value: 88, trend: "up" },
    { name: "الاجتماعيات", value: 95, trend: "up" },
    { name: "التربية الإسلامية", value: 90, trend: "stable" },
    { name: "التربية البدنية", value: 95, trend: "up" },
    { name: "الفنون", value: 88, trend: "stable" }
  ];

  const todaySchedule = [
    { id: "1", startTime: "08:00", endTime: "08:45", subject: "الرياضيات", room: "قاعة 1", teacher: "أ. خالد العمري", status: "completed" },
    { id: "2", startTime: "09:00", endTime: "09:45", subject: "اللغة العربية", room: "قاعة 2", teacher: "أ. فاطمة الزهراء", status: "current" },
    { id: "3", startTime: "10:00", endTime: "10:45", subject: "العلوم", room: "مخبر 1", teacher: "أ. محمد السعيد", status: "upcoming" },
    { id: "4", startTime: "11:00", endTime: "11:45", subject: "اللغة الفرنسية", room: "قاعة 1", teacher: "M. Jean Pierre", status: "upcoming" },
    { id: "5", startTime: "14:00", endTime: "14:45", subject: "الاجتماعيات", room: "قاعة 3", teacher: "أ. نورا أحمد", status: "upcoming" }
  ];

  const homework = [
    { id: "1", subject: "الرياضيات", title: "حل المعادلات التربيعية", dueDate: "2025-02-15", status: "pending", priority: "high" },
    { id: "2", subject: "العلوم", title: "بحث عن الكواكب السيارة", dueDate: "2025-02-12", status: "submitted", priority: "medium" },
    { id: "3", subject: "اللغة العربية", title: "تحليل نص أدبي", dueDate: "2025-02-14", status: "pending", priority: "high" },
    { id: "4", subject: "اللغة الفرنسية", title: "Rédaction sur les vacances", dueDate: "2025-02-16", status: "pending", priority: "low" },
    { id: "5", subject: "الاجتماعيات", title: "خريطة الدول العربية", dueDate: "2025-02-11", status: "submitted", priority: "medium" }
  ];

  const exams = [
    { id: "1", subject: "الرياضيات", title: "امتحان نصف الفصل", date: "2025-02-20", time: "08:00", duration: "2 ساعات", type: "exam" },
    { id: "2", subject: "اللغة العربية", title: "اختبار قصير", date: "2025-02-18", time: "10:00", duration: "45 دقيقة", type: "quiz" },
    { id: "3", subject: "العلوم", title: "امتحان عملي", date: "2025-02-22", time: "14:00", duration: "1.5 ساعة", type: "practical" },
    { id: "4", subject: "اللغة الفرنسية", title: "امتحان نصف الفصل", date: "2025-02-25", time: "08:00", duration: "2 ساعات", type: "exam" }
  ];

  const achievements = [
    { id: "1", title: "المتفوق الأول", desc: "الترتيب الأول في القسم", icon: Trophy, color: "from-yellow-500 to-amber-600", date: "2025-01-15", points: 200 },
    { id: "2", title: "متميز في الرياضيات", desc: "الحصول على معدل 90%+", icon: Medal, color: "from-blue-500 to-cyan-600", date: "2025-02-01", points: 150 },
    { id: "3", title: "حضور مثالي", desc: "حضور كامل لمدة شهر", icon: CheckCircle, color: "from-green-500 to-emerald-600", date: "2025-01-30", points: 100 },
    { id: "4", title: "باحث متميز", desc: "تسليم 10 بحوث مميزة", icon: BookMarked, color: "from-purple-500 to-pink-600", date: "2025-02-05", points: 180 },
    { id: "5", title: "السرعة في الإنجاز", desc: "إنهاء جميع الواجبات في الوقت", icon: Zap, color: "from-orange-500 to-red-600", date: "2025-02-08", points: 120 },
    { id: "6", title: "سلسلة النشاط", desc: "نشاط متواصل لمدة أسبوعين", icon: Flame, color: "from-rose-500 to-pink-600", date: "2025-02-10", points: 80 }
  ];

  const attendanceRecords = [
    { date: "2025-02-10", status: "present", subject: "الرياضيات" },
    { date: "2025-02-10", status: "present", subject: "اللغة العربية" },
    { date: "2025-02-09", status: "absent", subject: "العلوم" },
    { date: "2025-02-09", status: "present", subject: "اللغة الفرنسية" },
    { date: "2025-02-08", status: "late", subject: "الاجتماعيات" },
    { date: "2025-02-08", status: "present", subject: "التربية الإسلامية" }
  ];

  const subjects = [
    { id: "1", name: "الرياضيات", teacher: "أ. خالد العمري", grade: 85, attendance: 96, nextClass: "غداً 08:00", room: "قاعة 1" },
    { id: "2", name: "اللغة العربية", teacher: "أ. فاطمة الزهراء", grade: 92, attendance: 98, nextClass: "غداً 09:00", room: "قاعة 2" },
    { id: "3", name: "اللغة الفرنسية", teacher: "M. Jean Pierre", grade: 78, attendance: 90, nextClass: "غداً 11:00", room: "قاعة 1" },
    { id: "4", name: "العلوم", teacher: "أ. محمد السعيد", grade: 88, attendance: 94, nextClass: "غداً 10:00", room: "مخبر 1" },
    { id: "5", name: "الاجتماعيات", teacher: "أ. نورا أحمد", grade: 95, attendance: 100, nextClass: "غداً 14:00", room: "قاعة 3" }
  ];

  const libraryBooks = [
    { id: "1", title: "الجبر الخطي", subject: "الرياضيات", available: true },
    { id: "2", title: "قواعد اللغة العربية", subject: "اللغة العربية", available: false },
    { id: "3", title: "عالم الفيزياء", subject: "العلوم", available: true },
    { id: "4", title: "تاريخ الحضارات", subject: "الاجتماعيات", available: true }
  ];

  const gradeTrendData = [
    { name: "سبتمبر", value: 78 },
    { name: "أكتوبر", value: 80 },
    { name: "نوفمبر", value: 82 },
    { name: "ديسمبر", value: 85 },
    { name: "يناير", value: 84 },
    { name: "فبراير", value: 88 }
  ];

  const attendanceChartData = [
    { name: "حاضر", value: 45 },
    { name: "غائب", value: 3 },
    { name: "متأخر", value: 2 }
  ];

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: "لوحة التحكم", onClick: () => setActiveTab('overview'), active: activeTab === 'overview' },
    { id: 'grades', icon: Award, label: "درجاتي", onClick: () => setActiveTab('grades'), active: activeTab === 'grades' },
    { id: 'schedule', icon: Calendar, label: "جدولي", onClick: () => setActiveTab('schedule'), active: activeTab === 'schedule' },
    { id: 'subjects', icon: BookOpen, label: "موادي", onClick: () => setActiveTab('subjects'), active: activeTab === 'subjects' },
    { id: 'attendance', icon: ClipboardList, label: "حضوري", onClick: () => setActiveTab('attendance'), active: activeTab === 'attendance' },
    { id: 'homework', icon: FileText, label: "الواجبات", onClick: () => setActiveTab('homework'), active: activeTab === 'homework', badge: stats.pendingHomework },
    { id: 'exams', icon: Target, label: "الاختبارات", onClick: () => setActiveTab('exams'), active: activeTab === 'exams' },
    { id: 'achievements', icon: Trophy, label: "إنجازاتي", onClick: () => setActiveTab('achievements'), active: activeTab === 'achievements' },
    { id: 'library', icon: BookMarked, label: "المكتبة", onClick: () => setActiveTab('library'), active: activeTab === 'library' },
    { id: 'settings', icon: Settings, label: "الإعدادات", onClick: () => setActiveTab('settings'), active: activeTab === 'settings' }
  ];

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      title="لوحة التلميذ"
      icon={GraduationCap}
      gradient="from-rose-500 to-pink-600"
      user={user}
      activeTab={activeTab}
    />
  );

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-l from-rose-600/30 to-pink-600/30 border-rose-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-500/20 rounded-xl">
                  <GraduationCap className="w-10 h-10 text-rose-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">مرحباً، {user.name}!</h2>
                  <p className="text-rose-300">
                    {user.student?.class?.name || "غير محدد"} - رقم التسجيل: {user.student?.admissionNo || "غير محدد"}
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">{stats.points} نقطة</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">المستوى {stats.level}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="متوسط الدرجات"
          value={`${stats.averageGrade}%`}
          icon={TrendingUp}
          gradient="from-green-500 to-emerald-600"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="نسبة الحضور"
          value={`${stats.attendanceRate}%`}
          icon={ClipboardList}
          gradient="from-blue-500 to-cyan-600"
        />
        <StatCard
          title="المواد الدراسية"
          value={stats.totalSubjects}
          icon={BookOpen}
          gradient="from-orange-500 to-amber-600"
        />
        <StatCard
          title="الترتيب في القسم"
          value={`#${stats.rank}`}
          icon={Award}
          gradient="from-rose-500 to-pink-600"
          trend={{ value: 1, isPositive: true }}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <CheckSquare className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.completedHomework}</p>
            <p className="text-slate-400 text-sm">واجب مكتمل</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.pendingHomework}</p>
            <p className="text-slate-400 text-sm">واجب معلق</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.achievements}</p>
            <p className="text-slate-400 text-sm">إنجاز</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <ClockIcon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.studyHours}س</p>
            <p className="text-slate-400 text-sm">ساعات الدراسة</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="تطور الدرجات" type="line" data={gradeTrendData} dataKey="value" nameKey="name" />
        <ChartCard title="توزيع الحضور" type="pie" data={attendanceChartData} dataKey="value" nameKey="name" />
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">آخر الإنجازات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${achievement.color}`}>
                    <achievement.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{achievement.title}</p>
                    <p className="text-slate-500 text-xs">+{achievement.points} نقطة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-400" />
                جدول اليوم
              </CardTitle>
              <CardDescription className="text-slate-400">الحصص الدراسية لليوم</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700" onClick={() => setActiveTab('schedule')}>
              عرض الجدول الكامل
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-3">
                {todaySchedule.map((schedule, index) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                      schedule.status === 'current' ? 'bg-rose-500/20 border border-rose-500/50' : 
                      schedule.status === 'completed' ? 'bg-slate-700/30 opacity-60' : 'bg-slate-700/50 hover:bg-slate-700/70'
                    }`}
                  >
                    <div className="text-center min-w-16">
                      <p className="text-white font-bold">{schedule.startTime}</p>
                      <p className="text-slate-400 text-xs">إلى {schedule.endTime}</p>
                    </div>
                    <div className={`h-12 w-1 rounded-full ${
                      schedule.status === 'current' ? 'bg-rose-500' : 
                      schedule.status === 'completed' ? 'bg-slate-600' : 'bg-amber-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-medium">{schedule.subject}</p>
                        {schedule.status === 'current' && (
                          <Badge className="bg-rose-500 text-xs">جارية</Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{schedule.teacher} • {schedule.room}</p>
                    </div>
                    {schedule.status !== 'completed' && (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
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
              <Zap className="w-5 h-5 text-yellow-400" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('homework')}>
                <FileText className="w-5 h-5" />
                الواجبات المعلقة
                {stats.pendingHomework > 0 && (
                  <Badge className="bg-amber-500 mr-auto">{stats.pendingHomework}</Badge>
                )}
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('grades')}>
                <Award className="w-5 h-5" />
                عرض الدرجات
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('exams')}>
                <Target className="w-5 h-5" />
                جدول الاختبارات
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('achievements')}>
                <Trophy className="w-5 h-5" />
                إنجازاتي
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('library')}>
                <BookMarked className="w-5 h-5" />
                المكتبة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Grades Tab
  const renderGrades = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">درجاتي</h2>
          <p className="text-slate-400">تتبع أدائك الأكاديمي</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>الفصل الحالي</option>
            <option>الفصل السابق</option>
            <option>العام كاملاً</option>
          </select>
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-l from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.averageGrade}%</p>
            <p className="text-green-300 text-sm">المعدل العام</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <Award className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">#{stats.rank}</p>
            <p className="text-blue-300 text-sm">الترتيب في القسم</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-amber-600/20 to-orange-600/20 border-amber-500/30">
          <CardContent className="p-6 text-center">
            <ArrowUpRight className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">+3%</p>
            <p className="text-amber-300 text-sm">تحسن عن الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-rose-600/20 to-pink-600/20 border-rose-500/30">
          <CardContent className="p-6 text-center">
            <Star className="w-10 h-10 text-rose-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{gradesData.filter(g => g.value >= 90).length}</p>
            <p className="text-rose-300 text-sm">مواد ممتازة</p>
          </CardContent>
        </Card>
      </div>

      {/* Grade Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">تطور المعدل</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartCard title="" type="line" data={gradeTrendData} dataKey="value" nameKey="name" />
        </CardContent>
      </Card>

      {/* Subjects Grades */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">درجات المواد</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">المادة</TableHead>
                <TableHead className="text-slate-400 text-center">الدرجة</TableHead>
                <TableHead className="text-slate-400 text-center">الاتجاه</TableHead>
                <TableHead className="text-slate-400 text-center">الحالة</TableHead>
                <TableHead className="text-slate-400">التقدم</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradesData.map((subject, i) => (
                <TableRow key={i} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="text-white font-medium">{subject.name}</TableCell>
                  <TableCell className="text-center">
                    <span className={`text-lg font-bold ${
                      subject.value >= 90 ? 'text-green-400' :
                      subject.value >= 70 ? 'text-blue-400' :
                      subject.value >= 50 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {subject.value}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {subject.trend === 'up' ? <ArrowUpRight className="w-5 h-5 text-green-400 mx-auto" /> :
                     subject.trend === 'down' ? <ArrowDownRight className="w-5 h-5 text-red-400 mx-auto" /> :
                     <span className="text-slate-500">—</span>}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={
                      subject.value >= 90 ? 'bg-green-500' :
                      subject.value >= 70 ? 'bg-blue-500' :
                      subject.value >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    }>
                      {subject.value >= 90 ? 'ممتاز' :
                       subject.value >= 70 ? 'جيد جداً' :
                       subject.value >= 50 ? 'جيد' : 'ضعيف'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Progress value={subject.value} className="h-2" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Render Schedule Tab
  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">جدولي الدراسي</h2>
          <p className="text-slate-400">الحصص الدراسية الأسبوعية</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            تحميل PDF
          </Button>
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Calendar className="w-4 h-4 mr-2" />
            طباعة
          </Button>
        </div>
      </div>

      {/* Today Highlight */}
      <Card className="bg-gradient-to-l from-rose-600/20 to-pink-600/20 border-rose-500/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-500/20 rounded-xl">
              <Calendar className="w-8 h-8 text-rose-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">جدول اليوم - {new Date().toLocaleDateString('ar-SA')}</h3>
              <p className="text-rose-300">{todaySchedule.length} حصص دراسية</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">الجدول الأسبوعي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">الوقت</TableHead>
                  <TableHead className="text-slate-400 text-center">الأحد</TableHead>
                  <TableHead className="text-slate-400 text-center">الإثنين</TableHead>
                  <TableHead className="text-slate-400 text-center">الثلاثاء</TableHead>
                  <TableHead className="text-slate-400 text-center">الأربعاء</TableHead>
                  <TableHead className="text-slate-400 text-center">الخميس</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'].map((time, i) => (
                  <TableRow key={i} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell className="text-white font-bold">{time}</TableCell>
                    {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'].map((day, j) => (
                      <TableCell key={j} className="text-center">
                        {Math.random() > 0.3 ? (
                          <div className="p-2 bg-rose-500/20 rounded-lg">
                            <p className="text-rose-300 text-sm">{gradesData[Math.floor(Math.random() * gradesData.length)]?.name}</p>
                            <p className="text-slate-500 text-xs">قاعة {Math.floor(Math.random() * 5) + 1}</p>
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Subjects Tab
  const renderSubjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">موادي الدراسية</h2>
          <p className="text-slate-400">جميع المواد المسجلة</p>
        </div>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="بحث..." className="pr-9 bg-slate-700/50 border-slate-600 w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-rose-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{subject.name}</h3>
                      <p className="text-slate-500 text-sm">{subject.teacher}</p>
                    </div>
                  </div>
                  <Badge className={
                    subject.grade >= 90 ? 'bg-green-500' :
                    subject.grade >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                  }>
                    {subject.grade}%
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">الدرجة</span>
                    <span className="text-white">{subject.grade}%</span>
                  </div>
                  <Progress value={subject.grade} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">الحضور</span>
                    <span className="text-white">{subject.attendance}%</span>
                  </div>
                  <Progress value={subject.attendance} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                  <span>الحصة القادمة: {subject.nextClass}</span>
                  <span>{subject.room}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <BookMarked className="w-4 h-4 mr-1" />
                    الموارد
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                    <MessageSquare className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-white">سجل الحضور</h2>
          <p className="text-slate-400">متابعة حضورك اليومي</p>
        </div>
        <div className="flex items-center gap-3">
          <Input type="month" className="bg-slate-700/50 border-slate-600 text-white" />
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-l from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">45</p>
            <p className="text-green-300 text-sm">أيام حضور</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-red-600/20 to-rose-600/20 border-red-500/30">
          <CardContent className="p-6 text-center">
            <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-red-300 text-sm">أيام غياب</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-amber-600/20 to-orange-600/20 border-amber-500/30">
          <CardContent className="p-6 text-center">
            <Clock className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">2</p>
            <p className="text-amber-300 text-sm">أيام تأخر</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.attendanceRate}%</p>
            <p className="text-blue-300 text-sm">نسبة الحضور</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">توزيع الحضور</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartCard title="" type="pie" data={attendanceChartData} dataKey="value" nameKey="name" />
        </CardContent>
      </Card>

      {/* Recent Records */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">سجل الحضور الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {attendanceRecords.map((record, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  {record.status === 'present' ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                   record.status === 'absent' ? <XCircle className="w-5 h-5 text-red-400" /> :
                   <Clock className="w-5 h-5 text-amber-400" />}
                  <div>
                    <p className="text-white">{record.subject}</p>
                    <p className="text-slate-500 text-sm">{record.date}</p>
                  </div>
                </div>
                <Badge className={
                  record.status === 'present' ? 'bg-green-500' :
                  record.status === 'absent' ? 'bg-red-500' : 'bg-amber-500'
                }>
                  {record.status === 'present' ? 'حاضر' :
                   record.status === 'absent' ? 'غائب' : 'متأخر'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Homework Tab
  const renderHomework = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الواجبات المنزلية</h2>
          <p className="text-slate-400">إدارة وتتبع الواجبات</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>الكل</option>
            <option>المعلقة</option>
            <option>المكتملة</option>
          </select>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
            <Upload className="w-4 h-4" />
            تسليم واجب
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{homework.length}</p>
            <p className="text-slate-400 text-sm">إجمالي الواجبات</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.completedHomework}</p>
            <p className="text-slate-400 text-sm">مكتمل</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.pendingHomework}</p>
            <p className="text-slate-400 text-sm">معلق</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">87%</p>
            <p className="text-slate-400 text-sm">نسبة الإنجاز</p>
          </CardContent>
        </Card>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {homework.map((hw, index) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`bg-slate-800/50 border-slate-700 ${hw.status === 'pending' ? 'hover:border-amber-500/50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      hw.status === 'submitted' ? 'bg-green-500/20' : 
                      hw.priority === 'high' ? 'bg-red-500/20' :
                      hw.priority === 'medium' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                    }`}>
                      {hw.status === 'submitted' ? <CheckCircle className="w-6 h-6 text-green-400" /> :
                       <FileText className={`w-6 h-6 ${
                         hw.priority === 'high' ? 'text-red-400' :
                         hw.priority === 'medium' ? 'text-amber-400' : 'text-blue-400'
                       }`} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold">{hw.title}</h3>
                        <Badge className={
                          hw.status === 'submitted' ? 'bg-green-500' : 'bg-amber-500'
                        }>
                          {hw.status === 'submitted' ? 'تم التسليم' : 'معلق'}
                        </Badge>
                        {hw.status === 'pending' && (
                          <Badge variant="outline" className={
                            hw.priority === 'high' ? 'border-red-500 text-red-400' :
                            hw.priority === 'medium' ? 'border-amber-500 text-amber-400' : 'border-blue-500 text-blue-400'
                          }>
                            {hw.priority === 'high' ? 'أولوية عالية' :
                             hw.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{hw.subject} • موعد التسليم: {hw.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {hw.status === 'pending' && (
                      <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                        <Upload className="w-4 h-4 mr-1" />
                        تسليم
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                      <Eye className="w-4 h-4 mr-1" />
                      تفاصيل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Exams Tab
  const renderExams = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">جدول الاختبارات</h2>
          <p className="text-slate-400">المواعيد والتفاصيل</p>
        </div>
        <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
          <Download className="w-4 h-4 mr-2" />
          تحميل الجدول
        </Button>
      </div>

      {/* Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`bg-slate-800/50 border-slate-700 hover:border-rose-500/50 transition-colors ${
              exam.type === 'exam' ? 'border-l-4 border-l-red-500' :
              exam.type === 'quiz' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-blue-500'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={
                        exam.type === 'exam' ? 'bg-red-500' :
                        exam.type === 'quiz' ? 'bg-amber-500' : 'bg-blue-500'
                      }>
                        {exam.type === 'exam' ? 'امتحان' :
                         exam.type === 'quiz' ? 'اختبار قصير' : 'امتحان عملي'}
                      </Badge>
                    </div>
                    <h3 className="text-white font-bold text-lg">{exam.title}</h3>
                    <p className="text-slate-400">{exam.subject}</p>
                  </div>
                  <Target className={`w-8 h-8 ${
                    exam.type === 'exam' ? 'text-red-400' :
                    exam.type === 'quiz' ? 'text-amber-400' : 'text-blue-400'
                  }`} />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <Calendar className="w-5 h-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-white text-sm font-medium">{exam.date}</p>
                    <p className="text-slate-500 text-xs">التاريخ</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-white text-sm font-medium">{exam.time}</p>
                    <p className="text-slate-500 text-xs">الوقت</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <p className="text-white text-sm font-medium">{exam.duration}</p>
                    <p className="text-slate-500 text-xs">المدة</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full border-slate-600 text-white hover:bg-slate-700">
                  <BookOpen className="w-4 h-4 mr-1" />
                  مراجعة المحتوى
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Achievements Tab
  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">إنجازاتي</h2>
          <p className="text-slate-400">الأوسمة والنقاط المكتسبة</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full">
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg">{stats.points} نقطة</span>
          </div>
          <div className="flex items-center gap-2 bg-rose-500/20 px-4 py-2 rounded-full">
            <Trophy className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-bold text-lg">المستوى {stats.level}</span>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <Card className="bg-gradient-to-l from-rose-600/20 to-pink-600/20 border-rose-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{stats.level}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">المستوى الحالي</h3>
                <p className="text-rose-300">250 نقطة للمستوى التالي</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">{stats.points} / 1500 نقطة</p>
              <p className="text-slate-400 text-sm">للانتقال للمستوى {stats.level + 1}</p>
            </div>
          </div>
          <Progress value={(stats.points % 250) / 250 * 100} className="h-3" />
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4`}>
                  <achievement.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{achievement.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{achievement.desc}</p>
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <Star className="w-4 h-4" />
                  <span className="font-bold">+{achievement.points} نقطة</span>
                </div>
                <p className="text-slate-500 text-xs mt-2">تم الحصول عليه: {achievement.date}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Library Tab
  const renderLibrary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">المكتبة الرقمية</h2>
          <p className="text-slate-400">الكتب والمصادر التعليمية</p>
        </div>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="بحث في المكتبة..." className="pr-9 bg-slate-700/50 border-slate-600 w-64" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {['الكل', 'الرياضيات', 'اللغة العربية', 'العلوم', 'الاجتماعيات'].map((cat, i) => (
          <Button key={i} variant={i === 0 ? 'default' : 'outline'} className={i === 0 ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'border-slate-600 text-white hover:bg-slate-700'}>
            {cat}
          </Button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {libraryBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-rose-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-full h-32 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4">
                  <BookMarked className="w-12 h-12 text-rose-400" />
                </div>
                <h3 className="text-white font-bold mb-1">{book.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{book.subject}</p>
                <div className="flex items-center justify-between">
                  <Badge className={book.available ? 'bg-green-500' : 'bg-red-500'}>
                    {book.available ? 'متوفر' : 'مستعار'}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                    <Download className="w-4 h-4 mr-1" />
                    تحميل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Settings Tab
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الإعدادات</h2>
          <p className="text-slate-400">إعدادات الحساب الشخصي</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">المعلومات الشخصية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-rose-500 text-white text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-bold text-xl">{user.name}</p>
                <p className="text-slate-400">{user.student?.class?.name}</p>
                <p className="text-slate-500 text-sm">رقم التسجيل: {user.student?.admissionNo}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">الاسم الكامل</label>
                <Input className="bg-slate-700/50 border-slate-600 text-white" defaultValue={user.name} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">البريد الإلكتروني</label>
                <Input className="bg-slate-700/50 border-slate-600 text-white" defaultValue={user.email} />
              </div>
            </div>
            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white mt-4">
              حفظ التغييرات
            </Button>
          </CardContent>
        </Card>

        {/* Study Preferences */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">تفضيلات الدراسة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "تذكير بالواجبات", desc: "استلام إشعارات تذكير بالواجبات" },
              { label: "تذكير بالاختبارات", desc: "استلام إشعارات بمواعيد الاختبارات" },
              { label: "نصائح دراسية", desc: "استلام نصائح لتحسين الأداء" },
              { label: "تحديث الدرجات", desc: "إشعار عند نشر درجات جديدة" }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">{setting.label}</p>
                  <p className="text-slate-500 text-sm">{setting.desc}</p>
                </div>
                <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
                  مفعل
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'grades':
        return renderGrades();
      case 'schedule':
        return renderSchedule();
      case 'subjects':
        return renderSubjects();
      case 'attendance':
        return renderAttendance();
      case 'homework':
        return renderHomework();
      case 'exams':
        return renderExams();
      case 'achievements':
        return renderAchievements();
      case 'library':
        return renderLibrary();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout user={user} title="لوحة تحكم التلميذ" sidebar={sidebar}>
      {renderContent()}
    </DashboardLayout>
  );
}
