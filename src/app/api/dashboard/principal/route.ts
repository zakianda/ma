import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get total students
    const totalStudents = await db.student.count();
    
    // Get total teachers
    const totalTeachers = await db.teacher.count();
    
    // Get total classes
    const totalClasses = await db.class.count();
    
    // Get total revenue from paid fees
    const paidFees = await db.feePayment.aggregate({
      where: { status: "paid" },
      _sum: { amount: true }
    });

    // Get attendance rate
    const totalAttendance = await db.attendance.count();
    const presentAttendance = await db.attendance.count({
      where: { status: "present" }
    });
    const attendanceRate = totalAttendance > 0 
      ? Math.round((presentAttendance / totalAttendance) * 100) 
      : 0;

    // Get active announcements
    const activeAnnouncements = await db.announcement.count({
      where: { isActive: true }
    });

    // Get recent announcements
    const announcements = await db.announcement.findMany({
      take: 5,
      orderBy: { publishDate: "desc" },
      include: {
        author: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json({
      stats: {
        totalStudents,
        totalTeachers,
        totalClasses,
        totalRevenue: paidFees._sum.amount || 0,
        attendanceRate,
        activeAnnouncements
      },
      announcements
    });

  } catch (error) {
    console.error("Principal dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
