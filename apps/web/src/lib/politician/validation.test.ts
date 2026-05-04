import { describe, it, expect } from 'vitest';
import { validateEmail, validateName, validateUser, formatErrors } from './validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('john.doe@company.co.uk')).toBe(true);
      expect(validateEmail('test+tag@domain.org')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user space@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('should return true for valid names', () => {
      expect(validateName('John Doe')).toBe(true);
      expect(validateName('AB')).toBe(true); // minimum 2 chars
      expect(validateName('A'.repeat(100))).toBe(true); // maximum 100 chars
    });

    it('should return false for invalid names', () => {
      expect(validateName('A')).toBe(false); // too short
      expect(validateName('A'.repeat(101))).toBe(false); // too long
      expect(validateName('')).toBe(false);
      expect(validateName('   ')).toBe(false); // only spaces
    });
  });

  describe('validateUser', () => {
    it('should return valid result for correct user data', () => {
      const result = validateUser({
        name: 'John Doe',
        email: 'john@example.com',
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing name', () => {
      const result = validateUser({ email: 'john@example.com' });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'name',
          message: expect.stringContaining('required'),
        })
      );
    });

    it('should detect invalid name', () => {
      const result = validateUser({
        name: 'A', // too short
        email: 'john@example.com',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'name',
          message: expect.stringContaining('2 and 100 characters'),
        })
      );
    });

    it('should detect missing email', () => {
      const result = validateUser({ name: 'John Doe' });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'email',
          message: expect.stringContaining('required'),
        })
      );
    });

    it('should detect invalid email', () => {
      const result = validateUser({
        name: 'John Doe',
        email: 'invalid-email',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'email',
          message: expect.stringContaining('Invalid email'),
        })
      );
    });

    it('should detect multiple errors', () => {
      const result = validateUser({
        name: 'A',
        email: 'invalid',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
    });

    it('should handle non-object data', () => {
      const result = validateUser('not an object');

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('formatErrors', () => {
    it('should convert errors array to object', () => {
      const errors = [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Invalid email' },
      ];

      const formatted = formatErrors(errors);

      expect(formatted).toEqual({
        name: 'Name is required',
        email: 'Invalid email',
      });
    });

    it('should handle empty errors array', () => {
      const formatted = formatErrors([]);
      expect(formatted).toEqual({});
    });
  });
});
