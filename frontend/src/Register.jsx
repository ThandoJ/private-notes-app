import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://private-notes-app-1-6q2h.onrender.com/api/auth/signup",
        { email, password }
      );

      console.log(res.data);
      alert("Account created! Now login.");

      window.location.href = "/";
     } catch (err) {
    console.error("FULL ERROR:", err);
    console.error("SERVER RESPONSE:", err.response?.data);

    alert(err.response?.data?.error || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-2 rounded hover:opacity-80"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}