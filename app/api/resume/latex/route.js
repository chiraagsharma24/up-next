import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateLatexResume } from "@/app/lib/latex-resume";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get the user's resume data
    const resume = await db.resume.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    // Parse the resume content
    const resumeData = JSON.parse(resume.content);
    
    // Generate LaTeX content
    const latexContent = generateLatexResume(resumeData);
    
    // Return the LaTeX content
    return NextResponse.json({ latexContent });
  } catch (error) {
    console.error("Error generating LaTeX resume:", error);
    return NextResponse.json(
      { error: "Failed to generate LaTeX resume" },
      { status: 500 }
    );
  }
} 