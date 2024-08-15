/** @type {import('next').NextConfig} */
import { defineConfig } from 'next';
import { withSitemap } from 'next-sitemap';

const nextConfig = {
  images: {
    domains: ['filmebi.in'],
  },
  // Add any other Next.js configurations here
};

// Export the configuration with sitemap options
export default withSitemap(
  defineConfig({
    ...nextConfig,
    // Sitemap options
    siteUrl: 'https://filmebi.in', // Replace with your site URL
    generateRobotsTxt: true, // (Optional) Generate a robots.txt file
  })
);
