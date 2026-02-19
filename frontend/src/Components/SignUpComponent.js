import React, { useState, useContext } from 'react';
import logo from '../Assets/punanirman_logo.png';
import { useNavigate } from "react-router-dom";
import loginImg from "../Assets/login_illustration.avif";
import { AuthContext } from './AuthContext'; 

function SignUpComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegisterClub = () => navigate("/register_club");

  const REDIRECT_PATHS = {
    volunteer: "/volunteer",
    organization: "/club",
    default: "/"
  };

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      // ✅ Store user in localStorage and update AuthContext
      const userData = {
        name: data.full_name,
        role: data.role, // "volunteer" or "organization"
        email: data.email,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData); // Navbar will update automatically

      // ✅ Redirect dynamically based on role
      const redirectTo =
        REDIRECT_PATHS[data.role] || REDIRECT_PATHS.default;

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate(redirectTo), 1500);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen gap-12">
      {/* Left rectangle with illustration */}
      <div className="w-[25%] flex items-center justify-center">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-full object-contain"
        />
      </div>

      {/* Right container */}
      <div className="w-[448px] h-[468px] bg-[#F8F9FAFF] rounded-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.87)] p-8 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Volunteer Logo" className="w-12 h-auto" />
            <h1 className="font-bold text-xl text-[#2F3B65FF]">पुनर्निर्माण</h1>
          </div>

          <h2 className="font-poppins text-[24px] leading-[32px] font-bold text-[#171A1FFF] text-center mb-4">
            Log In to Your Account
          </h2>
          <p className="font-inter text-[14px] leading-[20px] font-normal text-[#565D6DFF] text-center mb-6">
            Welcome back! Please enter details to continue
          </p>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[40px] px-4 mb-4 font-inter text-[14px] leading-[22px] font-normal
                       bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[40px] px-4 mb-2 font-inter text-[14px] leading-[22px] font-normal
                       bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
          />

          {/* Error / Success Messages */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

          <button
            className="w-full h-[40px] mb-4 font-inter text-[14px] leading-[22px] font-medium
                       text-white bg-[#4A90E2FF] rounded-[12px] border-0 hover:bg-[#3181DDFF] active:bg-[#2272CEFF]"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>

        {/* Bottom Section: Register */}
        <div className="text-center">
          <span className="font-inter text-[14px] leading-[20px] font-normal text-[#565D6DFF]">
            Don't have an account?
          </span>
          <button
            className="ml-2 font-inter text-[14px] leading-[22px] font-medium text-[#4A90E2FF] bg-transparent rounded-[10px]"
            onClick={handleRegisterClub}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
