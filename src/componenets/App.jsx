"use client"
import { useState } from "react";
import Link from "next/link";
import SplideSlider, { GridMov, TvCarousel } from "./slider/SplideSlider";
import Pattern from '../assets/img/bg_pattern.png'
import bg from '../assets/img/home-bg.webp'
import animationBg from '../assets/img/animation-bg.webp'


function App({mov}) {
  const [tab, setTab] = useState("tab-1");

  const handleTabClick = (tabId) => {
    setTab(tabId);
  };

  return (
    <>
      <div className="fullbg-pattern" style={{backgroundImage: `url(${Pattern.src})`}}></div>
      <section className="home" id="mineslider" style={{backgroundImage: `url(${bg.src})`}}>
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
              <SplideSlider title="ფილმები ქართულად" per={6}  rendered={mov.movSlider} boo={true}/>
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
                  <Link href="/movies?ser">
                    <b>
                      <span style={{ color: "#f9ab00" }}>სერ</span>იალები
                    </b>{" "}
                    ქართულად
                  </Link>
                </h2>
                <Link
                  href="/movies?ser"
                  className="section__view section__view--carousel"
                >
                  ყველას ნახვა
                </Link>
              </div>
            </div>
            {/*  end section title  */}

            {/*  carousel  */}
            <div className="col-12">
            <SplideSlider title="სერიალები ქართულად" per={6}  rendered={mov.ser} boo={false}/>
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
                        className={tab === "tab-1" ? "active" : ""}
                        onClick={() => handleTabClick("tab-1")}
                      >
                        თურქული სერიალები
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="2-tab"
                        className={tab === "tab-2" ? "active" : ""}
                        onClick={() => handleTabClick("tab-2")}
                      >
                        ანიმეები
                      </button>
                    </li>
                  </ul>
                  <ul className="viewallul">
                  <Link
                      href={
                        tab === "tab-1"
                          ? "http://localhost:3000/movies?genre=თურქული+სერიალები"
                          : "/movies?genre=სერიალი%2Cანიმაციური"
                      }
                    >
                      ყველას ნახვა
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="tab-content">
            <div
             className={`tab-pane fade ${
              tab === "tab-1" ? "show active" : ""
            }`}
              id="tab-1"
              role="tabpanel"
              aria-labelledby="1-tab"
              tabIndex="0"
            >
              <div className="row">
                <GridMov rendered={mov.turk} />
              </div>
            </div>
            <div
            className={`tab-pane fade ${
              tab === "tab-2" ? "show active" : ""
            }`}
              id="tab-2"
              role="tabpanel"
              aria-labelledby="2-tab"
              tabIndex="0"
            >
              <div className="row">
              <GridMov rendered={mov.anime} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--border" id="sabavshvobg" style={{backgroundImage: `url(${animationBg.src})`}}>
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
            <SplideSlider title="ანიმაციური ქართულად" per={6}  rendered={mov.animation} boo={false}/>

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
             <TvCarousel />
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
