/**
 * PublishFloatingButton - FAB para publicar en grupo
 * Solo visible si canPost(userRole, group) === true
 * 
 * DISEÑO:
 * - Consistente con CreateFloatingButton
 * - Bottom-right (no bottom bar, sino FAB circular)
 * - Sobre contenido de tabs
 */

import { Plus } from "lucide-react";
import { motion } from "motion/react";

interface PublishFloatingButtonProps {
  onClick: () => void;
}

export function PublishFloatingButton({ onClick }: PublishFloatingButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="fixed bottom-20 right-6 z-40 w-14 h-14 bg-gradient-to-br from-primary to-primary/90 text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 flex items-center justify-center max-w-[480px]"
      aria-label="Publish to group"
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  );
}
