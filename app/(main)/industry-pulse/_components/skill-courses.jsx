"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, ExternalLink, Loader2 } from "lucide-react";
import { fetchSkillCourses } from "@/lib/gemini";
import { Skeleton } from "@/components/ui/skeleton";

const skills = [
  "Programming",
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Mobile Development",
  "UI/UX Design"
];

export default function SkillCourses() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const courseData = await fetchSkillCourses(selectedSkill);
        if (courseData && courseData.english && courseData.hindi) {
          setData(courseData);
        } else {
          throw new Error("Invalid course data received");
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedSkill]);

  const CourseCard = ({ course, language }) => (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-2 mb-2">{course.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{course.provider}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(course.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {language === 'english' ? 'View Course' : 'कोर्स देखें'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select skill" />
          </SelectTrigger>
          <SelectContent>
            {skills.map((skill) => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <Tabs defaultValue="english" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="english">English Courses</TabsTrigger>
          <TabsTrigger value="hindi">हिंदी कोर्स</TabsTrigger>
        </TabsList>

        <TabsContent value="english">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-10 w-full mt-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data?.english.map((course, index) => (
                <CourseCard key={index} course={course} language="english" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="hindi">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-10 w-full mt-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data?.hindi.map((course, index) => (
                <CourseCard key={index} course={course} language="hindi" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 