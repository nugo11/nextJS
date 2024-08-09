import App from "../componenets/App";
import axios from 'axios';

 async function fetchAndDecode(url) {
  try {
    const res = await axios.get(url, { responseType: 'text' });
    const base64Data = res.data;
    const binaryString = atob(base64Data);

    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    const utf8String = decoder.decode(uint8Array);
    return JSON.parse(utf8String);
  } catch (error) {
    console.error('Failed to fetch or decode data:', error);
    return { articles: [], totalPages: 0 };
  }
}


 async function fetchMoviesData() {
  const baseUrl = "https://filmebi.in/CePaSYceBolveNtlegUremPlOULEAu/emEnsItaNyCEnTARGuANacYaNQuEsTrizarYpsYmAtERBILiGh";
  const [ser, turk, anime, animation, movSlider] = await Promise.all([
    fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('სერიალი')}&limit=8&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('თურქული სერიალები')}&limit=12&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('სერიალი,ანიმაციური')}&limit=12&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('ანიმაციური')}&limit=8&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
    fetchAndDecode(`${baseUrl}?mov=&limit=8&fields=title_geo,title_en,detailLink,year,imdb,detailLink,country,genre,poster`),
  ]);

  return {
    ser: ser.articles,
    turk: turk.articles,
    anime: anime.articles,
    animation: animation.articles,
    movSlider: movSlider.articles,
  };
}

export default async function HomePage() {
  const data = await fetchMoviesData();
  
  return <App mov={data}/>;
}
