import React, { useState } from "react";
import authlogo from "../../assets/authsymbol.svg";

function AddUser({ onClose }) {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        role: "",
        branch: "",
        is_active: true,
    });

    const roles = ["Admin", "Manager", "Staff"];
    const branches = ["Branch 1", "Branch 2", "Branch 3"];


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting user data:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-start p-5">
            <div
                className="absolute inset-0 bg-black/1"
                onClick={onClose}
            />

            <div className="bg-[#fffef7] rounded-xl shadow-lg w-full max-w-2xl mt-20 relative p-6">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-xl text-black font-bold mb-1">Add New User</h2>
                <p className="text-gray-500 text-sm mb-5">
                    Create a new user account for the system
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+255 xxx xxx xxx"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700">
                                Branch <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            >
                                <option value="">Select Branch</option>
                                {branches.map((b) => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="bg-[#e0ecf7] text-gray-700 p-3 rounded-md text-sm flex items-center gap-2 mt-2">
                        <img src={authlogo} alt="auth logo" className="w-5 h-5 mb-4" />
                        Default password will be sent to the user's email address. User will be required to change password on first login.
                    </div>

                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-md border border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-[#FFCC00] hover:bg-yellow-500 text-black font-semibold"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
