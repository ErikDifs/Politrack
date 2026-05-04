/**
 * User validation utilities
 * Provides reusable validation for user data
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a user name
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

/**
 * Validates a complete user object
 */
export function validateUser(data: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== 'object') {
    errors.push({ field: 'root', message: 'Invalid user data' });
    return { valid: false, errors };
  }

  const user = data as Record<string, unknown>;

  // Validate name
  if (!user.name || typeof user.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (!validateName(user.name)) {
    errors.push({
      field: 'name',
      message: 'Name must be between 2 and 100 characters',
    });
  }

  // Validate email
  if (!user.email || typeof user.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(user.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Formats validation errors for display
 */
export function formatErrors(errors: ValidationError[]): Record<string, string> {
  return errors.reduce(
    (acc, error) => {
      acc[error.field] = error.message;
      return acc;
    },
    {} as Record<string, string>
  );
}
