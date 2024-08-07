"use client";

import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../componenets/login/authcontext";
import SearchIcon from "./icons/icons";
import logo from "../assets/img/logo.webp";
import { usePathname } from 'next/navigation';

export default function Header() {
  const location = usePathname();

  const [change, setChange] = useState("");
  const router = useRouter();

  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {});
  };

  const geo = "ქწერტყუიოპასდფგჰჯკლზხცვბნმ";
  const en = "qwertyuiopasdfghjklzxcvbnm";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (geo.split("").some((letter) => change.includes(letter))) {
      router.push(`/search?title_geo=${change.toLocaleLowerCase()}`);
    }
    if (en.split("").some((letter) => change.includes(letter))) {
      router.push(`/search?title_en=${change.toLocaleLowerCase()}`);
    }
    setChange("");
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                <Link href="/" className="header__logo">
                  <img src={logo} alt="logo" width={131} height={24} />
                </Link>

                <ul className="header__nav">
                  <li className="header__nav-item">
                    <Link href="/" className="header__nav-link">
                      მთავარი
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <Link href="/movies?mov" className="header__nav-link">
                      ფილმები
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <Link href="/serial?ser" className="header__nav-link">
                      სერიალები
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link href="/tv" className="header__nav-link">
                      ტელევიზია
                    </Link>
                  </li>
                </ul>

                <div className="header__auth">
                  <form className="header__search" onSubmit={handleSubmit}>
                    <input
                      className="header__search-input"
                      type="text"
                      placeholder="ძებნა..."
                      value={change}
                      onChange={(e) => setChange(e.target.value)}
                    />
                    <button className="header__search-button" title="search" type="submit">
                      <SearchIcon color="#fff" height={20} width={20} />
                    </button>
                    <button className="header__search-close" title="close" type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#fff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                      </svg>
                    </button>
                  </form>

                  <button title="search" className="header__search-btn" type="button">
                    <SearchIcon color="#fff" height={20} width={20} />
                  </button>
                  {user && (
                    <>
                      <button onClick={handleLogout} style={{ color: "white" }}>
                        Logout
                      </button>
                    </>
                  )}
                </div>

                <button title="menu" className="header__btn" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#fff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6l16 0" />
                    <path d="M4 12l16 0" />
                    <path d="M4 18l16 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
