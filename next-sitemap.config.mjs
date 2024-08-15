import fetchMovieSitemap from './src/componenets/fetchMovieSitemap.mjs';

export default {
  siteUrl: 'https://filmebi.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Avoid creating unnecessary index sitemaps
  sitemapSize: 50000,

  // Exclude specific paths from the sitemap
  exclude: [
    '/api/sitemap',
    '/api/addMovie',
    '/api',
    '/detail',
    '/login',
    '/privacy',
  ],

  // Adding category URLs and movie URLs
  additionalPaths: async (config) => {
    const movieSitemapUrls = await fetchMovieSitemap();
    const categoryUrls = [
      { loc: 'https://filmebi.in/movies?genre=სერიალი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=კომედია', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=სათავგადასავლო', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=საშინელება', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ანიმაციური', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=დრამა', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=მძაფრ-სიუჟეტიანი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=საოჯახო', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ფანტასტიკა', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ტრილერი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=დეტექტივი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=კრიმინალური', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=სპორტული', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ბოევიკი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=მელოდრამა', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=რომანტიკული', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=დოკუმენტური', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=საომარი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ისტორიული', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=სერიალი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=რუსული', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ქართული ფილმები', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=საახალწლო', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=მოკლემეტრაჟიანი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ფენტეზი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=მუსიკალური', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=საბავშვო', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ვესტერნი', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=ბიოგრაფიული', changefreq: 'daily', priority: 0.8 },
      { loc: 'https://filmebi.in/movies?genre=მისტიკა', changefreq: 'daily', priority: 0.8 },
    ];

    return [
      ...movieSitemapUrls,
      ...categoryUrls,
    ];
  },

  // Optional: Custom URL transformation
  transform: async (config, url) => {
    return {
      loc: url,
      changefreq: 'daily',
      priority: 0.7,
    };
  },
};
