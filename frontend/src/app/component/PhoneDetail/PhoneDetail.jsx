"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import image1 from "../../../../public/images/iphone.webp";
import "./PhoneDetail.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "next/navigation";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader"
import { useDispatch, useSelector } from "react-redux";
// const { register, handleSubmit, reset, formState: { errors } } = useForm();
import {
  fetchComments,
  fetchMobileDetail,
  selectAllComments,
  selectMobileDetail,
  submitComment,
} from "../../../../redux/mobileSlicer";
import Link from "next/link";
import Head from "next/head";

const PhoneDetail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setInterval(() => {
  //     setLoading(false);
  //   }, [3000]);
  // });

  // Local state for comment inputs
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const mobileDetail = useSelector(selectMobileDetail);
  const { comments } = useSelector(selectAllComments);
  const { slug } = useParams();
  const slugParts = slug.split("-");
  const newSlug = slugParts.join("-").replace(/-/g, " ");
  const brandName = slugParts[0].toUpperCase();
  const modelName = slugParts.slice(1).join("-").replace(/-/g, " ");
  useEffect(() => {
    dispatch(fetchMobileDetail(newSlug));
  }, [newSlug, dispatch]);

  useEffect(() => {
    dispatch(fetchComments( newSlug ));
  }, [loading, dispatch]);
  const features = mobileDetail?.Features.split(",").map((feature) =>
    feature.trim()
  );
  const Sound = mobileDetail?.Audio.split(",").map((feature) => feature.trim());
  const cam = mobileDetail?.Front.split(",").map((feature) => feature.trim());
  const MainDisplay = mobileDetail?.Main.split(",").map((feature) =>
    feature.trim()
  );

  // SEO Meta Data
  const pageTitle = `${mobileDetail?.model} Price in Pakistan 2025 - ${mobileDetail?.price} PKR | Specifications & Reviews`;
  const metaDescription = `${mobileDetail?.model} price in Pakistan is ${mobileDetail?.price} PKR. Check detailed specifications, ${mobileDetail?.Ram}GB RAM, ${mobileDetail?.Back_Cam}MP camera, ${mobileDetail?.Capacity}mAh battery. Compare prices across platforms.`;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(submitComment({ data: newComment, commentId: newSlug }))
      .then(() => {
        setNewComment({ name: "", email: "", comment: "" }); // Reset form after successful submission
        setLoading(!loading);
      })

      .catch((error) => {
        console.log("Failed to submit comment:", error);
      });
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty cases
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates
  
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const limitCharacters = (text, limit) => {
    return text?.length > limit ? text?.slice(0, limit) + "..." : text;
  };

  // JSON-LD Schema Markup
  const generateProductSchema = () => {
    if (!mobileDetail) return null;

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": mobileDetail.model,
      "brand": {
        "@type": "Brand",
        "name": brandName
      },
      "description": `${mobileDetail.model} features ${mobileDetail.Ram}GB RAM, ${mobileDetail.Rom}GB storage, ${mobileDetail.Back_Cam}MP main camera, ${mobileDetail.front_Cam}MP front camera, and ${mobileDetail.Capacity}mAh battery.`,
      "image": mobileDetail.imageSRC,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "PKR",
        "price": mobileDetail.price,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "MobilePrice.biz.pk"
        }
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "RAM",
          "value": `${mobileDetail.Ram}GB`
        },
        {
          "@type": "PropertyValue",
          "name": "Storage",
          "value": `${mobileDetail.Rom}GB`
        },
        {
          "@type": "PropertyValue",
          "name": "Main Camera",
          "value": `${mobileDetail.Back_Cam}MP`
        },
        {
          "@type": "PropertyValue",
          "name": "Battery",
          "value": `${mobileDetail.Capacity}mAh`
        },
        {
          "@type": "PropertyValue",
          "name": "Display Size",
          "value": `${mobileDetail.Size} inches`
        },
        {
          "@type": "PropertyValue",
          "name": "Operating System",
          "value": mobileDetail.OS
        }
      ]
    };

    return JSON.stringify(schema);
  };

  if (!mobileDetail)
    return (
      // <div className="loading__class">
      //   <DotLottieReact
      //     src="https://lottie.host/1911b01f-ab86-4a45-89c5-aab3f0d4e209/WcQ9e9ozxp.lottie"
      //     style={{ width: "200px", height: "200px" }}
      //     loop
      //     autoplay
      //   />
      // </div>
      <SkeletonLoader/>
    );
  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={mobileDetail.imageSRC} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={mobileDetail.imageSRC} />
        <link rel="canonical" href={`https://www.mobileprice.biz.pk/Mobile/${slug}`} />
        
        {/* JSON-LD Schema */}
        {generateProductSchema() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: generateProductSchema()
            }}
          />
        )}
      </Head>

      <article>
        {/* Breadcrumb Navigation */}
        {/* <nav aria-label="breadcrumb" className="breadcrumb-nav p-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/mobiles">Mobiles</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/brand/${brandName.toLowerCase()}`}>{brandName}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {mobileDetail?.model}
            </li>
          </ol>
        </nav> */}

        <section>
          <div className="col-xl-12 mt-3">
            {/* Main Product Header */}
            <header className="product-header mb-4">
              <h1 className="model__div px-2 mb-3 text-center">
                {mobileDetail?.model} Price in Pakistan 2025 - {mobileDetail?.price} PKR
              </h1>
            </header>

            <div className="d-flex  p-2 flex-column flex-lg-row justify-content-between align-items-center">
              <div className="w-100 justify-content-between d-none d-md-flex flex-row flex-lg-column gap-4 detail__features mb-lg-0 mb-3 mt-lg-0 mt-3">
                <div className="">
                  <h3>Network</h3>
                  <div className="green__div">
                    <div className="green__underline"></div>
                  </div>
                  <p>{mobileDetail?.["2G Band"] ? "2G Band" : ""}</p>
                  <p>{mobileDetail?.["3G Band"] ? "3G Band" : ""}</p>
                  <p>{mobileDetail?.["4G Band"] ? "4G Band" : ""}</p>
                  <p>{mobileDetail?.["5G Band"] ? "5G Band" : ""}</p>
                </div>
                <div>
                  <h3>Memory</h3>
                  <div className="green__div">
                    <div className="green__underline"></div>
                  </div>
                  <p>{mobileDetail?.Ram}GB RAM</p>
                  <p>{mobileDetail?.Rom}GB Storage</p>
                  {/* <p>128GB storage</p> */}
                </div>
                <div>
                  <h3>Features</h3>
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
                  <h3>Sound</h3>
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
                    <h4>Main Camera</h4>
                    <strong>{mobileDetail?.Back_Cam}MP</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>Brand</h4>
                    <strong>{brandName}</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>Bluetooth</h4>
                    <strong>{mobileDetail?.Bluetooth}</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>Weight</h4>
                    <strong>{mobileDetail?.weight}g</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>USB</h4>
                    <strong>{mobileDetail?.USB}</strong>
                    <div className="red__underline"></div>
                  </div>
                </div>
                <div className="w-50 text-center phone__picture__section">
                  <Image
                    src={mobileDetail?.imageSRC || image1}
                    height={500}
                    width={500}
                    alt={`${mobileDetail?.model} - ${brandName} smartphone image showing design and features`}
                    className=" custom-image"
                    priority
                  />
                  <div className="price__div px-2 mt-3">
                    <span className="price-label">Current Price:</span>
                    <h2 className="price-value">PKR {mobileDetail?.price}</h2>
                  </div>
                </div>
                <div className="d-flex flex-column gap-4 w-50 text-start imp__specs">
                  <div>
                    <h4>Screen Size</h4>
                    <strong>{mobileDetail?.Size} Inches</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>Resolution</h4>
                    <strong>{mobileDetail?.Resolution}</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>Colors</h4>
                    <strong>{mobileDetail?.Colors}</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>Front Camera</h4>
                    <strong>{mobileDetail?.front_Cam}MP</strong>
                    <div className="red__underline"></div>
                  </div>
                  <div>
                    <h4>Chipset</h4>
                    <strong>{mobileDetail?.Chipset}</strong>
                    <div className="red__underline"></div>
                  </div>
                </div>
              </div>
              <div className="w-100 justify-content-between d-none d-md-flex flex-row flex-lg-column gap-4 detail__features mb-lg-0 mb-3 mt-lg-0 mt-3">
                <div>
                  <h3>Camera</h3>
                  <div className="green__div">
                    <div className="green__underline"></div>
                  </div>
                  <p>{cam?.length > 0 && cam[0] && limitCharacters(cam[0], 20)}</p>
                  <p>{cam?.length > 0 && cam[1] && limitCharacters(cam[1], 20)}</p>
                  <p>{cam?.length > 0 && cam[2] && limitCharacters(cam[2], 20)}</p>
                </div>
                <div>
                  <h3>Battery</h3>
                  <div className="green__div">
                    <div className="green__underline"></div>
                  </div>
                  <p>{mobileDetail?.Capacity} mAh</p>
                  <p>{mobileDetail?.USB}</p>
                  {/* <p>128GB storage</p> */}
                </div>
                <div>
                  <h3>Main Display</h3>
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
                  <h3>Performance</h3>
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
                <h2 className="text-center mt-2 mb-2">
                  {mobileDetail?.model} Prices Comparison Across Different Platforms
                </h2>
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
                          <span className="fw-semibold">
                            {mobileDetail?.mobilemate_price === 0
                              ? "N/A"
                              : `${mobileDetail?.mobilemate_price} PKR`}
                          </span>
                        ) : (
                          <a target="_blank" href={mobileDetail?.mobilemate_link}>
                          {
                            mobileDetail?.mobilemate_price === 0
                              ? "N/A"
                              : `${mobileDetail?.mobilemate_price} PKR`
                          }
                          </a>
                        )}
                      </td>
                      <td>
                        {mobileDetail?.hamariweb_link === "N/A" ? (
                          <span className="fw-semibold">
                            {mobileDetail?.hamariweb_price === 0
                              ? "N/A"
                              : `${mobileDetail?.hamariweb_price} PKR`}
                          </span>
                        ) : (
                          <a target="_blank" href={mobileDetail?.hamariweb_link}>
                            {
                            mobileDetail?.hamariweb_price === 0
                              ? "N/A"
                              : `${mobileDetail?.hamariweb_price} PKR`
                           }
                              </a> 
                        )}
                      </td>

                      <td>
                        {mobileDetail?.whatmobile_link === "N/A" ? (
                          <span className="fw-semibold">
                            {mobileDetail?.whatmobile_price === 0
                              ? "N/A"
                              : `${mobileDetail?.whatmobile_price} PKR`}
                          </span>
                        ) : (
                          <a target="_blank" href={mobileDetail?.whatmobile_link}>
                          {
                            mobileDetail?.whatmobile_price === 0
                              ? "N/A"
                              : `${mobileDetail?.whatmobile_price} PKR`
                          }
                              </a>
                        )}
                      </td>
                      <td>
                        {mobileDetail?.priceoye_link === "N/A" ? (
                          <span className="fw-semibold">
                            {mobileDetail?.priceoye_price === 0
                              ? "N/A"
                              : `${mobileDetail?.priceoye_price} PKR`}
                          </span>
                        ) : (
                          <a target="_blank" href={mobileDetail?.priceoye_link}>
                          {
                            mobileDetail?.priceoye_price === 0
                              ? "N/A"
                              : `${mobileDetail?.priceoye_price} PKR`
                          }
                           </a> 
                        )}
                      </td>
                      <td>
                        {mobileDetail?.daraz_link === "N/A" ? (
                          <span className="fw-semibold">
                            {mobileDetail?.daraz_price === 0
                              ? "N/A"
                              : `${mobileDetail?.daraz_price} PKR`}
                          </span>
                        ) : (
                          <a target="_blank" href={mobileDetail?.daraz_link}>
                          {
                          mobileDetail?.daraz_price === 0
                              ? "N/A"
                              : `${mobileDetail?.daraz_price} PKR`
                          }
                              </a>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row gap-4 mt-4">
              {/* <div className="w-100 border product__all__specs">
                ad section
              </div> */}
              <div className="w-100 product__specs d-flex flex-column border">
                <h2 className="w-100 spec-head-div">{mobileDetail?.model} Complete Specifications</h2>
                <div className="p-3 w-100 d-flex align-items-start">
                  <h3 className="w-25 specs__head d-none d-md-block">Network</h3>
                  <div className="w-100 w-md-75">
                    <div className="row mb-2 gap-2 spec__subhead">
                      <div className="col-3 fw-bold">Technology</div>
                      <div className="col-8">
                        {" "}
                        <div>
                          {" "}
                          <strong>2G</strong>:{" "}
                          {mobileDetail?.["2G Band"]
                            ? mobileDetail?.["2G Band"]
                            : ""}
                        </div>
                        <p>
                          {" "}
                          <strong>3G</strong>:{" "}
                          {mobileDetail?.["3G Band"]
                            ? mobileDetail?.["3G Band"]
                            : ""}
                        </p>
                        <p>
                          {" "}
                          <strong>4G</strong>:{" "}
                          {mobileDetail?.["4G Band"]
                            ? mobileDetail?.["4G Band"]
                            : ""}
                        </p>
                        <p>
                          {" "}
                          <strong>5G</strong>:{" "}
                          {mobileDetail?.["5G Band"]
                            ? mobileDetail?.["5G Band"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="specs__underline"></div>
                <h3 className="w-100 spec-head-div">Main Camera</h3>
                <div className="p-3 w-100 d-flex align-items-start">
                  <h4 className="w-25 specs__head d-none d-md-block">
                    Main Camera
                  </h4>
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
                        {mobileDetail?.Features && `${mobileDetail?.Features}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="specs__underline"></div>
                <h3 className="w-100 spec-head-div">Selfie Camera</h3>
                <div className="p-3 w-100 d-flex align-items-start">
                  <h4 className="w-25 specs__head d-none d-md-block">
                    Selfie Camera
                  </h4>
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
                  <h4 className="w-25 specs__head d-none d-md-block">Sound</h4>
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
                <h3 className="w-100 spec-head-div">Connectivity</h3>
                <div className="p-3 w-100 d-flex align-items-start">
                  <h4 className="w-25 specs__head d-none d-md-block">Connectivity</h4>
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
                        {mobileDetail?.Bluetooth && mobileDetail?.Bluetooth}
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
                  <h4 className="w-25 specs__head d-none d-md-block">Features</h4>
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
                        {mobileDetail?.Sensors && mobileDetail?.Sensors}
                      </p>
                    </div>
                    <div className="row mb-2 gap-2 spec__subhead">
                      <div className="col-3 fw-bold">
                        {mobileDetail?.Technology && "Technology"}
                      </div>
                      <p className="col-8">
                        {mobileDetail?.Technology && mobileDetail?.Technology}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="specs__underline"></div>
              </div>
            </div>

            {/* Enhanced Product Description */}
            <section className="product-description mt-5">
              <div className="row">
                <div className="col-md-12 my-4">
                  <header>
                    <h2 className="product-overview-title mb-4">
                      {mobileDetail?.model} Overview - Complete Review & Price Analysis
                    </h2>
                  </header>
                  
                  <div className="price-summary mb-4 p-3 border rounded">
                    <h3 className="price-heading mb-3">Current Market Pricing</h3>
                    <ul className="price-list">
                      <li className="price-item">
                        <Link
                          href={`/Mobile/${mobileDetail.model?.replace(/ /g, "-")}`}
                          className="fw-bold product-link"
                        >
                          {mobileDetail.model}
                        </Link>
                        {" "}price in Pakistan: 
                        <span className="fw-bold price-highlight"> PKR {mobileDetail.price}</span>
                      </li>
                      <li className="price-item">
                        <Link
                          href={`/Mobile/${mobileDetail?.model?.replace(/ /g, "-")}`}
                          className="fw-bold product-link"
                        >
                          {mobileDetail.model}
                        </Link>
                        {" "}price in USD: 
                        <span className="fw-bold price-highlight"> ${mobileDetail.PriceInUsd}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="product-detailed-description">
                    <h3 className="description-heading">Key Features & Specifications</h3>
                    <p className="description-text">
                      The <strong className="product-name">{mobileDetail.model}</strong> stands out in Pakistan's competitive smartphone market with its impressive combination of performance and value. 
                      Powered by the advanced <strong className="spec-highlight">{mobileDetail.Chipset}</strong> chipset, this device delivers exceptional processing power for both daily tasks and demanding applications.
                    </p>

                    <h4 className="feature-subheading">Display & Design</h4>
                    <p className="description-text">
                      Featuring a stunning <strong className="spec-highlight">{mobileDetail.Size}-inch</strong> display with <strong className="spec-highlight">{mobileDetail.Resolution}</strong> resolution, 
                      the {mobileDetail.model} offers crisp visuals and vibrant colors. The device maintains a compact form factor with dimensions of <strong className="spec-highlight">{mobileDetail.Dimensions}</strong>, 
                      making it comfortable for one-handed use while running the latest <strong className="spec-highlight">{mobileDetail.OS}</strong> operating system.
                    </p>

                    <h4 className="feature-subheading">Performance & Memory</h4>
                    <p className="description-text">
                      Under the hood, the <strong className="product-name">{mobileDetail?.model}</strong> packs <strong className="spec-highlight">{mobileDetail?.Ram}GB</strong> of RAM 
                      paired with <strong className="spec-highlight">{mobileDetail?.Rom}GB</strong> of internal storage, ensuring smooth multitasking and ample space for your apps, photos, and media files.
                    </p>

                    <h4 className="feature-subheading">Camera System</h4>
                    <p className="description-text">
                      Photography enthusiasts will appreciate the versatile camera system featuring a <strong className="spec-highlight">{mobileDetail?.Back_Cam}MP</strong> main camera 
                      that captures detailed photos in various lighting conditions. The <strong className="spec-highlight">{mobileDetail?.front_Cam}MP</strong> front-facing camera 
                      ensures high-quality selfies and video calls.
                    </p>

                    <h4 className="feature-subheading">Battery & Connectivity</h4>
                    <p className="description-text">
                      Powering through your day is made easy with the substantial <strong className="spec-highlight">{mobileDetail?.Capacity}mAh</strong> battery capacity, 
                      providing all-day usage without frequent charging interruptions. The device supports modern connectivity options and features, 
                      making the <strong className="product-name">{mobileDetail?.model}</strong> an excellent choice for users seeking reliability, 
                      performance, and value in the Pakistani smartphone market.
                    </p>

                    <div className="availability-info mt-4 p-3 bg-light rounded">
                      <h4 className="availability-heading">Availability & Purchase Options</h4>
                      <p>The {mobileDetail?.model} is available across multiple platforms in Pakistan. Compare prices above to find the best deal from authorized retailers including PriceOye, WhatMobile, Daraz, and other trusted sources.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Products & Categories */}
              <aside className="related-categories mt-4">
                <h3 className="related-heading mb-4">Explore More {mobileDetail.brand} Mobile Phones</h3>
                <div className="row">
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="category-heading">Price Categories</h4>
                    <ul className="category-list">
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=15000&maxPrice=30000`}
                          className="category-link"
                        >
                          {mobileDetail.brand} mobiles PKR 15,000 to 30,000
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=30000&maxPrice=50000`}
                          className="category-link"
                        >
                          {mobileDetail.brand} mobiles PKR 30,000 to 50,000
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=50000&maxPrice=70000`}
                          className="category-link"
                        >
                          {mobileDetail.brand} mobiles PKR 50,000 to 70,000
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=80000&maxPrice=100000`}
                          className="category-link"
                        >
                          {mobileDetail.brand} mobiles PKR 80,000 to 100,000
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="category-heading">RAM Categories</h4>
                    <ul className="category-list">
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=4&maxRam=4`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 4GB RAM mobile phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=6&maxRam=6`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 6GB RAM mobile phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=8&maxRam=8`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 8GB RAM mobile phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=12&maxRam=12`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 12GB RAM mobile phones
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="category-heading">Storage Options</h4>
                    <ul className="category-list">
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=64&storageMax=64`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 64GB storage phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=128&storageMax=128`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 128GB storage phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=256&storageMax=256`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 256GB storage phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=1024&storageMax=1024`}
                          className="category-link"
                        >
                          {mobileDetail?.brand} 1TB storage phones
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="category-heading">Camera Specifications</h4>
                    <ul className="category-list">
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=20&backCamMax=29`}
                          className="category-link"
                        >
                          {mobileDetail.brand} 20MP camera phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=30&backCamMax=49`}
                          className="category-link"
                        >
                          {mobileDetail.brand} 30MP camera phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=50&backCamMax=99`}
                          className="category-link"
                        >
                          {mobileDetail.brand} 50MP camera phones
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=100&backCamMax=99`}
                          className="category-link"
                        >
                          {mobileDetail.brand} 100MP camera phones
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              {/* External Platform Links */}
              <aside className="external-platforms mt-5">
                <h3 className="platforms-heading mb-4">Compare Prices Across Major Platforms</h3>
                <div className="row">
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="platform-name">MobileMate</h4>
                    <ul className="platform-links">
                      <li className="platform-link-item">
                        <a href="https://www.mobilemate.io/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile phone prices in Pakistan - MobileMate
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://www.mobilemate.io/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Latest mobile phone prices - MobileMate
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://www.mobilemate.io/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile price list Pakistan - MobileMate
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://www.mobilemate.io/OPPO" target="_blank" rel="noopener noreferrer" className="platform-link">
                          OPPO mobile prices - MobileMate
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="platform-name">PriceOye</h4>
                    <ul className="platform-links">
                      <li className="platform-link-item">
                        <a href="https://priceoye.pk/mobiles" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile phone prices in Pakistan - PriceOye
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://priceoye.pk/mobiles" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Latest mobile phone prices - PriceOye
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://priceoye.pk/mobiles" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile price list Pakistan - PriceOye
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://priceoye.pk/mobiles/oppo" target="_blank" rel="noopener noreferrer" className="platform-link">
                          OPPO mobile prices - PriceOye
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="platform-name">WhatMobile</h4>
                    <ul className="platform-links">
                      <li className="platform-link-item">
                        <a href="https://www.whatmobile.com.pk/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile phone prices in Pakistan - WhatMobile
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://www.whatmobile.com.pk/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Latest mobile phone prices - WhatMobile
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://www.whatmobile.com.pk/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile price list Pakistan - WhatMobile
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://www.whatmobile.com.pk/Oppo_Mobiles_Prices" target="_blank" rel="noopener noreferrer" className="platform-link">
                          OPPO mobile prices - WhatMobile
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
                    <h4 className="platform-name">HamariWeb</h4>
                    <ul className="platform-links">
                      <li className="platform-link-item">
                        <a href="https://hamariweb.com/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile phone prices in Pakistan - HamariWeb
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://hamariweb.com/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Latest mobile phone prices - HamariWeb
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://hamariweb.com/" target="_blank" rel="noopener noreferrer" className="platform-link">
                          Mobile price list Pakistan - HamariWeb
                        </a>
                      </li>
                      <li className="platform-link-item">
                        <a href="https://hamariweb.com/mobiles/oppo" target="_blank" rel="noopener noreferrer" className="platform-link">
                          OPPO mobile prices - HamariWeb
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </section>
          </div>

          {/* Comments Section */}
          <section className="comments-section-container max-w-4xl mx-auto mt-10 mb-4">
            <div className="comments-section mt-8 p-8 border border-gray-300 rounded-lg bg-white shadow-md">
              <header>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2 border-gray-200">
                  User Reviews & Comments for {mobileDetail?.model}
                </h2>
              </header>

              {/* Add New Comment Form */}
              <form
                onSubmit={handleCommentSubmit}
                className="comment-form gap-6 flex flex-wrap mb-6"
                aria-label="Submit a review or comment"
              >
                <div className="w-100">
                  <label htmlFor="comment-text" className="form-label sr-only">Your Comment</label>
                  <textarea
                    id="comment-text"
                    placeholder="Share your experience with this mobile phone..."
                    value={newComment.comment}
                    onChange={(e) =>
                      setNewComment({ ...newComment, comment: e.target.value })
                    }
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none min-h-[80px]"
                  />
                </div>
                <div className="form-row w-100 d-flex gap-3">
                  <div className="form-group flex-1">
                    <label htmlFor="commenter-name" className="form-label sr-only">Your Name</label>
                    <input
                      id="commenter-name"
                      type="text"
                      placeholder="Your Name"
                      value={newComment.name}
                      onChange={(e) =>
                        setNewComment({ ...newComment, name: e.target.value })
                      }
                      required
                      className="w-100 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 h-[40px]"
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="commenter-email" className="form-label sr-only">Your Email</label>
                    <input
                      id="commenter-email"
                      type="email"
                      placeholder="Your Email"
                      value={newComment.email}
                      onChange={(e) =>
                        setNewComment({ ...newComment, email: e.target.value })
                      }
                      required
                      className="w-100 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 h-[40px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1eb8db] text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 h-[40px] whitespace-nowrap"
                  >
                    Post Review
                  </button>
                </div>
              </form>

              {/* Display Comments */}
              <div className="comments-display">
                <h3 className="comments-heading mb-4">Customer Reviews ({comments.length})</h3>
                <ul className="comments-list space-y-6 mb-8">
                  {comments.length > 0 ? (
                    comments
                      .slice()
                      .reverse()
                      .slice(0, 10)
                      .map((comment, index) => (
                        <li
                          key={index}
                          className="comment-item bg-gray-100 p-4 rounded-lg shadow-sm"
                        >
                          <div className="comment-header flex items-center mb-2">
                            <strong className="commenter-name text-gray-800 text-lg mr-2">
                              {comment.name}
                            </strong>
                            <span className="commenter-email text-sm text-gray-500">
                              ({comment.email})
                            </span>
                          </div>
                          <p className="comment-content text-gray-700">{comment.comment}</p>
                        </li>
                      ))
                  ) : (
                    <li className="no-comments text-gray-500 italic text-center py-8">
                      No reviews yet. Be the first to share your experience with the {mobileDetail?.model}!
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </section>
      </article>
    </>
  );
};
export default PhoneDetail;