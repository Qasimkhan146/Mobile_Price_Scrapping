"use client";
import React, { useState, useEffect } from 'react';
import { LuRefreshCw } from "react-icons/lu";
import Image from "next/image";
import { Form } from "react-bootstrap";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Slider from 'rc-slider';
import Link from "next/link";
import 'rc-slider/assets/index.css';
import "./AdvanceSearchComponent.css";
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvanceFilters, selectAdvanceFilterMobiles } from '../../../../redux/mobileSlicer';
import { FormatListBulleted, Window } from "@mui/icons-material";
import slugify from 'slugify';
import { toast } from 'react-toastify';

const AdvanceSearchComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const generateSlug = (title) => {
        return `${slugify(title)}`;
    };
    const loading = useSelector((state) => state.mobile.loading);
    const [displayView, setDisplayView] = useState("list");
    const advanceMobiles = useSelector(selectAdvanceFilterMobiles);
    const [advanceData, setAdvanceData] = useState([]);
    const searchParams = useSearchParams();
    // const queryBrands = searchParams.get('brand');
    const queryModel = searchParams.get('model')?.replace(/-/g, " ");
    const queryBrand = searchParams.get('brand');
    const queryRamMin = searchParams.get('minRam');
    const queryRamMax = searchParams.get('maxRam');
    const queryStorageMin = searchParams.get('storageMin');
    const queryStorageMax = searchParams.get('storageMax');
    const queryBackCamMin = searchParams.get('backCamMin');
    const queryBackCamMax = searchParams.get('backCamMax');
    const queryPriceMin = searchParams.get('minPrice');
    const queryPriceMax = searchParams.get('maxPrice');
    const [brandName, setBrandName] = useState(queryBrand || "");
    const [modelName, setModelName] = useState(queryModel || "");
    const [ramRange, setRamRange] = useState([queryRamMin || 2, queryRamMax || 12]);
    const [storageRange, setStorageRange] = useState([queryStorageMin || 16, queryStorageMax || 1024]);
    const [priceRange, setPriceRange] = useState([queryPriceMin || 0, queryPriceMax || 700000]);
    const [backCamRange, setBackCamRange] = useState([queryBackCamMin || 4, queryBackCamMax || 100]);
    // const [searchQuery, setSearchQuery] = useState({ brand: queryBrand || '', model: queryModel || '', ramMin: queryRamMin || 2, ramMax: queryRamMax || 32, storageMin: queryStorageMin || 16, storageMax: queryStorageMax || 1024, backCamMin: queryBackCamMin || 4, backCamMax: queryBackCamMax || 50, minPrice: queryPriceMin || 0, maxPrice: queryPriceMax || 700000 });
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [isSmallLaptop, setIsSmallLaptop] = useState(false);
    // const [currentBrand, setCurrentBrand] = useState(brandName);
    const [isSmallMobile, setIsSmallMobile] = useState(false);
    const [selectedYear, setSelectedYear] = useState("");

    const handleSelect = (year) => {
        setSelectedYear(year);
    };

    const years = ["2020", "2021", "2022", "2023", "2024"];
    const mainColor = "#e0134e";

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        const handleChange = () => setIsMobile(mediaQuery.matches);

        handleChange(); // Set initial state
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);
    // useEffect(() => {
    //     if (queryBrand && queryBrand !== brandName) {
    //         setBrandName(queryBrand)
    //         // console.log("dsda");

    //     }
    // }, [queryBrand])
    // useEffect(() => {
    //     if (queryModel && queryModel !== modelName) {
    //         setModelName(queryModel)
    //         //  console.log("dsda");

    //     }
    // }, [queryModel])
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1280px)");

        const handleChange = () => {
            const isSmallScreen = mediaQuery.matches;
            setIsSmallLaptop(isSmallScreen);
            if (isSmallScreen) {
                setDisplayView("list");
            }
        };

        handleChange(); // Set initial state
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        const handleChange = () => setIsSmallMobile(mediaQuery.matches);

        handleChange(); // Set initial state
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);
    useEffect(() => {
        dispatch(fetchAdvanceFilters({ brand: brandName, model: modelName, minRam: ramRange[0], maxRam: ramRange[1], minRom: storageRange[0], maxRom: storageRange[1], min_Back_Cam: backCamRange[0], max_Back_Cam: backCamRange[1], minPrice: priceRange[0], maxPrice: priceRange[1], page: page, Year: selectedYear }));
    }, [dispatch, page]);
    useEffect(() => {
        if (advanceMobiles?.latestMobiles?.length > 0) {
            setAdvanceData((prevData) => [...prevData, ...advanceMobiles?.latestMobiles]);
        }
    }, [advanceMobiles]);
    // useEffect(() => {
    //     if (advanceMobiles?.data?.length > 0) {
    //         if (advanceData[0]?.mobile.brand !== brandName && brandName !== "" || advanceData[0]?.mobile.model !== modelName || advanceData[0]?.mobile.model !== advanceData[1]?.mobile.model) {
    //             setAdvanceData([...advanceMobiles.data]);
    //         } else {
    //             // Append data for "load more"
    //             setAdvanceData((prevData) => [...prevData, ...advanceMobiles.data]);
    //         }
    //     }
    // }, [advanceMobiles, brandName, modelName]);
    // console.log(advanceData,"Advance Data");

    const handleRamChange = (values) => {
        setRamRange(values);
    };
    const handleStorageChange = (values) => {
        setStorageRange(values);
    };
    const handleBackCamChange = (values) => {
        // console.log(values, "Values");

        setBackCamRange(values);
        // fetchAds();
    };
    const handlePriceChange = (values) => {
        // console.log(values, "Values");

        setPriceRange(values);
        // fetchAds();
    };
    // console.log(selectedYear,"sdsajkdhsjdh");
    useEffect(() => {
        if (advanceMobiles?.message) {
            toast.error(advanceMobiles?.message)
        }
    }, [advanceMobiles])
    const handleSearch = (e) => {
        e.preventDefault();
        setAdvanceData([]);

        dispatch(fetchAdvanceFilters({ brand: brandName, model: modelName, minRam: ramRange[0], maxRam: ramRange[1], minRom: storageRange[0], maxRom: storageRange[1], min_Back_Cam: backCamRange[0], max_Back_Cam: backCamRange[1], minPrice: priceRange[0], maxPrice: priceRange[1], page: page, Year: selectedYear }))
        const params = new URLSearchParams(searchParams); // Clone existing query parameters
        params.set("brand", brandName);
        params.set("model", modelName);
        params.set("minRam", ramRange[0]);
        params.set("maxRam", ramRange[1]);
        params.set("storageMin", storageRange[0]);
        params.set("storageMax", storageRange[1]);
        params.set("backCamMin", backCamRange[0]);
        params.set("backCamMax", backCamRange[1]);
        params.set("minPrice", priceRange[0]);
        params.set("maxPrice", priceRange[1]);
        params.set("Year", selectedYear)
        router.push(`/AdvanceSearch?${params.toString()}`);
    }
    // console.log(advanceMobiles, "Advance Mobiles");
    const handleRefresh = () => {
        setBrandName("");
        setModelName("");
        setRamRange([2, 12]);
        setStorageRange([16, 1024]);
        setBackCamRange([4, 100]);
        setPriceRange([0, 700000]);
        setSelectedYear("")
    }

    if (advanceMobiles.length === 0) return (
        <div className="loading__class" >
            <DotLottieReact src="https://lottie.host/1911b01f-ab86-4a45-89c5-aab3f0d4e209/WcQ9e9ozxp.lottie" style={{ width: "200px", height: "200px", background: "#eee" }} loop autoplay />
        </div>
    )

    return (
        <>
            <div className='mt-4 mb-4'>
                {brandName === "" && <h1 className='advance__heading'>Latest Mobile Price in Pakistan</h1>} {(brandName !== "") && <h1> {brandName} Mobile Price in Pakistan {priceRange[0]} to {priceRange[1]}</h1>}
            </div>
            <div className={`d-flex ${isMobile ? "flex-column" : "flex-row"} py-1 min-vh-100 gap-4 mb-4`}>
                <div className={`${isMobile ? "col-12" : "col-3"} border border-2 p-4 rounded h-50 `}>
                    <form onSubmit={handleSearch}>
                        <div className="d-flex align-items-center justify-content-between flex-row mb-2">
                            <h5>Search Filters</h5>
                            <div className='d-flex align-items-center gap-2 flex-row'>
                                <LuRefreshCw onClick={handleRefresh} className='cursor-pointer' size={18} />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="position-relative">

                                <input
                                    type="text"
                                    name="title"
                                    value={modelName}
                                    onChange={(e) => setModelName(e.target.value)}
                                    className="form-control mb-2 ps-5"
                                    placeholder="Search by Model"
                                />
                                <input
                                    type="text"
                                    name="brand"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    className="form-control mb-2 ps-5"
                                    placeholder="Search by Brand"
                                />
                                <hr />
                                <div className='advance__search__slider__div'>
                                    <Form.Group controlId="backCam" >

                                        <Form.Label>RAM</Form.Label>
                                        <Slider
                                            range
                                            min={2}
                                            max={12}
                                            // step={2}
                                            value={ramRange}
                                            onChange={handleRamChange}
                                            tipFormatter={(value) => `Rs ${value}`}
                                            tipProps={{ placement: 'top', visible: true }}
                                            className="custom-slider"
                                        />
                                        <div className='d-flex justify-content-between mt-2'>
                                            <input value={ramRange[0]} className='form-control w-auto' type='number' min={2} max={11} onChange={(e) => setRamRange([e.target.value, ramRange[1]])} />
                                            <input value={ramRange[1]} className='form-control w-auto' type='number' min={3} max={12} onChange={(e) => setRamRange([ramRange[0], e.target.value])} />
                                        </div>

                                    </Form.Group>
                                    <Form.Group controlId="backCam" >

                                        <Form.Label>Storage</Form.Label>
                                        <Slider
                                            range
                                            min={16}
                                            max={1024}
                                            step={2}
                                            value={storageRange}
                                            onChange={handleStorageChange}
                                            tipFormatter={(value) => `Rs ${value}`}
                                            tipProps={{ placement: 'top', visible: true }}
                                            className="custom-slider"
                                        />
                                        <div className='d-flex justify-content-between mt-2'> <input value={storageRange[0]} className='form-control w-auto' type='number' min={16} max={1023} onChange={(e) => setStorageRange([e.target.value, storageRange[1]])} />
                                            <input value={storageRange[1]} className='form-control w-auto' type='number' min={17} max={1024} onChange={(e) => setStorageRange([storageRange[0], e.target.value])} />
                                        </div>

                                    </Form.Group>
                                    <Form.Group controlId="backCam" >

                                        <Form.Label>Back Cam</Form.Label>
                                        <Slider
                                            range
                                            min={4}
                                            max={100}
                                            // step={2}
                                            value={backCamRange}
                                            onChange={handleBackCamChange}
                                            tipFormatter={(value) => `Rs ${value}`}
                                            tipProps={{ placement: 'top', visible: true }}
                                            className="custom-slider"
                                        />
                                        <div className='d-flex justify-content-between mt-2'><input className='form-control w-auto' value={backCamRange[0]} type='number' min={4} max={49} onChange={(e) => setBackCamRange([e.target.value, backCamRange[1]])} /> <input value={backCamRange[1]} className='form-control w-auto' type='number' min={5} max={100} onChange={(e) => setBackCamRange([backCamRange[0], e.target.value])} /> </div>

                                    </Form.Group>
                                    <Form.Group controlId="backCam" >

                                        <Form.Label>Price Range</Form.Label>
                                        <Slider
                                            range
                                            min={0}
                                            max={700000}
                                            //   step={}
                                            value={priceRange}
                                            onChange={handlePriceChange}
                                            tipFormatter={(value) => `Rs ${value}`}
                                            tipProps={{ placement: 'top', visible: true }}
                                            className="custom-slider"
                                        />
                                        <div className='d-flex mb-3 justify-content-between mt-2'>
                                            <input className='form-control w-auto' value={priceRange[0]} type='number' min={0} max={699999} onChange={(e) => setPriceRange([e.target.value, priceRange[1]])} />

                                            <input className='form-control w-auto' value={priceRange[1]} type='number' min={1} max={700000} onChange={(e) => setPriceRange([priceRange[0], e.target.value])} />  </div>

                                    </Form.Group>
                                </div>
                                <div className=''>
                                    <h3 className='year__heading mb-1'>Select Year</h3>
                                    <div className="flex space-x-2 flex-wrap">
                                        {years.map((year) => (
                                            <div
                                                key={year}
                                                type='button'
                                                className={`${selectedYear === year ? "select_year" : "not-select-year"} mb-2`}
                                                onClick={() => handleSelect(year)}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <hr />
                        </div>
                        <div className='w-100 advance__btn'>
                            <button type="submit" className="btn  mt-3 w-100"
                            //    onClick={handleSearchBtn}
                            >Search</button>
                        </div>
                    </form>
                </div>

                <div className={`advance__search__data ${isMobile ? "col-12" : "w-[73%]"}`}>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h3 className='total__results'>Total Results:{advanceMobiles?.pagination?.total}</h3>
                        </div>
                        <div className={`gap-2 ${isSmallLaptop ? "d-none" : "d-flex"}`}>
                            <button onClick={() => setDisplayView("list")}> <FormatListBulleted sx={{ fontSize: 35, color: displayView === "list" ? "#fff" : "#111", background: displayView === "list" ? "#000" : "#fff", borderRadius: "10px" }} /> </button>
                            <button onClick={() => setDisplayView("grid")}><Window sx={{ fontSize: 35, color: displayView === "grid" ? "#fff" : "#111", background: displayView === "grid" ? "#000" : "#fff", borderRadius: "10px" }} /></button>
                        </div>
                    </div>
                    <div className={`d-flex flex-wrap mt-2 justify-content-between gap-3 ${displayView === "list" ? "flex-column" : "flex-row"}`}>
                        {advanceMobiles?.message && <h2 className="text-center">{advanceMobiles?.message}</h2>}
                        {advanceData && advanceData?.length > 0 && advanceData.map((mobile, index) => (
                            <div key={index} className={`mobile__card p-2 ${displayView === "list" ? "w-100" : "w-[48%]"} gap-2`}>
                                <div className={` gap-2 p-2 d-flex ${displayView === "grid" || isSmallMobile ? "flex-column align-items-center" : "flex-row"}`}>

                                    <Image src={mobile.imageSRC} alt={mobile.model} width={100} height={100} />
                                    <div className={` ${displayView === "grid" ? "w-100" : "w-[80%]"} ${isSmallMobile && "w-100 flex-column"} d-flex justify-content-between`}>
                                        <div>
                                            <h3>{mobile.model}</h3>
                                            <p><b>Brand: </b>{mobile.brand}</p>
                                            <p><b>Price: </b>Rs {mobile.price}</p>
                                        </div>
                                        <div>
                                            <p><b>Ram:</b> {mobile.Ram} GB</p>
                                            <p><b>Back Camera:</b> {mobile.Back_Cam} MP</p>
                                            <p><b>Storage:</b> {mobile.Rom} GB</p>
                                            <Link className='font-bold underline' href={`/Mobile/${generateSlug(mobile.model)}`}>More Details</Link>
                                        </div>
                                        {(displayView === "list" && !isSmallLaptop) && <div>
                                            <p><b>Front Camera:</b> {mobile.front_Cam} MP</p>
                                            <p><b>Chipset:</b> {mobile.Chipset}</p>
                                            <p><b>Battery:</b> {mobile.Capacity} MAH</p>

                                        </div>
                                        }
                                    </div>
                                </div>
                                <div className='table-responsive'>
                                    <table className="overflow-auto w-100 table border-1 table-responsive">
                                        <thead className="price__head">
                                            <tr>
                                                <th>Mobilemate</th>
                                                <th>Hamari Web</th>
                                                <th>WhatMobile</th>
                                                <th>PriceOye</th>
                                                <th>Daraz</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="content__tr">
                                                <td>
                                                    {mobile?.mobilemate_link === "N/A" ? (
                                                        <span className="fw-semibold">{mobile?.mobilemate_price === 0 ? "N/A" : `${mobile?.mobilemate_price} PKR`}</span>
                                                    ) : (
                                                        <a target="_blank" href={mobile?.mobilemate_link}>
                                                            {mobile?.mobilemate_price === 0 ? "N/A" : `${mobile?.mobilemate_price} PKR`}
                                                        </a>
                                                    )}
                                                </td>
                                                <td>
                                                    {mobile?.hamariweb_link === "N/A" ? (
                                                        <span className="fw-semibold">{mobile?.hamariweb_price === 0 ? "N/A" : `${mobile?.hamariweb_price} PKR`}</span>
                                                    ) : (
                                                        <a target="_blank" href={mobile?.hamariweb_link}>
                                                            {mobile?.hamariweb_price === 0 ? "N/A" : `${mobile?.hamariweb_price} PKR`}
                                                        </a>
                                                    )}
                                                </td>

                                                <td>
                                                    {mobile?.whatmobile_link === "N/A" ? (
                                                        <span className="fw-semibold">{mobile?.whatmobile_price === 0 ? "N/A" : `${mobile?.whatmobile_price} PKR`}</span>
                                                    ) : (
                                                        <a target="_blank" href={mobile?.whatmobile_link}>
                                                            {mobile?.whatmobile_price === 0 ? "N/A" : `${mobile?.whatmobile_price} PKR`}
                                                        </a>
                                                    )}
                                                </td>
                                                <td>
                                                    {mobile?.priceoye_link === "N/A" ? (
                                                        <span className="fw-semibold">{mobile?.priceoye_price === 0 ? "N/A" : `${mobile?.priceoye_price} PKR`}</span>
                                                    ) : (
                                                        <a target="_blank" href={mobile?.priceoye_link}>
                                                            {mobile?.priceoye_price === 0 ? "N/A" : `${mobile?.priceoye_price} PKR`}
                                                        </a>
                                                    )}
                                                </td>
                                                <td>
                                                    {mobile?.daraz_link === "N/A" ? (
                                                        <span className="fw-semibold">{mobile?.daraz_price === 0 ? "N/A" : `${mobile?.daraz_price} PKR`}</span>
                                                    ) : (
                                                        <a target="_blank" href={mobile?.daraz_link}>
                                                            {mobile?.daraz_price === 0 ? "N/A" : `${mobile?.daraz_price} PKR`}
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className={`load__more__btn mb-3 mt-3 ${page === advanceMobiles?.pagination?.totalPages ? "d-none" : ""}`} onClick={() => setPage(page + 1)}>Load More</button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default AdvanceSearchComponent