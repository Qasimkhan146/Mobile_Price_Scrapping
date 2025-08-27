import PhoneDetail from '../../component/PhoneDetail/PhoneDetail';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const slugFormatted = slug.split("-").join(" ");
  
  // Default values for better SEO fallback
  let pageDetail = {
    model: slugFormatted || 'Mobile Phone',
    Ram: 'N/A',
    Rom: 'N/A',
    front_Cam: 'N/A',
    Back_Cam: 'N/A',
    Capacity: 'N/A',
    Size: 'N/A',
    OS: 'N/A',
    price: 'N/A',
    PriceInUsd: 'N/A',
    Chipset: 'N/A',
    Colors: 'N/A',
    brand: slugFormatted.split(' ')[0] || 'Mobile',
    img_url_mobilemate: null
  };

  try {
    const res = await fetch(
      `https://7842.mobileprice.biz.pk/mobile/fetchSingleMobile/${slugFormatted}`,
      { 
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'User-Agent': 'MobilePrice Bot/1.0'
        }
      }
    );
    
    if (res.ok) {
      const fetchedData = await res.json();
      pageDetail = { ...pageDetail, ...fetchedData };
    }
  } catch (err) {
    console.error('Error fetching mobile details for metadata:', err);
  }

  // Enhanced title with better SEO keywords
  const pageTitle = `${pageDetail.model} Price in Pakistan 2025 - PKR ${pageDetail.price || 'Best Price'} | Specifications & Reviews`;
  
  // Comprehensive meta description with key selling points
  const metaDescription = `${pageDetail.model} price in Pakistan is PKR ${pageDetail.price}. Features ${pageDetail.Ram}GB RAM, ${pageDetail.Rom}GB storage, ${pageDetail.Back_Cam}MP main camera, ${pageDetail.front_Cam}MP selfie camera, ${pageDetail.Capacity}mAh battery, ${pageDetail.Size}" display. Compare prices across PriceOye, WhatMobile, Daraz. Latest ${pageDetail.brand} mobile specifications, reviews & availability in Pakistan.`.slice(0, 160);

  // Keywords for better search targeting
  const keywords = [
    `${pageDetail.model} price Pakistan`,
    `${pageDetail.brand} mobile price`,
    `${pageDetail.model} specifications`,
    `${pageDetail.Ram}GB RAM mobile`,
    `${pageDetail.Back_Cam}MP camera phone`,
    `${pageDetail.brand} ${pageDetail.model}`,
    'mobile prices Pakistan',
    'smartphone specifications',
    `${pageDetail.model} review`,
    `${pageDetail.brand} phones 2025`
  ].filter(Boolean).join(', ');

  // Structured Data for better rich snippets
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pageDetail.model,
    description: metaDescription,
    brand: {
      '@type': 'Brand',
      name: pageDetail.brand
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      price: pageDetail.price || '0',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'MobilePrice.biz.pk'
      }
    },
    image: pageDetail.img_url_mobilemate || pageDetail.imageSRC || 'https://mobileprice.biz.pk/images/MOBILE PRI.png',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'RAM',
        value: `${pageDetail.Ram}GB`
      },
      {
        '@type': 'PropertyValue', 
        name: 'Storage',
        value: `${pageDetail.Rom}GB`
      },
      {
        '@type': 'PropertyValue',
        name: 'Main Camera',
        value: `${pageDetail.Back_Cam}MP`
      },
      {
        '@type': 'PropertyValue',
        name: 'Battery',
        value: `${pageDetail.Capacity}mAh`
      },
      {
        '@type': 'PropertyValue',
        name: 'Display Size', 
        value: `${pageDetail.Size} inches`
      },
      {
        '@type': 'PropertyValue',
        name: 'Operating System',
        value: pageDetail.OS
      }
    ].filter(prop => prop.value && prop.value !== 'N/Aundefined' && prop.value !== 'undefinedGB')
  };

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: keywords,
    
    // Open Graph optimization
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url: `https://www.mobileprice.biz.pk/Mobile/${slug}`,
      type: 'website',
      siteName: 'MobilePrice.biz.pk',
      locale: 'en_PK',
      images: [
        {
          url: pageDetail.img_url_mobilemate || pageDetail.imageSRC || 'https://mobileprice.biz.pk/images/MOBILE PRI.png',
          width: 1200,
          height: 630,
          alt: `${pageDetail.model} - ${pageDetail.brand} smartphone with ${pageDetail.Ram}GB RAM and ${pageDetail.Back_Cam}MP camera`,
          type: 'image/jpeg'
        }
      ],
      // Additional product-specific OG tags
      productPrice: pageDetail.price ? `PKR ${pageDetail.price}` : undefined,
      productBrand: pageDetail.brand,
      productAvailability: 'in stock'
    },

    // Enhanced Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@MobilePricePK',
      creator: '@MobilePricePK', 
      title: pageTitle,
      description: metaDescription,
      images: [pageDetail.img_url_mobilemate || pageDetail.imageSRC || 'https://mobileprice.biz.pk/images/MOBILE PRI.png']
    },

    // Canonical and alternate URLs
    alternates: {
      canonical: `https://www.mobileprice.biz.pk/Mobile/${slug}`,
      languages: {
        'en-PK': `https://www.mobileprice.biz.pk/Mobile/${slug}`,
        'ur-PK': `https://www.mobileprice.biz.pk/ur/Mobile/${slug}` // If you have Urdu version
      }
    },

    // Additional meta tags for better SEO
    other: {
      'revisit-after': '7 days',
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
      
      // Product-specific meta tags
      'product:price:amount': pageDetail.price || '0',
      'product:price:currency': 'PKR',
      'product:brand': pageDetail.brand,
      'product:availability': 'in stock',
      'product:condition': 'new',
      'product:retailer_item_id': slug,
      
      // JSON-LD structured data
      'structured-data': JSON.stringify(structuredData)
    },

    // Verification tags (add your actual verification codes)
    // verification: {
    //   google: 'your-google-verification-code',
    //   bing: 'your-bing-verification-code',
    //   yandex: 'your-yandex-verification-code'
    // }
  };
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  // You can implement this to pre-generate popular mobile pages
  // This would require fetching popular mobile models from your API
  return []; // Return array of { slug: 'mobile-name' } objects
}

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  return (
    <main>
      {/* JSON-LD Schema in the head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `https://www.mobileprice.biz.pk/Mobile/${slug}`,
            url: `https://www.mobileprice.biz.pk/Mobile/${slug}`,
            name: 'Mobile Phone Details and Price Comparison',
            description: 'Compare mobile phone prices across Pakistan with detailed specifications and reviews',
            isPartOf: {
              '@type': 'WebSite',
              '@id': 'https://www.mobileprice.biz.pk',
              url: 'https://www.mobileprice.biz.pk',
              name: 'MobilePrice.biz.pk',
              description: 'Best mobile phone prices comparison in Pakistan',
              
            },
          })
        }}
      />
      <PhoneDetail />
    </main>
  );
};

export default Page;