"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/authSlicer";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [loadingState, setLoadingState] = useState(false); // Track loading state
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector((state) => state.user);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingState(true); // Start loading

    // Simulate a 2-second delay before dispatching the registration action
    setTimeout(() => {
      dispatch(registerUser(formData));
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      router.push("/Login"); // Navigate to Login on successful registration
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Create an Account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-lg text-gray-700 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 font-medium" htmlFor="role">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={loadingState || loading}
        >
          {loadingState || loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error.message}</p>}

        <div className="text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="/Login" className="text-teal-600 hover:text-teal-700 font-medium">
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
