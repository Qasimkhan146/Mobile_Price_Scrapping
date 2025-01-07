"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchMobileDetail, selectMobileDetail, editMobile, selectEditMobile } from "../../../../redux/mobileSlicer";
import { toast } from "react-toastify";
const Dashboard = () => {
  const mobileDetail = useSelector(selectMobileDetail);
  const mobileData = useSelector(selectEditMobile);
  const dispatch = useDispatch();
  const { id } = useParams();
  const slugParts = id.split("-");
  const brandName = slugParts[0].toUpperCase();
  const modelName = slugParts.slice(1).join("-").replace(/-/g, " ");
  const [prices, setPrices] = useState([]);
  // State to manage the form inputs
  const [formValues, setFormValues] = useState({});

  // List of fields to make read-only
  const readOnlyFields = ["Ram", "Rom", "Back_Cam", "front_Cam", "Capacity"];

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
    dispatch(fetchMobileDetail(modelName));
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
  const handlePriceChange = (index, newPrice) => {
    setPrices((prevPrices) =>
      prevPrices.map((price, i) =>
        i === index ? { ...price, price: newPrice } : price
      )
    );
  };

  // Handle input change
  const handleInputChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };
  const handleSave = async () => {
    try {
      await dispatch(editMobile({ model: formValues?.model, updatedData: formValues })).unwrap(); // If using Redux Toolkit's createAsyncThunk
      toast.success("WelDone Mubashar Putar Mobile Update Hogya!", {
        // position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Failed to update mobile details. Please try again.", {
        // position: toast.POSITION.TOP_RIGHT,
      });
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
      <div className="table-responsive w-100 table__container">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(formValues)
          .filter(([key]) => readOnlyFields.includes(key)) // Display only readonly fields
          .map(([key, value]) => (
            <div key={key} className="flex flex-col bg-white p-4 shadow-md rounded-lg">
              <label className="font-medium text-gray-700 mb-2">{key}</label>
              <input
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type={fieldTypes[key] || "text"} // Default to "text" if no type is specified
                value={value || 0}
                readOnly={!readOnlyFields.includes(key)} // Make field read-only if it is in the list
                onChange={(e) =>
                  readOnlyFields.includes(key) && handleInputChange(key, e.target.value)
                }

              />
            </div>
          ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md"
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
