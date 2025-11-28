import React from "react";
import deactivateIcon from "../../assets/deactivate_person.svg";
import activateIcon from "../../assets/add_person.svg";
import deleteIcon from "../../assets/delete.svg";
import resetIcon from "../../assets/reset_lock.svg";
import redShadeIcon from "../../assets/red_shade.svg";
import greenShadeIcon from "../../assets/green_shade.svg";

function NotificationCard({ confirmModal, onConfirm, onCancel }) {
    if (!confirmModal.open) return null;

    const { actionType, title, message } = confirmModal;

    const confirmLabel =
        actionType === "delete"
            ? "Delete Account"
            : actionType === "deactivate"
            ? "Deactivate Account"
            : actionType === "activate"
            ? "Activate Account"
            : actionType === "resetPassword"
            ? "Send Link"
            : "Confirm";

    const iconToShow =
        actionType === "delete"
            ? deleteIcon
            : actionType === "activate"
            ? activateIcon
            : actionType === "deactivate"
            ? deactivateIcon
            : actionType === "resetPassword"
            ? resetIcon
            : deactivateIcon;

    const isActivate = actionType === "activate";

    const circleBg = isActivate ? "#10B935" : "#E21E26";
    const glowShadow = isActivate
        ? "0 25px 50px rgba(13,186,75,0.45)"
        : "0 25px 50px rgba(226,30,38,0.45)";
    const shadeIcon = isActivate ? greenShadeIcon : redShadeIcon;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="w-[520px] rounded-3xl shadow-2xl overflow-hidden relative bg-white">

                <div
                    className={`relative h-52 w-full flex justify-center items-start pt-8 ${
                        isActivate
                            ? "bg-linear-to-b from-white via-white/40 to-[#e7f8ec]"
                            : "bg-linear-to-b from-white via-white/40 to-[#fdeeee]"
                    }`}
                >
                    <div
                        className="w-40 h-40 rounded-full flex items-center justify-center relative"
                        style={{ backgroundColor: circleBg, boxShadow: glowShadow }}
                    >
                        <div className="absolute top-2 left-4 w-16 h-10 bg-white/40 rounded-full blur-md"></div>

                        <img
                            src={shadeIcon}
                            alt="shade"
                            className="absolute w-40 h-40 object-cover"
                        />

                        <img
                            src={iconToShow}
                            alt="icon"
                            className={`absolute w-14 h-14 ${
                                isActivate ? "invert brightness-100" : ""
                            }`}
                        />
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-white/0 rounded-t-[100px] -mt-12 pt-12 pb-10 px-10 border-2 border-[#E1E1E1] text-center shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[22px] font-bold text-black mb-3">{title}</h2>

                    <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
                        {message}
                    </p>

                    <div className="flex justify-center gap-4">
                        {actionType === "resetPassword" ? (
                            <>
                                <button
                                    onClick={onCancel}
                                    className="border-2 border-[#E5C100] text-[#E5C100] px-8 py-3 rounded-xl font-semibold min-w-[150px] text-[15px] transition-all duration-200 hover:bg-yellow-500 hover:text-white"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={onConfirm}
                                    className="bg-[#FFCC00] text-black px-8 py-3 rounded-xl font-bold min-w-[200px] text-[15px] hover:bg-[#e6b800]"
                                >
                                    Send Link
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onConfirm}
                                    className={`${isActivate ? "bg-[#10B935] hover:bg-[#0aa33f]" : "bg-[#E21E26] hover:bg-[#c2181f]"} text-white px-8 py-3 rounded-xl font-semibold min-w-[200px] text-[15px]`}
                                >
                                    {confirmLabel}
                                </button>

                                <button
                                    onClick={onCancel}
                                    className="border-2 border-[#E5C100] text-[#E5C100] px-8 py-3 rounded-xl font-semibold min-w-[150px] text-[15px] transition-all duration-200 hover:bg-yellow-500 hover:text-white"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationCard;
