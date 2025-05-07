# UpNext – Full Stack AI Career Coach 🚀

UpNext is a Full Stack AI-powered Career Coach built using Next.js, Neon DB, Tailwind CSS, Prisma, Inngest, and Shadcn UI. It provides everything you need to build a great tech career — from expert guidance to job tracking and resume optimization.

## Live Demo

👉 [Click here to check out the live app](https://up-next-kaxysdnzk-chirag-sharmas-projects-b735b51e.vercel.app/)

## Features

- AI-Powered Career Guidance: Get personalized career advice and insights powered by advanced AI technology.
- Interview Preparation: Practice with role-specific questions and get instant feedback to improve your performance.
- Industry Insights: Stay ahead with real-time industry trends, salary data, and market analysis.
- Smart Resume Creation: Generate ATS-optimized resumes with AI assistance.
- Industry Pulse: Real-time job market trends, salary insights, and company growth metrics.
- LinkedIn Optimizer: Get AI-powered suggestions to optimize your LinkedIn profile and content for your dream job.
- CareerPath Explorer: Discover real career journeys and learn from others' experiences to plan your path to success.
- Job Application Tracker: Track your job applications, manage interviews, and monitor your job search progress in one place.

## Tech Stack

- Next.js 14
- Neon DB
- Tailwind CSS
- Prisma
- Inngest
- Shadcn UI
- Clerk for Authentication
- Gemini API for AI services

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/upnext.git
cd upnext
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root with the following variables:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=
```

4. Push the Prisma schema

```bash
npx prisma db push
```

5. Start the development server

```bash
npm run dev
# or
yarn dev
```

## License

This project is licensed under the MIT License.


