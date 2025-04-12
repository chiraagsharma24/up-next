"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { fetchCareerStories } from "@/lib/api";
import SubmitJourneyModal from "./submit-journey-modal";

// Sample data for initial load
const sampleStories = [
  {
    id: 1,
    roleTitle: "Software Engineer @ Google",
    timeline: [
      { year: 2018, event: "Started B.Tech in Computer Science" },
      { year: 2020, event: "Internship at Microsoft" },
      { year: 2021, event: "First job at a startup" },
      { year: 2022, event: "Joined Google" }
    ],
    tags: ["React", "Node.js", "DSA", "IIT"],
    motivationQuote: "Rejection is redirection. Keep pushing forward!",
    verified: true
  },
  {
    id: 2,
    roleTitle: "Product Designer @ Figma",
    timeline: [
      { year: 2019, event: "Started learning UI/UX design" },
      { year: 2020, event: "First freelance project" },
      { year: 2021, event: "Joined a design agency" },
      { year: 2022, event: "Joined Figma" }
    ],
    tags: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    motivationQuote: "Design is not just what it looks like, it's how it works.",
    verified: true
  },
  {
    id: 3,
    roleTitle: "Data Scientist @ Amazon",
    timeline: [
      { year: 2017, event: "Started M.Tech in Data Science" },
      { year: 2019, event: "Research internship at IBM" },
      { year: 2020, event: "First job as Data Analyst" },
      { year: 2021, event: "Joined Amazon" }
    ],
    tags: ["Python", "Machine Learning", "SQL", "AWS"],
    motivationQuote: "Data is the new oil. Learn to extract value from it.",
    verified: true
  },
  {
    id: 4,
    roleTitle: "Frontend Developer @ Netflix",
    timeline: [
      { year: 2018, event: "Started learning web development" },
      { year: 2019, event: "Built portfolio projects" },
      { year: 2020, event: "First job at a tech startup" },
      { year: 2021, event: "Joined Netflix" }
    ],
    tags: ["React", "TypeScript", "Next.js", "CSS"],
    motivationQuote: "The best way to predict the future is to create it.",
    verified: true
  },
  {
    id: 5,
    roleTitle: "Backend Engineer @ Stripe",
    timeline: [
      { year: 2017, event: "Started B.Tech in Computer Science" },
      { year: 2019, event: "Open source contributions" },
      { year: 2020, event: "First job as Backend Developer" },
      { year: 2021, event: "Joined Stripe" }
    ],
    tags: ["Java", "Spring Boot", "Microservices", "AWS"],
    motivationQuote: "Code is poetry. Write it with passion.",
    verified: true
  }
];

const StoryCard = ({ story }) => {
  return (
    <div className="bg-card rounded-lg p-6 mb-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{story.roleTitle}</h3>
        {story.verified && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Verified Journey
          </Badge>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Timeline</h4>
          <div className="space-y-1">
            {story.timeline.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-16 text-sm font-medium">{item.year}</div>
                <div className="flex-1 text-sm">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Skills & Tools</h4>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
        
        {story.motivationQuote && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm italic">"{story.motivationQuote}"</p>
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" className="gap-2">
            <span>Inspire Me</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input
        placeholder="Search by role or company"
        className="max-w-xs"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      
      <Select
        value={filters.collegeTier}
        onValueChange={(value) => setFilters({ ...filters, collegeTier: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="College Tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tier1">Tier 1 (IIT/NIT)</SelectItem>
          <SelectItem value="tier2">Tier 2</SelectItem>
          <SelectItem value="tier3">Tier 3</SelectItem>
          <SelectItem value="any">Any</SelectItem>
        </SelectContent>
      </Select>
      
      <Select
        value={filters.experience}
        onValueChange={(value) => setFilters({ ...filters, experience: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="internship">Internship</SelectItem>
          <SelectItem value="entry">Entry Level</SelectItem>
          <SelectItem value="mid">Mid Level</SelectItem>
          <SelectItem value="senior">Senior Level</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const CareerPathExplorer = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    collegeTier: "any",
    experience: "any"
  });
  
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  
  // Load initial stories
  useEffect(() => {
    const loadInitialStories = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchCareerStories(1, filters);
        setStories(data.stories);
        setHasMore(data.hasMore);
        setPage(1);
      } catch (err) {
        console.error("Error loading initial stories:", err);
        setError("Failed to load stories. Please try again later.");
        // Fallback to sample data
        setStories(sampleStories);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialStories();
  }, [filters]);
  
  const loadMoreStories = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchCareerStories(nextPage, filters);
      
      setStories(prev => [...prev, ...data.stories]);
      setPage(nextPage);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error loading more stories:", error);
      // Don't set error state here to avoid disrupting the user experience
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, filters]);
  
  useEffect(() => {
    if (inView) {
      loadMoreStories();
    }
  }, [inView, loadMoreStories]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <FilterBar filters={filters} setFilters={setFilters} />
        <SubmitJourneyModal />
      </div>
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        {stories.length === 0 && !loading ? (
          <div className="text-center py-10 text-muted-foreground">
            No stories found. Try adjusting your filters.
          </div>
        ) : (
          stories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))
        )}
        
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-6 mb-6 border">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <div className="space-y-1">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="h-5 w-16" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && hasMore && (
          <div ref={ref} className="h-10" />
        )}
        
        {!hasMore && stories.length > 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No more stories to load
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPathExplorer; 