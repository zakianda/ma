"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users,
  Calendar,
  Bell,
  Award,
  ClipboardList,
  DollarSign,
  BarChart3,
  MessageSquare,
  CreditCard,
  TrendingUp,
  FileText,
  Settings,
  GraduationCap,
  Download,
  Send,
  Eye,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  BookOpen,
  Target,
  Phone,
  Mail,
  MapPin,
  Printer,
  Filter,
  Search,
  Wallet,
  Receipt,
  CreditCard as CardIcon,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from "lucide-react";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { Sidebar } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { ChartCard } from "@/components/shared/Charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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

interface ParentDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    parent?: {
      students: Array<{
        id: string;
        admissionNo: string;
        user: { name: string };
        class: { name: string } | null;
      }>;
    };
  };
}

type TabType = 'overview' | 'children' | 'grades' | 'attendance' | 'fees' | 'messages' | 'reports' | 'settings';

export function ParentDashboard({ user }: ParentDashboardProps) {
  const { formatCurrency, formatDate } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [stats, setStats] = useState({
    childrenCount: 2,
    averageGrade: 85,
    attendanceRate: 94,
    pendingFees: 2400,
    unreadMessages: 5,
    upcomingEvents: 3,
    paidFees: 8500,
    totalFees: 10900
  });

  const children = [
    { 
      id: "1", 
      user: { name: "أحمد محمد" }, 
      class: { name: "السنة الثالثة أ" }, 
      averageGrade: 88, 
      attendanceRate: 96,
      admissionNo: "STD-2025-001",
      subjects: [
        { name: "الرياضيات", grade: 90, teacher: "أ. خالد العمري" },
        { name: "اللغة العربية", grade: 85, teacher: "أ. فاطمة الزهراء" },
        { name: "اللغة الفرنسية", grade: 82, teacher: "M. Jean Pierre" },
        { name: "العلوم", grade: 92, teacher: "أ. محمد السعيد" },
        { name: "الاجتماعيات", grade: 88, teacher: "أ. نورا أحمد" }
      ],
      recentAttendance: [
        { date: "2025-02-10", status: "present" },
        { date: "2025-02-09", status: "present" },
        { date: "2025-02-08", status: "absent" },
        { date: "2025-02-07", status: "present" },
        { date: "2025-02-06", status: "late" }
      ],
      homework: [
        { id: "1", subject: "الرياضيات", title: "حل المعادلات", dueDate: "2025-02-15", status: "pending" },
        { id: "2", subject: "العلوم", title: "بحث عن الكواكب", dueDate: "2025-02-12", status: "submitted" }
      ]
    },
    { 
      id: "2", 
      user: { name: "فاطمة محمد" }, 
      class: { name: "السنة الأولى ب" }, 
      averageGrade: 82, 
      attendanceRate: 92,
      admissionNo: "STD-2025-002",
      subjects: [
        { name: "الرياضيات", grade: 78, teacher: "أ. خالد العمري" },
        { name: "اللغة العربية", grade: 88, teacher: "أ. فاطمة الزهراء" },
        { name: "اللغة الفرنسية", grade: 75, teacher: "M. Jean Pierre" },
        { name: "العلوم", grade: 85, teacher: "أ. محمد السعيد" },
        { name: "التربية الإسلامية", grade: 90, teacher: "أ. عبدالله" }
      ],
      recentAttendance: [
        { date: "2025-02-10", status: "present" },
        { date: "2025-02-09", status: "late" },
        { date: "2025-02-08", status: "present" },
        { date: "2025-02-07", status: "present" },
        { date: "2025-02-06", status: "present" }
      ],
      homework: [
        { id: "1", subject: "اللغة العربية", title: "إنشاء قصيرة", dueDate: "2025-02-14", status: "pending" },
        { id: "2", subject: "الرياضيات", title: "تمارين الجمع", dueDate: "2025-02-11", status: "submitted" }
      ]
    }
  ];

  const [messages, setMessages] = useState([
    { id: "1", from: "أ. خالد العمري", subject: "تقدم أحمد في الرياضيات", date: "2025-02-10", read: false, content: "أود إعلامكم بأن أحمد حقق تقدماً ملحوظاً في مادة الرياضيات خلال الفصل الحالي." },
    { id: "2", from: "الإدارة", subject: "إشعار اجتماع أولياء الأمور", date: "2025-02-08", read: true, content: "يسرنا دعوتكم لحضور اجتماع أولياء الأمور يوم السبت القادم الساعة 10 صباحاً." },
    { id: "3", from: "أ. فاطمة الزهراء", subject: "تم تسليم واجب اللغة العربية", date: "2025-02-07", read: true, content: "تم تسليم واجب اللغة العربية في الموعد المحدد. شكراً لمتابعتكم." }
  ]);

  const [fees, setFees] = useState([
    { id: "1", description: "رسوم التسجيل", amount: 1500, dueDate: "2024-09-01", status: "paid", paidDate: "2024-08-28" },
    { id: "2", description: "رسوم الفصل الأول", amount: 3000, dueDate: "2024-10-01", status: "paid", paidDate: "2024-09-25" },
    { id: "3", description: "رسوم الفصل الثاني", amount: 3000, dueDate: "2025-01-15", status: "pending" },
    { id: "4", description: "رسوم الأنشطة", amount: 400, dueDate: "2024-11-01", status: "paid", paidDate: "2024-10-28" },
    { id: "5", description: "رسوم الكتب والمستلزمات", amount: 600, dueDate: "2024-09-15", status: "paid", paidDate: "2024-09-10" }
  ]);

  const [notifications, setNotifications] = useState([
    { id: "1", title: "اجتماع أولياء الأمور", date: "2025-02-15", type: "event" },
    { id: "2", title: "موعد تسليم النتائج", date: "2025-02-20", type: "academic" },
    { id: "3", title: "رحلة مدرسية", date: "2025-02-25", type: "activity" }
  ]);

  const gradeTrendData = [
    { name: "سبتمبر", value: 80 },
    { name: "أكتوبر", value: 82 },
    { name: "نوفمبر", value: 85 },
    { name: "ديسمبر", value: 83 },
    { name: "يناير", value: 87 },
    { name: "فبراير", value: 88 }
  ];

  const attendanceData = [
    { name: "الأحد", value: 95 },
    { name: "الإثنين", value: 92 },
    { name: "الثلاثاء", value: 88 },
    { name: "الأربعاء", value: 94 },
    { name: "الخميس", value: 91 }
  ];

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: "لوحة التحكم", onClick: () => setActiveTab('overview'), active: activeTab === 'overview' },
    { id: 'children', icon: Users, label: "أبنائي", onClick: () => setActiveTab('children'), active: activeTab === 'children' },
    { id: 'grades', icon: Award, label: "الدرجات", onClick: () => setActiveTab('grades'), active: activeTab === 'grades' },
    { id: 'attendance', icon: ClipboardList, label: "الحضور", onClick: () => setActiveTab('attendance'), active: activeTab === 'attendance' },
    { id: 'fees', icon: DollarSign, label: "الرسوم", onClick: () => setActiveTab('fees'), active: activeTab === 'fees', badge: stats.pendingFees > 0 ? 1 : 0 },
    { id: 'messages', icon: MessageSquare, label: "الرسائل", onClick: () => setActiveTab('messages'), active: activeTab === 'messages', badge: stats.unreadMessages },
    { id: 'reports', icon: FileText, label: "التقارير", onClick: () => setActiveTab('reports'), active: activeTab === 'reports' },
    { id: 'settings', icon: Settings, label: "الإعدادات", onClick: () => setActiveTab('settings'), active: activeTab === 'settings' }
  ];

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      title="لوحة ولي الأمر"
      icon={Users}
      gradient="from-orange-500 to-amber-600"
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
        <Card className="bg-gradient-to-l from-orange-600/30 to-amber-600/30 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Users className="w-10 h-10 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">مرحباً، {user.name}!</h2>
                  <p className="text-orange-300">تابع تقدم أبنائك الدراسي من هنا</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                  <MessageSquare className="w-4 h-4" />
                  تواصل مع الأستاذ
                </Button>
                <Button variant="outline" className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10">
                  <DollarSign className="w-4 h-4 mr-2" />
                  دفع الرسوم
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="عدد الأبناء"
          value={stats.childrenCount}
          icon={GraduationCap}
          gradient="from-orange-500 to-amber-600"
        />
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
          title="رسوم معلقة"
          value={formatCurrency(stats.pendingFees)}
          icon={CreditCard}
          gradient="from-rose-500 to-pink-600"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.unreadMessages}</p>
            <p className="text-slate-400 text-sm">رسائل غير مقروءة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.upcomingEvents}</p>
            <p className="text-slate-400 text-sm">فعاليات قادمة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Wallet className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.paidFees)}</p>
            <p className="text-slate-400 text-sm">رسوم مدفوعة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">78%</p>
            <p className="text-slate-400 text-sm">نسبة الإنجاز</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Children */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Children Cards */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">أبنائي</CardTitle>
            <CardDescription className="text-slate-400">معلومات الأبناء المسجلين</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {children.map((child, index) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedChild(child.id);
                    setActiveTab('children');
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-orange-500 text-white">
                        {child.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{child.user.name}</p>
                      <p className="text-slate-400 text-sm">{child.class?.name || "غير محدد"}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">متوسط الدرجات</span>
                      <span className="text-green-400 font-medium">{child.averageGrade}%</span>
                    </div>
                    <Progress value={child.averageGrade} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">نسبة الحضور</span>
                      <span className="text-blue-400 font-medium">{child.attendanceRate}%</span>
                    </div>
                    <Progress value={child.attendanceRate} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grade Trend Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">تطور الدرجات</CardTitle>
            <CardDescription className="text-slate-400">خلال الفصل الدراسي</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartCard title="" type="line" data={gradeTrendData} dataKey="value" nameKey="name" />
          </CardContent>
        </Card>
      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">الفعاليات القادمة</CardTitle>
              <CardDescription className="text-slate-400">المواعيد والأنشطة المهمة</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
              عرض الكل
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div className={`p-3 rounded-xl ${
                    notification.type === 'event' ? 'bg-purple-500/20' :
                    notification.type === 'academic' ? 'bg-green-500/20' : 'bg-blue-500/20'
                  }`}>
                    <Calendar className={`w-5 h-5 ${
                      notification.type === 'event' ? 'text-purple-400' :
                      notification.type === 'academic' ? 'text-green-400' : 'text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{notification.title}</p>
                    <p className="text-slate-400 text-sm">{notification.date}</p>
                  </div>
                  <Badge className={
                    notification.type === 'event' ? 'bg-purple-500' :
                    notification.type === 'academic' ? 'bg-green-500' : 'bg-blue-500'
                  }>
                    {notification.type === 'event' ? 'فعالية' :
                     notification.type === 'academic' ? 'أكاديمي' : 'نشاط'}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12"
                onClick={() => setActiveTab('grades')}
              >
                <Award className="w-5 h-5" />
                عرض الدرجات
              </Button>
              <Button 
                className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12"
                onClick={() => setActiveTab('fees')}
              >
                <DollarSign className="w-5 h-5" />
                دفع الرسوم
              </Button>
              <Button 
                className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12"
                onClick={() => setActiveTab('messages')}
              >
                <MessageSquare className="w-5 h-5" />
                التواصل مع الأستاذ
              </Button>
              <Button 
                className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12"
                onClick={() => setActiveTab('reports')}
              >
                <Download className="w-5 h-5" />
                تحميل التقرير
              </Button>
              <Button 
                className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12"
                onClick={() => setActiveTab('attendance')}
              >
                <ClipboardList className="w-5 h-5" />
                سجل الحضور
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Children Tab
  const renderChildren = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">أبنائي</h2>
          <p className="text-slate-400">المعلومات التفصيلية للأبناء</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-6">
                {/* Child Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-white text-xl">
                        {child.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-white">{child.user.name}</h3>
                      <p className="text-slate-400">{child.class?.name}</p>
                      <p className="text-slate-500 text-sm">رقم التسجيل: {child.admissionNo}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">نشط</Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{child.averageGrade}%</p>
                    <p className="text-slate-400 text-sm">متوسط الدرجات</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <ClipboardList className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{child.attendanceRate}%</p>
                    <p className="text-slate-400 text-sm">نسبة الحضور</p>
                  </div>
                </div>

                {/* Recent Attendance */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">آخر أيام الحضور</h4>
                  <div className="flex gap-2">
                    {child.recentAttendance.map((att, i) => (
                      <div key={i} className="flex-1 text-center">
                        <div className={`p-2 rounded-lg ${
                          att.status === 'present' ? 'bg-green-500/20' :
                          att.status === 'absent' ? 'bg-red-500/20' : 'bg-amber-500/20'
                        }`}>
                          {att.status === 'present' ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> :
                           att.status === 'absent' ? <XCircle className="w-5 h-5 text-red-400 mx-auto" /> :
                           <Clock className="w-5 h-5 text-amber-400 mx-auto" />}
                        </div>
                        <p className="text-slate-500 text-xs mt-1">{att.date.slice(5)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Homework */}
                <div>
                  <h4 className="text-white font-medium mb-3">الواجبات المعلقة</h4>
                  <div className="space-y-2">
                    {child.homework.filter(h => h.status === 'pending').map((hw) => (
                      <div key={hw.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <p className="text-white text-sm">{hw.title}</p>
                          <p className="text-slate-500 text-xs">{hw.subject} • {hw.dueDate}</p>
                        </div>
                        <Badge className="bg-amber-500">معلق</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <Award className="w-4 h-4 mr-1" />
                    الدرجات
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <ClipboardList className="w-4 h-4 mr-1" />
                    الحضور
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    تواصل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Grades Tab
  const renderGrades = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">درجات الأبناء</h2>
          <p className="text-slate-400">تتبع الأداء الأكاديمي</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            value={selectedChild || ''}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="">جميع الأبناء</option>
            {children.map(c => <option key={c.id} value={c.id}>{c.user.name}</option>)}
          </select>
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      {children.map((child) => (
        <Card key={child.id} className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-orange-500 text-white">{child.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">{child.user.name}</CardTitle>
                <CardDescription className="text-slate-400">{child.class?.name} • المعدل: {child.averageGrade}%</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">المادة</TableHead>
                  <TableHead className="text-slate-400">الأستاذ</TableHead>
                  <TableHead className="text-slate-400 text-center">الدرجة</TableHead>
                  <TableHead className="text-slate-400 text-center">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {child.subjects.map((subject, i) => (
                  <TableRow key={i} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell className="text-white font-medium">{subject.name}</TableCell>
                    <TableCell className="text-slate-300">{subject.teacher}</TableCell>
                    <TableCell className="text-center">
                      <span className={`text-lg font-bold ${
                        subject.grade >= 90 ? 'text-green-400' :
                        subject.grade >= 70 ? 'text-blue-400' :
                        subject.grade >= 50 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {subject.grade}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={
                        subject.grade >= 90 ? 'bg-green-500' :
                        subject.grade >= 70 ? 'bg-blue-500' :
                        subject.grade >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }>
                        {subject.grade >= 90 ? 'ممتاز' :
                         subject.grade >= 70 ? 'جيد' :
                         subject.grade >= 50 ? 'مقبول' : 'ضعيف'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Render Attendance Tab
  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">سجل الحضور</h2>
          <p className="text-slate-400">متابعة حضور الأبناء</p>
        </div>
        <div className="flex items-center gap-3">
          <Input type="date" className="bg-slate-700/50 border-slate-600 text-white" />
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
            <p className="text-3xl font-bold text-white">94%</p>
            <p className="text-blue-300 text-sm">نسبة الحضور</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">نسبة الحضور الأسبوعي</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartCard title="" type="bar" data={attendanceData} dataKey="value" nameKey="name" />
        </CardContent>
      </Card>

      {/* Children Attendance */}
      {children.map((child) => (
        <Card key={child.id} className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-orange-500 text-white">{child.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">{child.user.name}</CardTitle>
                <CardDescription className="text-slate-400">نسبة الحضور: {child.attendanceRate}%</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {child.recentAttendance.map((att, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {att.status === 'present' ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                     att.status === 'absent' ? <XCircle className="w-5 h-5 text-red-400" /> :
                     <Clock className="w-5 h-5 text-amber-400" />}
                    <span className="text-white">{att.date}</span>
                  </div>
                  <Badge className={
                    att.status === 'present' ? 'bg-green-500' :
                    att.status === 'absent' ? 'bg-red-500' : 'bg-amber-500'
                  }>
                    {att.status === 'present' ? 'حاضر' :
                     att.status === 'absent' ? 'غائب' : 'متأخر'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Render Fees Tab
  const renderFees = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">إدارة الرسوم</h2>
          <p className="text-slate-400">عرض ودفع الرسوم الدراسية</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <CreditCard className="w-4 h-4" />
          دفع الآن
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-l from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-12 h-12 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">المدفوع</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.paidFees)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-red-600/20 to-rose-600/20 border-red-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-12 h-12 text-red-400" />
              <div>
                <p className="text-slate-400 text-sm">المعلق</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.pendingFees)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Wallet className="w-12 h-12 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">إجمالي الرسوم</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalFees)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">نسبة الدفع</span>
            <span className="text-2xl font-bold text-green-400">{Math.round((stats.paidFees / stats.totalFees) * 100)}%</span>
          </div>
          <Progress value={(stats.paidFees / stats.totalFees) * 100} className="h-3" />
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-slate-400">{formatCurrency(stats.paidFees)} مدفوع</span>
            <span className="text-slate-400">متبقي {formatCurrency(stats.pendingFees)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Fees List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">تفاصيل الرسوم</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">الوصف</TableHead>
                <TableHead className="text-slate-400">المبلغ</TableHead>
                <TableHead className="text-slate-400">تاريخ الاستحقاق</TableHead>
                <TableHead className="text-slate-400">الحالة</TableHead>
                <TableHead className="text-slate-400">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="text-white font-medium">{fee.description}</TableCell>
                  <TableCell className="text-white">{formatCurrency(fee.amount)}</TableCell>
                  <TableCell className="text-slate-300">{fee.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={fee.status === 'paid' ? 'bg-green-500' : 'bg-amber-500'}>
                      {fee.status === 'paid' ? 'مدفوع' : 'معلق'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {fee.status === 'pending' ? (
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        دفع
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                        <Eye className="w-4 h-4 mr-1" />
                        الإيصال
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">طرق الدفع المتاحة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2 border-slate-600 text-white hover:bg-slate-700">
              <CardIcon className="w-6 h-6" />
              <span>بطاقة ائتمان</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 border-slate-600 text-white hover:bg-slate-700">
              <Wallet className="w-6 h-6" />
              <span>تحويل بنكي</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 border-slate-600 text-white hover:bg-slate-700">
              <Receipt className="w-6 h-6" />
              <span>دفع نقدي</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Messages Tab
  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الرسائل</h2>
          <p className="text-slate-400">التواصل مع الأساتذة والإدارة</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <Plus className="w-4 h-4" />
          رسالة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input placeholder="بحث في الرسائل..." className="pr-9 bg-slate-700/50 border-slate-600" />
              </div>
              <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                <option>جميع الرسائل</option>
                <option>غير مقروءة</option>
                <option>من الأساتذة</option>
                <option>من الإدارة</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      msg.read ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-orange-500 text-white text-xs">{msg.from.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{msg.from}</p>
                          <p className="text-slate-500 text-xs">{msg.date}</p>
                        </div>
                      </div>
                      {!msg.read && <Badge className="bg-orange-500">جديد</Badge>}
                    </div>
                    <p className="text-white text-sm font-medium mb-1">{msg.subject}</p>
                    <p className="text-slate-400 text-sm line-clamp-2">{msg.content}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Quick Contacts */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">جهات الاتصال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-500 text-white text-xs">أ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm font-medium">أ. خالد العمري</p>
                    <p className="text-slate-500 text-xs">أستاذ الرياضيات</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  إرسال رسالة
                </Button>
              </div>
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">إ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm font-medium">الإدارة المدرسية</p>
                    <p className="text-slate-500 text-xs">الشؤون الإدارية</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  إرسال رسالة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Reports Tab
  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">التقارير</h2>
          <p className="text-slate-400">تحميل وطباعة التقارير الدراسية</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "كشف الدرجات", desc: "تقرير درجات الفصل الحالي", icon: Award, color: "from-green-500 to-emerald-600" },
          { title: "سجل الحضور", desc: "تقرير حضور شهري", icon: ClipboardList, color: "from-blue-500 to-cyan-600" },
          { title: "البيان المالي", desc: "كشف الرسوم المدفوعة", icon: Receipt, color: "from-orange-500 to-amber-600" },
          { title: "بطاقة التلميذ", desc: "بطاقة تعريفية بالتلميذ", icon: GraduationCap, color: "from-purple-500 to-pink-600" },
          { title: "الجدول الدراسي", desc: "جدول الحصص الأسبوعي", icon: Calendar, color: "from-rose-500 to-red-600" },
          { title: "شهادة مدرسية", desc: "شهادة التسجيل المدرسي", icon: FileText, color: "from-teal-500 to-green-600" }
        ].map((report, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center mb-4`}>
                  <report.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">{report.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{report.desc}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <Download className="w-4 h-4 mr-1" />
                    تحميل
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                    <Printer className="w-4 h-4" />
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
          <p className="text-slate-400">إعدادات الحساب والتطبيق</p>
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
                <AvatarFallback className="bg-orange-500 text-white text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-bold text-xl">{user.name}</p>
                <p className="text-slate-400">{user.email}</p>
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
              <div>
                <label className="text-slate-400 text-sm mb-1 block">رقم الهاتف</label>
                <Input className="bg-slate-700/50 border-slate-600 text-white" defaultValue="+212 6XX XXX XXX" />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">العنوان</label>
                <Input className="bg-slate-700/50 border-slate-600 text-white" defaultValue="الدار البيضاء، المغرب" />
              </div>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4">
              حفظ التغييرات
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">إعدادات الإشعارات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "إشعارات الدرجات", desc: "استلام إشعارات عند نشر درجات جديدة" },
              { label: "إشعارات الحضور", desc: "استلام تنبيهات عند غياب التلاميذ" },
              { label: "إشعارات الرسوم", desc: "تذكير بمواعيد استحقاق الرسوم" },
              { label: "إشعارات الرسائل", desc: "استلام إشعارات الرسائل الجديدة" },
              { label: "النشرة البريدية", desc: "استلام النشرة الإخبارية الأسبوعية" }
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
      case 'children':
        return renderChildren();
      case 'grades':
        return renderGrades();
      case 'attendance':
        return renderAttendance();
      case 'fees':
        return renderFees();
      case 'messages':
        return renderMessages();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout user={user} title="لوحة تحكم ولي الأمر" sidebar={sidebar}>
      {renderContent()}
    </DashboardLayout>
  );
}
