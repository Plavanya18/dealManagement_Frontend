import React, { useEffect, useState } from "react";
import { fetchUserById } from "../../api/user.service";

function ViewUser({ userId, onClose }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            const result = await fetchUserById(userId);
            console.log(result, "result")
        if (result.success && result.data?.user) {
          setUser(result.data.user);
        }
            setLoading(false);
        };
        loadUser();
    }, [userId]);

    if (!userId) return null;

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
                    <h2 className="text-xl font-bold text-black">User Details</h2>
                    <div className="flex items-center gap-2">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                        >
                            {user?.is_active ? "Active" : "Inactive"}
                        </span>
                        <button className="border border-yellow-400 text-yellow-500 px-3 py-1 rounded-md text-sm font-semibold">
                            Edit
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="text-gray-500">Loading user details...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 pb-4 border-b border-gray-300 gap-4 mb-4">
                            <div>
                                <label className="text-black text-sm">Full Name</label>
                                <input
                                    type="text"
                                    value={user?.full_name}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white text-black"
                                />
                            </div>
                            <div>
                                <label className="text-black text-sm">Email</label>
                                <input
                                    type="text"
                                    value={user?.email}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white text-black"
                                />
                            </div>
                            <div>
                                <label className="text-black text-sm">Phone</label>
                                <input
                                    type="text"
                                    value={user?.phone}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white text-black"
                                />
                            </div>
                            <div>
                                <label className="text-black text-sm">Branch</label>
                                <input
                                    type="text"
                                    value={user?.branch?.name || ""}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white text-black"
                                />
                            </div>
                            <div>
                                <label className="text-black text-sm">Role</label>
                                <input
                                    type="text"
                                    value={user?.role?.name || ""}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white text-black"
                                />
                            </div>
                        </div>

                        <div className="mb-4   border-b pb-4 border-gray-300">
                            <h3 className="text-black font-semibold mb-2">Account Status</h3>
                            <div className="flex items-center justify-between p-3  rounded-lg bg-white">
                                <span className="text-gray-500 text-sm">
                                    {user?.is_active ? "Account Active" : "Account Inactive"}
                                </span>
                                <label className="inline-flex relative items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={user?.is_active}
                                        readOnly
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-black font-semibold mb-2">Security Actions</h3>
                            <div className="flex gap-3 mb-4">
                                <button className="px-4 py-2 text-2xl border border-yellow-400 text-yellow-500 rounded-md">
                                    Reset Password
                                </button>
                                <button className="px-4 py-2 text-2xlborder border-red-400 text-red-500 rounded-md">
                                    Delete Account
                                </button>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ViewUser;
