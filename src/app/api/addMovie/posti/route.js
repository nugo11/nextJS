
import mysql from 'mysql2/promise';

const dbConnection = {
  host: 'localhost',
  user: 'nugo_all',
  password: 'Leopardi.1234',
  database: 'nugo_all',
  charset: 'utf8mb4',
};

export async function POST(req) {
  const input = await req.json();
  
  const {
    detailLink,
    poster,
    title_geo,
    title_en,
    year,
    genre,
    country,
    director,
    actors,
    story,
    imdb,
    movieScriptContent_serial,
    movieScriptContent_script,
  } = input;

  try {
    const connection = await mysql.createConnection(dbConnection);

    const [result] = await connection.execute(
      `INSERT INTO movies (detailLink, poster, title_geo, title_en, year, genre, country, director, actors, story, imdb, movieScriptContent_serial, movieScriptContent_script, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [detailLink, poster, title_geo, title_en, year, genre, country, director, actors, story, imdb, movieScriptContent_serial, movieScriptContent_script]
    );

    await connection.end();

    return new Response(JSON.stringify({ success: true, movieId: result.insertId }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
