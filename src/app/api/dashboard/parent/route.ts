import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    // Get parent info with students
    const parent = await db.parent.findFirst({
      where: { userId: userId || "" },
      include: {
        students: {
          include: {
            user: { select: { name: true } },
            class: { select: { name: true } },
            grades: {
              include: {
                classSubject: {
                  include: { subject: true }
                }
              }
            },
            attendance: true
          }
        }
      }
    });

    if (!parent) {
      return NextResponse.json({ error: "Parent not found" }, { status: 404 });
    }

    // Calculate average grade for all children
    let totalGrades = 0;
    let gradeCount = 0;
    let totalAttendance = 0;
    let presentAttendance = 0;

    for (const student of parent.students) {
      for (const grade of student.grades) {
        totalGrades += grade.score;
        gradeCount++;
      }
      for (const att of student.attendance) {
        totalAttendance++;
        if (att.status === "present") presentAttendance++;
      }
    }

    const averageGrade = gradeCount > 0 ? Math.round(totalGrades / gradeCount) : 0;
    const attendanceRate = totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0;

    // Get pending fees
    const pendingFees = await db.feePayment.aggregate({
      where: {
        student: { parentId: parent.id },
        status: "pending"
      },
      _sum: { amount: true }
    });

    return NextResponse.json({
      stats: {
        childrenCount: parent.students.length,
        averageGrade,
        attendanceRate,
        pendingFees: pendingFees._sum.amount || 0
      },
      children: parent.students,
      parent
    });

  } catch (error) {
    console.error("Parent dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
