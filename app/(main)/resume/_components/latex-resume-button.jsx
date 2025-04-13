"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2 } from "lucide-react";
import { generateLatexResume } from "@/app/lib/latex-resume";
import { generateLatexResumeAction } from "@/actions/resume";
import { toast } from "sonner";

export function LatexResumeButton({ resumeData }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLatex = async () => {
    if (!resumeData) {
      toast.error("No resume data available. Please fill in your resume first.");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Try to use the server action first
      try {
        const result = await generateLatexResumeAction();
        if (result.success && result.latexContent) {
          downloadLatexFile(result.latexContent);
          return;
        }
      } catch (serverError) {
        console.warn("Server-side LaTeX generation failed, trying API endpoint:", serverError);
        
        // Try the API endpoint as a fallback
        try {
          const response = await fetch('/api/resume/latex');
          if (response.ok) {
            const data = await response.json();
            if (data.latexContent) {
              downloadLatexFile(data.latexContent);
              return;
            }
          }
        } catch (apiError) {
          console.warn("API endpoint failed, falling back to client-side:", apiError);
        }
      }
      
      // Fall back to client-side generation
      const latexContent = generateLatexResume(resumeData);
      downloadLatexFile(latexContent);
    } catch (error) {
      console.error("Error generating LaTeX resume:", error);
      toast.error("Failed to generate LaTeX resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadLatexFile = (latexContent) => {
    // Create a blob with the LaTeX content
    const blob = new Blob([latexContent], { type: "text/plain" });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.tex";
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("LaTeX resume downloaded successfully!");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleGenerateLatex}
      disabled={isGenerating || !resumeData}
      className="flex items-center gap-2"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileText className="h-4 w-4" />
      )}
      {isGenerating ? "Generating..." : "Download LaTeX"}
    </Button>
  );
} 