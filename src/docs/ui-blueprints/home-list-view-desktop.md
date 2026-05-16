# UI Blueprint: Home List View (Desktop)

## 1. Global Architecture (The Shell)
- **Container**: `h-screen flex flex-col` (Full viewport height, vertical flow).
- **Background**: Soft Cement Gray (`var(--background)` -> `#f1f3f5`). This is the "Canvas" surface.
- **Scrollbar**: Custom subtle modern scrollbar (`width: 6px`, thumb: `rgba(0,0,0,0.08)`).
- **Alignment Rule**: The application is strictly left-anchored (no global horizontal centering).

## 2. Header (`Header.tsx`)
- **Height**: `72px` (`var(--header-height)`).
- **Background**: Solid White (`#ffffff`).
- **Structure**:
  - The white background and bottom border span the **full 100% width** of the screen, continuing uninterrupted through the right gutter.
- **Layout Alignment (The "Mirror" Effect)**:
  - **Left Section (Logo)**: Fixed width `280px` (matches sidebar width perfectly), `px-6`.
  - **Right Section (Controls)**: 
    - Outer wrapper applies `px-12` padding (matching the main workspace padding).
    - Inner wrapper uses `max-w-[820px] w-full flex justify-between`.
    - **Search Bar**: Anchored to the left of this 820px block.
    - **User Avatar**: Anchored exactly to the right edge of this 820px block, ensuring it sits perfectly plumb above the right edge of the product grid.

## 3. Left Navigation (`FilterSidebar.tsx`)
- **Width**: Fixed `280px` (`w-[280px] shrink-0`).
- **Background**: Solid White (`bg-white`).
- **Borders**: Right border to separate from the workspace (`border-r border-border`).
- **Scroll**: Independent internal scroll (`overflow-y-auto`).

## 4. Main Workspace (The "Canvas")
- **Container**: `main` tag, `flex-1 overflow-auto`.
- **Padding**: `lg:px-12 lg:py-8` (Creates "breathing room" separating the white sidebar from the grid).
- **Background**: Inherits global Soft Cement Gray (`#f1f3f5`).

## 5. Product Grid
- **Container Width**: `max-w-[820px] w-full` (Ensures exactly 3 columns of premium size on standard laptops without horizontal stretching).
- **Layout**: CSS Grid (`grid-cols-3`).
- **Gap**: `gap-4` (Maintains density and cohesion).

## 6. Product Cards (`ProductCard.tsx`)
- **Image Aspect Ratio**: `aspect-[4/5]` (Vertical "Social Media" format for modern feel).
- **Background**: Solid White (`#ffffff`) for maximum contrast against the gray workspace.
- **Visual Feel**: Designed to look like individual items "floating" on the gray dashboard surface.

## 7. The Right Gutter (Growth Area)
- **Definition**: The remaining space to the right of the `820px` grid and Header Avatar.
- **Visuals**: Displays the continuous gray canvas below and the continuous white header line above.
- **Purpose**: Provides visual "air" on standard screens (giving the Mercado Libre "airy" feel) and is reserved for future vertical utility panels (e.g., ads, activity feeds) without breaking the primary 3-column experience.
