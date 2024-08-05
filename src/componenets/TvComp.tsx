import React, { useEffect } from "react";

export default function TvComp() {

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      {/* page title */}
      <section className="section section--first" style={{ marginTop: 80 }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                {/* section title */}
                <h1 className="section__title section__title--head">
                  Live ტელევიზია
                </h1>
                {/* end section title */}

                {/* breadcrumbs */}
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <a href="/">მთავარი</a>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__item--active">
                    ტელევიზია
                  </li>
                </ul>
                {/* end breadcrumbs */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end page title */}
      <div className="section section--catalog">
        <div className="container">
          <div className="row">
            <div style={{ position: "relative", overflow: "hidden" }}>
              <iframe
                src="https://tv.mar.tv"
                frameBorder="0"
                height={500}
                width={"100%"}
                style={{ marginTop: -40 }}
                allowFullScreen
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
