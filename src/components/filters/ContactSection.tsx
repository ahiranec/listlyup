import { MessageCircle } from "lucide-react";
import { FilterSection } from "./FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "./shared";
import { contactMethodOptions } from "./constants";
import type { FilterOptions } from "./types";

// Icons for contact methods (CANONICAL)
const contactIcons: Record<string, string> = {
  in_app_chat: '💬',
  whatsapp: '📱',
  website: '🔗',
  social_media: '📲',
};

interface ContactSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

export function ContactSection({ filters, isOpen, onToggle, onUpdate }: ContactSectionProps) {
  const getSelectedLabel = () => {
    if (filters.contact_methods.length > 0) {
      return `${filters.contact_methods.length} selected`;
    }
    return "All";
  };

  const toggleContactMethod = (method: string) => {
    if (filters.contact_methods.includes(method as any)) {
      onUpdate({ ...filters, contact_methods: filters.contact_methods.filter(m => m !== method) });
    } else {
      onUpdate({ ...filters, contact_methods: [...filters.contact_methods, method as any] });
    }
  };

  // Convert to CheckboxOption with emojis
  const checkboxOptions: CheckboxOption[] = contactMethodOptions.map(mode => ({
    value: mode.value,
    label: mode.label,
    emoji: contactIcons[mode.value],
  }));

  return (
    <FilterSection
      title="Contact Methods"
      icon={MessageCircle}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.5}
    >
      <FilterCheckboxGroup
        options={checkboxOptions}
        selectedValues={new Set(filters.contact_methods)}
        onToggle={toggleContactMethod}
      />
    </FilterSection>
  );
}
