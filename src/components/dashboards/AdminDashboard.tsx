"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCog,
  Users,
  BookOpen,
  Calendar,
  Bell,
  FileText,
  Settings,
  BarChart3,
  School,
  UserPlus,
  CreditCard,
  MessageSquare,
  GraduationCap,
  Award,
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Download,
  Upload,
  Send,
  FileDown,
  Archive,
  Stamp,
  Printer,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Building2,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Phone,
  Mail,
  RefreshCw,
  FileCheck,
  AlertTriangle,
  Users2,
  Target,
  Activity,
  PieChart,
  Wallet,
  Landmark,
  Briefcase,
  Shield,
  Zap,
  Save
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

type TabType = 'overview' | 'registrations' | 'students' | 'classes' | 'attendance' | 'exams' | 'certificates' | 'communication';

export function AdminDashboard({ user }: AdminDashboardProps) {
  const { formatCurrency, formatDate } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  const [stats, setStats] = useState({
    totalStudents: 1850,
    totalTeachers: 95,
    totalClasses: 62,
    pendingFees: 45000,
    pendingRegistrations: 24,
    todayAttendance: 94,
    upcomingExams: 8,
    sentMessages: 156,
    newStudentsToday: 5,
    absentToday: 62,
    lateToday: 28,
    feesCollected: 125000
  });

  const [registrationRequests, setRegistrationRequests] = useState([
    { id: "1", studentName: "أحمد محمد علي", parentName: "محمد علي", phone: "+212 6XX XX XX XX", level: "السنة الأولى", date: new Date().toISOString(), status: "pending", documents: ['شهادة ميلاد', 'صورة'], notes: "" },
    { id: "2", studentName: "فاطمة خالد", parentName: "خالد أحمد", phone: "+212 6XX XX XX XX", level: "السنة الثانية", date: new Date(Date.now() - 86400000).toISOString(), status: "approved", documents: ['شهادة ميلاد', 'صورة', 'بطاقة تعريف'], notes: "تم القبول" },
    { id: "3", studentName: "يوسف عمر", parentName: "عمر سعيد", phone: "+212 6XX XX XX XX", level: "السنة الأولى", date: new Date(Date.now() - 172800000).toISOString(), status: "pending", documents: ['شهادة ميلاد'], notes: "ينقص وثائق" },
    { id: "4", studentName: "مريم حسن", parentName: "حسن محمد", phone: "+212 6XX XX XX XX", level: "السنة الثالثة", date: new Date(Date.now() - 259200000).toISOString(), status: "rejected", documents: ['شهادة ميلاد', 'صورة'], notes: "الوثائق غير مكتملة" },
    { id: "5", studentName: "عبدالله سعيد", parentName: "سعيد علي", phone: "+212 6XX XX XX XX", level: "السنة الثانية", date: new Date(Date.now() - 345600000).toISOString(), status: "pending", documents: ['شهادة ميلاد', 'صورة', 'بطاقة تعريف', 'شهادة تطعيم'], notes: "" },
    { id: "6", studentName: "ليلى محمود", parentName: "محمود حسن", phone: "+212 6XX XX XX XX", level: "السنة الرابعة", date: new Date(Date.now() - 432000000).toISOString(), status: "pending", documents: ['شهادة ميلاد', 'صورة'], notes: "" }
  ]);

  const [recentStudents, setRecentStudents] = useState([
    { id: "1", admissionNo: "STU001", user: { name: "أحمد محمد" }, class: { name: "السنة الأولى أ" }, status: "active", fees: "paid", phone: "+212 6XX XX XX XX", parent: "محمد علي" },
    { id: "2", admissionNo: "STU002", user: { name: "فاطمة علي" }, class: { name: "السنة الثانية ب" }, status: "active", fees: "partial", phone: "+212 6XX XX XX XX", parent: "علي أحمد" },
    { id: "3", admissionNo: "STU003", user: { name: "محمد سعيد" }, class: { name: "السنة الأولى أ" }, status: "active", fees: "paid", phone: "+212 6XX XX XX XX", parent: "سعيد محمد" },
    { id: "4", admissionNo: "STU004", user: { name: "سارة أحمد" }, class: { name: "السنة الثالثة أ" }, status: "inactive", fees: "unpaid", phone: "+212 6XX XX XX XX", parent: "أحمد سارة" },
    { id: "5", admissionNo: "STU005", user: { name: "عبدالله خالد" }, class: { name: "السنة الثانية أ" }, status: "active", fees: "paid", phone: "+212 6XX XX XX XX", parent: "خالد عبدالله" },
    { id: "6", admissionNo: "STU006", user: { name: "نورة محمود" }, class: { name: "السنة الأولى ب" }, status: "active", fees: "paid", phone: "+212 6XX XX XX XX", parent: "محمود نورة" },
    { id: "7", admissionNo: "STU007", user: { name: "يوسف عمر" }, class: { name: "السنة الثالثة ب" }, status: "active", fees: "partial", phone: "+212 6XX XX XX XX", parent: "عمر يوسف" }
  ]);

  const [classes, setClasses] = useState([
    { id: "1", name: "السنة الأولى أ", level: "ابتدائي", students: 32, teacher: "أ. فاطمة الزهراء", room: "قاعة 1", schedule: "8:00 - 12:00", attendance: 96 },
    { id: "2", name: "السنة الأولى ب", level: "ابتدائي", students: 28, teacher: "أ. محمد الأمين", room: "قاعة 2", schedule: "8:00 - 12:00", attendance: 94 },
    { id: "3", name: "السنة الثانية أ", level: "ابتدائي", students: 35, teacher: "أ. خالد البركاني", room: "قاعة 3", schedule: "13:00 - 17:00", attendance: 92 },
    { id: "4", name: "السنة الثانية ب", level: "ابتدائي", students: 30, teacher: "أ. سارة المنصوري", room: "قاعة 4", schedule: "13:00 - 17:00", attendance: 95 },
    { id: "5", name: "السنة الثالثة أ", level: "ابتدائي", students: 33, teacher: "أ. أحمد العلوي", room: "قاعة 5", schedule: "8:00 - 12:00", attendance: 93 },
    { id: "6", name: "السنة الثالثة ب", level: "ابتدائي", students: 31, teacher: "أ. نورا الفاسي", room: "قاعة 6", schedule: "8:00 - 12:00", attendance: 91 }
  ]);

  const [exams, setExams] = useState([
    { id: "1", name: "امتحان الرياضيات - الفصل الأول", class: "السنة الأولى", date: "2025-02-15", status: "scheduled", students: 60, duration: "ساعتان" },
    { id: "2", name: "امتحان اللغة العربية - الفصل الأول", class: "السنة الثانية", date: "2025-02-16", status: "scheduled", students: 65, duration: "ساعتان" },
    { id: "3", name: "امتحان العلوم - الفصل الأول", class: "السنة الثالثة", date: "2025-02-10", status: "completed", students: 33, duration: "ساعة ونصف" },
    { id: "4", name: "امتحان التربية الإسلامية - الفصل الأول", class: "السنة الأولى", date: "2025-02-17", status: "scheduled", students: 60, duration: "ساعة" },
    { id: "5", name: "امتحان اللغة الفرنسية - الفصل الأول", class: "السنة الثانية", date: "2025-02-18", status: "scheduled", students: 65, duration: "ساعة ونصف" }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: "1", date: new Date().toISOString(), class: "السنة الأولى أ", present: 30, absent: 2, late: 1, rate: 94 },
    { id: "2", date: new Date().toISOString(), class: "السنة الثانية أ", present: 33, absent: 1, late: 1, rate: 95 },
    { id: "3", date: new Date().toISOString(), class: "السنة الثالثة أ", present: 31, absent: 2, late: 0, rate: 94 },
    { id: "4", date: new Date(Date.now() - 86400000).toISOString(), class: "السنة الأولى أ", present: 29, absent: 3, late: 2, rate: 91 },
    { id: "5", date: new Date(Date.now() - 86400000).toISOString(), class: "السنة الثانية أ", present: 32, absent: 2, late: 1, rate: 93 }
  ]);

  const attendanceData = [
    { name: "الأحد", value: 95 },
    { name: "الإثنين", value: 92 },
    { name: "الثلاثاء", value: 88 },
    { name: "الأربعاء", value: 94 },
    { name: "الخميس", value: 91 }
  ];

  const registrationData = [
    { name: "يناير", value: 45 },
    { name: "فبراير", value: 32 },
    { name: "مارس", value: 28 },
    { name: "أبريل", value: 15 },
    { name: "مايو", value: 8 }
  ];

  const feesData = [
    { name: "يناير", value: 85000 },
    { name: "فبراير", value: 72000 },
    { name: "مارس", value: 95000 },
    { name: "أبريل", value: 68000 },
    { name: "مايو", value: 45000 }
  ];

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: "نظرة عامة", onClick: () => setActiveTab('overview') },
    { id: 'registrations', icon: UserPlus, label: "طلبات التسجيل", onClick: () => setActiveTab('registrations') },
    { id: 'students', icon: Users, label: "التلاميذ", onClick: () => setActiveTab('students') },
    { id: 'classes', icon: School, label: "الأقسام", onClick: () => setActiveTab('classes') },
    { id: 'attendance', icon: ClipboardList, label: "الحضور والغياب", onClick: () => setActiveTab('attendance') },
    { id: 'exams', icon: FileText, label: "الامتحانات", onClick: () => setActiveTab('exams') },
    { id: 'certificates', icon: Award, label: "الشهادات", onClick: () => setActiveTab('certificates') },
    { id: 'communication', icon: MessageSquare, label: "التواصل", onClick: () => setActiveTab('communication') }
  ];

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      title="لوحة الإداري"
      icon={UserCog}
      gradient="from-blue-500 to-cyan-600"
      user={user}
      activeTab={activeTab}
    />
  );

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-l from-blue-600/30 to-cyan-600/30 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <UserCog className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">مرحباً، {user.name}</h2>
                  <p className="text-blue-300">يمكنك إدارة شؤون المدرسة من هنا</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2" onClick={() => { setModalType('addStudent'); setShowModal(true); }}>
                  <UserPlus className="w-4 h-4" />
                  تسجيل جديد
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="إجمالي التلاميذ" value={stats.totalStudents.toLocaleString('en-US')} icon={Users} gradient="from-blue-500 to-cyan-600" trend={{ value: 5, isPositive: true }} />
        <StatCard title="الأساتذة" value={stats.totalTeachers.toLocaleString('en-US')} icon={GraduationCap} gradient="from-green-500 to-emerald-600" />
        <StatCard title="الأقسام" value={stats.totalClasses} icon={School} gradient="from-orange-500 to-amber-600" />
        <StatCard title="طلبات معلقة" value={stats.pendingRegistrations} icon={Clock} gradient="from-rose-500 to-pink-600" />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-l from-amber-600/20 to-orange-600/20 border-amber-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-300 text-sm">رسوم معلقة</p>
                <p className="text-xl font-bold text-white">{formatCurrency(stats.pendingFees)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">حضور اليوم</p>
                <p className="text-xl font-bold text-white">{stats.todayAttendance}%</p>
              </div>
              <ClipboardList className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">امتحانات قادمة</p>
                <p className="text-xl font-bold text-white">{stats.upcomingExams}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-purple-600/20 to-violet-600/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">رسائل مرسلة</p>
                <p className="text-xl font-bold text-white">{stats.sentMessages}</p>
              </div>
              <Send className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <UserPlus className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.newStudentsToday}</p>
            <p className="text-slate-500 text-sm">تسجيلات اليوم</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.absentToday}</p>
            <p className="text-slate-500 text-sm">غائبين اليوم</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.lateToday}</p>
            <p className="text-slate-500 text-sm">متأخرين اليوم</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Wallet className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.feesCollected)}</p>
            <p className="text-slate-500 text-sm">رسوم محصلة اليوم</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="نسبة الحضور الأسبوعي" type="bar" data={attendanceData} dataKey="value" nameKey="name" />
        <ChartCard title="التسجيلات الشهرية" type="line" data={registrationData} dataKey="value" nameKey="name" />
      </div>

      {/* Recent Students & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">آخر التلاميذ المسجلين</CardTitle>
              <CardDescription className="text-slate-400">قائمة بأحدث التلاميذ</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700" onClick={() => setActiveTab('students')}>
              عرض الكل
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400 text-right">التلميذ</TableHead>
                  <TableHead className="text-slate-400 text-right">رقم التسجيل</TableHead>
                  <TableHead className="text-slate-400 text-right">القسم</TableHead>
                  <TableHead className="text-slate-400 text-right">الرسوم</TableHead>
                  <TableHead className="text-slate-400 text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.slice(0, 5).map((student) => (
                  <TableRow key={student.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell className="text-white">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">{student.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {student.user.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{student.admissionNo}</TableCell>
                    <TableCell className="text-slate-300">{student.class?.name || "غير محدد"}</TableCell>
                    <TableCell>
                      <Badge className={student.fees === 'paid' ? 'bg-green-500' : student.fees === 'partial' ? 'bg-amber-500' : 'bg-red-500'}>
                        {student.fees === 'paid' ? 'مدفوع' : student.fees === 'partial' ? 'جزئي' : 'غير مدفوع'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={student.status === 'active' ? 'bg-green-500' : 'bg-slate-500'}>
                        {student.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => { setModalType('addStudent'); setShowModal(true); }}>
                <UserPlus className="w-5 h-5" />
                تسجيل تلميذ جديد
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('attendance')}>
                <ClipboardList className="w-5 h-5" />
                تسجيل الحضور
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('exams')}>
                <FileText className="w-5 h-5" />
                إنشاء امتحان
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => { setModalType('sendNotification'); setShowModal(true); }}>
                <Bell className="w-5 h-5" />
                إرسال إشعار
              </Button>
              <Button className="w-full justify-start gap-3 bg-slate-700 hover:bg-slate-600 text-white h-12" onClick={() => setActiveTab('certificates')}>
                <Stamp className="w-5 h-5" />
                إصدار شهادة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Registrations Tab
  const renderRegistrations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">طلبات التسجيل</h2>
          <p className="text-slate-400">إدارة طلبات تسجيل التلاميذ الجدد</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2" onClick={() => { setModalType('addStudent'); setShowModal(true); }}>
            <Plus className="w-4 h-4" />
            طلب جديد
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-l from-slate-600/20 to-slate-700/20 border-slate-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">إجمالي الطلبات</p>
                <p className="text-3xl font-bold text-white">{registrationRequests.length}</p>
              </div>
              <FileText className="w-10 h-10 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-amber-600/20 to-orange-600/20 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-300 text-sm">طلبات معلقة</p>
                <p className="text-3xl font-bold text-white">{registrationRequests.filter(r => r.status === 'pending').length}</p>
              </div>
              <Clock className="w-10 h-10 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">تمت الموافقة</p>
                <p className="text-3xl font-bold text-white">{registrationRequests.filter(r => r.status === 'approved').length}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-red-600/20 to-rose-600/20 border-red-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm">مرفوضة</p>
                <p className="text-3xl font-bold text-white">{registrationRequests.filter(r => r.status === 'rejected').length}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
          الكل ({registrationRequests.length})
        </Button>
        <Button variant="outline" size="sm" className="border-amber-500 text-amber-400 hover:bg-amber-500/10">
          معلقة ({registrationRequests.filter(r => r.status === 'pending').length})
        </Button>
        <Button variant="outline" size="sm" className="border-green-500 text-green-400 hover:bg-green-500/10">
          موافق عليها ({registrationRequests.filter(r => r.status === 'approved').length})
        </Button>
        <Button variant="outline" size="sm" className="border-red-500 text-red-400 hover:bg-red-500/10">
          مرفوضة ({registrationRequests.filter(r => r.status === 'rejected').length})
        </Button>
      </div>

      {/* Registration Requests List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">قائمة الطلبات</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input placeholder="بحث..." className="pr-9 w-64 bg-slate-700/50 border-slate-600" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button variant="outline" size="icon" className="border-slate-600">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[600px]">
            <div className="space-y-4">
              {registrationRequests
                .filter(r => r.studentName.includes(searchQuery) || r.parentName.includes(searchQuery))
                .map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14">
                          <AvatarFallback className="bg-blue-500 text-white text-lg">{request.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-white font-bold text-lg">{request.studentName}</h4>
                          <p className="text-slate-400 text-sm">ولي الأمر: {request.parentName}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-slate-500 text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(request.date)}
                            </span>
                            <span className="text-slate-500 text-xs flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {request.level}
                            </span>
                            <span className="text-slate-500 text-xs flex items-center gap-1" dir="ltr">
                              <Phone className="w-3 h-3" />
                              {request.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {request.documents.map((doc, i) => (
                              <Badge key={i} variant="outline" className="border-slate-600 text-slate-400 text-xs">{doc}</Badge>
                            ))}
                            {request.documents.length < 3 && (
                              <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                ينقص وثائق
                              </Badge>
                            )}
                          </div>
                          {request.notes && (
                            <p className="text-slate-500 text-xs mt-2">ملاحظات: {request.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={
                          request.status === 'pending' ? 'bg-amber-500' :
                          request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                        }>
                          {request.status === 'pending' ? 'قيد المراجعة' : request.status === 'approved' ? 'موافق عليه' : 'مرفوض'}
                        </Badge>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white h-8" onClick={() => {
                              toast({ title: "تمت الموافقة", description: `تمت الموافقة على طلب ${request.studentName}` });
                            }}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              موافقة
                            </Button>
                            <Button size="sm" variant="destructive" className="h-8" onClick={() => {
                              toast({ title: "تم الرفض", description: `تم رفض طلب ${request.studentName}` });
                            }}>
                              <XCircle className="w-4 h-4 mr-1" />
                              رفض
                            </Button>
                          </div>
                        )}
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4 mr-1" />
                          التفاصيل
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );

  // Render Students Tab
  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">إدارة التلاميذ</h2>
          <p className="text-slate-400">قائمة جميع التلاميذ المسجلين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            تصدير
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2" onClick={() => { setModalType('addStudent'); setShowModal(true); }}>
            <UserPlus className="w-4 h-4" />
            إضافة تلميذ
          </Button>
        </div>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.totalStudents.toLocaleString('en-US')}</p>
            <p className="text-slate-500 text-sm">إجمالي التلاميذ</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{recentStudents.filter(s => s.status === 'active').length}</p>
            <p className="text-slate-500 text-sm">نشط</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{recentStudents.filter(s => s.status === 'inactive').length}</p>
            <p className="text-slate-500 text-sm">غير نشط</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <CreditCard className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{recentStudents.filter(s => s.fees !== 'paid').length}</p>
            <p className="text-slate-500 text-sm">رسوم معلقة</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="البحث عن تلميذ..." className="pr-9 bg-slate-700/50 border-slate-600" />
        </div>
        <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
          <option>جميع الأقسام</option>
          {classes.map(c => <option key={c.id}>{c.name}</option>)}
        </select>
        <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
          <option>جميع الحالات</option>
          <option>نشط</option>
          <option>غير نشط</option>
        </select>
        <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
          <option>حالة الرسوم</option>
          <option>مدفوع</option>
          <option>جزئي</option>
          <option>غير مدفوع</option>
        </select>
      </div>

      {/* Students Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400 text-right">التلميذ</TableHead>
                <TableHead className="text-slate-400 text-right">ولي الأمر</TableHead>
                <TableHead className="text-slate-400 text-right">القسم</TableHead>
                <TableHead className="text-slate-400 text-right">الهاتف</TableHead>
                <TableHead className="text-slate-400 text-right">الحالة</TableHead>
                <TableHead className="text-slate-400 text-right">الرسوم</TableHead>
                <TableHead className="text-slate-400 text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentStudents.map((student) => (
                <TableRow key={student.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-500 text-white">{student.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.user.name}</p>
                        <p className="text-slate-500 text-xs">{student.admissionNo}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{student.parent}</TableCell>
                  <TableCell className="text-slate-300">{student.class?.name}</TableCell>
                  <TableCell className="text-slate-300 text-sm" dir="ltr">{student.phone}</TableCell>
                  <TableCell>
                    <Badge className={student.status === 'active' ? 'bg-green-500' : 'bg-slate-500'}>
                      {student.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={student.fees === 'paid' ? 'bg-green-500' : student.fees === 'partial' ? 'bg-amber-500' : 'bg-red-500'}>
                      {student.fees === 'paid' ? 'مدفوع' : student.fees === 'partial' ? 'جزئي' : 'غير مدفوع'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem className="text-white hover:bg-slate-700"><Eye className="w-4 h-4 mr-2" />عرض الملف</DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-slate-700"><Edit className="w-4 h-4 mr-2" />تعديل</DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-slate-700"><FileText className="w-4 h-4 mr-2" />كشف النقط</DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-slate-700"><Award className="w-4 h-4 mr-2" />شهادة</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem className="text-red-400 hover:bg-slate-700"><Trash2 className="w-4 h-4 mr-2" />حذف</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Render Classes Tab
  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">إدارة الأقسام</h2>
          <p className="text-slate-400">قائمة جميع الأقسام الدراسية</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2" onClick={() => { setModalType('addClass'); setShowModal(true); }}>
          <Plus className="w-4 h-4" />
          إضافة قسم
        </Button>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <School className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{classes.length}</p>
            <p className="text-slate-500 text-sm">إجمالي الأقسام</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
            <p className="text-slate-500 text-sm">إجمالي التلاميذ</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{new Set(classes.map(c => c.teacher)).size}</p>
            <p className="text-slate-500 text-sm">الأساتذة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{Math.round(classes.reduce((sum, c) => sum + c.attendance, 0) / classes.length)}%</p>
            <p className="text-slate-500 text-sm">متوسط الحضور</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, i) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <School className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{cls.name}</h3>
                      <p className="text-slate-500 text-sm">{cls.level}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">{cls.room}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <GraduationCap className="w-4 h-4" />
                    <span>{cls.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{cls.schedule}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-slate-700/30 rounded-lg text-center">
                    <Users className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-white font-bold">{cls.students}</p>
                    <p className="text-slate-500 text-xs">تلميذ</p>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg text-center">
                    <ClipboardList className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-white font-bold">{cls.attendance}%</p>
                    <p className="text-slate-500 text-xs">الحضور</p>
                  </div>
                </div>

                {/* Attendance Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">نسبة الحضور</span>
                    <span className="text-white">{cls.attendance}%</span>
                  </div>
                  <Progress value={cls.attendance} className="h-2" />
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
          <h2 className="text-2xl font-bold text-white">الحضور والغياب</h2>
          <p className="text-slate-400">تسجيل ومتابعة حضور التلاميذ</p>
        </div>
        <div className="flex items-center gap-3">
          <Input type="date" className="bg-slate-700/50 border-slate-600 text-white" defaultValue={new Date().toISOString().split('T')[0]} />
          <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
            <ClipboardList className="w-4 h-4" />
            تسجيل الحضور
          </Button>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-l from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.totalStudents - stats.absentToday}</p>
            <p className="text-green-300 text-sm">حاضر</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-red-600/20 to-rose-600/20 border-red-500/30">
          <CardContent className="p-6 text-center">
            <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.absentToday}</p>
            <p className="text-red-300 text-sm">غائب</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-amber-600/20 to-orange-600/20 border-amber-500/30">
          <CardContent className="p-6 text-center">
            <Clock className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.lateToday}</p>
            <p className="text-amber-300 text-sm">متأخر</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.todayAttendance}%</p>
            <p className="text-blue-300 text-sm">نسبة الحضور</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="نسبة الحضور الأسبوعي" type="bar" data={attendanceData} dataKey="value" nameKey="name" />
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">حضور اليوم حسب القسم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceRecords.filter(r => r.date === new Date().toISOString()).map((record, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <School className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{record.class}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 text-sm">{record.present} حاضر</span>
                    <span className="text-red-400 text-sm">{record.absent} غائب</span>
                    <span className="text-amber-400 text-sm">{record.late} متأخر</span>
                    <Badge className={record.rate >= 95 ? 'bg-green-500' : record.rate >= 90 ? 'bg-blue-500' : 'bg-amber-500'}>
                      {record.rate}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Exams Tab
  const renderExams = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الامتحانات</h2>
          <p className="text-slate-400">إدارة الامتحانات والاختبارات</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2" onClick={() => { setModalType('addExam'); setShowModal(true); }}>
          <Plus className="w-4 h-4" />
          إنشاء امتحان
        </Button>
      </div>

      {/* Exam Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Calendar className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.upcomingExams}</p>
            <p className="text-slate-400 text-sm">امتحانات مجدولة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <CheckSquare className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-slate-400 text-sm">امتحانات منجزة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Award className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">78%</p>
            <p className="text-slate-400 text-sm">معدل النجاح</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Users className="w-10 h-10 text-purple-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{exams.reduce((sum, e) => sum + e.students, 0)}</p>
            <p className="text-slate-400 text-sm">مشاركين</p>
          </CardContent>
        </Card>
      </div>

      {/* Exams List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">قائمة الامتحانات</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-amber-500 text-amber-400">
                المجدولة
              </Button>
              <Button variant="outline" size="sm" className="border-green-500 text-green-400">
                المنجزة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exams.map((exam) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{exam.name}</h4>
                      <p className="text-slate-500 text-sm">{exam.class} • {exam.students} تلميذ • المدة: {exam.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-white font-medium">{exam.date}</p>
                      <Badge className={exam.status === 'scheduled' ? 'bg-amber-500' : 'bg-green-500'}>
                        {exam.status === 'scheduled' ? 'مجدول' : 'منجز'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Certificates Tab
  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الشهادات</h2>
          <p className="text-slate-400">إصدار وإدارة الشهادات المدرسية</p>
        </div>
      </div>

      {/* Certificate Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'شهادة مدرسية', icon: Award, desc: 'شهادة قيد الدراسة', color: 'blue', count: 45 },
          { title: 'شهادة نجاح', icon: Award, desc: 'شهادة النجاح في الامتحانات', color: 'green', count: 32 },
          { title: 'شهادة انتقال', icon: Award, desc: 'شهادة الانتقال لمستوى أعلى', color: 'purple', count: 28 },
          { title: 'كشف النقط', icon: FileText, desc: 'كشف نقط الفصل أو السنة', color: 'amber', count: 156 },
          { title: 'بطاقة التلميذ', icon: Users, desc: 'بطاقة تعريف التلميذ', color: 'cyan', count: 89 },
          { title: 'شهادة حسن السيرة', icon: CheckCircle, desc: 'شهادة السلوك والانضباط', color: 'rose', count: 23 },
        ].map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-${cert.color}-500/20 rounded-xl flex items-center justify-center`}>
                    <cert.icon className={`w-6 h-6 text-${cert.color}-400`} />
                  </div>
                  <Badge variant="outline" className="border-slate-600 text-slate-400">
                    {cert.count} شهادة
                  </Badge>
                </div>
                <h3 className="text-white font-bold mb-2">{cert.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{cert.desc}</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                    <Printer className="w-4 h-4 mr-2" />
                    إصدار
                  </Button>
                  <Button variant="outline" size="icon" className="border-slate-600 text-white hover:bg-slate-700">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Certificate Generator */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">إصدار شهادة سريعة</CardTitle>
          <CardDescription className="text-slate-400">ابحث عن تلميذ وأصدر له شهادة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input placeholder="البحث عن تلميذ..." className="pr-9 bg-slate-700/50 border-slate-600" />
            </div>
            <select className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
              <option>نوع الشهادة</option>
              <option>شهادة مدرسية</option>
              <option>شهادة نجاح</option>
              <option>كشف النقط</option>
              <option>شهادة حسن السيرة</option>
            </select>
            <select className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
              <option>اللغة</option>
              <option>العربية</option>
              <option>French</option>
            </select>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Printer className="w-4 h-4 mr-2" />
              إصدار الشهادة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Communication Tab
  const renderCommunication = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">التواصل</h2>
          <p className="text-slate-400">التواصل الجماعي مع أولياء الأمور والأساتذة</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2" onClick={() => { setModalType('sendMessage'); setShowModal(true); }}>
          <Send className="w-4 h-4" />
          رسالة جديدة
        </Button>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Send className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.sentMessages}</p>
            <p className="text-slate-500 text-sm">رسائل مرسلة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
            <p className="text-slate-500 text-sm">مستقبلين</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-slate-500 text-sm">معدل التسليم</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">85%</p>
            <p className="text-slate-500 text-sm">معدل القراءة</p>
          </CardContent>
        </Card>
      </div>

      {/* Send Message Form */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">إرسال رسالة جماعية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">المستلمون</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                <option>جميع أولياء الأمور</option>
                <option>أولياء أمور قسم معين</option>
                <option>جميع الأساتذة</option>
                <option>الإداريين</option>
                <option>جميع المستخدمين</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">نوع الرسالة</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                <option>إشعار عادي</option>
                <option>إشعار هام</option>
                <option>تذكير</option>
                <option>دعوة</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">عنوان الرسالة</label>
            <Input placeholder="أدخل عنوان الرسالة..." className="bg-slate-700/50 border-slate-600" />
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">محتوى الرسالة</label>
            <textarea 
              placeholder="أدخل محتوى الرسالة..." 
              rows={4} 
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white resize-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                إرسال عبر البريد الإلكتروني
              </label>
              <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                إرسال عبر SMS
              </label>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => {
              toast({ title: "تم الإرسال", description: "تم إرسال الرسالة بنجاح" });
            }}>
              <Send className="w-4 h-4 mr-2" />
              إرسال الرسالة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">آخر الرسائل المرسلة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'تذكير بموعد الاجتماع', recipients: 'جميع أولياء الأمور', date: new Date().toISOString(), status: 'sent' },
              { title: 'إعلان عن بدء التسجيل', recipients: 'جميع المستخدمين', date: new Date(Date.now() - 86400000).toISOString(), status: 'sent' },
              { title: 'نتائج الامتحانات', recipients: 'أولياء أمور السنة السادسة', date: new Date(Date.now() - 172800000).toISOString(), status: 'sent' },
            ].map((msg, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{msg.title}</p>
                    <p className="text-slate-500 text-sm">إلى: {msg.recipients}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-slate-500 text-sm">{formatDate(msg.date)}</p>
                  <Badge className="bg-green-500">تم الإرسال</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'registrations':
        return renderRegistrations();
      case 'students':
        return renderStudents();
      case 'classes':
        return renderClasses();
      case 'attendance':
        return renderAttendance();
      case 'exams':
        return renderExams();
      case 'certificates':
        return renderCertificates();
      case 'communication':
        return renderCommunication();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout
      user={user}
      title="لوحة تحكم الإداري"
      sidebar={sidebar}
      notifications={stats.pendingRegistrations}
    >
      {renderContent()}

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>
              {modalType === 'addStudent' && 'تسجيل تلميذ جديد'}
              {modalType === 'addClass' && 'إضافة قسم جديد'}
              {modalType === 'addExam' && 'إنشاء امتحان جديد'}
              {modalType === 'sendNotification' && 'إرسال إشعار'}
              {modalType === 'sendMessage' && 'إرسال رسالة'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {modalType === 'addStudent' && 'أدخل بيانات التلميذ الجديد'}
              {modalType === 'addClass' && 'أدخل بيانات القسم الجديد'}
              {modalType === 'addExam' && 'أدخل بيانات الامتحان الجديد'}
              {modalType === 'sendNotification' && 'أدخل محتوى الإشعار'}
              {modalType === 'sendMessage' && 'أدخل محتوى الرسالة'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {modalType === 'addStudent' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="الاسم الكامل" className="bg-slate-700/50 border-slate-600" />
                  <Input placeholder="تاريخ الميلاد" type="date" className="bg-slate-700/50 border-slate-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="اسم ولي الأمر" className="bg-slate-700/50 border-slate-600" />
                  <Input placeholder="رقم الهاتف" className="bg-slate-700/50 border-slate-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                    <option>اختر القسم</option>
                    {classes.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                  <Input placeholder="البريد الإلكتروني" type="email" className="bg-slate-700/50 border-slate-600" />
                </div>
              </>
            )}
            {modalType === 'addClass' && (
              <>
                <Input placeholder="اسم القسم" className="bg-slate-700/50 border-slate-600" />
                <div className="grid grid-cols-2 gap-4">
                  <select className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                    <option>المستوى</option>
                    <option>ابتدائي</option>
                    <option>إعدادي</option>
                  </select>
                  <Input placeholder="القاعة" className="bg-slate-700/50 border-slate-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="وقت البداية" type="time" className="bg-slate-700/50 border-slate-600" />
                  <Input placeholder="وقت النهاية" type="time" className="bg-slate-700/50 border-slate-600" />
                </div>
              </>
            )}
            {modalType === 'addExam' && (
              <>
                <Input placeholder="اسم الامتحان" className="bg-slate-700/50 border-slate-600" />
                <div className="grid grid-cols-2 gap-4">
                  <select className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                    <option>اختر القسم</option>
                    {classes.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                  <Input placeholder="التاريخ" type="date" className="bg-slate-700/50 border-slate-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="المدة" className="bg-slate-700/50 border-slate-600" />
                  <Input placeholder="الدرجة القصوى" type="number" className="bg-slate-700/50 border-slate-600" />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)} className="border-slate-600 text-white">
              إلغاء
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => {
              toast({ title: "تم بنجاح", description: "تم إضافة العنصر بنجاح" });
              setShowModal(false);
            }}>
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
