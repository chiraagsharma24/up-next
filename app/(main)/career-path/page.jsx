import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CareerPathExplorer from "./_components/career-path-explorer";

export default function CareerPathPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold gradient-title">CareerPath Explorer</h1>
          <p className="text-muted-foreground mt-2">
            Discover real career journeys and learn from others&apos; experiences
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Career Journeys</CardTitle>
          </CardHeader>
          <CardContent>
            <CareerPathExplorer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 