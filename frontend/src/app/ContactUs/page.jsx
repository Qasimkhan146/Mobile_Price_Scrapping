import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Header from '../components/Header/Header';
import "./contactUs.css";
import Head from 'next/head';
import Header from '../component/Header/Header';

const ContactUs = () => {
  return (
    <>
      <Head>
        <title>
          {`Contact Us - MobilePrice`}
        </title>
        <meta name="description" content=" Have questions or need assistance? Contact MobilePrice's customer support team. Find our contact information, hours of operation, and frequently asked questions." />
        <link rel="canonical" href="https://www.mobileprice.biz.pk/" />
      </Head>
      <Container>
        <h1 className='contactUs-h1'>Contact Us</h1>
        <Row>
          <Col lg={12}>
            <div className='Privacy-Policy-container'>
              <div className='Privacy-Policy-sub-container'>
                <h2>We do appreciate your feedback and suggestions.</h2>
                <p>We will be glad to hear from you if: </p>
                <ul>
                  <li> You have found a mistake in our phone specifications.</li>
                  <li>You have info about a phone which we don&#39;t have in our database.</li>
                  <li>You have found a broken link.</li>
                  <li> You have a suggestion for improving <span style={{ color: "black", fontWeight: "bold" }}> M</span>
                    <span className="text-black fw-bold">obile</span>
                    <span style={{ color: "black", fontWeight: "bold" }}>P</span>
                    <span className="text-black fw-bold">ricebiz.pk</span> or you want to request a feature.</li>
                </ul>
                <p>Before sending us an email, please keep in mind:</p>
                <ul>
                  <li>We do not sell mobile phones.</li>
                  <li>We do not know the price of any mobile phone in your country.</li>
                  <li>We don&#39;t answer any &#34;unlocking&#34; related questions.</li>
                  <li>We don&#39;t answer any &#34;Which mobile should I buy?&#34; questions.</li>
                </ul>
                <a href="mailto:info@mobileprice.biz.pk"><span style={{ color: "#1674BF", textDecoration: "underline", cursor: "pointer", fontSize: "1.2rem" }}>support@mobileprice.biz.pk</span></a>
                <p className='ppp'>Advertising on <span style={{ color: "black", fontWeight: "bold" }}> M</span>
                  <span className="text-black fw-bold">obile</span>
                  <span style={{ color: "black", fontWeight: "bold" }}>P</span>
                  <span className="text-black fw-bold">rice.biiz.pk</span></p>
                <p>Do you have an online mobile store? Are you interested in advertising on our site? Mobilemate.io is accessed by millions of unique visitors daily, and is guaranteed to help boost your sales.</p>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default ContactUs
