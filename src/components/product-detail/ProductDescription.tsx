/**
 * ProductDescription - TRANSVERSAL
 * Descripción en bloque dedicado con buena legibilidad mobile
 * Sin micro-colapsables, texto completo visible
 */

import { motion } from "motion/react";
import type { Product } from "../../data/products";

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  // Generar descripción mock si no existe
  const description =
    product.description ||
    `This is a ${product.condition?.toLowerCase() || "used"} ${
      product.title
    }. Perfect for anyone looking for a quality product at a great price. Includes original box and manual. Works perfectly, just upgrading to a new model.${
      product.type === "trade" ? " Open to trade offers." : ""
    }${product.type === "sale_or_trade" ? " Willing to sell or trade." : ""}${
      product.type === "free" ? " Free to a good home!" : ""
    }${
      product.type === "rent"
        ? " Available for rent by day, week, or month."
        : ""
    }${
      product.type === "service"
        ? " Professional service with quality guarantee."
        : ""
    }${
      product.type === "event"
        ? " Join us for this amazing event! Mark your calendar."
        : ""
    }`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="px-4 py-3 space-y-1"
    >
      <h2 className="text-sm">Description</h2>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.section>
  );
}