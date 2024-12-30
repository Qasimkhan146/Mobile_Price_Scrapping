"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { LuRefreshCw } from "react-icons/lu";
import Image from "next/image";
import { Form } from "react-bootstrap";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./AdvanceSearchComponent.css";
// import { useSearchParams } from 'next/navigation';

const AdvanceSearchComponent = () => {
    // const searchParams = useSearchParams();
    // const queryTitle = searchParams.get('title');
    // const queryBrand = searchParams.get('brand');
    // const queryRamMin = searchParams.get('ramMin');
    // const queryRamMax = searchParams.get('ramMax');
    // const queryStorageMin = searchParams.get('storageMin');
    // const queryStorageMax = searchParams.get('storageMax');
    // const queryBackCamMin = searchParams.get('backCamMin');
    // const queryBackCamMax = searchParams.get('backCamMax');
    // const queryPriceMin = searchParams.get('minPrice');
    // const queryPriceMax = searchParams.get('maxPrice');
    const [ramRange, setRamRange] = useState([2, 32]);
    const [storageRange, setStorageRange] = useState([16, 1024]);
    const [priceRange, setPriceRange] = useState([0, 700000]);
    const [backCamRange, setBackCamRange] = useState([4, 50]);
//   const [searchQuery, setSearchQuery] = useState({ brand: queryBrand || '', title: queryTitle || '', city: queryCity || '', minPrice: queryPriceMin || 0, maxPrice: queryPriceMax || 700000 });
    
    // console.log(queryTitle, "Query Title");
    

    const handleRamChange = (values) => {
        // console.log(values, "Values");
    
        setRamRange(values);
        // fetchAds();
      };
      const handleStorageChange = (values) => {
        // console.log(values, "Values");
    
        setStorageRange(values);
        // fetchAds();
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
    return (
        <div className="d-flex py-5 min-vh-100">
        <div className="col-lg-3 border border-2 p-4 rounded h-50">
            <form >
              <div className="d-flex align-items-center justify-content-between flex-row mb-2">
                <h5>Search Filters</h5>
                <div className='d-flex align-items-center gap-2 flex-row'>
                <LuRefreshCw  className='cursor-pointer' size={18} />
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
                    // value={searchQuery.title}
                    // onChange={handleSearchInputChange}
                    className="form-control mb-2 ps-5"
                    placeholder="Search by Model"
                  />
                  <input
                    type="text"
                    name="brand"
                    // value={searchQuery.brand}
                    // onChange={handleSearchInputChange}
                    className="form-control mb-2 ps-5"
                    placeholder="Search by Brand"
                  />
                  <hr/>
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

        <div className="advance__search__data">

        </div>
        </div>
    )
}
export default AdvanceSearchComponent