import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Request Body:", req.body);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "No user found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(401).json({ message: "Authentication failed: Incorrect credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d", // Token expires in 1 day
        });
        console.log("Generated Token:", token);

        // Set cookie with correct options
        res.cookie("token", token, {
            httpOnly: true, // Secure cookie
            secure: process.env.NODE_ENV === "production", // Use secure flag in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjust for cross-origin requests
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        console.log("Token set in cookie");
        return res.status(200).json({ user, token });
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
