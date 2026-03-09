import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Check if already seeded
    const existingUsers = await db.user.count();
    if (existingUsers > 0) {
      return NextResponse.json({ 
        message: "Database already seeded",
        usersCount: existingUsers 
      });
    }

    // Create Academic Year
    const academicYear = await db.academicYear.create({
      data: {
        name: "2026-2026",
        startDate: new Date("2026-09-01"),
        endDate: new Date("2026-06-30"),
        isActive: true
      }
    });

    // Create Classes
    const classes = await Promise.all([
      db.class.create({
        data: {
          name: "الصف الأول أ",
          gradeLevel: "الأول",
          section: "أ",
          capacity: 30,
          academicYearId: academicYear.id
        }
      }),
      db.class.create({
        data: {
          name: "الصف الأول ب",
          gradeLevel: "الأول",
          section: "ب",
          capacity: 30,
          academicYearId: academicYear.id
        }
      }),
      db.class.create({
        data: {
          name: "الصف الثاني أ",
          gradeLevel: "الثاني",
          section: "أ",
          capacity: 30,
          academicYearId: academicYear.id
        }
      }),
      db.class.create({
        data: {
          name: "الصف الثالث أ",
          gradeLevel: "الثالث",
          section: "أ",
          capacity: 30,
          academicYearId: academicYear.id
        }
      })
    ]);

    // Create Subjects
    const subjects = await Promise.all([
      db.subject.create({
        data: { name: "الرياضيات", code: "MATH101", description: "مادة الرياضيات" }
      }),
      db.subject.create({
        data: { name: "اللغة العربية", code: "ARB101", description: "مادة اللغة العربية" }
      }),
      db.subject.create({
        data: { name: "اللغة الإنجليزية", code: "ENG101", description: "مادة اللغة الإنجليزية" }
      }),
      db.subject.create({
        data: { name: "العلوم", code: "SCI101", description: "مادة العلوم" }
      }),
      db.subject.create({
        data: { name: "الدراسات الاجتماعية", code: "SOC101", description: "مادة الدراسات الاجتماعية" }
      }),
      db.subject.create({
        data: { name: "التربية الإسلامية", code: "ISL101", description: "مادة التربية الإسلامية" }
      })
    ]);

    // Create Principal
    const principal = await db.user.create({
      data: {
        email: "principal@school.com",
        password: "password123",
        name: "أحمد محمد المدير",
        role: "PRINCIPAL",
        phone: "0501234567",
        address: "شارع المدرسة، المدينة"
      }
    });

    // Create Admins
    const admins = await Promise.all([
      db.user.create({
        data: {
          email: "admin@school.com",
          password: "password123",
          name: "سارة أحمد الإدارية",
          role: "ADMIN",
          phone: "0502345678"
        }
      }),
      db.user.create({
        data: {
          email: "admin2@school.com",
          password: "password123",
          name: "محمد علي الإداري",
          role: "ADMIN",
          phone: "0503456789"
        }
      })
    ]);

    // Create Teachers
    const teacherUsers = await Promise.all([
      db.user.create({
        data: {
          email: "teacher1@school.com",
          password: "password123",
          name: "خالد عبدالله المعلم",
          role: "TEACHER",
          phone: "0504567890"
        }
      }),
      db.user.create({
        data: {
          email: "teacher2@school.com",
          password: "password123",
          name: "فاطمة سعيد المعلمة",
          role: "TEACHER",
          phone: "0505678901"
        }
      }),
      db.user.create({
        data: {
          email: "teacher3@school.com",
          password: "password123",
          name: "عبدالرحمن محمد المعلم",
          role: "TEACHER",
          phone: "0506789012"
        }
      }),
      db.user.create({
        data: {
          email: "teacher4@school.com",
          password: "password123",
          name: "نورة أحمد المعلمة",
          role: "TEACHER",
          phone: "0507890123"
        }
      })
    ]);

    const teachers = await Promise.all([
      db.teacher.create({
        data: {
          userId: teacherUsers[0].id,
          employeeId: "T001",
          qualification: "بكالوريوس رياضيات",
          specialization: "الرياضيات",
          joiningDate: new Date("2020-09-01"),
          salary: 8000
        }
      }),
      db.teacher.create({
        data: {
          userId: teacherUsers[1].id,
          employeeId: "T002",
          qualification: "بكالوريوس لغة عربية",
          specialization: "اللغة العربية",
          joiningDate: new Date("2019-09-01"),
          salary: 8500
        }
      }),
      db.teacher.create({
        data: {
          userId: teacherUsers[2].id,
          employeeId: "T003",
          qualification: "بكالوريوس علوم",
          specialization: "العلوم",
          joiningDate: new Date("2021-09-01"),
          salary: 7500
        }
      }),
      db.teacher.create({
        data: {
          userId: teacherUsers[3].id,
          employeeId: "T004",
          qualification: "بكالوريوس لغة إنجليزية",
          specialization: "اللغة الإنجليزية",
          joiningDate: new Date("2022-09-01"),
          salary: 7000
        }
      })
    ]);

    // Create Parents
    const parentUsers = await Promise.all([
      db.user.create({
        data: {
          email: "parent1@family.com",
          password: "password123",
          name: "عبدالله سعيد ولي الأمر",
          role: "PARENT",
          phone: "0508901234"
        }
      }),
      db.user.create({
        data: {
          email: "parent2@family.com",
          password: "password123",
          name: "سلمان محمد ولي الأمر",
          role: "PARENT",
          phone: "0509012345"
        }
      }),
      db.user.create({
        data: {
          email: "parent3@family.com",
          password: "password123",
          name: "فهد عبدالعزيز ولي الأمر",
          role: "PARENT",
          phone: "0500123456"
        }
      })
    ]);

    const parents = await Promise.all([
      db.parent.create({
        data: { userId: parentUsers[0].id, occupation: "مهندس" }
      }),
      db.parent.create({
        data: { userId: parentUsers[1].id, occupation: "طبيب" }
      }),
      db.parent.create({
        data: { userId: parentUsers[2].id, occupation: "تاجر" }
      })
    ]);

    // Create Students
    const studentUsers = await Promise.all([
      db.user.create({
        data: {
          email: "student1@student.com",
          password: "password123",
          name: "محمد عبدالله الطالب",
          role: "STUDENT",
          phone: "0511234567"
        }
      }),
      db.user.create({
        data: {
          email: "student2@student.com",
          password: "password123",
          name: "أحمد سلمان الطالب",
          role: "STUDENT",
          phone: "0512345678"
        }
      }),
      db.user.create({
        data: {
          email: "student3@student.com",
          password: "password123",
          name: "عبدالرحمن فهد الطالب",
          role: "STUDENT",
          phone: "0513456789"
        }
      }),
      db.user.create({
        data: {
          email: "student4@student.com",
          password: "password123",
          name: "سارة عبدالله الطالبة",
          role: "STUDENT",
          phone: "0514567890"
        }
      }),
      db.user.create({
        data: {
          email: "student5@student.com",
          password: "password123",
          name: "نورة سلمان الطالبة",
          role: "STUDENT",
          phone: "0515678901"
        }
      }),
      db.user.create({
        data: {
          email: "student6@student.com",
          password: "password123",
          name: "فاطمة فهد الطالبة",
          role: "STUDENT",
          phone: "0516789012"
        }
      })
    ]);

    const students = await Promise.all([
      db.student.create({
        data: {
          userId: studentUsers[0].id,
          admissionNo: "STU001",
          dateOfBirth: new Date("2015-03-15"),
          gender: "male",
          bloodGroup: "A+",
          parentId: parents[0].id,
          classId: classes[0].id
        }
      }),
      db.student.create({
        data: {
          userId: studentUsers[1].id,
          admissionNo: "STU002",
          dateOfBirth: new Date("2015-05-20"),
          gender: "male",
          bloodGroup: "B+",
          parentId: parents[1].id,
          classId: classes[0].id
        }
      }),
      db.student.create({
        data: {
          userId: studentUsers[2].id,
          admissionNo: "STU003",
          dateOfBirth: new Date("2014-08-10"),
          gender: "male",
          bloodGroup: "O+",
          parentId: parents[2].id,
          classId: classes[1].id
        }
      }),
      db.student.create({
        data: {
          userId: studentUsers[3].id,
          admissionNo: "STU004",
          dateOfBirth: new Date("2015-01-25"),
          gender: "female",
          bloodGroup: "AB+",
          parentId: parents[0].id,
          classId: classes[0].id
        }
      }),
      db.student.create({
        data: {
          userId: studentUsers[4].id,
          admissionNo: "STU005",
          dateOfBirth: new Date("2014-11-12"),
          gender: "female",
          bloodGroup: "A+",
          parentId: parents[1].id,
          classId: classes[2].id
        }
      }),
      db.student.create({
        data: {
          userId: studentUsers[5].id,
          admissionNo: "STU006",
          dateOfBirth: new Date("2013-07-08"),
          gender: "female",
          bloodGroup: "B+",
          parentId: parents[2].id,
          classId: classes[3].id
        }
      })
    ]);

    // Create Class Subjects
    const classSubjects = await Promise.all([
      // Class 1A subjects
      db.classSubject.create({
        data: { classId: classes[0].id, subjectId: subjects[0].id, teacherId: teachers[0].id }
      }),
      db.classSubject.create({
        data: { classId: classes[0].id, subjectId: subjects[1].id, teacherId: teachers[1].id }
      }),
      db.classSubject.create({
        data: { classId: classes[0].id, subjectId: subjects[2].id, teacherId: teachers[3].id }
      }),
      db.classSubject.create({
        data: { classId: classes[0].id, subjectId: subjects[3].id, teacherId: teachers[2].id }
      }),
      // Class 1B subjects
      db.classSubject.create({
        data: { classId: classes[1].id, subjectId: subjects[0].id, teacherId: teachers[0].id }
      }),
      db.classSubject.create({
        data: { classId: classes[1].id, subjectId: subjects[1].id, teacherId: teachers[1].id }
      }),
      // Class 2A subjects
      db.classSubject.create({
        data: { classId: classes[2].id, subjectId: subjects[0].id, teacherId: teachers[0].id }
      }),
      db.classSubject.create({
        data: { classId: classes[2].id, subjectId: subjects[2].id, teacherId: teachers[3].id }
      }),
      // Class 3A subjects
      db.classSubject.create({
        data: { classId: classes[3].id, subjectId: subjects[3].id, teacherId: teachers[2].id }
      })
    ]);

    // Create Schedules
    const scheduleData = [
      // Sunday
      { day: 0, start: "08:00", end: "08:45", room: "101" },
      { day: 0, start: "09:00", end: "09:45", room: "101" },
      { day: 0, start: "10:00", end: "10:45", room: "101" },
      { day: 0, start: "11:00", end: "11:45", room: "101" },
      // Monday
      { day: 1, start: "08:00", end: "08:45", room: "102" },
      { day: 1, start: "09:00", end: "09:45", room: "102" },
      { day: 1, start: "10:00", end: "10:45", room: "102" },
      // Tuesday
      { day: 2, start: "08:00", end: "08:45", room: "101" },
      { day: 2, start: "09:00", end: "09:45", room: "103" },
      // Wednesday
      { day: 3, start: "08:00", end: "08:45", room: "101" },
      { day: 3, start: "10:00", end: "10:45", room: "104" },
      // Thursday
      { day: 4, start: "08:00", end: "08:45", room: "102" },
      { day: 4, start: "09:00", end: "09:45", room: "101" }
    ];

    for (let i = 0; i < Math.min(scheduleData.length, classSubjects.length); i++) {
      const sd = scheduleData[i];
      const cs = classSubjects[i % classSubjects.length];
      
      await db.schedule.create({
        data: {
          dayOfWeek: sd.day,
          startTime: sd.start,
          endTime: sd.end,
          room: sd.room,
          classId: cs.classId,
          classSubjectId: cs.id,
          teacherId: cs.teacherId
        }
      });
    }

    // Create Attendance
    const today = new Date();
    for (const student of students) {
      const studentClassSubjects = classSubjects.filter(cs => cs.classId === student.classId);
      for (const cs of studentClassSubjects.slice(0, 2)) {
        await db.attendance.create({
          data: {
            date: today,
            status: Math.random() > 0.1 ? "present" : "absent",
            classSubjectId: cs.id,
            studentId: student.id
          }
        });
      }
    }

    // Create Grades
    for (const student of students) {
      const studentClassSubjects = classSubjects.filter(cs => cs.classId === student.classId);
      for (const cs of studentClassSubjects) {
        const maxScore = 100;
        const score = Math.floor(Math.random() * 40) + 60; // 60-100
        
        await db.grade.create({
          data: {
            examType: "midterm",
            examName: "اختبار نصفي",
            maxScore: maxScore,
            score: score,
            classSubjectId: cs.id,
            studentId: student.id,
            academicYearId: academicYear.id
          }
        });

        await db.grade.create({
          data: {
            examType: "quiz",
            examName: "اختبار قصير",
            maxScore: 20,
            score: Math.floor(Math.random() * 8) + 12,
            classSubjectId: cs.id,
            studentId: student.id,
            academicYearId: academicYear.id
          }
        });
      }
    }

    // Create Fees
    const fees = await Promise.all([
      db.fee.create({
        data: {
          name: "الرسوم الدراسية - الفصل الأول",
          amount: 3000,
          dueDate: new Date("2026-10-15"),
          feeType: "tuition",
          academicYearId: academicYear.id
        }
      }),
      db.fee.create({
        data: {
          name: "الرسوم الدراسية - الفصل الثاني",
          amount: 3000,
          dueDate: new Date("2026-02-15"),
          feeType: "tuition",
          academicYearId: academicYear.id
        }
      }),
      db.fee.create({
        data: {
          name: "الكتب الدراسية",
          amount: 500,
          dueDate: new Date("2026-09-15"),
          feeType: "books",
          academicYearId: academicYear.id
        }
      }),
      db.fee.create({
        data: {
          name: "النشاط اللاصفية",
          amount: 200,
          dueDate: new Date("2026-09-30"),
          feeType: "activities",
          academicYearId: academicYear.id
        }
      })
    ]);

    // Create Fee Payments
    for (const student of students) {
      await db.feePayment.create({
        data: {
          amount: fees[0].amount,
          paymentDate: new Date(),
          paymentMethod: "bank_transfer",
          status: Math.random() > 0.3 ? "paid" : "pending",
          receiptNo: `REC${Date.now().toString().slice(-6)}`,
          feeId: fees[0].id,
          studentId: student.id
        }
      });
    }

    // Create Announcements
    await Promise.all([
      db.announcement.create({
        data: {
          title: "بدء الفصل الدراسي الأول",
          content: "يسرنا إعلامكم ببدء الفصل الدراسي الأول للعام الدراسي 2026-2026. نتمنى لجميع طلابنا عاماً دراسياً موفقاً.",
          priority: "high",
          targetRole: "all",
          authorId: principal.id,
          isActive: true
        }
      }),
      db.announcement.create({
        data: {
          title: "اجتماع أولياء الأمور",
          content: "ندعو جميع أولياء الأمور لحضور الاجتماع السنوي يوم الخميس الموافق 15/10/2026 الساعة 4 عصراً.",
          priority: "normal",
          targetRole: "parents",
          authorId: admins[0].id,
          isActive: true
        }
      }),
      db.announcement.create({
        data: {
          title: "إجازة العيد الوطني",
          content: "تعلن إدارة المدرسة عن إجازة العيد الوطني اعتباراً من يوم الأحد الموافق 22/سبتمبر لمدة أسبوع.",
          priority: "high",
          targetRole: "all",
          authorId: principal.id,
          isActive: true
        }
      })
    ]);

    // Create Notifications
    for (const admin of admins) {
      await db.notification.create({
        data: {
          title: "مرحباً بك في النظام",
          message: "تم تفعيل حسابك بنجاح. يمكنك الآن الدخول للنظام.",
          type: "info",
          userId: admin.id
        }
      });
    }

    return NextResponse.json({ 
      success: true,
      message: "Database seeded successfully",
      data: {
        classes: classes.length,
        subjects: subjects.length,
        teachers: teachers.length,
        students: students.length,
        parents: parents.length
      }
    });

  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ 
      error: "Failed to seed database",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
