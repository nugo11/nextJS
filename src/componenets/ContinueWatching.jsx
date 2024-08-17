import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
          const reversedMovies = data.articles.reverse();
          setMovies(reversedMovies);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, []);


  
  return (
    <>
      <div className="contWatch">
        {movies &&
          movies.map((item) => {
            return (
              <>
                <div className="cont_item">
                  <div class="item__cover">
                    <Image
                      src={`${item.poster}`}
                      alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                      width={250}
                      height={150}
                    />

                    <Link
                      class="item__play"
                      href={`/detail/${item.detailLink}`}
                    >
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-player-play-filled"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#fff"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path
                            d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
                            stroke-width="0"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </i>
                    </Link>
                  </div>
                  <div className="savedTitle">
                  <h3 className="item__title">
                        <Link href={`/detail/${item.detailLink}`}>
                          {item.title_geo}
                        </Link>
                      </h3>
                      <span className="item__category">
                        <Link href={`/detail/${item.detailLink}`}>
                          {item.title_en}
                        </Link>
                      </span>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
