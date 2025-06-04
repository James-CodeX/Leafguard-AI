'use client';

import { useState, ChangeEvent, DragEvent } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, Link as LinkIcon, XCircle, Loader2 } from 'lucide-react';
import { fetchDataUriFromUrl } from '@/actions/image-actions';
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageReady: (dataUri: string | null) => void;
}

export default function ImageUploader({ onImageReady }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [isLoadingUrl, setIsLoadingUrl] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('file');
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
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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
    // Reset file input if possible (more complex, usually involves recreating the input or form reset)
    const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid w-full grid-cols-2 bg-accent/30">
          <TabsTrigger value="file" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <UploadCloud className="mr-2 h-5 w-5 text-inherit" /> Upload File
          </TabsTrigger>
          <TabsTrigger value="url" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <LinkIcon className="mr-2 h-5 w-5 text-inherit" /> Image URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="file">
          <div 
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors hover:border-primary"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-primary" />
              <div className="flex text-sm text-muted-foreground">
                <label
                  htmlFor="file-upload-input"
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring"
                >
                  <span>Upload a file</span>
                  <Input id="file-upload-input" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WEBP up to 5MB</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="url">
          <div className="flex items-center space-x-2 mt-1">
            <Input
              type="text"
              placeholder="Paste image URL (e.g., https://example.com/plant.jpg)"
              value={imageUrlInput}
              onChange={handleUrlInputChange}
              className="focus-visible:ring-primary"
              disabled={isLoadingUrl}
            />
            <Button onClick={handleLoadFromUrl} disabled={isLoadingUrl} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoadingUrl ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Load'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {previewUrl && (
        <div className="mt-4 p-4 border rounded-lg shadow-sm relative bg-white">
          <h3 className="text-lg font-medium text-center mb-2 text-primary">Image Preview</h3>
          <Image 
            src={previewUrl} 
            alt="Plant preview" 
            width={400} 
            height={300} 
            className="rounded-md object-contain mx-auto max-h-[300px] w-auto" 
            data-ai-hint="plant leaf"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={clearPreview}
            className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
            aria-label="Clear preview"
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
