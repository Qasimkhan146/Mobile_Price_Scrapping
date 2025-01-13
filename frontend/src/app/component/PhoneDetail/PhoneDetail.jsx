"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import image1 from "../../../../public/images/iphone.webp";
import "./PhoneDetail.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMobileDetail,
  selectMobileDetail,
} from "../../../../redux/mobileSlicer";
import Link from "next/link";

const PhoneDetail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, [3000]);
  });

  const mobileDetail = useSelector(selectMobileDetail);
  const { slug } = useParams();
  const slugParts = slug.split("-");
  const brandName = slugParts[0].toUpperCase();
  const modelName = slugParts.slice(1).join("-").replace(/-/g, " ");
  useEffect(() => {
    dispatch(fetchMobileDetail(modelName));
  }, [dispatch]);
  // console.log(mobileDetail, "mobileDetail");
  const features = mobileDetail?.Features.split(",").map((feature) =>
    feature.trim()
  );
  const Sound = mobileDetail?.Audio.split(",").map((feature) =>
    feature.trim()
  );
  const cam = mobileDetail?.Front.split(",").map((feature) =>
    feature.trim()
  );
  const MainDisplay = mobileDetail?.Main.split(",").map((feature) =>
    feature.trim()
  );

  // const sources = mobileDetail?.prices.map((price) => price.source);
  // console.log("Sources", sources);

  const limitCharacters = (text, limit) => {
    return text?.length > limit ? text?.slice(0, limit) + "..." : text;
  };
  if (!mobileDetail)
    return (
      <div className="loading__class">
        <DotLottieReact
          src="https://lottie.host/1911b01f-ab86-4a45-89c5-aab3f0d4e209/WcQ9e9ozxp.lottie"
          style={{ width: "200px", height: "200px" }}
          loop
          autoplay
        />
      </div>
    );
  return (
    <section>
      <div className="col-xl-12 mt-3">
        <div className="d-flex  p-2 flex-column flex-lg-row justify-content-between align-items-center">
          <div className="w-100 justify-content-between d-none d-md-flex flex-row flex-lg-column gap-4 detail__features mb-lg-0 mb-3 mt-lg-0 mt-3">
            <div className="">
              <h5>Network</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>{mobileDetail?.["2G Band"] ? "2G Band" : ""}</p>
              <p>{mobileDetail?.["3G Band"] ? "3G Band" : ""}</p>
              <p>{mobileDetail?.["4G Band"] ? "4G Band" : ""}</p>
              <p>{mobileDetail?.["5G Band"] ? "5G Band" : ""}</p>
            </div>
            <div>
              <h5>Memory</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>{mobileDetail?.Ram}GB RAM</p>
              <p>{mobileDetail?.Rom}GB Storage</p>
              {/* <p>128GB storage</p> */}
            </div>
            <div>
              <h5>Feautures</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>
                {features?.length > 0 &&
                  features[0] &&
                  limitCharacters(features[0], 20)}
              </p>
              <p>
                {features?.length > 0 &&
                  features[1] &&
                  limitCharacters(features[1], 30)}
              </p>
              <p>
                {features?.length > 0 &&
                  features[2] &&
                  limitCharacters(features[2], 30)}
              </p>
            </div>
            <div>
              <h5>Sound</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>
                {Sound?.length > 0 && Sound[0] && limitCharacters(Sound[0], 20)}
              </p>
              <p>
                {Sound?.length > 0 && Sound[1] && limitCharacters(Sound[1], 20)}
              </p>
              <p>
                {Sound?.length > 0 && Sound[2] && limitCharacters(Sound[2], 20)}
              </p>
            </div>
          </div>
          <div className="d-flex image__spec__container justify-content-evenly w-100 align-items-center gap-4">
            <div className="d-none d-md-flex  flex-column gap-4 w-50 text-end imp__specs">
              <div>
                <h5>Main Camera's</h5>
                <b>{mobileDetail?.Back_Cam}MP</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Brand</h5>
                <b>{brandName}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Bluetooth</h5>
                <b>{mobileDetail?.Bluetooth}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Weight</h5>
                <b>{mobileDetail?.weight}g</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>USB</h5>
                <b>{mobileDetail?.USB}</b>
                <div className="red__underline"></div>
              </div>
            </div>
            <div className="w-50 text-center phone__picture__section">
            <h1 className="model__div px-2 mb-2">{mobileDetail?.model}</h1>

              <Image
                src={mobileDetail?.imageSRC || image1}
                height={500}
                width={500}
                alt="main-section"
                className=" custom-image"
              />
              <h3 className="price__div px-2">
                RS: {mobileDetail?.price}
              </h3>
            </div>
            <div className="d-flex flex-column gap-4 w-50 text-start imp__specs">
              <div>
                <h5>Screen Size</h5>
                <b>{mobileDetail?.Size} Inches</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Resolution</h5>
                <b>{mobileDetail?.Resolution}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Color's</h5>
                <b>{mobileDetail?.Colors}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Front Len's</h5>
                <b>{mobileDetail?.front_Cam}MP</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Chipset</h5>
                <b>{mobileDetail?.Chipset}</b>
                <div className="red__underline"></div>
              </div>
            </div>
          </div>
          <div className="w-100 justify-content-between d-none d-md-flex flex-row flex-lg-column gap-4 detail__features mb-lg-0 mb-3 mt-lg-0 mt-3">
            <div>
              <h5>Camera</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>{cam?.length > 0 && cam[0] && limitCharacters(cam[0], 20)}</p>
              <p>{cam?.length > 0 && cam[1] && limitCharacters(cam[1], 20)}</p>
              <p>{cam?.length > 0 && cam[2] && limitCharacters(cam[2], 20)}</p>
            </div>
            <div>
              <h5>Battery</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>{mobileDetail?.Capacity} MAH</p>
              <p>{mobileDetail?.USB}</p>
              {/* <p>128GB storage</p> */}
            </div>
            <div>
              <h5>Main Display</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>
                {MainDisplay?.length > 0 &&
                  MainDisplay[0] &&
                  limitCharacters(MainDisplay[0], 20)}
              </p>
              <p>
                {MainDisplay?.length > 0 &&
                  MainDisplay[1] &&
                  limitCharacters(MainDisplay[1], 20)}
              </p>
              <p>
                {MainDisplay?.length > 0 &&
                  MainDisplay[2] &&
                  limitCharacters(MainDisplay[2], 20)}
              </p>
            </div>
            <div>
              <h5>Performance</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>{limitCharacters(mobileDetail?.CPU, 20)}</p>
              <p>{mobileDetail?.Ram}GB RAM</p>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center flex-column align-items-center">
          <div className="table-responsive w-100 table__container">
            <h3 className="text-center mt-2 mb-2">
              Prices on Different Platforms
            </h3>
            <table className="table border-1  table-striped">
              {/* <caption>More Results</caption> */}
              <thead className="content__heads">
              <tr>
              {/* <th scope="col">Mobiles</th> */}
              <th>Mobilemate</th>
              <th>HamariWeb</th>
              <th>WhatMobile</th>
              <th>PriceOye</th>
              <th>Daraz</th>
            </tr>
              </thead>
              <tbody>
                <tr className="content__tr">
                {/* <th scope="row"><Link href={`/Mobile/${generateSlug(mobileDetail?.model)}`}>{mobileDetail?.model}</Link></th> */}
                <td>
                  {mobileDetail?.mobilemate_link === "N/A" ? (
                 <span className="fw-semibold">{mobileDetail?.mobilemate_price === 0 ? "N/A" : `${mobileDetail?.mobilemate_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobileDetail?.mobilemate_link}>
                      {mobileDetail?.mobilemate_price === 0 ? "N/A" : `${mobileDetail?.mobilemate_price} PKR`}
                    </a>
                  )}
                </td>
                <td>
                  {mobileDetail?.hamariweb_link === "N/A" ? (
                 <span className="fw-semibold">{mobileDetail?.hamariweb_price === 0 ? "N/A" : `${mobileDetail?.hamariweb_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobileDetail?.hamariweb_link}>
                      {mobileDetail?.hamariweb_price === 0 ? "N/A" : `${mobileDetail?.hamariweb_price} PKR`}
                    </a>
                  )}
                </td>

                <td>
                  {mobileDetail?.whatmobile_link === "N/A" ? (
                 <span className="fw-semibold">{mobileDetail?.whatmobile_price === 0 ? "N/A" : `${mobileDetail?.whatmobile_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobileDetail?.whatmobile_link}>
                      {mobileDetail?.whatmobile_price === 0 ? "N/A" : `${mobileDetail?.whatmobile_price} PKR`}
                    </a>
                  )}
                </td>
                <td>
                  {mobileDetail?.priceoye_link === "N/A" ? (
                 <span className="fw-semibold">{mobileDetail?.priceoye_price === 0 ? "N/A" : `${mobileDetail?.priceoye_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobileDetail?.priceoye_link}>
                      {mobileDetail?.priceoye_price === 0 ? "N/A" : `${mobileDetail?.priceoye_price} PKR`}
                    </a>
                  )}
                </td>
                <td>
                  {mobileDetail?.daraz_link === "N/A" ? (
                 <span className="fw-semibold">{mobileDetail?.daraz_price === 0 ? "N/A" : `${mobileDetail?.daraz_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobileDetail?.daraz_link}>
                      {mobileDetail?.daraz_price === 0 ? "N/A" : `${mobileDetail?.daraz_price} PKR`}
                    </a>
                  )}
                </td>
                </tr>
              </tbody>
            </table>
            {/* <table className="w-100 table border-1 d-md-none table-striped">
              <thead className="content__head">
                <tr>
                  <th scope="col">Platform</th>
                  <th scope="col">Prices</th>
                </tr>
              </thead>
              <tbody>
                {mobileDetail &&
                  mobileDetail.prices &&
                  mobileDetail.prices.map((mobile, index) => (
                    <tr key={index} className="content__tr">
                      <td>{mobile.source}</td>
                      <td>
                      {mobile.href === "N/A" ? (
                      <span className="fw-semibold">{mobile.price === 0 ? "N/A" : `${mobile.price} PKR`}</span>
                    ) : (
                      <a target="_blank" href={mobile.href}>
                        {mobile.price === 0 ? "N/A" : `${mobile.price} PKR`}
                      </a>
                    )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table> */}
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row gap-4 mt-4">
          {/* <div className="w-100 border product__all__specs">
            ad section
          </div> */}
          <div className="w-100 product__specs d-flex flex-column border">
            <h3 className="w-100 spec-head-div ">Network</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Network</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">Technology</div>
                  <div className="col-8">
                    {" "}
                    <div>
                      {" "}
                      <b>2G</b>:{" "}
                      {mobileDetail?.["2G Band"]
                        ? mobileDetail?.["2G Band"]
                        : ""}
                    </div>
                    <p>
                      {" "}
                      <b>3G</b>:{" "}
                      {mobileDetail?.["3G Band"]
                        ? mobileDetail?.["3G Band"]
                        : ""}
                    </p>
                    <p>
                      {" "}
                      <b>4G</b>:{" "}
                      {mobileDetail?.["4G Band"]
                        ? mobileDetail?.["4G Band"]
                        : ""}
                    </p>
                    <p>
                      {" "}
                      <b>5G</b>:{" "}
                      {mobileDetail?.["5G Band"]
                        ? mobileDetail?.["5G Band"]
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Launch</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Launch</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">Announced</div>
                  <p className="col-8">2024, September 26</p>
                </div>
                <div className="row gap-2 mb-2">
                  <div className="col-3 fw-bold">Status</div>
                  <div className="col-8">Availabe</div>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Body</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Body</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Dimensions && "Dimensions"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Dimensions &&
                      mobileDetail?.Dimensions}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.weight && "Weight"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.weight &&
                      mobileDetail?.weight}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.SIM && "SIM"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.SIM && mobileDetail?.SIM}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Dimensions && "Dimensions"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Dimensions &&
                      mobileDetail?.Dimensions}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Display</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Display</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Protection && "Protection"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Protection &&
                      mobileDetail?.Protection}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Size && "Size"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Size &&
                      `${mobileDetail?.Size}Inches`}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Resolution && "Resolution"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Resolution &&
                      mobileDetail?.Resolution}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Platform</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Platform</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.OS && "OS"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.OS && mobileDetail?.OS}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.GPU && "GPU"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.GPU &&
                      `${mobileDetail?.GPU}`}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.CPU && "CPU"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.CPU && mobileDetail?.CPU}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Chipset && "Chipset"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Chipset &&
                      mobileDetail?.Chipset}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Memory</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Memory</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Card && "Card Slot"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.OS && mobileDetail?.Card}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3  fw-bold">
                    {mobileDetail?.["Built-in"] && "Internal"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.["Built-in"] &&
                      `${mobileDetail?.["Built-in"]}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Main Camera</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">
                Main Camera
              </h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Main && "Camera"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Main && mobileDetail?.Main}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Features && "Features"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Features &&
                      `${mobileDetail?.Features}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Selfie Camera</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">
                Selfie Camera
              </h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Front && "Front"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Front && mobileDetail?.Front}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Sound</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Sound</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Audio && "Audio"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Audio && mobileDetail?.Audio}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Comms</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Comms</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.WLAN && "WLAN"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.WLAN && mobileDetail?.WLAN}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Bluetooth && "Bluetooth"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Bluetooth &&
                      mobileDetail?.Bluetooth}
                  </p>
                </div>
                <div className="row mb-2 spec__subhead">
                  <div className="col-3 gap-2 fw-bold">
                    {mobileDetail?.GPS && "GPS"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.GPS && mobileDetail?.GPS}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Radio && "Radio"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Radio && mobileDetail?.Radio}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.USB && "USB"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.USB && mobileDetail?.USB}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
            <h3 className="w-100 spec-head-div">Features</h3>
            <div className="p-3 w-100 d-flex align-items-start">
              <h3 className="w-25 specs__head d-none d-md-block">Features</h3>
              <div className="w-100 w-md-75">
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Extra && "Extra Features"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Extra && mobileDetail?.Extra}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Sensors && "Sensors"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Sensors &&
                      mobileDetail?.Sensors}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Technology && "Technology"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Technology &&
                      mobileDetail?.Technology}
                  </p>
                </div>
              </div>
            </div>
            <div className="specs__underline"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 my-4">
            {/* <div> */}
            {/* {parse(mobileDetail.description || "")}     */}
            {/* </div> */}
            <div>
              <h2 className="fs-6">
                <Link
                 href={`/Mobile/${mobileDetail?.model?.replace(/ /g, "-")}`}
                  className="fw-bold"
                >
                  {mobileDetail?.model}{" "}
                </Link>
                Prices in Pakistan 2024
              </h2>
            </div>
            <ul>
              <li>
                <Link href={`/Mobile/${mobileDetail.model?.replace(/ /g, "-")}`}className="fw-bold">
                  {mobileDetail.model}{" "}
                </Link>
                Price in Pakistan: PKR.
                <span className="fw-bold"> {mobileDetail.price}</span>
              </li>
              <li>
                <Link href={`/Mobile/${mobileDetail?.model?.replace(/ /g, "-")}`} className="fw-bold">
                  {mobileDetail.brand}{" "}
                </Link>
                <Link href={`/Mobile/${mobileDetail?.model?.replace(/ /g, "-")}`}className="fw-bold">
                  {mobileDetail.model}{" "}
                </Link>
                Price in USD:${" "}
                <span className="fw-bold">
                  {mobileDetail.PriceInUsd}
                </span>
              </li>
            </ul>
            The <span className="fw-bold"> {mobileDetail.model}</span> is
            powered by{" "}
            <span className="fw-bold">{mobileDetail.brand}</span>
            {"'"}s , providing exceptional performance for all your daily
            activities and multitasking. Running on{" "}
            <span className="fw-bold">{mobileDetail.os}</span>, this{" "}
            <span className="fw-bold">{mobileDetail.model}</span> boasts{" "}
            <span className="fw-bold">{mobileDetail.brand}</span>
            {"'"}s signature sleek and premium design, measuring{" "}
            <span className="fw-bold">{mobileDetail.Dimensions}</span>,
            making it not only stylish but also comfortable to handle. The{" "}
            <span className="fw-bold">{mobileDetail.model}</span>{" "}
            features a{" "}
            <span className="fw-bold">{mobileDetail.Size}</span> inch
            Retina display with a resolution of{" "}
            <span className="fw-bold">{mobileDetail.Resolution}</span>,
            offers an immersive and crystal clear visual experience, perfect for
            streaming, gaming, or everyday use. Under the hood, the{" "}
            <span className="fw-bold">{mobileDetail.model}</span>{" "}
            includes <span className="fw-bold">{mobileDetail.Ram}</span>{" "}
            GB of RAM and{" "}
            <span className="fw-bold">{mobileDetail.Rom}</span> GB of
            internal storage, ensuring ample space for your apps, media, and
            files. The{" "}
            <span className="fw-bold">{mobileDetail.model}</span> excels
            in photography, featuring a{" "}
            <span className="fw-bold">{mobileDetail.Back_Cam}</span> MP
            rear camera that captures professional quality photos and a{" "}
            <span className="fw-bold">{mobileDetail.front_Cam}</span> MP
            front camera for stunning selfies and FaceTime calls. Additionally,
            the long lasting{" "}
            <span className="fw-bold">{mobileDetail.Capacity}</span> mAh
            battery ensures you can enjoy uninterrupted usage throughout the day
            without needing frequent recharges. The{" "}
            <span className="fw-bold">
              {mobileDetail.brand} {mobileDetail.model}
            </span>{" "}
            is the perfect blend of cutting edge technology, style, and
            reliability, making it an ideal choice for anyone seeking a high
            performance smartphone.
          </div>
        </div>
        {/* our website */}
        <div className="row">
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul">
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=15000&maxPrice=30000`}>
                  {mobileDetail.brand} mobile price in Pakistan 15000 to 30000
                </Link>
              </li>
              {/* <li className="description-para">
                <Link href={`/mobile_price_15000_to_30000`}>
                  {mobileDetail.mobile.brand} mobile price in Pakistan 20000 to 30000
                </Link>
              </li> */}
              {/* <li className="description-para">
                <Link href={"/mobile_price_15000_to_30000"}>
                  {mobileDetail.mobile.brand} mobile price in Pakistan 20000 to 40000
                </Link>
              </li> */}
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=30000&maxPrice=50000`}>
                  {mobileDetail.brand} mobile price in Pakistan 30000 to 50000
                </Link>
              </li>
              {/* <li className="description-para">
                <Link href="/mobile_price_40000_to_50000">
                  {mobileDetail.mobile.brand} mobile price in Pakistan 40000 to 60000
                </Link>
              </li> */}
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=50000&maxPrice=70000`}>
                  {mobileDetail.brand} mobile price in Pakistan 50000 to 70000
                </Link>
              </li>
              {/* <li className="description-para">
                <Link href="/mobile_price_50000_to_100000">
                  {mobileDetail.mobile.brand} mobile price in Pakistan 70000 to 80000
                </Link>
              </li> */}
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=80000&maxPrice=100000`}>
                  {mobileDetail.brand} mobile price in Pakistan 80000 to 100000
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul mx-1">
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=4&maxRam=4`}>{mobileDetail?.brand}{" "}4GB Ram Mobile Phones Price in Pakistan{" "}</Link>
              </li>
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=6&maxRam=6`}>{mobileDetail?.brand}{" "}6GB Ram Mobile Phones Price in Pakistan</Link>
              </li>
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=8&maxRam=8`}>{mobileDetail?.brand}{" "}8GB Ram Mobile Phones Price in Pakistan</Link>
              </li>
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=12&maxRam=12`}>{mobileDetail?.brand}{" "}12GB Ram Mobile Phones Price in Pakistan</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul">
              <li className="description-para">
                <Link href={`/AdvanceSearch?${mobileDetail?.brand}&storageMin=64&storageMax=64`}>{mobileDetail?.brand}{" "}64GB Rom Mobile Phones  Price in Pakistan</Link>
              </li>
              <li className="description-para">
                <Link href={`/AdvanceSearch?${mobileDetail?.brand}&storageMin=128&storageMax=128`}>{mobileDetail?.brand}{" "}128GB Rom Mobile Phones Price in Lahore</Link>
              </li>
              <li className="description-para">
                <Link href={`/AdvanceSearch?${mobileDetail?.brand}&storageMin=256&storageMax=256`}>{mobileDetail?.brand}{" "}256GB Rom Mobile Phones Price in Pakistan</Link>
              </li>
              <li className="description-para">
                <Link href={`/AdvanceSearch?${mobileDetail?.brand}&storageMin=1024&storageMax=1024`}>{mobileDetail?.brand}{" "}1TB Rom Mobile Phones Price in Pakistan</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul">
              <li className="description-para">
                <Link href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=20&backCamMax=29`}>{mobileDetail.brand}{" "} 20MP Camera Phones Price in Pakistan</Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?${mobileDetail?.brand}&backCamMin=30&backCamMax=49`}
                >
                 {mobileDetail.brand}{" "}30MP Camera Phones Price in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?${mobileDetail?.brand}&backCamMin=50&backCamMax=99`}
                >
                  {mobileDetail.brand}{" "}50MP Camera Phones Price in Pakistan
                </Link>{" "}
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?${mobileDetail?.brand}&backCamMin=100&backCamMax=99`}
                >
                  {mobileDetail.brand}{" "}100MP Camera Phones Price in Pakistan
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
        
        {/* other websites */}
        <div className="row">
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>MobileMate</h6>
            <ul className="description-ul">
              <li className="description-para">
                <Link href="https://www.mobilemate.io/">
                Mobile phone prices in Pakistan mobilemate
                </Link>
              </li>
              <li className="description-para">
                <Link href={`https://www.mobilemate.io/`}>
                Latest mobile phone prices in Pakistan mobilemate
                </Link>
              </li>
              <li className="description-para">
                <Link href={"https://www.mobilemate.io/"}>
                latest mobile Price list in Pakistan mobilemate
                </Link>
              </li>
              <li className="description-para">
                <Link href="https://www.mobilemate.io/OPPO">
                Oppo mobile phone price in Pakistan mobilemate
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>PriceOye</h6>
          <ul className="description-ul">
              <li className="description-para">
                <Link href="https://priceoye.pk/mobiles">
                Mobile phone prices in Pakistan PriceOye
                </Link>
              </li>
              <li className="description-para">
                <Link href={`https://priceoye.pk/mobiles`}>
                Latest mobile phone prices in Pakistan PriceOye
                </Link>
              </li>
              <li className="description-para">
                <Link href={"https://priceoye.pk/mobiles"}>
                latest mobile Price list in Pakistan PriceOye
                </Link>
              </li>
              <li className="description-para">
                <Link href="https://priceoye.pk/mobiles/oppo">
                Oppo mobile phone price in Pakistan PriceOye
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>WhatMobile</h6>
          <ul className="description-ul">
              <li className="description-para">
                <Link href="https://www.whatmobile.com.pk/">
                Mobile phone prices in Pakistan WhatMobile
                </Link>
              </li>
              <li className="description-para">
                <Link href={`https://www.whatmobile.com.pk/`}>
                Latest mobile phone prices in Pakistan WhatMobile
                </Link>
              </li>
              <li className="description-para">
                <Link href={"https://www.whatmobile.com.pk/"}>
                latest mobile Price list in Pakistan WhatMobile
                </Link>
              </li>
              <li className="description-para">
                <Link href="https://www.whatmobile.com.pk/Oppo_Mobiles_Prices">
                Oppo mobile phone price in Pakistan WhatMobile
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>HamariWeb</h6>
          <ul className="description-ul">
              <li className="description-para">
                <Link href="https://hamariweb.com/">
                Mobile phone prices in Pakistan HamariWeb
                </Link>
              </li>
              <li className="description-para">
                <Link href={`https://hamariweb.com/`}>
                Latest mobile phone prices in Pakistan HamariWeb
                </Link>
              </li>
              <li className="description-para">
                <Link href={"https://hamariweb.com/"}>
                latest mobile Price list in Pakistan HamariWeb
                </Link>
              </li>
              <li className="description-para">
                <Link href="https://hamariweb.com/mobiles/oppo">
                Oppo mobile phone price in Pakistan HamariWeb
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
export default PhoneDetail;
