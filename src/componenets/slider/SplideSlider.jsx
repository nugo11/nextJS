import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ArrowL, PlayIcon } from "../icons/icons";

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
            .filter((i) => boo ? !i.genre.includes("სერიალი") : i)
            .map((item) => {
              return (
                <>
                  <SplideSlide>
                    <div className="item item--hero">
                      <div className="item__cover">
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
                  </SplideSlide>
                </>
              );
            })}
      </SplideTrack>
    </Splide>
  );
}
