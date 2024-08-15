import mysql from 'mysql2/promise';

async function fetchMovieSitemap() {
  const config = {
    host: 'localhost',
    user: 'filmebi_all',
    password: 'Leopardi.1234',
    database: 'filmebi_all',
    charset: 'utf8mb4',
  };

  const pool = mysql.createPool(config);

  try {
    const sql = 'SELECT detailLink FROM movies';
    const [movies] = await pool.query(sql);

    return movies.map(movie => ({
      loc: `https://filmebi.in/detail/${movie.detailLink}`,
      changefreq: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching movie sitemap:', error);
    return [];
  } finally {
    await pool.end();
  }
}

export default fetchMovieSitemap;