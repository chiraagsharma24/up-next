import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobTrackerDashboard from "./_components/job-tracker-dashboard";

export default function JobTrackerPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Job Application Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Track your job applications, manage interviews, and monitor your job search progress.
        </p>
      </div>
      
      <JobTrackerDashboard />
    </div>
  );
} 