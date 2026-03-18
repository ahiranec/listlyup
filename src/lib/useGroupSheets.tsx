/**
 * useGroupSheets - Centralized Group Sheets Manager
 * Provides open/close methods for all group-related sheets
 */

import { create } from 'zustand';

interface GroupSheetState {
  // Report Group
  reportGroup: {
    open: boolean;
    groupId: string;
    groupName: string;
  } | null;

  // Hide Listing
  hideListing: {
    open: boolean;
    listingId: string;
    listingTitle: string;
  } | null;

  // Remove Listing
  removeListing: {
    open: boolean;
    listingId: string;
    listingTitle: string;
  } | null;

  // Remove Member
  removeMember: {
    open: boolean;
    memberId: string;
    memberName: string;
    memberRole: 'member' | 'moderator';
  } | null;

  // Change Role
  changeRole: {
    open: boolean;
    memberId: string;
    memberName: string;
    currentRole: 'member' | 'moderator';
  } | null;

  // Mute Group
  muteGroup: {
    open: boolean;
    groupId: string;
    groupName: string;
  } | null;

  // Leave Group
  leaveGroup: {
    open: boolean;
    groupId: string;
    groupName: string;
  } | null;

  // Actions
  openReportGroup: (groupId: string, groupName: string) => void;
  closeReportGroup: () => void;

  openHideListing: (listingId: string, listingTitle: string) => void;
  closeHideListing: () => void;

  openRemoveListing: (listingId: string, listingTitle: string) => void;
  closeRemoveListing: () => void;

  openRemoveMember: (memberId: string, memberName: string, memberRole: 'member' | 'moderator') => void;
  closeRemoveMember: () => void;

  openChangeRole: (memberId: string, memberName: string, currentRole: 'member' | 'moderator') => void;
  closeChangeRole: () => void;

  openMuteGroup: (groupId: string, groupName: string) => void;
  closeMuteGroup: () => void;

  openLeaveGroup: (groupId: string, groupName: string) => void;
  closeLeaveGroup: () => void;
}

export const useGroupSheets = create<GroupSheetState>((set) => ({
  reportGroup: null,
  hideListing: null,
  removeListing: null,
  removeMember: null,
  changeRole: null,
  muteGroup: null,
  leaveGroup: null,

  openReportGroup: (groupId, groupName) =>
    set({ reportGroup: { open: true, groupId, groupName } }),
  closeReportGroup: () => set({ reportGroup: null }),

  openHideListing: (listingId, listingTitle) =>
    set({ hideListing: { open: true, listingId, listingTitle } }),
  closeHideListing: () => set({ hideListing: null }),

  openRemoveListing: (listingId, listingTitle) =>
    set({ removeListing: { open: true, listingId, listingTitle } }),
  closeRemoveListing: () => set({ removeListing: null }),

  openRemoveMember: (memberId, memberName, memberRole) =>
    set({ removeMember: { open: true, memberId, memberName, memberRole } }),
  closeRemoveMember: () => set({ removeMember: null }),

  openChangeRole: (memberId, memberName, currentRole) =>
    set({ changeRole: { open: true, memberId, memberName, currentRole } }),
  closeChangeRole: () => set({ changeRole: null }),

  openMuteGroup: (groupId, groupName) =>
    set({ muteGroup: { open: true, groupId, groupName } }),
  closeMuteGroup: () => set({ muteGroup: null }),

  openLeaveGroup: (groupId, groupName) =>
    set({ leaveGroup: { open: true, groupId, groupName } }),
  closeLeaveGroup: () => set({ leaveGroup: null }),
}));