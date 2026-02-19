import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form1() {
    const navigate = useNavigate();

    // Form states
    const [orgName, setOrgName] = useState("");
    const [orgType, setOrgType] = useState("");
    const [categories, setCategories] = useState([]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const options = ["NGO", "INGO"];
    const categoriesList = [
        "Education",
        "Social Service",
        "Animal Care",
        "Fellowship",
        "Other",
    ];

    // Navigation handlers
    const handleSignUp = () => navigate("/signup");
    const handleRegister_volunteer = () => navigate("/register_volunteer");
    const handleRegister_club = () => navigate("/register_club");

    // Dropdown handlers
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);
    const selectOption = (option) => {
        setOrgType(option);
        setDropdownOpen(false);
    };
    const toggleCategory = (category) => {
        if (categories.includes(category)) {
            setCategories(categories.filter((c) => c !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    // Submit handler
    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (
            !orgName.trim() ||
            !orgType ||
            categories.length === 0 ||
            !email.trim() ||
            !phone.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const payload = {
            name: orgName,
            org_type: orgType,
            categories: categories,
            email: email,
            phone: phone,
            password: password,
        };

        try {
            const response = await fetch(
                "http://localhost:8000/api/clubs/register/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || JSON.stringify(data) || "Registration failed.");
            } else {
                setSuccess("Registration successful! Admin will verify your account.");
                setOrgName("");
                setOrgType("");
                setCategories([]);
                setEmail("");
                setPhone("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again later.");
        }
    };

    return (
        <div className="absolute top-[581px] left-1/2 transform -translate-x-1/2 w-[512px] h-[801px] bg-[#F8F9FAFF] rounded-[14px] shadow-[0_25px_50px_rgba(0,0,0,0.25)]">

            <p className="absolute top-[15px] left-[189px] font-poppins text-[24px] leading-[32px] font-bold text-[#171A1FFF]">
                Get Started
            </p>

            {/* Toggle Buttons */}
            <div className="absolute top-[58px] left-[19px] w-[471px] h-[45px] bg-[#DEE1E6FF] rounded-[20px]"></div>
            <button
                className="absolute top-[62px] left-[24px] w-[229px] h-[36px] px-[12px] flex items-center justify-center font-inter text-[14px] leading-[22px] font-normal text-[#323743FF] bg-[#DEE1E6FF] rounded-[16px] disabled:opacity-40"
                onClick={handleRegister_volunteer}
            >
                Volunteer
            </button>
            <button
                className="absolute top-[62px] left-[256px] w-[229px] h-[36px] px-[12px] flex items-center justify-center font-inter text-[14px] leading-[22px] font-normal text-white bg-[#4A90E2FF] rounded-[16px] hover:bg-[#3181DDFF] active:bg-[#2272CEFF] disabled:opacity-40"
                onClick={handleRegister_club}
            >
                Coordinator
            </button>

            {/* Section Title */}
            <div className="absolute top-[128px] left-[136px] font-poppins text-[24px] leading-[32px] font-bold text-[#171A1FFF]">
                Coordinator Details
            </div>

            {/* Organization Name Input */}
            <div className="absolute top-[177px] left-[47px] opacity-100 relative">
                <input
                    type="text"
                    placeholder="Organization Name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-[416px] h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none hover:border-[#BDC1CAFF] hover:text-[#565D6DFF] focus:border-[#BDC1CAFF] focus:text-[#565D6DFF] disabled:border-[#BDC1CAFF] disabled:text-[#565D6DFF] disabled:bg-white"
                />
            </div>

            {/* Dropdown for Org Type */}
            <div className="absolute top-[204px] left-[47px] flex flex-col relative">
                <button
                    onClick={toggleDropdown}
                    className="w-[416px] h-[40px] pl-[12px] pr-[34px] font-inter text-[14px] leading-[22px] font-normal text-[#565D6DFF] bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none relative flex items-center justify-between hover:text-[#565D6DFF] hover:border-[#BDC1CAFF]"
                >
                    {orgType || "Type of Organization"}
                    <span className="absolute right-[15px] top-[14px] w-[8px] h-[8px] border-b-2 border-r-2 border-[#323743FF] transform rotate-45"></span>
                </button>
                {dropdownOpen && (
                    <ul className="absolute top-full left-0 mt-1 border border-[#BDC1CAFF] rounded-[12px] bg-white w-[81%] z-10">
                        {options.map((option, idx) => (
                            <li
                                key={idx}
                                onClick={() => selectOption(option)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Categories Dropdown */}
            <div className="absolute top-[310px] left-[47px] w-[416px]">
                <button
                    onClick={toggleDropdown2}
                    className="w-full h-[40px] pl-[12px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal text-[#565D6DFF] bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none flex items-center justify-between overflow-hidden"
                >
                    <span className="truncate">
                        {categories.length > 0
                            ? categories.join(", ")
                            : "Select categories"}
                    </span>
                    <span className="ml-2">&#9662;</span>
                </button>
                {dropdownOpen2 && (
                    <div className="mt-2 w-full border border-[#BDC1CAFF] rounded-[12px] bg-white max-h-40 overflow-y-auto z-50 relative">
                        {categoriesList.map((cat) => (
                            <label
                                key={cat}
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-[#4A90E2FF]"
                                    checked={categories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                                <span className="text-[#565D6DFF] font-inter text-[14px]">
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Email, Phone, Password, Confirm Password */}
            <div className="absolute top-[375px] left-[47px] opacity-100 w-[416px]">
                <input
                    type="email"
                    placeholder="Organization Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal
                   bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
                />
            </div>
            <div className="absolute top-[441px] left-[47px] opacity-100 w-[416px]">
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal
                   bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
                />
            </div>
            <div className="absolute top-[511px] left-[47px] opacity-100 w-[416px]">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal
                   bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
                />
            </div>
            <div className="absolute top-[579px] left-[47px] opacity-100 w-[416px]">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-[40px] pl-[14px] pr-[12px] font-inter text-[14px] leading-[22px] font-normal
                   bg-white border border-[#BDC1CAFF] rounded-[12px] outline-none"
                />
            </div>

            {/* Error / Success */}
            {error && <p className="absolute top-[615px] left-[47px] text-red-500 text-sm">{error}</p>}
            {success && <p className="absolute top-[615px] left-[47px] text-green-500 text-sm">{success}</p>}

            {/* Submit Button */}
            <div className="absolute top-[645px] left-[47px] w-[416px]">
                <button
                    className="w-full h-[40px] px-[12px] flex items-center justify-center
               font-inter text-[14px] leading-[22px] font-medium text-white
               bg-[#4A90E2FF] rounded-[12px] border-0
               hover:bg-[#3181DDFF] active:bg-[#2272CEFF] disabled:opacity-40"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>

            {/* Secondary Button */}
            <div className="absolute top-[695px] left-[171px] w-[170px]">
                <button
                    className="w-full h-[40px] px-[12px] flex items-center justify-center
               font-inter text-[14px] leading-[22px] font-medium
               text-[#4A90E2FF] bg-transparent border-0 rounded-[12px]"
                    onClick={handleRegister_volunteer}
                >
                    Sign up as Volunteer
                </button>
            </div>

            {/* Sign In */}
            <div className="flex gap-2">
                <p className="absolute top-[740px] left-[144px] font-inter text-[14px] leading-[20px] font-normal text-[#565D6DFF]">
                    Already have an account?
                </p>
                <button
                    className="absolute top-[740px] left-[317px] w-[76px] h-[22px] px-[12px] font-inter text-[14px] leading-[22px] font-medium text-[#4A90E2FF] bg-transparent rounded-[10px]"
                    onClick={handleSignUp}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Form1;
