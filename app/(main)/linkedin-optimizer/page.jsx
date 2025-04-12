import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LinkedInOptimizer from "./_components/linkedin-optimizer";

export default function LinkedInOptimizerPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6">
        <h1 className="text-6xl font-bold gradient-title">LinkedIn Optimizer</h1>
        <p className="text-muted-foreground">
          Optimize your LinkedIn profile and get suggested posts to land your dream job
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <LinkedInOptimizer />
        </CardContent>
      </Card>
    </div>
  );
} 