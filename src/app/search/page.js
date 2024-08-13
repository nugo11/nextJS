import Search from "../../componenets/search";
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
  const baseUrl = "https://filmebi.in/api/movies";
  const movies = await fetchAndParse(
    `${baseUrl}?limit=42&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster&${queryString}`
  );

  return {
    movies: movies.articles,
  };
}

export async function generateMetadata({ searchParams }) {

  const queryString = new URLSearchParams(searchParams).toString();

  return {
    title: `ძებნა: ${decodeURIComponent(queryString.replace('title_en=', '').replace('title_geo=', ''))} - Filmebi.ge`,
  };
}
export default async function SearchPage({ searchParams }) {
  const data = await fetchMoviesData(searchParams);
  return <Search mov={data} />;
}
