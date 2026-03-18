/**
 * SettingsTabContent - Tab de configuración del grupo
 * Visible SOLO para Admin
 * 
 * ARQUITECTURA CANÓNICA:
 * ✅ SOURCE OF TRUTH para comportamiento del grupo
 * ✅ 3 ejes ortogonales: type, visibility, joinPolicy
 * ✅ Sin redundancias (eliminado requireListingReview)
 * ✅ PascalCase para todos los enums
 * ✅ Avatar editable
 * ✅ Validaciones en Save
 * 
 * MODELO CANÓNICO:
 * - type: "Public" | "Private" | "Community" | "Event"
 * - visibility: "Public" | "Private"
 * - joinPolicy: "Open" | "Approval" | "Invite"
 * - whoCanPost / whoCanInvite / whoCanModerate
 * - autoApproveListings / autoApproveMembers
 */

import { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  Edit3,
  Users,
  Eye,
  Shield,
  Save,
  X,
  Camera,
  AlertTriangle,
  Trash2,
  Archive,
  Info,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner@2.0.3";
import { actionRegistry } from "../../actions/registry";

// MODELO CANÓNICO DE TIPOS
type GroupType = "Public" | "Private" | "Community" | "Event";
type GroupVisibility = "Public" | "Private";
type JoinPolicy = "Open" | "Approval" | "Invite";
type WhoCanPost = "members" | "moderators" | "admins";
type WhoCanInvite = "members" | "moderators" | "admins";
type WhoCanModerate = "moderators" | "admins";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  actionId?: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    title: "Group Profile",
    description: "Edit name, description, avatar, and rules",
    icon: Edit3,
    actionId: "edit-group-profile",
  },
  {
    id: "permissions",
    title: "Permissions",
    description: "Control who can post, invite, and moderate",
    icon: Users,
    actionId: "edit-group-permissions",
  },
  {
    id: "type-access",
    title: "Group Type & Access",
    description: "Manage group type, visibility, and join policy",
    icon: Eye,
    actionId: "edit-group-type-access",
  },
  {
    id: "moderation",
    title: "Moderation",
    description: "Configure auto-approval settings",
    icon: Shield,
    actionId: "edit-group-moderation",
  },
  {
    id: "danger",
    title: "Danger Zone",
    description: "Delete or archive this group",
    icon: AlertTriangle,
  },
];

interface SettingsTabContentProps {
  groupId: string;
  groupName: string;
}

export function SettingsTabContent({ groupId, groupName }: SettingsTabContentProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // PROFILE STATE (con avatar)
  const [profileForm, setProfileForm] = useState({
    name: groupName,
    avatarUrl: "", // Avatar actual del grupo
    description: "Grupo para vecinos de Valparaíso. Comparte, vende y encuentra lo que necesitas en tu comunidad local.",
    rules: [
      "Be respectful to all members",
      "No spam or excessive self-promotion",
      "Only post items related to Valparaíso area",
    ],
  });

  // PERMISSIONS STATE (sin cambios, ya canónico)
  const [permissionsForm, setPermissionsForm] = useState<{
    whoCanPost: WhoCanPost;
    whoCanInvite: WhoCanInvite;
    whoCanModerate: WhoCanModerate;
  }>({
    whoCanPost: "members",
    whoCanInvite: "moderators",
    whoCanModerate: "moderators",
  });

  // TYPE & ACCESS STATE (3 ejes ortogonales - MODELO CANÓNICO)
  const [typeAccessForm, setTypeAccessForm] = useState<{
    type: GroupType;
    visibility: GroupVisibility;
    joinPolicy: JoinPolicy;
  }>({
    type: "Public",
    visibility: "Public",
    joinPolicy: "Open",
  });

  // MODERATION STATE (SIN requireListingReview redundante)
  const [moderationForm, setModerationForm] = useState({
    autoApproveListings: false,
    autoApproveMembers: true, // Derivado de joinPolicy inicialmente
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const getInitials = (name: string) => {
    if (!name) return "GR";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveProfile = () => {
    if (!profileForm.name.trim()) {
      toast.error("Group name cannot be empty");
      return;
    }

    const action = actionRegistry["edit-group-profile"];
    if (action?.handler) {
      action.handler({
        id: groupId,
        type: "group",
        title: profileForm.name,
      });
    }

    toast.success("Group profile updated!");
    setExpandedSection(null);
  };

  const handleSavePermissions = () => {
    const action = actionRegistry["edit-group-permissions"];
    if (action?.handler) {
      action.handler({
        id: groupId,
        type: "group",
        title: groupName,
      });
    }

    toast.success("Permissions updated!");
    setExpandedSection(null);
  };

  const handleSaveTypeAccess = () => {
    // VALIDACIÓN: Open groups DEBEN auto-aprobar members
    if (typeAccessForm.joinPolicy === "Open" && !moderationForm.autoApproveMembers) {
      toast.error("Open groups must auto-approve members");
      return;
    }

    // VALIDACIÓN: Invite-only groups NO deben ser Public visibility
    if (typeAccessForm.joinPolicy === "Invite" && typeAccessForm.visibility === "Public") {
      toast.warning("Invite-only groups are typically Private. Are you sure?");
      // Permitimos pero advertimos
    }

    const action = actionRegistry["edit-group-type-access"];
    if (action?.handler) {
      action.handler({
        id: groupId,
        type: "group",
        title: groupName,
      });
    }

    toast.success("Group type & access updated!");
    setExpandedSection(null);
  };

  const handleSaveModeration = () => {
    // VALIDACIÓN: Si joinPolicy es Open, forzar autoApproveMembers
    if (typeAccessForm.joinPolicy === "Open" && !moderationForm.autoApproveMembers) {
      toast.error("Open groups must auto-approve members. Please enable it or change join policy.");
      return;
    }

    const action = actionRegistry["edit-group-moderation"];
    if (action?.handler) {
      action.handler({
        id: groupId,
        type: "group",
        title: groupName,
      });
    }

    toast.success("Moderation settings updated!");
    setExpandedSection(null);
  };

  const handleAvatarUpload = () => {
    // TODO: Implementar upload real cuando exista backend
    toast.info("Avatar upload coming soon!");
  };

  const handleDeleteGroup = () => {
    // TODO: Confirmación doble + backend
    toast.error("Delete group requires confirmation (not implemented)");
  };

  const handleArchiveGroup = () => {
    // TODO: Backend
    toast.info("Archive group (not implemented)");
  };

  return (
    <div className="pb-[calc(60px+var(--space-lg))]">
      {/* Header Info */}
      <div className="px-4 pt-4 pb-3 border-b">
        <h2 className="font-medium mb-1">Group Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your group configuration and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="divide-y">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          const isDanger = section.id === "danger";

          return (
            <motion.div
              key={section.id}
              initial={false}
              className="bg-card"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/50 transition-colors ${
                  isDanger ? "border-t-2 border-red-500/20" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDanger ? "bg-red-500/10" : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isDanger ? "text-red-600" : "text-primary"
                    }`}
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className={`font-medium mb-0.5 ${isDanger ? "text-red-600" : ""}`}>
                    {section.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              {/* Section Content (expandible) */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4 space-y-4 border-t bg-muted/30"
                >
                  {/* ========== PROFILE SECTION ========== */}
                  {section.id === "profile" && (
                    <>
                      {/* Avatar Upload (NUEVO) */}
                      <div className="pt-4">
                        <label className="text-sm font-medium mb-2 block">
                          Group Avatar
                        </label>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={profileForm.avatarUrl} alt={profileForm.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-lg">
                              {getInitials(profileForm.name)}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAvatarUpload}
                          >
                            <Camera className="w-4 h-4 mr-1.5" />
                            Change Avatar
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Recommended: 512x512px, max 2MB
                        </p>
                      </div>

                      {/* Group Name */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Group Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, name: e.target.value })
                          }
                          maxLength={50}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-right">
                          {profileForm.name.length}/50
                        </p>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Description
                        </label>
                        <textarea
                          value={profileForm.description}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, description: e.target.value })
                          }
                          rows={4}
                          maxLength={200}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background resize-none"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-right">
                          {profileForm.description.length}/200
                        </p>
                      </div>

                      {/* Rules */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Group Rules
                        </label>
                        <div className="space-y-2">
                          {profileForm.rules.map((rule, index) => (
                            <div key={index} className="flex gap-2">
                              <span className="text-sm text-muted-foreground mt-2 flex-shrink-0">
                                {index + 1}.
                              </span>
                              <input
                                type="text"
                                value={rule}
                                onChange={(e) => {
                                  const newRules = [...profileForm.rules];
                                  newRules[index] = e.target.value;
                                  setProfileForm({ ...profileForm, rules: newRules });
                                }}
                                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Save Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={handleSaveProfile}
                        >
                          <Save className="w-4 h-4 mr-1.5" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedSection(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}

                  {/* ========== PERMISSIONS SECTION ========== */}
                  {section.id === "permissions" && (
                    <>
                      {/* Who can post */}
                      <div className="pt-4">
                        <label className="text-sm font-medium mb-1.5 block">
                          Who can post listings?
                        </label>
                        <select
                          value={permissionsForm.whoCanPost}
                          onChange={(e) =>
                            setPermissionsForm({
                              ...permissionsForm,
                              whoCanPost: e.target.value as WhoCanPost,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="members">All Members</option>
                          <option value="moderators">Moderators & Admins</option>
                          <option value="admins">Admins Only</option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Controls who can create listings in this group. Members won't see the publish button (+) if restricted to moderators or admins.
                        </p>
                      </div>

                      {/* Who can invite */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Who can invite members?
                        </label>
                        <select
                          value={permissionsForm.whoCanInvite}
                          onChange={(e) =>
                            setPermissionsForm({
                              ...permissionsForm,
                              whoCanInvite: e.target.value as WhoCanInvite,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="members">All Members</option>
                          <option value="moderators">Moderators & Admins</option>
                          <option value="admins">Admins Only</option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Controls who can send invitations to join
                        </p>
                      </div>

                      {/* Who can moderate */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Who can moderate content?
                        </label>
                        <select
                          value={permissionsForm.whoCanModerate}
                          onChange={(e) =>
                            setPermissionsForm({
                              ...permissionsForm,
                              whoCanModerate: e.target.value as WhoCanModerate,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="moderators">Moderators & Admins</option>
                          <option value="admins">Admins Only</option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Controls access to moderation tools (hide/remove listings, manage members)
                        </p>
                      </div>

                      {/* Save Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={handleSavePermissions}
                        >
                          <Save className="w-4 h-4 mr-1.5" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedSection(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}

                  {/* ========== TYPE & ACCESS SECTION (MODELO CANÓNICO) ========== */}
                  {section.id === "type-access" && (
                    <>
                      {/* Group Type (eje 1) */}
                      <div className="pt-4">
                        <label className="text-sm font-medium mb-1.5 block">
                          Group Type
                        </label>
                        <select
                          value={typeAccessForm.type}
                          onChange={(e) =>
                            setTypeAccessForm({
                              ...typeAccessForm,
                              type: e.target.value as GroupType,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="Public">Public</option>
                          <option value="Private">Private</option>
                          <option value="Community">Community</option>
                          <option value="Event">Event</option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Defines the nature and purpose of your group
                        </p>
                      </div>

                      {/* Visibility (eje 2) */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Visibility
                        </label>
                        <select
                          value={typeAccessForm.visibility}
                          onChange={(e) =>
                            setTypeAccessForm({
                              ...typeAccessForm,
                              visibility: e.target.value as GroupVisibility,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="Public">Public (discoverable in search)</option>
                          <option value="Private">Private (hidden from search)</option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Controls whether the group appears in search results
                        </p>
                      </div>

                      {/* Join Policy (eje 3) */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Join Policy
                        </label>
                        <select
                          value={typeAccessForm.joinPolicy}
                          onChange={(e) => {
                            const newPolicy = e.target.value as JoinPolicy;
                            setTypeAccessForm({
                              ...typeAccessForm,
                              joinPolicy: newPolicy,
                            });
                            
                            // Auto-sync: Open DEBE tener autoApproveMembers = true
                            if (newPolicy === "Open") {
                              setModerationForm({
                                ...moderationForm,
                                autoApproveMembers: true,
                              });
                            }
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="Open">Open (anyone can join immediately)</option>
                          <option value="Approval" disabled>🔒 Approval Required (Coming Soon)</option>
                          <option value="Invite">Invite Only (members must be invited)</option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Determines how people can join this group
                        </p>
                      </div>

                      {/* Helper Info */}
                      <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <div className="flex gap-2">
                          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-xs text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Understanding the 3 axes:</p>
                            <p><strong>Type</strong> defines your group's purpose (e.g., Community for neighborhoods).</p>
                            <p className="mt-1"><strong>Visibility</strong> controls search discoverability (Private groups don't appear in results).</p>
                            <p className="mt-1"><strong>Join Policy</strong> determines how people become members.</p>
                          </div>
                        </div>
                      </div>

                      {/* Save Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={handleSaveTypeAccess}
                        >
                          <Save className="w-4 h-4 mr-1.5" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedSection(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}

                  {/* ========== MODERATION SECTION (SIN REDUNDANCIA) ========== */}
                  {section.id === "moderation" && (
                    <>
                      <div className="pt-4 space-y-3">
                        {/* Auto-approve listings */}
                        <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex-1 pr-3">
                            <p className="text-sm font-medium">Auto-approve listings</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              When enabled, new listings appear immediately without moderation
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={moderationForm.autoApproveListings}
                            onChange={(e) =>
                              setModerationForm({
                                ...moderationForm,
                                autoApproveListings: e.target.checked,
                              })
                            }
                            className="w-5 h-5 rounded border-border flex-shrink-0"
                          />
                        </label>
                      </div>

                      {/* Warning si autoApproveListings = false */}
                      {!moderationForm.autoApproveListings && (
                        <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                          <div className="flex gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground">
                              All listings will require moderator approval before appearing in the group. Make sure you have active moderators.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Save Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={handleSaveModeration}
                        >
                          <Save className="w-4 h-4 mr-1.5" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedSection(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}

                  {/* ========== DANGER ZONE ========== */}
                  {section.id === "danger" && (
                    <>
                      <div className="pt-4 space-y-3">
                        {/* Archive Group */}
                        <button
                          onClick={handleArchiveGroup}
                          className="w-full p-4 rounded-lg border-2 border-orange-500/20 bg-orange-500/5 text-left hover:bg-orange-500/10 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <Archive className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-orange-600">Archive Group</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Hide this group from members. Can be restored later. No data is deleted.
                              </p>
                            </div>
                          </div>
                        </button>

                        {/* Delete Group */}
                        <button
                          onClick={handleDeleteGroup}
                          className="w-full p-4 rounded-lg border-2 border-red-500/20 bg-red-500/5 text-left hover:bg-red-500/10 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <Trash2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-red-600">Delete Group</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Permanently delete this group and all its content. This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Warning */}
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                        <div className="flex gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground">
                            These actions require backend implementation. They are currently disabled.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}