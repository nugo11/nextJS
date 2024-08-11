import Detail from "../../../componenets/Detail";
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

export async function fetchMoviesData(param) {
  const baseUrl = "https://filmebi.in/api/movies.php";
  const movies = await fetchAndParse(`${baseUrl}?detailLink=${param}`);

  return {
    movies: movies.articles,
  };
}

export default async function GET({ params }) {
  const data = await fetchMoviesData(params.slug);

  return <Detail mov={data} getParam={params.slug} />;
}
