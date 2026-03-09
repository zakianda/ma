"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  UserCog, 
  BookOpen, 
  UserCheck, 
  Lock, 
  Mail,
  Eye,
  EyeOff,
  School,
  ArrowRight,
  Loader2,
  MapPin,
  Phone,
  Mail as MailIcon,
  Clock,
  Calendar,
  Target,
  Lightbulb,
  Heart,
  Award,
  User,
  FileText,
  CreditCard,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
  XCircle,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

// Dashboard Components
import { PrincipalDashboard } from "@/components/dashboards/PrincipalDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { TeacherDashboard } from "@/components/dashboards/TeacherDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";

type UserRole = "PRINCIPAL" | "ADMIN" | "TEACHER" | "PARENT" | "STUDENT";
type Page = "home" | "about" | "programs" | "registration" | "news" | "contact";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  student?: {
    admissionNo: string;
    class: { name: string } | null;
  };
  teacher?: {
    employeeId: string;
  };
  parent?: {
    students: Array<{
      id: string;
      admissionNo: string;
      user: { name: string };
      class: { name: string } | null;
    }>;
  };
}

interface RoleInfo {
  id: UserRole;
  icon: React.ReactNode;
  gradient: string;
}

const roles: RoleInfo[] = [
  { id: "PRINCIPAL", icon: <GraduationCap className="w-8 h-8" />, gradient: "from-purple-500 to-indigo-600" },
  { id: "ADMIN", icon: <UserCog className="w-8 h-8" />, gradient: "from-blue-500 to-cyan-600" },
  { id: "TEACHER", icon: <BookOpen className="w-8 h-8" />, gradient: "from-green-500 to-emerald-600" },
  { id: "PARENT", icon: <Users className="w-8 h-8" />, gradient: "from-orange-500 to-amber-600" },
  { id: "STUDENT", icon: <UserCheck className="w-8 h-8" />, gradient: "from-rose-500 to-pink-600" }
];

export default function SchoolWebsite() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const { t, isRTL, formatDate, formatCurrency } = useTranslation();

  // Registration form state
  const [regFullName, setRegFullName] = useState("");
  const [regBirthDate, setRegBirthDate] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [trackApplicationId, setTrackApplicationId] = useState("");
  
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const birthCertRef = useRef<HTMLInputElement>(null);
  const idPhotoRef = useRef<HTMLInputElement>(null);
  const prevCertsRef = useRef<HTMLInputElement>(null);
  const medicalReportRef = useRef<HTMLInputElement>(null);

  // Check for page in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") as Page;
    const dashboard = params.get("dashboard");
    
    if (page && ["home", "about", "programs", "registration", "news", "contact"].includes(page)) {
      setCurrentPage(page);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser && !dashboard) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsCheckingAuth(false);
  }, []);

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Seed database on first load
  useEffect(() => {
    const seedDatabase = async () => {
      try {
        await fetch("/api/seed");
      } catch (error) {
        console.error("Seed error:", error);
      }
    };
    seedDatabase();
  }, []);

  const handleLogin = async () => {
    if (!selectedRole) return;

    setIsLoading(true);

    try {
      // Try API login first
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email || `user${Date.now()}@demo.com`, 
          password: password || 'demo123', 
          role: selectedRole 
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: t("auth.loginSuccess"),
          description: t("common.welcome")
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setShowLoginModal(false);
        setSelectedRole(null);
        setEmail("");
        setPassword("");
      } else {
        // If API fails, create local demo user
        const demoUser = {
          id: `demo-${Date.now()}`,
          email: email || `user${Date.now()}@demo.com`,
          name: email ? email.split('@')[0] : 'مستخدم تجريبي',
          role: selectedRole,
          phone: null,
          avatar: null
        };
        
        toast({
          title: t("auth.loginSuccess"),
          description: t("common.welcome")
        });
        localStorage.setItem("user", JSON.stringify(demoUser));
        setUser(demoUser);
        setShowLoginModal(false);
        setSelectedRole(null);
        setEmail("");
        setPassword("");
      }
    } catch {
      // If error, create local demo user anyway
      const demoUser = {
        id: `demo-${Date.now()}`,
        email: email || `user${Date.now()}@demo.com`,
        name: email ? email.split('@')[0] : 'مستخدم تجريبي',
        role: selectedRole,
        phone: null,
        avatar: null
      };
      
      toast({
        title: t("auth.loginSuccess"),
        description: t("common.welcome")
      });
      localStorage.setItem("user", JSON.stringify(demoUser));
      setUser(demoUser);
      setShowLoginModal(false);
      setSelectedRole(null);
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.history.pushState({}, "", `/?page=${page}`);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const selectedRoleInfo = roles.find(r => r.id === selectedRole);

  // Show dashboard if user is logged in
  if (user) {
    switch (user.role) {
      case "PRINCIPAL":
        return <PrincipalDashboard user={user} />;
      case "ADMIN":
        return <AdminDashboard user={user} />;
      case "TEACHER":
        return <TeacherDashboard user={user} />;
      case "PARENT":
        return <ParentDashboard user={user} />;
      case "STUDENT":
        return <StudentDashboard user={user} />;
      default:
        return null;
    }
  }

  // Navigation items
  const navItems = [
    { label: t("nav.home"), page: "home" },
    { label: t("nav.about"), page: "about" },
    { label: t("nav.programs"), page: "programs" },
    { label: t("nav.registration"), page: "registration" },
    { label: t("nav.news"), page: "news" },
    { label: t("nav.contact"), page: "contact" },
  ];

  // Quick links for home page
  const quickLinks = [
    { icon: User, title: t("home.studentRegistration"), description: "سجل تلميذاً جديداً", gradient: "from-emerald-500 to-teal-600", page: "registration" },
    { icon: Users, title: t("home.parentPortal"), description: "تابع أبناءك", gradient: "from-blue-500 to-cyan-600", page: "home" },
    { icon: BookOpen, title: t("nav.programs"), description: "البرامج الدراسية", gradient: "from-green-500 to-emerald-600", page: "programs" },
    { icon: Phone, title: t("nav.contact"), description: "تواصل معنا", gradient: "from-rose-500 to-pink-600", page: "contact" },
  ];

  // News items
  const newsItems = [
    { id: 1, title: "بدء العام الدراسي الجديد 2026-2026", excerpt: "يسرنا إعلامكم ببدء العام الدراسي الجديد مع العديد من الأنشطة والفعاليات المميزة", date: "2026-09-01", category: "أخبار" },
    { id: 2, title: "نتائج المسابقة العلمية السنوية", excerpt: "تهانينا للفائزين في المسابقة العلمية السنوية التي أقيمت الشهر الماضي", date: "2026-01-15", category: "إنجازات" },
    { id: 3, title: "افتتاح المختبرات الجديدة", excerpt: "تم افتتاح مختبرات علمية حديثة مجهزة بأحدث التقنيات", date: "2026-01-01", category: "تطوير" },
    { id: 4, title: "ورشة عمل للأساتذة", excerpt: "ننظم ورشة عمل تطويرية للأساتذة حول أساليب التدريس الحديثة", date: "2026-12-20", category: "تدريب" },
    { id: 5, title: "رحلة مدرسية إلى مراكش", excerpt: "قام التلاميذ برحلة ترفيهية وثقافية إلى مدينة مراكش", date: "2026-12-10", category: "أنشطة" },
    { id: 6, title: "تخرج دفعة 2026", excerpt: "أقيمت مراسم تخرج دفعة 2026 في حفل رسمي بحضور أولياء الأمور", date: "2026-06-30", category: "تخرج" },
  ];

  // Alerts
  const alerts = [
    "إجازة عيد الأضحى من 15 إلى 25 يوليوز",
    "اجتماع أولياء الأمور يوم الخميس القادم",
    "تسليم الوثائق الدراسية للفصل الجديد"
  ];

  // Stats
  const stats = [
    { icon: Users, value: "2500+", label: t("home.statsStudents") },
    { icon: Award, value: "98%", label: t("home.statsSuccessRate") },
    { icon: BookOpen, value: "150+", label: t("home.statsTeachers") },
    { icon: Heart, value: "25+", label: t("home.statsPartners") },
  ];

  // Values
  const values = [
    { icon: Target, title: t("home.ourVision"), description: t("home.visionText"), color: "from-emerald-500 to-teal-600" },
    { icon: Lightbulb, title: t("home.ourMission"), description: t("home.missionText"), color: "from-blue-500 to-cyan-600" },
    { icon: Heart, title: t("home.ourValues"), description: t("home.valuesTitle"), color: "from-rose-500 to-pink-600" },
    { icon: Award, title: t("about.whyChooseUs"), description: "بيئة تعليمية محفزة وكوادر مؤهلة", color: "from-orange-500 to-amber-600" }
  ];

  // Render header
  const renderHeader = () => (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-slate-900/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg"
            >
              <School className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                مدرستنا
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">نحو مستقبل مشرق</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.page
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 lg:gap-4">
            <LanguageSwitcher variant="compact" />

            <Button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-lg shadow-emerald-600/25"
            >
              {t("common.login")}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <XCircle className="w-6 h-6" /> : <Loader2 className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.page}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavigate(item.page)}
                    className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                      currentPage === item.page
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-2 border-t border-slate-800"
                >
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white"
                  >
                    {t("common.login")}
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );

  // Render footer
  const renderFooter = () => (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <button onClick={() => handleNavigate("home")} className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">مدرستنا</h3>
                <p className="text-xs text-slate-400">نحو مستقبل مشرق</p>
              </div>
            </button>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {t("home.heroDescription")}
            </p>
            <div className="flex items-center gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-slate-800 hover:bg-emerald-500 text-slate-400 hover:text-white rounded-lg transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("home.quickLinks")}</h4>
            <ul className="space-y-2">
              {navItems.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleNavigate(link.page)}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("common.services")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("home.studentRegistration"), page: "registration" },
                { label: t("home.parentPortal"), page: "home" },
                { label: t("nav.programs"), page: "programs" },
                { label: t("nav.contact"), page: "contact" },
              ].map((service) => (
                <li key={service.page}>
                  <button
                    onClick={() => handleNavigate(service.page)}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("home.contactInfo")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>شارع محمد الخامس، الدار البيضاء، المغرب</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span dir="ltr">+212 522 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <MailIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>contact@madrasatna.ma</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>الإثنين - الجمعة: 8:00 ص - 4:30 م</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-slate-400 text-sm">
            <p>© 2026 مدرستنا. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <button className="hover:text-emerald-400 transition-colors">سياسة الخصوصية</button>
              <button className="hover:text-emerald-400 transition-colors">الشروط والأحكام</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Render login modal
  const renderLoginModal = () => (
    <AnimatePresence>
      {showLoginModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowLoginModal(false);
            setSelectedRole(null);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {!selectedRole ? (
                <motion.div
                  key="roles"
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white text-2xl">{t("auth.selectRole")}</CardTitle>
                      <CardDescription className="text-slate-400">
                        اختر نوع الحساب للمتابعة
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                      {roles.map((role, index) => (
                        <motion.div
                          key={role.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card 
                            className="cursor-pointer bg-slate-900/50 border-slate-700 hover:border-emerald-500 transition-all"
                            onClick={() => setSelectedRole(role.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${role.gradient} mb-2`}>
                                {role.icon}
                              </div>
                              <p className="text-white font-medium">{t(`auth.${role.id.toLowerCase()}`)}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="text-center">
                      <div className={`mx-auto p-3 rounded-2xl bg-gradient-to-br ${selectedRoleInfo?.gradient} text-white mb-4`}>
                        {selectedRoleInfo?.icon}
                      </div>
                      <CardTitle className="text-white text-2xl">{t("auth.loginTitle")}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {t("auth.loginSubtitle")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">{t("auth.email")}</Label>
                        <div className="relative">
                          <Mail className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500`} />
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@school.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 ${isRTL ? "pr-10" : "pl-10"}`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-300">{t("auth.password")}</Label>
                        <div className="relative">
                          <Lock className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500`} />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 ${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300`}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r ${selectedRoleInfo?.gradient} hover:opacity-90 text-white font-semibold py-6`}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t("common.loading")}
                          </div>
                        ) : (
                          t("common.login")
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => setSelectedRole(null)}
                        className="w-full text-slate-400 hover:text-white"
                      >
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
                        {t("common.back")}
                      </Button>

                      <div className="text-center text-xs text-slate-500">
                        <p className="text-emerald-400">يمكنك الدخول بأي قيمة - لا حاجة لبيانات حقيقية</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render page content
  const renderPageContent = () => {
    switch (currentPage) {
      case "registration":
        return (
          <div className="py-20 bg-slate-900 min-h-screen pt-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Button
                  variant="ghost"
                  onClick={() => handleNavigate("home")}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2 rotate-180"}`} />
                  {t("registration.backToHome")}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {t("registration.title")}
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  أكمل البيانات التالية لتسجيل تلميذ جديد
                </p>
              </motion.div>

              {/* Steps */}
              <div className="flex justify-center mb-12">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        index === 0 ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                      }`}>
                        {step}
                      </div>
                      {index < 3 && <div className="w-16 h-1 bg-slate-700 mx-2" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden file inputs */}
              <input
                type="file"
                ref={birthCertRef}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadedFiles(prev => ({ ...prev, "birthCertificate": file.name }));
                    toast({ title: "تم رفع الملف", description: file.name });
                  }
                }}
              />
              <input
                type="file"
                ref={idPhotoRef}
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadedFiles(prev => ({ ...prev, "idPhoto": file.name }));
                    toast({ title: "تم رفع الملف", description: file.name });
                  }
                }}
              />
              <input
                type="file"
                ref={prevCertsRef}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadedFiles(prev => ({ ...prev, "previousCertificates": file.name }));
                    toast({ title: "تم رفع الملف", description: file.name });
                  }
                }}
              />
              <input
                type="file"
                ref={medicalReportRef}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadedFiles(prev => ({ ...prev, "medicalReport": file.name }));
                    toast({ title: "تم رفع الملف", description: file.name });
                  }
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">معلومات التلميذ</CardTitle>
                      <CardDescription className="text-slate-400">
                        أدخل بيانات التلميذ الأساسية
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">الاسم الكامل</Label>
                          <Input 
                            className="bg-slate-900/50 border-slate-600 text-white" 
                            placeholder="أدخل الاسم الكامل"
                            value={regFullName}
                            onChange={(e) => setRegFullName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">تاريخ الميلاد</Label>
                          <Input 
                            type="date" 
                            lang="en"
                            className="bg-slate-900/50 border-slate-600 text-white"
                            value={regBirthDate}
                            onChange={(e) => setRegBirthDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">{t("auth.email")}</Label>
                          <Input 
                            type="email" 
                            className="bg-slate-900/50 border-slate-600 text-white" 
                            placeholder="example@email.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">{t("contact.phone")}</Label>
                          <Input 
                            dir="ltr"
                            className="bg-slate-900/50 border-slate-600 text-white text-left" 
                            placeholder="+212 6XX XXX XXX"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="pt-6 border-t border-slate-700">
                        <h3 className="text-white font-semibold mb-4">{t("registration.documentsRequired")}</h3>
                        <div className="space-y-3">
                          {[
                            { id: "birthCertificate", name: t("registration.birthCertificate"), required: true, ref: birthCertRef },
                            { id: "idPhoto", name: t("registration.idPhoto"), required: true, ref: idPhotoRef },
                            { id: "previousCertificates", name: t("registration.previousCertificates"), required: true, ref: prevCertsRef },
                            { id: "medicalReport", name: t("registration.medicalReport"), required: false, ref: medicalReportRef }
                          ].map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                {uploadedFiles[doc.id] ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                                ) : (
                                  <FileText className="w-5 h-5 text-slate-400" />
                                )}
                                <span className="text-slate-300">{doc.name}</span>
                                {doc.required && <Badge className="bg-red-500/20 text-red-400 text-xs">مطلوب</Badge>}
                                {uploadedFiles[doc.id] && (
                                  <span className="text-xs text-emerald-400 mr-2">
                                    ({uploadedFiles[doc.id]})
                                  </span>
                                )}
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-slate-600 text-slate-300 hover:text-white"
                                onClick={() => doc.ref.current?.click()}
                              >
                                <Upload className="w-4 h-4 ml-1" />
                                {uploadedFiles[doc.id] ? "تغيير" : "رفع"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white mt-6"
                        onClick={() => {
                          toast({
                            title: "تم الانتقال للخطوة التالية",
                            description: "يرجى مراجعة بياناتك قبل الإرسال"
                          });
                        }}
                      >
                        التالي - مراجعة الطلب
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{t("registration.trackApplication")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input 
                        placeholder="أدخل رقم الطلب" 
                        className="bg-slate-900/50 border-slate-600 text-white"
                        value={trackApplicationId}
                        onChange={(e) => setTrackApplicationId(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        className="w-full border-slate-600 text-slate-300 hover:text-white"
                        onClick={() => {
                          if (trackApplicationId.trim()) {
                            toast({
                              title: "جاري البحث عن الطلب",
                              description: `رقم الطلب: ${trackApplicationId}`
                            });
                          } else {
                            toast({
                              title: "يرجى إدخال رقم الطلب",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        تتبع الطلب
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border-emerald-500/30">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-emerald-400" />
                        {t("registration.fees")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-slate-300">
                          <span>رسوم التسجيل</span>
                          <span>500 د.م.</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>الرسوم الدراسية</span>
                          <span>1,200 د.م.</span>
                        </div>
                        <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-700">
                          <span>الإجمالي</span>
                          <span>1,700 د.م.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "about":
        return (
          <div className="py-20 bg-slate-900 pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("about.title")}</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  نؤمن بأن التعليم هو أساس بناء المجتمعات وتطويرها
                </p>
              </motion.div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group">
                      <CardContent className="p-6 text-center">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-4 group-hover:scale-110 transition-transform`}>
                          <value.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Director Word */}
              <Card className="bg-slate-800/50 border-slate-700 mb-16">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{t("about.directorWord")}</h3>
                      <p className="text-slate-400 leading-relaxed">{t("about.directorWordText")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team */}
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("about.administrativeTeam")}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {["المدير العام", "نائب المدير", "رئيس القسم", "المستشار التربوي"].map((role, index) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 text-center">
                      <CardContent className="p-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-600/20 mx-auto mb-4 flex items-center justify-center">
                          <User className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-1">الاسم</h3>
                        <p className="text-slate-400 text-sm">{role}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case "programs":
        return (
          <div className="py-20 bg-slate-900 pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("programs.title")}</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  نقدم برامج دراسية متميزة تناسب جميع المستويات
                </p>
              </motion.div>

              {/* Levels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  { title: t("programs.primary"), grades: "السنة الأولى - السنة السادسة", icon: BookOpen, color: "from-emerald-500 to-teal-600" },
                  { title: t("programs.middle"), grades: "السنة الأولى - السنة الثالثة إعدادي", icon: GraduationCap, color: "from-blue-500 to-cyan-600" },
                  { title: t("programs.secondary"), grades: "السنة الأولى - الثالثة ثانوي", icon: Award, color: "from-purple-500 to-indigo-600" }
                ].map((level, index) => (
                  <motion.div
                    key={level.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all group cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${level.color} mb-4 group-hover:scale-110 transition-transform`}>
                          <level.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{level.title}</h3>
                        <p className="text-slate-400 text-sm">{level.grades}</p>
                        <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white">
                          {t("programs.downloadCurriculum")}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Subjects */}
              <h2 className="text-2xl font-bold text-white mb-8 text-center">{t("programs.subjects")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {["اللغة العربية", "الرياضيات", "اللغة الفرنسية", "اللغة الإنجليزية", "العلوم", "التاريخ والجغرافيا", "التربية الإسلامية", "التربية البدنية", "الفنون", "المعلوميات", "الفيزياء", "الكيمياء"].map((subject, index) => (
                  <motion.div
                    key={subject}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <p className="text-white font-medium">{subject}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case "news":
        return (
          <div className="py-20 bg-slate-900 pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("news.title")}</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  تابع آخر أخبار وفعاليات المدرسة
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all overflow-hidden group cursor-pointer">
                      <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 relative">
                        <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
                          {item.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{item.excerpt}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="py-20 bg-slate-900 pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("contact.title")}</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  نحن هنا للإجابة على استفساراتكم
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{t("contact.sendMessage")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t("contact.fullName")}</Label>
                        <Input className="bg-slate-900/50 border-slate-600 text-white" placeholder="الاسم الكامل" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t("contact.email")}</Label>
                        <Input type="email" className="bg-slate-900/50 border-slate-600 text-white" placeholder="example@email.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">{t("contact.phone")}</Label>
                      <Input className="bg-slate-900/50 border-slate-600 text-white" placeholder="+212 6XX XXX XXX" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">{t("contact.subject")}</Label>
                      <Input className="bg-slate-900/50 border-slate-600 text-white" placeholder="موضوع الرسالة" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">{t("contact.message")}</Label>
                      <textarea 
                        className="w-full h-32 bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-white resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white">
                      <Send className="w-4 h-4 ml-2" />
                      {t("contact.send")}
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">{t("contact.ourLocation")}</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                          <p className="text-slate-300">شارع محمد الخامس، الدار البيضاء، المغرب</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-emerald-400" />
                          <p className="text-slate-300" dir="ltr">+212 522 123 456</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <MailIcon className="w-5 h-5 text-emerald-400" />
                          <p className="text-slate-300">contact@madrasatna.ma</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">{t("contact.workingHours")}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-slate-300">
                          <span>الإثنين - الجمعة</span>
                          <span>8:00 ص - 4:30 م</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>السبت</span>
                          <span>9:00 ص - 1:00 م</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>الأحد</span>
                          <span className="text-red-400">مغلق</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Map Placeholder */}
                  <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-slate-500" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );

      default: // Home page
        return (
          <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
              {/* Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMwZTdmODciIGZpbGwtb3BhY2l0eT0iLjMiLz48L2c+PC9zdmc+')]"></div>
              </div>
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
                  >
                    {t("home.heroTitle")}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl sm:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto"
                  >
                    {t("home.heroSubtitle")}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 mb-10 max-w-2xl mx-auto"
                  >
                    {t("home.heroDescription")}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                  >
                    <Button
                      size="lg"
                      onClick={() => handleNavigate("registration")}
                      className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-8 py-6 text-lg shadow-lg shadow-emerald-600/25"
                    >
                      {t("home.registerNow")}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleNavigate("about")}
                      className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500 px-8 py-6 text-lg"
                    >
                      {t("home.learnMore")}
                    </Button>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                  >
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center justify-center p-3 bg-slate-800/50 rounded-xl mb-3">
                          <stat.icon className="w-6 h-6 text-emerald-400" />
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-slate-400 text-sm">{stat.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Alerts Section */}
            <section className="py-6 bg-amber-500/10 border-y border-amber-500/30">
              <div className="overflow-hidden">
                <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
                  {[...alerts, ...alerts].map((alert, index) => (
                    <div key={index} className="flex items-center gap-2 text-amber-400">
                      <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
                      <span>{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-slate-800/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("nav.about")}</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all group">
                        <CardContent className="p-6 text-center">
                          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <value.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                          <p className="text-slate-400 text-sm">{value.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* News Section */}
            <section className="py-20 bg-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 md:mb-0">{t("home.latestNews")}</h2>
                  <Button
                    variant="outline"
                    onClick={() => handleNavigate("news")}
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500"
                  >
                    {t("common.viewAll")}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsItems.slice(0, 6).map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all overflow-hidden group cursor-pointer">
                        <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 relative group-hover:scale-105 transition-transform duration-500">
                          <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
                            {item.category}
                          </Badge>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(item.date)}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-400 text-sm line-clamp-2">{item.excerpt}</p>
                          <Button variant="link" className="mt-4 p-0 text-emerald-400 hover:text-emerald-300">
                            {t("common.readMore")}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("home.quickLinks")}</h2>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigate(link.page)}
                      className="cursor-pointer"
                    >
                      <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all group">
                        <CardContent className="p-6 text-center">
                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${link.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                            <link.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-white font-semibold mb-1">{link.title}</h3>
                          <p className="text-slate-400 text-sm">{link.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl animate-pulse">
          <School className="w-12 h-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {renderHeader()}
      <main>{renderPageContent()}</main>
      {renderFooter()}
      {renderLoginModal()}
    </div>
  );
}
