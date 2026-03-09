import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    // Validate input
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "يرجى إدخال جميع البيانات المطلوبة" },
        { status: 400 }
      );
    }

    // Find user by email and role
    const user = await db.user.findFirst({
      where: {
        email: email,
        role: role,
        isActive: true
      },
      include: {
        student: {
          include: {
            class: true,
            parent: {
              include: {
                user: true
              }
            }
          }
        },
        teacher: true,
        parent: {
          include: {
            students: {
              include: {
                class: true,
                user: true
              }
            }
          }
        }
      }
    });

    // If user exists, verify password
    if (user) {
      if (user.password !== password) {
        return NextResponse.json(
          { error: "كلمة المرور غير صحيحة" },
          { status: 401 }
        );
      }

      // Return user data
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        student: user.student,
        teacher: user.teacher,
        parent: user.parent ? {
          ...user.parent,
          students: user.parent.students
        } : null
      };

      return NextResponse.json({
        success: true,
        user: userData
      });
    }

    // If user doesn't exist, create a new one (demo mode)
    const newUser = await db.user.create({
      data: {
        email: email,
        password: password,
        name: email.split('@')[0],
        role: role,
        isActive: true
      },
      include: {
        student: true,
        teacher: true,
        parent: true
      }
    });

    // Create related profile based on role
    if (role === 'STUDENT') {
      const student = await db.student.create({
        data: {
          userId: newUser.id,
          admissionNo: `STU${Date.now().toString().slice(-6)}`,
          dateOfBirth: new Date('2010-01-01'),
          gender: 'male'
        }
      });
    } else if (role === 'TEACHER') {
      const teacher = await db.teacher.create({
        data: {
          userId: newUser.id,
          employeeId: `T${Date.now().toString().slice(-6)}`,
          qualification: "غير محدد",
          specialization: "غير محدد"
        }
      });
    } else if (role === 'PARENT') {
      const parent = await db.parent.create({
        data: {
          userId: newUser.id,
          occupation: "غير محدد"
        }
      });
    }

    // Get the complete user data
    const completeUser = await db.user.findUnique({
      where: { id: newUser.id },
      include: {
        student: {
          include: { class: true }
        },
        teacher: true,
        parent: {
          include: {
            students: {
              include: {
                class: true,
                user: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        id: completeUser!.id,
        email: completeUser!.email,
        name: completeUser!.name,
        role: completeUser!.role,
        phone: completeUser!.phone,
        avatar: completeUser!.avatar,
        student: completeUser!.student,
        teacher: completeUser!.teacher,
        parent: completeUser!.parent ? {
          ...completeUser!.parent,
          students: completeUser!.parent.students
        } : null
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}
