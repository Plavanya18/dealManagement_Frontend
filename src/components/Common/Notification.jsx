import React from "react";
import deactivateIcon from "../../assets/deactivate_person.svg"

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
            <div className="bg-white w-[480px] rounded-3xl shadow-xl overflow-hidden">

                <div className="relative h-40 flex justify-center items-center bg-linear-to-b from-[#FFEFEE] to-transparent">
                    <div className="absolute top-6 w-28 h-28 rounded-full bg-[#FF3B30] flex justify-center items-center shadow-xl">
                        <img
                            src={deactivateIcon}
                            alt="alert"
                            className="w-10 h-10"
                        />
                    </div>
                </div>

                <div className="px-8 pb-8 -mt-4 text-center">

                    <h2 className="text-[20px] font-bold text-gray-900 mb-3 leading-tight">
                        {title}
                    </h2>

                    <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onConfirm}
                            className="bg-[#FF3B30] hover:bg-[#d9322a] text-white px-6 py-3 rounded-xl font-semibold min-w-[180px]"
                        >
                            {confirmButtonLabel}
                        </button>

                        <button
                            onClick={onCancel}
                            className="border border-[#D8AD00] text-[#D8AD00] px-6 py-3 rounded-xl font-semibold min-w-[140px] hover:bg-[#FFF8E1]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NotificationCard;
