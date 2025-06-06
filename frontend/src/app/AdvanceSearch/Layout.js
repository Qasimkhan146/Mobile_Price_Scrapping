export async function generateMetadata({ params }) {
  // const {slug} = params;
  let pageTitle = "Advance Search for Mobile | Compare, ExPLORE & Buy Smartphones";

  return {
    title: `${pageTitle}`,
    description: "Find the perfect mobile for your needs with our Advance Search feature. Compare mobile rates, explore mobile specs, and get the Latest prices on All Vendors.",
    // Open Graph (OG) tags for Facebook and LinkedIn
    openGraph: {
      title: `${pageTitle}`,
      description: "Find the perfect mobile for your needs with our Advance Search feature. Compare mobile rates, explore mobile specs, and get the Latest prices on All Vendors.",
      url: "https://mobileprice.biz.pk/AdvanceSearch",
      type: "website",
      images: [
        {
          url: "https://mobileprice.biz.pk/images/Fav.png",
          width: 800,
          height: 600,
          alt: `${pageTitle} image`,
        },
      ],
    },

    // Twitter card tags
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} price in Pakistan`,
      description: "Find the perfect mobile for your needs with our Advance Search feature. Compare mobile rates, explore mobile specs, and get the Latest prices on All Vendors.",
      image: "https://mobileprice.biz.pk/images/Fav.png",
    },
    alternates: {
      canonical: "https://mobileprice.biz.pk/AdvanceSearch",
    },
  };

}
const Layout = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
};

export default Layout;
