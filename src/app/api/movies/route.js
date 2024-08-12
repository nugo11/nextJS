import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Database connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'filmebi_all', // replace with your MySQL username
    password: 'Leopardi.1234', // replace with your MySQL password
    database: 'filmebi_all', // replace with your database name
    charset: 'utf8mb4',
  });

  const fields = searchParams.get('fields') ? searchParams.get('fields').split(',') : ['*'];
  const poster = searchParams.get('poster');
  const year_from = searchParams.get('year_from');
  const year_to = searchParams.get('year_to');
  const imdb_from = searchParams.get('imdb_from');
  const imdb_to = searchParams.get('imdb_to');
  const country = searchParams.get('country');
  const director = searchParams.get('director');
  const detailLink = searchParams.get('detailLink');
  const actors = searchParams.get('actors');
  const title_geo = searchParams.get('title_geo');
  const title_en = searchParams.get('title_en');
  const genre = searchParams.get('genre');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '30', 10);
  const mov = searchParams.has('mov');
  const ser = searchParams.has('ser');

  const offset = (page - 1) * limit;

  const allowedFields = ['id', 'title_geo', 'title_en', 'year', 'imdb', 'country', 'director', 'detailLink', 'actors', 'genre', 'last_updated', 'poster'];
  const selectedFields = fields.filter(field => allowedFields.includes(field));
  const selectFields = selectedFields.length > 0 ? selectedFields.join(',') : '*';

  let sql = `SELECT ${selectFields} FROM movies WHERE 1=1`;

  if (poster) {
    sql += ` AND poster LIKE '%${connection.escape(poster)}%'`;
  }

  if (year_from && year_to) {
    sql += ` AND year BETWEEN ${connection.escape(year_from)} AND ${connection.escape(year_to)}`;
  }

  if (imdb_from && imdb_to) {
    sql += ` AND imdb BETWEEN ${connection.escape(imdb_from)} AND ${connection.escape(imdb_to)}`;
  }

  if (country) {
    const countryArr = country.split(',').map(c => `country LIKE '%${connection.escape(c.trim())}%'`);
    sql += ` AND (${countryArr.join(' OR ')})`;
  }

  if (director) {
    sql += ` AND director LIKE '%${connection.escape(director)}%'`;
  }

  if (detailLink) {
    sql += ` AND detailLink LIKE '%${connection.escape(detailLink)}%'`;
  }

  if (actors) {
    sql += ` AND FIND_IN_SET(${connection.escape(actors)}, actors)`;
  }

  if (title_geo) {
    sql += ` AND title_geo LIKE '%${connection.escape(title_geo)}%'`;
  }

  if (title_en) {
    const titleEnArr = title_en.split(',').map(t => `title_en LIKE '%${connection.escape(t.trim())}%'`);
    sql += ` AND (${titleEnArr.join(' OR ')})`;
  }

  if (genre) {
    const genreArr = genre.replace(/[\[\]']/g, '').split(',').map(g => `genre LIKE '%${connection.escape(g.trim())}%'`);
    sql += ` AND (${genreArr.join(' AND ')})`;
  }

  if (mov) {
    sql += ` AND genre NOT LIKE '%სერიალი%' AND genre NOT LIKE '%თურქული სერიალები%'`;
  }

  if (ser) {
    sql += ` AND genre LIKE '%სერიალი%'`;
  }

  sql += ` ORDER BY last_updated DESC, id DESC LIMIT ${offset}, ${limit}`;

  const [rows] = await connection.execute(sql);

  const countSql = `SELECT COUNT(*) as total FROM movies WHERE 1=1`;
  const [countRows] = await connection.execute(countSql);
  const totalArticles = countRows[0].total;
  const totalPages = Math.ceil(totalArticles / limit);

  const response = {
    articles: rows,
    totalPages,
    currentPage: page
  };

  return NextResponse.json(response, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}