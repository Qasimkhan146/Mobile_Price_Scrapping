"use client";
import React,{useEffect, useState} from "react";
import "./ContentArea.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetch10LatestMobiles, selectFetch10Mobiles, selectError } from "../../../../redux/mobileSlicer";
import slugify from 'slugify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from "next/link";
import { toast } from 'react-toastify';


const ContentArea = ({ mobiles }) => {
  const  fetch10Mobiles  = useSelector(selectFetch10Mobiles);
// const  fetchFilterMobiles  = useSelector(filterMobiles);
  const error = useSelector(selectError);
  
   const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setInterval(() => {
      setLoading(false)
    },[4000])
  })
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetch10LatestMobiles());
  }, [dispatch]);
  const sources = fetch10Mobiles[1]?.prices.map((price) => price.source);
 
  useEffect(()=>{
    if(fetch10Mobiles?.message){
      toast.error(fetch10Mobiles.message);
    }
    if(error){
      toast.error(error);
    }
  },[fetch10Mobiles])
  const generateSlug = (title) => {
    return `${slugify(title)}`;
  };
    //  console.log(loading,"loading");
    //  console.log(selectAllBrands,"Select All Brands");
     
    if(loading) return (
      <div className="loading__class" >
      <DotLottieReact src="https://lottie.host/1911b01f-ab86-4a45-89c5-aab3f0d4e209/WcQ9e9ozxp.lottie" style={{width: "200px", height: "200px", background:"#eee"}} loop autoplay />  
      </div>
      )
  
  return (
    <>
      <div className="table-responsive">
        {error && <h2 className="text-center">{error}</h2>}
        {fetch10Mobiles?.message && <h2 className="text-center">{fetch10Mobiles.message}</h2>}
        <table className="table table-light">
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
            { fetch10Mobiles.length > 0 && fetch10Mobiles.map((mobile, index) => (
              <tr key={index} className="content__tr">
                <th scope="row"><Link href={`/Mobile/${generateSlug(mobile.mobile.model)}`}>{mobile.mobile.model}</Link></th>
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