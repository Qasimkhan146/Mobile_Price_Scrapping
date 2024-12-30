"use client";
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { loginUser, selectUserAuth } from "../../../redux/authSlicer";

const AdminLogin = () => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const { user, token, error, loading } = useSelector(selectUserAuth);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const credentials = {
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   };
  //   dispatch(loginUser(credentials));
  // };

  // useEffect(() => {
  //   // Debugging
  //   console.log("Token:", token);
  //   console.log("User:", user);

  //   // Redirect if authenticated
  //   if (token && user?.role === "admin") {
  //     router.replace("/Dashboard");
  //   }
  // }, [token, user, router]);

  return (
    <form >
      <h1>Admin Login</h1>
      {/* <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>} */}
    </form>
  );
};

export default AdminLogin;
