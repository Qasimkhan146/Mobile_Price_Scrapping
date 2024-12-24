"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectUserAuth } from "../../../redux/authSlicer";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectUserAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    dispatch(registerUser(formData));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default Register;
