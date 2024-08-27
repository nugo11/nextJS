import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "nugo_all",
  password: "Leopardi.1234",
  database: "nugo_all",
};

export async function POST(req) {
  try {
    const input = await req.json();

    if (!input || !input.id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const {
      id,
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

    const connection = await mysql.createConnection(dbConfig);

    const [updateResult] = await connection.execute(
      `UPDATE movies SET detailLink = ?, poster = ?, title_geo = ?, title_en = ?, year = ?, genre = ?, country = ?, director = ?, actors = ?, story = ?, imdb = ?, movieScriptContent_serial = ?, movieScriptContent_script = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?`,
      [
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
        id,
      ]
    );

    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: "No rows updated" }, { status: 404 });
    }

    const [rows] = await connection.execute(
      "SELECT * FROM movies WHERE id = ?",
      [id]
    );
    await connection.end();

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
