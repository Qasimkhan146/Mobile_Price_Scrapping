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
  const features = mobileDetail?.mobile?.Features.split(",").map((feature) =>
    feature.trim()
  );
  const Sound = mobileDetail?.mobile?.Audio.split(",").map((feature) =>
    feature.trim()
  );
  const cam = mobileDetail?.mobile?.Front.split(",").map((feature) =>
    feature.trim()
  );
  const MainDisplay = mobileDetail?.mobile?.Main.split(",").map((feature) =>
    feature.trim()
  );

  const sources = mobileDetail?.prices.map((price) => price.source);
  console.log("Sources", sources);

  const limitCharacters = (text, limit) => {
    return text?.length > limit ? text?.slice(0, limit) + "..." : text;
  };
  if (loading)
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
              <p>{mobileDetail?.mobile["2G Band"] ? "2G Band" : ""}</p>
              <p>{mobileDetail?.mobile["3G Band"] ? "3G Band" : ""}</p>
              <p>{mobileDetail?.mobile["4G Band"] ? "4G Band" : ""}</p>
              <p>{mobileDetail?.mobile["5G Band"] ? "5G Band" : ""}</p>
            </div>
            <div>
              <h5>Memory</h5>
              <div className="green__div">
                <div className="green__underline"></div>
              </div>
              <p>{mobileDetail?.mobile.Ram}GB RAM</p>
              <p>{mobileDetail?.mobile.Rom}GB Storage</p>
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
                <b>{mobileDetail?.mobile.Back_Cam}MP</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Brand</h5>
                <b>{brandName}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Bluetooth</h5>
                <b>{mobileDetail?.mobile.Bluetooth}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Weight</h5>
                <b>{mobileDetail?.mobile.weight}g</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>USB</h5>
                <b>{mobileDetail?.mobile.USB}</b>
                <div className="red__underline"></div>
              </div>
            </div>
            <div className="w-50 text-center phone__picture__section">
            <h3 className="model__div px-2 mb-2">{mobileDetail?.mobile.model}</h3>

              <Image
                src={mobileDetail?.mobile.imageSRC || image1}
                height={500}
                width={500}
                alt="main-section"
                className=" custom-image"
              />
              <h3 className="price__div px-2">
                RS: {mobileDetail?.mobile.price}
              </h3>
            </div>
            <div className="d-flex flex-column gap-4 w-50 text-start imp__specs">
              <div>
                <h5>Screen Size</h5>
                <b>{mobileDetail?.mobile.Size} Inches</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Resolution</h5>
                <b>{mobileDetail?.mobile.Resolution}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Color's</h5>
                <b>{mobileDetail?.mobile.Colors}</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Front Len's</h5>
                <b>{mobileDetail?.mobile.front_Cam}MP</b>
                <div className="red__underline"></div>
              </div>
              <div>
                <h5>Chipset</h5>
                <b>{mobileDetail?.mobile.Chipset}</b>
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
              <p>{mobileDetail?.mobile.Capacity} MAH</p>
              <p>{mobileDetail?.mobile.USB}</p>
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
              <p>{limitCharacters(mobileDetail?.mobile.CPU, 20)}</p>
              <p>{mobileDetail?.mobile.Ram}GB RAM</p>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center flex-column align-items-center">
          <div className="table-responsive w-100 table__container">
            <h3 className="text-center mt-2 mb-2">
              Prices on Different Platforms
            </h3>
            <table className="table border-1 d-none d-md-table table-striped">
              {/* <caption>More Results</caption> */}
              <thead className="content__heads">
                <tr>
                  {/* <th scope="col">Mobiles</th> */}
                  {/* Dynamically render <th> for each source */}
                  {sources?.length > 0 &&
                    sources?.map((source, index) => (
                      <th key={index} scope="col">
                        {source}
                      </th>
                    ))}
                  <th scope="col">MobileMate</th>
                  <th scope="col">PriceOye</th>
                </tr>
              </thead>
              <tbody>
                <tr className="content__tr">
                  {mobileDetail &&
                    mobileDetail?.prices?.map((mobile, index) => (
                      <td key={index}>
                        <a target="_blank" href={mobile.href}>
                          {mobile.price} PKR
                        </a>
                      </td>
                    ))}
                  <td>Coming Soon</td>
                  <td>Coming Soon</td>
                </tr>
              </tbody>
            </table>
            <table className="w-100 table border-1 d-md-none table-striped">
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
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={mobile.href}
                        >
                          {mobile.price} PKR
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
                      {mobileDetail?.mobile["2G Band"]
                        ? mobileDetail?.mobile["2G Band"]
                        : ""}
                    </div>
                    <p>
                      {" "}
                      <b>3G</b>:{" "}
                      {mobileDetail?.mobile["3G Band"]
                        ? mobileDetail?.mobile["3G Band"]
                        : ""}
                    </p>
                    <p>
                      {" "}
                      <b>4G</b>:{" "}
                      {mobileDetail?.mobile["4G Band"]
                        ? mobileDetail?.mobile["4G Band"]
                        : ""}
                    </p>
                    <p>
                      {" "}
                      <b>5G</b>:{" "}
                      {mobileDetail?.mobile["5G Band"]
                        ? mobileDetail?.mobile["5G Band"]
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
                    {mobileDetail?.mobile?.Dimensions && "Dimensions"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Dimensions &&
                      mobileDetail?.mobile?.Dimensions}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.weight && "Weight"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.weight &&
                      mobileDetail?.mobile?.weight}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.SIM && "SIM"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.SIM && mobileDetail?.mobile?.SIM}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Dimensions && "Dimensions"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Dimensions &&
                      mobileDetail?.mobile?.Dimensions}
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
                    {mobileDetail?.mobile?.Protection && "Protection"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Protection &&
                      mobileDetail?.mobile?.Protection}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Size && "Size"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Size &&
                      `${mobileDetail?.mobile?.Size}Inches`}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Resolution && "Resolution"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Resolution &&
                      mobileDetail?.mobile?.Resolution}
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
                    {mobileDetail?.mobile?.OS && "OS"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.OS && mobileDetail?.mobile?.OS}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.GPU && "GPU"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.GPU &&
                      `${mobileDetail?.mobile?.GPU}`}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.CPU && "CPU"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.CPU && mobileDetail?.mobile?.CPU}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Chipset && "Chipset"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Chipset &&
                      mobileDetail?.mobile?.Chipset}
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
                    {mobileDetail?.mobile?.Card && "Card Slot"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.OS && mobileDetail?.mobile?.Card}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3  fw-bold">
                    {mobileDetail?.mobile["Built-in"] && "Internal"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile["Built-in"] &&
                      `${mobileDetail?.mobile["Built-in"]}`}
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
                    {mobileDetail?.mobile?.Main && "Camera"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Main && mobileDetail?.mobile?.Main}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Features && "Features"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Features &&
                      `${mobileDetail?.mobile?.Features}`}
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
                    {mobileDetail?.mobile?.Front && "Front"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Front && mobileDetail?.mobile?.Front}
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
                    {mobileDetail?.mobile?.Audio && "Audio"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Audio && mobileDetail?.mobile?.Audio}
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
                    {mobileDetail?.mobile?.WLAN && "WLAN"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.WLAN && mobileDetail?.mobile?.WLAN}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Bluetooth && "Bluetooth"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Bluetooth &&
                      mobileDetail?.mobile?.Bluetooth}
                  </p>
                </div>
                <div className="row mb-2 spec__subhead">
                  <div className="col-3 gap-2 fw-bold">
                    {mobileDetail?.mobile?.GPS && "GPS"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.GPS && mobileDetail?.mobile?.GPS}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Radio && "Radio"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Radio && mobileDetail?.mobile?.Radio}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.USB && "USB"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.USB && mobileDetail?.mobile?.USB}
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
                    {mobileDetail?.mobile?.Extra && "Extra Features"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Extra && mobileDetail?.mobile?.Extra}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Sensors && "Sensors"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Sensors &&
                      mobileDetail?.mobile?.Sensors}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.mobile?.Technology && "Technology"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.mobile?.Technology &&
                      mobileDetail?.mobile?.Technology}
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
                {/* <Link
                    href={`/${mobileDetail?.brand?.toUpperCase()}`}
                    className="fw-bold"
                  >
                    {mobileDetail.brand}{" "}
                  </Link> */}
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}/${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                  className="fw-bold"
                >
                  {mobileDetail.mobile.model}{" "}
                </Link>
                Prices in Pakistan 2024
              </h2>
            </div>
            <ul>
              <li>
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}`}
                  className="fw-bold"
                >
                  {mobileDetail.mobile.model}{" "}
                </Link>
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}/${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                  className="fw-bold"
                >
                  {mobileDetail.model}{" "}
                </Link>
                Price in Pakistan: PKR.
                <span className="fw-bold"> {mobileDetail.mobile.price}</span>
              </li>
              <li>
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}`}
                  className="fw-bold"
                >
                  {mobileDetail.brand}{" "}
                </Link>
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}/${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                  className="fw-bold"
                >
                  {mobileDetail.model}{" "}
                </Link>
                Price in USD:${" "}
                <span className="fw-bold">
                  {mobileDetail.mobile.PriceInUsd}
                </span>
              </li>
            </ul>
            The <span className="fw-bold"> {mobileDetail.mobile.model}</span> is
            powered by{" "}
            <span className="fw-bold">{mobileDetail.mobile.brand}</span>
            {"'"}s , providing exceptional performance for all your daily
            activities and multitasking. Running on{" "}
            <span className="fw-bold">{mobileDetail.mobile.os}</span>, this{" "}
            <span className="fw-bold">{mobileDetail.mobile.model}</span> boasts{" "}
            <span className="fw-bold">{mobileDetail.mobile.brand}</span>
            {"'"}s signature sleek and premium design, measuring{" "}
            <span className="fw-bold">{mobileDetail.mobile.Dimensions}</span>,
            making it not only stylish but also comfortable to handle. The{" "}
            <span className="fw-bold">{mobileDetail.mobile.model}</span>{" "}
            features a{" "}
            <span className="fw-bold">{mobileDetail.mobile.Size}</span> inch
            Retina display with a resolution of{" "}
            <span className="fw-bold">{mobileDetail.mobile.Resolution}</span>,
            offers an immersive and crystal clear visual experience, perfect for
            streaming, gaming, or everyday use. Under the hood, the{" "}
            <span className="fw-bold">{mobileDetail.mobile.model}</span>{" "}
            includes <span className="fw-bold">{mobileDetail.mobile.Ram}</span>{" "}
            GB of RAM and{" "}
            <span className="fw-bold">{mobileDetail.mobile.Rom}</span> GB of
            internal storage, ensuring ample space for your apps, media, and
            files. The{" "}
            <span className="fw-bold">{mobileDetail.mobile.model}</span> excels
            in photography, featuring a{" "}
            <span className="fw-bold">{mobileDetail.mobile.Back_Cam}</span> MP
            rear camera that captures professional quality photos and a{" "}
            <span className="fw-bold">{mobileDetail.mobile.front_Cam}</span> MP
            front camera for stunning selfies and FaceTime calls. Additionally,
            the long lasting{" "}
            <span className="fw-bold">{mobileDetail.mobile.Capacity}</span> mAh
            battery ensures you can enjoy uninterrupted usage throughout the day
            without needing frequent recharges. The{" "}
            <span className="fw-bold">
              {mobileDetail.mobile.brand} {mobileDetail.mobile.model}
            </span>{" "}
            is the perfect blend of cutting edge technology, style, and
            reliability, making it an ideal choice for anyone seeking a high
            performance smartphone.
          </div>
        </div>
        <div className="row">
          
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>MobileMate</h6>
            <ul className="description-ul">
              <li className="description-para">
                <Link href="/mobile_price_15000_to_30000">
                  {mobileDetail.mobile.brand} mobile price in Pakistan 15000 to 30000
                </Link>
              </li>
              <li className="description-para">
                <Link href={`/mobile_price_15000_to_30000`}>
                  {mobileDetail.mobile.brand} mobile price in Pakistan 20000 to 30000
                </Link>
              </li>
              <li className="description-para">
                <Link href={"/mobile_price_15000_to_30000"}>
                  {mobileDetail.brand} mobile price in Pakistan 20000 to 40000
                </Link>
              </li>
              <li className="description-para">
                <Link href="/mobile_price_30000_to_40000">
                  {mobileDetail.brand} mobile price in Pakistan 30000 to 50000
                </Link>
              </li>
              <li className="description-para">
                <Link href="/mobile_price_40000_to_50000">
                  {mobileDetail.brand} mobile price in Pakistan 40000 to 60000
                </Link>
              </li>
              <li className="description-para">
                <Link href="/mobile_price_50000_to_100000">
                  {mobileDetail.brand} mobile price in Pakistan 50000 to 70000
                </Link>
              </li>
              <li className="description-para">
                <Link href="/mobile_price_50000_to_100000">
                  {mobileDetail.brand} mobile price in Pakistan 70000 to 80000
                </Link>
              </li>
              <li className="description-para">
                <Link href="/mobile_price_50000_to_100000">
                  {mobileDetail.brand} mobile price in Pakistan 80000 to 100000
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>PriceOye</h6>
            <ul className="description-ul mx-1">
              <li className="description-para">
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}/${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  {mobileDetail.brand} {mobileDetail.model} Price in Pakistan{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}/${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  {mobileDetail.brand} {mobileDetail.model} price in Lahore{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/Phone/${mobileDetail?.brand?.toUpperCase()}-${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  {mobileDetail.brand} {mobileDetail.model} used phone in
                  Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/Phone/${mobileDetail?.brand?.toUpperCase()}-${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  {mobileDetail.brand} {mobileDetail.model} PTA approved price
                  in Pakistan{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/Phone/${mobileDetail?.brand?.toUpperCase()}-${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  {mobileDetail.brand} {mobileDetail.model} non PTA price in
                  Pakistan{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/${mobileDetail?.brand?.toUpperCase()}/${mobileDetail?.model?.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  {mobileDetail.brand} {mobileDetail.model} new phone price in
                  Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link href={`/${mobileDetail?.brand?.toUpperCase()}`}>
                  Latest {mobileDetail.brand} mobile phones in Pakistan{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link href={`/${mobileDetail?.brand?.toUpperCase()}`}>
                  {mobileDetail.brand} new Mobile Price in Pakistan
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>WhatMobile</h6>
            <ul className="description-ul">
              <li className="description-para">
                <Link href={`/Phone/${mobileDetail?.brand?.toUpperCase()} `}>
                  {mobileDetail.brand} used mobile phones prices in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/advancesearch?brand=${mobileDetail?.brand?.toUpperCase()}&city=Lahore`}
                >
                  {mobileDetail.brand} used mobile phone for sale in Lahore{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/advancesearch?brand=${mobileDetail?.brand?.toUpperCase()}&city=&city=Karachi`}
                >
                  {mobileDetail.brand} used mobile phone for sale in Karachi
                </Link>{" "}
              </li>
              <li className="description-para">
                <Link
                  href={`/advancesearch?brand=${mobileDetail?.brand?.toUpperCase()}&city=&city=Islamabad`}
                >
                  {mobileDetail.brand} used mobile phone for sale in Islamabad
                </Link>
              </li>
              <li className="description-para">
                <Link href="/News">{mobileDetail.brand} mobile phone news</Link>
              </li>
              <li className="description-para">
                <Link href="/Reviews">
                  {mobileDetail.brand} mobile phone reviews
                </Link>
              </li>
              <li className="description-para">
                <Link href="/Compare">
                  Compare {mobileDetail.brand} mobile phones
                </Link>
              </li>
              <li className="description-para">
                <Link href="/AdvanceSearch">
                  Search {mobileDetail.brand} phones by Advance Search{" "}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
          <h6>HamariWeb</h6>
            <ul className="description-ul">
              <li className="description-para">
                <Link href={`/Phone/${mobileDetail?.brand?.toUpperCase()} `}>
                  {mobileDetail.brand} used mobile phones prices in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/advancesearch?brand=${mobileDetail?.brand?.toUpperCase()}&city=Lahore`}
                >
                  {mobileDetail.brand} used mobile phone for sale in Lahore{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/advancesearch?brand=${mobileDetail?.brand?.toUpperCase()}&city=&city=Karachi`}
                >
                  {mobileDetail.brand} used mobile phone for sale in Karachi
                </Link>{" "}
              </li>
              <li className="description-para">
                <Link
                  href={`/advancesearch?brand=${mobileDetail?.brand?.toUpperCase()}&city=&city=Islamabad`}
                >
                  {mobileDetail.brand} used mobile phone for sale in Islamabad
                </Link>
              </li>
              <li className="description-para">
                <Link href="/News">{mobileDetail.brand} mobile phone news</Link>
              </li>
              <li className="description-para">
                <Link href="/Reviews">
                  {mobileDetail.brand} mobile phone reviews
                </Link>
              </li>
              <li className="description-para">
                <Link href="/Compare">
                  Compare {mobileDetail.brand} mobile phones
                </Link>
              </li>
              <li className="description-para">
                <Link href="/AdvanceSearch">
                  Search {mobileDetail.brand} phones by Advance Search{" "}
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
