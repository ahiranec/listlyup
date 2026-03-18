/**
 * Create/Edit Campaign Sheet
 * Premium Design 2025
 * 
 * Compact form with 3 sections:
 * A) Basics: title, description, type, dates
 * B) Scope: public/groups/users + approval mode
 * C) Eligibility: listing types, categories, discount rule
 */

import { useState } from 'react';
import { X, Calendar, Tag, Users, AlertCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface CreateEditCampaignSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: 'create' | 'edit';
  campaignId?: string;
}

export function CreateEditCampaignSheet({
  open,
  onOpenChange,
  mode = 'create',
  campaignId,
}: CreateEditCampaignSheetProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'discount' as 'discount' | 'promotion' | 'flash-sale',
    startDate: '',
    endDate: '',
    scope: 'public' as 'public' | 'groups' | 'users',
    approvalMode: 'auto' as 'auto' | 'manual',
    whoCanAdd: 'only-me' as 'only-me' | 'group-members' | 'anyone' | 'invited-users',
    allowProducts: true,
    allowServices: true,
    categories: [] as string[],
    discountPercentage: '',
  });

  const handleSave = () => {
    if (!formData.title || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.type === 'discount' && !formData.discountPercentage) {
      toast.error('Please set a discount percentage');
      return;
    }

    toast.success(mode === 'create' ? 'Campaign created!' : 'Campaign updated!');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[90vh] max-w-[480px] mx-auto p-0 rounded-t-3xl"
      >
        {/* Accessibility headers */}
        <SheetTitle className="sr-only">
          {mode === 'create' ? 'Create Campaign' : 'Edit Campaign'}
        </SheetTitle>
        <SheetDescription className="sr-only">
          Configure campaign settings including basics, scope, and eligibility rules
        </SheetDescription>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              {mode === 'create' ? 'Create Campaign' : 'Edit Campaign'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto h-[calc(100%-140px)] px-4 py-4 space-y-6">
          {/* SECTION A: Basics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">Basics</h3>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Holiday Sale 2025"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the campaign..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[80px]"
              />
            </div>

            {/* Type */}
            <div className="space-y-1.5">
              <Label htmlFor="type">Campaign Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">💰 Discount</SelectItem>
                  <SelectItem value="promotion">🎯 Promotion</SelectItem>
                  <SelectItem value="flash-sale">⚡ Flash Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="start-date">Start Date *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end-date">End Date *</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* SECTION B: Scope */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">Scope & Approval</h3>
            </div>

            {/* Visibility */}
            <div className="space-y-1.5">
              <Label>Campaign Visibility *</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, scope: 'public' })}
                  className={`h-20 rounded-lg border-2 text-xs font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                    formData.scope === 'public'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">🌍</span>
                  <span>Public</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, scope: 'groups' })}
                  className={`h-20 rounded-lg border-2 text-xs font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                    formData.scope === 'groups'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">👥</span>
                  <span>Groups</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, scope: 'users' })}
                  className={`h-20 rounded-lg border-2 text-xs font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                    formData.scope === 'users'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">👤</span>
                  <span>Users</span>
                </button>
              </div>
            </div>

            {/* Approval Mode */}
            <div className="space-y-1.5">
              <Label htmlFor="approval">Listing Approval *</Label>
              <Select
                value={formData.approvalMode}
                onValueChange={(value: any) => setFormData({ ...formData, approvalMode: value })}
              >
                <SelectTrigger id="approval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">✅ Auto-approve all listings</SelectItem>
                  <SelectItem value="manual">👤 I review each listing</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {formData.approvalMode === 'auto' && 'Listings are added immediately without your review'}
                {formData.approvalMode === 'manual' && "You'll manage requests in Action Center"}
              </p>
            </div>

            {/* Who Can Add */}
            <div className="space-y-1.5">
              <Label htmlFor="who-can-add">Who Can Add Listings? *</Label>
              <Select
                value={formData.whoCanAdd}
                onValueChange={(value: any) => setFormData({ ...formData, whoCanAdd: value })}
              >
                <SelectTrigger id="who-can-add">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="only-me">👤 Only me (campaign owner)</SelectItem>
                  {formData.scope === 'groups' && (
                    <SelectItem value="group-members">👥 My group members</SelectItem>
                  )}
                  {formData.scope === 'public' && (
                    <SelectItem value="anyone">🌍 Anyone</SelectItem>
                  )}
                  {formData.scope === 'users' && (
                    <SelectItem value="invited-users">✉️ Invited users only</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {formData.whoCanAdd === 'only-me' && 'Only you can add listings to this campaign'}
                {formData.whoCanAdd === 'group-members' && 'Group members can add their own listings'}
                {formData.whoCanAdd === 'anyone' && 'Any user with eligible listings can add them'}
                {formData.whoCanAdd === 'invited-users' && 'Manage invited users in campaign settings'}
              </p>
            </div>
          </div>

          {/* SECTION C: Eligibility */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">Eligibility Rules</h3>
            </div>

            {/* Listing Types */}
            <div className="space-y-2">
              <Label>Allowed Listing Types *</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-products"
                    checked={formData.allowProducts}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, allowProducts: checked === true })
                    }
                  />
                  <label
                    htmlFor="allow-products"
                    className="text-sm cursor-pointer"
                  >
                    Products (sale/rent/trade)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-services"
                    checked={formData.allowServices}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, allowServices: checked === true })
                    }
                  />
                  <label
                    htmlFor="allow-services"
                    className="text-sm cursor-pointer"
                  >
                    Services
                  </label>
                </div>
              </div>
            </div>

            {/* Categories (Optional) */}
            <div className="space-y-1.5">
              <Label htmlFor="categories">Specific Categories (Optional)</Label>
              <Input
                id="categories"
                placeholder="e.g., Electronics, Clothing"
                disabled
                className="text-xs"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to allow all categories
              </p>
            </div>

            {/* Discount Rule */}
            {formData.type === 'discount' && (
              <div className="space-y-1.5">
                <Label htmlFor="discount">Discount Percentage *</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="discount"
                    type="number"
                    placeholder="20"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All eligible listings will apply this discount
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateEditCampaignSheet;