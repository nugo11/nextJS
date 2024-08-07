"use client"
import { createContext, useContext } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children, initialData }) => {
  return (
    <MovieContext.Provider value={initialData}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieData = () => {
  return useContext(MovieContext);
};
