import type { Metadata } from 'next';

const siteConfig = {
  name: 'Next.js Template',
  description: 'a modern next.js template',
  url: process.env['NEXT_PUBLIC_URL'] ?? 'http://localhost:3000',
};

export function createMetadata(overrides: Metadata = {}): Metadata {
  const rawTitle = overrides.title ?? null;
  const rawDescription = overrides.description ?? null;

  const title = rawTitle !== null ? `${String(rawTitle)} | ${siteConfig.name}` : siteConfig.name;

  const description = rawDescription !== null ? rawDescription : siteConfig.description;

  return {
    ...overrides,
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description: String(description),
      siteName: siteConfig.name,
      type: 'website',
      ...(typeof overrides.openGraph === 'object' ? overrides.openGraph : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: String(description),
      ...(typeof overrides.twitter === 'object' ? overrides.twitter : {}),
    },
  };
}
