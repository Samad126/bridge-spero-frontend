import { MetadataRoute } from 'next'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";
const SITE_URL = process.env.NEXT_PUBLIC_PAGE_URL || 'https://bridgespero.com';

interface Group {
  id: number;
}

interface Teacher {
  id: number;
}

interface ExploreGroupsResponse {
  data: Group[];
}

interface ExploreTeachersResponse {
  data: Teacher[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  // Static public pages
  const staticPages = [
    '',
    '/explore-teachers',
    '/explore-groups',
    '/privacy-policy',
    '/contact',
  ];

  staticPages.forEach((page) => {
    sitemap.push({
      url: `${SITE_URL}${page}`,
      lastModified: new Date(),
    });
  });

  // Dynamic groups
  try {
    const groupsResponse = await fetch(`${API_BASE_URL}/groups/search?pageNumber=0&pageSize=10000`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (groupsResponse.ok) {
      const data: ExploreGroupsResponse = await groupsResponse.json();
      data.data.forEach((group: Group) => {
        sitemap.push({
          url: `${SITE_URL}/groups/${group.id}`,
          lastModified: new Date(),
        });
      });
    }
  } catch (error) {
    console.error('Error fetching groups for sitemap:', error);
  }

  // Dynamic teachers
  try {
    const teachersResponse = await fetch(`${API_BASE_URL}/teachers/search?pageNumber=0&pageSize=10000`, {
      next: { revalidate: 3600 },
    });
    if (teachersResponse.ok) {
      const data: ExploreTeachersResponse = await teachersResponse.json();
      data.data.forEach((teacher: Teacher) => {
        sitemap.push({
          url: `${SITE_URL}/teachers/${teacher.id}`,
          lastModified: new Date(),
        });
      });
    }
  } catch (error) {
    console.error('Error fetching teachers for sitemap:', error);
  }

  return sitemap;
}
