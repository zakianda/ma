import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    // Get teacher info
    const teacher = await db.teacher.findFirst({
      where: { userId: userId || "" },
      include: {
        classSubjects: {
          include: {
            class: true,
            subject: true
          }
        }
      }
    });

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    // Get unique classes
    const classIds = [...new Set(teacher.classSubjects.map(cs => cs.classId))];
    const totalClasses = classIds.length;

    // Get total students in teacher's classes
    const students = await db.student.count({
      where: {
        classId: { in: classIds }
      }
    });

    // Get today's schedule
    const today = new Date().getDay();
    const todaySchedule = await db.schedule.findMany({
      where: {
        teacherId: teacher.id,
        dayOfWeek: today
      },
      include: {
        classSubject: {
          include: {
            class: true,
            subject: true
          }
        }
      },
      orderBy: { startTime: "asc" }
    });

    // Get pending grades count
    const pendingGrades = await db.grade.count({
      where: {
        classSubject: { teacherId: teacher.id },
        score: 0
      }
    });

    return NextResponse.json({
      stats: {
        totalClasses,
        totalStudents: students,
        todayClasses: todaySchedule.length,
        pendingGrades
      },
      todaySchedule,
      teacher
    });

  } catch (error) {
    console.error("Teacher dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
