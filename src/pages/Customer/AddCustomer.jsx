import React, { useState } from "react";

function AddCustomer({ onClose }) {
    const [customerType, setCustomerType] = useState("retail");
    const [formData, setFormData] = useState({
        name: "",
        idNumber: "",
        tin: "",
        idFile: null,
        tinFile: null,
        email: "",
        phone: "",
    });
    const [bankAccounts, setBankAccounts] = useState([
    {
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        currency: "",
        accountType: "",
    }
    ]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBankAccountChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...bankAccounts];
        updated[index][name] = value;
        setBankAccounts(updated);
    };

    const addNewAccount = () => {
    setBankAccounts([
        ...bankAccounts,
        {
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        currency: "",
        accountType: "",
        }
    ]);
    };

    const removeAccount = (index) => {
        if (bankAccounts.length === 1) return; 
        setBankAccounts(bankAccounts.filter((_, i) => i !== index));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Continue clicked (UI only)");
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-start p-5">
            <div className="absolute inset-0 bg-black/10" onClick={onClose} />
            <div className="bg-[#fffef7] rounded-xl shadow-lg w-full max-w-[1150px] mt-10 relative p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-bold mb-1">Add New Customer</h2>
                <p className="text-gray-500 text-sm mb-5">
                    Enter customer details. An OTP will be sent to verify the contact person.
                </p>

                <div className="flex border w-[1100px] border-gray-300 rounded-2xl overflow-hidden mb-6">
                    {["corporate", "retail"].map((type) => {
                        const isSelected = customerType === type;
                        return (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setCustomerType(type)}
                                className={`
                                    flex-1 py-2 text-center h font-normal text-black transition-all duration-200
                                    ${isSelected ? "bg-yellow-50  border border-yellow-400 rounded-2xl shadow" : "bg-white"}
                                `}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)} Customer
                            </button>
                        );
                    })}
                </div>

                <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                        <h3 className="font-semibold mb-2">Customer Information</h3>
                        <span className="text-gray-500 text-sm">Customer Name</span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <span className="text-gray-500 text-sm">ID Number</span>
                            <input
                                type="text"
                                name="idNumber"
                                placeholder="Government or Business ID"
                                value={formData.idNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                                required
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer mb-4">
                                <p>Choose a file or drag & drop it here</p>
                                <input
                                type="file"
                                name="idFile"
                                onChange={handleFileChange}
                                className="mt-2"
                                />
                            </div>
                            </div>

                            <div>
                            <span className="text-gray-500 text-sm">TIN</span>
                            <input
                                type="text"
                                name="tin"
                                placeholder="TIN - XXXXXXXXXX"
                                value={formData.tin}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer mb-4">
                                <p>Choose a file or drag & drop it here</p>
                                <input
                                type="file"
                                name="tinFile"
                                onChange={handleFileChange}
                                className="mt-2"
                                />
                            </div>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                            </div>
                            <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Phone</span>
                            <input
                                type="text"
                                name="phone"
                                placeholder="+255 xxx xxx xxx"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                            </div>
                        </div>
                        </div>
                        
                        <h3 className="font-semibold mb-2">Bank Accounts</h3>

                        {bankAccounts.map((account, index) => (
                        <div key={index} className="mb-10 relative">

                            {bankAccounts.length > 1 && (
                            <div className="flex justify-end mb-1">
                                <button
                                type="button"
                                onClick={() => removeAccount(index)}
                                className="px-3 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 text-sm font-semibold"
                                >
                                Remove Account
                                </button>
                            </div>
                            )}

                            <div className="p-4 rounded-xl bg-white">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                <span className="text-gray-500 text-sm mb-1">Account Holder Name</span>
                                <input
                                    type="text"
                                    name="accountHolderName"
                                    placeholder="Enter Name of Account Holder"
                                    value={account.accountHolderName}
                                    onChange={(e) => handleBankAccountChange(index, e)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                                </div>

                                <div className="flex flex-col">
                                <span className="text-gray-500 text-sm mb-1">Bank Name</span>
                                <input
                                    type="text"
                                    name="bankName"
                                    placeholder="Enter Name of Bank"
                                    value={account.bankName}
                                    onChange={(e) => handleBankAccountChange(index, e)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 mt-4 gap-4">
                                <div className="flex flex-col">
                                <span className="text-gray-500 text-sm mb-1">Account Number</span>
                                <input
                                    type="text"
                                    name="accountNumber"
                                    placeholder="Enter Account Number"
                                    value={account.accountNumber}
                                    onChange={(e) => handleBankAccountChange(index, e)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                                </div>

                                <div className="flex flex-col">
                                <span className="text-gray-500 text-sm mb-1">Currency</span>
                                <input
                                    type="text"
                                    name="currency"
                                    placeholder="Select Currency"
                                    value={account.currency}
                                    onChange={(e) => handleBankAccountChange(index, e)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                                </div>

                                <div className="flex flex-col">
                                <span className="text-gray-500 text-sm mb-1">Account Type</span>
                                <input
                                    type="text"
                                    name="accountType"
                                    placeholder="Select Account Type"
                                    value={account.accountType}
                                    onChange={(e) => handleBankAccountChange(index, e)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                                </div>
                            </div>

                            </div>
                        </div>
                        ))}

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md border border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                onClick={addNewAccount}
                            >
                                Add Account
                            </button>
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
                            className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                        >
                            Continue
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCustomer;
