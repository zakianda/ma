"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  UserPlus, 
  Users, 
  Calendar, 
  Phone,
  FileText,
  GraduationCap,
  CreditCard,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

interface QuickLinksSectionProps {
  onRegisterClick?: () => void;
}

export function QuickLinksSection({ onRegisterClick }: QuickLinksSectionProps) {
  const { t } = useTranslation();

  const links = [
    {
      icon: UserPlus,
      title: t("home.studentRegistration"),
      description: "سجل طالبك الآن",
      gradient: "from-emerald-500 to-teal-600",
      onClick: onRegisterClick
    },
    {
      icon: Users,
      title: t("home.parentPortal"),
      description: "تابع أبناءك",
      gradient: "from-blue-500 to-cyan-600",
      href: "/?dashboard=parent"
    },
    {
      icon: Calendar,
      title: t("home.academicCalendar"),
      description: "الجدول الدراسي",
      gradient: "from-orange-500 to-amber-600",
      href: "/?page=news"
    },
    {
      icon: Phone,
      title: t("nav.contact"),
      description: "تواصل معنا",
      gradient: "from-rose-500 to-pink-600",
      href: "/?page=contact"
    },
    {
      icon: FileText,
      title: t("reports.title"),
      description: "التقارير والنتائج",
      gradient: "from-purple-500 to-indigo-600",
      href: "/?page=about"
    },
    {
      icon: GraduationCap,
      title: t("nav.programs"),
      description: "البرامج الدراسية",
      gradient: "from-green-500 to-emerald-600",
      href: "/?page=programs"
    },
    {
      icon: CreditCard,
      title: t("registration.payment"),
      description: "الدفع الإلكتروني",
      gradient: "from-cyan-500 to-blue-600",
      href: "/?page=registration"
    },
    {
      icon: MessageSquare,
      title: t("contact.liveChat"),
      description: "الدعم الفني",
      gradient: "from-teal-500 to-green-600",
      href: "/?page=contact"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("home.quickLinks")}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            وصول سريع لأهم الخدمات والروابط
          </p>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {links.map((link, index) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <div className={`h-full p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer group`}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${link.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{link.title}</h3>
                  <p className="text-slate-400 text-sm">{link.description}</p>
                </div>
              </motion.div>
            );

            if (link.onClick) {
              return (
                <div key={link.title} onClick={link.onClick} className="h-full">
                  {content}
                </div>
              );
            }

            return (
              <Link key={link.title} href={link.href || "#"} className="h-full">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
