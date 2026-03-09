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
    
    // Get pending fees amount
    const pendingFees = await db.feePayment.aggregate({
      where: { status: "pending" },
      _sum: { amount: true }
    });

    // Get recent students
    const recentStudents = await db.student.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true }
        },
        class: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json({
      stats: {
        totalStudents,
        totalTeachers,
        totalClasses,
        pendingFees: pendingFees._sum.amount || 0
      },
      recentStudents
    });

  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
