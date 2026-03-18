/**
 * Map Pin Component
 * Animated pin with pulse effect and hover card
 */

import { motion, AnimatePresence } from 'motion/react';
import { Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import type { CanonicalListing, CurrentUser } from '../../types/canonical';

interface MapPinProps {
  id: string;
  left: string;
  top: string;
  visible: boolean; // Deprecated: will use product.visibility instead
  product?: CanonicalListing | null;
  currentUser: CurrentUser | null;
  isHovered: boolean;
  index: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  children?: React.ReactNode; // For hover card
}

export function MapPin({
  id,
  left,
  top,
  visible, // Deprecated
  product,
  currentUser,
  isHovered,
  index,
  onHoverStart,
  onHoverEnd,
  children,
}: MapPinProps) {
  // Determinar si el usuario tiene acceso al producto
  const hasAccess = product?.visibility === "public" || 
    (product?.visibility === "group" && 
     currentUser?.groupIds && 
     product?.groupIds?.some(groupId => currentUser.groupIds?.includes(groupId)));
  
  const pinContent = (
    <div
      className="absolute"
      style={{
        left,
        top,
        transform: "translate(-50%, -100%)",
        zIndex: isHovered ? 50 : 1,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: index * 0.05,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="relative"
        onMouseEnter={hasAccess ? onHoverStart : undefined}
        onMouseLeave={onHoverEnd}
        onClick={hasAccess ? onHoverStart : undefined}
      >
        {/* Puntito */}
        <motion.div
          className={`w-4 h-4 rounded-full cursor-pointer shadow-lg ${ 
            hasAccess 
              ? isHovered 
                ? 'bg-blue-600 ring-4 ring-blue-200' 
                : 'bg-primary ring-2 ring-white'
              : 'bg-gray-400 ring-2 ring-white opacity-60'
          }`}
          whileHover={hasAccess ? { scale: 1.3 } : {}}
          whileTap={hasAccess ? { scale: 1.1 } : {}}
          animate={isHovered ? { scale: 1.4 } : { scale: 1 }}
        />

        {/* Pulso animado para pins accesibles */}
        {hasAccess && (
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
        )}

        {/* Hover card (passed as children) */}
        <AnimatePresence>
          {isHovered && children}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  // Wrap group pins sin acceso con tooltip
  if (!hasAccess) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            {pinContent}
          </TooltipTrigger>
          <TooltipContent side="top" className="text-center bg-slate-900 border-slate-700">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Users className="w-3.5 h-3.5 text-white" />
              <p className="font-semibold text-white">Private Group Listing</p>
            </div>
            <p className="text-xs text-slate-300">Not visible to you</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return pinContent;
}