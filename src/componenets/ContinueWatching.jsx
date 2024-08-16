import axios from "axios";

function fetchAndParse(url) {
  try {
    const res = axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch or parse data:", error);
    return { articles: [], totalPages: 0 };
  }
}

export function fetchMoviesData(param) {
  const baseUrl = "https://filmebi.in/api/movies";
  const savedMovies =
    JSON.parse(localStorage.getItem("storedMovies")).length >= 1 &&
    fetchAndParse(
      `${baseUrl}?detailLink=${localStorage
        .getItem("storedMovies")
        .replaceAll('"', "")
        .replace("[", "")
        .replace("]", "")}`
    );

  return {
    savedMovies: savedMovies.articles,
  };
}

export default function ContinueWatching() {
  const data = fetchMoviesData();
  return console.log(data);
}
