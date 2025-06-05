'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle2, Leaf, ThumbsUp, Pill } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from 'framer-motion';

interface ResultsDisplayProps {
  diagnosis: string | null;
  treatment: string | null;
  isLoading: boolean;
  error: string | null;
}

export default function ResultsDisplay({ diagnosis, treatment, isLoading, error }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full glass-card shadow-xl overflow-hidden">
        <CardHeader className="bg-secondary/50 dark:bg-gray-800/50 pb-6">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-sm opacity-70 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-1.5 rounded-full">
                <Leaf className="h-6 w-6 text-primary animate-pulse" />
              </div>
            </div>
          </div>
          <CardTitle className="text-center text-xl font-medium gradient-text">
            Analyzing Your Plant...
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Our AI is examining the image for signs of disease
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div>
            <Skeleton className="h-5 w-1/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div>
            <Skeleton className="h-5 w-1/3 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Alert variant="destructive" className="w-full glass-card border-destructive/20">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="font-medium text-lg mb-2">Analysis Error</AlertTitle>
          <AlertDescription className="text-destructive-foreground/90">
            {error}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (!diagnosis && !treatment) {
    return null; // Don't show anything if there's no data, error, or loading state
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full glass-card shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/30 dark:from-primary/5 dark:to-gray-800/50 pb-6">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-sm opacity-70"></div>
              <div className="relative bg-white dark:bg-gray-800 p-1.5 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          <CardTitle className="text-center text-xl font-medium gradient-text">
            Analysis Complete
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Here's what our AI found about your plant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {diagnosis && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ThumbsUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium gradient-text">Diagnosis</h3>
              </div>
              <div className="pl-7">
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{diagnosis}</p>
              </div>
            </motion.div>
          )}
          {treatment && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Pill className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium gradient-text">Treatment Recommendations</h3>
              </div>
              <div className="pl-7">
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{treatment}</p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
