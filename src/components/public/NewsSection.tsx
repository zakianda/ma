"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Bell, Clock } from "lucide-react";
import Link from "next/link";

export function NewsSection() {
  const { t, isRTL } = useTranslation();

  const news = [
    {
      id: 1,
      title: "بدء العام الدراسي الجديد 2024-2025",
      excerpt: "يسرنا إعلامكم ببدء العام الدراسي الجديد مع العديد من الأنشطة والفعاليات المميزة",
      date: "2024-09-01",
      category: "أخبار",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "نتائج المسابقة العلمية السنوية",
      excerpt: "تهانينا للفائزين في المسابقة العلمية السنوية التي أقيمت الشهر الماضي",
      date: "2024-08-15",
      category: "إنجازات",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "افتتاح المختبرات الجديدة",
      excerpt: "تم افتتاح مختبرات علمية حديثة مجهزة بأحدث التقنيات",
      date: "2024-08-01",
      category: "تطوير",
      image: "/api/placeholder/400/250"
    }
  ];

  const alerts = [
    "إجازة العيد الوطني من 22 إلى 28 سبتمبر",
    "اجتماع أولياء الأمور يوم الخميس القادم",
    "تسليم الوثائق الدراسية للفصل الجديد"
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {t("home.latestNews")}
            </h2>
            <p className="text-slate-400">تابع آخر أخبار وفعاليات المدرسة</p>
          </motion.div>
          <Link href="/?page=news">
            <Button variant="outline" className="mt-4 md:mt-0 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800">
              {t("common.viewAll")}
              <ArrowLeft className={`w-4 h-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
            </Button>
          </Link>
        </div>

        {/* Urgent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-white">{t("home.urgentAlerts")}</h3>
          </div>
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl overflow-hidden">
            <div className="animate-marquee flex items-center gap-8 py-4 px-6">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-2 text-amber-400 whitespace-nowrap">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  {alert}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-slate-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 group-hover:scale-110 transition-transform duration-500" />
                  <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-slate-400 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{item.excerpt}</p>
                  <Link href={`/?page=news&id=${item.id}`}>
                    <Button variant="link" className="mt-4 p-0 text-emerald-400 hover:text-emerald-300">
                      {t("common.readMore")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
