"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";

const SubmitJourneyModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    roleTitle: "",
    timeline: [{ year: "", event: "" }],
    tags: "",
    motivationQuote: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddTimelineItem = () => {
    setFormData({
      ...formData,
      timeline: [...formData.timeline, { year: "", event: "" }],
    });
  };

  const handleRemoveTimelineItem = (index) => {
    const newTimeline = [...formData.timeline];
    newTimeline.splice(index, 1);
    setFormData({
      ...formData,
      timeline: newTimeline,
    });
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index][field] = value;
    setFormData({
      ...formData,
      timeline: newTimeline,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // In a real implementation, this would send the data to the server
      // await fetch('/api/stories', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     tags: formData.tags.split(',').map(tag => tag.trim()),
      //   }),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setFormData({
          roleTitle: "",
          timeline: [{ year: "", event: "" }],
          tags: "",
          motivationQuote: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error submitting journey:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Submit My Journey</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Your Career Journey</DialogTitle>
          <DialogDescription>
            Inspire others by sharing your path to success. Your journey will be anonymized.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roleTitle">Current Role</Label>
              <Input
                id="roleTitle"
                placeholder="e.g., Software Engineer @ Google"
                value={formData.roleTitle}
                onChange={(e) =>
                  setFormData({ ...formData, roleTitle: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Career Timeline</Label>
              <div className="space-y-3">
                {formData.timeline.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="w-24">
                      <Input
                        placeholder="Year"
                        value={item.year}
                        onChange={(e) =>
                          handleTimelineChange(index, "year", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Event (e.g., Started B.Tech, Joined Company)"
                        value={item.event}
                        onChange={(e) =>
                          handleTimelineChange(index, "event", e.target.value)
                        }
                        required
                      />
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTimelineItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleAddTimelineItem}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Timeline Item
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags">Skills & Tools (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g., React, Node.js, DSA, IIT"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="motivationQuote">Motivational Quote (optional)</Label>
              <Textarea
                id="motivationQuote"
                placeholder="A quote that inspired you during your journey"
                value={formData.motivationQuote}
                onChange={(e) =>
                  setFormData({ ...formData, motivationQuote: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : success ? "Submitted!" : "Submit Journey"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitJourneyModal; 