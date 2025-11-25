import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import searchIcon from "../../assets/search.svg";
import addUserIcon from "../../assets/add_person.svg";
import UniversalTable from "../../components/Table/Table";
import { fetchUsers } from "../../api/user.service";
import ActionDropdown from "../../components/ActionDropdown/ActionDropdown";
import AddUser from "./AddUser";
import Toast from "../../components/Common/Toast";
import Pagination from "../../components/Pagination/Pagination";
import ViewUser from "./ViewUser";
import NotificationCard from "../../components/Common/Notification";

function ListUser() {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "", show: false });
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [viewUser, setViewUser] = useState({ id: null, edit: false });
    const [confirmModal, setConfirmModal] = useState({open: false, userId: null, actionType: "", title: "", message: ""});


    const showToast = (message, type = "success") => {
        setToast({ message, type, show: true });
        setTimeout(() => {
            setToast({ message: "", type: "", show: false });
        }, 3000);
    };

    const columns = [
        { key: "full_name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
        { key: "branch", label: "Branch" },
        { key: "status", label: "Account Status" },
        { key: "last_login", label: "Last Login" },
        { key: "actions", label: "Actions" },
    ];

    const loadUsers = async (search = "") => {
        setLoading(true);
        try {
            const response = await fetchUsers({ page, limit: 7, orderBy: "full_name" });

            let filteredUsers = response.data;

            if (search) {
                filteredUsers = filteredUsers.filter(u =>
                    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
                    u.email?.toLowerCase().includes(search.toLowerCase())
                );
            }

            setUsers(filteredUsers);
            setTotalPages(response.pagination.totalPages);

        } catch (error) {
            console.error("Failed to load users:", error);
            showToast("Failed to load users", "error");
        }
        setLoading(false);
    };

    const handleConfirmAction = () => {
        const { userId, actionType } = confirmModal;

        if (actionType === "deactivate") {
            console.log("DEACTIVATE USER:", userId);
        }

        if (actionType === "delete") {
            console.log("DELETE USER:", userId);
        }

        setConfirmModal({
            open: false,
            userId: null,
            actionType: "",
            title: "",
            message: "",
        });
        loadUsers();
    };

    useEffect(() => {
        loadUsers();
    }, [page]);

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
        last_login: user.last_login
            ? new Date(user.last_login).toLocaleDateString("en-US") : "",
        actions: (
            <ActionDropdown
                options={[
                    {
                        label: "View User Details",
                        onClick: () => setViewUser({ id: user.id, edit: false }),
                    },
                    {
                        label: "Edit User Details",
                        onClick: () => setViewUser({ id: user.id, edit: true }),
                    },
                    {
                        label: "Deactivate User",
                        onClick: () =>
                            setConfirmModal({
                                open: true,
                                userId: user.id,
                                actionType: "deactivate",
                                title: "Are you sure you want to deactivate this user account?",
                                message:
                                    "You are about to deactivate this user account. The user will be unable to log in or perform any actions until reactivated. Do you wish to continue?",
                            }),

                    },
                    {
                    label: "Delete User",
                    onClick: () =>
                        setConfirmModal({
                            open: true,
                            userId: user.id,
                            actionType: "delete",
                            title: "Are you sure you want to delete this account?",
                            message:
                                "You are about to delete this user account. Once deleted, the user will lose all system access. Do you wish to continue?",
                        }),
                },
                    {
                        label: "Reset Password",
                        onClick: () => console.log("View user", user.id),
                    },
                ]}
            />
        ),
    }));

    return (
        <div className="min-h-screen bg-[#fffef7] relative">

            <Toast show={toast.show} message={toast.message} type={toast.type} />

            <div className={showAddUser ? "filter blur-[0.5px] w-full" : ""}>
                <Navbar />
                <div className="flex">
                    <div className="w-[220px]">
                        <Sidebar />
                    </div>
                    <div className="flex-1 p-5">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex flex-col">
                                <h1 className="text-black font-bold text-xl ml-4">User Management</h1>
                                <p className="text-gray-500 text-sm ml-4">Manage system users and roles</p>
                            </div>
                            <button
                                className="bg-[#FFCC00] text-black px-4 py-2 rounded-lg shadow font-semibold flex items-center gap-2 mr-12"
                                onClick={() => setShowAddUser(true)}
                            >
                                <img src={addUserIcon} alt="Add User" className="w-5 h-5" />
                                Add User
                            </button>
                        </div>

                        <div className="bg-white rounded-t-xl rounded-b-none shadow-sm border border-b-0 border-gray-200 mr-10 ml-4">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
                                    <p className="text-medium text-gray-500">Review and manage customer accounts</p>
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
                        </div>
                        <div className="rounded-xl mr-10 ml-4">
                            {loading ? (
                                <p className="p-4 text-gray-500">Loading users...</p>
                            ) : (
                                <>
                                    <UniversalTable columns={columns} rows={rows} />
                                    <div className="px-4 pb-4 flex justify-end">
                                        <Pagination
                                            page={page}
                                            totalPages={totalPages}
                                            setPage={setPage}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showAddUser && (
                <AddUser
                    onClose={() => setShowAddUser(false)}
                    refreshUsers={loadUsers}
                    toast={showToast}
                />
            )}
            {viewUser.id && (
                <ViewUser
                    userId={viewUser.id}
                    onClose={() => {
                        setViewUser({ id: null, edit: false });
                        loadUsers(searchValue);
                    }}
                    initialEditMode={viewUser.edit}
                />
            )}
            <NotificationCard
                confirmModal={confirmModal}
                onConfirm={handleConfirmAction}
                onCancel={() =>
                    setConfirmModal({
                        open: false,
                        userId: null,
                        actionType: "",
                        title: "",
                        message: "",
                    })
                }
            />
        </div>
    );
}

export default ListUser;
