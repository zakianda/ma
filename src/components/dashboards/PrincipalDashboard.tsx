"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bell,
  FileText,
  Settings,
  BarChart3,
  UserCog,
  School,
  ClipboardList,
  Building2,
  UserPlus,
  Megaphone,
  Receipt,
  Briefcase,
  Target,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  CreditCard,
  Wallet,
  Landmark,
  FileBarChart,
  Shield,
  Building,
  Globe,
  Zap,
  AlertTriangle,
  MessageSquare,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronRight,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Users2,
  TrendingUpIcon,
  BarChart2,
  PieChartIcon,
  RefreshCw,
  ExternalLink,
  FileCheck,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  Globe2,
  Languages,
  Palette,
  BellRing,
  Lock,
  Database,
  Server
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

interface PrincipalDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

type TabType = 'overview' | 'branches' | 'users' | 'academic' | 'finance' | 'hr' | 'reports' | 'settings';

export function PrincipalDashboard({ user }: PrincipalDashboardProps) {
  const { formatCurrency, formatDate } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  
  const [stats, setStats] = useState({
    totalStudents: 2500,
    totalTeachers: 150,
    totalClasses: 85,
    totalBranches: 3,
    totalRevenue: 1250000,
    monthlyExpenses: 450000,
    attendanceRate: 94,
    activeAnnouncements: 12,
    pendingRequests: 8,
    newRegistrations: 45,
    successRate: 92,
    averageGrade: 78,
    totalParents: 1850,
    pendingDocuments: 23
  });

  const [announcements, setAnnouncements] = useState([
    { id: "1", title: "بدء العام الدراسي الجديد", content: "يسرنا الإعلام ببدء العام الدراسي الجديد 2025-2026", priority: "high", publishDate: new Date().toISOString(), status: "active", views: 1250 },
    { id: "2", title: "اجتماع أولياء الأمور", content: "سيعقد اجتماع أولياء الأمور يوم الخميس القادم", priority: "normal", publishDate: new Date(Date.now() - 86400000).toISOString(), status: "active", views: 850 },
    { id: "3", title: "إجازة عيد الأضحى", content: "تعلن إدارة المدرسة عن إجازة عيد الأضحى المباركة", priority: "high", publishDate: new Date(Date.now() - 172800000).toISOString(), status: "expired", views: 2100 },
    { id: "4", title: "نتائج المسابقة العلمية", content: "تم الإعلان عن نتائج المسابقة العلمية السنوية", priority: "normal", publishDate: new Date(Date.now() - 259200000).toISOString(), status: "active", views: 650 },
    { id: "5", title: "تحديث النظام التعليمي", content: "تم تحديث المنهج الدراسي للسنة الجديدة", priority: "low", publishDate: new Date(Date.now() - 345600000).toISOString(), status: "active", views: 420 }
  ]);

  const [branches, setBranches] = useState([
    { id: "1", name: "الفرع الرئيسي", location: "شارع محمد الخامس، الدار البيضاء", students: 850, teachers: 45, status: "active", phone: "+212 522 123 456", email: "main@school.ma", capacity: 900, established: "2010" },
    { id: "2", name: "فرع النور", location: "حي السلام، الدار البيضاء", students: 620, teachers: 35, status: "active", phone: "+212 522 234 567", email: "nour@school.ma", capacity: 700, established: "2015" },
    { id: "3", name: "فرع الفلاح", location: "شارع الحسن الثاني، الدار البيضاء", students: 480, teachers: 28, status: "active", phone: "+212 522 345 678", email: "falah@school.ma", capacity: 550, established: "2018" },
    { id: "4", name: "فرع الأمل", location: "حي الأمل، المحمدية", students: 320, teachers: 22, status: "inactive", phone: "+212 523 456 789", email: "amal@school.ma", capacity: 400, established: "2020" }
  ]);

  const [recentUsers, setRecentUsers] = useState([
    { id: "1", name: "أحمد محمد", email: "ahmed@school.ma", role: "teacher", status: "active", joinDate: new Date().toISOString(), branch: "الفرع الرئيسي" },
    { id: "2", name: "فاطمة علي", email: "fatima@school.ma", role: "admin", status: "active", joinDate: new Date(Date.now() - 86400000).toISOString(), branch: "فرع النور" },
    { id: "3", name: "محمد سعيد", email: "mohamed@school.ma", role: "teacher", status: "pending", joinDate: new Date(Date.now() - 172800000).toISOString(), branch: "الفرع الرئيسي" },
    { id: "4", name: "سارة أحمد", email: "sara@school.ma", role: "admin", status: "active", joinDate: new Date(Date.now() - 259200000).toISOString(), branch: "فرع الفلاح" },
    { id: "5", name: "خالد العمري", email: "khalid@school.ma", role: "teacher", status: "active", joinDate: new Date(Date.now() - 345600000).toISOString(), branch: "الفرع الرئيسي" }
  ]);

  const [financialData, setFinancialData] = useState({
    monthlyRevenue: [
      { name: "شتنبر", value: 180000 },
      { name: "أكتوبر", value: 195000 },
      { name: "نونبر", value: 175000 },
      { name: "دجنبر", value: 165000 },
      { name: "يناير", value: 200000 },
      { name: "فبراير", value: 185000 }
    ],
    expenseBreakdown: [
      { name: "رواتب", value: 250000 },
      { name: "صيانة", value: 45000 },
      { name: "مستلزمات", value: 35000 },
      { name: "خدمات", value: 25000 },
      { name: "أخرى", value: 45000 }
    ],
    revenueByBranch: [
      { name: "الفرع الرئيسي", value: 550000 },
      { name: "فرع النور", value: 420000 },
      { name: "فرع الفلاح", value: 280000 }
    ]
  });

  const [staffData, setStaffData] = useState({
    departments: [
      { name: "التعليم الابتدائي", count: 65, avgPerformance: 92, vacancy: 3 },
      { name: "التعليم الإعدادي", count: 45, avgPerformance: 88, vacancy: 5 },
      { name: "الإدارة", count: 25, avgPerformance: 90, vacancy: 2 },
      { name: "الدعم الفني", count: 15, avgPerformance: 85, vacancy: 1 }
    ],
    recentEvaluations: [
      { name: "أ. محمد الأمين", score: 95, department: "الرياضيات", date: new Date().toISOString(), branch: "الفرع الرئيسي" },
      { name: "أ. فاطمة الزهراء", score: 88, department: "اللغة العربية", date: new Date(Date.now() - 86400000).toISOString(), branch: "فرع النور" },
      { name: "أ. خالد البركاني", score: 92, department: "العلوم", date: new Date(Date.now() - 172800000).toISOString(), branch: "الفرع الرئيسي" },
      { name: "أ. سارة المنصوري", score: 85, department: "اللغة الإنجليزية", date: new Date(Date.now() - 259200000).toISOString(), branch: "فرع الفلاح" },
      { name: "أ. أحمد العلوي", score: 90, department: "التربية الإسلامية", date: new Date(Date.now() - 345600000).toISOString(), branch: "الفرع الرئيسي" }
    ]
  });

  const attendanceData = [
    { name: "الأحد", value: 95 },
    { name: "الإثنين", value: 92 },
    { name: "الثلاثاء", value: 88 },
    { name: "الأربعاء", value: 94 },
    { name: "الخميس", value: 91 }
  ];

  const gradesDistribution = [
    { name: "ممتاز", value: 35, color: "#10b981" },
    { name: "جيد جداً", value: 28, color: "#3b82f6" },
    { name: "جيد", value: 22, color: "#f59e0b" },
    { name: "مقبول", value: 12, color: "#f97316" },
    { name: "ضعيف", value: 3, color: "#ef4444" }
  ];

  const academicLevels = [
    { level: 'السنة الأولى', students: 450, avgGrade: 82, attendance: 94, topStudents: 45 },
    { level: 'السنة الثانية', students: 420, avgGrade: 78, attendance: 92, topStudents: 42 },
    { level: 'السنة الثالثة', students: 380, avgGrade: 80, attendance: 93, topStudents: 38 },
    { level: 'السنة الرابعة', students: 350, avgGrade: 76, attendance: 91, topStudents: 35 },
    { level: 'السنة الخامسة', students: 320, avgGrade: 79, attendance: 95, topStudents: 32 },
    { level: 'السنة السادسة', students: 300, avgGrade: 85, attendance: 96, topStudents: 30 },
  ];

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: "نظرة عامة", onClick: () => setActiveTab('overview') },
    { id: 'branches', icon: Building2, label: "إدارة الفروع", onClick: () => setActiveTab('branches') },
    { id: 'users', icon: Users, label: "المستخدمين والصلاحيات", onClick: () => setActiveTab('users') },
    { id: 'academic', icon: GraduationCap, label: "الإدارة الأكاديمية", onClick: () => setActiveTab('academic') },
    { id: 'finance', icon: DollarSign, label: "الإدارة المالية", onClick: () => setActiveTab('finance') },
    { id: 'hr', icon: Briefcase, label: "الموارد البشرية", onClick: () => setActiveTab('hr') },
    { id: 'reports', icon: FileBarChart, label: "التقارير", onClick: () => setActiveTab('reports') },
    { id: 'settings', icon: Settings, label: "الإعدادات", onClick: () => setActiveTab('settings') }
  ];

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      title="لوحة المدير العام"
      icon={GraduationCap}
      gradient="from-emerald-500 to-teal-600"
      user={user}
      activeTab={activeTab}
      onSettingsClick={() => setActiveTab('settings')}
    />
  );

  // Handle tab change from sidebar
  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType);
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-l from-emerald-600/30 to-teal-600/30 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <GraduationCap className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">مرحباً، {user.name}</h2>
                  <p className="text-emerald-300">نتمنى لك يوماً موفقاً في إدارة المؤسسة</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" onClick={() => { setModalType('addAnnouncement'); setShowModal(true); }}>
                  <Plus className="w-4 h-4" />
                  إضافة جديد
                </Button>
                <Button variant="outline" className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10">
                  <Download className="w-4 h-4 mr-2" />
                  تصدير تقرير
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard
          title="إجمالي التلاميذ"
          value={stats.totalStudents.toLocaleString('en-US')}
          icon={Users}
          gradient="from-blue-500 to-cyan-600"
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="إجمالي الأساتذة"
          value={stats.totalTeachers.toLocaleString('en-US')}
          icon={UserCog}
          gradient="from-green-500 to-emerald-600"
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatCard
          title="إجمالي الأقسام"
          value={stats.totalClasses.toLocaleString('en-US')}
          icon={School}
          gradient="from-orange-500 to-amber-600"
        />
        <StatCard
          title="الفروع"
          value={stats.totalBranches}
          icon={Building2}
          gradient="from-purple-500 to-violet-600"
        />
        <StatCard
          title="نسبة الحضور"
          value={`${stats.attendanceRate}%`}
          icon={ClipboardList}
          gradient="from-teal-500 to-cyan-600"
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatCard
          title="طلبات معلقة"
          value={stats.pendingRequests}
          icon={Clock}
          gradient="from-rose-500 to-pink-600"
        />
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-l from-emerald-600/20 to-green-600/20 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+12.5% من الشهر الماضي</span>
                </div>
              </div>
              <div className="p-4 bg-emerald-500/20 rounded-xl">
                <Wallet className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-rose-600/20 to-pink-600/20 border-rose-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-300 text-sm">المصاريف الشهرية</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(stats.monthlyExpenses)}</p>
                <div className="flex items-center gap-1 mt-2 text-rose-400 text-sm">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>-3.2% من الشهر الماضي</span>
                </div>
              </div>
              <div className="p-4 bg-rose-500/20 rounded-xl">
                <CreditCard className="w-8 h-8 text-rose-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-indigo-600/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">التسجيلات الجديدة</p>
                <p className="text-3xl font-bold text-white">{stats.newRegistrations}</p>
                <div className="flex items-center gap-1 mt-2 text-blue-400 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+18 هذا الأسبوع</span>
                </div>
              </div>
              <div className="p-4 bg-blue-500/20 rounded-xl">
                <UserPlus className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">نسبة النجاح</p>
                <p className="text-xl font-bold text-white">{stats.successRate}%</p>
              </div>
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">المعدل العام</p>
                <p className="text-xl font-bold text-white">{stats.averageGrade}%</p>
              </div>
              <Award className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">أولياء الأمور</p>
                <p className="text-xl font-bold text-white">{stats.totalParents.toLocaleString('en-US')}</p>
              </div>
              <Users2 className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">وثائق معلقة</p>
                <p className="text-xl font-bold text-white">{stats.pendingDocuments}</p>
              </div>
              <FileCheck className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="نسبة الحضور الأسبوعي"
          type="bar"
          data={attendanceData}
          dataKey="value"
          nameKey="name"
        />
        <ChartCard
          title="توزيع الدرجات"
          type="pie"
          data={gradesDistribution}
          dataKey="value"
          nameKey="name"
        />
        <ChartCard
          title="الإيرادات الشهرية"
          type="line"
          data={financialData.monthlyRevenue}
          dataKey="value"
          nameKey="name"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-400" />
                آخر الإعلانات
              </CardTitle>
              <CardDescription className="text-slate-400">الإعلانات الأخيرة للمؤسسة</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
              عرض الكل
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-3">
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{announcement.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={
                          announcement.priority === "high" ? "bg-red-500" : 
                          announcement.priority === "normal" ? "bg-blue-500" : "bg-slate-500"
                        }>
                          {announcement.priority === "high" ? "مهم" : announcement.priority === "normal" ? "عادي" : "منخفض"}
                        </Badge>
                        <Badge variant="outline" className={announcement.status === "active" ? "border-green-500 text-green-400" : "border-slate-500 text-slate-400"}>
                          {announcement.status === "active" ? "نشط" : "منتهي"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2">{announcement.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                        <p className="text-slate-500 text-xs">{formatDate(announcement.publishDate)}</p>
                        <p className="text-slate-500 text-xs flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {announcement.views}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-400 hover:text-white">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-400 hover:text-white">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Quick Actions & Branches */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                إجراءات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-20 flex flex-col gap-2 bg-slate-700 hover:bg-slate-600 text-white" onClick={() => { setModalType('addUser'); setShowModal(true); }}>
                  <UserPlus className="w-5 h-5" />
                  <span className="text-xs">إضافة مستخدم</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-slate-700 hover:bg-slate-600 text-white" onClick={() => setActiveTab('branches')}>
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs">إضافة فرع</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-slate-700 hover:bg-slate-600 text-white" onClick={() => setActiveTab('reports')}>
                  <FileBarChart className="w-5 h-5" />
                  <span className="text-xs">عرض التقارير</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-slate-700 hover:bg-slate-600 text-white" onClick={() => { setModalType('addAnnouncement'); setShowModal(true); }}>
                  <Megaphone className="w-5 h-5" />
                  <span className="text-xs">إرسال إعلان</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Branches Summary */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white text-base">ملخص الفروع</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300" onClick={() => setActiveTab('branches')}>
                المزيد <ChevronRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {branches.filter(b => b.status === 'active').map((branch, i) => (
                  <div key={branch.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Building className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{branch.name}</p>
                        <p className="text-slate-500 text-xs">{branch.location.split('،')[0]}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-bold">{branch.students}</p>
                      <p className="text-slate-500 text-xs">تلميذ</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Render Branches Tab
  const renderBranches = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">إدارة الفروع</h2>
          <p className="text-slate-400">إدارة جميع فروع المؤسسة التعليمية</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" onClick={() => { setModalType('addBranch'); setShowModal(true); }}>
          <Plus className="w-4 h-4" />
          إضافة فرع جديد
        </Button>
      </div>

      {/* Branch Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Building2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{branches.length}</p>
            <p className="text-slate-500 text-sm">إجمالي الفروع</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{branches.filter(b => b.status === 'active').length}</p>
            <p className="text-slate-500 text-sm">فروع نشطة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{branches.reduce((sum, b) => sum + b.students, 0).toLocaleString('en-US')}</p>
            <p className="text-slate-500 text-sm">إجمالي التلاميذ</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{branches.reduce((sum, b) => sum + b.teachers, 0)}</p>
            <p className="text-slate-500 text-sm">إجمالي الأساتذة</p>
          </CardContent>
        </Card>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch, i) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors ${branch.status !== 'active' ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{branch.name}</h3>
                      <p className="text-slate-500 text-sm">{branch.location}</p>
                    </div>
                  </div>
                  <Badge className={branch.status === "active" ? "bg-emerald-500" : "bg-slate-500"}>
                    {branch.status === "active" ? "نشط" : "غير نشط"}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{branch.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm" dir="ltr">
                    <Phone className="w-4 h-4" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{branch.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">{branch.students}</p>
                    <p className="text-slate-500 text-xs">تلميذ</p>
                  </div>
                  <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-green-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">{branch.teachers}</p>
                    <p className="text-slate-500 text-xs">أستاذ</p>
                  </div>
                  <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <School className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">{branch.capacity}</p>
                    <p className="text-slate-500 text-xs">السعة</p>
                  </div>
                </div>

                {/* Capacity Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">نسبة الإشغال</span>
                    <span className="text-white">{Math.round((branch.students / branch.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(branch.students / branch.capacity) * 100} className="h-2" />
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-slate-400">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem className="text-white hover:bg-slate-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        إضافة موظف
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">
                        <FileBarChart className="w-4 h-4 mr-2" />
                        تقارير الفرع
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        حذف الفرع
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Users Tab
  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">المستخدمين والصلاحيات</h2>
          <p className="text-slate-400">إدارة حسابات المستخدمين وصلاحياتهم</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" onClick={() => { setModalType('addUser'); setShowModal(true); }}>
          <UserPlus className="w-4 h-4" />
          إضافة مستخدم
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-slate-500 text-sm">مديرين</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <UserCog className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-slate-500 text-sm">إداريين</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">150</p>
            <p className="text-slate-500 text-sm">أساتذة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">2,500</p>
            <p className="text-slate-500 text-sm">أولياء الأمور</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users2 className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">2,500</p>
            <p className="text-slate-500 text-sm">تلاميذ</p>
          </CardContent>
        </Card>
      </div>

      {/* Permissions Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">مصفوفة الصلاحيات</CardTitle>
          <CardDescription className="text-slate-400">نظرة عامة على صلاحيات الأدوار</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">الصلاحية</TableHead>
                  <TableHead className="text-slate-400 text-center">المدير العام</TableHead>
                  <TableHead className="text-slate-400 text-center">الإداري</TableHead>
                  <TableHead className="text-slate-400 text-center">الأستاذ</TableHead>
                  <TableHead className="text-slate-400 text-center">ولي الأمر</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { permission: 'إدارة الفروع', principal: true, admin: true, teacher: false, parent: false },
                  { permission: 'إدارة المستخدمين', principal: true, admin: true, teacher: false, parent: false },
                  { permission: 'إدارة التلاميذ', principal: true, admin: true, teacher: true, parent: false },
                  { permission: 'إدارة الدرجات', principal: true, admin: true, teacher: true, parent: false },
                  { permission: 'عرض التقارير', principal: true, admin: true, teacher: true, parent: true },
                  { permission: 'إدارة الحضور', principal: true, admin: true, teacher: true, parent: false },
                  { permission: 'إرسال الإشعارات', principal: true, admin: true, teacher: true, parent: false },
                  { permission: 'الإعدادات', principal: true, admin: false, teacher: false, parent: false },
                ].map((row, i) => (
                  <TableRow key={i} className="border-slate-700">
                    <TableCell className="text-white">{row.permission}</TableCell>
                    <TableCell className="text-center">
                      {row.principal ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.admin ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.teacher ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.parent ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">قائمة المستخدمين</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input placeholder="بحث..." className="pr-9 w-64 bg-slate-700/50 border-slate-600" />
              </div>
              <select className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm">
                <option>جميع الأدوار</option>
                <option>مديرين</option>
                <option>إداريين</option>
                <option>أساتذة</option>
              </select>
              <Button variant="outline" size="icon" className="border-slate-600">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">المستخدم</TableHead>
                <TableHead className="text-slate-400">الدور</TableHead>
                <TableHead className="text-slate-400">الفرع</TableHead>
                <TableHead className="text-slate-400">الحالة</TableHead>
                <TableHead className="text-slate-400">تاريخ الانضمام</TableHead>
                <TableHead className="text-slate-400">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((u) => (
                <TableRow key={u.id} className="border-slate-700 hover:bg-slate-700/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-emerald-500 text-white text-sm">
                          {u.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{u.name}</p>
                        <p className="text-slate-500 text-xs">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      u.role === 'admin' ? 'border-blue-500 text-blue-400' :
                      u.role === 'teacher' ? 'border-green-500 text-green-400' :
                      'border-purple-500 text-purple-400'
                    }>
                      {u.role === 'admin' ? 'إداري' : u.role === 'teacher' ? 'أستاذ' : 'ولي أمر'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">{u.branch}</TableCell>
                  <TableCell>
                    <Badge className={u.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}>
                      {u.status === 'active' ? 'نشط' : 'معلق'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {formatDate(u.joinDate)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Render Finance Tab
  const renderFinance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الإدارة المالية</h2>
          <p className="text-slate-400">تقارير الإيرادات والمصاريف والميزانية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            تصدير PDF
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <FileBarChart className="w-4 h-4" />
            تقرير مالي
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-l from-emerald-600/20 to-green-600/20 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+12.5% هذا الشهر</span>
                </div>
              </div>
              <Wallet className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-rose-600/20 to-pink-600/20 border-rose-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-300 text-sm">المصاريف الشهرية</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.monthlyExpenses)}</p>
                <div className="flex items-center gap-1 mt-1 text-rose-400 text-xs">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>-3.2% هذا الشهر</span>
                </div>
              </div>
              <CreditCard className="w-8 h-8 text-rose-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-blue-600/20 to-indigo-600/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">صافي الربح</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue - stats.monthlyExpenses * 12)}</p>
                <div className="flex items-center gap-1 mt-1 text-blue-400 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>نمو مستقر</span>
                </div>
              </div>
              <Landmark className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-l from-amber-600/20 to-orange-600/20 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-300 text-sm">نسبة التحصيل</p>
                <p className="text-2xl font-bold text-white">87%</p>
                <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs">
                  <Target className="w-3 h-3" />
                  <span>من المستهدف 90%</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="الإيرادات الشهرية"
          type="line"
          data={financialData.monthlyRevenue}
          dataKey="value"
          nameKey="name"
        />
        <ChartCard
          title="توزيع المصاريف"
          type="pie"
          data={financialData.expenseBreakdown}
          dataKey="value"
          nameKey="name"
        />
      </div>

      {/* Revenue by Branch */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">الإيرادات حسب الفرع</CardTitle>
          <CardDescription className="text-slate-400">توزيع الإيرادات على الفروع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialData.revenueByBranch.map((branch, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{branch.name}</p>
                    <p className="text-slate-500 text-sm">{((branch.value / stats.totalRevenue) * 100).toFixed(1)}% من الإجمالي</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">{formatCurrency(branch.value)}</p>
                  <Progress value={(branch.value / stats.totalRevenue) * 100} className="w-24 h-2 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render HR Tab
  const renderHR = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الموارد البشرية</h2>
          <p className="text-slate-400">تقييم الموظفين وسجل الحضور والعقود</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" onClick={() => { setModalType('addEmployee'); setShowModal(true); }}>
          <Plus className="w-4 h-4" />
          إضافة موظف
        </Button>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{staffData.departments.reduce((sum, d) => sum + d.count, 0)}</p>
            <p className="text-slate-500 text-sm">إجمالي الموظفين</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">89%</p>
            <p className="text-slate-500 text-sm">متوسط الأداء</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{staffData.departments.reduce((sum, d) => sum + d.vacancy, 0)}</p>
            <p className="text-slate-500 text-sm">مناصب شاغرة</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">92%</p>
            <p className="text-slate-500 text-sm">نسبة الرضا</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">الأقسام والإدارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {staffData.departments.map((dept, i) => (
              <Card key={i} className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white font-bold">{dept.name}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400">{dept.count}</Badge>
                      {dept.vacancy > 0 && (
                        <Badge variant="outline" className="border-red-500 text-red-400">{dept.vacancy} شاغر</Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">الأداء</span>
                      <span className="text-white font-medium">{dept.avgPerformance}%</span>
                    </div>
                    <Progress value={dept.avgPerformance} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Evaluations */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">آخر التقييمات</CardTitle>
          <CardDescription className="text-slate-400">تقييمات أداء الموظفين</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffData.recentEvaluations.map((eval_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-emerald-500 text-white">
                      {eval_.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{eval_.name}</p>
                    <p className="text-slate-500 text-sm">{eval_.department} • {eval_.branch}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{eval_.score}</p>
                    <p className="text-slate-500 text-xs">درجة</p>
                  </div>
                  <Badge className={eval_.score >= 90 ? 'bg-emerald-500' : eval_.score >= 80 ? 'bg-blue-500' : 'bg-amber-500'}>
                    {eval_.score >= 90 ? 'ممتاز' : eval_.score >= 80 ? 'جيد جداً' : 'جيد'}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                    التفاصيل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Academic Tab
  const renderAcademic = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الإدارة الأكاديمية</h2>
          <p className="text-slate-400">إعداد الجداول والنتائج وتتبع الأداء</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <Calendar className="w-4 h-4 mr-2" />
            الجداول
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Award className="w-4 h-4" />
            النتائج
          </Button>
        </div>
      </div>

      {/* Academic Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="السنة الدراسية" value="2025-2026" icon={Calendar} gradient="from-blue-500 to-cyan-600" />
        <StatCard title="الفصل الحالي" value="الثاني" icon={BookOpen} gradient="from-green-500 to-emerald-600" />
        <StatCard title="المعدل العام" value={`${stats.averageGrade}%`} icon={Award} gradient="from-orange-500 to-amber-600" />
        <StatCard title="نسبة النجاح" value={`${stats.successRate}%`} icon={Target} gradient="from-purple-500 to-violet-600" />
      </div>

      {/* Performance by Level */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">الأداء حسب المستوى الدراسي</CardTitle>
            <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
              <Download className="w-4 h-4 mr-2" />
              تصدير
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicLevels.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{level.level}</p>
                      <p className="text-slate-500 text-sm">{level.students} تلميذ • {level.topStudents} متفوق</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-white font-bold">{level.avgGrade}%</p>
                      <p className="text-slate-500 text-xs">المعدل</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold">{level.attendance}%</p>
                      <p className="text-slate-500 text-xs">الحضور</p>
                    </div>
                    <Progress value={level.avgGrade} className="w-20 h-2" />
                    <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
                      التفاصيل <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="توزيع الدرجات" type="pie" data={gradesDistribution} dataKey="value" nameKey="name" />
        <ChartCard title="نسبة الحضور الأسبوعي" type="bar" data={attendanceData} dataKey="value" nameKey="name" />
      </div>
    </div>
  );

  // Render Reports Tab
  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">التقارير والتحليلات</h2>
          <p className="text-slate-400">تقارير ديناميكية قابلة للتصدير</p>
        </div>
        <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
          <RefreshCw className="w-4 h-4 mr-2" />
          تحديث البيانات
        </Button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'تقرير الحضور', icon: ClipboardList, desc: 'تقرير شامل عن حضور التلاميذ والموظفين', color: 'blue', count: 45 },
          { title: 'تقرير الدرجات', icon: Award, desc: 'تحليل نتائج الامتحانات والاختبارات', color: 'green', count: 32 },
          { title: 'التقرير المالي', icon: DollarSign, desc: 'إيرادات ومصاريف المؤسسة', color: 'amber', count: 24 },
          { title: 'تقرير الموظفين', icon: Briefcase, desc: 'تقييم وأداء الموظفين', color: 'purple', count: 18 },
          { title: 'تقرير التسجيل', icon: UserPlus, desc: 'إحصائيات التسجيل الجديد', color: 'rose', count: 12 },
          { title: 'تقرير شامل', icon: FileBarChart, desc: 'تقرير عام عن المؤسسة', color: 'cyan', count: 6 },
        ].map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-${report.color}-500/20 rounded-xl flex items-center justify-center`}>
                    <report.icon className={`w-6 h-6 text-${report.color}-400`} />
                  </div>
                  <Badge variant="outline" className="border-slate-600 text-slate-400">
                    {report.count} تقرير
                  </Badge>
                </div>
                <h3 className="text-white font-bold mb-2">{report.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{report.desc}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700 group-hover:border-emerald-500">
                    <Eye className="w-4 h-4 mr-1" />
                    عرض
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Reports */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">إنشاء تقرير سريع</CardTitle>
          <CardDescription className="text-slate-400">اختر نوع التقرير والفترة الزمنية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              <option>نوع التقرير</option>
              <option>تقرير الحضور</option>
              <option>تقرير الدرجات</option>
              <option>التقرير المالي</option>
            </select>
            <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              <option>الفترة الزمنية</option>
              <option>هذا الأسبوع</option>
              <option>هذا الشهر</option>
              <option>هذا الفصل</option>
              <option>هذه السنة</option>
            </select>
            <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              <option>الفرع</option>
              <option>جميع الفروع</option>
              {branches.map(b => <option key={b.id}>{b.name}</option>)}
            </select>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <FileBarChart className="w-4 h-4 mr-2" />
              إنشاء التقرير
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Settings Tab
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">الإعدادات</h2>
          <p className="text-slate-400">إعدادات النظام والتخصيص</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          <Save className="w-4 h-4" />
          حفظ التغييرات
        </Button>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              الإعدادات العامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">اسم المؤسسة</label>
              <Input defaultValue="مدرستنا" className="bg-slate-700/50 border-slate-600 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">السنة الدراسية الحالية</label>
              <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
                <option>2025-2026</option>
                <option>2023-2024</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">الفصل الدراسي الحالي</label>
              <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
                <option>الفصل الأول</option>
                <option>الفصل الثاني</option>
                <option>الفصل الثالث</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Languages className="w-5 h-5 text-blue-400" />
              إعدادات اللغة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">اللغة الافتراضية</label>
              <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
                <option>العربية</option>
                <option>Français</option>
                <option>English</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">اتجاه النص</label>
              <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
                <option>من اليمين لليسار (RTL)</option>
                <option>من اليسار لليمين (LTR)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BellRing className="w-5 h-5 text-amber-400" />
              إعدادات الإشعارات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white text-sm">إشعارات البريد الإلكتروني</p>
                <p className="text-slate-500 text-xs">إرسال إشعارات عبر البريد</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white text-sm">إشعارات الرسائل القصيرة</p>
                <p className="text-slate-500 text-xs">إرسال إشعارات عبر SMS</p>
              </div>
              <input type="checkbox" className="w-5 h-5 accent-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white text-sm">إشعارات التطبيق</p>
                <p className="text-slate-500 text-xs">إشعارات داخل النظام</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-500" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-400" />
              إعدادات الأمان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white text-sm">التحقق الثنائي</p>
                <p className="text-slate-500 text-xs">تفعيل المصادقة الثنائية</p>
              </div>
              <input type="checkbox" className="w-5 h-5 accent-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">مدة انتهاء الجلسة</label>
              <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
                <option>30 دقيقة</option>
                <option>ساعة واحدة</option>
                <option>ساعتان</option>
                <option>يوم واحد</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              النسخ الاحتياطي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <Server className="w-8 h-8 text-emerald-400 mb-2" />
                <p className="text-white font-medium">آخر نسخة احتياطية</p>
                <p className="text-slate-500 text-sm">اليوم، 10:30 ص</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <Database className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-white font-medium">حجم قاعدة البيانات</p>
                <p className="text-slate-500 text-sm">256 MB</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg flex items-center justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  إنشاء نسخة احتياطية
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Main render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'branches':
        return renderBranches();
      case 'users':
        return renderUsers();
      case 'academic':
        return renderAcademic();
      case 'finance':
        return renderFinance();
      case 'hr':
        return renderHR();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout
      user={user}
      title="لوحة تحكم المدير العام"
      sidebar={sidebar}
      notifications={stats.pendingRequests}
    >
      {renderContent()}

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>
              {modalType === 'addUser' && 'إضافة مستخدم جديد'}
              {modalType === 'addBranch' && 'إضافة فرع جديد'}
              {modalType === 'addAnnouncement' && 'إضافة إعلان جديد'}
              {modalType === 'addEmployee' && 'إضافة موظف جديد'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {modalType === 'addUser' && 'أدخل بيانات المستخدم الجديد'}
              {modalType === 'addBranch' && 'أدخل بيانات الفرع الجديد'}
              {modalType === 'addAnnouncement' && 'أدخل محتوى الإعلان'}
              {modalType === 'addEmployee' && 'أدخل بيانات الموظف الجديد'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {modalType === 'addUser' && (
              <>
                <Input placeholder="الاسم الكامل" className="bg-slate-700/50 border-slate-600" />
                <Input placeholder="البريد الإلكتروني" type="email" className="bg-slate-700/50 border-slate-600" />
                <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <option>اختر الدور</option>
                  <option>إداري</option>
                  <option>أستاذ</option>
                  <option>ولي أمر</option>
                </select>
                <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <option>اختر الفرع</option>
                  {branches.map(b => <option key={b.id}>{b.name}</option>)}
                </select>
              </>
            )}
            {modalType === 'addBranch' && (
              <>
                <Input placeholder="اسم الفرع" className="bg-slate-700/50 border-slate-600" />
                <Input placeholder="العنوان" className="bg-slate-700/50 border-slate-600" />
                <Input placeholder="رقم الهاتف" className="bg-slate-700/50 border-slate-600" />
                <Input placeholder="البريد الإلكتروني" type="email" className="bg-slate-700/50 border-slate-600" />
                <Input placeholder="السعة القصوى" type="number" className="bg-slate-700/50 border-slate-600" />
              </>
            )}
            {modalType === 'addAnnouncement' && (
              <>
                <Input placeholder="عنوان الإعلان" className="bg-slate-700/50 border-slate-600" />
                <textarea placeholder="محتوى الإعلان" rows={4} className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white" />
                <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <option>الأولوية</option>
                  <option>مهم</option>
                  <option>عادي</option>
                  <option>منخفض</option>
                </select>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)} className="border-slate-600 text-white">
              إلغاء
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => {
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
