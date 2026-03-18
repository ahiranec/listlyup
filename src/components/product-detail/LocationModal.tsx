import { MapPin, AlertCircle, ExternalLink, X } from "lucide-react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import type { ExtendedProduct } from "./types";

interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: string;
  privacyPin?: ExtendedProduct['privacyPin'];
}

export function LocationModal({ open, onOpenChange, location = "Viña del Mar", privacyPin }: LocationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0" aria-describedby="location-description">
        <DialogHeader className="p-[var(--space-lg)] pb-[var(--space-md)] border-b">
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Location
          </DialogTitle>
          <DialogDescription id="location-description">
            View the approximate location of this product on the map
          </DialogDescription>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="p-[var(--space-lg)] space-y-3">
          {/* Address */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-medium">{location}, V Región</span>
          </div>
          
          {/* Privacy notice si está habilitado */}
          {privacyPin?.enabled && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 p-2 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Approximate location:</span> The exact address is hidden for privacy. 
                The pin shows the approximate area within {privacyPin.radius || "10km"}.
              </div>
            </div>
          )}

          {/* Map Preview */}
          <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
            {/* Fondo tipo mapa */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1625428354222-ce52b4227b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjB0ZXJyYWlufGVufDF8fHx8MTc2MjI5OTgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                filter: 'brightness(0.9) contrast(1.1)',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-green-50/40 to-blue-100/60 backdrop-blur-[2px]" />
              
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-modal" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-modal)" />
              </svg>
            </div>

            {/* Pin centrado */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="relative"
              >
                {/* Pin marker */}
                <div className="w-6 h-6 rounded-full bg-primary ring-4 ring-white shadow-lg" />
                
                {/* Pulso animado */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary opacity-30"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Label con ubicación */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-md shadow-md border border-gray-200">
              <p className="text-xs font-medium text-gray-700">
                {location}
              </p>
            </div>

            {/* Satellite label */}
            <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded shadow-sm border border-gray-200">
              <p className="text-xs text-gray-600">Satellite</p>
            </div>
          </div>

          {/* Open in Maps button */}
          <Button variant="outline" className="w-full" onClick={() => {
            window.open(`https://www.google.com/maps/search/${encodeURIComponent(location + ", V Región")}`, '_blank');
          }}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Google Maps
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}