import { MapPin, AlertCircle, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: string;
  latitude?: number;
  longitude?: number;
  privacyPin?: { enabled: boolean; radius: string };
}

export function LocationModal({ 
  open, 
  onOpenChange, 
  location = "Sin ubicación", 
  latitude,
  longitude,
  privacyPin 
}: LocationModalProps) {
  
  const hasCoordinates = latitude != null && longitude != null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0" aria-describedby="location-description">
        <DialogHeader className="p-[var(--space-lg)] pb-[var(--space-md)] border-b">
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Location
          </DialogTitle>
          <DialogDescription id="location-description">
            Location of this listing
          </DialogDescription>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="p-[var(--space-lg)] space-y-4">
          {/* Address */}
          <div className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="font-medium text-gray-800">{location}</span>
          </div>
          
          {/* Privacy notice si está habilitado */}
          {privacyPin?.enabled && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
              <div>
                <span className="font-semibold text-blue-700">Location:</span> The exact address is hidden for privacy. 
                The pin shows the area.
              </div>
            </div>
          )}

          {/* Map Preview */}
          {hasCoordinates && (
            <div className="relative h-[300px] rounded-lg overflow-hidden border border-gray-200">
                <Map
                  mapId="DEMO_MAP_ID"
                  defaultZoom={14}
                  defaultCenter={{ lat: latitude, lng: longitude }}
                  disableDefaultUI={true}
                  gestureHandling="cooperative" // Permite pan/zoom pero no bloquea el scroll de la página accidentalmente
                >
                  <AdvancedMarker position={{ lat: latitude, lng: longitude }}>
                     <Pin background={'#2563eb'} borderColor={'#ffffff'} glyphColor={'#ffffff'} scale={1.2} />
                  </AdvancedMarker>
                </Map>
            </div>
          )}

          {/* Open in Maps button */}
          <Button variant="outline" className="w-full" onClick={() => {
            if (hasCoordinates) {
               window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
            } else {
               window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`, '_blank');
            }
          }}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Google Maps
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
