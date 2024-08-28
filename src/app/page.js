import App from "../componenets/App";
import axios from 'axios';
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic';

async function fetchAndParse(url) {
  try {
    const res = await axios.get(url, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch or parse data:', error);
    return { articles: [], totalPages: 0 };
  }
}

async function fetchMoviesData() {
  const baseUrl = "http://filmebi.in/api/movies";

  const cookieStore = cookies();
  const storedMovies = cookieStore.get('storedMovies')?.value;
  const moviesArray = storedMovies ? JSON.parse(storedMovies) : [];

  const movieDetails = moviesArray.map(item => ({
    detailLink: item.detailLink,
    createdAt: item.createdAt,
  }));

  const detailLinks = movieDetails.map(item => item.detailLink);

  const [ser, turk, anime, animation, movSlider, storedMov] = await Promise.all([
    fetchAndParse(`${baseUrl}?genre=${encodeURIComponent('სერიალი')}&limit=8&fields=title_geo,title_en,detailLink,year,imdb,country,genre,poster`),
    fetchAndParse(`${baseUrl}?genre=${encodeURIComponent('თურქული სერიალები')}&limit=12&fields=title_geo,title_en,detailLink,year,imdb,country,genre,poster`),
    fetchAndParse(`${baseUrl}?genre=${encodeURIComponent('სერიალი,ანიმაციური')}&limit=12&fields=title_geo,title_en,detailLink,year,imdb,country,genre,poster`),
    fetchAndParse(`${baseUrl}?mov=&genre=${encodeURIComponent('ანიმაციური')}&limit=8&fields=title_geo,title_en,detailLink,year,imdb,country,genre,poster`),
    fetchAndParse(`${baseUrl}?mov=&limit=8&fields=title_geo,title_en,detailLink,year,imdb,country,genre,poster`),
    storedMovies ? fetchAndParse(`${baseUrl}?detailLink=${detailLinks}&fields=title_geo,title_en,detailLink,poster`) : { articles: [] },
  ]);

  return {
    ser: ser.articles,
    turk: turk.articles,
    anime: anime.articles,
    animation: animation.articles,
    movSlider: movSlider.articles,
    storedMov: storedMov.articles.map((movie, index) => ({
      ...movie,
      createdAt: movieDetails[index]?.createdAt,
    })),
  };
}

export default async function HomePage() {
  const data = await fetchMoviesData();
  return <App mov={data} />;
}
