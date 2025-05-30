"use client";
import React, { useEffect, useState } from "react";
import "./ContentArea.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetch10LatestMobiles, selectFetch10Mobiles, selectError } from "../../../../redux/mobileSlicer";
import slugify from 'slugify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from "next/link";
import { toast } from 'react-toastify';
import Image from "next/image";
import { IosShare } from "@mui/icons-material";
import MainSkeleton from "./MainSkeleton"

const ContentArea = ({ mobiles }) => {
  const fetch10Mobiles = useSelector(selectFetch10Mobiles);
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


  if (fetch10Mobiles.length === 0) return (
    // <div className="loading__class" >
    //   <DotLottieReact src="https://lottie.host/1911b01f-ab86-4a45-89c5-aab3f0d4e209/WcQ9e9ozxp.lottie" style={{ width: "200px", height: "200px", background: "#eee" }} loop autoplay />
    // </div>
    <MainSkeleton/>
  )

  return (
    // <>
    //   <div className="table-responsive table__border">
    //     {error && <h2 className="text-center">{error}</h2>}
    //     {fetch10Mobiles?.message && <h2 className="text-center">{fetch10Mobiles.message}</h2>}
    //     <table className="table table-light text-center align-middle">
    //       {/* <caption>More Results</caption> */}
    //       <thead className="contents__head">
    //         <tr>
    //           <th scope="col">Mobiles</th>
    //           <th>Mobilemate</th>
    //           <th>HamariWeb</th>
    //           <th>WhatMobile</th>
    //           <th>PriceOye</th>
    //           <th>Daraz</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {fetch10Mobiles.length > 0 && fetch10Mobiles.map((mobile, index) => (
    //           <tr key={index} className="contents__tr">
    //             <td scope="row" className="place-items-center">
    //               <Image src={mobile.img_url_mobilemate} alt="mobile info" width={50} height={50} />
    //               <Link href={`/Mobile/${generateSlug(mobile.model)}`}><span className="text-sm">{mobile.model}</span></Link>
    //             </td>
    //             <td>
    //               {mobile.updateHistory.length > 0 ? (
    //                 <div className="py-3">
    //                   {mobile.updateHistory[0].changes.mobilemate_price.old === mobile.updateHistory[0].changes.mobilemate_price.new ? (
    //                     mobile.mobilemate_link === "N/A" ? (
    //                       <span className="fw-semibold">{mobile.mobilemate_price === 0 ? "N/A" : `${mobile.mobilemate_price} PKR`}</span>
    //                     ) : (
    //                       <a target="_blank" href={mobile.mobilemate_link}>
    //                         {mobile.mobilemate_price === 0 ? "N/A" : `${mobile.mobilemate_price} PKR`}
    //                       </a>
    //                     )
    //                   ) : (
    //                     <>
    //                       {mobile.updateHistory[0].changes.mobilemate_price.old === 0 ? (
    //                         <p className="fw-semibold">N/A</p>
    //                       ) : (<div>
    //                         <button className="prev-data">Previous Price</button>
    //                         <p className="fw-semibold line-through">{mobile.updateHistory[0].changes.mobilemate_price.old} PKR</p>
    //                       </div>)}

    //                       <div>
    //                         <button className="new-data">New Price</button>
    //                         <p className="fw-semibold">{mobile.updateHistory[0].changes.mobilemate_price.new} PKR</p>
    //                         <a target="_blank" href={mobile.mobilemate_link} className="text-sm click__text">
    //                         {mobile.updateHistory[0].changes.mobilemate_price.new === 0 ? "N/A" : (<div> Click Here <IosShare sx={{fontSize:"14px"}}/></div>)}
    //                       </a>
    //                       </div>
    //                     </>)}

    //                 </div>
    //               ) : mobile.mobilemate_link === "N/A" ? (
    //                 <span className="fw-semibold">{mobile.mobilemate_price === 0 ? "N/A" : `${mobile.mobilemate_price} PKR`}</span>
    //               ) : (
    //                 <a target="_blank" href={mobile.mobilemate_link}>
    //                   {mobile.mobilemate_price === 0 ? "N/A" : `${mobile.mobilemate_price} PKR`}
    //                 </a>
    //               )}

    //             </td>
    //             <td>
    //             {mobile.updateHistory.length > 0 ? (
    //                 <div className="py-3">
    //                   {mobile.updateHistory[0].changes.hamariweb_price.old === mobile.updateHistory[0].changes.hamariweb_price.new ? (
    //                     mobile.hamariweb_link === "N/A" ? (
    //                       <span className="fw-semibold">{mobile.hamariweb_price === 0 ? "N/A" : `${mobile.hamariweb_price} PKR`}</span>
    //                     ) : (
    //                       <a target="_blank" href={mobile.hamariweb_link}>
    //                         {mobile.hamariweb_price === 0 ? "N/A" : `${mobile.hamariweb_price} PKR`}
    //                       </a>
    //                     )
    //                   ) : (
    //                     <>
    //                       {mobile.updateHistory[0].changes.hamariweb_price.old === 0 ? (
    //                         <p className="fw-semibold">N/A</p>
    //                       ) : (<div>
    //                         <button className="prev-data">Previous Price</button>
    //                         <p className="fw-semibold line-through">{mobile.updateHistory[0].changes.hamariweb_price.old} PKR</p>
    //                       </div>)}

    //                       <div>
    //                         <button className="new-data">New Price</button>
    //                         <p className="fw-semibold">{mobile.updateHistory[0].changes.hamariweb_price.new} PKR</p>
    //                         <a target="_blank" href={mobile.hamariweb_link} className="click__text">
    //                         {mobile.updateHistory[0].changes.hamariweb_price.new === 0 ? "N/A" : (<div> Click Here <IosShare sx={{fontSize:"14px"}}/></div>)}
    //                       </a>
    //                       </div>
    //                     </>)}

    //                 </div>
    //               ) : mobile.hamariweb_link === "N/A" ? (
    //                 <span className="fw-semibold">{mobile.hamariweb_price === 0 ? "N/A" : `${mobile.hamariweb_price} PKR`}</span>
    //               ) : (
    //                 <a target="_blank" href={mobile.hamariweb_link}>
    //                   {mobile.hamariweb_price === 0 ? "N/A" : `${mobile.hamariweb_price} PKR`}
    //                 </a>
    //               )}
    //             </td>

    //             <td>
    //             {mobile.updateHistory.length > 0 ? (
    //                 <div className="py-3">
    //                   {mobile.updateHistory[0].changes.whatmobile_price.old === mobile.updateHistory[0].changes.whatmobile_price.new ? (
    //                     mobile.whatmobile_link === "N/A" ? (
    //                       <span className="fw-semibold">{mobile.whatmobile_price === 0 ? "N/A" : `${mobile.whatmobile_price} PKR`}</span>
    //                     ) : (
    //                       <a target="_blank" href={mobile.whatmobile_link}>
    //                         {mobile.whatmobile_price === 0 ? "N/A" : `${mobile.whatmobile_price} PKR `}
    //                       </a>
    //                     )
    //                   ) : (
    //                     <>
    //                       {mobile.updateHistory[0].changes.whatmobile_price.old === 0 ? (
    //                         <p className="fw-semibold">N/A</p>
    //                       ) : (<div>
    //                         <button className="prev-data">Previous Price</button>
    //                         <p className="fw-semibold line-through">{mobile.updateHistory[0].changes.whatmobile_price.old} PKR</p>
    //                       </div>)}

    //                       <div>
    //                         <button className="new-data">New Price</button>
    //                         <p className="fw-semibold">{mobile.updateHistory[0].changes.whatmobile_price.new} PKR</p>
    //                         <a target="_blank" href={mobile.whatmobile_link} className="click__text">
    //                         {mobile.updateHistory[0].changes.whatmobile_price.new === 0 ? "N/A" : (<div> Click Here <IosShare sx={{fontSize:"14px"}}/></div>)}
    //                       </a>
    //                       </div>
    //                     </>)}

    //                 </div>
    //               ) : mobile.whatmobile_link === "N/A" ? (
    //                 <span className="fw-semibold">{mobile.whatmobile_price === 0 ? "N/A" : `${mobile.whatmobile_price} PKR`}</span>
    //               ) : (
    //                 <a target="_blank" href={mobile.whatmobile_link}>
    //                   {mobile.whatmobile_price === 0 ? "N/A" : `${mobile.whatmobile_price} PKR`}
    //                 </a>
    //               )}
    //             </td>
    //             <td>
    //             {mobile.updateHistory.length > 0 ? (
    //                 <div className="py-3">
    //                   {mobile.updateHistory[0].changes.priceoye_price.old === mobile.updateHistory[0].changes.priceoye_price.new ? (
    //                     mobile.priceoye_link === "N/A" ? (
    //                       <span className="fw-semibold">{mobile.priceoye_price === 0 ? "N/A" : `${mobile.priceoye_price} PKR`}</span>
    //                     ) : (
    //                       <a target="_blank" href={mobile.priceoye_link}>
    //                         {mobile.priceoye_price === 0 ? "N/A" : `${mobile.priceoye_price} PKR`}
    //                       </a>
    //                     )
    //                   ) : (
    //                     <>
    //                       {mobile.updateHistory[0].changes.priceoye_price.old === 0 ? (
    //                         <p className="fw-semibold">N/A</p>
    //                       ) : (<div>
    //                         <button className="prev-data">Previous Price</button>
    //                         <p className="fw-semibold line-through">{mobile.updateHistory[0].changes.priceoye_price.old} PKR</p>
    //                       </div>)}

    //                       <div>
    //                         <button className="new-data">New Price</button>
    //                         <p className="fw-semibold">{mobile.updateHistory[0].changes.priceoye_price.new} PKR</p>
    //                         <a target="_blank" href={mobile.priceoye_link} className="click__text">
    //                         {mobile.updateHistory[0].changes.priceoye_price.new === 0 ? "N/A" : (<div> Click Here <IosShare sx={{fontSize:"14px"}}/></div>)}
    //                       </a>
    //                       </div>
    //                     </>)}

    //                 </div>
    //               ) : mobile.priceoye_link === "N/A" ? (
    //                 <span className="fw-semibold">{mobile.priceoye_price === 0 ? "N/A" : `${mobile.priceoye_price} PKR`}</span>
    //               ) : (
    //                 <a target="_blank" href={mobile.priceoye_link}>
    //                   {mobile.priceoye_price === 0 ? "N/A" : `${mobile.priceoye_price} PKR`}
    //                 </a>
    //               )}

    //             </td>
    //             <td>
    //             {mobile.updateHistory.length > 0 ? (
    //                 <div className="py-3">
    //                   {mobile.updateHistory[0].changes?.daraz_price?.old === mobile.updateHistory[0]?.changes?.daraz_price?.new ? (
    //                     mobile?.daraz_link === "N/A" ? (
    //                       <span className="fw-semibold">{mobile?.daraz_price === 0 ? "N/A" : `${mobile?.daraz_price} PKR`}</span>
    //                     ) : (
    //                       <a target="_blank" href={mobile.daraz_link}>
    //                         {mobile.daraz_price === 0 ? "N/A" : `${mobile.daraz_price} PKR`}
    //                       </a>
    //                     )
    //                   ) : (
    //                     <>
    //                       {mobile.updateHistory[0].changes.daraz_price.old === 0 ? (
    //                         <p className="fw-semibold">N/A</p>
    //                       ) : (<div>
    //                         <button className="prev-data">Previous Price</button>
    //                         <p className="fw-semibold line-through">{mobile.updateHistory[0].changes.daraz_price.old} PKR</p>
    //                       </div>)}

    //                       <div>
    //                         <button className="new-data">New Price</button>
    //                         <p className="fw-semibold">{mobile.updateHistory[0].changes.daraz_price.new} PKR</p>
    //                         <a target="_blank" href={mobile.daraz_link} className="click__text">
    //                         {mobile.updateHistory[0].changes.daraz_price.new === 0 ? "N/A" : (<div> Click Here <IosShare sx={{fontSize:"14px"}}/></div>)}
    //                       </a>
    //                       </div>
    //                     </>)}

    //                 </div>
    //               ) : mobile.daraz_link === "N/A" ? (
    //                 <span className="fw-semibold">{mobile.daraz_price === 0 ? "N/A" : `${mobile.daraz_price} PKR`}</span>
    //                 // "Comming Soon"
    //               ) : (
    //                 <a target="_blank" href={mobile.daraz_link}>
    //                   {mobile.daraz_price === 0 ? "N/A" : `${mobile.daraz_price} PKR`}
    //                 </a>
    //                 // "Comming Soon"
    //               )}

    //             </td>
    //           </tr>
    //         ))}

    //       </tbody>
    //     </table>

    //   </div>
    // </>
    <>
  <div className="grid__container">
  {error && <h2 className="text-center">{error}</h2>}
  {fetch10Mobiles?.message && <h2 className="text-center">{fetch10Mobiles.message}</h2>}

  {fetch10Mobiles.length > 0 &&
    fetch10Mobiles.map((mobile, index) => (
      <div key={index} className="mobile__card">
        {/* Mobile Image & Model Name */}
        <div className="mobile__image">
          <Image
            src={mobile.img_url_mobilemate}
            alt={mobile.model}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="mobile__info">
          <Link href={`/Mobile/${generateSlug(mobile.model)}`}>
            <h3 className="font-semibold">{mobile.model}</h3>
          </Link>

          {/* Price List Grid  */}
          <div className="price__list text-sm">
            {[
              { site: "mobilemate", label: "Mobilemate" },
              { site: "hamariweb", label: "HamariWeb" },
              { site: "whatmobile", label: "WhatMobile" },
              { site: "priceoye", label: "PriceOye" },
              { site: "daraz", label: "Daraz" },
            ].map(({ site, label }, i) => (
              <div key={i} className="price__box">
                <span className="website__name text-sm">{label}</span>

                {mobile.updateHistory.length > 0 &&
                mobile.updateHistory[0]?.changes?.[`${site}_price`] ? (
                  <>
                    {mobile.updateHistory[0].changes[`${site}_price`].old ===
                    mobile.updateHistory[0].changes[`${site}_price`].new ? (
                      mobile[`${site}_link`] === "N/A" ? (
                        <span className="price__text text-sm">
                          {mobile[`${site}_price`] === 0
                            ? "N/A"
                            : `${mobile[`${site}_price`]} PKR`}
                        </span>
                      ) : (
                        <a
                          href={mobile[`${site}_link`]}
                          target="_blank"
                          className="price__link"
                        >
                          {mobile[`${site}_price`] === 0
                            ? "N/A"
                            : `${mobile[`${site}_price`]} PKR`}
                        </a>
                      )
                    ) : (
                      <>
                        {/* Old Price */}
                        {mobile.updateHistory[0].changes[`${site}_price`].old !== 0 && (
                          <div>
                            <button className="prev-data">Prev</button>
                            <p className="fw-semibold line-through text-xs">
                              {mobile.updateHistory[0].changes[`${site}_price`].old} PKR
                            </p>
                          </div>
                        )}

                        {/* New Price */}
                        <div>
                          <button className="new-data">New Price</button>
                          <p className="fw-semibold text-xs">
                            {mobile.updateHistory[0].changes[`${site}_price`].new} PKR
                          </p>
                          {mobile[`${site}_link`] !== "N/A" && (
                            <a
                              href={mobile[`${site}_link`]}
                              target="_blank"
                              className="click__text"
                            >
                              Click Here <IosShare sx={{ fontSize: "14px" }} />
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </>
                ) : mobile[`${site}_link`] === "N/A" ? (
                  <span className="price__text text-sm">
                    {mobile[`${site}_price`] === 0
                      ? "N/A"
                      : `${mobile[`${site}_price`]} PKR`}
                  </span>
                ) : (
                  <a
                    href={mobile[`${site}_link`]}
                    target="_blank"
                    className="price__link"
                  >
                    {mobile[`${site}_price`] === 0
                      ? "N/A"
                      : `${mobile[`${site}_price`]} PKR`}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
</div>

</>

  );
};

export default ContentArea;