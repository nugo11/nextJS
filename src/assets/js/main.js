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
