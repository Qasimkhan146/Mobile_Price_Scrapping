"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { fetchAllMobiles, selectAllMobiles } from "../../../redux/mobileSlicer";
import { logout } from "../../../redux/authSlicer";
import "./Dashboard.css";

const AdminDashboard = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const mobiles = useSelector(selectAllMobiles);
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchModel, setSearchModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "mobile", headerName: "Mobile Name", width: 160 },
    { field: "hamariweb", headerName: "Hamari Web", width: 130 },
    { field: "mobilemate", headerName: "MobileMate", width: 130 },
    { field: "priceoye", headerName: "Price Oye", width: 130 },
    { field: "whatmobile", headerName: "WhatMobile", width: 130 },
    { field: "daraz", headerName: "Daraz", width: 130 },
    {
      field: "operations",
      headerName: "Operations",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => router.push(`/Dashboard/${params.row._id}`)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
      ),
    },
  ];

  // Map mobiles to rows
  useEffect(() => {
    if (mobiles?.length > 0) {
      const formattedRows = mobiles.map((mobile, index) => ({
        id: index + 1,
        _id: mobile.model.replace(/ /g, "-"),
        mobile: mobile.model || "N/A",
        hamariweb: mobile.hamariweb_price || "N/A",
        mobilemate: mobile.mobilemate_price || "N/A",
        priceoye: mobile.priceoye_price || "N/A",
        whatmobile: mobile.whatmobile_price || "N/A",
        daraz: mobile.daraz_price,
      }));
      setRows(formattedRows);
      setFilteredRows(formattedRows); // Initialize filteredRows
    }
  }, [mobiles]);

  // Fetch mobiles
  useEffect(() => {
    dispatch(fetchAllMobiles());
  }, [dispatch]);

  // Logout handler
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(logout());
      router.push("/Login");
    }, 2000);
  };

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/Login");
    }
  }, [user, userLoading, router]);

  // Handle search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filterData = rows.filter((row) =>
      row.mobile.toLowerCase().includes(searchModel.toLowerCase())
    );
    setFilteredRows(filterData);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="flex items-center justify-center py-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <Link href="/dashboard" className="block py-2 px-4 text-gray-300 hover:bg-blue-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/users" className="block py-2 px-4 text-gray-300 hover:bg-blue-700">
                Manage Users
              </Link>
            </li>
            <li>
              <Link href="/settings" className="block py-2 px-4 text-gray-300 hover:bg-blue-700">
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full py-2 px-4 text-left text-gray-300 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Total Mobiles</h3>
              <p className="text-2xl font-bold text-blue-700">{mobiles?.length || 0}</p>
            </div>
            <div className="p-4 shadow-md rounded-lg">
              <h1 className="text-2xl font-bold mb-4">Search Mobile</h1>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative">
                  <label htmlFor="mobileSearch" className="sr-only">
                    Search Mobile Model
                  </label>
                  <input
                    id="mobileSearch"
                    className="form-control px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                    placeholder="Enter mobile model..."
                  />
                  {searchModel && (
                    <button
                      type="button"
                      onClick={() => setSearchModel("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label="Clear input"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  className="search-btn-dash bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-200"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>


          </div>

          {/* Data Table */}
          <Paper sx={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
