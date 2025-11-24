import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function ActionDropdown({ options = [] }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
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

  useEffect(() => {
    if (open && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const menuHeight = 40 * options.length;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setDropUp(spaceBelow < menuHeight && spaceAbove > menuHeight);
      setPosition({ top: rect.bottom, left: rect.right });
    }
  }, [open, options.length]);

  return (
    <>
      <button
        ref={dropdownRef}
        onClick={toggleDropdown}
        className="text-[#D8AD00] font-bold text-xl"
      >
        &#8942;
      </button>

      {open &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: dropUp ? position.top - options.length * 40 : position.top,
              left: position.left - 150,
              width: 200,
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 9999,
            }}
          >
            {options.map((opt, idx) => (
              <button
                key={idx}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => {
                  opt.onClick();
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default ActionDropdown;
