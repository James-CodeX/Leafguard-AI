
'use client';

import { useState } from 'react';
import ImageUploader from '@/components/leafguard/image-uploader';
import ResultsDisplay from '@/components/leafguard/results-display';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { detectPlantDisease, type DetectPlantDiseaseOutput } from '@/ai/flows/detect-plant-disease';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<DetectPlantDiseaseOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageReady = (dataUri: string | null) => {
    console.log('HomePage: handleImageReady called. imageDataUri will be set to:', dataUri ? dataUri.substring(0, 50) + '...' : null); // Diagnostic log
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
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center space-y-8">
        <section className="w-full max-w-2xl p-6 bg-card shadow-xl rounded-lg border border-border">
          <h2 className="text-3xl font-headline text-center mb-6 text-primary font-bold flex items-center justify-center gap-2">
            <Sparkles className="h-7 w-7" />
            Identify Plant Issues
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Upload an image of your plant, and our AI will help diagnose potential diseases and offer treatment advice.
          </p>
          <ImageUploader onImageReady={handleImageReady} />
          
          {/* Diagnostic text and Analyze Plant Button */}
          {imageDataUri && (
            <>
              {/* You can remove this diagnostic paragraph once the issue is resolved */}
              <p className="text-xs text-muted-foreground mt-2 text-center">Diagnostic: Image data is loaded and ready for analysis.</p>
              <Button
                onClick={handleAnalyzePlant}
                disabled={isLoadingAnalysis}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                aria-label="Analyze plant image"
              >
                {isLoadingAnalysis ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                {isLoadingAnalysis ? 'Analyzing...' : 'Analyze Plant'}
              </Button>
            </>
          )}
        </section>

        {(isLoadingAnalysis || error || analysisResult) && (
           <section className="w-full max-w-2xl">
            <ResultsDisplay
              diagnosis={analysisResult?.diagnosis ?? null}
              treatment={analysisResult?.treatment ?? null}
              isLoading={isLoadingAnalysis}
              error={error}
            />
          </section>
        )}
      </main>
      <footer className="text-center p-6 text-muted-foreground text-sm border-t border-border">
        LeafGuard AI &copy; {new Date().getFullYear()} - Your personal plant health assistant.
      </footer>
    </div>
  );
}
