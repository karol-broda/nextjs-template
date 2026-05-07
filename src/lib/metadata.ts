import type { Metadata } from 'next';
import { appName, appDescription, baseUrl } from './config';

export function createMetadata(overrides: Metadata = {}): Metadata {
  const rawTitle = overrides.title ?? null;
  const rawDescription = overrides.description ?? null;

  const title = rawTitle !== null ? `${String(rawTitle)} | ${appName}` : appName;

  const description = rawDescription !== null ? rawDescription : appDescription;

  return {
    ...overrides,
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description: String(description),
      siteName: appName,
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
