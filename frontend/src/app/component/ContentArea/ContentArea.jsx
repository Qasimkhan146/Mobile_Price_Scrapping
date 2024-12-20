"use client";
import React,{useEffect, useState} from "react";
import "./ContentArea.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetch10LatestMobiles, selectFetch10Mobiles } from "../../../../redux/mobileSlicer";
import slugify from 'slugify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const ContentArea = ({ mobiles }) => {
  const  fetch10Mobiles  = useSelector(selectFetch10Mobiles);
  // const  fetchBrands  = useSelector(selectAllBrands);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setInterval(() => {
      setLoading(false)
    },[5000])
  })
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetch10LatestMobiles());
  }, [dispatch]);
  const sources = fetch10Mobiles[0]?.prices.map((price) => price.source);
  const generateSlug = (title) => {
    return `${slugify(title)}`;
  };
    //  console.log(loading,"loading");
    //  console.log(selectAllBrands,"Select All Brands");
     
    if(loading) return (
      <DotLottieReact src="https://lottie.host/03dab9c6-46e8-4820-8d3f-ddaf145da57d/mAwu9NOErZ.lottie" loop autoplay />  )
  return (
    <>
      <div className="table-responsive">
        <table className="table border-1 table-striped">
          {/* <caption>More Results</caption> */}
          <thead className="content__head">
        <tr>
          <th scope="col">Mobiles</th>
          {/* Dynamically render <th> for each source */}
          {sources?.length > 0 && sources?.map((source, index) => (
            <th key={index} scope="col">
              {source}
            </th>
          ))}
        </tr>
      </thead>
          <tbody>
            {fetch10Mobiles.length > 0 && fetch10Mobiles.map((mobile, index) => (
              <tr key={index} className="content__tr">
                <th scope="row"><a target="_blank" href={`/${generateSlug(mobile.mobile.model)}`}>{mobile.mobile.model}</a></th>
                {mobile.prices.map((price, index) => (
                <td key={index}><a target="_blank" href={price.href}>{price.price} PKR</a></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContentArea;
