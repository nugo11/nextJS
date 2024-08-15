import fetchMovieSitemap from './src/componenets/fetchMovieSitemap.mjs';

export default {
  siteUrl: 'https://filmebi.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // To avoid creating unnecessary index sitemaps
  sitemapSize: 50000,
  transform: async (config, url) => {
    // Custom URL transformation
    return {
      loc: url,
      changefreq: 'daily',
      priority: 0.7,
    };
  },
  additionalPaths: async (config) => {
    const movieSitemapUrls = await fetchMovieSitemap();
    return movieSitemapUrls.map((url) => ({
      loc: url.loc,
      changefreq: url.changefreq,
      priority: url.priority,
    }));
  },
};
