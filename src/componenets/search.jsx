import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img404 from "../assets/img/404 - mov.webp";
import { useMovies } from "./MoviesContext";
import { Helmet } from "react-helmet";
import { PlayIcon } from "./icons/icons";

export default function Search() {
  const { searchResults } = useMovies();
  const [show404, setShow404] = useState(false);

  let moviesarr = [];
  searchResults == null ? '' : moviesarr = searchResults;
  
  useEffect(() => {
    setTimeout(() => {
        setShow404(true);
      }, 1000);
}, []);



  function getRatingClassName(rating) {
    if (Number(rating) < 6) return "red";
    if (Number(rating) < 7) return "yellow";
    if (Number(rating) >= 7) return "green";
    return "";
  }

  return (
    <>
     <Helmet>
        <meta name="robots" content="index,follow,all" />
        <base href={window.location.href} />
        <meta name="application-name" content="FILMEBI.IN" />
        <meta
          name="title"
          content="Filmebi.in - ფილმები ქართულად | Filmebi Qartulad | სერიალები ქართულად | Serialebi Qartulad"
        />
        <meta
          name="description"
          content="filmebi.in - ახალი ფილმები და სერიალები ქართულად უფასოდ, უახლესი თურქული სერიალები ქართულად, axali filmebi da serialebi qartulad ufasod, pilmebi qartulad online, uaxlesi turquli serialebi qartulad"
        />
        <meta
          name="keywords"
          content="ფილმები, სერიალები, ქართულად, თრეილერები, მსახიობები, ონლაინ, ყურება, უფასოდ, თურქული, უახლესი, Filmebi.in, მუვიჯი, filmebi, pilmebi, serialebi, qartulad, kartulad, online, treilerebi, msaxiobebi, yureba, ufasod, turquli, uaxlesi, Filmebi.in, gemovie, jimuvi, movie.ge, moviege, muviji, gemovies, imovie.ge"
        />
        <meta
          property="og:title"
          content="ფილმები ქართულად | Filmebi Qartulad | სერიალები ქართულად | Serialebi Qartulad - Filmebi.in"
        />
        <meta
          property="og:description"
          content="Filmebi.in - ახალი ფილმები და სერიალები ქართულად უფასოდ, უახლესი თურქული სერიალები ქართულად, axali filmebi da serialebi qartulad ufasod, pilmebi qartulad online, uaxlesi turquli serialebi qartulad"
        />
        <meta property="og:image" content="/assets/img/cover.webp" />
        <meta property="og:url" content="https://Filmebi.in/" />
      </Helmet>
      {/* page title */}
      <section className="section section--first" style={{ marginTop: 80 }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                {/* section title */}
                <h1 className="section__title section__title--head">ძებნა</h1>
                {/* end section title */}

                {/* breadcrumbs */}
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <a href="/">მთავარი</a>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__item--active">
                    ძებნა
                  </li>
                </ul>
                {/* end breadcrumbs */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end page title */}

      {/* catalog */}
      <div className="section section--catalog">
        <div className="container">
          <div className="row">
            {/* item */}
            {moviesarr.length >= 1 ? (
              <>
                {searchResults
                  .map((item) => (
                    <div
                      key={item.detailLink}
                      className="col-6 col-sm-4 col-lg-3 col-xl-2"
                    >
                      <div className="item">
                        <div className="item__cover">
                          <img
                            src={`/mov/${item.poster}`}
                            alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                          />
                          <Link
                            key={item.detailLink}
                            to={`/detail/${item.detailLink}`}
                            state={{ searchResults }}
                            className="item__play"
                          >
                            <PlayIcon />
                          </Link>
                          <span
                            className={`item__rate item__rate--${getRatingClassName(
                              item.imdb
                            )}`}
                          >
                            {item.imdb}
                          </span>
                          <div className="item__favorite" type="button">
                            HD
                          </div>
                          <div className="item__lang" type="button">
                          <ul>
                                      <li
                                        style={{
                                          color: item.country.includes('ქართულად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        GEO
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('ინგლისურად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        ENG
                                      </li>
                                      <li
                                        style={{
                                          color: item.country.includes('რუსულად')
                                            ? "white"
                                            : "gray",
                                        }}
                                      >
                                        RUS
                                      </li>
                                    </ul>
                          </div>
                        </div>
                        <div className="item__content">
                          <h3 className="item__title">
                            <Link
                              key={item.detailLink}
                              to={`/detail/${item.detailLink}`}
                              state={{ searchResults }}
                            >
                              {item.title_geo}
                            </Link>
                          </h3>
                          <span className="item__category">
                            <Link
                              key={item.detailLink}
                              to={`/detail/${item.detailLink}`}
                              state={{ searchResults }}
                            >
                              {item.title_en}
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div
                className="center404"
                style={{ display: show404 === true && "flex" }}
              >
                <div className="imgbg404">
                  <img src={img404} alt="404 error movie" />
                </div>
                <b style={{ fontSize: 40, color: "#f9ab00" }}>
                  ფილმი ვერ მოიძებნა
                </b>
              </div>
            )}
            {/* end item */}
          </div>
        </div>
      </div>
      {/* end catalog */}
    </>
  );
}
