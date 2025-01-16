"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchMobileDetail, selectMobileDetail, editMobile, selectEditMobile, editPrices } from "../../../../redux/mobileSlicer";
import { toast } from "react-toastify";
const Dashboard = () => {
  const mobileDetail = useSelector(selectMobileDetail);
  const mobileData = useSelector(selectEditMobile);
  const dispatch = useDispatch();
  const { id } = useParams();
  const slugParts = id.split("-");
  const brandName = slugParts[0].toUpperCase();
  const newSlug = slugParts.join("-").replace(/-/g, " ");
  const modelName = slugParts.slice(1).join("-").replace(/-/g, " ");
  const [prices, setPrices] = useState([]);
  const [formValues, setFormValues] = useState({});
  const editableFields = ["Ram", "Rom", "Back_Cam", "front_Cam", "Capacity"];
  const priceFields = ["mobilemate_price", "hamariweb_price", "whatmobile_price", "priceoye_price", "daraz_price"];
  const linkFields = ["mobilemate_link", "hamariweb_link", "whatmobile_link", "priceoye_link", "daraz_link"];
  // const [disableUpdateBtn, setDisableUpdateBtn] = useState(true);
  // Field types mapping
  const fieldTypes = {
    price: "number",
    Ram: "number",
    Rom: "number",
    Back_Cam: "number",
    front_Cam: "number",
    Capacity: "number",
    hamariweb_price: "number",
    whatmobile_price: "number",
    priceoye_price: "number",
    mobilemate_price: "number",
  };

  useEffect(() => {
    dispatch(fetchMobileDetail(newSlug));
  }, [dispatch]);
  //   const sources = mobileDetail?.prices.map((price) => price.source);

  useEffect(() => {
    if (mobileDetail) {
      setFormValues(mobileDetail);
    }
    if (mobileDetail?.prices) {
      setPrices(mobileDetail.prices);
    }
  }, [mobileDetail]);
  const handlePriceChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };
  const handleInputChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };
 const handlePrice = async () => {
  // console.log(prices,"prices");
  
  try {
    // Extract only the editable fields
    const updatedData = Object.fromEntries(
      Object.entries(formValues).filter(([key]) => [...priceFields, ...linkFields].includes(key))
    );
    
    if(mobileDetail.mobilemate_price !== updatedData.mobilemate_price || mobileDetail.whatmobile_price !== updatedData.whatmobile_price || mobileDetail.priceoye_price !== updatedData.priceoye_price || mobileDetail.hamariweb_price !== updatedData.hamariweb_price){
      console.log(updatedData,"updatde Data");     
    }
       
    await dispatch(editPrices({ model: modelName, updatedPrices:updatedData })).unwrap();
    toast.success("Mobile Price updated successfully!");
  } catch (error) {
    toast.error("Failed to update mobile details. Please try again.");
  }
 }
  const handleSave = async () => {
    try {
      // Extract only the editable fields
      const updatedData = Object.fromEntries(
        Object.entries(formValues).filter(([key]) => editableFields.includes(key))
      );
       console.log(updatedData,"updatde Data");
       
      await dispatch(editMobile({ model: modelName, updatedData })).unwrap();
      toast.success("Mobile details updated successfully!");
    } catch (error) {
      toast.error("Failed to update mobile details. Please try again.");
    }
  };

  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{formValues?.model}</h1>
      <div className="flex justify-center mb-6">
        <Image
          src={formValues?.img_url_mobilemate || "/placeholder-image.jpg"}
          alt="Image"
          width={200}
          height={200}
          className="rounded-lg shadow-md"
        />
      </div>
      {/* <div className="table-responsive w-100 table__container">
        <table className="table border-1 table-striped">
          <thead>
            <tr>
              <th>Mobilemate</th>
              <th>Hamari Web</th>
              <th>WhatMobile</th>
              <th>PriceOye</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {["mobilemate_price", "hamariweb_price", "whatmobile_price", "priceoye_price"].map((field, index) => (
                <td key={index}>
                  <input
                    type="number"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formValues[field] || 0}
                    onChange={(e) => handleInputChange(field, parseFloat(e.target.value) || 0)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              {["mobilemate_link", "hamariweb_link", "whatmobile_link", "priceoye_link"].map((field, index) => (
                <td key={index}>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formValues[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div> */}
            <div className="table-responsive w-100 table__container">
        <table className="table border-1 table-striped">
          <thead>
            <tr>
              {priceFields.map((field, index) => (
                <th key={index}>{field.replace("_price", "").toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {priceFields.map((field, index) => (
                <td key={index}>
                  <input
                    type="number"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formValues[field] || 0}
                    onChange={(e) => handlePriceChange(field, parseFloat(e.target.value) || 0)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              {linkFields.map((field, index) => (
                <td key={index}>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formValues[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
        <button className="btn btn-primary mb-3" 
              disabled={mobileDetail?.mobilemate_price === formValues?.mobilemate_price && mobileDetail?.whatmobile_price === formValues?.whatmobile_price && mobileDetail?.priceoye_price === formValues?.priceoye_price && mobileDetail?.hamariweb_price === formValues?.hamariweb_price && mobileDetail?.daraz_price === formValues?.daraz_price && mobileDetail?.mobilemate_link === formValues?.mobilemate_link && mobileDetail?.whatmobile_link === formValues?.whatmobile_link && mobileDetail?.priceoye_link === formValues?.priceoye_link && mobileDetail?.hamariweb_link === formValues?.hamariweb_link && mobileDetail?.daraz_link === formValues?.daraz_link }
        
        onClick={handlePrice}>Update</button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {editableFields.map((field) => (
          <div key={field} className="flex flex-col bg-white p-4 shadow-md rounded-lg">
            <label className="font-medium text-gray-700 mb-2">{field}</label>
            <input
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="number"
              value={formValues[field] || 0}
              onChange={(e) => handleInputChange(field, parseFloat(e.target.value) || 0)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
