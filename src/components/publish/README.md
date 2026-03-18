# Publish Flow Architecture

## 📁 Structure

This directory contains the 5-step publishing wizard for ListlyUp.

### Files Overview

**Core Components:**
- **PublishFlow.tsx** - Main orchestrator (~130 lines, reduced from ~237)
- **FlowHeader.tsx** - Header with close button and step indicator
- **StepContainer.tsx** - Reusable wrapper for animated steps
- **StepIndicator.tsx** - Progress indicator UI

**Step Components (5 steps):**
1. **MediaStep.tsx** - Upload photos + AI suggestions
2. **BasicInfoStep.tsx** - Title, description, category, tags
3. **LocationStep.tsx** - Location picker with precision
4. **PricingStep.tsx** - Pricing, delivery, contact, visibility
5. **PreviewStep.tsx** - Review and publish

**Configuration:**
- **types.ts** - TypeScript interfaces and step configuration
- **constants.ts** - Initial form data and animation config
- **index.ts** - Centralized exports

**Hooks:**
- **hooks/usePublishFlow.ts** - State management and navigation logic

## 🎯 Architecture Pattern

```
User Action
    ↓
PublishFlow (orchestrator)
    ↓
usePublishFlow (state management hook)
    ↓
Individual Step Component
    ↓
Form Data Update
```

## 📊 Improvements Made

**Before:**
- PublishFlow.tsx: ~237 lines
- All state management inline
- Repeated motion.div code
- Inline initial form data

**After:**
- PublishFlow.tsx: ~130 lines (45% reduction)
- State management in custom hook
- Reusable StepContainer component
- Centralized constants
- Separate FlowHeader component

**Benefits:**
- ✅ Cleaner, more focused components
- ✅ Easier to test (hook can be tested separately)
- ✅ No code repetition
- ✅ Better separation of concerns
- ✅ Reusable components

## 🔄 Usage

### Basic Usage

```tsx
import { PublishFlow } from './components/publish';

function App() {
  const [showPublish, setShowPublish] = useState(false);
  
  return (
    <>
      {showPublish && (
        <PublishFlow
          onClose={() => setShowPublish(false)}
          onPublish={(data) => {
            console.log('Published:', data);
            // Save to backend
          }}
        />
      )}
    </>
  );
}
```

### Using the Hook Independently

```tsx
import { usePublishFlow } from './components/publish';

function CustomPublishFlow() {
  const {
    currentStep,
    formData,
    handleMediaNext,
    handlePublish,
  } = usePublishFlow({
    onClose: () => console.log('closed'),
    onPublish: (data) => console.log(data),
  });
  
  // Build custom UI with the hook
}
```

## 🆕 Adding New Steps

1. **Update types.ts:**
   ```typescript
   export type PublishStep = 'media' | 'basic-info' | 'location' | 'pricing' | 'new-step' | 'preview';
   
   // Add to PUBLISH_STEPS array
   ```

2. **Create NewStep.tsx:**
   ```tsx
   export function NewStep({ onNext, onBack }: StepProps) {
     return <div>{/* Your step UI */}</div>;
   }
   ```

3. **Add to usePublishFlow.ts:**
   ```typescript
   const handleNewStepNext = () => goToNextStep('new-step', 'preview');
   const handleNewStepBack = () => setCurrentStep('pricing');
   ```

4. **Add to PublishFlow.tsx:**
   ```tsx
   {currentStep === 'new-step' && (
     <StepContainer stepKey="new-step">
       <NewStep
         onNext={handleNewStepNext}
         onBack={handleNewStepBack}
       />
     </StepContainer>
   )}
   ```

## 🎨 Customization

### Animation Configuration

Edit `constants.ts`:

```typescript
export const ANIMATION_CONFIG = {
  initial: { opacity: 0, x: 20 },  // Start state
  animate: { opacity: 1, x: 0 },   // End state
  exit: { opacity: 0, x: -20 },    // Exit state
  transition: { duration: 0.2 },   // Timing
};
```

### Initial Form Data

Edit `constants.ts`:

```typescript
export const INITIAL_FORM_DATA: PublishFormData = {
  images: [],
  title: 'Default Title', // Add defaults
  // ... other fields
};
```

## 📝 Form Data Flow

1. User interacts with step component
2. Step calls `onDataChange` with partial data
3. PublishFlow merges: `setFormData({ ...formData, ...data })`
4. Updated formData passed to all steps
5. On publish, complete formData sent to backend

## 🔒 Type Safety

All components use strict TypeScript types from `types.ts`:
- `PublishFormData` - Complete form structure
- `PublishStep` - Valid step names
- `StepConfig` - Step metadata

## 🚀 Performance

- **Code splitting ready**: Each step can be lazy loaded
- **Memoization friendly**: Components receive only needed props
- **Optimized animations**: Uses Motion for 60fps animations
