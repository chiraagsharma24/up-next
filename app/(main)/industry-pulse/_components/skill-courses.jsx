"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSkillCourses } from "@/lib/gemini";
import { ExternalLink, Star } from "lucide-react";

// Fallback data in case API fails
const fallbackData = {
  skill: "JavaScript",
  english: [
    {
      title: "JavaScript Fundamentals",
      provider: "Udemy",
      url: "https://www.udemy.com/course/javascript-fundamentals",
      level: "Beginner",
      rating: 4.5,
      duration: "12 hours"
    },
    {
      title: "Advanced JavaScript Concepts",
      provider: "Coursera",
      url: "https://www.coursera.org/course/advanced-javascript",
      level: "Advanced",
      rating: 4.7,
      duration: "18 hours"
    },
    {
      title: "JavaScript for Web Development",
      provider: "freeCodeCamp",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures",
      level: "Intermediate",
      rating: 4.6,
      duration: "15 hours"
    }
  ],
  hindi: [
    {
      title: "जावास्क्रिप्ट बेसिक्स",
      provider: "YouTube",
      url: "https://www.youtube.com/watch?v=javascript-basics",
      level: "Beginner",
      rating: 4.4,
      duration: "10 hours"
    },
    {
      title: "जावास्क्रिप्ट एडवांस्ड",
      provider: "Udemy",
      url: "https://www.udemy.com/course/javascript-advanced-hindi",
      level: "Advanced",
      rating: 4.5,
      duration: "16 hours"
    },
    {
      title: "वेब डेवलपमेंट के लिए जावास्क्रिप्ट",
      provider: "Coursera",
      url: "https://www.coursera.org/course/javascript-web-hindi",
      level: "Intermediate",
      rating: 4.3,
      duration: "14 hours"
    }
  ]
};

// Popular skills to choose from
const popularSkills = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "Data Science",
  "Machine Learning",
  "AWS",
  "DevOps",
  "UI/UX Design"
];

export default function SkillCourses() {
  const [selectedSkill, setSelectedSkill] = useState(popularSkills[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("english");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const coursesData = await fetchSkillCourses(selectedSkill);
        if (coursesData && coursesData.english && coursesData.hindi) {
          setData(coursesData);
        } else {
          console.warn("Using fallback data due to empty or invalid API response");
          setData(fallbackData);
        }
      } catch (err) {
        console.error("Error fetching skill courses:", err);
        setError("Failed to load course recommendations. Please try again later.");
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedSkill]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learn {selectedSkill}</h2>
        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select skill" />
          </SelectTrigger>
          <SelectContent>
            {popularSkills.map((skill) => (
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="english">English Courses</TabsTrigger>
          <TabsTrigger value="hindi">Hindi Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="english" className="mt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.english.map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{course.provider}</span>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{course.rating} / 5.0</span>
                        <span className="text-sm text-muted-foreground">• {course.duration}</span>
                      </div>
                      <a 
                        href={course.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:underline mt-2"
                      >
                        View Course <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hindi" className="mt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.hindi.map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{course.provider}</span>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{course.rating} / 5.0</span>
                        <span className="text-sm text-muted-foreground">• {course.duration}</span>
                      </div>
                      <a 
                        href={course.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:underline mt-2"
                      >
                        View Course <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 