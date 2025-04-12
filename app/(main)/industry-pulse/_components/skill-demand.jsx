"use client";

import { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - Replace with actual API data
const mockData = {
  "Software Development": [
    { skill: "Java", demand: 90, growth: 15, salary: 1200000 },
    { skill: "Python", demand: 85, growth: 20, salary: 1150000 },
    { skill: "React", demand: 80, growth: 25, salary: 1100000 },
    { skill: "Angular", demand: 75, growth: 10, salary: 1050000 },
    { skill: "Node.js", demand: 88, growth: 18, salary: 1180000 },
    { skill: "AWS", demand: 92, growth: 22, salary: 1300000 },
  ],
  "Data Science": [
    { skill: "Python", demand: 95, growth: 25, salary: 1300000 },
    { skill: "R", demand: 75, growth: 8, salary: 1050000 },
    { skill: "SQL", demand: 85, growth: 15, salary: 1150000 },
    { skill: "TensorFlow", demand: 88, growth: 20, salary: 1250000 },
    { skill: "PyTorch", demand: 82, growth: 18, salary: 1200000 },
    { skill: "Tableau", demand: 78, growth: 12, salary: 1100000 },
  ],
  "Digital Marketing": [
    { skill: "SEO", demand: 85, growth: 20, salary: 800000 },
    { skill: "Social Media", demand: 90, growth: 25, salary: 850000 },
    { skill: "Content Marketing", demand: 82, growth: 18, salary: 750000 },
    { skill: "Email Marketing", demand: 75, growth: 15, salary: 700000 },
    { skill: "Analytics", demand: 88, growth: 22, salary: 900000 },
    { skill: "PPC", demand: 80, growth: 16, salary: 820000 },
  ],
};

const fields = Object.keys(mockData);

export default function SkillDemand() {
  const [selectedField, setSelectedField] = useState(fields[0]);
  const [data, setData] = useState(mockData[fields[0]]);

  useEffect(() => {
    setData(mockData[selectedField]);
  }, [selectedField]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {fields.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Demand"
              dataKey="demand"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Growth"
              dataKey="growth"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card key={item.skill}>
            <CardContent className="pt-6">
              <h3 className="font-semibold">{item.skill}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">
                  Demand Score: {item.demand}/100
                </p>
                <p className="text-sm text-muted-foreground">
                  Growth Rate: {item.growth}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Avg Salary: ₹{item.salary.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 