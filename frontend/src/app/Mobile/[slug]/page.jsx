
import PhoneDetail from '../../component/PhoneDetail/PhoneDetail';

export async function generateMetadata({params}) {
  const {slug} = params;
  let pageTitle = "Detail";
  let pageDetail = {};
  try{
   const slugFormated = slug ? slug.split("-").join(" ") : "";
   const res = await fetch(`https://7842.mobileprice.biz.pk/mobile/fetchSingleMobile/${slugFormated}}`);
   if(!res.ok){
     return {
      title: pageTitle,
      description: "",
      openGraph:{},
      twitter:{}
     }
    }
     const brandData = await res.json();
     pageTitle = brandData.model;
     pageDetail = brandData;
   
  }catch(err){
     console.error(err);
  }
  return{
    title: `${pageTitle} price in Pakistan`,
    description: `${pageTitle} mobile specification RAM ${pageDetail.Ram}, ROM ${pageDetail.Rom}, Front Camera ${pageDetail.front_Cam} price in Pakistan, Back Camera ${pageDetail.Back_Cam} price in Pakistan, Battery: ${pageDetail.Capacity} MAH, Screen ${pageDetail.Size} IN, OS ${pageDetail.OS} ....`,
    openGraph: {
      title: `${pageTitle} price in Pakistan`,
      description: `${pageTitle} mobile specification RAM ${pageDetail.Ram}, ROM ${pageDetail.Rom}, Front Camera ${pageDetail.front_Cam} price in Pakistan, Back Camera ${pageDetail.Back_Cam} price in Pakistan, Battery: ${pageDetail.Capacity} MAH, Screen ${pageDetail.Size} IN, OS ${pageDetail.OS} ....`,
      url: `https://mobileprice.biz.pk/Mobile/${slug}`,
      type: "website",
      images: [
        {
          url: pageDetail.img_url_mobilemate || "https://mobileprice.biz.pk/images/MOBILE PRI.png",
          width: 800,
          height: 600,
          alt: `${pageTitle} image`,
        },
      ] 
    },
    twitter:{
      card: "summary_large_image",
      title: `${pageTitle} price in Pakistan`,
      description: `${pageTitle} mobile specification RAM ${pageDetail.Ram}, ROM ${pageDetail.Rom}, Front Camera ${pageDetail.front_Cam} price in Pakistan, Back Camera ${pageDetail.Back_Cam} price in Pakistan, Battery: ${pageDetail.Capacity} MAH, Screen ${pageDetail.Size} IN, OS ${pageDetail.OS} ....`,
      image: pageDetail.img_url_mobilemate || "https://mobileprice.biz.pk/images/MOBILE PRI.png"
    }
  }
}
const page = () => {
  return (
    <div>
      <h1>
        <PhoneDetail/>
      </h1>
    </div>
  )
}

export default page
