// next-sitemap.config.js
const fetchMovieSitemap = require('./fetchMovieSitemap');

module.exports = {
  siteUrl: 'https://filmebi.in', // Your site URL
  generateRobotsTxt: true, // Optional
  sitemapSize: 5000, // Adjust if you have many URLs
  additionalPaths: async (config) => {
    const movieSitemap = await fetchMovieSitemap();
    return movieSitemap.map(movie => ({
      loc: movie.loc, // URL
      changefreq: movie.changefreq, // Frequency of changes
      priority: movie.priority, // Priority
    }));
  },
};
