import PhoneDetail from '../../component/PhoneDetail/PhoneDetail';

export async function generateMetadata({ params }) {
  const resolvedParams = await params; // Ensure `params` is resolved if it's a Promise
  const slug = resolvedParams?.slug || ""; // Safely access `slug`

  const slugFormatted = slug.split("-").join(" ");
  let pageTitle = slugFormatted;
  let pageDetail = {};

  try {
    const res = await fetch(
      `https://7842.mobileprice.biz.pk/mobile/fetchSingleMobile/${slugFormatted}`
    );
    if (!res.ok) {
      return { title: pageTitle, description: "", openGraph: {}, twitter: {} };
    }
    pageDetail = await res.json();
    pageTitle = pageDetail.model;
  } catch (err) {
    console.error(err);
  }

  return {
    title: `${pageTitle} price in Pakistan`,
    description: `${pageTitle} mobile specification RAM ${pageDetail.Ram}, ROM ${pageDetail.Rom}, Front Camera ${pageDetail.front_Cam} price in Pakistan, Back Camera ${pageDetail.Back_Cam} price in Pakistan, Battery: ${pageDetail.Capacity} MAH, Screen ${pageDetail.Size} IN, OS ${pageDetail.OS} ....`,
    openGraph: {
      title: `${pageTitle} price in Pakistan`,
      description: `${pageTitle} mobile specification RAM ${pageDetail.Ram}, ROM ${pageDetail.Rom}, Front Camera ${pageDetail.front_Cam} price in Pakistan, Back Camera ${pageDetail.Back_Cam} price in Pakistan, Battery: ${pageDetail.Capacity} MAH, Screen ${pageDetail.Size} IN, OS ${pageDetail.OS} ....`,
      url: `https://mobileprice.biz.pk/Mobile/${slug}`,
      type: "website",
      images: [
        {
          url:
            pageDetail.img_url_mobilemate ||
            "https://mobileprice.biz.pk/images/MOBILE PRI.png",
          width: 800,
          height: 600,
          alt: `${pageTitle} image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} price in Pakistan`,
      description: `${pageTitle} mobile specification RAM ${pageDetail.Ram}, ROM ${pageDetail.Rom}, Front Camera ${pageDetail.front_Cam} price in Pakistan, Back Camera ${pageDetail.Back_Cam} price in Pakistan, Battery: ${pageDetail.Capacity} MAH, Screen ${pageDetail.Size} IN, OS ${pageDetail.OS} ....`,
      image:
        pageDetail.img_url_mobilemate ||
        "https://mobileprice.biz.pk/images/MOBILE PRI.png",
    },
    alternates: {
      canonical: `https://www.mobileprice.biz.pk/Mobile/${slug}`,
    },
  };
}


const Page = () => {
  return (
    <div>
      <PhoneDetail />
    </div>
  );
};

export default Page;
