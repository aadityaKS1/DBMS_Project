import React, { useState, useContext } from "react";
import logo from "../Assets/punanirman_logo.png";
import { useNavigate } from "react-router-dom";
import loginImg from "../Assets/login_illustration.avif";
import { AuthContext } from "./AuthContext";

function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // 🔥 NEW: role state
  const [role, setRole] = useState("volunteer");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegisterClub = () => navigate("/register_club");

  // ================= LOGIN =================
  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // ✅ dynamic payload based on role
      const payload =
        role === "volunteer"
          ? {
              email: email.trim(),
              password: password.trim(),
            }
          : {
              contact_email: email.trim(),
              password: password.trim(),
            };

      // ✅ dynamic endpoint
      const endpoint =
        role === "volunteer"
          ? "http://127.0.0.1:8000/api/vol_login/"
          : "http://127.0.0.1:8000/api/org_login/";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      // ✅ store user based on role
      const userData =
        role === "volunteer"
          ? {
              id: data.volunteer_id,
              name: data.name,
              email: email.trim(),
              role: "volunteer",
            }
          : {
              id: data.org_id,
              name: data.org_name,
              email: email.trim(),
              role: "organization",
            };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      setSuccess("Login successful! Redirecting...");

      // ✅ role-based redirect
      setTimeout(() => {
        navigate(role === "volunteer" ? "/volunteer" : "/club");
      }, 1200);

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  // ================= UI =================
  return (
    <div className="flex justify-center items-center h-screen gap-12">

      {/* Left Illustration */}
      <div className="w-[25%] flex items-center justify-center">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-full object-contain"
        />
      </div>

      {/* Right Login Box */}
      <div className="w-[448px] min-h-[468px] bg-[#F8F9FAFF] rounded-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.87)] p-8 flex flex-col justify-between">

        <div>
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Volunteer Logo" className="w-12 h-auto" />
            <h1 className="font-bold text-xl text-[#2F3B65FF]">
              पुनर्निर्माण
            </h1>
          </div>

          <h2 className="text-[24px] font-bold text-center mb-4">
            Log In to Your Account
          </h2>

          <p className="text-sm text-center mb-6 text-[#565D6DFF]">
            Welcome back! Please enter details to continue
          </p>

          {/* 🔥 ROLE TOGGLE */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-4">
            <button
              onClick={() => setRole("volunteer")}
              className={`flex-1 py-2 rounded-full font-medium ${
                role === "volunteer"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Volunteer
            </button>

            <button
              onClick={() => setRole("organization")}
              className={`flex-1 py-2 rounded-full font-medium ${
                role === "organization"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Organization
            </button>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[40px] px-4 mb-4 border rounded-[12px]"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[40px] px-4 mb-2 border rounded-[12px]"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

          <button
            onClick={handleLogin}
            className="w-full h-[40px] mb-4 text-white bg-[#4A90E2FF] rounded-[12px] hover:bg-[#3181DDFF]"
          >
            Log In
          </button>
        </div>

        {/* Bottom */}
        <div className="text-center">
          <span className="text-sm text-[#565D6DFF]">
            Don't have an account?
          </span>
          <button
            onClick={handleRegisterClub}
            className="ml-2 text-[#4A90E2FF] font-medium"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;