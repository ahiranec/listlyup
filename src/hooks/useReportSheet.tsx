/**
 * useReportSheet Hook
 * Sistema global para abrir el ReportSheet desde cualquier parte de la app
 * Usado principalmente por el action "report-listing" desde ListingActionsMenu
 */

import { create } from 'zustand';

interface ReportSheetState {
  isOpen: boolean;
  listingId: string | null;
  listingTitle: string | null;
  open: (listingId: string, listingTitle: string) => void;
  close: () => void;
}

export const useReportSheet = create<ReportSheetState>((set) => ({
  isOpen: false,
  listingId: null,
  listingTitle: null,
  open: (listingId: string, listingTitle: string) => 
    set({ isOpen: true, listingId, listingTitle }),
  close: () => 
    set({ isOpen: false, listingId: null, listingTitle: null }),
}));
