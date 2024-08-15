"use client";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Link from "next/link";
import { ArrowL, PlayIcon } from "../icons/icons";
import Image from "next/image";
import tv_01 from "../../assets/img/tv/tv-01.png";
import tv_02 from "../../assets/img/tv/tv-02.png";
import tv_03 from "../../assets/img/tv/tv-03.png";
import tv_04 from "../../assets/img/tv/tv-04.png";
import tv_05 from "../../assets/img/tv/tv-05.png";
import tv_06 from "../../assets/img/tv/tv-06.png";
import tv_07 from "../../assets/img/tv/tv-07.png";
import tv_08 from "../../assets/img/tv/tv-08.png";
import tv_09 from "../../assets/img/tv/tv-09.png";

function getRatingclassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}

export default function Slider({ title, per, rendered, boo }) {
  return (
    <Splide
      hasTrack={false}
      className="home__carousel splide splide--home"
      aria-label={title}
      options={{
        perPage: per,
        rewind: true,
        gap: "24px",
        pagination: false,
        breakpoints: {
          1200: {
            perPage: 4,
          },
          992: {
            perPage: 3,
          },
          576: {
            perPage: 2,
          },
        },
      }}
    >
      <div className="splide__arrows">
        <button
          title="arrow"
          className="splide__arrow splide__arrow--prev"
          type="button"
        >
          <ArrowL color="#fff" height={18} width={18} boo={false} />
        </button>
        <button
          title="arrow"
          className="splide__arrow splide__arrow--next"
          type="button"
        >
          <ArrowL color="#fff" height={18} width={18} boo={true} />
        </button>
      </div>
      <SplideTrack>
        {rendered &&
          rendered
            .filter((i) => (boo ? !i.genre.includes("სერიალი") : i))
            .map((item) => {
              return (
                <SplideSlide key={item.detailLink}>
                  {" "}
                  {/* Add key prop here */}
                  <div className="item item--hero">
                    <div className="item__cover">
                      <Image
                        width={0}
                        height={0}
                        sizes="100%"
                        src={`/${item.poster}`}
                        alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                      />

                      <Link
                        key={item.detailLink} // key here is redundant because it's already provided on SplideSlide
                        href={`/detail/${item.detailLink}`}
                        className="item__play"
                      >
                        <PlayIcon />
                      </Link>
                      <span
                        className={`item__rate item__rate--${getRatingclassName(
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
                </SplideSlide>
              );
            })}
      </SplideTrack>
    </Splide>
  );
}

export function GridMov({ rendered }) {
  return (
    <>
      {rendered &&
        rendered.map((item) => (
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
                  className={`item__rate item__rate--${getRatingclassName(
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
  );
}

export function TvCarousel() {
  return (
    <>
      <Splide
        hasTrack={false}
        aria-label="ტელევიზია"
        className="section__carousel splide splide--content"
        options={{
          perPage: 6,
          rewind: true,
          gap: "24px",
          pagination: false,
          breakpoints: {
            1200: {
              perPage: 4,
            },
            992: {
              perPage: 3,
            },
            576: {
              perPage: 2,
            },
          },
        }}
      >
        <div className="splide__arrows">
          <button
            title="arrow"
            className="splide__arrow splide__arrow--prev"
            type="button"
          >
            <ArrowL color="#fff" height={18} width={18} boo={false} />
          </button>
          <button
            title="arrow"
            className="splide__arrow splide__arrow--next"
            type="button"
          >
            <ArrowL color="#fff" height={18} width={18} boo={true} />
          </button>
        </div>

        <SplideTrack>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_01}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_02}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_03}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_04}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_05}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_06}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_07}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_08}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="item item--hero" id="tvcorrect">
              <div className="item__cover" id="tv_id">
                {" "}
                <Link href="/tv">
                  <Image
                    width={40}
                    height={40}
                    src={tv_09}
                    alt="ტელევიზია"
                    style={{ minHeight: "40px", maxHeight: 40 }}
                  />
                </Link>
              </div>
            </div>
          </SplideSlide>
        </SplideTrack>
      </Splide>
    </>
  );
}
