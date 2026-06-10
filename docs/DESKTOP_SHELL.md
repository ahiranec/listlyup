# Desktop Shell & Responsive Modals

Conventions for ListlyUp's desktop (≥1024px) experience. The app is mobile-first; these rules make it use desktop space well without a separate desktop codebase.

## 1. Page width — 640px single column

Full-page (non-overlay) **root containers** use:

```
max-w-[480px] lg:max-w-[640px] mx-auto w-full
```

- `lg:max-w-[640px]` → a focused single column on desktop (not edge-to-edge).
- **`w-full` is required.** Page roots are flex items inside `AppShell` (`flex flex-col`). With only `mx-auto` + a `max-width`, a flex item shrinks to its *content* width instead of expanding to the cap. (My Trail once rendered at 420px instead of 640 until `w-full` was added — `max-width` is an upper bound, not a target.)
- Multi-column grids that key off the **viewport** (`lg:grid-cols-2 xl:grid-cols-3`) must collapse to `grid-cols-1` when the container is capped at 640 — the grid responds to viewport width, not container width (this bit My Listings).

This applies to page roots only — **not** overlays/floating bars/sheets (which are intentionally `max-w-[480px]` mobile-centered or `fixed`).

## 2. Modals — `ResponsiveModal`, breakpoint lg/1024

`src/components/shared/ResponsiveModal.tsx` renders a **bottom Sheet below 1024px** and a **centered Dialog at 1024px and up** (`useMediaQuery('(min-width: 1024px)')`). Props: `open`, `onOpenChange`, `title`, `description` (both rendered sr-only for a11y), `desktopMaxWidth` (e.g. `max-w-md`/`max-w-lg`), `mobileHeight` (e.g. `h-auto`/`h-[70vh]`/`h-[85vh]`), `className`, `hideCloseButton`.

**Migration pattern** (replace raw `ui/sheet`):
- `<Sheet><SheetContent side="bottom" …>` → `<ResponsiveModal title description desktopMaxWidth mobileHeight>`.
- Pass title/description text to the props. A **visible** header is kept but converted: `SheetTitle`→`<h2 className="font-semibold">`, `SheetDescription`→`<p className="text-sm text-muted-foreground">`, `SheetHeader`→plain `<div>`. An `sr-only` SheetHeader is dropped.
- The repo's `SheetContent` has **no default padding** — wrap simple content in `<div className="p-6">`.
- Form sheets (header / scroll body / footer) use the flex template: header `flex-none`, body `flex-1 min-h-0 overflow-y-auto`, footer `flex-none`; set `mobileHeight` to the original vh.

**Status:** migrated — AuthRequired, MarkAsSold, ProductAccessDenied, the generic `ActionQuickSheet` (covers ~15 registry-driven quick actions), ShareSheet, AskQuestionSheet, MakeOffer, Reply, Rating, PauseListing, ManageOffers, ReportSheet (product-detail), ReportGroup, ShareToGroup, CreateGroup, NotificationExpanded, ExploreGroups, SellerSheet.

**Intentionally skipped / deferred:**
- `MenuSheet`, `SettingsSheet` — right-side panels by design.
- `filter-sheet/FilterSheet` — mobile-only (desktop uses the persistent `FilterSidebar`; its trigger is `lg:hidden`).
- `super-admin/*`, `DevTools` — admin/dev tooling.
- Already-centered `Dialog`s (ProductModal, DealConfirmedDialog, MuteNotificationsDialog, LocationModal, VerificationDialog, ListingStatsModal) — fine on desktop; converting only adds a mobile bottom-sheet (optional, low priority).

## 3. Desktop Account Shell

On desktop, the account/menu area is a **master-detail** layout (`src/components/layout/AccountShell.tsx` = persistent left sidebar + scrollable right pane; `src/components/account/AccountSidebar.tsx` = section list + profile header + "Back to Home" + Logout), instead of the mobile menu sheet → full-page push.

Wiring in `App.tsx`: a top-of-render branch `isDesktop && ACCOUNT_SHELL_VIEWS.includes(currentView)` renders the shell. `ACCOUNT_SHELL_VIEWS` = action-center, statistics, saved-items, my-trail, help-support, groups, my-listings, settings, profile. Default entry: clicking the home header profile avatar on desktop calls `navigateToActionCenter()` (mobile still opens `MenuSheet`). `handleAccountSelect()` maps a sidebar key → the existing `navigation.*` handlers.

Each section is passed `embedded` so it **hides its redundant in-page Back button** (the sidebar's "Back to Home" replaces it); Settings/Profile plumb `embedded` through `AppStandaloneRenderer → Settings/ProfileRouter → Settings/ProfileHub` (hub only; sub-pages keep their internal back). `ownerListingsForDisplay` is computed once and shared by the mobile branch + shell. Mobile is unchanged throughout.

## 4. Self-verification routine

Apply to every visual change:
1. `npx vite build` → must end `✓ built` (exit 0). **Source of truth** — the repo has pre-existing TS errors (e.g. `ExtendedProduct` in `product-detail/*`), so the esbuild build, not `tsc`, gates correctness.
2. `npx tsc --noEmit --ignoreDeprecations 6.0`, grep-filtered to touched files → **no NEW errors**.
3. **Preview DOM assertion** (Claude Preview MCP / `.claude/launch.json`, port 3001): `preview_start` → **reload at width 1280** so `useMediaQuery` settles (it inits `false`; `preview_resize` alone doesn't fire its `change` listener) → drive with `preview_eval` and assert computed facts (modal is a centered Dialog at its `desktopMaxWidth` when ≥1024 / bottom Sheet when <1024; a page root width === 640; a back button is absent). Mock login: `ahirane@gmail.com` / `ah901990`.
4. Atomic commit per logical change.

> Known minor: `useMediaQuery` initializes `false` then corrects on mount — a real desktop load settles before interaction, but a fresh preview needs a reload at the target width.
