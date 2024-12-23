"use client";
import React,{useEffect, useState} from "react";
import "./ContentArea.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetch10LatestMobiles, selectFetch10Mobiles, filterMobiles, selectError } from "../../../../redux/mobileSlicer";
import slugify from 'slugify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from "next/link";
import { toast } from 'react-toastify';


const ContentArea = ({ mobiles }) => {
  const  fetch10Mobiles  = useSelector(selectFetch10Mobiles);
  const  fetchFilterMobiles  = useSelector(filterMobiles);
  // const error = useSelector((state) => state.mobile.error);
  const error = useSelector(selectError);
  // const  fetchBrands  = useSelector(selectAllBrands);
  console.log(fetch10Mobiles,"Fetch");
  
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
  useEffect(() => {
   if(fetchFilterMobiles.length > 0){ 
    const specificSource =  fetchFilterMobiles[0]?.prices?.map((price) => price.source);
    console.log(specificSource,"Sourcresssda");         
  }},[fetchFilterMobiles])
  
  useEffect(()=>{
    if(fetch10Mobiles?.message){
      toast.error(fetch10Mobiles.message);
    }else{
      toast.success("Mobile Fetched Successfully");
    }
  },[fetch10Mobiles])
  const generateSlug = (title) => {
    return `${slugify(title)}`;
  };
    //  console.log(loading,"loading");
    //  console.log(selectAllBrands,"Select All Brands");
     console.log(error,"Errors");
     
    if(loading) return (
      <DotLottieReact src="https://lottie.host/03dab9c6-46e8-4820-8d3f-ddaf145da57d/mAwu9NOErZ.lottie" loop autoplay />  )
  return (
    <>
      <div className="table-responsive">
        {fetch10Mobiles?.message && <h2 className="text-center">{fetch10Mobiles.message}</h2>}
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
          {/* {fetchFilterMobiles.length > 0 &&  fetchFilterMobiles?.map((source, index) => (
            <th key={index} scope="col">
              {source}
            </th>
          ))} */}
        </tr>
      </thead>
          <tbody>
            { fetch10Mobiles.length > 0 && fetch10Mobiles.map((mobile, index) => (
              <tr key={index} className="content__tr">
                <th scope="row"><Link href={`/Mobile/${generateSlug(mobile.mobile.model)}`}>{mobile.mobile.model}</Link></th>
                {mobile.prices.map((price, index) => (
                <td key={index}><a target="_blank" href={price.href}>{price.price} PKR</a></td>
                ))}
              </tr>
            ))}
            {/* {fetchFilterMobiles.length > 0  && fetchFilterMobiles.map((mobile, index) => (
              <tr key={index} className="content__tr">
                <th scope="row"><Link href={`/${generateSlug(mobile?.mobile?.model)}`}>{mobile?.mobile?.model}</Link></th>
                {mobile.prices.map((price, index) => (
                <td key={index}><a target="_blank" href={price.href}>{price.price} PKR</a></td>
                ))}
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContentArea;
