import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  // MySQL connection configuration
  const config = {
    host: 'localhost',
    user: 'filmebi_all',
    password: 'Leopardi.1234',
    database: 'filmebi_all',
    charset: 'utf8mb4'
  };

  // Create a connection pool
  const pool = mysql.createPool(config);

  try {
    // Query to get URLs
    const sql = 'SELECT id, title_en FROM movies'; // Adjust as needed
    const [movies] = await pool.query(sql);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    movies.forEach((movie) => {
      const url = `https://filmebi.in/detail/${movie.detailLink}`;
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${url}</loc>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`; 
      sitemap += `    <priority>0.8</priority>\n`; 
      sitemap += `  </url>\n`;
    });

    sitemap += `</urlset>\n`;

    return NextResponse.json(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json('Error generating sitemap', { status: 500 });
  } finally {
    // Close the connection pool
    await pool.end();
  }
}
