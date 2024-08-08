
import axios from 'axios';

export default async (req, res) => {
  try {
    const baseUrl = "https://filmebi.in/CePaSYceBolveNtlegUremPlOULEAu/emEnsItaNyCEnTARGuANacYaNQuEsTrizarYpsYmAtERBILiGh";

    const fetchAndDecode = async (url) => {
      const response = await axios.get(`/api/fetchAndDecode?url=${encodeURIComponent(url)}`);
      return response.data;
    };

    const [movies, ser, turk, anime, animation, movSlider] = await Promise.all([
      fetchAndDecode(`${baseUrl}?limit=10`),
      fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('სერიალი')}&limit=8`),
      fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('თურქული სერიალები')}&limit=12`),
      fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('სერიალი,ანიმაციური')}&limit=12`),
      fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('ანიმაციური')}&limit=8`),
      fetchAndDecode(`${baseUrl}?mov=&limit=8`)
    ]);

    res.status(200).json({
      movies: movies.articles,
      ser: ser.articles,
      turk: turk.articles,
      anime: anime.articles,
      animation: animation.articles,
      movSlider: movSlider.articles,
      totalPages: movies.totalPages
    });
  } catch (error) {
    console.error('Failed to fetch movies data:', error);
    res.status(500).json({ movies: [], ser: [], turk: [], anime: [], animation: [], movSlider: [], totalPages: 0 });
  }
};
