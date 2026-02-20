import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg_img from "../Assets/Selection.jpg";

function VolunteerRegister() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    password: "",
    availability: true,
  });

  const skillsOptions = [
    "Teacher",
    "Labor",
    "Medic",
    "Cook",
    "Electrician",
    "Engineer",
    "Mason",
    "Carpenter",
    "Technician",
    "Driver",
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [dropdownOpenSkills, setDropdownOpenSkills] = useState(false);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SKILLS =================
  const toggleSkill = (skill) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(updated);
    setFormData((prev) => ({ ...prev, skills: updated }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email) {
      setError("Name and Email are required");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        skill: formData.skills.join(", "),
        availability: formData.availability,
        password: formData.password,
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/vol_register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("✅ Volunteer registered successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: [],
          password: "",
          availability: true,
        });

        setSelectedSkills([]);
        setDropdownOpenSkills(false);
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
            Create Impact with Your Presence
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

            <button className="flex-1 py-2 rounded-full bg-blue-500 text-white font-medium shadow">
              Volunteer
            </button>

            <button
              onClick={() => navigate("/register_club")}
              className="flex-1 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-300 transition"
            >
              Organization
            </button>

          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Volunteer Registration
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="h-11 px-3 border rounded-xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="h-11 px-3 border rounded-xl"
            />

            {/* Availability */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
              />
              Available for volunteering
            </label>

            {/* Skills */}
            <button
              type="button"
              onClick={() => setDropdownOpenSkills(!dropdownOpenSkills)}
              className="h-11 px-3 border rounded-xl text-left"
            >
              {selectedSkills.length > 0
                ? selectedSkills.join(", ")
                : "Select skills"}
            </button>

            {dropdownOpenSkills && (
              <div className="border rounded-xl max-h-40 overflow-y-auto bg-white">
                {skillsOptions.map((skill) => (
                  <label
                    key={skill}
                    className="flex gap-2 px-3 py-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              onClick={handleSubmit}
              className="h-11 bg-[#4A90E2] text-white rounded-xl font-medium hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerRegister;