import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown/DropDown";
import NotificationCard from "../../components/Common/Notification";
import { deleteUser, fetchUserById, updateUser } from "../../api/user.service";
import { fetchRoles } from "../../api/role.service";
import { fetchBranches } from "../../api/branch.service";
import { sendResetPasswordEmail } from "../../api/auth.service";

function ViewUser({ userId, onClose, initialEditMode = false }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(initialEditMode);
    const [formData, setFormData] = useState({ deleteRequested: false,  resetRequested: false });
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [confirmModal, setConfirmModal] = useState({ open: false });

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            const userResult = await fetchUserById(userId);
            if (userResult.success && userResult.data?.user) {
                setUser(userResult.data.user);
                setFormData(userResult.data.user);
            }

            const rolesData = await fetchRoles({ page: 1, limit: 50 });
            setRoles(rolesData);

            const branchesData = await fetchBranches({ page: 1, limit: 50 });
            setBranches(branchesData);

            setLoading(false);
        };
        loadUser();
    }, [userId]);

    if (!userId) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = async () => {
        try {
            if (formData.deleteRequested) {
                const result = await deleteUser(userId);
                if (result.success) {
                    onClose?.(true);
                }
                return;
            }

            const selectedRole = roles.find(r => r.name === formData.role);
            const selectedBranch = branches.find(b => b.name === formData.branch);

            const payload = {
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone,
                is_active: formData.is_active,
                role_id: selectedRole?.id,
                branch_id: selectedBranch?.id,
            };

            const result = await updateUser(userId, payload);

            if (result.success) {
                if (formData.resetRequested) {
                    const resetResponse = await sendResetPasswordEmail(formData.email);
                }
                setUser(result.data);
                setFormData(result.data);
                setEditMode(false);
            }
        } catch (err) {
            console.error("Save Error:", err);
        } finally {
            onClose?.(true);
        }
    };

    const handleConfirm = () => {
        if (confirmModal.actionType === "activate") {
            setFormData(prev => ({ ...prev, is_active: true }));
        }
        else if (confirmModal.actionType === "deactivate") {
            setFormData(prev => ({ ...prev, is_active: false }));
        }
        else if (confirmModal.actionType === "delete") {
            setFormData(prev => ({ ...prev, deleteRequested: true }));
        }
        else if (confirmModal.actionType === "resetPassword") {
            setFormData(prev => ({ ...prev, resetRequested: true }));
        }

        setConfirmModal({ open: false });
    };

    const handleCancel = () => {
        setFormData(user);
        setEditMode(false);
    };

    const handleCancelPopup = () => {
        setConfirmModal({ open: false });
    };

    return (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-[#fffef7] rounded-xl shadow-lg w-full max-w-xl p-6 pt-14 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
                >
                    ✕
                </button>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-black">
                            {editMode ? "Edit User Details" : "User Details"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            View and manage user information
                        </p>
                    </div>

                    {!editMode && (
                        <div className="flex items-center gap-2">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {user?.is_active ? "Active" : "Inactive"}
                            </span>
                            <button
                                onClick={() => setEditMode(true)}
                                className="border border-yellow-400 text-yellow-500 px-3 py-1 rounded-md text-sm font-semibold"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <p className="text-gray-500">Loading user details...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-300">
                            <div>
                                <label className="text-black text-sm">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData?.full_name || ""}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    className={`w-full mt-1 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-0 focus:border-transparent ${editMode ? "bg-white border border-gray-300" : "bg-white"
                                        }`}
                                />
                            </div>
                            <div>
                                <label className="text-black text-sm">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData?.email || ""}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    className={`w-full mt-1 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-0 focus:border-transparent ${editMode ? "bg-white border border-gray-300" : "bg-white"
                                        }`}
                                />
                            </div>
                            <div>
                                <label className="text-black text-sm">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData?.phone || ""}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    className={`w-full mt-1 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-0 focus:border-transparent ${editMode ? "bg-white border border-gray-300" : "bg-white"
                                        }`}
                                />
                            </div>
                            <div>
                                <label className="text-black text-sm">Branch</label>
                                {editMode ? (
                                    <Dropdown
                                        options={branches.map((b) => ({ label: b.name, value: b.name }))}
                                        value={
                                            formData.branch
                                                ? { label: formData.branch?.name || formData.branch, value: formData.branch?.name || formData.branch }
                                                : null
                                        }
                                        onChange={(val) => setFormData((prev) => ({ ...prev, branch: val.value }))}
                                        placeholder="Select Branch"
                                        isDisabled={!editMode}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={formData?.branch?.name || formData?.branch || ""}
                                        readOnly
                                        className="w-full mt-1 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-0 focus:border-transparent"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="text-black text-sm">Role</label>
                                {editMode ? (
                                    <Dropdown
                                        options={roles.map((r) => ({ label: r.name, value: r.name }))}
                                        value={
                                            formData.role
                                                ? { label: formData.role?.name || formData.role, value: formData.role?.name || formData.role }
                                                : null
                                        }
                                        onChange={(val) => setFormData((prev) => ({ ...prev, role: val.value }))}
                                        placeholder="Select Role"
                                        isDisabled={!editMode}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={formData?.role?.name || formData?.role || ""}
                                        readOnly
                                        className="w-full mt-1 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-0 focus:border-transparent bg-white"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mb-4 pb-4 border-b border-gray-300">
                            <h3 className="text-black font-semibold mb-2">Account Status</h3>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                                <span className="text-gray-500 text-sm">
                                    {formData?.is_active ? "Account Active" : "Account Inactive"}
                                </span>
                                <label className="inline-flex relative items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData?.is_active}
                                        readOnly={!editMode}
                                        onChange={() => {
                                             if (!editMode) return; 
                                            const nextStatus = !formData.is_active;

                                            setConfirmModal({
                                                open: true,
                                                actionType: nextStatus ? "activate" : "deactivate",
                                                title: nextStatus ? "Activate Account" : "Deactivate Account",
                                                message: nextStatus
                                                    ? "Are you sure you want to activate this user?"
                                                    : "Are you sure you want to deactivate this user?",
                                            });
                                        }}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-black font-semibold mb-2">Security Actions</h3>
                            <div className="flex gap-3 mb-4">
                                <button className="px-4 py-2 text-xl border border-yellow-400 text-yellow-500 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:text-white"
                                onClick={() => {
                                        if (!editMode) return;

                                        setConfirmModal({
                                            open: true,
                                            actionType: "resetPassword",
                                            title: "Are you sure you want to send a password reset link?",
                                            message: "You want to send a password reset link to this user’s registered email address? The user will be able to create a new password from their email.",
                                        });
                                    }}
                                >
                                        Reset Password
                                    </button>
                                <button
                                    className="px-4 py-2 text-xl border border-red-400 text-red-500 rounded-md transition-all duration-200 hover:bg-red-500 hover:text-white"
                                    onClick={() => {
                                        if (!editMode) return; 
                                        setConfirmModal({
                                            open: true,
                                            actionType: "delete",
                                            title: "Delete Account",
                                            message: "Are you sure you want to delete this user?",
                                        });
                                    }}
                                >
                                    Delete Account
                                </button>
                            </div>
                            {editMode && (
                                <div className="flex justify-end gap-3 mb-4 pt-4 border-t border-gray-300">
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 border border-yellow-400 text-yellow-500 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-[#FFCC00] text-black font-bold rounded-md"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <NotificationCard
                confirmModal={confirmModal}
                onConfirm={handleConfirm}
                onCancel={handleCancelPopup}
            />
        </div>
    );
}

export default ViewUser;
