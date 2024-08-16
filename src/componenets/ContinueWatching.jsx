import axios from "axios";

async function fetchAndParse(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch or parse data:", error);
    return { articles: [], totalPages: 0 };
  }
}

export async function fetchMoviesData() {
  const baseUrl = "https://filmebi.in/api/movies";
  const savedMovies =
    JSON.parse(localStorage.getItem("storedMovies")).length >= 1 &&
    await fetchAndParse(
      `${baseUrl}?detailLink=${localStorage
        .getItem("storedMovies")
        .replaceAll('"', "")
        .replace("[", "")
        .replace("]", "")}&fields=title_geo,title_en,detailLink,poster`
    );

  return {
    savedMovies: savedMovies,
  };
}

export default async function ContinueWatching() {
  const data = await fetchMoviesData();
  return console.log(data);
}
