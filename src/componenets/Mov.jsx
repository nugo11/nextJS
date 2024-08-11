"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import img404 from "../assets/img/404 - mov.webp";
import { ArrowL, PlayIcon } from "./icons/icons";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const options = [
  "კომედია",
  "სათავგადასავლო",
  "საშინელება",
  "ანიმაციური",
  "დრამა",
  "მძაფრ-სიუჟეტიანი",
  "საოჯახო",
  "ფანტასტიკა",
  "ტრილერი",
  "დეტექტივი",
  "კრიმინალური",
  "სპორტული",
  "ბოევიკი",
  "მელოდრამა",
  "რომანტიკული",
  "დოკუმენტური",
  "საომარი",
  "ისტორიული",
  "სერიალი",
  "რუსული",
  "ქართული ფილმები",
  "საახალწლო",
  "მოკლემეტრაჟიანი",
  "ფენტეზი",
  "მუსიკალური",
  "საბავშვო",
  "ვესტერნი",
  "ბიოგრაფიული",
  "მისტიკა",
];

function getRatingClassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}


export default function Mov({ mov }) {
  const searchParams = useSearchParams();

  const movies = mov.movies;
  const totalPages = mov.totalPages;
  const route = useRouter();

  const [filterValues, setFilterValues] = useState({
    country: "",
    year_from: 1921,
    year_to: 2026,
    imdb_from: 1.1,
    imdb_to: 9.9,
    genre: [],
  });

  const [show404, setShow404] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (movies.length === 0) {
      setShow404(true);
    } else {
      setShow404(false);
    }
  }, [movies]);

  const [year_from_state, setYearState] = useState(null);
  const [year_to_state, setYearToState] = useState(null);

  const [Imdb_from_state, setImdbState] = useState(null);
  const [Imdb_to_state, setImdbToState] = useState(null);

  const [FilterCountry, setFilterCountry] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getUrlParameter = (name) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    const genreParam = getUrlParameter("genre");

    if (genreParam) {
      const genres = genreParam
        .split(",")
        .filter((genre) => genre.trim() !== "");
      setSelectedOptions(genres);
    } else {
      setSelectedOptions([]);
    }

    const year_from_Param = getUrlParameter("year_from");

    if (year_from_Param) {
      setYearState(year_from_Param);
    } else {
      setYearState(1921);
    }

    const year_to_Param = getUrlParameter("year_to");

    if (year_to_Param) {
      setYearToState(year_to_Param);
    } else {
      setYearToState(2026);
    }

    const Imdb_from_Param = getUrlParameter("imdb_from");

    if (Imdb_from_Param) {
      setImdbState(Imdb_from_Param);
    } else {
      setImdbState(1.1);
    }

    const Imdb_to_Param = getUrlParameter("imdb_to");

    if (Imdb_to_Param) {
      setImdbToState(Imdb_to_Param);
    } else {
      setImdbToState(9.9);
    }

    const country = getUrlParameter("country");

    if (country) {
      setFilterCountry(country);
    } else {
      setFilterCountry("");
    }
  }, []);

  const handleFilterChange = (name, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    Object.keys(filterValues).forEach((key) => {
      if (key === "genre") {
        params.delete("genre");
        if (filterValues[key].length > 0) {
          params.set("genre", filterValues[key].join(","));
        }
      } else if (filterValues[key]) {
        params.set(key, filterValues[key]);
      } else {
        params.delete(key);
      }
    });
    params.delete("page");

    route.push(`?${params.toString()}`);
  };

  const scrollRef = useRef(null);

  const handleOptionClick = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);

    setFilterValues((prevValues) => ({
      ...prevValues,
      genre: newSelectedOptions,
    }));
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const currentPage = Number(searchParams.get("page")) || 1;

  const paginate = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    route.push(`?${params.toString()}`);
  };

  const renderPagination = () => {
    if (!movies) return null;

    const totalPage = totalPages;
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="paginator">
        {currentPage > 1 && (
          <li className="paginator__item paginator__item--prev">
            <a onClick={() => paginate(currentPage - 1)}>
              <ArrowL width={20} height={20} color="#fff" boo={false} />
            </a>
          </li>
        )}
        {pageNumbers.map((number) => {
          if (
            number === 1 ||
            number === totalPage ||
            (number >= currentPage - 2 && number <= currentPage + 2)
          ) {
            return (
              <li
                key={number}
                className={`paginator__item ${
                  currentPage === number ? "paginator__item--active" : ""
                }`}
              >
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            );
          } else if (number === 2 || number === totalPage - 1) {
            return (
              <li key={number} className="page-item">
                ...
              </li>
            );
          }
          return null;
        })}
        {currentPage < totalPage && (
          <li className="paginator__item paginator__item--next">
            <a onClick={() => paginate(currentPage + 1)}>
              <ArrowL width={20} height={20} color="#fff" boo={true} />
            </a>
          </li>
        )}
      </ul>
    );
  };

  return (
    <>
      {/* filter */}
      <div className="filter" style={{ marginTop: 100 }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="filter__content">
                <div className="horizontal-select">
                  <button
                    title="arrow"
                    className="arrow left-arrow"
                    onClick={scrollLeft}
                  >
                    <ArrowL color="#fff" height={20} width={20} boo={false} />
                  </button>
                  <div className="options" ref={scrollRef}>
                    {options.map((option) => (
                      <div
                        key={option}
                        className={`option ${
                          selectedOptions.includes(option) ? "selected" : ""
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <button
                    title="arrow"
                    className="arrow right-arrow"
                    onClick={scrollRight}
                  >
                    <ArrowL color="#fff" height={20} width={20} boo={true} />
                  </button>
                </div>

                <div className="filter_two">
                  <div className="filter_year">
                    <input
                      type="number"
                      placeholder={year_from_state}
                      onChange={(e) =>
                        handleFilterChange("year_from", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder={year_to_state}
                      onChange={(e) =>
                        handleFilterChange("year_to", e.target.value)
                      }
                    />
                  </div>
                  <div className="filter_imdb">
                    <input
                      type="number"
                      placeholder={Imdb_from_state}
                      onChange={(e) =>
                        handleFilterChange("imdb_from", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder={Imdb_to_state}
                      onChange={(e) =>
                        handleFilterChange("imdb_to", e.target.value)
                      }
                    />
                  </div>
                  <select
                    name="country"
                    id="lang"
                    value={filterValues.lang}
                    onChange={(e) =>
                      handleFilterChange(e.target.name, e.target.value)
                    }
                  >
                    <option
                      value=""
                      selected={FilterCountry === "" ? "selected" : ""}
                    >
                      გახმოვანება
                    </option>
                    <option
                      value="ქართულად"
                      selected={FilterCountry === "ქართულად" ? "selected" : ""}
                    >
                      ქართულად
                    </option>
                    <option
                      value="ინგლისურად"
                      selected={
                        FilterCountry === "ინგლისურად" ? "selected" : ""
                      }
                    >
                      ინგლისურად
                    </option>
                    <option
                      value="რუსულად"
                      selected={FilterCountry === "რუსულად" ? "selected" : ""}
                    >
                      რუსულად
                    </option>
                  </select>
                  <button id="fullSearch" onClick={applyFilters}>
                    მოძებნა
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end filter */}

      {/* catalog */}
      <div className="section section--catalog">
        <div className="container">
          <div className="row">
            {/* item */}
            {movies.length ? (
              <>
                {movies.map((item) => (
                  <div
                    key={item.detailLink}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    <div className="item">
                      <div className="item__cover">
                        <Image
                          src={`${item.poster}`}
                          alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                          width={180}
                          height={290}
                        />

                        <Link
                          key={item.detailLink}
                          href={`/detail/${item.detailLink}`}
                          state={{ movies }}
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
                                color: item.country.includes("ქართულად")
                                  ? "white"
                                  : "gray",
                              }}
                            >
                              GEO
                            </li>
                            <li
                              style={{
                                color: item.country.includes("ინგლისურად")
                                  ? "white"
                                  : "gray",
                              }}
                            >
                              ENG
                            </li>
                            <li
                              style={{
                                color: item.country.includes("რუსულად")
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
                            href={`/detail/${item.detailLink}`}
                            state={{ movies }}
                          >
                            {item.title_geo}
                          </Link>
                        </h3>
                        <span className="item__category">
                          <Link
                            key={item.detailLink}
                            href={`/detail/${item.detailLink}`}
                            state={{ movies }}
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
                  <Image src={img404} width={180} height={180} alt="404 error movie" />
                </div>
                <b style={{ fontSize: 40, color: "#f9ab00" }}>
                  ფილმი ვერ მოიძებნა
                </b>
              </div>
            )}
            {/* end item */}
          </div>

          <div className="row">
            {/* paginator */}
            <div className="col-12">{renderPagination()}</div>

            {/* end paginator */}
          </div>
        </div>
      </div>
      {/* end catalog */}
    </>
  );
}

export async function getStaticProps() {
  const response = await fetchMoviesData();
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}
