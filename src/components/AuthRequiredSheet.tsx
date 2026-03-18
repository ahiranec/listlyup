/**
 * Auth Required Sheet - Premium 2025 Design ✨
 * 
 * Modal que aparece cuando usuarios NO autenticados intentan acceder
 * a funcionalidades que requieren login (Chat, Publish, Favorites, etc.)
 */

import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { motion } from 'motion/react';
import { Lock, MessageCircle, Plus, Star, Users, Send, TrendingUp, DollarSign, HelpCircle } from 'lucide-react';

export type AuthRequiredContext = 
  | 'message' 
  | 'publish' 
  | 'favorites' 
  | 'groups' 
  | 'chat'
  | 'offer'      // NEW: Making offers
  | 'question'   // NEW: Asking questions
  | 'default';

interface AuthRequiredSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: AuthRequiredContext;
  onSignUp: () => void;
  onSignIn: () => void;
}

const contextConfig: Record<AuthRequiredContext, {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  primaryCTA: string;
}> = {
  message: {
    icon: MessageCircle,
    title: 'Message this seller',
    subtitle: 'Sign in to start conversations with sellers and buyers',
    primaryCTA: 'Sign In to Message',
  },
  publish: {
    icon: Plus,
    title: 'Publish your listing',
    subtitle: 'Sign in to post items and reach thousands of buyers',
    primaryCTA: 'Sign In to Publish',
  },
  favorites: {
    icon: Star,
    title: 'Save your favorites',
    subtitle: 'Sign in to bookmark items and access them anytime',
    primaryCTA: 'Sign In to Save',
  },
  groups: {
    icon: Users,
    title: 'Join communities',
    subtitle: 'Sign in to join groups and connect with others',
    primaryCTA: 'Sign In to Join',
  },
  chat: {
    icon: Send,
    title: 'Start chatting',
    subtitle: 'Sign in to message sellers and manage conversations',
    primaryCTA: 'Sign In to Chat',
  },
  offer: {
    icon: DollarSign,
    title: 'Make an offer',
    subtitle: 'Sign in to negotiate prices and make deals',
    primaryCTA: 'Sign In to Make Offer',
  },
  question: {
    icon: HelpCircle,
    title: 'Ask a question',
    subtitle: 'Sign in to ask sellers questions about their listings',
    primaryCTA: 'Sign In to Ask',
  },
  default: {
    icon: Lock,
    title: 'Sign in required',
    subtitle: 'Sign in to unlock all features of ListlyUp',
    primaryCTA: 'Sign In - Free',
  },
};

export function AuthRequiredSheet({
  open,
  onOpenChange,
  context = 'default',
  onSignUp,
  onSignIn,
}: AuthRequiredSheetProps) {
  
  const config = contextConfig[context];
  const Icon = config.icon;

  const benefits = [
    { icon: Star, text: 'Save your favorites' },
    { icon: MessageCircle, text: 'Message sellers directly' },
    { icon: Plus, text: 'Publish listings easily' },
    { icon: Users, text: 'Join communities' },
    { icon: TrendingUp, text: 'Track your activity' },
  ];

  const handleSignUp = () => {
    onOpenChange(false);
    onSignUp();
  };

  const handleSignIn = () => {
    onOpenChange(false);
    onSignIn();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-auto rounded-t-3xl border-t border-gray-200/50 shadow-2xl max-w-lg mx-auto"
      >
        <SheetTitle className="sr-only">Authentication Required</SheetTitle>
        <SheetDescription className="sr-only">
          {config.subtitle}
        </SheetDescription>

        <div className="px-6 py-8">
          
          {/* Icon + Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <motion.div
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Icon className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {config.title}
            </h2>
            
            <p className="text-sm text-muted-foreground max-w-sm">
              {config.subtitle}
            </p>
          </div>

          {/* Benefits list */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-4 mb-6">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              What you'll unlock:
            </p>
            <div className="space-y-2.5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            {/* Primary: Sign In */}
            <motion.button
              onClick={handleSignIn}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center gap-2 font-medium shadow-sm transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {config.primaryCTA}
            </motion.button>

            {/* Secondary: Sign Up */}
            <div className="flex items-center justify-center gap-1.5 text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>
              <button
                onClick={handleSignUp}
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Bottom safe area */}
          <div className="h-2" />
        </div>
      </SheetContent>
    </Sheet>
  );
}