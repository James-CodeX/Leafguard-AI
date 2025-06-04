'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle2, Leaf } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ResultsDisplayProps {
  diagnosis: string | null;
  treatment: string | null;
  isLoading: boolean;
  error: string | null;
}

export default function ResultsDisplay({ diagnosis, treatment, isLoading, error }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl shadow-lg animate-pulse">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline text-primary flex items-center justify-center gap-2">
            <Leaf className="h-7 w-7" /> Analyzing Plant...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
       <Alert variant="destructive" className="w-full max-w-2xl shadow-lg">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <AlertTitle className="font-headline text-xl">Analysis Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
    );
  }

  if (!diagnosis && !treatment) {
    return null; // Don't show anything if there's no data, error, or loading state
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg transition-all duration-500 ease-in-out">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-center text-2xl font-headline text-primary flex items-center justify-center gap-2">
         <CheckCircle2 className="h-7 w-7"/> Analysis Complete
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {diagnosis && (
          <div>
            <h3 className="text-xl font-semibold mb-2 font-headline text-primary-dark">Diagnosis</h3>
            <p className="text-foreground whitespace-pre-wrap">{diagnosis}</p>
          </div>
        )}
        {treatment && (
          <div>
            <h3 className="text-xl font-semibold mb-2 font-headline text-primary-dark">Treatment Recommendations</h3>
            <p className="text-foreground whitespace-pre-wrap">{treatment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
