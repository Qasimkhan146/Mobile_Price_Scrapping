/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://www.mobileprice.biz.pk',
    generateRobotsTxt: true, 
    sitemapSize: 7000, 
    exclude: ['/Dashboard/*', '/Dashboard', '/Login'], 
    additionalPaths: async (config) => {
      try {
        // Generate additional paths for dynamic routes
        const response = await fetch('http://localhost:4501/mobile/fetchAllMobiles');
        if (!response.ok) {
          throw new Error('Failed to fetch mobile data');
        }
        const products = await response.json();
        // Map the product data to dynamic routes
        return products.map((product) => ({
          loc: `/Mobile/${product?.model?.replace(/ /g, '-')}`, 
          changefreq: 'daily',
          priority: 0.8,
        }));
      } catch (error) {
        console.error('Error fetching additional paths:', error);
        return [];
      }
    },
  };
  
  module.exports = config;
  