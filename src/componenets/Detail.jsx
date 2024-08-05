import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link, useLocation } from "react-router-dom";
import { useMovies } from "./MoviesContext";
import { useAuth } from "./login/authcontext";

export default function Detail() {
  const { detailLink } = useParams();
  const { detailResults } = useMovies();
  const { user } = useAuth();
  const location = useLocation();

  const movies =
    location.state?.movies ||
    location.state?.ser ||
    location.state?.turk ||
    location.state?.anime ||
    location.state?.animation ||
    location.state?.detailResults;

  const selectedItem = movies
    ? movies.find((movie) => movie.detailLink === detailLink)
    : detailResults;

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  useEffect(() => {
    if (selectedItem) {
      // Update the view count
      fetch(
        "https://filmebi.in/CePaSYceBolveNtlegUremPlOULEAu/update_view_count.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            id: selectedItem.id,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            console.error("Error updating view count:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedItem]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState(selectedItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://filmebi.in/CePaSYceBolveNtlegUremPlOULEAu/JKHBAsdbaKLBASDMEoD.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedMovie),
      }
    );

    if (response.ok) {
      const updatedMovie = await response.json();
      setEditedMovie(updatedMovie);
      setIsEditing(false);
    } else {
      console.error("Failed to update movie");
    }
  };

  const [count, setCount] = useState(
    selectedItem.movieScriptContent_script.length > 10 ? 10 : 0
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [filteredScript, setFilteredScript] = useState({});

  useEffect(() => {
    if (selectedItem.movieScriptContent_script) {
      try {
        const sanitizedScript = selectedItem.movieScriptContent_script
          .replace(/\\/g, "")
          .replaceAll('""}', '"}')
          .replaceAll('"{"', '[{"')
          .replaceAll('}"', "}]");

        const parsedScript = JSON.parse(sanitizedScript);

        setFilteredScript(parsedScript);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        setFilteredScript([
          {
            1: [
              {
                title: "null",
                url: "../assets/img/404 - mov.webp",
              },
            ],
          },
        ]);
      }
    }
  }, [selectedItem]);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState("");

  useEffect(() => {
    if (filteredScript[selectedSeason]) {
      setSelectedEpisode(filteredScript[selectedSeason][0].url);
    }
  }, [filteredScript, selectedSeason]);

  const handleSeasonChange = (e) => {
    const newSeason = e.target.value;
    setSelectedSeason(newSeason);
    setSelectedEpisode(filteredScript[0][newSeason][0].url);
  };

  const handleEpisodeChange = (e) => {
    setSelectedEpisode(e.target.value);
  };

  const filtrk = filteredScript[0];
  let seasons;
  if (filteredScript[0]) {
    seasons = Object.keys(filtrk);
  } else {
    seasons = Object.keys(filteredScript);
  }

  function getRatingClassName(rating) {
    if (Number(rating) < 6) return "red";
    if (Number(rating) < 7) return "yellow";
    if (Number(rating) >= 7) return "green";
    return "";
  }

  return (
    <>
      <Helmet>
        <meta name="description" content={selectedItem.story} />
        <meta
          name="keywords"
          content={`${selectedItem.title_geo}, ${selectedItem.title_en}<`}
        />

        <meta property="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content={`${selectedItem.title_geo} | ${selectedItem.title_en} | ${selectedItem.country}`}
        />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:description" content={selectedItem.story} />
        <meta property="og:type" content="article" />
        <meta
          property="og:site_name"
          content="Filmebi.in | filmebi qartulad | serialebi qartulad"
        />
        <meta
          property="og:title"
          content={`${selectedItem.title_geo} | ${selectedItem.title_en} | ${selectedItem.country}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:description" content={selectedItem.story} />
        <meta property="og:image" content={selectedItem.poster} />
        <meta property="fb:app_id" content="5369417443166292" />

        <div id="fb-root"></div>
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0&appId=419473549161355"
          nonce="H1hc4ujB"
        ></script>
      </Helmet>

      <div
        className="fullbg"
        style={{ backgroundImage: `url(/mov/${selectedItem.poster})` }}
      ></div>
      <div className="fullbg-pattern" style={{ height: "80%" }}></div>
      <div className="detail-container">
        <section className="section section--details" style={{ marginTop: 0 }}>
          <div className="content__head content__head--mt">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <ul
                    className="nav nav-tabs content__tabs"
                    id="content__tabs"
                    role="tablist"
                  >
                    {selectedItem.movieScriptContent_script.length > 10 ? (
                      <li className="nav-item" role="presentation">
                        <button
                          id={`0-tab`}
                          className={`${count === 10 ? "active" : "activei"}`}
                          data-bs-toggle="tab"
                          data-bs-target={`#tab-${10}`}
                          type="button"
                          role="tab"
                          aria-controls={`tab-${10}`}
                          aria-selected="true"
                          onClick={() => setCount(10)}
                        >
                          {"სერიალი"}
                        </button>
                      </li>
                    ) : (
                      console.error()
                    )}
                    {!selectedItem.movieScriptContent_serial.includes(
                      "movie_box_new"
                    )
                      ? selectedItem.movieScriptContent_serial
                          .replace(/\n/g, "")
                          .split("</div>")
                          .filter((item) => item.trim() !== "")
                          .map((item, index) => {
                            let buttonText = `ფლეიერი ${index + 1}`;
                            const isLastIndex =
                              index ===
                              selectedItem.movieScriptContent_serial
                                .replace(/\n/g, "")
                                .split("</div>")
                                .filter((item) => item.trim() !== "").length -
                                1;
                            const isSecondToLastIndex =
                              index ===
                              selectedItem.movieScriptContent_serial
                                .replace(/\n/g, "")
                                .split("</div>")
                                .filter((item) => item.trim() !== "").length -
                                2;

                            if (
                              selectedItem.country.includes("ინგლისურად") &&
                              selectedItem.country.includes("რუსულად")
                            ) {
                              if (isLastIndex) {
                                buttonText = "რუსულად";
                              } else if (isSecondToLastIndex) {
                                buttonText = "ინგლისურად";
                              }
                            } else if (
                              selectedItem.country.includes("ინგლისურად") &&
                              isLastIndex
                            ) {
                              buttonText = "ინგლისურად";
                            } else if (
                              selectedItem.country.includes("რუსულად") &&
                              isLastIndex
                            ) {
                              buttonText = "რუსულად";
                            }

                            return (
                              <li
                                className="nav-item"
                                role="presentation"
                                key={index}
                              >
                                <button
                                  id={`${index}-tab`}
                                  className={`${
                                    count === index ? "active" : "activei"
                                  }`}
                                  data-bs-toggle="tab"
                                  data-bs-target={`#tab-${index}`}
                                  type="button"
                                  role="tab"
                                  aria-controls={`tab-${index}`}
                                  aria-selected="true"
                                  onClick={() => setCount(index)}
                                >
                                  {buttonText}
                                </button>
                              </li>
                            );
                          })
                      : console.error()}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <div className="tab-content">
                  {!selectedItem.movieScriptContent_serial.includes(
                    "movie_box_new"
                  ) && selectedItem.genre.split(", ").includes("სერიალი") ? (
                    selectedItem.movieScriptContent_serial
                      .replace(/\n/g, "")
                      .split("</div>")
                      .filter((item) => item.trim() !== "")
                      .map((item, index) => (
                        <div
                          className={`tab-pane fade ${
                            count === index ||
                            !selectedItem.movieScriptContent_script
                              ? "show active"
                              : ""
                          }`}
                          id={`tab-${index}`}
                          role="tabpanel"
                          aria-labelledby={`${index}-tab`}
                          tabIndex="1"
                        >
                          <div className="row">
                            <div className="col-12">
                              {loading ? (
                                <span className="loader"></span>
                              ) : (
                                <>
                                  {
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item,
                                      }}
                                    />
                                  }
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <>
                      {
                        <>
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: selectedItem.movieScriptContent_serial
                                  .replace(/\n/g, "")
                                  .replaceAll(
                                    'class="player-container"',
                                    'class="player-container" style="display: none"'
                                  ),
                              }}
                            />
                          }
                        </>
                      }
                    </>
                  )}
                  {selectedItem.movieScriptContent_script.length > 10 ? (
                    <div
                      className={`tab-pane fade ${
                        count === 10 ? "show active" : ""
                      }`}
                      id={`tab-${10}`}
                      role="tabpanel"
                      aria-labelledby={`${10}-tab`}
                      tabIndex="0"
                    >
                      <div className="row">
                        <div className="col-12" id="playerContainerforserial">
                          {loading ? (
                            <span className="loader"></span>
                          ) : (
                            <>
                              <select
                                id="serialSelect"
                                value={selectedSeason}
                                onChange={handleSeasonChange}
                              >
                                {seasons.map((season) => (
                                  <option key={season} value={season}>
                                    სეზონი {season}
                                  </option>
                                ))}
                              </select>
                              {selectedSeason && (
                                <>
                                  <select
                                    id="serialSelect"
                                    value={selectedEpisode}
                                    onChange={handleEpisodeChange}
                                  >
                                    {filteredScript[0]
                                      ? filteredScript[0][selectedSeason].map(
                                          (opt, index) => (
                                            <option
                                              key={index}
                                              value={
                                                opt.url
                                                  ? opt.url
                                                  : opt.languages[0].sources[0]
                                                      .file
                                              }
                                            >
                                              {opt.title
                                                .replaceAll("სერია", "სერია ")
                                                .replaceAll(
                                                  "ფლეიერი",
                                                  "ფლეიერი "
                                                )}
                                            </option>
                                          )
                                        )
                                      : filteredScript[selectedSeason].map(
                                          (opt, index) => (
                                            <option
                                              key={index}
                                              value={
                                                opt.url
                                                  ? opt.url
                                                  : opt.languages[0].sources[0]
                                                      .file
                                              }
                                            >
                                              {opt.title
                                                .replaceAll("სერია", "სერია ")
                                                .replaceAll(
                                                  "ფლეიერი",
                                                  "ფლეიერი "
                                                )}
                                            </option>
                                          )
                                        )}
                                  </select>
                                  {!selectedEpisode.includes("mp4") ? (
                                    <>
                                      <iframe
                                        src={
                                          selectedEpisode == ""
                                            ? filteredScript[0]["1"][0].url
                                            : selectedEpisode
                                        }
                                        frameBorder="0"
                                        width={"100%"}
                                        height={"519px"}
                                        scrolling="no"
                                        webkitallowfullscreen=""
                                        mozallowfullscreen=""
                                        allowFullScreen=""
                                      ></iframe>
                                    </>
                                  ) : (
                                    <>
                                      <video
                                        width={"100%"}
                                        height={"519px"}
                                        src={
                                          selectedEpisode == ""
                                            ? filteredScript["1"][0]
                                                .languages[0].sources[0].file
                                            : selectedEpisode
                                        }
                                        disableRemotePlayback=""
                                        webkit-playsinline=""
                                        playsInline=""
                                        controls
                                      ></video>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    console.error()
                  )}
                  {selectedItem.movieScriptContent_serial &&
                  !selectedItem.genre.split(", ").includes("სერიალი")
                    ? selectedItem.movieScriptContent_serial
                        .replace(/\n/g, "")
                        .split("</div>")
                        .filter((item) => item.trim() !== "")
                        .map((item, index) => (
                          <div
                            key={index}
                            className={`tab-pane fade ${
                              count === index ||
                              (count === index &&
                                !selectedItem.movieScriptContent_script)
                                ? "show active"
                                : ""
                            }`}
                            id={`tab-${index}`}
                            role="tabpanel"
                            aria-labelledby={`${index}-tab`}
                            tabIndex="0"
                          >
                            <div className="row">
                              <div className="col-12">
                                {loading ? (
                                  <span className="loader"></span>
                                ) : (
                                  <div
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                    : console.error()}
                </div>
              </div>
            </div>
          </div>

          <div className="container" style={{ marginTop: 50 }}>
            <div className="row">
              <div className="col-12">
                <h1 className="section__title section__title--head fulltitle">
                  <div className="titlegeoeng">
                    <span style={{ fontSize: 25 }}>
                      {selectedItem.title_geo}
                    </span>
                    <span style={{ fontSize: 18, opacity: 0.5 }}>
                      {selectedItem.title_en}
                    </span>
                  </div>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-eye"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff9e"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                    {selectedItem.view_count}
                  </p>
                </h1>

                <div>
                  {user && (
                    <button onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                  )}
                  {isEditing ? (
                    <>
                      <form className="editbox" onSubmit={handleEdit}>
                        <div>
                          <button
                            onClick={() => setIsEditing(false)}
                            style={{ opacity: 0.7 }}
                          >
                            close
                          </button>
                          <button type="submit">Save</button>
                        </div>
                        <label>
                          Movie Script Content (Serial):
                          <textarea
                            name="movieScriptContent_serial"
                            value={editedMovie.movieScriptContent_serial}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Movie Script Content (Script):
                          <textarea
                            name="movieScriptContent_script"
                            value={editedMovie.movieScriptContent_script}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Detail Link:
                          <input
                            type="text"
                            name="detailLink"
                            value={editedMovie.detailLink}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Poster:
                          <input
                            type="text"
                            name="poster"
                            value={editedMovie.poster}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Title (Geo):
                          <input
                            type="text"
                            name="title_geo"
                            value={editedMovie.title_geo}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Title (En):
                          <input
                            type="text"
                            name="title_en"
                            value={editedMovie.title_en}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Year:
                          <input
                            type="text"
                            name="year"
                            value={editedMovie.year}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Genre:
                          <input
                            name="genre"
                            value={editedMovie.genre}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Country:
                          <input
                            name="country"
                            value={editedMovie.country}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Director:
                          <input
                            name="director"
                            value={editedMovie.director}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Actors:
                          <input
                            name="actors"
                            value={editedMovie.actors}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Story:
                          <textarea
                            name="story"
                            value={editedMovie.story}
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          IMDb:
                          <input
                            type="text"
                            name="imdb"
                            value={editedMovie.imdb}
                            onChange={handleChange}
                          />
                        </label>
                      </form>
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="item item--details">
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                      <div className="item__cover">
                        <img
                          src={`/mov/${selectedItem.poster}`}
                          alt={`${selectedItem.title_geo} / ${selectedItem.title_en} ქართულად`}
                        />
                        <span
                          className={`item__rate item__rate--${getRatingClassName(
                            selectedItem.imdb
                          )}`}
                        >
                          {selectedItem.imdb}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-lg-8 col-xl-6 col-xxl-7">
                      <div className="item__content">
                        <ul className="item__meta">
                          <li>
                            <span>წელი:</span>{" "}
                            <Link
                              to={`/movies?year_from=${selectedItem.year}&year_to=${selectedItem.year}`}
                            >
                              {selectedItem.year}
                            </Link>
                          </li>
                          <li>
                            <span>ჟანრი:</span>
                            {selectedItem.genre
                              .split(", ")
                              .map((item, index) => (
                                <Link key={index} to={`/movies?genre=${item}`}>
                                  {item}
                                </Link>
                              ))}
                          </li>
                          <li>
                            <span>თარგმანი:</span>{" "}
                            {selectedItem.country
                              .split(", ")
                              .map((item, index) => (
                                <Link
                                  key={index}
                                  to={`/movies?country=${item}`}
                                >
                                  {item}
                                </Link>
                              ))}
                          </li>
                          <li>
                            <span>რეჟისორი:</span>{" "}
                            {selectedItem.director
                              .split(", ")
                              .map((item, index) => (
                                <Link
                                  key={index}
                                  to={`/movies?director=${item}`}
                                >
                                  {item}
                                </Link>
                              ))}
                          </li>
                          <li>
                            <span>მსახიობები:</span>{" "}
                            {selectedItem.actors
                              .split(", ")
                              .map((item, index) => (
                                <Link key={index} to={`/movies?actors=${item}`}>
                                  {item}
                                </Link>
                              ))}
                          </li>
                        </ul>
                        <div className="item__description">
                          <p>{selectedItem.story}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="content__head content__head--mt">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <ul
                    className="nav nav-tabs content__tabs"
                    id="content__tabs"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button className="active">კომენტარები</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tab-content">
                  <div className="tab-pane fade active show">
                    <div className="row">
                      <div className="col-12">
                        <div className="comments">
                          <div
                            className="fb-comments"
                            data-href={window.location.href}
                            data-width="100%"
                            data-numposts="5"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
