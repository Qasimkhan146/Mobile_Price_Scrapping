import { Col, Container, Row } from "react-bootstrap";
import HeroSection from "./component/HeroSection/HeroSection";
import NewArrivals from "./component/NewArrivals/NewArrivals";
import FaqSection from "./component/FaqSection/FaqSection";

export async function generateMetadata() {
  // Enhanced homepage title with better keywords and year
  const pageTitle = "Mobile Prices in Pakistan 2025 - Latest Smartphone Rates & Specifications | MobilePrice.biz.pk";
  
  // Comprehensive meta description with key selling points
  const metaDescription = "Find latest mobile phone prices in Pakistan 2025. Compare iPhone, Samsung, Huawei, Xiaomi, OnePlus, Oppo, Vivo smartphone prices with detailed specifications. Daily updated rates from PriceOye, WhatMobile, Daraz. Best mobile deals & reviews in Pakistan.";

  // Keywords targeting Pakistani mobile market
  const keywords = [
    'mobile prices Pakistan 2025',
    'smartphone rates Pakistan',
    'iPhone price Pakistan',
    'Samsung mobile price',
    'mobile phone specifications',
    'latest mobile phones Pakistan',
    'mobile price comparison',
    'smartphone deals Pakistan',
    'mobile reviews Pakistan',
    'Android phone prices',
    'flagship mobile prices',
    'budget phones Pakistan',
    'PriceOye mobile rates',
    'WhatMobile prices'
  ].join(', ');

  // Structured data for homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.mobileprice.biz.pk',
    url: 'https://www.mobileprice.biz.pk',
    name: 'MobilePrice.biz.pk',
    description: metaDescription,
    publisher: {
      '@type': 'Organization',
      name: 'MobilePrice.biz.pk',
      url: 'https://www.mobileprice.biz.pk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mobileprice.biz.pk/images/MOBILE PRI.png'
      }
    },
    // Removed SearchAction as discussed
    sameAs: [
      'https://www.facebook.com/MobilePricePK',
      'https://www.twitter.com/MobilePricePK',
      'https://www.instagram.com/MobilePricePK'
    ]
  };

  // Organization schema for better brand recognition
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MobilePrice.biz.pk',
    url: 'https://www.mobileprice.biz.pk',
    logo: 'https://mobileprice.biz.pk/images/MOBILE PRI.png',
    description: 'Pakistan\'s leading mobile phone price comparison platform with latest smartphone rates, specifications, and reviews.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
      addressRegion: 'Pakistan'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan'
    }
  };

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: keywords,
    
    // Enhanced Open Graph for better social sharing
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url: 'https://www.mobileprice.biz.pk/',
      type: 'website',
      siteName: 'MobilePrice.biz.pk',
      locale: 'en_PK',
      images: [
        {
          url: 'https://mobileprice.biz.pk/images/MOBILE PRI.png',
          width: 1200,
          height: 630,
          alt: 'Mobile Prices in Pakistan 2025 - Latest Smartphone Rates and Reviews',
          type: 'image/png'
        }
      ]
    },
    
    // Enhanced Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@MobilePricePK',
      creator: '@MobilePricePK',
      title: pageTitle,
      description: metaDescription,
      images: ['https://mobileprice.biz.pk/images/MOBILE PRI.png']
    },

    // Canonical and alternate URLs
    alternates: {
      canonical: 'https://www.mobileprice.biz.pk/',
      languages: {
        'en-PK': 'https://www.mobileprice.biz.pk/',
        'ur-PK': 'https://www.mobileprice.biz.pk/ur/' // If you have Urdu version
      }
    },

    // Enhanced meta tags for better SEO
    other: {
      'revisit-after': '1 day', // Homepage changes frequently
      'distribution': 'global',
      'rating': 'general',
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'googlebot': 'index, follow',
      'bingbot': 'index, follow',
      'author': 'MobilePrice.biz.pk',
      'publisher': 'MobilePrice.biz.pk',
      'copyright': 'MobilePrice.biz.pk',
      'theme-color': '#1eb8db',
      'msapplication-TileColor': '#1eb8db',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      
      // Geo-targeting for Pakistan
      'geo.region': 'PK',
      'geo.country': 'Pakistan',
      'geo.placename': 'Pakistan',
      'ICBM': '30.3753,69.3451', // Pakistan coordinates
      
      // Homepage-specific tags
      'page-topic': 'mobile phone prices Pakistan',
      'page-type': 'homepage',
      'content-language': 'en-PK',
      
      // JSON-LD structured data
      'website-schema': JSON.stringify(structuredData),
      'organization-schema': JSON.stringify(organizationSchema)
    },

    // Verification tags (add your actual codes when ready)
    verification: {
      // google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    }
  };
}

const Home = () => {
  return (
    <main>
      {/* JSON-LD Schema for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://www.mobileprice.biz.pk/',
            url: 'https://www.mobileprice.biz.pk/',
            name: 'Mobile Prices in Pakistan 2025 - Latest Smartphone Rates',
            description: 'Find and compare latest mobile phone prices in Pakistan with detailed specifications and reviews',
            isPartOf: {
              '@type': 'WebSite',
              '@id': 'https://www.mobileprice.biz.pk',
              url: 'https://www.mobileprice.biz.pk',
              name: 'MobilePrice.biz.pk'
            },
            about: {
              '@type': 'Thing',
              name: 'Mobile Phone Prices Pakistan',
              description: 'Comprehensive mobile phone price comparison service for Pakistan market'
            },
            mainEntity: {
              '@type': 'ItemList',
              name: 'Latest Mobile Phones in Pakistan',
              description: 'Updated list of mobile phone prices and specifications in Pakistan',
              numberOfItems: 1000 // Approximate, adjust based on your inventory
            }
          })
        }}
      />
      
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MobilePrice.biz.pk',
            url: 'https://www.mobileprice.biz.pk',
            logo: 'https://mobileprice.biz.pk/images/MOBILE PRI.png',
            description: 'Pakistan\'s leading mobile phone price comparison platform',
            
            areaServed: {
              '@type': 'Country',
              name: 'Pakistan'
            }
          })
        }}
      />

      <Container className="bg-[#eee]">
        <Row>
          <Col md={12} lg={12}>
            <HeroSection />
            <NewArrivals />
            <FaqSection />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;