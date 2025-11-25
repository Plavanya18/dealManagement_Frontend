import React, { useState, useRef, useEffect } from "react";

function ActionDropdown({ options = [] }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen(!open);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-[#D8AD00] font-bold text-xl w-8 h-8 rounded-full flex items-center justify-center"
      >
        &#8942;
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                opt.onClick();
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActionDropdown;
