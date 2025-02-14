"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { Col, Container, Row } from "react-bootstrap";
// import Header from "../components/Header/Header";
// import Image from "next/image";
// import Adds from "../components/Ads/Ads";
// import News from "../components/News/News";
// import Reviews from "../components/Reviews/Reviews";
// import Footer from "../components/Footer/Footer";
// import TabNavigation from "../components/TabNavigation/TabNavigation";
// import "./FAQs.css";
// import Header from "../component/Header/Header";
const page = () => {
  return (
    <Container>
        <Head>
          <title>FAQs - MobilePrice</title>
          <meta name="description" content="Frequently Asked Questions - MobilePrice" />
          <link rel="canonical" href="https://www.mobileprice.biz.pk/" />
        </Head>
      <Row>
        <h1 className="faqs-container-h1">FAQs</h1>
      </Row>
      <Row>
        <Col lg={12} className="mt-2">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h6>How to diagnose problems with your phone speakers?</h6>
              </Accordion.Header>
              <Accordion.Body>
                Open the MobilePrice tool and Select {"'"}Speakers{"'"} in
                the diagnostic feature to check the audio output. This tool
                checks things like sound quality, volume, and distortion.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h6>
                  How do you diagnose phone vibration and ringing problems?
                </h6>
              </Accordion.Header>
              <Accordion.Body>
                Open the MobilePrice App diagnostic tool and select {"'"}Sound and
                Vibration.{"'"} It will check your phone{"'"}s speakers, microphone, and
                vibration motor. to find abnormalities Including the problem of
                sound distortion. low noise level or vibration problems.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h6>
                  How can you test camera diagnostics in the MobilePrice app?
                </h6>
              </Accordion.Header>
              <Accordion.Body>
                Open the MobilePrice App diagnostic tool and select {"'"}Camera
                Diagnose{"'"} to perform a detailed camera check. It analyzes
                features such as focus, flash, and image quality. While testing
                the front and rear cameras We will send you a detailed report so
                you can understand issues affecting your camera{"'"}s performance.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <h6>
                  How can you diagnose a problem with your smartphone display?
                </h6>
              </Accordion.Header>
              <Accordion.Body>
                To test the screen on your, use the Diagnose feature and select
                {"'"}Display.{"'"} This diagnostic test will help you identify and fix
                performance-related issues by checking for issues such as
                unresponsive touch. Broken pixels Flickering on the screen and
                color accuracy...
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <h6>
                  How to diagnose potential problems with the front camera?
                </h6>
              </Accordion.Header>
              <Accordion.Body>
                If you want to diagnose the front camera Open Diagnostics and
                select {"'"}Front Camera,{"'"} which will run several checks to check
                for specific issues, such as poor image quality.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <h6>How to diagnose rear camera problems?</h6>
              </Accordion.Header>
              <Accordion.Body>
                Select {"'"}Rear Camera{"'"} under the diagnostic feature to perform a
                diagnosis of your smartphone{"'"}s back camera. This test evaluates
                features such as zoom, focus, image quality, and flash
                operation. to help you determine if you have any problems. With
                the rear camera or not...
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <h6>How to diagnose the single or double tap?</h6>
              </Accordion.Header>
              <Accordion.Body>
                Open the MobilePrice App diagnostic tool and select Single Tap
                Check if the screen responds to a single tap. Double Tap Check
                if the screen responds to a Double Tap Test your screen{"'"}s
                sensitivity to double tap.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>
                <h6>
                  How to diagnose issues with your smartphone fingerprint
                  sensor?
                </h6>
              </Accordion.Header>
              <Accordion.Body>
                Open the MobilePrice App diagnostic tool and select {"'"}Fingerprint
                {"'"} This tool guides you through a series of tests to determine
                your sensor{"'"}s responsiveness and accuracy...
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>
                <h6>How to diagnose your phone{"'"}s connection problems?</h6>
              </Accordion.Header>
              <Accordion.Body>
                Go to the diagnostic feature and select, This will test your
                phone{"'"}s Wi-Fi and cellular connections. To help you identify
                issues with signal strength or connection stability
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <TabNavigation/> */}
        </Col>
      </Row>
    </Container>
  );
};

export default page;
