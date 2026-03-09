import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    // Get student info
    const student = await db.student.findFirst({
      where: { userId: userId || "" },
      include: {
        class: true,
        grades: {
          include: {
            classSubject: {
              include: { subject: true }
            }
          }
        },
        attendance: true
      }
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Calculate average grade
    let totalScore = 0;
    let totalMaxScore = 0;
    for (const grade of student.grades) {
      totalScore += grade.score;
      totalMaxScore += grade.maxScore;
    }
    const averageGrade = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

    // Calculate attendance rate
    const totalAttendance = student.attendance.length;
    const presentAttendance = student.attendance.filter(a => a.status === "present").length;
    const attendanceRate = totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0;

    // Get today's schedule
    const today = new Date().getDay();
    const todaySchedule = student.classId ? await db.schedule.findMany({
      where: {
        classId: student.classId,
        dayOfWeek: today
      },
      include: {
        classSubject: {
          include: {
            subject: true,
            teacher: {
              include: { user: { select: { name: true } } }
            }
          }
        }
      },
      orderBy: { startTime: "asc" }
    }) : [];

    // Get total subjects
    const totalSubjects = await db.classSubject.count({
      where: { classId: student.classId || "" }
    });

    // Calculate rank (simplified)
    const classmates = await db.student.findMany({
      where: { classId: student.classId },
      include: { grades: true }
    });

    const classmatesWithAvg = classmates.map(c => {
      const total = c.grades.reduce((sum, g) => sum + g.score, 0);
      const max = c.grades.reduce((sum, g) => sum + g.maxScore, 0);
      return {
        id: c.id,
        avg: max > 0 ? (total / max) * 100 : 0
      };
    }).sort((a, b) => b.avg - a.avg);

    const rank = classmatesWithAvg.findIndex(c => c.id === student.id) + 1;

    return NextResponse.json({
      stats: {
        averageGrade,
        attendanceRate,
        totalSubjects,
        rank
      },
      todaySchedule,
      recentGrades: student.grades.slice(-5),
      student
    });

  } catch (error) {
    console.error("Student dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
