"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../../redux/authSlicer";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(logout());
      router.push("/Login");
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="flex items-center justify-center py-6">
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
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
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-gray-700 mb-6">Role: {user.role}</p>

          {/* User Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-2xl font-bold text-blue-700">200</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Active Users</h3>
              <p className="text-2xl font-bold text-green-700">180</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Inactive Users</h3>
              <p className="text-2xl font-bold text-yellow-700">20</p>
            </div>
          </div>

          {/* Manage Users Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example user rows */}
                <tr>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">johndoe@example.com</td>
                  <td className="px-4 py-2">Admin</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="ml-4 text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
                {/* More rows can be added dynamically */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
