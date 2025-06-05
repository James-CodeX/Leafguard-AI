'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/leafguard/image-uploader';
import ResultsDisplay from '@/components/leafguard/results-display';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { detectPlantDisease, type DetectPlantDiseaseOutput } from '@/ai/flows/detect-plant-disease';
import { Loader2, Sparkles, Leaf, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

export default function HomePage() {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<DetectPlantDiseaseOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(2023); // Default year to prevent hydration mismatch
  const { toast } = useToast();

  // Set the current year after component mounts to prevent hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleImageReady = (dataUri: string | null) => {
    setImageDataUri(dataUri);
    setAnalysisResult(null);
    setError(null);
    if (!dataUri) {
       toast({ title: "Image Cleared", description: "Upload a new image to analyze." });
    }
  };

  const handleAnalyzePlant = async () => {
    if (!imageDataUri) {
      setError("Please upload or load an image first.");
      toast({ title: "Error", description: "Please upload or load an image first.", variant: "destructive" });
      return;
    }
    setIsLoadingAnalysis(true);
    setError(null);
    setAnalysisResult(null);
    try {
      toast({ title: "Analyzing...", description: "Our AI is inspecting your plant." });
      const result = await detectPlantDisease({ photoDataUri: imageDataUri });
      setAnalysisResult(result);
      toast({ title: "Analysis Complete!", description: "Results are displayed below.", variant: "default" });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during analysis.";
      setError("Failed to analyze plant. " + errorMessage);
      toast({ title: "Analysis Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-body">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center space-y-10 max-w-5xl">
        <section className="text-center max-w-2xl mx-auto mb-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Plant Health Analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload an image of your plant and let our AI diagnose issues and recommend treatments.
            </p>
          </motion.div>
        </section>
        
        <motion.section 
          className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-sm opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-800 p-2 rounded-full">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-6 gradient-text">
              Upload Your Plant Image
            </h2>
            <ImageUploader onImageReady={handleImageReady} />
            
            {imageDataUri && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <Button
                  onClick={handleAnalyzePlant}
                  disabled={isLoadingAnalysis}
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  aria-label="Analyze plant image"
                >
                  {isLoadingAnalysis ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing your plant...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Analyze Plant</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.section>

        {(isLoadingAnalysis || error || analysisResult) && (
          <motion.section 
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsDisplay
              diagnosis={analysisResult?.diagnosis ?? null}
              treatment={analysisResult?.treatment ?? null}
              isLoading={isLoadingAnalysis}
              error={error}
            />
          </motion.section>
        )}
      </main>
      <footer className="text-center p-8 text-muted-foreground text-sm border-t border-border/40 bg-background/50 dark:bg-background/10 backdrop-blur-sm">
        <div className="container mx-auto">
          <p className="mb-2">LeafGuard AI &copy; {currentYear} - Your personal plant health assistant.</p>
          <p className="text-xs text-muted-foreground/70">
            Helping gardeners identify and treat plant diseases with AI technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
