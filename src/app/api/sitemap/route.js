// src/app/api/sitemap/route.js or sitemap.js (based on your file structure)
import { NextResponse } from 'next/server';
import fetchMovieSitemap from './fetchMovieSitemap'; // Adjust the import based on your structure

export async function GET() {
  const movieUrls = await fetchMovieSitemap();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  movieUrls.forEach((movie) => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${movie.loc}</loc>\n`;
    sitemap += `    <changefreq>${movie.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${movie.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>\n`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
