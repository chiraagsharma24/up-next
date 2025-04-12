"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLinkedInOptimization } from "@/lib/gemini";
import { ExternalLink, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

// Fallback data in case API fails
const fallbackData = {
  profile: {
    headline: "Software Engineer | Full Stack Developer | React & Node.js Expert",
    summary: "Experienced software engineer with a passion for building scalable web applications. Proficient in React, Node.js, and cloud technologies. Seeking opportunities to leverage my skills in a challenging role.",
    recommendations: [
      "Add more specific achievements with metrics (e.g., 'Improved application performance by 40%')",
      "Include relevant certifications (AWS, Azure, etc.)",
      "Highlight leadership experience if applicable"
    ]
  },
  posts: [
    {
      title: "Building Scalable Web Applications with React and Node.js",
      content: "Excited to share my latest project where I implemented a microservices architecture using React and Node.js. Key learnings: 1) Proper service separation 2) API gateway implementation 3) Database optimization. #WebDevelopment #ReactJS #NodeJS",
      hashtags: ["#WebDevelopment", "#ReactJS", "#NodeJS", "#Microservices"]
    },
    {
      title: "My Journey from Junior to Senior Developer",
      content: "5 years ago, I started as a junior developer. Today, I'm leading a team of 5 developers. Here are the key lessons I learned: 1) Always be learning 2) Take ownership 3) Mentor others 4) Focus on business impact. What's your career journey? #CareerGrowth #TechCareer",
      hashtags: ["#CareerGrowth", "#TechCareer", "#Leadership", "#DeveloperJourney"]
    },
    {
      title: "The Future of Web Development: My Predictions for 2023",
      content: "As we approach the end of 2023, I'm sharing my thoughts on web development trends: 1) AI-powered development tools 2) WebAssembly gaining traction 3) Edge computing becoming mainstream 4) Increased focus on accessibility. What trends are you seeing? #WebDev #FutureOfTech",
      hashtags: ["#WebDev", "#FutureOfTech", "#AI", "#WebAssembly"]
    }
  ]
};

export default function LinkedInOptimizer() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [targetPosition, setTargetPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const handleOptimize = async () => {
    if (!linkedinUrl || !targetPosition) {
      setError("Please provide both your LinkedIn URL and target position");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const optimizationData = await fetchLinkedInOptimization(linkedinUrl, targetPosition);
      if (optimizationData && optimizationData.profile && optimizationData.posts) {
        setData(optimizationData);
      } else {
        console.warn("Using fallback data due to empty or invalid API response");
        setData(fallbackData);
      }
    } catch (err) {
      console.error("Error fetching LinkedIn optimization:", err);
      setError("Failed to analyze your LinkedIn profile. Please try again later.");
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="linkedin-url" className="text-sm font-medium">
            Your LinkedIn Profile URL
          </label>
          <Input
            id="linkedin-url"
            placeholder="https://www.linkedin.com/in/your-profile"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="target-position" className="text-sm font-medium">
            Target Position
          </label>
          <Input
            id="target-position"
            placeholder="e.g., Senior Frontend Developer"
            value={targetPosition}
            onChange={(e) => setTargetPosition(e.target.value)}
          />
        </div>
      </div>

      <Button 
        onClick={handleOptimize} 
        className="w-full"
        disabled={loading || !linkedinUrl || !targetPosition}
      >
        {loading ? "Analyzing..." : "Optimize My Profile"}
      </Button>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {data && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Optimization</TabsTrigger>
            <TabsTrigger value="posts">Suggested Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Optimized Headline</h3>
                    <div className="p-3 bg-muted rounded-md">
                      {loading ? (
                        <Skeleton className="h-6 w-full" />
                      ) : (
                        <p>{data.profile.headline}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Optimized Summary</h3>
                    <div className="p-3 bg-muted rounded-md">
                      {loading ? (
                        <Skeleton className="h-24 w-full" />
                      ) : (
                        <p className="whitespace-pre-line">{data.profile.summary}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Additional Recommendations</h3>
                  <ul className="space-y-2">
                    {loading ? (
                      Array(3).fill(0).map((_, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </li>
                      ))
                    ) : (
                      data.profile.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                Array(3).fill(0).map((_, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                data.posts.map((post, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="whitespace-pre-line">{post.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.hashtags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-sm text-blue-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            Copy to Clipboard
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
} 