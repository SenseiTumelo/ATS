import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Sparkles, ArrowLeft, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { extractTextFromPdf } from "@/lib/pdf-parser";
import ScoreCircle from "@/components/ScoreCircle";
import SectionCard from "@/components/SectionCard";
import TipsList from "@/components/TipsList";
import type { ATSResult } from "@/types/ats";

const Index = () => {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = useCallback(async (file: File) => {
    if (file.type === "application/pdf") {
      try {
        const text = await extractTextFromPdf(file);
        setCvText(text);
        setFileName(file.name);
      } catch {
        toast({ title: "Error", description: "Failed to parse PDF. Try pasting your CV text instead.", variant: "destructive" });
      }
    } else if (file.type === "text/plain") {
      const text = await file.text();
      setCvText(text);
      setFileName(file.name);
    } else {
      toast({ title: "Unsupported file", description: "Please upload a PDF or TXT file.", variant: "destructive" });
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const analyze = async () => {
    if (!cvText.trim() || !jobDescription.trim()) {
      toast({ title: "Missing input", description: "Please provide both your CV and the job description.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-cv", {
        body: { cvText, jobDescription },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setResult(data as ATSResult);
    } catch (e: any) {
      toast({ title: "Analysis failed", description: e.message || "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            ATS Score Checker
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Upload your CV and paste the job description to get an instant ATS compatibility score with actionable tips.
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* CV Upload Panel */}
                <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Your CV
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        isDragOver ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Drop your CV here or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF or TXT files</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.txt"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFile(file);
                        }}
                      />
                    </div>

                    {fileName && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted text-sm">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="truncate flex-1">{fileName}</span>
                        <button onClick={() => { setFileName(null); setCvText(""); }} className="text-muted-foreground hover:text-foreground">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="relative">
                      <div className="absolute inset-x-0 top-0 flex items-center justify-center -mt-3">
                        <span className="bg-card px-2 text-xs text-muted-foreground">or paste your CV text</span>
                      </div>
                      <Textarea
                        value={cvText}
                        onChange={(e) => { setCvText(e.target.value); if (!e.target.value) setFileName(null); }}
                        placeholder="Paste your CV content here..."
                        className="min-h-[180px] resize-none mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Job Description Panel */}
                <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-secondary" />
                      Job Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job description here — include requirements, qualifications, and responsibilities for the best analysis..."
                      className="min-h-[320px] resize-none"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Analyze Button */}
              <div className="flex justify-center">
                <Button
                  onClick={analyze}
                  disabled={isAnalyzing || !cvText.trim() || !jobDescription.trim()}
                  size="lg"
                  className="px-10 py-6 text-lg font-display font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze My CV
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Overall Score */}
              <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                <CardContent className="py-8">
                  <div className="text-center">
                    <h2 className="font-display text-2xl font-bold mb-6">Your ATS Score</h2>
                    <ScoreCircle score={result.overallScore} />
                  </div>
                </CardContent>
              </Card>

              {/* Section Breakdown */}
              <div>
                <h2 className="font-display text-xl font-bold mb-4">Section Breakdown</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {result.sections.map((section, i) => (
                    <SectionCard key={section.name} section={section} index={i} />
                  ))}
                </div>
              </div>

              {/* Improvement Tips */}
              <div>
                <h2 className="font-display text-xl font-bold mb-4">Improvement Tips</h2>
                <TipsList tips={result.tips} />
              </div>

              {/* Re-analyze */}
              <div className="flex justify-center pt-4">
                <Button onClick={reset} variant="outline" size="lg" className="gap-2 font-display">
                  <ArrowLeft className="w-4 h-4" />
                  Analyze Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
