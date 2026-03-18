/**
 * PendingTabContent - Tab de moderación de listings
 * Visible SOLO para Admin y Moderator
 * 
 * FUNCIONALIDAD:
 * - Lista de listings pendientes de aprobación
 * - Acciones: Approve | Reject (individual y bulk)
 * - Estados vacíos claros
 * 
 * ARQUITECTURA:
 * - Reemplaza: "Moderate Listings" button
 * - Conecta con Action Registry:
 *   • 'approve-listing'
 *   • 'reject-listing'
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Package, 
  User,
  Calendar,
  CheckCheck,
  XOctagon
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner@2.0.3";
import { actionRegistry } from "../../actions/registry";

type ModerationStatus = "pending";

interface PendingListing {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  status: ModerationStatus;
  thumbnail?: string;
  price?: string;
}

interface PendingTabContentProps {
  groupId: string;
  listings?: PendingListing[];
  autoApproveListings?: boolean; // NEW: Group setting to determine empty state
}

// Mock data - en producción vendría del backend
const mockPendingListings: PendingListing[] = [
  {
    id: "pl1",
    title: "iPhone 14 Pro - Mint Condition",
    author: { id: "u1", name: "Carlos Méndez" },
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    status: "pending",
    price: "$899.990",
  },
  {
    id: "pl2",
    title: "Gaming PC Setup - RTX 4080",
    author: { id: "u2", name: "Ana Torres" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "pending",
    price: "$1.250.000",
  },
];

export function PendingTabContent({ groupId, listings = mockPendingListings, autoApproveListings = false }: PendingTabContentProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [localListings, setLocalListings] = useState(listings);

  // Solo mostramos pending listings
  const filteredListings = localListings.filter((l) => l.status === "pending");

  // Toggle selección de listing
  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Aprobar listing individual
  const handleApprove = (listingId: string) => {
    const action = actionRegistry["approve-listing"];
    if (action?.handler) {
      action.handler({
        id: listingId,
        type: "listing",
        title: localListings.find((l) => l.id === listingId)?.title || "",
      });
    }

    // Remove from pending list (mock)
    setLocalListings((prev) => prev.filter((l) => l.id !== listingId));
    toast.success("Listing approved!");
  };

  // Rechazar listing individual
  const handleReject = (listingId: string) => {
    if (!confirm("Are you sure you want to reject this listing?")) return;

    const action = actionRegistry["reject-listing"];
    if (action?.handler) {
      action.handler({
        id: listingId,
        type: "listing",
        title: localListings.find((l) => l.id === listingId)?.title || "",
      });
    }

    // Remove from pending list (mock)
    setLocalListings((prev) => prev.filter((l) => l.id !== listingId));
    toast.info("Listing rejected");
  };

  // Aprobar múltiples listings
  const handleBulkApprove = () => {
    if (selectedIds.length === 0) return;

    selectedIds.forEach((id) => {
      const action = actionRegistry["approve-listing"];
      if (action?.handler) {
        action.handler({
          id,
          type: "listing",
          title: localListings.find((l) => l.id === id)?.title || "",
        });
      }
    });

    // Remove from pending list (mock)
    setLocalListings((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
    toast.success(`${selectedIds.length} listings approved!`);
    setSelectedIds([]);
  };

  // Rechazar múltiples listings
  const handleBulkReject = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to reject ${selectedIds.length} listings?`)) return;

    selectedIds.forEach((id) => {
      const action = actionRegistry["reject-listing"];
      if (action?.handler) {
        action.handler({
          id,
          type: "listing",
          title: localListings.find((l) => l.id === id)?.title || "",
        });
      }
    });

    // Remove from pending list (mock)
    setLocalListings((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
    toast.info(`${selectedIds.length} listings rejected`);
    setSelectedIds([]);
  };

  // Formatear timestamp relativo
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="pb-[calc(60px+var(--space-lg))]">
      {/* Header */}
      <div className="sticky top-[120px] z-10 bg-background border-b px-4 py-3">
        <h2 className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Pending Listings
        </h2>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-[165px] z-10 mx-4 mt-3 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between gap-2"
        >
          <p className="text-sm font-medium">
            {selectedIds.length} selected
          </p>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleBulkApprove}
            >
              <CheckCheck className="w-4 h-4 mr-1.5" />
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkReject}
            >
              <XOctagon className="w-4 h-4 mr-1.5" />
              Reject
            </Button>
          </div>
        </motion.div>
      )}

      {/* Lista de Listings */}
      <div className="px-4 pt-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredListings.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              {autoApproveListings ? (
                // AUTO-APPROVE IS ENABLED - Special informative state
                <>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Auto-Approve is Enabled ✨</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    New listings appear immediately in the group without requiring moderation.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    To change this behavior, go to Group Settings → Moderation
                  </p>
                </>
              ) : (
                // AUTO-APPROVE IS OFF - Standard empty state
                <>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">No pending listings 🎉</h3>
                  <p className="text-sm text-muted-foreground">
                    All listings have been reviewed
                  </p>
                </>
              )}
            </motion.div>
          ) : (
            filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border transition-all ${
                  selectedIds.includes(listing.id)
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {/* Header: Checkbox + Info */}
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(listing.id)}
                    onChange={() => toggleSelection(listing.id)}
                    className="w-5 h-5 mt-1 rounded border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 truncate">{listing.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {listing.author.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatTimeAgo(listing.createdAt)}
                      </div>
                    </div>
                    {listing.price && (
                      <p className="text-sm font-medium text-primary mt-1">
                        {listing.price}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleApprove(listing.id)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleReject(listing.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Reject
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
