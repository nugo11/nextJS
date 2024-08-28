import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection
const dbConfig = {
    host: 'srv579531.hstgr.cloud',
    user: 'nugo_all',
    password: 'Leopardi.1234',
    database: 'nugo_all',
    charset: 'utf8mb4',
};

export async function GET(request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);

    const fields = params.get('fields') ? params.get('fields').split(',') : ['*'];
    const poster = params.get('poster');
    const year_from = params.get('year_from');
    const year_to = params.get('year_to');
    const imdb_from = params.get('imdb_from');
    const imdb_to = params.get('imdb_to');
    const country = params.get('country');
    const director = params.get('director');
    const detailLink = params.get('detailLink');
    const actors = params.get('actors');
    const title_geo = params.get('title_geo');
    const title_en = params.get('title_en');
    const genre = params.get('genre');
    const page = params.get('page') ? parseInt(params.get('page'), 10) : 1;
    const limit = params.get('limit') ? parseInt(params.get('limit'), 10) : 30;
    const mov = params.has('mov');
    const ser = params.has('ser');

    const offset = (page - 1) * limit;

    const allowedFields = ['id', 'title_geo', 'title_en', 'year', 'imdb', 'country', 'director', 'detailLink', 'actors', 'genre', 'last_updated', 'poster'];
    const selectedFields = fields.filter(field => allowedFields.includes(field)).join(',') || '*';

    let sql = `SELECT ${selectedFields} FROM movies WHERE 1=1`;
    const sqlParams = [];

    if (poster) {
        const posterValues = poster.split(',').map(p => `%${p}%`).join('%\' OR poster LIKE \'%');
        sql += ` AND (poster LIKE ?)`;
        sqlParams.push(posterValues);
    }

    if (year_from && year_to) {
        sql += ` AND year BETWEEN ? AND ?`;
        sqlParams.push(year_from, year_to);
    }

    if (imdb_from && imdb_to) {
        sql += ` AND imdb BETWEEN ? AND ?`;
        sqlParams.push(imdb_from, imdb_to);
    }

    if (country) {
        const countryConditions = country.split(',').map(c => `country LIKE ?`).join(' OR ');
        sql += ` AND (${countryConditions})`;
        sqlParams.push(...country.split(',').map(c => `%${c.trim()}%`));
    }

    if (director) {
        sql += ` AND director LIKE ?`;
        sqlParams.push(`%${director}%`);
    }

    if (detailLink) {
        const detailLinkConditions = detailLink.split(',').map(dl => `detailLink LIKE ?`).join(' OR ');
        sql += ` AND (${detailLinkConditions})`;
        sqlParams.push(...detailLink.split(',').map(dl => `%${dl.trim()}%`));
    }

    if (actors) {
        sql += ` AND FIND_IN_SET(?, actors)`;
        sqlParams.push(actors);
    }

    if (title_geo) {
        sql += ` AND title_geo LIKE ?`;
        sqlParams.push(`%${title_geo}%`);
    }

    if (title_en) {
        const titleEnValues = title_en.split(',').map(te => `%${te}%`).join('%\' OR title_en LIKE \'%');
        sql += ` AND (title_en LIKE ?)`;
        sqlParams.push(titleEnValues);
    }

    if (genre) {
        const genreArr = genre.replace(/[\[\]']/g, '').split(',').map(g => `%${g.trim()}%`);
        const genreConditions = genreArr.map(g => `genre LIKE ?`).join(' AND ');
        sql += ` AND (${genreConditions})`;
        sqlParams.push(...genreArr);
    }

    if (mov) {
        sql += ` AND genre NOT LIKE '%სერიალი%' AND genre NOT LIKE '%თურქული სერიალები%'`;
    }

    if (ser) {
        sql += ` AND genre LIKE '%სერიალი%'`;
    }

    sql += ` ORDER BY last_updated DESC, id DESC LIMIT ?, ?`;
    sqlParams.push(offset, limit);

    try {
        const conn = await mysql.createConnection(dbConfig);

        const [rows] = await conn.execute(sql, sqlParams);

        let countSql = `SELECT COUNT(*) as total FROM movies WHERE 1=1 ${sql.slice(sql.indexOf('AND'), sql.indexOf('ORDER BY'))}`;
        const [countRows] = await conn.execute(countSql, sqlParams.slice(0, -2));
        const totalArticles = countRows[0].total;
        const totalPages = Math.ceil(totalArticles / limit);

        await conn.end();

        const response = {
            articles: rows,
            totalPages,
            currentPage: page,
        };

        const headers = new Headers();
        headers.set('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
        headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type');    
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        headers.set('Surrogate-Control', 'no-store');

        return NextResponse.json(response, {
            status: 200,
            headers: headers,
        });

    } catch (error) {
        return NextResponse.json({ error: 'Database query failed: ' + error.message }, { status: 500 });
    }
}
