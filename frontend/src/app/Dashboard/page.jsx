"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../../redux/authSlicer";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminDashboard = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <p className="text-lg font-medium">Redirecting to login...</p>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-gray-700 mb-6">Role: {user.role}</p>

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
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left min-w-[150px]">
                    Model_Names
                  </th>
                  <th className="px-4 py-2 text-left min-w-[120px]">
                    WhatMobile
                  </th>
                  <th className="px-4 py-2 text-left min-w-[120px]">
                    PriceOye
                  </th>
                  <th className="px-4 py-2 text-left min-w-[120px]">
                    HamariWeb
                  </th>
                  <th className="px-4 py-2 text-left min-w-[120px]">
                    MobileMate
                  </th>
                  <th className="px-4 py-2 text-left min-w-[200px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Example user rows */}
                <tr>
                  <td className="px-4 py-2 ">Iphone Xs Max</td>
                  <td className="px-4 py-2">120000</td>
                  <td className="px-4 py-2">123000</td>
                  <td className="px-4 py-2">113000</td>
                  <td className="px-4 py-2">133000</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </td>
                </tr>
                {/* Add more rows dynamically */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
