import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobTrendsMap from "./_components/job-trends-map";
import SalaryInsights from "./_components/salary-insights";
import CompanyGrowth from "./_components/company-growth";
import SkillDemand from "./_components/skill-demand";
import SkillCourses from "./_components/skill-courses";

export default function IndustryPulsePage() {
  return (
    <div className="space-y-6">
      <div className="pb-6">
        <h1 className="text-6xl font-bold gradient-title">Industry Pulse</h1>
        <p className="text-muted-foreground">
          Real-time insights into job market trends and opportunities
        </p>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Job Trends</TabsTrigger>
          <TabsTrigger value="salary">Salary Insights</TabsTrigger>
          <TabsTrigger value="companies">Company Growth</TabsTrigger>
          <TabsTrigger value="skills">Skill Demand</TabsTrigger>
          <TabsTrigger value="courses">Learn Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Market Heat Map</CardTitle>
            </CardHeader>
            <CardContent>
              <JobTrendsMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Salary Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <SalaryInsights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Growth Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <CompanyGrowth />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Demand Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillDemand />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learn In-Demand Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillCourses />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 