"use client";
import React, { useEffect, useState } from "react";
import "./ContentArea.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetch10LatestMobiles, selectFetch10Mobiles, selectError } from "../../../../redux/mobileSlicer";
import slugify from 'slugify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from "next/link";
import { toast } from 'react-toastify';


const ContentArea = ({ mobiles }) => {
  const fetch10Mobiles = useSelector(selectFetch10Mobiles);
  console.log(fetch10Mobiles,"fetch10Mobiles");
  // const  fetchFilterMobiles  = useSelector(filterMobiles);
  const error = useSelector(selectError);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setLoading(false)
    }, [4000])
  })
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch10LatestMobiles());
  }, [dispatch]);
  // const sources = fetch10Mobiles[1]?.prices.map((price) => price.source);
  // const sources = fetch10Mobiles.length > 0 && fetch10Mobiles?.reduce(
  //   (maxObj, currentObj) =>
  //     currentObj.prices.length > maxObj.prices.length ? currentObj : maxObj,
  //   { prices: [] } // Initial value to avoid errors on empty arrays
  // );
  // console.log(sources?.prices,"sourcea");

  useEffect(() => {
    if (fetch10Mobiles?.message) {
      toast.error(fetch10Mobiles.message);
    }
    if (error) {
      toast.error(error);
    }
  }, [fetch10Mobiles])
  const generateSlug = (title) => {
    return `${slugify(title)}`;
  };
  //  console.log(loading,"loading");
  //  console.log(selectAllBrands,"Select All Brands");

  if (fetch10Mobiles.length === 0) return (
    <div className="loading__class" >
      <DotLottieReact src="https://lottie.host/1911b01f-ab86-4a45-89c5-aab3f0d4e209/WcQ9e9ozxp.lottie" style={{ width: "200px", height: "200px", background: "#eee" }} loop autoplay />
    </div>
  )

  return (
    <>
      <div className="table-responsive">
        {error && <h2 className="text-center">{error}</h2>}
        {fetch10Mobiles?.message && <h2 className="text-center">{fetch10Mobiles.message}</h2>}
        <table className="table table-light">
          {/* <caption>More Results</caption> */}
          <thead className="contents__head">
            <tr>
              <th scope="col">Mobiles</th>
              <th>Mobilemate</th>
              <th>Hamari Web</th>
              <th>WhatMobile</th>
              <th>PriceOye</th>
            </tr>
          </thead>
          <tbody>
            {fetch10Mobiles.length > 0 && fetch10Mobiles.map((mobile, index) => (
              <tr key={index} className="contents__tr">
                <th scope="row"><Link href={`/Mobile/${generateSlug(mobile.model)}`}>{mobile.model}</Link></th>
                <td>
                  {mobile.mobilemate_link === "N/A" ? (
                 <span className="fw-semibold">{mobile.mobilemate_price === 0 ? "N/A" : `${mobile.mobilemate_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobile.mobilemate_link}>
                      {mobile.mobilemate_price === 0 ? "N/A" : `${mobile.mobilemate_price} PKR`}
                    </a>
                  )}
                </td>
                <td>
                  {mobile.hamariweb_link === "N/A" ? (
                 <span className="fw-semibold">{mobile.hamariweb_price === 0 ? "N/A" : `${mobile.hamariweb_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobile.hamariweb_link}>
                      {mobile.hamariweb_price === 0 ? "N/A" : `${mobile.hamariweb_price} PKR`}
                    </a>
                  )}
                </td>

                <td>
                  {mobile.whatmobile_link === "N/A" ? (
                 <span className="fw-semibold">{mobile.whatmobile_price === 0 ? "N/A" : `${mobile.whatmobile_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobile.whatmobile_link}>
                      {mobile.whatmobile_price === 0 ? "N/A" : `${mobile.whatmobile_price} PKR`}
                    </a>
                  )}
                </td>
                <td>
                  {mobile.priceoye_link === "N/A" ? (
                 <span className="fw-semibold">{mobile.priceoye_price === 0 ? "N/A" : `${mobile.priceoye_price} PKR`}</span>
                  ) : (
                    <a target="_blank" href={mobile.priceoye_link}>
                      {mobile.priceoye_price === 0 ? "N/A" : `${mobile.priceoye_price} PKR`}
                    </a>
                  )}
                </td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </>
  );
};

export default ContentArea;