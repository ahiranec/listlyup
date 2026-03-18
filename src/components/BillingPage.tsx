/**
 * Billing Page - Ultra Compact
 * Mobile-first design optimized for iPhone
 * Premium Design 2025
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, Check, CreditCard, Calendar, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface BillingPageProps {
  onBack: () => void;
  user?: {
    id: string;
    name: string;
    email: string;
    plan: 'Free' | 'Plus' | 'Pro';
  };
}

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Invoice {
  id: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

const PLAN_FEATURES: Record<'Free' | 'Plus' | 'Pro', PlanFeature[]> = {
  Free: [
    { text: 'Up to 5 active listings', included: true },
    { text: 'Basic search visibility', included: true },
    { text: 'Internal chat', included: true },
    { text: 'Standard support', included: true },
    { text: 'Advanced analytics', included: false },
    { text: 'Priority placement', included: false },
  ],
  Plus: [
    { text: 'Up to 25 active listings', included: true },
    { text: 'Enhanced search visibility', included: true },
    { text: 'All contact methods', included: true },
    { text: 'Basic analytics', included: true },
    { text: 'Priority support', included: true },
    { text: 'Featured badge', included: true },
    { text: 'Priority placement', included: false },
  ],
  Pro: [
    { text: 'Unlimited active listings', included: true },
    { text: 'Maximum search visibility', included: true },
    { text: 'All contact methods', included: true },
    { text: 'Advanced analytics', included: true },
    { text: 'Priority support 24/7', included: true },
    { text: 'Featured badge', included: true },
    { text: 'Priority placement', included: true },
    { text: 'Custom branding', included: true },
  ],
};

const AVAILABLE_PLANS = [
  {
    id: 'free',
    name: 'Free',
    emoji: '🆓',
    price: '$0',
    period: 'forever',
    features: ['5 listings', 'Basic features', 'Standard support'],
  },
  {
    id: 'plus',
    name: 'Plus',
    emoji: '✨',
    price: '$9.99',
    period: '/month',
    features: ['25 listings', 'Enhanced features', 'Priority support'],
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    emoji: '🚀',
    price: '$29.99',
    period: '/month',
    features: ['Unlimited', 'All features', '24/7 support'],
  },
];

export function BillingPage({ onBack, user }: BillingPageProps) {
  const currentPlan = user?.plan || 'Free';
  const [expandedFeatures, setExpandedFeatures] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState(false);
  const [expandedHistory, setExpandedHistory] = useState(false);

  // Mock data
  const validUntil = currentPlan !== 'Free' ? 'Dec 31, 2025' : null;
  const paymentMethod = currentPlan !== 'Free' ? 'Visa •••• 4242' : null;
  
  const invoices: Invoice[] = currentPlan !== 'Free' ? [
    { id: '1', amount: '$9.99', date: 'Nov 2025', status: 'paid' },
    { id: '2', amount: '$9.99', date: 'Oct 2025', status: 'paid' },
    { id: '3', amount: '$9.99', date: 'Sep 2025', status: 'paid' },
  ] : [];

  const handleUpgrade = (planId: string) => {
    if (planId === currentPlan.toLowerCase()) {
      toast.info('This is your current plan');
      return;
    }
    toast.success(`Upgrading to ${planId} plan...`);
    // Handle upgrade logic
  };

  const handleCancelSubscription = () => {
    toast.error('Cancel subscription coming soon');
  };

  const getPlanBadge = (plan: 'Free' | 'Plus' | 'Pro') => {
    const badges = {
      Free: { emoji: '🆓', variant: 'secondary' as const },
      Plus: { emoji: '✨', variant: 'default' as const },
      Pro: { emoji: '🚀', variant: 'default' as const },
    };
    return badges[plan];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-semibold">Billing & Plans</h1>
          
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 space-y-0">
          {/* Current Plan Card */}
          <div className="pt-3 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Current Plan:</span>
                <Badge variant={getPlanBadge(currentPlan).variant} className="text-[10px] h-5 px-2">
                  {getPlanBadge(currentPlan).emoji}
                  <span className="ml-0.5">{currentPlan}</span>
                </Badge>
              </div>
              {currentPlan === 'Free' && (
                <Button 
                  size="sm" 
                  className="h-6 text-[10px] px-2.5"
                  onClick={() => toast.info('Choose a plan below')}
                >
                  Upgrade →
                </Button>
              )}
            </div>
            {validUntil && (
              <p className="text-[10px] text-muted-foreground mt-1">
                Valid until: {validUntil}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Plan Features - Collapsible */}
          <div>
            <button
              onClick={() => setExpandedFeatures(!expandedFeatures)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <span className="text-xs font-semibold text-foreground">Plan Features</span>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFeatures ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedFeatures && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1.5 pb-2">
                    {PLAN_FEATURES[currentPlan].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0" />
                        )}
                        <span className={`text-xs ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Available Plans */}
          <div className="py-2">
            <p className="text-xs font-semibold text-foreground mb-2.5">Available Plans</p>
            
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_PLANS.map((plan) => {
                const isCurrent = plan.id === currentPlan.toLowerCase();
                return (
                  <button
                    key={plan.id}
                    onClick={() => handleUpgrade(plan.id)}
                    className={`relative p-2.5 rounded-lg border transition-all ${
                      isCurrent
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${plan.popular ? 'ring-1 ring-primary/30' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <span className="text-[8px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                          Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center space-y-1">
                      <div className="text-lg">{plan.emoji}</div>
                      <p className="text-xs font-medium">{plan.name}</p>
                      <div className="text-[10px]">
                        <span className="font-semibold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      
                      <div className="space-y-0.5 pt-1">
                        {plan.features.map((feature, idx) => (
                          <p key={idx} className="text-[9px] text-muted-foreground">
                            {feature}
                          </p>
                        ))}
                      </div>
                      
                      {isCurrent ? (
                        <Badge variant="secondary" className="text-[9px] h-4 px-1.5 mt-1">
                          Current
                        </Badge>
                      ) : (
                        <div className="text-[9px] text-primary font-medium mt-1">
                          Select →
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Payment Method - Collapsible */}
          <div>
            <button
              onClick={() => setExpandedPayment(!expandedPayment)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-muted-foreground">Payment Method:</span>
                <span className="text-sm">
                  {paymentMethod || 'Not set'}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedPayment ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedPayment && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-2">
                    {paymentMethod ? (
                      <>
                        <div className="p-2.5 rounded-lg border border-border bg-muted/20 flex items-center gap-2.5">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-xs font-medium">{paymentMethod}</p>
                            <p className="text-[10px] text-muted-foreground">Expires 12/26</p>
                          </div>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full h-7 text-[11px]"
                          onClick={() => toast.info('Change payment method coming soon')}
                        >
                          Change Payment Method
                        </Button>
                      </>
                    ) : (
                      <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                        <p className="text-[10px] text-muted-foreground mb-2">
                          Add a payment method to upgrade your plan
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full h-7 text-[11px]"
                          onClick={() => toast.info('Add payment method coming soon')}
                        >
                          Add Payment Method
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Billing History - Collapsible */}
          <div>
            <button
              onClick={() => setExpandedHistory(!expandedHistory)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-muted-foreground">Billing History:</span>
                <span className="text-sm">
                  {invoices.length > 0 ? `${invoices.length} invoices` : 'No invoices'}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedHistory ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1.5 pb-2">
                    {invoices.length > 0 ? (
                      invoices.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/10 hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            <div>
                              <p className="text-xs font-medium">{invoice.amount}</p>
                              <p className="text-[10px] text-muted-foreground">{invoice.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={invoice.status === 'paid' ? 'secondary' : 'destructive'} 
                              className="text-[9px] h-4 px-1.5"
                            >
                              {invoice.status === 'paid' ? '✓ Paid' : invoice.status}
                            </Badge>
                            <button
                              onClick={() => toast.info('Download invoice coming soon')}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                        <p className="text-[10px] text-muted-foreground text-center">
                          No billing history yet
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cancel Subscription */}
          {currentPlan !== 'Free' && (
            <>
              {/* Divider */}
              <div className="h-px bg-border my-2" />

              <div className="py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelSubscription}
                  className="w-full h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Cancel Subscription
                </Button>
              </div>
            </>
          )}

          {/* Bottom spacing */}
          <div className="h-3" />
        </div>
      </main>
    </div>
  );
}

export default BillingPage;