import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import backArrowIcon from "../../assets/back_arrow.svg";
import retailIcon from "../../assets/retail.svg";
import corporateIcon from "../../assets/corporate.svg";
import { fetchCustomerById } from "../../api/customer.service";
import UniversalTable from "../../components/Table/Table";
import dealIcon from "../../assets/black_deals.svg";
import warnIcon from "../../assets/black_warn.svg";
import ActionDropdown from "../../components/ActionDropdown/ActionDropdown";
import lowriskIcon from "../../assets/g_compilance.svg";
import highriskIcon from "../../assets/warning.svg";

function CustomerDetails() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("basic");
    const [customer, setCustomer] = useState(null);

    const actionOptions = [
        { label: "View Deal", value: "view" },
        { label: "Edit Deal", value: "edit" },
        { label: "Download Receipt", value: "download" },
        { label: "Cancel Deal", value: "cancel" },
    ];

    useEffect(() => {
        const loadCustomer = async () => {
            const data = await fetchCustomerById(id);
            setCustomer({
                id: data.id,
                name: data.name,
                type: data.customer_type,
                verified: data.verified,
                created_by: `${data.createdBy?.full_name} (${data.createdBy?.role?.name})`,
                created_on: new Date(data.created_at).toLocaleDateString(),

                business_license: data.business_license_no || "-",
                tin: data.tax_id || "-",

                contact_person: data.contact_number,
                email: data.email,
                phone: data.phone_number,

                bankAccounts: data.banks?.map(b => ({
                    name: b.bank_name,
                    number: b.account_number,
                    bank: `${b.bank_name}, ${b.branch_name}`,
                    country: b.country,
                    currency: b.currency?.code || "-",
                })) || [],

                address: {
                    street: data.address,
                    city: data.city,
                    state: data.state,
                    postal: data.postal_code,
                    country: data.country,
                },

                documents: data.kycDocuments || [],
                deals: data.deals || [],

                risk_level: data.risk_level,
                risk_reason: data.risk_reason,
                compliance_remarks: data.compliance_remarks,

            });
        };

        loadCustomer();
    }, [id]);


    if (!customer) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading customer details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffef7] overflow-x-hidden">
            <Navbar />

            <div className="flex">
                <div className="w-[220px]">
                    <Sidebar />
                </div>

                <div className="flex-1 px-10 py-5">
                    <div className="flex items-center gap-3 mb-1">
                        <button onClick={() => window.history.back()}>
                            <img src={backArrowIcon} alt="back" className="w-5 h-5" />
                        </button>

                        <h1 className="text-[22px] font-semibold">{customer.name}</h1>

                        <span
                            className={`flex items-center gap-1 px-2 ml-5 py-1 text-xs rounded-md border 
                                ${customer.type?.toLowerCase() === "retail"
                                    ? "border-[#9850F6]"
                                    : "border-[#0381CA]"
                                } text-black`}
                        >
                            <img
                                src={
                                    customer.type?.toLowerCase() === "retail"
                                        ? retailIcon
                                        : corporateIcon
                                }
                                alt="type icon"
                                className="w-3 h-3"
                            />
                            {customer.type}
                        </span>

                        {customer.verified && (
                            <span className="px-2 ml-5 py-1 text-xs rounded-md bg-green-100 text-green-700">
                                Verified
                            </span>
                        )}
                    </div>

                    <p className="text-gray-400 text-sm mb-1 ml-8">
                        Created by: {customer.created_by}  &nbsp;  &nbsp; Created on: {customer.created_on}
                    </p>

                    <div className="border-b border-gray-300 mb-1 mt-2">
                        <div className="flex gap-50 text-[15px] ml-8">
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
                                className={`pb-2 text-[#D8AD00] ${activeTab === "deals" ? "border-b-2 border-[#D8AD00] font-medium" : "text-gray-500"
                                    }`}
                            >
                                Deals ({customer.deals.filter(d => d.status.name !== "Rejected").length})
                            </button>

                            <button
                                onClick={() => setActiveTab("compliance")}
                                className={`pb-2 text-[#D8AD00] ${activeTab === "compliance" ? "border-b-2 border-[#D8AD00] font-medium" : "text-gray-500"
                                    }`}
                            >
                                Compliance
                            </button>
                        </div>
                    </div>

                    {activeTab === "basic" && (
                        <div className="p-2 py-0">
                            <h2 className="text-[16px] font-semibold mt-2 mb-1">Customer Information</h2>
                            <div className="grid grid-cols-3 gap-5">
                                <div>
                                    <label className="text-xs text-gray-500">Company Name</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.name}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Business License</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.business_license}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">TIN</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.tin}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <h2 className="text-[16px] font-semibold mt-2 mb-1">Contact Information</h2>
                            <div className="grid grid-cols-3 gap-5">
                                <div>
                                    <label className="text-xs text-gray-500">Contact Person</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.contact_person}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Email</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.email}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Phone</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.phone}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <h2 className="text-[16px] font-semibold mt-2 mb-1">Bank Accounts</h2>
                            <div className="space-y-3">
                                {customer.bankAccounts.map((acc, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl px-4 py-2 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold">{acc.name}</p>
                                            <p className="text-gray-600 text-sm">{acc.number}</p>
                                            <p className="text-gray-500 text-xs">
                                                {acc.bank}, {acc.country}
                                            </p>
                                        </div>
                                        <p className="px-4 py-1 rounded-md bg-gray-100 border text-sm">
                                            {acc.currency}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-[16px] font-semibold mt-2 mb-1">Address</h2>
                            <div className="grid grid-cols-5 gap-5">
                                <div>
                                    <label className="text-xs text-gray-500">Street Address</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.address.street}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">City</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.address.city}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Country</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.address.country}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500">Postal Code</label>
                                    <input
                                        className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                                        value={customer.address.postal}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "documents" && (
                        <div className="p-5">
                            <h2 className="text-[16px] font-semibold mb-3">Customer Documents</h2>

                            <div className="space-y-3">
                                {customer.documents.map((doc) => {
                                    const ext = doc.file_name.split('.').pop().toUpperCase();
                                    const uploadedDate = new Date(doc.uploaded_at).toLocaleString();
                                    const uploadedBy = doc.uploadedBy
                                        ? `${doc.uploadedBy.full_name}${doc.uploadedBy.role ? ` (${doc.uploadedBy.role.name})` : ""}`
                                        : "N/A";

                                    return (
                                        <div
                                            key={doc.id}
                                            className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm"
                                        >
                                            <div>
                                                <p className="font-semibold">{doc.file_name}</p>
                                                <p className="text-gray-500 text-sm">{doc.document_type}</p>
                                                <p className="text-gray-400 text-xs">
                                                    Uploaded: {uploadedDate} by {uploadedBy}
                                                </p>
                                            </div>
                                            <div className="text-gray-500 text-sm font-bold bg-gray-100 px-3 py-1 rounded-md">
                                                {ext}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === "deals" && (
                        <div>
                            <div className="flex flex-wrap">
                                {["Pending", "Approved", "Rejected"].map((status) => {
                                    const count = customer.deals.filter((d) => d.status.name === status).length;

                                    const statusColor =
                                    status === "Pending"
                                        ? "#D8AD00"
                                        : status === "Approved"
                                        ? "#10B935"
                                        : "#EB1D2E";

                                        const icon =
                                            status === "Rejected" ? warnIcon : dealIcon;

                                    return (
                                    <div
                                        key={status}
                                        className="w-[390px] h-22 rounded-xl border p-4 flex flex-col justify-between ml-4 mt-6 border-[#E1E1E1] bg-white"
                                    >
                                        <div className="flex justify-between items-center w-full">
                                        <h4
                                            className="text-[16px] font-normal"
                                            style={{ color: statusColor }}
                                        >
                                            {status}
                                        </h4>

                                        <img src={icon} alt="status icon" className="w-6 h-6" />
                                        </div>

                                        <p className="text-[20px] mt-2 border-[#E1E1E1]">
                                        {count || 0}
                                        </p>
                                    </div>
                                    );
                                })}
                            </div>

                            <div className="bg-white rounded-t-xl rounded-b-none shadow-sm border border-b-0 border-gray-200 mr-10 ml-4 mt-8">
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-semibold text-gray-800">Customer Deals History</h2>
                                        <p className="text-medium text-gray-500">All deals for this customer</p>
                                    </div>
                                        <p className="text-black text-sm font-bold mr-10">
                                            Total: {customer.deals.filter(d => d.status.name !== "Rejected").length}{" "}
                                            {customer.deals.filter(d => d.status.name !== "Rejected").length === 1 ? "deal" : "deals"}
                                        </p>
                                </div>
                                <UniversalTable
                                    disableSort={true}
                                    columns={[
                                        { key: "deal_number", label: "Deal Number" },
                                        { key: "type", label: "Type" },
                                        { key: "baseCurrency", label: "Currency" },
                                        { key: "amount", label: "Amount" },
                                        { key: "totalQuote", label: "Total (TZS)" },
                                        { key: "dealStatus", label: "Status" },
                                        { key: "deal_date", label: "Date" },
                                        { key: "deal_action", label: "" },
                                    ]}
                                    rows={customer.deals.map((deal) => ({
                                        deal_number: deal.deal_number,
                                        type: deal.deal_type.charAt(0).toUpperCase() + deal.deal_type.slice(1).toLowerCase(),
                                        baseCurrency: deal.baseCurrency.code,
                                        amount: parseFloat(deal.amount).toLocaleString(),
                                        totalQuote: (parseFloat(deal.amount) * parseFloat(deal.rate)).toLocaleString(),
                                        dealStatus: deal.status.name,
                                        deal_date: new Date(deal.deal_date).toLocaleDateString(),
                                        deal_action: <ActionDropdown options={actionOptions} />
                                    }))}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "compliance" && (
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                            <h2 className="text-[16px] font-semibold">Compliance Alerts</h2>

                            <span
                                className="px-3 py-1 rounded-md text-xs font-semibold capitalize"
                                style={{
                                backgroundColor:
                                    !customer?.risk_level || customer.risk_level === "low"
                                    ? "#E6F9EC"
                                    : customer.risk_level === "medium"
                                    ? "#FFF3CC"
                                    : "#FFE5E7", 
                                color:
                                    !customer?.risk_level || customer.risk_level === "low"
                                    ? "#10B935"
                                    : customer.risk_level === "medium"
                                    ? "#D8AD00" 
                                    : "#EB1D2E",
                                }}
                            >
                                {customer?.risk_level || "low"}
                            </span>
                            </div>
                            {!customer?.risk_level || customer.risk_level === "low" ? (
                            <div className="flex flex-col items-center justify-center mt-10">
                                <img src={lowriskIcon} alt="Low Risk" className="w-[112.5px] h-[125px] mb-2 mr-40 opacity-70" />
                                <p className="text-green-500 mr-40 text-lg">No compliance alerts</p>
                                <p className="text-gray-500 mr-40 text-sm">This customer has a clean compliance record</p>
                            </div>
                            ) : (
                            <div
                                className="w-full p-4 rounded-xl bg-white flex items-center gap-4 border-2 shadow-sm"
                                style={{
                                borderColor:
                                    customer.risk_level === "medium"
                                    ? "#D8AD00"
                                    : "#EB1D2E",
                                }}
                            >
                                <img
                                src={highriskIcon}
                                alt="Risk Icon"
                                className="w-10 h-10"
                                style={{
                                    filter:
                                    customer.risk_level === "medium"
                                        ? "invert(75%) sepia(90%) saturate(900%) hue-rotate(5deg) brightness(90%) contrast(100%)"
                                        : "invert(27%) sepia(93%) saturate(7480%) hue-rotate(355deg) brightness(92%) contrast(119%)",
                                }}
                                />

                                <div>
                                <p className="font-semibold text-[14px] capitalize">
                                    {customer.compliance_remarks}
                                </p>

                                <p className="text-gray-600 text-sm">
                                    Date: {customer.created_on}
                                </p>

                                <p className="text-gray-500 text-xs mt-1">
                                    {customer.risk_reason}
                                </p>
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

export default CustomerDetails;
