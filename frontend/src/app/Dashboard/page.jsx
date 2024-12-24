"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      router.push("/Login");
    }
  }, [token, user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>
      <div className="dashboard-content">
        <p>This is your admin dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;
