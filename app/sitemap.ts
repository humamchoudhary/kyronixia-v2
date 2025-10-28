import { MetadataRoute } from "next";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all project slugs from Notion

  // Create the base/home page entry
  const baseUrl = {
    url: "https://kyronixia.com",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };

  // const serviceUrl = {
  //   url: "https://kyronixia.com/service",
  //   lastModified: new Date().toISOString(),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.9,
  // };
  //
  // // Transform project paths into sitemap entries
  // const servicesUrls = siteConfig.services.map((service) => {
  //   // console.log(path);
  //   return {
  //     url: `https://kyronixia.com/services/${service.slug}`,
  //     lastModified: new Date().toISOString(), // You might want to get this from Notion if available
  //     changeFrequency: "weekly" as const,
  //     priority: 0.8,
  //     // ...path,
  //   };
  // });

  // Combine all URLs
  return [baseUrl];
}
