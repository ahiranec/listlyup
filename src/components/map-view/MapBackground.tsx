/**
 * Map Background Component
 * Satellite map background with grid overlay
 */

interface MapBackgroundProps {
  imageUrl?: string;
}

export function MapBackground({ 
  imageUrl = 'https://images.unsplash.com/photo-1625428354222-ce52b4227b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjB0ZXJyYWlufGVufDF8fHx8MTc2MjI5OTgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
}: MapBackgroundProps) {
  return (
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        filter: 'brightness(0.9) contrast(1.1)',
      }}
    >
      {/* Overlay semi-transparente para dar efecto de mapa */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-green-50/40 to-blue-100/60 backdrop-blur-[2px]" />
      
      {/* Líneas de cuadrícula simulando calles */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
