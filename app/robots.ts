import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Since you have a focused site structure, we'll keep it simple
      disallow: ["/api/"], // Disallow API routes
    },
    sitemap: "https://www.kyronixia.com/sitemap.xml",
  };
}
