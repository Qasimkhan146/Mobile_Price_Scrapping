"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { LuRefreshCw } from "react-icons/lu";
import Image from "next/image";
import { Form } from "react-bootstrap";
import Slider from 'rc-slider';
import Link from "next/link";
import 'rc-slider/assets/index.css';
import "./AdvanceSearchComponent.css";
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvanceFilters, selectAdvanceFilterMobiles } from '../../../../redux/mobileSlicer';
import { FormatListBulleted, Window } from "@mui/icons-material";
import slugify from 'slugify';

const AdvanceSearchComponent = () => {
    const dispatch = useDispatch();
    const generateSlug = (title) => {
        return `${slugify(title)}`;
      };
    const [displayView, setDisplayView] = useState("list");
    const advanceMobiles = useSelector(selectAdvanceFilterMobiles);
    const searchParams = useSearchParams();
    const queryModel = searchParams.get('model');
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
    const [ramRange, setRamRange] = useState([queryRamMin || 2, queryRamMax || 32]);
    const [storageRange, setStorageRange] = useState([queryStorageMin || 16, queryStorageMax || 1024]);
    const [priceRange, setPriceRange] = useState([queryPriceMin || 0, queryPriceMax || 700000]);
    const [backCamRange, setBackCamRange] = useState([queryBackCamMin || 4, queryBackCamMax || 50]);
    // const [searchQuery, setSearchQuery] = useState({ brand: queryBrand || '', model: queryModel || '', ramMin: queryRamMin || 2, ramMax: queryRamMax || 32, storageMin: queryStorageMin || 16, storageMax: queryStorageMax || 1024, backCamMin: queryBackCamMin || 4, backCamMax: queryBackCamMax || 50, minPrice: queryPriceMin || 0, maxPrice: queryPriceMax || 700000 });

    useEffect(() => {
        dispatch(fetchAdvanceFilters({ brand: brandName, model: modelName, minRam: ramRange[0], maxRam: ramRange[1], minRom: storageRange[0], maxRom: storageRange[1], min_Back_Cam: backCamRange[0], max_Back_Cam: backCamRange[1], minPrice: priceRange[0], maxPrice: priceRange[1] }));
    }, [dispatch]);
    console.log(advanceMobiles, "Advance Mobiles");


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
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchAdvanceFilters({ brand: brandName, model: modelName, minRam: ramRange[0], maxRam: ramRange[1], minRom: storageRange[0], maxRom: storageRange[1], min_Back_Cam: backCamRange[0], max_Back_Cam: backCamRange[1], minPrice: priceRange[0], maxPrice: priceRange[1] }))
    }
    return (
        <div className="d-flex py-5 min-vh-100 gap-4">
            <div className="col-lg-3 border border-2 p-4 rounded h-50">
                <form onSubmit={handleSearch}>
                    <div className="d-flex align-items-center justify-content-between flex-row mb-2">
                        <h5>Search Filters</h5>
                        <div className='d-flex align-items-center gap-2 flex-row'>
                            <LuRefreshCw className='cursor-pointer' size={18} />
                            {/* <Image
                //   src={search}
                  alt="icon"
                // className="position-absolute"
                /> */}
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
                                        max={32}
                                        step={2}
                                        value={ramRange}
                                        onChange={handleRamChange}
                                        tipFormatter={(value) => `Rs ${value}`}
                                        tipProps={{ placement: 'top', visible: true }}
                                        className="custom-slider"
                                    />
                                    <div className='d-flex justify-content-between mt-2'><p>{ramRange[0]}</p> <p>{ramRange[1]}</p></div>

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
                                    <div className='d-flex justify-content-between mt-2'><p>{storageRange[0]}</p> <p>{storageRange[1]}</p></div>

                                </Form.Group>
                                <Form.Group controlId="backCam" >

                                    <Form.Label>Back Cam</Form.Label>
                                    <Slider
                                        range
                                        min={4}
                                        max={50}
                                        step={2}
                                        value={backCamRange}
                                        onChange={handleBackCamChange}
                                        tipFormatter={(value) => `Rs ${value}`}
                                        tipProps={{ placement: 'top', visible: true }}
                                        className="custom-slider"
                                    />
                                    <div className='d-flex justify-content-between mt-2'><p>{backCamRange[0]}</p> <p>{backCamRange[1]}</p></div>

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
                                    <div className='d-flex justify-content-between mt-2'><p>{priceRange[0]}</p> <p>{priceRange[1]}</p></div>

                                </Form.Group>
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

            <div className="advance__search__data w-100">
                <div className='d-flex justify-content-between'>
                    <div>
                        <h3 className='total__results'>Total Results:{advanceMobiles?.pagination?.total}</h3>
                    </div>
                    <div className='d-none gap-2'>
                        <button onClick={() => setDisplayView("list")}> <FormatListBulleted sx={{ fontSize: 35, color: displayView === "list" ? "#fff" : "#111", background: displayView === "list" ? "#000" : "#fff", borderRadius: "10px" }} /> </button>
                        <button onClick={() => setDisplayView("grid")}><Window sx={{ fontSize: 35, color: displayView === "grid" ? "#fff" : "#111", background: displayView === "grid" ? "#000" : "#fff", borderRadius: "10px" }} /></button>
                    </div>
                </div>
                <div className={`d-flex flex-wrap mt-2 justify-content-between gap-3 ${displayView === "list" ? "flex-column" : "flex-row"}`}>

                    {advanceMobiles && advanceMobiles?.data?.length > 0 && advanceMobiles.data.map((mobile, index) => (
                        <div key={index} className={`mobile__card p-2 ${displayView === "list" ? "w-100" : "w-[48%]"} gap-2`}>
                            <div className=' gap-2 p-2 d-flex ' >

                                <Image src={mobile.mobile.imageSRC} alt={mobile.mobile.model} width={100} height={100} />
                                <div className={` ${displayView === "grid" ? "w-100" : "w-[80%]"} d-flex justify-content-between`}>
                                    <div>
                                        <h3>{mobile.mobile.model}</h3>
                                        <p><b>Brand: </b>{mobile.mobile.brand}</p>
                                        <p><b>Price: </b>Rs {mobile.mobile.price}</p>
                                    </div>
                                    <div>
                                        <p><b>Ram:</b> {mobile.mobile.Ram} GB</p>
                                        <p><b>Back Camera:</b> {mobile.mobile.Back_Cam} MP</p>
                                        <p><b>Storage:</b> {mobile.mobile.Rom} GB</p>
                                        <Link className='font-bold underline' href={`/Mobile/${generateSlug(mobile.mobile.model)}`}>More Details</Link>
                                    </div>
                                    {displayView === "list" && <div>
                                        <p><b>Front Camera:</b> {mobile.mobile.front_Cam} MP</p>
                                        <p><b>Chipset:</b> {mobile.mobile.Chipset}</p>
                                        <p><b>Battery:</b> {mobile.mobile.Capacity} MAH</p>

                                    </div>
                                    }
                                </div>
                            </div>
                            <div className='table-responsive'>
                            <table className="overflow-auto w-100 table border-1 table-responsive">
                                <thead className="price__head">
                                    <tr>
                                        {mobile?.prices?.length > 0 && mobile?.prices?.map((source, index) => (
                                            <th key={index} scope="col">
                                                {source.source}
                                            </th>
                                        ))}
                                        <th scope="col">MobileMate</th>
                                        <th scope="col">PriceOye</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="content__tr">
                                        {mobile && mobile?.prices?.map((mobile, index) => (
                                            <td key={index}><a target="_blank" href={mobile.href}>{mobile.price} PKR</a></td>
                                        ))}
                                        <td>Coming Soon</td>
                                        <td>Coming Soon</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default AdvanceSearchComponent