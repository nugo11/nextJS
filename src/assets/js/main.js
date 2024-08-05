export default function MineJS() {
  (function (window, document, undefined) {
    "use strict";

    /*==============================
    Header
    ==============================*/
    if (document.querySelector(".header")) {
      const headerBtn = document.querySelector(".header__btn");
      const headerNav = document.querySelector(".header__nav");
      const headerNavLink = document.getElementsByClassName("header__nav-link");
      const headerSrc = document.querySelector(".header__search");
      const headerSrcBtn = document.querySelector(".header__search-btn");
      const headerSrcCls = document.querySelector(".header__search-close");
      const headerSrcCls1 = document.querySelector(".header__search-button");

      function toggleHeaderMenu() {
        headerBtn.classList.toggle("header__btn--active");
        headerNav.classList.toggle("header__nav--active");

        /* z-index fix */
        if (document.querySelector(".filter--fixed")) {
          var filterFixed = document.querySelector(".filter--fixed");
          filterFixed.classList.toggle("filter--hidden");
        }
      }

      for (let i = 0; i < headerNavLink.length; i++) {
        headerNavLink[i].addEventListener("click", () => {
          headerNav.classList.toggle("header__nav--active");
        });
      }

      headerBtn.addEventListener("click", toggleHeaderMenu);

      function toggleSearch() {
        headerSrc.classList.toggle("header__search--active");
      }

      headerSrcBtn.addEventListener("click", toggleSearch);
      headerSrcCls.addEventListener("click", toggleSearch);
      headerSrcCls1.addEventListener("click", toggleSearch);
    }

    /*==============================
    Filter
    ==============================*/
    if (document.querySelector(".mfilter")) {
      var mfilterBtn = document.querySelector(".filter__menu");
      var mfilterClose = document.querySelector(".mfilter__close");
      var mfilter = document.querySelector(".mfilter");

      function toggleMfilter() {
        mfilter.classList.toggle("mfilter--active");
      }

      mfilterBtn.addEventListener("click", toggleMfilter);
      mfilterClose.addEventListener("click", toggleMfilter);
    }

    /* z-index fix */
    if (document.querySelector(".filter--fixed") && window.innerWidth >= 1200) {
      const filterFixed = document.querySelector(".filter--fixed");

      filterFixed.classList.add("filter--hidden");

      window.addEventListener("scroll", function () {
        if (filterFixed && window.innerWidth >= 1200) {
          var distanceToTop = filterFixed.getBoundingClientRect().top;

          if (distanceToTop <= 80) {
            filterFixed.classList.remove("filter--hidden");
          } else {
            filterFixed.classList.add("filter--hidden");
          }
        }
      });
    }

    /*==============================
    Section bg
    ==============================*/
    if (document.querySelector(".section--bg")) {
      var mainBg = document.querySelector(".section--bg");

      if (mainBg.getAttribute("data-bg")) {
        mainBg.style.background = `url(${mainBg.getAttribute("data-bg")})`;
        mainBg.style.backgroundPosition = "center center";
        mainBg.style.backgroundRepeat = "no-repeat";
        mainBg.style.backgroundSize = "cover";
      }
    }

    if (document.querySelector(".hero__slide")) {
      document.querySelectorAll(".hero__slide").forEach(function (element) {
        if (element.getAttribute("data-bg")) {
          element.style.background =
            "url(" + element.getAttribute("data-bg") + ")";
          element.style.backgroundPosition = "center center";
          element.style.backgroundRepeat = "no-repeat";
          element.style.backgroundSize = "cover";
        }
      });
    }

    if (document.querySelector(".section__details-bg")) {
      var mainBg = document.querySelector(".section__details-bg");

      if (mainBg.getAttribute("data-bg")) {
        mainBg.style.background = `url(${mainBg.getAttribute("data-bg")})`;
        mainBg.style.backgroundPosition = "center center";
        mainBg.style.backgroundRepeat = "no-repeat";
        mainBg.style.backgroundSize = "cover";
      }
    }

    /*==============================
    Select
    ==============================*/
    if (document.querySelector("#filter__genre")) {
      new SlimSelect({
        select: "#filter__genre",
      });
    }

    if (document.querySelector("#filter__quality")) {
      new SlimSelect({
        select: "#filter__quality",
        settings: {
          showSearch: false,
        },
      });
    }

    if (document.querySelector("#filter__rate")) {
      new SlimSelect({
        select: "#filter__rate",
        settings: {
          showSearch: false,
        },
      });
    }

    if (document.querySelector("#filter__sort")) {
      new SlimSelect({
        select: "#filter__sort",
        settings: {
          showSearch: false,
        },
      });
    }

    /* mobile filter */
    if (document.querySelector("#mfilter__genre")) {
      new SlimSelect({
        select: "#mfilter__genre",
      });
    }

    if (document.querySelector("#mfilter__quality")) {
      new SlimSelect({
        select: "#mfilter__quality",
        settings: {
          showSearch: false,
        },
      });
    }

    if (document.querySelector("#mfilter__rate")) {
      new SlimSelect({
        select: "#mfilter__rate",
        settings: {
          showSearch: false,
        },
      });
    }

    if (document.querySelector("#mfilter__sort")) {
      new SlimSelect({
        select: "#mfilter__sort",
        settings: {
          showSearch: false,
        },
      });
    }

    /* tv series */
    if (document.querySelector("#filter__season")) {
      new SlimSelect({
        select: "#filter__season",
        settings: {
          showSearch: false,
        },
      });
    }

    if (document.querySelector("#filter__series")) {
      new SlimSelect({
        select: "#filter__series",
        settings: {
          showSearch: false,
        },
      });
    }

    if (document.querySelector("#filter__sync")) {
      new SlimSelect({
        select: "#filter__sync",
        settings: {
          showSearch: false,
        },
      });
    }

    

    /*==============================
    Back to top
    ==============================*/
    if (document.querySelector(".footer__back")) {
      document
        .querySelector(".footer__back")
        .addEventListener("click", function () {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
    }
  })(window, document);
}
