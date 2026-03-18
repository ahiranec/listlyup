/**
 * Step 1: Media Upload
 * Upload images and optionally use AI to analyze them
 */

import { useState, useEffect } from 'react';
import { Upload, X, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { useAIService, useSettings, useFeatureFlags } from '../../lib/providers/ServiceProvider';
import { mockCurrentUser } from '../../data/currentUser';
import type { AISuggestions } from '../../lib/services/types';

interface MediaStepProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onAISuggestions?: (suggestions: AISuggestions) => void;
  onNext: () => void;
}

export function MediaStep({ images, onImagesChange, onAISuggestions, onNext }: MediaStepProps) {
  const aiService = useAIService();
  const settings = useSettings();
  const featureFlags = useFeatureFlags();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [canUseAI, setCanUseAI] = useState(false);

  // Check feature flag permission
  useEffect(() => {
    const checkPermission = async () => {
      const userPlan = mockCurrentUser.plan || 'free';
      const result = await featureFlags.checkAccess('ai_suggestions', {
        userId: mockCurrentUser.id,
        userPlan: userPlan,
      });
      setCanUseAI(result.allowed);
      
      if (!result.allowed) {
        console.log('AI disabled:', result.reason);
      }
    };
    
    checkPermission();
  }, [featureFlags]);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    
    // Convert files to URLs (in real app, upload to storage)
    const newImages: string[] = [];
    for (let i = 0; i < Math.min(files.length, 10 - images.length); i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newImages.push(url);
    }
    
    const updatedImages = [...images, ...newImages];
    onImagesChange(updatedImages);
    
    // Auto-analyze if enabled
    if (settings.aiAutoAnalyze && settings.aiEnabled && updatedImages.length > 0) {
      await analyzeImages(updatedImages);
    }
  };

  const analyzeImages = async (imagesToAnalyze: string[]) => {
    setIsAnalyzing(true);
    
    try {
      const result = await aiService.analyzeListing({
        images: imagesToAnalyze,
        maxSuggestions: 5,
        language: 'es',
      });
      
      if (result.success && result.data) {
        onAISuggestions?.(result.data);
      }
    } catch (error) {
      console.error('AI analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const canProceed = images.length > 0;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto p-4 space-y-3 w-full max-w-full m-[0px]">
        
        {/* Upload and Camera Areas - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`
              relative border-2 border-dashed rounded-lg p-4
              transition-all duration-200
              ${isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300 hover:border-gray-400'
              }
              ${images.length >= 10 ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={images.length >= 10}
            />
            
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Upload Photos
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Browse files
                </p>
              </div>
            </div>
          </div>

          {/* Camera Capture Area */}
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-4
              transition-all duration-200
              border-gray-300 hover:border-gray-400
              ${images.length >= 10 ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={images.length >= 10}
            />
            
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-500" />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Take Photo
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Open camera
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Count Info */}
        <p className="text-xs text-center text-gray-400">
          {images.length}/10 photos • PNG, JPG up to 10MB
        </p>

        {/* Uploaded Images Grid */}
        {images.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Uploaded Photos ({images.length})</h3>
              
              {/* AI Analyze Button */}
              {!isAnalyzing && images.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => analyzeImages(images)}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI
                  {!settings.aiEnabled && (
                    <Badge variant="secondary" className="text-xs">Demo</Badge>
                  )}
                </Button>
              )}
              
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                  >
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Cover Image Badge */}
                    {index === 0 && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary/90 text-white text-xs">
                          Cover
                        </Badge>
                      </div>
                    )}
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Info Alerts */}
        {images.length === 0 && (
          <Alert>
            <ImageIcon className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">Tips for great photos:</p>
              <ul className="text-sm space-y-1 ml-4 list-disc">
                <li>Use good lighting (natural light works best)</li>
                <li>Show the product from multiple angles</li>
                <li>Include any defects or wear</li>
                <li>First photo will be the cover image</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {settings.aiEnabled && images.length > 0 && (
          <Alert className="border-primary/50 bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertDescription>
              <p className="text-sm">
                AI analysis will automatically suggest title, description, and category
                based on your photos. You can edit everything in the next step!
              </p>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="border-t p-4 bg-white w-full">
        <Button
          onClick={onNext}
          disabled={!canProceed || isAnalyzing}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            `Continue with ${images.length} ${images.length === 1 ? 'photo' : 'photos'}`
          )}
        </Button>
      </div>
    </div>
  );
}