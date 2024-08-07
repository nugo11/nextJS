'use client'

import Link from "next/link";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ArrowL, PlayIcon } from "./icons/icons";

function getRatingclassName(rating) {
  if (Number(rating) < 6) return "red";
  if (Number(rating) < 7) return "yellow";
  if (Number(rating) >= 7) return "green";
  return "";
}

function App({ ser, turk, anime, animation, movSlider }) {
  const handleTabClick = (tabId) => {
    setTab(tabId);
  };

  return (
    <>
      <div className="fullbg-pattern"></div>
      <section className="home" id="mineslider">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="home__title">
                <Link href="/movies?mov">
                  <b>
                    <span style={{ color: "#f9ab00" }}>ფილ</span>მები
                  </b>{" "}
                  ქართულად
                </Link>
              </h1>
            </div>

            <div className="col-12">
              <SplideSlide title="ფილმები ქართულად" per={6}  rendered='movSlide' boo={true}/>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--border">
        <div className="container">
          <div className="row">
            {/*  section title  */}
            <div className="col-12">
              <div className="section__title-wrap">
                <h2 className="section__title" style={{ fontSize: 28 }}>
                  <Link href="/serial?ser">
                    <b>
                      <span style={{ color: "#f9ab00" }}>სერ</span>იალები
                    </b>{" "}
                    ქართულად
                  </Link>
                </h2>
                <Link
                  href="/serial?ser"
                  className="section__view section__view--carousel"
                >
                  ყველას ნახვა
                </Link>
              </div>
            </div>
            {/*  end section title  */}

            {/*  carousel  */}
            <div className="col-12">
              <Splide
                hasTrack={false}
                className="section__carousel splide splide--content"
                aria-label="სერიალები ქართულად"
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
                  {ser
                    .map((item) => {
                      return (
                        <>
                          <li
                            className="splide__slide"
                            key={`${item.detailLink}${item.imdb}`}
                          >
                            <div className="item item--hero">
                              <div className="item__cover">
                                {" "}
                                <img
                                  src={`/mov/${item.poster}`}
                                  alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                  loading="lazy"
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
                                        color: item.country.includes(
                                          "ინგლისურად"
                                        )
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
                          </li>
                        </>
                      );
                    })}
                </SplideTrack>
              </Splide>
            </div>
            {/*  end carousel  */}
          </div>
        </div>
      </section>

      {/* content */}
      <section className="content">
        <div className="content__head">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="content__title">
                  <b>
                    <span style={{ color: "#f9ab00" }}>ახა</span>ლი
                  </b>{" "}
                  დამატებული
                </h2>
                <div className="combineul">
                  <ul
                    className="nav nav-tabs content__tabs"
                    id="content__tabs"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        id="1-tab"
                        onClick={() => handleTabClick("tab-1")}
                      >
                        თურქული სერიალები
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="2-tab"
                        onClick={() => handleTabClick("tab-2")}
                      >
                        ანიმეები
                      </button>
                    </li>
                  </ul>
                  <ul className="viewallul">
                    <Link href={"#"}>ყველას ნახვა</Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="tab-content">
            <div
              id="tab-1"
              role="tabpanel"
              aria-labelledby="1-tab"
              tabIndex="0"
            >
              <div className="row">
                {turk.map((item) => (
                  <div
                    key={item.detailLink}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    <div className="item">
                      <div className="item__cover">
                        {" "}
                        <img
                          src={`/mov/${item.poster}`}
                          alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                          loading="lazy"
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
              </div>
            </div>
            <div
              id="tab-2"
              role="tabpanel"
              aria-labelledby="2-tab"
              tabIndex="0"
            >
              <div className="row">
                {anime.map((item) => (
                  <div
                    key={item.detailLink}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                  >
                    <div className="item">
                      <div className="item__cover">
                        {" "}
                        <img
                          src={`/mov/${item.poster}`}
                          alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                          loading="lazy"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--border" id="sabavshvobg">
        <div className="container">
          <div className="row">
            {/*  section title  */}
            <div className="col-12">
              <div className="section__title-wrap">
                <h2 className="section__title" style={{ background: "none" }}>
                  <Link href="/movies?genre=ანიმაციური">
                    <span style={{ color: "#f9ab00", fontWeight: "bolder" }}>
                      საბ
                    </span>
                    ავშვო
                  </Link>
                </h2>
                <Link
                  className="section__view section__view--carousel"
                  href="/movies?genre=ანიმაციური"
                >
                  ყველას ნახვა
                </Link>
              </div>
            </div>
            {/*  end section title  */}

            {/*  carousel  */}
            <div className="col-12">
              <Splide
                hasTrack={false}
                aria-label="ანიმაციური ფილმები ქართულად"
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
                  {animation
                    .filter((io) => !io.genre.includes("სერიალი"))
                    .map((item) => {
                      return (
                        <>
                          <li
                            className="splide__slide"
                            key={`${item.detailLink}${item.imdb}`}
                          >
                            <div className="item item--hero">
                              <div className="item__cover">
                                {" "}
                                <img
                                  src={`/mov/${item.poster}`}
                                  alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                                  loading="lazy"
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
                                        color: item.country.includes(
                                          "ინგლისურად"
                                        )
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
                          </li>
                        </>
                      );
                    })}
                </SplideTrack>
              </Splide>
            </div>
            {/*  end carousel  */}
          </div>
        </div>
      </section>

      <section className="section section--border">
        <div className="container">
          <div className="row">
            {/*  section title  */}
            <div className="col-12">
              <div className="section__title-wrap">
                <h2 className="section__title">
                  <span style={{ color: "#f9ab00", fontWeight: "bolder" }}>
                    ტელ
                  </span>
                  ევიზია
                </h2>
              </div>
            </div>
            {/*  end section title  */}

            {/*  carousel  */}
            <div className="col-12">
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
                          <img
                            src="/assets/img/tv/tv-01.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-02.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-03.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-04.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-05.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-06.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-07.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-08.png"
                            alt="ტელევიზია"
                            loading="lazy"
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
                          <img
                            src="/assets/img/tv/tv-09.png"
                            alt="ტელევიზია"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                </SplideTrack>
              </Splide>
            </div>
            {/*  end carousel  */}
          </div>
        </div>
      </section>
      {/* end content */}
    </>
  );
}

export default App;
