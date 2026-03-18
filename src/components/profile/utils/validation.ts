/**
 * Profile Validation Utilities
 * Centralized validation logic
 */

export function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  // International format: +[country code][number]
  return /^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''));
}

export function validateUsername(username: string): boolean {
  if (!username) return false;
  // 3-20 characters, letters, numbers, underscore only
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function validateDisplayName(name: string): { valid: boolean; error?: string } {
  if (!name || !name.trim()) {
    return { valid: false, error: 'Name is required' };
  }
  if (name.length > 50) {
    return { valid: false, error: 'Name must be 50 characters or less' };
  }
  return { valid: true };
}

export function validateBio(bio: string): { valid: boolean; error?: string } {
  if (bio.length > 150) {
    return { valid: false, error: 'Bio must be 150 characters or less' };
  }
  return { valid: true };
}

export function validateAddressLabel(label: string): { valid: boolean; error?: string } {
  if (!label || !label.trim()) {
    return { valid: false, error: 'Label is required' };
  }
  if (label.length > 30) {
    return { valid: false, error: 'Label must be 30 characters or less' };
  }
  return { valid: true };
}

export function sanitizeUsername(input: string): string {
  // Remove invalid characters, lowercase
  return input.toLowerCase().replace(/[^a-z0-9_]/g, '');
}
