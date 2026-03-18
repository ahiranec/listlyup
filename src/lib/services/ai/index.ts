/**
 * AI Service Factory
 * Creates appropriate service based on user settings
 */

import { MockAIService } from './MockAIService';
import { RealAIService } from './RealAIService';
import type { IAIService } from './AIService';

/**
 * Create AI service based on enabled flag
 * @param enabled - Whether to use real AI service (from user settings)
 */
export function createAIService(enabled: boolean): IAIService {
  if (enabled) {
    const realService = new RealAIService();
    
    if (realService.isAvailable()) {
      console.log('✅ Using Real AI Service (Vision + LLM)');
      return realService;
    } else {
      console.warn('⚠️ AI enabled but not configured. Install Supabase to activate.');
      console.warn('📝 Falling back to Mock AI Service');
    }
  }
  
  console.log('🎭 Using Mock AI Service (hardcoded suggestions)');
  return new MockAIService();
}

// Re-export types
export type { IAIService } from './AIService';
export type { AISuggestions, AIAnalyzeOptions } from '../types';
