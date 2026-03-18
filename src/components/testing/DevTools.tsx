/**
 * Developer Tools
 * Floating button for accessing testing tools in development
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Wrench, TestTube, User, Database, CheckCircle2 } from 'lucide-react';
import { MockUserTesting } from './MockUserTesting';
import { printValidationReport, getValidationSummary } from '../../data/mockValidation';
import { printTestingGuide } from '../../data/testingUtils';

export function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'menu' | 'users'>('menu');

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const validationSummary = getValidationSummary();

  return (
    <>
      {/* Floating Dev Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 z-[998] w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
        title="Developer Tools (Shift+Alt+D)"
        style={{
          right: 'max(24px, calc((100vw - 480px) / 2 + 24px))'
        }}
      >
        <Wrench className="w-5 h-5" />
      </button>

      {/* Dev Tools Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Developer Tools
            </SheetTitle>
          </SheetHeader>

          {activeView === 'menu' ? (
            <div className="mt-6 space-y-4">
              {/* Validation Status */}
              <div className={`p-4 rounded-lg border-2 ${
                validationSummary.allValid 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {validationSummary.allValid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <TestTube className="w-5 h-5 text-red-600" />
                  )}
                  <h3 className="font-semibold">
                    Mock Data Validation
                  </h3>
                </div>
                <div className="text-sm space-y-1">
                  {validationSummary.allValid ? (
                    <p className="text-green-700">✅ All validation checks passed!</p>
                  ) : (
                    <>
                      <p className="text-red-700">
                        ❌ {validationSummary.totalErrors} errors found
                      </p>
                      {validationSummary.totalWarnings > 0 && (
                        <p className="text-yellow-700">
                          ⚠️ {validationSummary.totalWarnings} warnings
                        </p>
                      )}
                    </>
                  )}
                  <div className="mt-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => printValidationReport()}
                    >
                      Print Full Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Quick Actions</h3>
                
                <Button
                  onClick={() => setActiveView('users')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <User className="w-4 h-4 mr-2" />
                  Mock User Testing
                </Button>

                <Button
                  onClick={() => printTestingGuide()}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Print Testing Guide
                </Button>

                <Button
                  onClick={() => {
                    console.clear();
                    console.log('%c🧪 ListlyUp Developer Tools', 'font-size: 24px; color: #9333ea; font-weight: bold;');
                    console.log('%cConsole cleared. Ready for testing!', 'color: #9333ea;');
                  }}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  Clear Console
                </Button>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Keyboard Shortcuts</h3>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div><kbd className="px-1.5 py-0.5 bg-background rounded border">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-background rounded border">Alt</kbd> + <kbd className="px-1.5 py-0.5 bg-background rounded border">D</kbd> - Toggle Dev Tools</div>
                  <div><kbd className="px-1.5 py-0.5 bg-background rounded border">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-background rounded border">Alt</kbd> + <kbd className="px-1.5 py-0.5 bg-background rounded border">A</kbd> - SuperAdmin Panel</div>
                </div>
              </div>

              {/* Current Environment */}
              <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
                <div>Environment: <span className="font-mono">{process.env.NODE_ENV}</span></div>
                <div>Date: <span className="font-mono">{new Date().toLocaleDateString()}</span></div>
              </div>
            </div>
          ) : activeView === 'users' ? (
            <div className="mt-6">
              <Button
                onClick={() => setActiveView('menu')}
                variant="outline"
                size="sm"
                className="mb-4"
              >
                ← Back to Menu
              </Button>
              <div className="-mx-6">
                <MockUserTesting />
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

// Keyboard shortcut hook
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // This will be imported by App.tsx to enable the keyboard shortcut
}
