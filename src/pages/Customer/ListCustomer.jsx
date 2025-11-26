import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import searchIcon from "../../assets/search.svg";
import addUserIcon from "../../assets/add_person.svg";
import UniversalTable from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";

function ListCustomer() {
    return (
        <div className="min-h-screen bg-[#fffef7] relative">

            <div>
                <Navbar />
                <div className="flex">
                    <div className="w-[220px]">
                        <Sidebar />
                    </div>

                    <div className="flex-1 p-5">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex flex-col">
                                <h1 className="text-black font-bold text-xl ml-4">Customer Management</h1>
                                <p className="text-gray-500 text-sm ml-4">View all customers and their deals</p>
                            </div>

                            <button className="bg-[#FFCC00] text-black px-4 py-2 rounded-lg shadow font-semibold flex items-center gap-2 mr-12">
                                <img src={addUserIcon} alt="Add Customer" className="w-5 h-5" />
                                Add Customer
                            </button>
                        </div>

                        <div className="relative mb-5 w-[1230px]  ml-4">
                            <img
                                src={searchIcon}
                                alt="search"
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                            />
                            <input
                                type="text"
                                placeholder="Search customer by name, email or company"
                                className="w-full pl-10 pr-3 py-2 border rounded-lg border-[#E1E1E1] text-sm focus:outline-none focus:border-[#E1E1E1] h-11"
                            />
                        </div>


                        <div className="rounded-t-2xl border-t border-[#E1E1E1] mr-10 ml-4">
                            <div className="overflow-hidden rounded-t-2xl">
                                <UniversalTable columns={[]} rows={[]} />
                            </div>

                            <div className="px-4 pb-4 flex justify-end">
                                <Pagination page={1} totalPages={1} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListCustomer;
