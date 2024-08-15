// next-sitemap.config.js
module.exports = {
    siteUrl: 'https://filmebi.in', // Your site URL
    generateRobotsTxt: true, // Optional
    sitemapSize: 5000, // Adjust if you have many URLs
    additionalPaths: async (config) => {
      const movieSitemap = await fetchMovieSitemap();
      return movieSitemap;
    },
  };
  