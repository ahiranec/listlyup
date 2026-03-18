/**
 * Real AI Service
 * Uses Google Vision API + LLM (OpenAI/Claude) via Supabase Edge Function
 * 
 * RECOMMENDED: Use Supabase Edge Function to keep API keys secure
 * ALTERNATIVE: Direct API calls (not recommended - exposes keys)
 */

import type { IAIService } from './AIService';
import type { AISuggestions, AIAnalyzeOptions, ServiceResult } from '../types';

export class RealAIService implements IAIService {
  
  private readonly supabaseUrl: string;
  private readonly supabaseKey: string;
  private readonly useEdgeFunction: boolean;
  
  constructor(useEdgeFunction = true) {
    try {
      const env = import.meta?.env ?? {};
      this.supabaseUrl = env.VITE_SUPABASE_URL || '';
      this.supabaseKey = env.VITE_SUPABASE_ANON_KEY || '';
    } catch {
      this.supabaseUrl = '';
      this.supabaseKey = '';
    }
    this.useEdgeFunction = useEdgeFunction;
  }
  
  async analyzeListing(
    options: AIAnalyzeOptions
  ): Promise<ServiceResult<AISuggestions>> {
    
    try {
      if (this.useEdgeFunction) {
        return await this.analyzeViaEdgeFunction(options);
      } else {
        // Direct API calls (not implemented for security)
        // Would require exposing API keys in frontend
        throw new Error('Direct API calls not supported. Use Edge Function.');
      }
    } catch (error) {
      console.error('❌ AI Service error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
  
  isAvailable(): boolean {
    return !!(this.supabaseUrl && this.supabaseKey);
  }
  
  getServiceType(): 'mock' | 'real' {
    return 'real';
  }
  
  // ============================================
  // PRIVATE METHODS
  // ============================================
  
  /**
   * Call Supabase Edge Function for AI analysis
   * Edge Function handles Google Vision + LLM with secure API keys
   */
  private async analyzeViaEdgeFunction(
    options: AIAnalyzeOptions
  ): Promise<ServiceResult<AISuggestions>> {
    
    const response = await fetch(
      `${this.supabaseUrl}/functions/v1/analyze-listing`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.supabaseKey}`,
        },
        body: JSON.stringify({
          images: options.images,
          maxSuggestions: options.maxSuggestions || 5,
          language: options.language || 'es',
        }),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Edge function failed: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: data as AISuggestions,
    };
  }
}

/**
 * EXAMPLE: Supabase Edge Function
 * 
 * Create file: /supabase/functions/analyze-listing/index.ts
 * 
 * ```typescript
 * import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
 * 
 * serve(async (req) => {
 *   const { images, maxSuggestions, language } = await req.json();
 *   
 *   // 1. Call Google Vision API
 *   const visionApiKey = Deno.env.get('GOOGLE_VISION_API_KEY');
 *   const visionResponse = await fetch(
 *     `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,
 *     {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({
 *         requests: images.map(url => ({
 *           image: { source: { imageUri: url } },
 *           features: [
 *             { type: 'LABEL_DETECTION', maxResults: 10 },
 *             { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
 *             { type: 'IMAGE_PROPERTIES' },
 *           ],
 *         })),
 *       }),
 *     }
 *   );
 *   
 *   const visionData = await visionResponse.json();
 *   
 *   // 2. Call OpenAI/Claude to generate suggestions
 *   const openaiKey = Deno.env.get('OPENAI_API_KEY');
 *   const llmResponse = await fetch(
 *     'https://api.openai.com/v1/chat/completions',
 *     {
 *       method: 'POST',
 *       headers: {
 *         'Content-Type': 'application/json',
 *         'Authorization': `Bearer ${openaiKey}`,
 *       },
 *       body: JSON.stringify({
 *         model: 'gpt-4o',
 *         messages: [
 *           {
 *             role: 'system',
 *             content: 'You are an expert at analyzing product images for marketplace listings.',
 *           },
 *           {
 *             role: 'user',
 *             content: `Based on this Vision API analysis: ${JSON.stringify(visionData)}
 *               
 *               Generate a JSON response with:
 *               - title: Product title in ${language}
 *               - description: Brief description
 *               - category: Main category
 *               - subcategory: Subcategory
 *               - hashtags: Array of ${maxSuggestions} hashtags
 *               - attributes: { brand, model, color, size }
 *               - confidence: 0-1
 *             `,
 *           },
 *         ],
 *         response_format: { type: 'json_object' },
 *       }),
 *     }
 *   );
 *   
 *   const llmData = await llmResponse.json();
 *   const suggestions = JSON.parse(llmData.choices[0].message.content);
 *   
 *   return new Response(JSON.stringify(suggestions), {
 *     headers: { 'Content-Type': 'application/json' },
 *   });
 * });
 * ```
 * 
 * Deploy with: `supabase functions deploy analyze-listing`
 * Set secrets: `supabase secrets set GOOGLE_VISION_API_KEY=xxx OPENAI_API_KEY=xxx`
 */
