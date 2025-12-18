import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge Tailwind classes
 * Handles conditional classes and prevents conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
