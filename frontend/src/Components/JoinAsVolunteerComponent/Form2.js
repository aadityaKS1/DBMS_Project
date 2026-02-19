import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form2() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [dropdownOpenSkills, setDropdownOpenSkills] = useState(false);

  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [dropdownOpenAvailability, setDropdownOpenAvailability] = useState(false);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [dropdownOpenLocation, setDropdownOpenLocation] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownOpenCategory, setDropdownOpenCategory] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    skills: [],
    location: [],
    availability: [],
    flexible: false,
    preferred_categories: [],
  });

  // Data for multi-selects
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

  const availabilityOptions = ["Morning", "Afternoon", "Evening"];
  const locationOptions = ["Kathmandu", "Lalitpur", "Bhaktapur"];
  const categoriesOptions = ["Environment", "Road", "Health", "Education", "Community", "Aaditya"];

  const toggleDropdown = (type) => {
    if (type === "skills") setDropdownOpenSkills(!dropdownOpenSkills);
    else if (type === "availability") setDropdownOpenAvailability(!dropdownOpenAvailability);
    else if (type === "location") setDropdownOpenLocation(!dropdownOpenLocation);
    else if (type === "categories") setDropdownOpenCategory(!dropdownOpenCategory);
  };

  const toggleSelection = (type, value) => {
    let updated;
    if (type === "skills") {
      updated = selectedSkills.includes(value)
        ? selectedSkills.filter((v) => v !== value)
        : [...selectedSkills, value];
      setSelectedSkills(updated);
      setFormData((prev) => ({ ...prev, skills: updated }));
    } else if (type === "availability") {
      updated = selectedAvailability.includes(value)
        ? selectedAvailability.filter((v) => v !== value)
        : [...selectedAvailability, value];
      setSelectedAvailability(updated);
      setFormData((prev) => ({ ...prev, availability: updated }));
    } else if (type === "location") {
      updated = selectedLocations.includes(value)
        ? selectedLocations.filter((v) => v !== value)
        : [...selectedLocations, value];
      setSelectedLocations(updated);
      setFormData((prev) => ({ ...prev, location: updated }));
    } else if (type === "categories") {
      updated = selectedCategories.includes(value)
        ? selectedCategories.filter((v) => v !== value)
        : [...selectedCategories, value];
      setSelectedCategories(updated);
      setFormData((prev) => ({ ...prev, preferred_categories: updated }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "flexible") {
      setFormData((prev) => ({ ...prev, flexible: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignUp = () => navigate("/signup");
  const handleRegister_club = () => navigate("/register_club");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        age: parseInt(formData.age),
        skills: formData.skills,
        location: formData.location,
        availability: formData.availability,
        flexible: formData.flexible,
        preferred_categories: formData.preferred_categories,
        role: "volunteer",
      };

      const response = await fetch("http://localhost:8000/api/volunteers/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) setError(data.error || "Failed to register");
      else {
        setSuccess("Registration successful! Check your email to verify your account.");
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          age: "",
          skills: [],
          location: [],
          availability: [],
          flexible: false,
          preferred_categories: [],
        });
        setSelectedSkills([]);
        setSelectedAvailability([]);
        setSelectedLocations([]);
        setSelectedCategories([]);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="absolute top-[581px] left-1/2 transform -translate-x-1/2 w-[512px] h-[1100px] bg-[#F8F9FAFF] rounded-[14px] shadow-[0_25px_50px_rgba(0,0,0,0.25)]">

      <p className="absolute top-[15px] left-[189px] font-poppins text-[24px] leading-[32px] font-bold text-[#171A1FFF]">
        Get Started
      </p>

      {/* Toggle Buttons */}
      <div className="absolute top-[58px] left-[19px] w-[471px] h-[45px] bg-[#DEE1E6FF] rounded-[20px]"></div>
      <button
        className="absolute top-[62px] left-[25px] w-[239px] h-[36px] px-[12px] flex items-center justify-center font-inter text-[14px] leading-[22px] font-normal text-white bg-[#4A90E2FF] rounded-[16px]"
      >
        Volunteer
      </button>

      <button
        className="absolute top-[62px] left-[308px] w-[140px] h-[36px] px-[12px] flex items-center justify-center font-inter text-[14px] leading-[22px] font-normal text-[#323743FF] bg-[#DEE1E6FF] rounded-[16px]"
        onClick={handleRegister_club}
      >
        Coordinator
      </button>

      <div className="absolute top-[128px] left-[136px] font-poppins text-[24px] leading-[32px] font-bold text-[#171A1FFF]">
        Volunteer Details
      </div>

      {/* Form Inputs */}
      <div className="absolute top-[177px] left-[47px] opacity-100 relative">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-[416px] h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
        />
      </div>

      <div className="absolute top-[245px] left-[47px] opacity-100 w-[416px]">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
        />
      </div>

      <div className="absolute top-[311px] left-[47px] opacity-100 w-[416px]">
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
        />
      </div>

      <div className="absolute top-[375px] left-[47px] opacity-100 w-[416px]">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
        />
      </div>

      <div className="absolute top-[441px] left-[47px] opacity-100 w-[416px]">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
        />
      </div>

      <div className="absolute top-[511px] left-[47px] opacity-100 w-[416px]">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
        />
      </div>

      {/* Skills Dropdown */}
      <div className="absolute top-[581px] left-[47px] w-[416px]">
        <button
          onClick={() => toggleDropdown("skills")}
          className="w-full h-[40px] pl-[12px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal text-[#565D6DFF] bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none flex items-center justify-between overflow-hidden"
        >
          <span className="truncate">
            {selectedSkills.length > 0 ? selectedSkills.join(", ") : "Select skills you have"}
          </span>
          <span className="ml-2">&#9662;</span>
        </button>
        {dropdownOpenSkills && (
          <div className="mt-2 w-full border border-[#BDC1CAFF] rounded-[12px] bg-white max-h-40 overflow-y-auto z-50 relative">
            {skillsOptions.map((skill) => (
              <label key={skill} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#4A90E2FF]"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSelection("skills", skill)}
                />
                <span className="text-[#565D6DFF] font-inter text-[14px]">{skill}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Dropdown */}
      <div className="absolute top-[650px] left-[47px] w-[416px]">
        <button
          onClick={() => toggleDropdown("location")}
          className="w-full h-[40px] pl-[12px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal text-[#565D6DFF] bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none flex items-center justify-between overflow-hidden"
        >
          <span className="truncate">
            {selectedLocations.length > 0 ? selectedLocations.join(", ") : "Select location"}
          </span>
          <span className="ml-2">&#9662;</span>
        </button>
        {dropdownOpenLocation && (
          <div className="mt-2 w-full border border-[#BDC1CAFF] rounded-[12px] bg-white max-h-40 overflow-y-auto z-50 relative">
            {locationOptions.map((loc) => (
              <label key={loc} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#4A90E2FF]"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => toggleSelection("location", loc)}
                />
                <span className="text-[#565D6DFF] font-inter text-[14px]">{loc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Dropdown */}
      <div className="absolute top-[720px] left-[47px] w-[416px]">
        <button
          onClick={() => toggleDropdown("availability")}
          className="w-full h-[40px] pl-[12px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal text-[#565D6DFF] bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none flex items-center justify-between overflow-hidden"
        >
          <span className="truncate">
            {selectedAvailability.length > 0 ? selectedAvailability.join(", ") : "Select availability"}
          </span>
          <span className="ml-2">&#9662;</span>
        </button>
        {dropdownOpenAvailability && (
          <div className="mt-2 w-full border border-[#BDC1CAFF] rounded-[12px] bg-white max-h-40 overflow-y-auto z-50 relative">
            {availabilityOptions.map((av) => (
              <label key={av} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#4A90E2FF]"
                  checked={selectedAvailability.includes(av)}
                  onChange={() => toggleSelection("availability", av)}
                />
                <span className="text-[#565D6DFF] font-inter text-[14px]">{av}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Flexible Checkbox */}
      <div className="absolute top-[790px] left-[47px] flex items-center gap-2">
        <input
          type="checkbox"
          name="flexible"
          checked={formData.flexible}
          onChange={handleChange}
          className="w-4 h-4 accent-[#4A90E2FF]"
        />
        <span className="text-[#565D6DFF] font-inter text-[14px]">Flexible</span>
      </div>

      {/* Preferred Categories Dropdown */}
      <div className="absolute top-[830px] left-[47px] w-[416px]">
        <button
          onClick={() => toggleDropdown("categories")}
          className="w-full h-[40px] pl-[12px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal text-[#565D6DFF] bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none flex items-center justify-between overflow-hidden"
        >
          <span className="truncate">
            {selectedCategories.length > 0 ? selectedCategories.join(", ") : "Select preferred categories"}
          </span>
          <span className="ml-2">&#9662;</span>
        </button>
        {dropdownOpenCategory && (
          <div className="mt-2 w-full border border-[#BDC1CAFF] rounded-[12px] bg-white max-h-40 overflow-y-auto z-50 relative">
            {categoriesOptions.map((cat) => (
              <label key={cat} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#4A90E2FF]"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleSelection("categories", cat)}
                />
                <span className="text-[#565D6DFF] font-inter text-[14px]">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Error & Success Messages */}
      {error && <p className="absolute top-[880px] left-[47px] text-red-500 text-sm">{error}</p>}
      {success && <p className="absolute top-[880px] left-[47px] text-green-500 text-sm">{success}</p>}

      {/* Submit Button */}
      <div className="absolute top-[910px] left-[47px] w-[416px]">
        <button
          className="w-full h-[40px] px-[12px] flex items-center justify-center font-inter text-[14px] leading-[22px] font-medium text-white bg-[#4A90E2FF] rounded-[12px] border-0 hover:bg-[#3181DDFF] active:bg-[#2272CEFF]"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>

      {/* Sign up as Organization */}
      <div className="absolute top-[970px] left-[171px] w-[180px]">
        <button
          className="w-full h-[40px] px-[12px] flex items-center justify-center font-inter text-[14px] leading-[22px] font-medium text-[#4A90E2FF] bg-transparent border-0 rounded-[12px]"
          onClick={handleRegister_club}
        >
          Sign up as Coordinator
        </button>
      </div>

      {/* Already have account */}
      <div className="flex gap-2">
        <p className="absolute top-[1030px] left-[144px] font-inter text-[14px] leading-[20px] font-normal text-[#565D6DFF]">
          Already have an account? 
        </p>
        <button
          className="absolute top-[1030px] left-[317px] w-[76px] h-[22px] px-[12px] font-inter text-[14px] leading-[22px] font-medium text-[#4A90E2FF] bg-transparent rounded-[10px]"
          onClick={handleSignUp}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Form2;
