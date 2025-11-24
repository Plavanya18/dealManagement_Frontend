import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import searchIcon from "../../assets/search.svg";
import addUserIcon from "../../assets/add_person.svg";
import UniversalTable from "../../components/Table/Table";
import { fetchUsers } from "../../api/user.service";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);

    const columns = [
        { key: "full_name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
        { key: "branch", label: "Branch" },
        { key: "status", label: "Account Status" },
        { key: "last_login", label: "Last Login" },
    ];

    const loadUsers = async (search = "") => {
        setLoading(true);
        try {
            const result = await fetchUsers({ page: 1, limit: 10, orderBy: "full_name" });
            const filtered = search
                ? result.filter(
                    (u) =>
                        u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
                        u.email?.toLowerCase().includes(search.toLowerCase())
                )
                : result;
            setUsers(filtered);
        } catch (error) {
            console.error("Failed to load users:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
            loadUsers(searchValue);
        }
    };

    const rows = users.map((user) => ({
        full_name: user.full_name,
        role: user.role?.name,
        email: user.email,
        branch: user.branch?.name,
        status: user.is_active ? "Active" : "Inactive",
        last_login: user.last_login,
    }));

    return (
        <div className="min-h-screen bg-[#fffef7]">
            <Navbar />
            <div className="flex">
                <div className="w-[220px]">
                    <Sidebar />
                </div>
                <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex flex-col">
                            <h1 className="text-black font-bold text-xl">User Management</h1>
                            <p className="text-gray-500 text-sm">Manage system users and roles</p>
                        </div>
                        <button className="bg-[#FFCC00] text-black px-4 py-2 rounded-lg shadow font-semibold flex items-center gap-2">
                            <img src={addUserIcon} alt="Add User" className="w-5 h-5" />
                            Add User
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mr-10 ml-4">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
                                <p className="text-medium text-gray-500">
                                    Review and manage customer accounts
                                </p>
                            </div>

                            <div className="relative mb-5 w-[400px]">
                                <img
                                    src={searchIcon}
                                    alt="search"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                                />
                                <input
                                    type="text"
                                    placeholder="Search user"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyPress={handleSearchKeyPress}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg border-[#E1E1E1] text-sm focus:outline-none focus:border-[#E1E1E1]"
                                />
                            </div>
                        </div>

                        {loading ? (
                            <p className="p-4 text-gray-500">Loading users...</p>
                        ) : (
                            <UniversalTable columns={columns} rows={rows} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;
