import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://docs.reevit.io";

  const pages = source.getPages();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  const dynamicRoutes = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(), // Ideally this would come from the file stats or frontmatter
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
