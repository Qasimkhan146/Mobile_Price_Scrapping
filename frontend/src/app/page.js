import { Col, Container, Row } from "react-bootstrap";
import Header from "./component/Header/Header";
import HeroSection from "./component/HeroSection/HeroSection";

// export async function generateMetaData({params}) {
//   // const {slug} = params;
//   let pageTitle = "Latest Mobile Price in Pakistan 2025 | Compare, ExPLORE & Buy Smartphones";

//   return {
//     title: `${pageTitle}`,
//     description: "Stay updated on what the latest mobile prices in Pakistan in 2024 are with daily updates, Phone prices of IPhone, Samsung, Huawei, Xioami, and more. Compare mobile rates, explore mobile specs, and get the latest news and reviews on mobile phones.",
//     // Open Graph (OG) tags for Facebook and LinkedIn
//     openGraph: {
//       title: `${pageTitle}`,
//       description: "Stay updated on what the latest mobile prices in Pakistan in 2024 are with daily updates, Phone prices of IPhone, Samsung, Huawei, Xioami, and more. Compare mobile rates, explore mobile specs, and get the latest news and reviews on mobile phones.",
//       url: "https://mobileprice.biz.pk/",
//       type: "website",
//       images: [
//         {
//           url: "https://mobileprice.biz.pk/images/MOBILE PRI.png",
//           width: 800,
//           height: 600,
//           alt: `${pageTitle} image`,
//         },
//       ],
//     },
    
//     // Twitter card tags
//     twitter: {
//       card: "summary_large_image",
//       title: `${pageTitle} price in Pakistan`,
//       description: "Stay updated on what the latest mobile prices in Pakistan in 2024 are with daily updates, Phone prices of IPhone, Samsung, Huawei, Xioami, and more. Compare mobile rates, explore mobile specs, and get the latest news and reviews on mobile phones.",
//       image:"https://mobileprice.biz.pk/images/MOBILE PRI.png",
//     },
//     alternates: {
//       canonical: "https://mobileprice.biz.pk/images/MOBILE PRI.png",
//    },
//  };

// }
export default function Home() {
  return (
    
    <Container className="bg-[#eee] ">
      <Row>
        <Col md={12} lg={12}>
          <HeroSection/>
        </Col>
      </Row>
      
    </Container>
  );
}
