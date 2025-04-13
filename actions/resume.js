"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { generateLatexResume } from "@/app/lib/latex-resume";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
You are a professional technical resume writer specialized in software engineering roles.

Your task is to improve the following ${type} description for a Software Development Engineer (SDE) resume.

Rewrite it in a single bullet point with the following standards:

1. Start with a strong action verb (e.g., "Developed", "Optimized", "Implemented").
2. Include measurable outcomes or metrics (e.g., "reduced load time by 40%", "improved coverage to 95%").
3. Mention relevant technologies, languages, frameworks, tools.
4. Keep it between 20-30 words, focus on impact over tasks.
5. Follow industry standards used in FAANG or top-tier company resumes.
6. Use keywords likely to pass ATS scans (e.g., REST API, React, AWS, CI/CD, algorithms, scalable, etc).

Example:
❌ "Worked on a project using Node.js"
✔️ "Built and deployed a scalable REST API with Node.js and PostgreSQL, handling 10K+ requests/day, reducing server response time by 30%"

Now, improve this description:
"${current}"

Output only the improved bullet point, no extra text.
`;


  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

export async function generateLatexResumeAction() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Get the user's resume data
    const resume = await db.resume.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    // Parse the resume content
    const resumeData = JSON.parse(resume.content);
    
    // Generate LaTeX content
    const latexContent = generateLatexResume(resumeData);
    
    return { success: true, latexContent };
  } catch (error) {
    console.error("Error generating LaTeX resume:", error);
    throw new Error("Failed to generate LaTeX resume");
  }
}
