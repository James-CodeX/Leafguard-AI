'use client';

import { useState, ChangeEvent, DragEvent } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, Link as LinkIcon, XCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { fetchDataUriFromUrl } from '@/actions/image-actions';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImageReady: (dataUri: string | null) => void;
}

export default function ImageUploader({ onImageReady }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [isLoadingUrl, setIsLoadingUrl] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('file');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: "Error", description: "File is too large. Maximum 5MB allowed.", variant: "destructive" });
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast({ title: "Error", description: "Invalid file type. Please upload an image.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreviewUrl(dataUri);
        onImageReady(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(event.target.value);
  };

  const handleLoadFromUrl = async () => {
    if (!imageUrlInput.trim()) {
      toast({ title: "Error", description: "Please enter an image URL.", variant: "destructive" });
      return;
    }
    setIsLoadingUrl(true);
    try {
      const dataUri = await fetchDataUriFromUrl(imageUrlInput.trim());
      setPreviewUrl(dataUri);
      onImageReady(dataUri);
      toast({ title: "Success", description: "Image loaded from URL." });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ title: "Error loading image from URL", description: errorMessage, variant: "destructive" });
      setPreviewUrl(null);
      onImageReady(null);
    } finally {
      setIsLoadingUrl(false);
    }
  };
  
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: "Error", description: "File is too large. Maximum 5MB allowed.", variant: "destructive" });
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast({ title: "Error", description: "Invalid file type. Please upload an image.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreviewUrl(dataUri);
        onImageReady(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreviewUrl(null);
    setImageUrlInput('');
    onImageReady(null);
    // Reset file input if possible
    const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-lg p-1">
          <TabsTrigger 
            value="file" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            <UploadCloud className="mr-2 h-4 w-4" /> Upload File
          </TabsTrigger>
          <TabsTrigger 
            value="url" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            <LinkIcon className="mr-2 h-4 w-4" /> Image URL
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="file">
          <div 
            className={`mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-all duration-300 ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-secondary/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-2 text-center">
              <motion.div 
                animate={{ scale: isDragging ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <UploadCloud className="mx-auto h-12 w-12 text-primary/80" />
              </motion.div>
              <div className="flex flex-col text-sm">
                <label
                  htmlFor="file-upload-input"
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring"
                >
                  <span className="inline-flex items-center gap-1">
                    <span>Choose a file</span>
                    <span className="text-xs text-muted-foreground">or drag and drop</span>
                  </span>
                  <Input id="file-upload-input" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF, WEBP up to 5MB</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="url">
          <div className="flex flex-col space-y-3 mt-3">
            <div className="flex items-center space-x-2 relative">
              <Input
                type="text"
                placeholder="Paste image URL (e.g., https://example.com/plant.jpg)"
                value={imageUrlInput}
                onChange={handleUrlInputChange}
                className="pr-20 focus-visible:ring-primary"
                disabled={isLoadingUrl}
              />
              <Button 
                onClick={handleLoadFromUrl} 
                disabled={isLoadingUrl} 
                className="absolute right-0 rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
              >
                {isLoadingUrl ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Load'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Enter the URL of an image to analyze</p>
          </div>
        </TabsContent>
      </Tabs>

      {previewUrl && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 rounded-xl shadow-sm relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-border/50"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium flex items-center gap-1.5 text-primary">
              <ImageIcon className="h-4 w-4" /> Image Preview
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearPreview}
              className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Clear preview"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative bg-secondary/20 dark:bg-gray-700/20 rounded-lg overflow-hidden">
            <Image 
              src={previewUrl} 
              alt="Plant preview" 
              width={400} 
              height={300} 
              className="rounded-md object-contain mx-auto max-h-[250px] w-auto" 
              data-ai-hint="plant leaf"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
