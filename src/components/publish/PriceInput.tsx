/**
 * Price Input Component with Advanced Configuration Drawer
 * Collapsed: Simple input with arrow
 * Expanded: Drawer with currency, negotiable, discount options
 */

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '../ui/drawer';

interface PriceInputProps {
  price?: string;
  currency?: string;
  isNegotiable?: boolean;
  discount?: {
    type: 'none' | 'percentage' | 'fixed';
    value?: number;
  };
  isRequired?: boolean;
  onChange: (data: {
    price?: string;
    currency?: string;
    priceNegotiable?: boolean;
    discount?: {
      type: 'none' | 'percentage' | 'fixed';
      value?: number;
    };
  }) => void;
}

const CURRENCIES = [
  { value: 'CLP', label: 'Chilean Peso (CLP)', symbol: '$' },
  { value: 'USD', label: 'US Dollar (USD)', symbol: '$' },
  { value: 'EUR', label: 'Euro (EUR)', symbol: '€' },
  { value: 'GBP', label: 'British Pound (GBP)', symbol: '£' },
];

export function PriceInput({
  price = '',
  currency = 'CLP',
  isNegotiable = false,
  discount = { type: 'none' },
  isRequired = false,
  onChange,
}: PriceInputProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Local state for drawer
  const [localPrice, setLocalPrice] = useState(price);
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [localNegotiable, setLocalNegotiable] = useState(isNegotiable);
  const [localDiscount, setLocalDiscount] = useState(discount);
  
  const currentCurrency = CURRENCIES.find(c => c.value === currency);
  
  const handleSave = () => {
    onChange({
      price: localPrice,
      currency: localCurrency,
      priceNegotiable: localNegotiable,
      discount: localDiscount,
    });
    setIsDrawerOpen(false);
  };
  
  const handleOpenDrawer = () => {
    // Sync local state with current props
    setLocalPrice(price);
    setLocalCurrency(currency);
    setLocalNegotiable(isNegotiable);
    setLocalDiscount(discount);
    setIsDrawerOpen(true);
  };
  
  return (
    <>
      {/* COLLAPSED STATE - Input with arrow */}
      <div className="space-y-2">
        <Label htmlFor="price-input">
          Price {isRequired ? '*' : '(Optional)'}
        </Label>
        <div 
          className="flex items-center gap-2 p-3 rounded-lg border-2 border-gray-300 bg-white cursor-pointer hover:border-gray-400 transition-colors"
          onClick={handleOpenDrawer}
        >
          <span className="text-muted-foreground">{currentCurrency?.symbol}</span>
          <input
            id="price-input"
            type="number"
            placeholder="10000"
            value={price}
            onChange={(e) => onChange({ price: e.target.value, currency, priceNegotiable: isNegotiable, discount })}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-transparent outline-none"
          />
          <span className="text-sm text-muted-foreground">{currency}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDrawer();
            }}
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Show active features */}
        <div className="flex flex-wrap gap-2">
          {isNegotiable && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Negotiable
            </span>
          )}
          {discount.type !== 'none' && discount.value && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {discount.type === 'percentage' 
                ? `${discount.value}% OFF` 
                : `${currentCurrency?.symbol}${discount.value} OFF`}
            </span>
          )}
        </div>
      </div>
      
      {/* EXPANDED STATE - Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="border-b border-border">
            <DrawerTitle>Price Configuration</DrawerTitle>
            <DrawerDescription>
              Configure the price, currency, and discount options for your product.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="flex-1 overflow-auto p-4 space-y-5">
            
            {/* Currency */}
            <div className="space-y-2">
              <Label htmlFor="drawer-currency">Currency</Label>
              <Select
                value={localCurrency}
                onValueChange={(value) => setLocalCurrency(value)}
              >
                <SelectTrigger id="drawer-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="drawer-amount">Amount {isRequired && '*'}</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {CURRENCIES.find(c => c.value === localCurrency)?.symbol}
                </span>
                <Input
                  id="drawer-amount"
                  type="number"
                  placeholder="10000"
                  value={localPrice}
                  onChange={(e) => setLocalPrice(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            {/* Negotiable Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border-2 border-gray-200">
              <div className="flex-1">
                <p className="font-medium">Price is negotiable</p>
                <p className="text-xs text-muted-foreground">
                  Buyers can make offers
                </p>
              </div>
              <Switch
                checked={localNegotiable}
                onCheckedChange={setLocalNegotiable}
              />
            </div>
            
            {/* Discount Options */}
            <div className="space-y-3">
              <Label>Discount (Optional)</Label>
              
              <div className="space-y-2">
                {/* No discount */}
                <button
                  type="button"
                  onClick={() => setLocalDiscount({ type: 'none' })}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    localDiscount.type === 'none'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    localDiscount.type === 'none'
                      ? 'border-primary'
                      : 'border-gray-300'
                  }`}>
                    {localDiscount.type === 'none' && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium">No discount</span>
                </button>
                
                {/* Percentage discount */}
                <button
                  type="button"
                  onClick={() => setLocalDiscount({ type: 'percentage', value: localDiscount.value || 10 })}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    localDiscount.type === 'percentage'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    localDiscount.type === 'percentage'
                      ? 'border-primary'
                      : 'border-gray-300'
                  }`}>
                    {localDiscount.type === 'percentage' && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="10"
                      value={localDiscount.type === 'percentage' ? localDiscount.value || '' : ''}
                      onChange={(e) => setLocalDiscount({ type: 'percentage', value: parseFloat(e.target.value) || 0 })}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (localDiscount.type !== 'percentage') {
                          setLocalDiscount({ type: 'percentage', value: 10 });
                        }
                      }}
                      className="w-20"
                      disabled={localDiscount.type !== 'percentage'}
                    />
                    <span className="text-sm font-medium">% OFF</span>
                  </div>
                </button>
                
                {/* Fixed amount discount */}
                <button
                  type="button"
                  onClick={() => setLocalDiscount({ type: 'fixed', value: localDiscount.value || 1000 })}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    localDiscount.type === 'fixed'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    localDiscount.type === 'fixed'
                      ? 'border-primary'
                      : 'border-gray-300'
                  }`}>
                    {localDiscount.type === 'fixed' && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {CURRENCIES.find(c => c.value === localCurrency)?.symbol}
                    </span>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={localDiscount.type === 'fixed' ? localDiscount.value || '' : ''}
                      onChange={(e) => setLocalDiscount({ type: 'fixed', value: parseFloat(e.target.value) || 0 })}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (localDiscount.type !== 'fixed') {
                          setLocalDiscount({ type: 'fixed', value: 1000 });
                        }
                      }}
                      className="flex-1"
                      disabled={localDiscount.type !== 'fixed'}
                    />
                    <span className="text-sm font-medium">OFF</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <DrawerFooter className="border-t border-border">
            <Button onClick={handleSave} className="w-full">
              Save Price
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}