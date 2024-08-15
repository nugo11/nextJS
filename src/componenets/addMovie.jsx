"use client";

import { useState } from "react";
import { useAuth } from "./login/authcontext";

const AddMovie = () => {
  const { user } = useAuth();
  const [newMovie, setNewMovie] = useState({
    detailLink: "",
    poster: "",
    title_geo: "",
    title_en: "",
    year: "",
    genre: "",
    country: "",
    director: "",
    actors: "",
    story: "",
    imdb: "",
    movieScriptContent_serial: "",
    movieScriptContent_script: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://filmebi.in/api/addMovie/posti", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (response.ok) {
      console.log("Movie added successfully");
    } else {
      console.error("Failed to add movie");
    }
  };

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit} className="addmovies">
          <input
            type="text"
            name="detailLink"
            value={newMovie.detailLink}
            onChange={handleChange}
            placeholder="Detail Link"
            required
          />
          <input
            type="text"
            name="poster"
            value={newMovie.poster}
            onChange={handleChange}
            placeholder="Poster URL"
            required
          />
          <input
            type="text"
            name="title_geo"
            value={newMovie.title_geo}
            onChange={handleChange}
            placeholder="Georgian Title"
            required
          />
          <input
            type="text"
            name="title_en"
            value={newMovie.title_en}
            onChange={handleChange}
            placeholder="English Title"
            required
          />
          <input
            type="text"
            name="year"
            value={newMovie.year}
            onChange={handleChange}
            placeholder="Year"
            required
          />
          <input
            type="text"
            name="genre"
            value={newMovie.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
          />
          <input
            type="text"
            name="country"
            value={newMovie.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          <input
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleChange}
            placeholder="Director"
            required
          />
          <input
            type="text"
            name="actors"
            value={newMovie.actors}
            onChange={handleChange}
            placeholder="Actors"
            required
          />
          <textarea
            name="story"
            value={newMovie.story}
            onChange={handleChange}
            placeholder="Story"
            required
          ></textarea>
          <input
            type="number"
            step="0.1"
            name="imdb"
            value={newMovie.imdb}
            onChange={handleChange}
            placeholder="IMDB Rating"
            required
          />
          <textarea
            name="movieScriptContent_serial"
            value={newMovie.movieScriptContent_serial}
            onChange={handleChange}
            placeholder="Serial Script Content"
            required
          ></textarea>
          <textarea
            name="movieScriptContent_script"
            value={newMovie.movieScriptContent_script}
            onChange={handleChange}
            placeholder="Movie Script Content"
            required
          ></textarea>
          <button type="submit">Add Movie</button>
        </form>
      )}
    </>
  );
};

export default AddMovie;
