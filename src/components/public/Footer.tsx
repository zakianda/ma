"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  School, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t, isRTL } = useTranslation();

  const quickLinks = [
    { label: t("nav.home"), href: "/?page=home" },
    { label: t("nav.about"), href: "/?page=about" },
    { label: t("nav.programs"), href: "/?page=programs" },
    { label: t("nav.registration"), href: "/?page=registration" },
    { label: t("nav.news"), href: "/?page=news" },
    { label: t("nav.contact"), href: "/?page=contact" },
  ];

  const services = [
    { label: t("home.studentRegistration"), href: "/?page=registration" },
    { label: t("home.parentPortal"), href: "/?dashboard=parent" },
    { label: t("home.academicCalendar"), href: "/?page=news" },
    { label: t("about.achievements"), href: "/?page=about" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <Link href="/?page=home" className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">مدرستنا</h3>
                <p className="text-xs text-slate-400">نحو مستقبل مشرق</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {t("home.heroDescription")}
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-slate-800 hover:bg-emerald-500 text-slate-400 hover:text-white rounded-lg transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("home.quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("common.services")}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {service.label}
                  </Link>
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
                <span>شارع المدرسة، المدينة، الدولة</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>info@school.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>الأحد - الخميس: 7:30 ص - 2:30 م</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">اشترك في نشرتنا الإخبارية</h4>
              <p className="text-slate-400 text-sm">احصل على آخر الأخبار والتحديثات</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder={t("auth.email")}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 w-full md:w-64"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-slate-400 text-sm">
            <p>© 2024 مدرستنا. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-emerald-400 transition-colors">سياسة الخصوصية</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">الشروط والأحكام</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
