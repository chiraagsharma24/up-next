"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - Replace with actual API data
const mockData = {
  "IT Services": [
    { company: "TCS", growth: 25, hiring: 50000, marketCap: 1200 },
    { company: "Infosys", growth: 20, hiring: 40000, marketCap: 800 },
    { company: "Wipro", growth: 18, hiring: 35000, marketCap: 450 },
    { company: "HCL Tech", growth: 22, hiring: 38000, marketCap: 350 },
    { company: "Tech Mahindra", growth: 15, hiring: 30000, marketCap: 250 },
  ],
  "E-commerce": [
    { company: "Flipkart", growth: 30, hiring: 15000, marketCap: 400 },
    { company: "Amazon India", growth: 25, hiring: 12000, marketCap: 350 },
    { company: "Myntra", growth: 20, hiring: 8000, marketCap: 150 },
    { company: "Nykaa", growth: 35, hiring: 5000, marketCap: 120 },
    { company: "Meesho", growth: 40, hiring: 6000, marketCap: 100 },
  ],
  "FinTech": [
    { company: "PayTM", growth: 15, hiring: 8000, marketCap: 180 },
    { company: "PhonePe", growth: 25, hiring: 10000, marketCap: 200 },
    { company: "Razorpay", growth: 30, hiring: 5000, marketCap: 80 },
    { company: "BharatPe", growth: 35, hiring: 4000, marketCap: 60 },
    { company: "CRED", growth: 20, hiring: 3000, marketCap: 40 },
  ],
};

const industries = Object.keys(mockData);

export default function CompanyGrowth() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [data, setData] = useState(mockData[industries[0]]);

  useEffect(() => {
    setData(mockData[selectedIndustry]);
  }, [selectedIndustry]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="company" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="growth"
              fill="#8884d8"
              name="Growth %"
            />
            <Bar
              yAxisId="right"
              dataKey="hiring"
              fill="#82ca9d"
              name="Hiring"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card key={item.company}>
            <CardContent className="pt-6">
              <h3 className="font-semibold">{item.company}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">
                  Growth: {item.growth}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Hiring: {item.hiring.toLocaleString()} positions
                </p>
                <p className="text-sm text-muted-foreground">
                  Market Cap: ₹{item.marketCap}B
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 