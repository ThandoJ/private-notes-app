import express from "express";
import { supabase } from "../config/supabaseClient.js";
import jwt from "jsonwebtoken";

const router = express.Router();


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("SIGNUP ERROR:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: "Signup successful",
      user: data.user,
    });

  } catch (err) {
    console.log("SERVER ERROR:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("LOGIN ERROR:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const token = jwt.sign(
      { user: data.user },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production (https)
    });

    return res.json({ message: "Login successful" });

  } catch (err) {
    console.log("SERVER ERROR:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
});


// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
});

export default router;