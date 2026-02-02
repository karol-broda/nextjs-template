import { describe, test, expect } from 'bun:test';
import { isoDateSchema, numericStringSchema } from '#/lib/zod/codecs';
import { required, requiredString, friendlyEmail } from '#/lib/zod/error-map';

describe('codecs', () => {
  test('isoDateSchema transforms valid datetime to Date', () => {
    const result = isoDateSchema.safeParse('2024-01-15T10:30:00Z');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeInstanceOf(Date);
      expect(result.data.getFullYear()).toBe(2024);
    }
  });

  test('isoDateSchema rejects invalid datetime', () => {
    const result = isoDateSchema.safeParse('not-a-date');
    expect(result.success).toBe(false);
  });

  test('numericStringSchema transforms digits to number', () => {
    const result = numericStringSchema.safeParse('42');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(42);
    }
  });

  test('numericStringSchema rejects non-digits', () => {
    const result = numericStringSchema.safeParse('abc');
    expect(result.success).toBe(false);
  });
});

describe('error helpers', () => {
  test('required returns error message with field name', () => {
    const helper = required('email');
    expect(helper.error).toBe('email is required');
  });

  test('requiredString rejects empty string', () => {
    const schema = requiredString('name');
    const result = schema.safeParse('');
    expect(result.success).toBe(false);
  });

  test('requiredString accepts non-empty string', () => {
    const schema = requiredString('name');
    const result = schema.safeParse('alice');
    expect(result.success).toBe(true);
  });

  test('friendlyEmail rejects invalid emails', () => {
    const result = friendlyEmail.safeParse('notanemail');
    expect(result.success).toBe(false);
  });

  test('friendlyEmail accepts valid emails', () => {
    const result = friendlyEmail.safeParse('user@example.com');
    expect(result.success).toBe(true);
  });
});
