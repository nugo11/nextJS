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

async function fetchMoviesData(param) {
  const baseUrl = "http://filmebi.in/api/movies";
  const movies = await fetchAndParse(`${baseUrl}?detailLink=${param}`);
  return {
    movies: movies.articles,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await fetchMoviesData(slug);

  if (data.movies.length === 0) {
    return {
      title: "Movie Not Found",
      description: "Details for the requested movie are not available.",
    };
  }

  const movie = data.movies[0];
  
  return {
    title: `${movie.title_geo} / ${movie.title_en} ქართულად - Filmebi.in`,
    description: movie.story,
    keywords:
    `${movie.title_geo}, ${movie.title_en}, ფილმები, სერიალები, ქართულად, თრეილერები, მსახიობები, ონლაინ, ყურება, უფასოდ, თურქული, უახლესი, Filmebi.in, ფილმები.ინ, filmebi, pilmebi, serialebi, qartulad, kartulad, online, treilerebi, msaxiobebi, yureba, ufasod, turquli, uaxlesi, Filmebi.in, filmebi.in`,
    openGraph: {
      title:
      `${movie.title_geo} / ${movie.title_en} ქართულად - Filmebi.in`,
      description: movie.story,
      images: [
        {
          url: `http://filmebi.in/${movie.poster}`,
          secure_url: `https://filmebi.in/${movie.poster}`,
          alt: `${movie.title_geo} / ${movie.title_en} ქართულად`,
          type: 'image/webp',
        },
      ],
      url: `https://Filmebi.in/detail/${movie.detailLink}`,
    }
  };
}

export default async function MovieDetailPage({ params }) {
  const data = await fetchMoviesData(params.slug);

  return <Detail mov={data} getParam={params.slug} />;
}
