import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Database connection setup
const dbConfig = {
  host: "localhost",
  user: "filmebi_all",
  password: "Leopardi.1234",
  database: "filmebi_all",
};

// Handle the POST request
export async function POST(req) {
  try {
    // Retrieve the JSON input
    const input = await req.json();

    // Check if input contains the necessary data
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

    // Prepare the SQL update statement
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

    // Fetch and return the updated movie
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
