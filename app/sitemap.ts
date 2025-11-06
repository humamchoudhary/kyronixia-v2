import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles"; // Assuming this function exists to get all articles

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://test.kyronixia.com"; // Replace with your actual domain

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/#solutions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Add other static pages as needed, e.g., '/about', '/services'
  ];

  // Dynamic article pages
  const articles = getAllArticles(); // Fetch all articles
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: article.date ? new Date(article.date) : new Date(), // Use article date if available
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
