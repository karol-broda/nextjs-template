import { describe, test, expect } from 'bun:test';
import { createMetadata } from '#/lib/metadata';

describe('createMetadata', () => {
  test('returns defaults when called with no overrides', () => {
    const meta = createMetadata();
    expect(meta.title).toBe('Next.js Template');
    expect(meta.description).toBe('a modern next.js template');
  });

  test('appends site name to custom title', () => {
    const meta = createMetadata({ title: 'dashboard' });
    expect(meta.title).toBe('dashboard | Next.js Template');
  });

  test('uses custom description', () => {
    const meta = createMetadata({ description: 'custom desc' });
    expect(meta.description).toBe('custom desc');
  });

  test('merges openGraph overrides', () => {
    const meta = createMetadata({
      openGraph: { images: ['/og.png'] },
    });
    const og = meta.openGraph;
    expect(og).toBeDefined();
    if (og !== null && og !== undefined) {
      expect('images' in og && og.images).toEqual(['/og.png']);
      expect('siteName' in og && og.siteName).toBe('Next.js Template');
    }
  });

  test('merges twitter overrides', () => {
    const meta = createMetadata({
      twitter: { creator: '@me' },
    });
    const tw = meta.twitter;
    expect(tw).toBeDefined();
    if (tw !== null && tw !== undefined) {
      expect('creator' in tw && tw.creator).toBe('@me');
      expect('card' in tw && tw.card).toBe('summary_large_image');
    }
  });
});
