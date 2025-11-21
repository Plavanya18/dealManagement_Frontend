import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import bellIcon from "../../assets/bell.svg";
import searchIcon from "../../assets/search.svg";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                console.error("Invalid user data in localStorage");
            }
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="w-[1530px] h-[92px] flex justify-between items-center px-5 py-3 bg-white shadow-sm relative z-20  border-b border-gray-200">

            <img src={logoSvg} alt="Logo" className="w-[221.79px] h-11" />


            <div className="flex items-center gap-6 relative" ref={dropdownRef}>

                <div className="relative w-[396px] h-11">
                    <img
                        src={searchIcon}
                        alt="search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full h-full pl-10 pr-3 border rounded-lg border-[#E1E1E1] text-sm focus:outline-none focus:border-[#E1E1E1]"
                    />
                </div>


                <img src={bellIcon} alt="notification" className="w-6 h-6" />


                <img
                    src="https://i.pravatar.cc/35"
                    alt="profile"
                    className="w-9 h-9 rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                />

                {/* Dropdown */}
                {dropdownOpen && (
                    <div className="absolute top-12 right-0 w-56 bg-white rounded-lg shadow-md z-50 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <strong className="block text-sm text-gray-700">
                                {user?.full_name || "Guest"}
                            </strong>
                        </div>
                        <div
                            className="px-4 py-3 text-sm text-red-600 font-medium cursor-pointer border-t border-gray-100 hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            Log out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
