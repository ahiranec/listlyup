import { Plus } from "lucide-react";
import { motion } from "motion/react";

interface CreateFloatingButtonProps {
  onClick: () => void;
}

export function CreateFloatingButton({ onClick }: CreateFloatingButtonProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-lg max-w-[480px] mx-auto"
    >
      <button
        onClick={onClick}
        className="touch-target w-full bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-base flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Create Group
      </button>
    </motion.footer>
  );
}
