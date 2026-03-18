/**
 * Mock AI Service
 * Returns hardcoded suggestions for development without real APIs
 */

import type { IAIService } from './AIService';
import type { AISuggestions, AIAnalyzeOptions, ServiceResult } from '../types';

export class MockAIService implements IAIService {
  
  private readonly mockTemplates: AISuggestions[] = [
    {
      title: 'iPhone 13 Pro Max 256GB - Excelente Estado',
      description: 'iPhone en perfectas condiciones, sin rayones. Incluye cargador original y caja. Batería al 95%. Siempre usado con protector de pantalla y funda.',
      category: 'Electronics',
      subcategory: 'Smartphones',
      hashtags: ['#iPhone', '#Apple', '#Smartphone', '#iOS', '#256GB'],
      attributes: {
        brand: 'Apple',
        model: 'iPhone 13 Pro Max',
        color: 'Sierra Blue',
        size: '256GB',
      },
      confidence: 0.92,
      detectedObjects: ['smartphone', 'mobile phone', 'electronics'],
      dominantColors: ['blue', 'black'],
    },
    {
      title: 'Nike Air Max 90 Talla 42 - Como Nuevas',
      description: 'Zapatillas Nike Air Max 90 en excelente estado, usadas solo 3 veces. Sin desgaste visible. Caja original incluida.',
      category: 'Fashion',
      subcategory: 'Shoes',
      hashtags: ['#Nike', '#AirMax', '#Sneakers', '#Zapatillas', '#Deportivas'],
      attributes: {
        brand: 'Nike',
        model: 'Air Max 90',
        color: 'White/Red',
        size: '42',
      },
      confidence: 0.88,
      detectedObjects: ['footwear', 'shoes', 'sneakers'],
      dominantColors: ['white', 'red', 'black'],
    },
    {
      title: 'MacBook Pro 16" M1 2021 - 16GB RAM 512GB SSD',
      description: 'MacBook Pro en perfecto estado funcional y estético. Siempre usado con teclado protector. Incluye cargador original. Sin ciclos de batería excesivos.',
      category: 'Electronics',
      subcategory: 'Computers',
      hashtags: ['#MacBook', '#Apple', '#Laptop', '#M1', '#Pro'],
      attributes: {
        brand: 'Apple',
        model: 'MacBook Pro 16"',
        color: 'Space Gray',
        size: '16GB/512GB',
      },
      confidence: 0.95,
      detectedObjects: ['laptop', 'computer', 'electronics'],
      dominantColors: ['gray', 'silver', 'black'],
    },
    {
      title: 'Bicicleta de Montaña Trek - Rodado 29',
      description: 'Bicicleta de montaña en muy buen estado. Mantenimiento reciente completo. Frenos a disco, suspensión delantera, 21 velocidades.',
      category: 'Sports',
      subcategory: 'Bicycles',
      hashtags: ['#Bicicleta', '#MTB', '#Trek', '#Mountain', '#Ciclismo'],
      attributes: {
        brand: 'Trek',
        model: 'Mountain Bike',
        color: 'Black/Orange',
        size: '29"',
      },
      confidence: 0.85,
      detectedObjects: ['bicycle', 'bike', 'sports equipment'],
      dominantColors: ['black', 'orange'],
    },
    {
      title: 'Sony WH-1000XM4 Auriculares - Cancelación de Ruido',
      description: 'Auriculares premium con cancelación de ruido activa. Estado impecable, poco uso. Incluye estuche rígido, cable auxiliar y cable de carga.',
      category: 'Electronics',
      subcategory: 'Audio',
      hashtags: ['#Sony', '#Auriculares', '#Headphones', '#ANC', '#Bluetooth'],
      attributes: {
        brand: 'Sony',
        model: 'WH-1000XM4',
        color: 'Black',
      },
      confidence: 0.90,
      detectedObjects: ['headphones', 'audio', 'electronics'],
      dominantColors: ['black', 'silver'],
    },
  ];
  
  async analyzeListing(
    options: AIAnalyzeOptions
  ): Promise<ServiceResult<AISuggestions>> {
    
    // Simulate API latency
    await this.simulateDelay(1200, 2000);
    
    // Select a template based on number of images (for variety)
    const templateIndex = options.images.length % this.mockTemplates.length;
    const template = this.mockTemplates[templateIndex];
    
    // Adjust language if needed
    const suggestions = options.language === 'en' 
      ? this.translateToEnglish(template)
      : template;
    
    // Limit hashtags if requested
    if (options.maxSuggestions && suggestions.hashtags.length > options.maxSuggestions) {
      suggestions.hashtags = suggestions.hashtags.slice(0, options.maxSuggestions);
    }
    
    return {
      success: true,
      data: suggestions,
      fallbackUsed: true, // Indicate this is mock data
    };
  }
  
  isAvailable(): boolean {
    return true; // Mock is always available
  }
  
  getServiceType(): 'mock' | 'real' {
    return 'mock';
  }
  
  // ============================================
  // PRIVATE HELPERS
  // ============================================
  
  private async simulateDelay(min: number, max: number): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
  
  private translateToEnglish(suggestions: AISuggestions): AISuggestions {
    // Simple translation for demo
    return {
      ...suggestions,
      title: suggestions.title?.replace('Excelente Estado', 'Excellent Condition')
        .replace('Como Nuevas', 'Like New') || '',
      description: suggestions.description?.replace('Excelente estado', 'Excellent condition')
        .replace('perfectas condiciones', 'perfect condition') || '',
    };
  }
}
