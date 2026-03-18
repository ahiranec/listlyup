/**
 * Saved Addresses Page
 * List of saved addresses with CRUD operations
 */

import { useState } from 'react';
import { ArrowLeft, Plus, AlertCircle, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { AddressCard } from './shared/AddressCard';
import { Alert, AlertDescription } from '../ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useProfile } from '../../contexts/ProfileContext';
import { ProfileNavigation } from './types';
import { toast } from 'sonner@2.0.3';

interface AddressesPageProps {
  onBack: () => void;
  onNavigate: ProfileNavigation;
}

export function AddressesPage({ onBack, onNavigate }: AddressesPageProps) {
  const { profile, updateProfile } = useProfile();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const handleAddNew = () => {
    onNavigate.navigateToAddressForm();
  };

  const handleEdit = (addressId: string) => {
    onNavigate.navigateToAddressForm(addressId);
  };

  const handleDeleteClick = (addressId: string) => {
    setAddressToDelete(addressId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!addressToDelete) return;
    
    const newAddresses = profile.addresses.filter(a => a.id !== addressToDelete);
    updateProfile({ addresses: newAddresses });
    
    toast.success('Address deleted');
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleSetDefault = (addressId: string) => {
    const newAddresses = profile.addresses.map(a => ({
      ...a,
      isDefaultForPublishing: a.id === addressId,
    }));
    updateProfile({ addresses: newAddresses });
    toast.success('Default address updated');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Saved Addresses</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-4">
        {/* Educational Info Box */}
        <Alert className="border-blue-200 bg-blue-50">
          <MapPin className="h-4 w-4 text-blue-700" />
          <AlertDescription>
            <p className="font-medium text-blue-900 mb-1 text-sm">Your exact locations</p>
            <p className="text-xs text-blue-800 mb-2">
              Save your real addresses for logistics and pickup. When publishing, 
              you'll choose how precise to show each location publicly (exact or approximate).
            </p>
            <Button variant="link" size="sm" className="p-0 h-auto text-xs text-blue-700 hover:text-blue-900">
              Learn more about location privacy →
            </Button>
          </AlertDescription>
        </Alert>

        {/* Add New Button */}
        <Button onClick={handleAddNew} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>

        {/* Addresses List */}
        {profile.addresses.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-muted-foreground mb-1">No addresses saved</h3>
            <p className="text-sm text-muted-foreground">
              Add your first address to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {profile.addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={() => handleEdit(address.id)}
                onDelete={() => handleDeleteClick(address.id)}
                onSetDefault={() => handleSetDefault(address.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete address?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The address will be permanently removed from your saved addresses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}