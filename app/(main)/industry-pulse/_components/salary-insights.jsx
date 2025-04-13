"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchSalaryInsights } from "@/lib/gemini";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

// Fallback data in case API fails
const fallbackData = [
  { year: 2019, salary: 800000 },
  { year: 2020, salary: 850000 },
  { year: 2021, salary: 950000 },
  { year: 2022, salary: 1050000 },
  { year: 2023, salary: 1200000 },
];

export default function SalaryInsights() {
  const [role, setRole] = useState("software-engineer");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const salaryData = await fetchSalaryInsights(role);
        if (salaryData && Array.isArray(salaryData) && salaryData.length > 0) {
          setData(salaryData);
        } else {
          console.warn("Using fallback data due to empty or invalid API response");
          setData(fallbackData);
        }
      } catch (err) {
        console.error("Error fetching salary insights:", err);
        setError("Failed to load salary insights. Please try again later.");
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [role]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="software-engineer">Software Engineer</SelectItem>
            <SelectItem value="data-scientist">Data Scientist</SelectItem>
            <SelectItem value="product-manager">Product Manager</SelectItem>
            <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
            <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="salary"
                stroke="#8884d8"
                name="Average Salary (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-24 mb-2" />
                <div className="mt-2 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold">Starting Salary</h3>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>
                    ₹{data[0]?.salary && typeof data[0].salary === 'number' ? data[0].salary.toLocaleString() : '0'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {data[0]?.year}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold">Current Salary</h3>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span>
                    ₹{data[data.length - 1]?.salary && typeof data[data.length - 1].salary === 'number' ? data[data.length - 1].salary.toLocaleString() : '0'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {data[data.length - 1]?.year}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold">Growth</h3>
                <p className="text-2xl font-bold mt-2">
                  {((data[data.length - 1]?.salary - data[0]?.salary) / data[0]?.salary * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {data[0]?.year} - {data[data.length - 1]?.year}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
} 