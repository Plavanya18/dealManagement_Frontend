import React, { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function Dropdown({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select",
  disabled = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`w-full relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-black mb-1">
          {label}
        </label>
      )}

      <div
        className={`flex items-center justify-between w-full px-3 py-2 border rounded-md bg-white cursor-pointer transition
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "hover:border-gray-400"}
          ${open ? "border-gray-400" : "border-gray-300"}
        `}
        onClick={() => !disabled && setOpen(!open)}
      >
        <span className={`text-sm ${value ? "text-black" : "text-gray-400"}`}>
          {value ? value.label : placeholder}
        </span>

        <IoChevronDown
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {open && (
        <ul className="mt-1 border border-gray-300 rounded-md bg-white shadow-md max-h-52 overflow-y-auto z-20 absolute w-full">
          {options.length > 0 ? (
            options.map((item) => {
              const selected = value?.value === item.value;

              return (
                <li
                  key={item.value}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  className={`
                    px-3 py-2 text-sm cursor-pointer
                    hover:bg-gray-100 hover:text-black
                    ${selected ? "bg-gray-200 text-black" : "text-black"}
                  `}
                >
                  {item.label}
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-gray-400 text-sm">
              No options available
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
