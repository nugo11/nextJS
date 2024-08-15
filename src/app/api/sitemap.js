import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const config = {
    host: 'localhost',
    user: 'filmebi_all',
    password: 'Leopardi.1234',
    database: 'filmebi_all',
    charset: 'utf8mb4'
  };

  const pool = mysql.createPool(config);

  try {
    const sql = 'SELECT detailLink FROM movies';
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

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  } finally {
    await pool.end();
  }
}
