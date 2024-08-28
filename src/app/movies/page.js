import Mov from "../../componenets/Mov";
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
  const queryString = new URLSearchParams(param).toString();
  const baseUrl =
    "http://filmebi.in/api/movies";
  const movies = await fetchAndParse(
    `${baseUrl}?limit=42&fields=title_geo,title_en,detailLink,year,imdb,country,genre,poster&${queryString}`
  );

  return {
    movies: movies.articles,
    totalPages: movies.totalPages,
  };
}


export async function generateMetadata({ searchParams }) {

  const queryString = new URLSearchParams(searchParams).toString();

  return {
    title: `${queryString === "ser=" ? 'სერიალები - Filmebi.in' : 'ფილმები - Filmebi.in'}`,
  };
}


export default async function HomePage({ searchParams }) {
  const data = await fetchMoviesData(searchParams);

  return <Mov mov={data} />;
}
