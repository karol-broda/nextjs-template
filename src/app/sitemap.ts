import type { MetadataRoute } from 'next';
import { baseUrl } from '#/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
}
