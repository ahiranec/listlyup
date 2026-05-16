/**
 * FilterSheetContent Component
 * Container scrollable con todas las secciones de filtros
 */

import {
  SortBySection,
  TypeSection,
  OfferModeSection,
  GroupsSection,
  TagsSection,
  CategorySection,
  ConditionSection,
  LocationSection,
  UserSection,
  AccessModeSection,
  ContactSection,
  PriceSection,
} from "../filters";
import type { FilterSheetContentProps } from "./types";

export function FilterSheetContent({
  filters,
  openSections,
  onToggleSection,
  onUpdateFilters,
  className = "",
  noScroll = false,
}: FilterSheetContentProps) {
  return (
    <div className={`w-full px-4 py-4 space-y-3 ${!noScroll ? 'flex-1 overflow-auto' : ''} ${className}`}>
      
      {/* Sort By Section */}
      <SortBySection
        filters={filters}
        isOpen={openSections.sortBy}
        onToggle={() => onToggleSection('sortBy')}
        onUpdate={onUpdateFilters}
      />

      {/* Type Filter */}
      <TypeSection
        filters={filters}
        isOpen={openSections.type}
        onToggle={() => onToggleSection('type')}
        onUpdate={onUpdateFilters}
      />

      {/* Offer Mode Filter */}
      <OfferModeSection
        filters={filters}
        isOpen={openSections.offerMode}
        onToggle={() => onToggleSection('offerMode')}
        onUpdate={onUpdateFilters}
      />

      {/* Groups Filter */}
      <GroupsSection
        filters={filters}
        isOpen={openSections.groups}
        onToggle={() => onToggleSection('groups')}
        onUpdate={onUpdateFilters}
      />

      {/* Tags Filter */}
      <TagsSection
        filters={filters}
        isOpen={openSections.tags}
        onToggle={() => onToggleSection('tags')}
        onUpdate={onUpdateFilters}
      />

      {/* Category Filter */}
      <CategorySection
        filters={filters}
        isOpen={openSections.category}
        onToggle={() => onToggleSection('category')}
        onUpdate={onUpdateFilters}
      />

      {/* Condition Filter */}
      <ConditionSection
        filters={filters}
        isOpen={openSections.condition}
        onToggle={() => onToggleSection('condition')}
        onUpdate={onUpdateFilters}
      />

      {/* Location Filter */}
      <LocationSection
        filters={filters}
        isOpen={openSections.location}
        onToggle={() => onToggleSection('location')}
        onUpdate={onUpdateFilters}
      />

      {/* User Filter */}
      <UserSection
        filters={filters}
        isOpen={openSections.seller}
        onToggle={() => onToggleSection('seller')}
        onUpdate={onUpdateFilters}
      />

      {/* Access Mode Filter */}
      <AccessModeSection
        filters={filters}
        isOpen={openSections.delivery}
        onToggle={() => onToggleSection('delivery')}
        onUpdate={onUpdateFilters}
      />

      {/* Contact Filter */}
      <ContactSection
        filters={filters}
        isOpen={openSections.contact}
        onToggle={() => onToggleSection('contact')}
        onUpdate={onUpdateFilters}
      />

      {/* Price Filter */}
      <PriceSection
        filters={filters}
        isOpen={openSections.price}
        onToggle={() => onToggleSection('price')}
        onUpdate={onUpdateFilters}
      />

    </div>
  );
}
