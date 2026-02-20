import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg_img from "../Assets/Selection.jpg";

function OrganizationRegister() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    org_name: "",
    contact_person: "",
    contact_email: "",
    contact_phone: "",
    password: "",
  });

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!formData.org_name || !formData.contact_email || !formData.password) {
      setError("Required fields missing");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/org_register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("✅ Organization registered successfully!");

        setFormData({
          org_name: "",
          contact_person: "",
          contact_email: "",
          contact_phone: "",
          password: "",
        });
      }
    } catch (err) {
      console.error(err);
      setError("❌ Server error");
    }
  };

  return (
    <div className="w-full bg-transparent">

      {/* ================= HERO ================= */}
      <div className="relative w-full h-[420px] md:h-[520px] flex flex-col items-center justify-center text-center overflow-hidden">
        
        <img
          src={bg_img}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>

        <div className="relative z-10 px-4">
          <h1 className="font-poppins text-3xl md:text-5xl font-extrabold text-black">
            Create Impact with Your Organization
          </h1>

          <p className="mt-4 text-base md:text-xl text-black">
            Transform communities through organized volunteer efforts
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="flex justify-center px-4 -mt-24 relative z-20">
        <div className="w-full max-w-md bg-[#F8F9FA] rounded-2xl shadow-2xl p-6">

          {/* 🔥 TOGGLE */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-6">

            <button
              onClick={() => navigate("/register_volunteer")}
              className="flex-1 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-300 transition"
            >
              Volunteer
            </button>

            <button className="flex-1 py-2 rounded-full bg-blue-500 text-white font-medium shadow">
              Organization
            </button>

          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Organization Registration
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              name="org_name"
              placeholder="Organization Name"
              value={formData.org_name}
              onChange={handleChange}
              className="h-11 px-3 border rounded-xl"
            />

            <input
              type="text"
              name="contact_person"
              placeholder="Contact Person"
              value={formData.contact_person}
              onChange={handleChange}
              className="h-11 px-3 border rounded-xl"
            />

            <input
              type="email"
              name="contact_email"
              placeholder="Organization Email"
              value={formData.contact_email}
              onChange={handleChange}
              className="h-11 px-3 border rounded-xl"
            />

            <input
              type="text"
              name="contact_phone"
              placeholder="Phone Number"
              value={formData.contact_phone}
              onChange={handleChange}
              className="h-11 px-3 border rounded-xl"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="h-11 px-3 border rounded-xl"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              onClick={handleSubmit}
              className="h-11 bg-[#4A90E2] text-white rounded-xl font-medium hover:bg-blue-600 transition"
            >
              Create Account
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationRegister;