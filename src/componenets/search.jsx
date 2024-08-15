"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import img404 from "../assets/img/404 - mov.webp";
import { PlayIcon } from "./icons/icons";
import Image from "next/image";

export default function Search({ mov }) {
  const [show404, setShow404] = useState(false);

  const movies = mov.movies;

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
            {movies ? (
              <>
                {movies.map((item) => (
                  <div
                    key={item.detailLink}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    <div className="item">
                      <div className="item__cover">
                        <Image
                           width={0}
                           height={0}
                           sizes="100%"
                          src={`/${item.poster}`}
                          alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                        />
                        <Link
                          key={item.detailLink}
                          href={`/detail/${item.detailLink}`}
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
                          >
                            {item.title_geo}
                          </Link>
                        </h3>
                        <span className="item__category">
                          <Link
                            key={item.detailLink}
                            href={`/detail/${item.detailLink}`}
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
                  <Image
                    width={180}
                    height={180}
                    src={img404}
                    alt="404 error movie"
                  />
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
