"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import image1 from "../../../../public/images/iphone.webp";
import "./PhoneDetail.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "next/navigation";
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
  console.log("newSlug", newSlug);
  const brandName = slugParts[0].toUpperCase();
  const modelName = slugParts.slice(1).join("-").replace(/-/g, " ");
  useEffect(() => {
    dispatch(fetchMobileDetail(newSlug));
    // dispatch(fetchComments({ model: newSlug }));
  }, [newSlug, dispatch]);

  useEffect(() => {
    dispatch(fetchComments( newSlug ));
    // setLoading(false)
  }, [loading, dispatch]);
  // console.log(mobileDetail, "mobileDetail");
  const features = mobileDetail?.Features.split(",").map((feature) =>
    feature.trim()
  );
  const Sound = mobileDetail?.Audio.split(",").map((feature) => feature.trim());
  const cam = mobileDetail?.Front.split(",").map((feature) => feature.trim());
  const MainDisplay = mobileDetail?.Main.split(",").map((feature) =>
    feature.trim()
  );

  // const sources = mobileDetail?.prices.map((price) => price.source);
  // console.log("Sources", sources);

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
              <h3 className="price__div px-2">RS: {mobileDetail?.price}</h3>
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
                      <span className="fw-semibold">
                        {mobileDetail?.mobilemate_price === 0
                          ? "N/A"
                          : `${mobileDetail?.mobilemate_price} PKR`}
                      </span>
                    ) : (
                      <a target="_blank" href={mobileDetail?.mobilemate_link}>
                        {mobileDetail?.mobilemate_price === 0
                          ? "N/A"
                          : `${mobileDetail?.mobilemate_price} PKR`}
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
                        {mobileDetail?.hamariweb_price === 0
                          ? "N/A"
                          : `${mobileDetail?.hamariweb_price} PKR`}
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
                        {mobileDetail?.whatmobile_price === 0
                          ? "N/A"
                          : `${mobileDetail?.whatmobile_price} PKR`}
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
                        {mobileDetail?.priceoye_price === 0
                          ? "N/A"
                          : `${mobileDetail?.priceoye_price} PKR`}
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
                        {mobileDetail?.daraz_price === 0
                          ? "N/A"
                          : `${mobileDetail?.daraz_price} PKR`}
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
                  <p className="col-8">
  {mobileDetail?.release
    ? new Date(mobileDetail.release).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A"}
</p>

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
                    {mobileDetail?.Dimensions && mobileDetail?.Dimensions}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.weight && "Weight"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.weight && mobileDetail?.weight}
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
                    {mobileDetail?.Dimensions && mobileDetail?.Dimensions}
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
                    {mobileDetail?.Protection && mobileDetail?.Protection}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Size && "Size"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Size && `${mobileDetail?.Size}Inches`}
                  </p>
                </div>
                <div className="row mb-2 gap-2 spec__subhead">
                  <div className="col-3 fw-bold">
                    {mobileDetail?.Resolution && "Resolution"}
                  </div>
                  <p className="col-8">
                    {mobileDetail?.Resolution && mobileDetail?.Resolution}
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
                    {mobileDetail?.GPU && `${mobileDetail?.GPU}`}
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
                    {mobileDetail?.Chipset && mobileDetail?.Chipset}
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
                    {mobileDetail?.Features && `${mobileDetail?.Features}`}
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
        <div className="row">
          <div className="col-md-12 my-4">
            <div>
              <h2 className="fs-6">
                <Link
                  href={`/Mobile/${mobileDetail?.model?.replace(/ /g, "-")}`}
                  className="fw-bold"
                >
                  {mobileDetail?.model}{" "}
                </Link>
                Price in Pakistan 2025
              </h2>
            </div>
            <ul className="custom-list">
              <li className="ms-4">
                <Link
                  href={`/Mobile/${mobileDetail.model?.replace(/ /g, "-")}`}
                  className="fw-bold"
                >
                  {mobileDetail.model}{" "}
                </Link>
                Price in Pakistan: PKR.
                <span className="fw-bold"> {mobileDetail.price}</span>
              </li>
              <li className="ms-4">
                <Link
                  href={`/Mobile/${mobileDetail?.model?.replace(/ /g, "-")}`}
                  className="fw-bold"
                >
                  {mobileDetail.brand}{" "}
                </Link>
                <Link
                  href={`/Mobile/${mobileDetail?.model?.replace(/ /g, "-")}`}
                  className="fw-bold"
                >
                  {mobileDetail?.model}{" "}
                </Link>
                Price in USD:${" "}
                <span className="fw-bold">{mobileDetail?.PriceInUsd}</span>
              </li>
            </ul>
          <span className="fw-bold">{mobileDetail?.model}{" "}</span> is a mobile phone that combines style, performance, design and reliability. Driven by cutting-edge processor and running on the latest operating system <span className="fw-bold">{mobileDetail?.OS}</span> OS, this device is designed to perform daily activities with ease. Its smooth design, measuring
          <span className="fw-bold">{mobileDetail?.Dimensions}</span>, ensures a comfortable grip and a premium feel.
Featuring a <span className="fw-bold">{mobileDetail?.Size}</span>-inch Retina display with a resolution of <span className="fw-bold">{mobileDetail?.Resolution}</span>, the
{" "}<span className="fw-bold">{mobileDetail?.model}</span>{" "} brings stunning visuals, making it flawless for gaming, video streaming, or everyday use. This phone comes with <span className="fw-bold">{mobileDetail?.Rom}</span>GB of internal storage and <span className="fw-bold">{mobileDetail?.Ram}</span>GB of RAM, offering sufficient space for your downloaded apps, files, and media.
In terms of taking pictures, the <span className="fw-bold">{mobileDetail?.model}</span> claims a <span className="fw-bold">{mobileDetail?.Back_Cam}</span>MP rear camera for professional-quality photos and a <span className="fw-bold">{mobileDetail?.front_Cam}</span>MP front camera for classy selfies and video calls. Its powerful <span className="fw-bold">{mobileDetail?.Capacity}</span>mAh battery ensures all-day usage without frequent charging.
If you're looking for an outstanding camera, powerful battery and high-performance smartphone with advanced features, the <span className="fw-bold">{mobileDetail?.model}</span> is a superb choice in it price range.
                 </div>
        </div>
        {/* our website */}
        <div className="row">
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul">
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=15000&maxPrice=30000`}
                >
                  {mobileDetail.brand} mobile price in Pakistan 15000 to 30000
                </Link>
              </li>

              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=30000&maxPrice=50000`}
                >
                  {mobileDetail.brand} mobile price in Pakistan 30000 to 50000
                </Link>
              </li>

              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=50000&maxPrice=70000`}
                >
                  {mobileDetail.brand} mobile price in Pakistan 50000 to 70000
                </Link>
              </li>

              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minPrice=80000&maxPrice=100000`}
                >
                  {mobileDetail.brand} mobile price in Pakistan 80000 to 100000
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul mx-1">
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=4&maxRam=4`}
                >
                  {mobileDetail?.brand} 4GB Ram Mobile Phones Price in Pakistan{" "}
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=6&maxRam=6`}
                >
                  {mobileDetail?.brand} 6GB Ram Mobile Phones Price in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=8&maxRam=8`}
                >
                  {mobileDetail?.brand} 8GB Ram Mobile Phones Price in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&minRam=12&maxRam=12`}
                >
                  {mobileDetail?.brand} 12GB Ram Mobile Phones Price in Pakistan
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul">
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=64&storageMax=64`}
                >
                  {mobileDetail?.brand} 64GB Rom Mobile Phones Price in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=128&storageMax=128`}
                >
                  {mobileDetail?.brand} 128GB Rom Mobile Phones Price in Lahore
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=256&storageMax=256`}
                >
                  {mobileDetail?.brand} 256GB Rom Mobile Phones Price in
                  Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&storageMin=1024&storageMax=1024`}
                >
                  {mobileDetail?.brand} 1TB Rom Mobile Phones Price in Pakistan
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column mt-3">
            <ul className="description-ul">
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=20&backCamMax=29`}
                >
                  {mobileDetail.brand} 20MP Camera Phones Price in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=30&backCamMax=49`}
                >
                  {mobileDetail.brand} 30MP Camera Phones Price in Pakistan
                </Link>
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=50&backCamMax=99`}
                >
                  {mobileDetail.brand} 50MP Camera Phones Price in Pakistan
                </Link>{" "}
              </li>
              <li className="description-para">
                <Link
                  href={`/AdvanceSearch?brand=${mobileDetail?.brand}&backCamMin=100&backCamMax=99`}
                >
                  {mobileDetail.brand} 100MP Camera Phones Price in Pakistan
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
      <section className="max-w-4xl mx-auto mt-10 mb-4">
        {/* Comments Section */}
        <div className="comments-section mt-8 p-8 border border-gray-300 rounded-lg bg-white shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2 border-gray-200">
            Comments
          </h2>

          {/* Display Comments */}
          <form
            onSubmit={handleCommentSubmit}
            className="comment-form gap-6 flex flex-wrap mb-2"
          >
            <textarea
              placeholder="Your Comment"
              value={newComment.comment}
              onChange={(e) =>
                setNewComment({ ...newComment, comment: e.target.value })
              }
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none min-h-[80px]"
            />
            <input
              type="text"
              placeholder="Your Name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
              required
              className=" p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 h-[40px]"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={newComment.email}
              onChange={(e) =>
                setNewComment({ ...newComment, email: e.target.value })
              }
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 h-[40px]"
            />
            
            <button
              type="submit"
              className="px-3 py-1  bg-[#1eb8db] text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 h-[40px]"
            >
              Post Comment
            </button>
          </form>
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
                    <div className="flex items-center mb-2">
                      <strong className="text-gray-800 text-lg mr-2">
                        {comment.name}
                      </strong>
                      <span className="text-sm text-gray-500">
                        ({comment.email})
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </li>
                ))
            ) : (
              <p className="no-comments text-gray-500 italic text-center">
                No comments yet. Be the first to comment!
              </p>
            )}
          </ul>

          {/* Add New Comment */}
          
        </div>
      </section>
    </section>
  );
};
export default PhoneDetail;
