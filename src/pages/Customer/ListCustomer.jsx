import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import searchIcon from "../../assets/search.svg";
import { fetchCustomers } from "../../api/customer.service";
import addUserIcon from "../../assets/add_person.svg";

function ListCustomer() {
    const [search, setSearch] = useState("");
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    useEffect(() => {
        if (!search.trim()) {
            setCustomers([]);
            return;
        }

        if (typingTimeout) clearTimeout(typingTimeout);

        const timeout = setTimeout(() => {
            loadCustomers();
        }, 500);

        setTypingTimeout(timeout);
    }, [search]);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            const res = await fetchCustomers({
                page: 1,
                limit: 10,
                search: search,
                status: ""
            });
            setCustomers(res?.data || []);
        } catch (err) {
            console.error("Error fetching customers:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fffef7] relative">
            <Navbar />

            <div className="flex">
                <div className="w-[220px]">
                    <Sidebar />
                </div>

                <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex flex-col">
                            <h1 className="text-black font-bold text-xl ml-4">Customer Management</h1>
                            <p className="text-gray-500 text-sm ml-4">
                                View all customers and their deals
                            </p>
                        </div>
                        <button
                            className="bg-[#FFCC00] text-black px-4 py-2 rounded-lg shadow font-semibold flex items-center gap-2 mr-12"
                        >
                            <img src={addUserIcon} alt="Add Customer" className="w-5 h-5" />
                            Add Customer
                        </button>
                    </div>

                    <div className="relative mb-5 w-[1230px] ml-4">
                        <img
                            src={searchIcon}
                            alt="search"
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                        />
                        <input
                            type="text"
                            placeholder="Search customer by name, email or company"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg border-[#E1E1E1] text-sm 
                            focus:outline-none h-11"
                        />
                    </div>
                    {search.trim() === "" && (
                        <div className="bg-white rounded-xl py-16 flex flex-col items-center justify-center">
                            <img src={searchIcon} className="w-10 h-10 opacity-50 mb-3" />
                            <h2 className="font-semibold text-lg">Search for Customers</h2>
                            <p className="text-gray-500 text-sm mt-2">
                                Enter a customer name, email, or phone number in the search box above to find customers
                            </p>
                        </div>
                    )}

                    {search.trim() !== "" && (
                        <div className="bg-white rounded-xl p-6 mt-4">

                            {loading ? (
                                <p className="text-gray-500 text-center">Loading...</p>
                            ) : customers.length === 0 ? (
                                <p className="text-gray-500 text-center">No customers found.</p>
                            ) : (
                                <div>

                                    <div className="grid grid-cols-6 text-medium font-bold text-black mb-4 px-2">
                                        <p>Customer Id</p>
                                        <p>Customer Name</p>
                                        <p>Type</p>
                                        <p>Account Status</p>
                                        <p>Email</p>
                                        <p>Phone</p>
                                    </div>

                                    <div className="space-y-3">
                                        {customers.map((c, idx) => (
                                            <div
                                                key={idx}
                                                className="grid grid-cols-6 items-center bg-white rounded-lg px-2 py-3"
                                            >
                                                <p className="font-bold text-sm">{`cus00${c.id}`}</p>

                                                <p className="text-sm font-bold">{c.name}</p>

                                                <p className="text-xs w-20 px-3 py-1 rounded-md border border-gray-400 inline-block text-center">
                                                    {c.customer_type}
                                                </p>
                                                <p
                                                    className={`text-sm font-semibold w-24 text-center rounded-md px-2 py-1 ${c.deactivated_at
                                                            ? "bg-red-100 text-red-600"
                                                            : c.verified
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-[#D8AD001A] text-[#D8AD00]"
                                                        }`}
                                                >
                                                    {c.deactivated_at
                                                        ? "Rejected"
                                                        : c.verified
                                                            ? "Verified"
                                                            : "Pending"}
                                                </p>

                                                <p className="text-sm text-gray-700">{c.email}</p>

                                                <p className="text-sm text-gray-700">{c.contact_number}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCustomer;
