import { useState, useEffect } from "react";
import Image from "next/image";

export default function ContinueWatching() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem("storedMovies");

    if (storedMovies) {
      const movieIds = storedMovies
        .replaceAll('"', "")
        .replace("[", "")
        .replace("]", "");

      fetch(
        `https://filmebi.in/api/movies?detailLink=${movieIds}&fields=title_geo,title_en,detailLink,poster`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.articles);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, []);

  console.log(movies);

  return (
    <>
      <div className="contWatch">
        {movies &&
          movies.map((item) => {
            return (
              <>
                <div className="cont_item">
                  <Image
                    src={`/${movies.poster}`}
                    alt={`${movies.title_geo} / ${movies.title_en} ქართულად`}
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
