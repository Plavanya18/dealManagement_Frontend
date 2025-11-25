import React from "react";

function NotificationCard({ confirmModal, onConfirm, onCancel }) {
    if (!confirmModal.open) return null;

    const { actionType, title, message } = confirmModal;

    const confirmButtonLabel =
        actionType === "delete"
            ? "Delete Account"
            : actionType === "deactivate"
            ? "Deactivate Account"
            : "Confirm";

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-[420px] text-center">

                <div className="flex justify-center mb-4">
                    <img
                        src="/mnt/data/5f737ede-03d5-4fc7-8df7-710449263b57.png"
                        alt="alert"
                        className="w-24 h-24"
                    />
                </div>

                <h2 className="text-xl font-bold mb-3 text-gray-900">
                    {title}
                </h2>

                <p className="text-gray-600 mb-6 px-3">
                    {message}
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-[#FF3B30] hover:bg-[#e13229] text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        {confirmButtonLabel}
                    </button>

                    <button
                        onClick={onCancel}
                        className="border border-[#D8AD00] text-[#D8AD00] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-50"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}

export default NotificationCard;
