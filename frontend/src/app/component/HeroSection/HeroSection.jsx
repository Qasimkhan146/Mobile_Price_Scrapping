"use client";
import React, { useState, useEffect, useRef } from "react";
import "./HeroSection.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import {fetchAllBrands, selectAllBrands, fetchFilterMobiles, fetch10LatestMobiles} from "../../../../redux/mobileSlicer";
import { useDispatch, useSelector } from 'react-redux';

import ContentArea from "../ContentArea/ContentArea";
import { ChevronRight, Clear, ExpandMore, FilterAlt } from "@mui/icons-material";
import Link from "next/link";




const ramData = ["2", "4", "6", "8", "10", "12"];
const storageData = ["32", "64", "128", "256", "512", "1024"];
const releaseDate = ["2020","2021","2022","2023","2024"];
const HeroSection = () => {
  const dispatch = useDispatch();
  const [displayFilter, setDisplayFilter] = useState(false);
  const  fetchBrands  = useSelector(selectAllBrands);
  const [backCam, setBackCam] = useState("");
  const [model, setModel] = useState("");
  const [selectedData, setSelectedData] = useState({
    selectBrand:"",
    selectedRam:"",
    selectedStorage:"",
    selectedBackCam:"",
    selectedModel:"",
    selectedDate:""
  });
  useEffect(() => {
    dispatch(fetchAllBrands());  
}, [dispatch]);
  const dropdownRefs = useRef({});
  const [displayDropdown, setDisplayDropdown] = useState("");
  useEffect(() => {
    // if(selectedData.selectBrand){
      dispatch(fetch10LatestMobiles({brand: selectedData.selectBrand, Ram:selectedData.selectedRam, Rom:selectedData.selectedStorage, Back_Cam: selectedData.selectedBackCam, model:selectedData.selectedModel, Year: selectedData.selectedDate}));
    
}, [dispatch, selectedData]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isOutside = Object.entries(dropdownRefs.current).every(([key, ref]) => {
        return ref.current && !ref.current.contains(event.target);
      });

      if (isOutside) {
        setDisplayDropdown("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const setDropdownRef = (dropdownId, node) => {
    dropdownRefs.current[dropdownId] = { current: node };
  };
  return (
    <Container>
      <Row className="mt-4">
      <div className="w-100 d-flex justify-content-end d-block d-lg-none"><FilterAlt onClick={()=>setDisplayFilter(!displayFilter)} sx={{ fontSize: 40, color: '#ee1351', cursor:"pointer"}}/></div>
        <Col className="d-none d-lg-flex gap-2 brands__div flex-wrap">
          <div ref={(node) => setDropdownRef("brand", node)} className="position-relative">
            <div  className="select-inputs  d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "brand") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("brand")
              }
            }}>
              {selectedData.selectBrand === ""?"Select a Brand": selectedData.selectBrand}
              <div>
               {selectedData.selectBrand !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectBrand: "" })} /> } 
              {displayDropdown === "brand" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "brand" && (
              <div  className="display__brands">
                {fetchBrands?.length > 0 && fetchBrands.map((brand, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectBrand: brand.brand
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {brand.brand}
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("model", node)}  className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "model") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("model")
              }
            }}>
                {selectedData.selectedModel === ""?"Enter Model Name": `${selectedData.selectedModel}`}
                <div>
               {selectedData.selectedModel !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedModel: "" })} /> } 
              {displayDropdown === "model" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "model" && (
              <div className="display__camera">
              <input type="text" onChange={(e) => setModel(e.target.value)} value={model} placeholder="Enter Model Name" className="form-control"/>
              <button className="cam__btn" onClick={()=>{setSelectedData({...selectedData, selectedModel: model}); setDisplayDropdown("")}}>Submit</button>
          </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("ram", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "ram") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("ram")
              }
            }}>
            {selectedData.selectedRam === ""?"RAM": `${selectedData.selectedRam} GB`}
            <div>
               {selectedData.selectedRam !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedRam: "" })} /> } 
              {displayDropdown === "ram" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "ram" && (
              <div className="display__ram">
                {ramData.map((ram, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectedRam: ram
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {ram} GB
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("storage", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "storage") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("storage")
              }
            }}>
              {selectedData.selectedStorage === ""?"Storage": `${selectedData.selectedStorage} GB`}
              <div>
               {selectedData.selectedStorage !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedStorage: "" })} /> } 
              {displayDropdown === "storage" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "storage" && (
              <div className="display__storage">
                {storageData.map((storage, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectedStorage: storage
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {storage} GB
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("date", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "date") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("date")
              }
            }}>
              {selectedData.selectedDate === ""?"Date": `${selectedData.selectedDate} `}
              <div>
               {selectedData.selectedDate !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedDate: "" })} /> } 
              {displayDropdown === "storage" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "date" && (
              <div className="display__storage">
                {releaseDate.map((date, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectedDate: date
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {date}
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
          {/* <select className="form-control select-inputs">
            <option>Storage</option>
            <option>128 GB</option>
          </select> */}
          <div ref={(node) => setDropdownRef("camera", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "camera") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("camera")
              }
            }}>
             {selectedData.selectedBackCam === ""?"Back Camera": `${selectedData.selectedBackCam} MP`}
             <div>
               {selectedData.selectedBackCam !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedBackCam: "" })} /> } 
              {displayDropdown === "camera" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "camera" && (
              <div className="display__camera">
                  <input type="number" onChange={(e) => setBackCam(e.target.value)} value={backCam} min="1" max="100" placeholder="Enter Back Camera MP" className="form-control"/>
                  <button className="cam__btn" onClick={()=>{setSelectedData({...selectedData, selectedBackCam: backCam}); setDisplayDropdown("")}}>Submit</button>
              </div>
            )
            }
          </div>
          <div onClick={() => setSelectedData({selectBrand:"", selectedRam:"", selectedStorage:"", selectedBackCam:"", selectedModel:""})} className="clear__filter">Clear All Filter</div>
          <Link href="/AdvanceSearch" className="clear__filter">Advance Search</Link>
        </Col>
        {
          displayFilter && (
            <Col className="d-flex d-lg-none flex-column gap-2 brands__divs">
            <div ref={(node) => setDropdownRef("brand", node)} className="position-relative">
            <div  className="select-inputs  d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "brand") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("brand")
              }
            }}>
              {selectedData.selectBrand === ""?"Select a Brand": selectedData.selectBrand}
              <div>
               {selectedData.selectBrand !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectBrand: "" })} /> } 
              {displayDropdown === "brand" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "brand" && (
              <div  className="display__brand">
                {fetchBrands?.length > 0 && fetchBrands.map((brand, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectBrand: brand.brand
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {brand.brand}
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("model", node)}  className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "model") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("model")
              }
            }}>
                {selectedData.selectedModel === ""?"Enter Model Name": `${selectedData.selectedModel}`}
                <div>
               {selectedData.selectedModel !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedModel: "" })} /> } 
              {displayDropdown === "model" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "model" && (
              <div className="display__camera">
              <input type="text" onChange={(e) => setModel(e.target.value)} value={model} placeholder="Enter Model Name" className="form-control"/>
              <button className="cam__btn" onClick={()=>{setSelectedData({...selectedData, selectedModel: model}); setDisplayDropdown("")}}>Submit</button>
          </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("ram", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "ram") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("ram")
              }
            }}>
            {selectedData.selectedRam === ""?"RAM": `${selectedData.selectedRam} GB`}
            <div>
               {selectedData.selectedRam !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedRam: "" })} /> } 
              {displayDropdown === "ram" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "ram" && (
              <div className="display__ram">
                {ramData.map((ram, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectedRam: ram
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {ram} GB
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("storage", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "storage") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("storage")
              }
            }}>
              {selectedData.selectedStorage === ""?"Storage": `${selectedData.selectedStorage} GB`}
              <div>
               {selectedData.selectedStorage !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedStorage: "" })} /> } 
              {displayDropdown === "storage" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "storage" && (
              <div className="display__ram">
                {storageData.map((storage, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectedStorage: storage
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {storage} GB
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
          <div ref={(node) => setDropdownRef("date", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "date") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("date")
              }
            }}>
              {selectedData.selectedDate === ""?"Date": `${selectedData.selectedDate} `}
              <div>
               {selectedData.selectedDate !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedDate: "" })} /> } 
              {displayDropdown === "storage" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "date" && (
              <div className="display__date">
                {releaseDate.map((date, index) => (
                  <div key={index} onClick={() => {
                    setSelectedData({
                      ...selectedData,
                      selectedDate: date
                    });
                    setDisplayDropdown("");
                  }} className="brand__lists d-flex align-items-center gap-2">
                    <div>
                      <div>

                      </div>
                    </div>
                    <li >
                      {date}
                    </li>
                  </div>
                ))}
              </div>
            )
            }
          </div>
            {/* <select className="form-control select-inputs">
              <option>Storage</option>
              <option>128 GB</option>
            </select> */}
            <div ref={(node) => setDropdownRef("camera", node)} className="position-relative">
            <div className="select-inputs d-flex flex-row justify-content-between align-items-center" onClick={() => {
              if (displayDropdown === "camera") {
                setDisplayDropdown("");
              } else {
                setDisplayDropdown("camera")
              }
            }}>
             {selectedData.selectedBackCam === ""?"Back Camera": `${selectedData.selectedBackCam} MP`}
             <div>
               {selectedData.selectedBackCam !== "" && <Clear sx={{ fontSize: 16, color: '#fff', cursor:"pointer"}} onClick={() => setSelectedData({ ...selectedData, selectedBackCam: "" })} /> } 
              {displayDropdown === "camera" ? <ExpandMore sx={{ color: '#fff', cursor:"pointer"}}  /> : <ChevronRight />}
              </div>
            </div>
            {displayDropdown === "camera" && (
              <div className="display__camera">
                  <input type="number" onChange={(e) => setBackCam(e.target.value)} value={backCam} min="1" max="100" placeholder="Enter Back Camera MP" className="form-control"/>
                  <button className="cam__btn" onClick={()=>{setSelectedData({...selectedData, selectedBackCam: backCam}); setDisplayDropdown("")}}>Submit</button>
              </div>
            )
            }
          </div>
          <div className="d-flex justify-content-start">
            <button className="clear__filter" onClick={() => setSelectedData({selectBrand:"", selectedRam:"", selectedStorage:"", selectedBackCam:"", selectedModel:""})}>Clear All Filter</button>
            </div>

          </Col>
          )

        }

      </Row>

      <Row className="d-flex gap-5 mt-4">
        <Col md={12} className="shadow-sm p-3">
          <h3 className="differ__heading__text text-center mb-3 p-2">
            Mobile Phones Prices on Different Websites
          </h3>
          <ContentArea />
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;