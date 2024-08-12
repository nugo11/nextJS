import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

const dbConfig = {
  host: 'localhost',
  user: 'filmebi_all',
  password: 'Leopardi.1234',
  database: 'filmebi_all',
  charset: 'utf8mb4',
};

export async function GET(request) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const queryParams = new URL(request.url).searchParams;

    const fields = queryParams.get('fields') ? queryParams.get('fields').split(',') : ['*'];
    const poster = queryParams.get('poster');
    const year_from = queryParams.get('year_from');
    const year_to = queryParams.get('year_to');
    const imdb_from = queryParams.get('imdb_from');
    const imdb_to = queryParams.get('imdb_to');
    const country = queryParams.get('country');
    const director = queryParams.get('director');
    const detailLink = queryParams.get('detailLink');
    const actors = queryParams.get('actors');
    const title_geo = queryParams.get('title_geo');
    const title_en = queryParams.get('title_en');
    const genre = queryParams.get('genre');
    const page = parseInt(queryParams.get('page')) || 1;
    const limit = parseInt(queryParams.get('limit')) || 30;
    const mov = queryParams.get('mov') ? true : false;
    const ser = queryParams.get('ser') ? true : false;

    const offset = (page - 1) * limit;

    const allowedFields = [
      'id', 'title_geo', 'title_en', 'year', 'imdb', 'country',
      'director', 'detailLink', 'actors', 'genre', 'last_updated', 'poster'
    ];
    const selectedFields = fields.filter(field => allowedFields.includes(field));
    const selectFields = selectedFields.length ? selectedFields.join(',') : '*';

    let sql = `SELECT ${selectFields} FROM movies WHERE 1=1`;

    // Handle `poster` parameter
    if (poster) {
      const posterConditions = poster.split(',').map(p => `poster LIKE '%${p.trim()}%'`).join(' OR ');
      sql += ` AND (${posterConditions})`;
    }

    // Handle `year_from` and `year_to` parameters
    if (year_from && year_to) {
      sql += ` AND year BETWEEN '${year_from}' AND '${year_to}'`;
    }

    // Handle `imdb_from` and `imdb_to` parameters
    if (imdb_from && imdb_to) {
      sql += ` AND imdb BETWEEN '${imdb_from}' AND '${imdb_to}'`;
    }

    // Handle `country` parameter
    if (country) {
      const countryConditions = country.split(',').map(c => `country LIKE '%${c.trim()}%'`).join(' OR ');
      sql += ` AND (${countryConditions})`;
    }

    // Handle `director` parameter
    if (director) {
      sql += ` AND director LIKE '%${conn.escape(director)}%'`;
    }

    // Handle `detailLink` parameter
    if (detailLink) {
      sql += ` AND detailLink LIKE '%${conn.escape(detailLink)}%'`;
    }

    // Handle `actors` parameter
    if (actors) {
      sql += ` AND FIND_IN_SET('${conn.escape(actors)}', actors)`;
    }

    // Handle `title_geo` parameter
    if (title_geo) {
      sql += ` AND title_geo LIKE '%${conn.escape(title_geo)}%'`;
    }

    let titleEnConditions = '';
    // Handle `title_en` parameter
    if (title_en) {
        titleEnConditions = title_en.split(',').map(t => `title_en LIKE '%${t.trim()}%'`).join(' OR ');
      sql += ` AND (${titleEnConditions})`;
    }

    // Handle `genre` parameter
    let genreArr = '';
    if (genre) {
      genreArr = genre.split(',').map(g => `genre LIKE '%${g.trim()}%'`).join(' AND ');
      sql += ` AND (${genreArr})`;
    }

    // Handle `mov` and `ser` parameters
    if (mov) {
      sql += ` AND genre NOT LIKE '%სერიალი%' AND genre NOT LIKE '%თურქული სერიალები%'`;
    }

    if (ser) {
      sql += ` AND genre LIKE '%სერიალი%'`;
    }

    sql += ` ORDER BY last_updated DESC, id DESC LIMIT ${offset}, ${limit}`;

    const [rows] = await conn.execute(sql);

    // Prepare the count query, mirroring the filtering conditions
    let countSql = `SELECT COUNT(*) as total FROM movies WHERE 1=1`;
    
    if (poster) {
      countSql += ` AND (${posterConditions})`;
    }
    if (year_from && year_to) {
      countSql += ` AND year BETWEEN '${year_from}' AND '${year_to}'`;
    }
    if (imdb_from && imdb_to) {
      countSql += ` AND imdb BETWEEN '${imdb_from}' AND '${imdb_to}'`;
    }
    if (country) {
      countSql += ` AND (${countryConditions})`;
    }
    if (director) {
      countSql += ` AND director LIKE '%${conn.escape(director)}%'`;
    }
    if (detailLink) {
      countSql += ` AND detailLink LIKE '%${conn.escape(detailLink)}%'`;
    }
    if (actors) {
      countSql += ` AND FIND_IN_SET('${conn.escape(actors)}', actors)`;
    }
    if (title_geo) {
      countSql += ` AND title_geo LIKE '%${conn.escape(title_geo)}%'`;
    }
    if (title_en) {
      countSql += ` AND (${titleEnConditions})`;
    }
    if (genre) {
      countSql += ` AND (${genreArr})`;
    }
    if (mov) {
      countSql += ` AND genre NOT LIKE '%სერიალი%' AND genre NOT LIKE '%თურქული სერიალები%'`;
    }
    if (ser) {
      countSql += ` AND genre LIKE '%სერიალი%'`;
    }

    const [[{ total }]] = await conn.execute(countSql);
    const totalPages = Math.ceil(total / limit);

    const response = {
      articles: rows,
      totalPages,
      currentPage: page,
    };

    await conn.end();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Database query failed: ' + error.message });
  }
}
