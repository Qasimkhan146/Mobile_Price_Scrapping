"use client";
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../../redux/authSlicer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { fetch10LatestMobiles, selectFetch10Mobiles } from "../../../redux/mobileSlicer";
const AdminDashboard = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const mobiles = useSelector(selectFetch10Mobiles);
  console.log(mobiles, "Mobiles");
  
  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'mobile', headerName: 'Mobile Name', width: 130 },
    { field: 'hamariweb', headerName: 'Hamari Web', width: 130 },
    { field: 'mobilemate', headerName: 'MobileMate', width: 130 },
    { field: 'priceoye', headerName: 'Price Oye', width: 130 },
    { field: 'whatmobile', headerName: 'WhatMobile', width: 130 }
  ];
  // const dispatch = useDispatch();
  useEffect(() => {
    console.log("AdminDashboard mounted");
    dispatch(fetch10LatestMobiles());
  }, [dispatch]);
  const handleButton = () =>{
    dispatch(fetch10LatestMobiles());
  }
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/Login");
    }
  }, [user, userLoading, router]);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(logout());
      router.push("/Login");
    }, 2000);
  };

  // if (!user) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-200">
  //       <p className="text-lg font-medium">Redirecting to login...</p>
  //     </div>
  //   );
  // }

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
              <Link
                href="/dashboard"
                className="block py-2 px-4 text-gray-300 hover:bg-blue-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/users"
                className="block py-2 px-4 text-gray-300 hover:bg-blue-700"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block py-2 px-4 text-gray-300 hover:bg-blue-700"
              >
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
          {/* <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}!</h1>
          <p className="text-gray-700 mb-6">Role: {user?.role}</p> */}

          {/* User Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Total Mobiles</h3>
              <p className="text-2xl font-bold text-blue-700">200</p>
            </div>
            {/* <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold"> </h3>
              <p className="text-2xl font-bold text-green-700">180</p>
            </div> */}
            {/* <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Inactive Users</h3>
              <p className="text-2xl font-bold text-yellow-700">20</p>
            </div> */}
          </div>

          {/* Manage Users Table */}
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
          <button onClick={handleButton}>Get Data</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
