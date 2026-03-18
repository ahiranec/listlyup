/**
 * AI Service Interface
 * Contract for both Mock and Real implementations
 */

import type { AISuggestions, AIAnalyzeOptions, ServiceResult } from '../types';

export interface IAIService {
  /**
   * Analyze images and return suggestions for listing
   */
  analyzeListing(
    options: AIAnalyzeOptions
  ): Promise<ServiceResult<AISuggestions>>;
  
  /**
   * Check if the service is available and configured
   */
  isAvailable(): boolean;
  
  /**
   * Get service type for debugging/logging
   */
  getServiceType(): 'mock' | 'real';
}
