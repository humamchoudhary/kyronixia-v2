import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // disallow: ['/private/', '/admin/'], // Example of disallowing specific paths
      },
    ],
    sitemap: 'https://test.kyronixia.com/sitemap.xml', // Replace with your actual domain
  };
}
