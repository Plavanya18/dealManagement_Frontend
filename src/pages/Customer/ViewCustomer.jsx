import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import backArrow from "../../assets/back_arrow.svg";

function CustomerDetails() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("basic");
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        loadCustomer();
    }, [id]);

    const loadCustomer = async () => {
        // replace with API
        setCustomer({
            id,
            name: "Johnson Trading Ltd",
            type: "Corporate",
            verified: true,
            created_by: "John (Maker)",
            created_on: "27/10/2025",

            business_license: "BL-2023-0045",
            tin: "TIN-123456789",

            contact_person: "Miriam Joseph (Branch Manager)",
            email: "miriam.joseph@tnbank.co.tz",
            phone: "+255 713 222 110",

            bankAccounts: [
                {
                    name: "Johnson Trading Ltd",
                    number: "012******88",
                    bank: "Tanzania National Bank",
                    currency: "USD",
                },
                {
                    name: "Johnson Trading Ltd",
                    number: "012******88",
                    bank: "Tanzania National Bank",
                    currency: "TZS",
                },
            ],

            address: {
                street: "123 Uhuru Street, Plot 456",
                city: "Dar es Salaam",
                country: "Tanzania",
                postal: "14111",
            },
        });
    };

    if (!customer) return null;

    return (
<div className="min-h-screen bg-[#fffef7] overflow-x-hidden">
            <Navbar />

            <div className="flex">
                <div className="w-[220px]">
                    <Sidebar />
                </div>

                <div className="flex-1 px-10 py-8">
                    <div className="flex items-center gap-3 mb-1">
                        <button onClick={() => window.history.back()}>
                            <img src={backArrow} alt="back" className="w-5 h-5" />
                        </button>

                        <h1 className="text-[22px] font-semibold">{customer.name}</h1>

                        <span className="px-2 py-1 text-xs rounded-md bg-[#8A38F526] text-[#8A38F5]">
                            {customer.type}
                        </span>

                        {customer.verified && (
                            <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-700">
                                Verified
                            </span>
                        )}
                    </div>

                    <p className="text-gray-500 text-sm mb-1 ml-8">
                        Created by: {customer.created_by} &nbsp; | &nbsp; Created on: {customer.created_on}
                    </p>

                    <div className="border-b border-gray-300 mb-4">
                        <div className="flex gap-10 text-[15px] ml-8">
                            <button
                                onClick={() => setActiveTab("basic")}
                                    className={`pb-2 text-[#D8AD00] ${activeTab === "basic" ? "border-b-2 border-[#D8AD00] font-medium" : "text-gray-500"
                                    }`}
                            >
                                Basic Details
                            </button>

                            <button
                                onClick={() => setActiveTab("documents")}
                                className={`pb-2 text-[#D8AD00] ${activeTab === "documents" ? "border-b-2 border-[#D8AD00] font-medium" : "text-gray-500"
                                    }`}
                            >
                                Documents
                            </button>

                            <button
                                onClick={() => setActiveTab("deals")}
                                className={`pb-2 text-[#D8AD00] ${activeTab === "deals" ? "border-b-2 border-[#D8AD00] font-medium"  : "text-gray-500"
                                    }`}
                            >
                                Deals
                            </button>

                            <button
                                onClick={() => setActiveTab("compliance")}
                                className={`pb-2 text-[#D8AD00] ${activeTab === "compliance" ? "border-b-2 border-[#D8AD00] font-medium"  : "text-gray-500"
                                    }`}
                            >
                                Compliance
                            </button>
                        </div>
                    </div>

                    {activeTab === "basic" && (
                        <div className="p-2">
                            <h2 className="text-[16px] font-semibold mb-1">Customer Information</h2>
                            <div className="grid grid-cols-3 gap-5">
                                <div>
                                    <label className="text-xs text-gray-500">Company Name</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.name}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Business License</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.business_license}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">TIN</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.tin}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <h2 className="text-[16px] font-semibold mt-4 mb-1">Contact Information</h2>
                            <div className="grid grid-cols-3 gap-5">
                                <div>
                                    <label className="text-xs text-gray-500">Contact Person</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.contact_person}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Email</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.email}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Phone</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.phone}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <h2 className="text-[16px] font-semibold mt-4 mb-1">Bank Accounts</h2>
                            <div className="space-y-3">
                                {customer.bankAccounts.map((acc, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl  p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold">{acc.name}</p>
                                            <p className="text-gray-600 text-sm">{acc.number}</p>
                                            <p className="text-gray-500 text-xs">
                                                {acc.bank}, Tanzania
                                            </p>
                                        </div>
                                        <p className="px-4 py-1 rounded-md bg-gray-100 border text-sm">
                                            {acc.currency}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-[16px] font-semibold mt-4 mb-1">Address</h2>
                            <div className="grid grid-cols-4 gap-5">
                                <div className="col-span-2">
                                    <label className="text-xs text-gray-500">Street Address</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.address.street}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">City</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.address.city}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Country</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.address.country}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Postal Code</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2"
                                        value={customer.address.postal}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* OTHER TABS */}
                    {activeTab !== "basic" && (
                        <div className="bg-white p-10 rounded-xl text-center text-gray-500">
                            {activeTab === "documents" && "Documents Section Coming Soon"}
                            {activeTab === "deals" && "Deals Section Coming Soon"}
                            {activeTab === "compliance" && "Compliance Section Coming Soon"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomerDetails;
