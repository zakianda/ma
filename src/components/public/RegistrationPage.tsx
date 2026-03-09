"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export function RegistrationPage() {
  const { t } = useTranslation();

  const steps = [
    { number: 1, title: "معلومات الطالب", status: "current" },
    { number: 2, title: "الوثائق المطلوبة", status: "pending" },
    { number: 3, title: "مراجعة الطلب", status: "pending" },
    { number: 4, title: "الدفع", status: "pending" }
  ];

  const documents = [
    { name: t("registration.birthCertificate"), required: true },
    { name: t("registration.idPhoto"), required: true },
    { name: t("registration.previousCertificates"), required: true },
    { name: t("registration.medicalReport"), required: false }
  ];

  return (
    <div className="py-20 bg-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("registration.title")}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            أكمل البيانات التالية لتسجيل طالب جديد
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step.status === "current" 
                    ? "bg-emerald-500 text-white" 
                    : step.status === "completed"
                    ? "bg-green-500 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}>
                  {step.status === "completed" ? <CheckCircle className="w-5 h-5" /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step.status === "completed" ? "bg-green-500" : "bg-slate-700"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">معلومات الطالب</CardTitle>
                <CardDescription className="text-slate-400">
                  أدخل بيانات الطالب الأساسية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">الاسم الكامل</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input className="bg-slate-900/50 border-slate-600 text-white pr-10" placeholder="أدخل الاسم الكامل" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">تاريخ الميلاد</Label>
                    <Input type="date" className="bg-slate-900/50 border-slate-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">{t("auth.email")}</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input type="email" className="bg-slate-900/50 border-slate-600 text-white pr-10" placeholder="example@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">{t("contact.phone")}</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input className="bg-slate-900/50 border-slate-600 text-white pr-10" placeholder="+966 50 123 4567" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">{t("students.address")}</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 w-5 h-5 text-slate-500" />
                    <Input className="bg-slate-900/50 border-slate-600 text-white pr-10" placeholder="أدخل العنوان الكامل" />
                  </div>
                </div>

                {/* Documents Upload */}
                <div className="pt-6 border-t border-slate-700">
                  <h3 className="text-white font-semibold mb-4">{t("registration.documentsRequired")}</h3>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <span className="text-slate-300">{doc.name}</span>
                          {doc.required && <Badge variant="destructive" className="text-xs">مطلوب</Badge>}
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                          <Upload className="w-4 h-4 ml-2" />
                          رفع
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white mt-6">
                  التالي - مراجعة الطلب
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">{t("registration.trackApplication")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-white text-sm">رقم الطلب</p>
                      <p className="text-slate-400 text-xs">سيظهر بعد التقديم</p>
                    </div>
                  </div>
                  <Input placeholder="أدخل رقم الطلب" className="bg-slate-900/50 border-slate-600 text-white" />
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                    تتبع الطلب
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fees Info */}
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
                    <span>500 ر.س</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>الرسوم الدراسية</span>
                    <span>3,000 ر.س</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-700">
                    <span>الإجمالي</span>
                    <span>3,500 ر.س</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
