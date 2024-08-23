import Image from "next/image";
import Link from "next/link";

export default function ContinueWatching({movData}) {
    

  return (
    <>
      <div className="contWatch">
        {movData &&
          movData.map((item) => {
            return (
              <>
                <div className="cont_item">
                  <div className="item__cover">
                    <Image
                      src={`/${item.poster}`}
                      alt={`${item.title_geo} / ${item.title_en} ქართულად`}
                      width={250}
                      height={150}
                    />

                    <Link
                      className="item__play"
                      href={`/detail/${item.detailLink}`}
                    >
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-player-play-filled"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#fff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path
                            d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
                            strokeWidth="0"
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
