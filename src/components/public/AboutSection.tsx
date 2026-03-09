"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Heart, Users } from "lucide-react";

export function AboutSection() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Target,
      title: t("home.ourVision"),
      description: t("home.visionText"),
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Lightbulb,
      title: t("home.ourMission"),
      description: t("home.missionText"),
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Heart,
      title: t("home.ourValues"),
      description: t("home.valuesTitle"),
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: Users,
      title: t("about.whyChooseUs"),
      description: "بيئة تعليمية محفزة وكوادر مؤهلة",
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <section className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("nav.about")}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            نؤمن بأن التعليم هو أساس بناء المجتمعات وتطويرها
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group">
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
      </div>
    </section>
  );
}
