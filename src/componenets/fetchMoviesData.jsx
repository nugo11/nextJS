export async function fetchAndDecode(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network response was not ok');
      
      const base64Data = await res.text();
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
  
  export async function fetchMoviesData() {
    const baseUrl = "https://filmebi.in/CePaSYceBolveNtlegUremPlOULEAu/emEnsItaNyCEnTARGuANacYaNQuEsTrizarYpsYmAtERBILiGh";
  
    const movies = await fetchAndDecode(`${baseUrl}?limit=10`);
    const ser = await fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('სერიალი')}&limit=8`);
    const turk = await fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('თურქული სერიალები')}&limit=12`);
    const anime = await fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('სერიალი,ანიმაციური')}&limit=12`);
    const animation = await fetchAndDecode(`${baseUrl}?genre=${encodeURIComponent('ანიმაციური')}&limit=8`);
    const movSlider = await fetchAndDecode(`${baseUrl}?mov=&limit=8`);
  
    return {
      movies: movies.articles,
      ser: ser.articles,
      turk: turk.articles,
      anime: anime.articles,
      animation: animation.articles,
      movSlider: movSlider.articles,
      totalPages: movies.totalPages
    };
  }
  