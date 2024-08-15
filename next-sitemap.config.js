// next-sitemap.config.js
const fetchMovieSitemap = require('./src/components/fetchMovieSitemap'); // Adjust the path as needed

module.exports = {
  siteUrl: 'https://filmebi.in',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    const movieSitemap = await fetchMovieSitemap();
    return movieSitemap;
  },
};
