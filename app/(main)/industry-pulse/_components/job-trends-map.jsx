"use client";

import { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchJobMarketData } from "@/lib/gemini";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback data in case API fails
const fallbackData = [
  { location: "Bangalore", jobs: 3500, salary: 1200000, growth: 18 },
  { location: "Mumbai", jobs: 2800, salary: 1100000, growth: 15 },
  { location: "Delhi NCR", jobs: 2500, salary: 1050000, growth: 14 },
  { location: "Hyderabad", jobs: 2000, salary: 950000, growth: 16 },
  { location: "Chennai", jobs: 1800, salary: 900000, growth: 12 },
];

export default function JobTrendsMap() {
  const [timeframe, setTimeframe] = useState("month");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobData = await fetchJobMarketData(timeframe);
        if (jobData && Array.isArray(jobData) && jobData.length > 0) {
          // Ensure all required properties exist
          const validatedData = jobData.map(item => ({
            location: item.location || item.city || "Unknown",
            jobs: typeof item.jobs === 'number' ? item.jobs : (item.jobCount || 0),
            salary: typeof item.salary === 'number' ? item.salary : 0,
            growth: typeof item.growth === 'number' ? item.growth : 0
          }));
          setData(validatedData);
        } else {
          console.warn("Using fallback data due to empty or invalid API response");
          setData(fallbackData);
        }
      } catch (err) {
        console.error("Error fetching job market data:", err);
        setError("Failed to load job market data. Please try again later.");
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeframe]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="h-[400px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="jobs"
                fill="#8884d8"
                name="Job Openings"
              />
              <Bar
                yAxisId="right"
                dataKey="growth"
                fill="#82ca9d"
                name="Growth %"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          Array(5).fill(0).map((_, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-24 mb-2" />
                <div className="mt-2 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          data.map((item) => (
            <Card key={item.location}>
              <CardContent className="pt-6">
                <h3 className="font-semibold">{item.location}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Jobs: {typeof item.jobs === 'number' ? item.jobs.toLocaleString() : '0'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Avg Salary: ₹{typeof item.salary === 'number' ? item.salary.toLocaleString() : '0'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Growth: {typeof item.growth === 'number' ? item.growth : '0'}%
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 