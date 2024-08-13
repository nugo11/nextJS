import App from "../componenets/App";
import axios from 'axios';

async function fetchAndParse(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch or parse data:', error);
    return { articles: [], totalPages: 0 };
  }
}

async function fetchMoviesData() {
  const baseUrl = "https://filmebi.in/api/movies";
  const [ser, turk, anime, animation, movSlider] = await Promise.all([
    fetchAndParse(`${baseUrl}?genre=${encodeURIComponent('სერიალი')}&limit=8&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndParse(`${baseUrl}?genre=${encodeURIComponent('თურქული სერიალები')}&limit=12&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndParse(`${baseUrl}?genre=${encodeURIComponent('სერიალი,ანიმაციური')}&limit=12&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndParse(`${baseUrl}?mov=&genre=${encodeURIComponent('ანიმაციური')}&limit=8&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndParse(`${baseUrl}?mov=&limit=8&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
  ]);

  return {
    ser: ser.articles,
    turk: turk.articles,
    anime: anime.articles,
    animation: animation.articles,
    movSlider: movSlider.articles,
  };
}

export default async function HomePage() {
  const data = await fetchMoviesData();
  return <App mov={data} />;
}
