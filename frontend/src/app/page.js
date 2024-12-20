import { Col, Container, Row } from "react-bootstrap";
import Header from "./component/Header/Header";
import HeroSection from "./component/HeroSection/HeroSection";

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
