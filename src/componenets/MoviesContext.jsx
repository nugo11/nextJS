"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
// import { usePathname } from 'next/navigation';

const MoviesContext = createContext();

export const MoviesProvider = ({ children, initialData = {} }) => {
  const [movies, setMovies] = useState([]);
  const [movs, setMovs] = useState([]);
  const [detailResults, setdetailResults] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [ser, setSer] = useState([]);
  const [movSlider, setMovSlider] = useState([]);
  const [turk, setTurk] = useState([]);
  const [anime, setAnime] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  // const location = usePathname();

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setMovies(initialData.movies);
      setMovs(initialData.movs);
      setdetailResults(initialData.detailResults);
      setSearchResults(initialData.searchResults);
      setSer(initialData.ser);
      setMovSlider(initialData.movSlider);
      setTurk(initialData.turk);
      setAnime(initialData.anime);
      setAnimation(initialData.animation);
      setTotalPages(initialData.totalPages);
    }
  }, [initialData]);

  // useEffect(() => {
  //   if (Object.keys(initialData).length === 0) {
  //     const fetchMovies = async (link) => {
  //       const response = await fetch(link);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch movies");
  //       }
  //       const encodedData = await response.text();
  //       return JSON.parse(atob(encodedData));
  //     };

  //     const fetchData = async () => {
  //       try {
  //         const queryParams = new URLSearchParams(location.search);
  //         const queryString = queryParams.toString();
  //         const baseUrl =
  //           "https://filmebi.in/CePaSYceBolveNtlegUremPlOULEAu/emEnsItaNyCEnTARGuANacYaNQuEsTrizarYpsYmAtERBILiGh";

  //         const requests = [
  //           fetchMovies(
  //             `${baseUrl}${
  //               location.startsWith("/detail")
  //                 ? `?detailLink=${location.pathname.replace("/detail/", "")}`
  //                 : `?${queryString}`
  //             }`
  //           ),
  //         ];

  //         if (location === "/") {
  //           requests.push(
  //             fetchMovies(`${baseUrl}?genre=სერიალი&limit=8`),
  //             fetchMovies(`${baseUrl}?genre=თურქული%20სერიალები&limit=12`),
  //             fetchMovies(`${baseUrl}?genre=სერიალი%2Cანიმაციური&limit=12`),
  //             fetchMovies(`${baseUrl}?genre=ანიმაციური&limit=8`),
  //             fetchMovies(`${baseUrl}?mov=&limit=8`)
  //           );
  //         }

  //         const results = await Promise.all(requests);

  //         if (location.startsWith("/detail")) {
  //           setdetailResults(results[0].articles[0]);
  //         } else if (location.startsWith("/search")) {
  //           setSearchResults(results[0].articles);
  //           setTotalPages(results[0].totalPages);
  //         } else {
  //           setMovies(results[0].articles);
  //           setMovs(results[0].articles);
  //           setTotalPages(results[0].totalPages);
  //           if (results.length > 1) {
  //             setSer(results[1].articles);
  //             setTurk(results[2].articles);
  //             setAnime(results[3].articles);
  //             setAnimation(results[4].articles);
  //             setMovSlider(results[5].articles);
  //           }
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }

  //   return () => {
  //     setMovies([]);
  //     setMovs([]);
  //     setSearchResults([]);
  //     setSer([]);
  //     setTurk([]);
  //     setAnime([]);
  //     setAnimation([]);
  //   };
  // }, [location.search, location]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        searchResults,
        detailResults,
        ser,
        turk,
        anime,
        animation,
        totalPages,
        movs,
        movSlider
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  return useContext(MoviesContext);
};
