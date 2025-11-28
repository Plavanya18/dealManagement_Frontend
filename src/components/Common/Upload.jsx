import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

export function FileUpload({ label, name, handleFileChange }) {
    const [uploadingFile, setUploadingFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);

    const simulateUpload = (file) => {
        setProgress(0);
        setCompleted(false);

        let p = 0;
        const uploadTimer = setInterval(() => {
            p += 10;
            setProgress(p);

            if (p >= 100) {
                clearInterval(uploadTimer);
                setCompleted(true);
            }
        }, 200);
    };

    const onFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingFile(file);
        handleFileChange(e);
        simulateUpload(file);
    };

    const removeFile = () => {
        setUploadingFile(null);
        setProgress(0);
        setCompleted(false);
    };

    return (
        <div>
            <div className="rounded-md p-4 text-center mb-4 relative bg-[#fffef7]">
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "8px",
                        pointerEvents: "none",
                        background: `
                            repeating-linear-gradient(90deg, #ABABAB 0 12px, transparent 12px 24px) top/100% 2px no-repeat,
                            repeating-linear-gradient(90deg, #ABABAB 0 12px, transparent 12px 24px) bottom/100% 2px no-repeat,
                            repeating-linear-gradient(180deg, #ABABAB 0 12px, transparent 12px 24px) left/2px 100% no-repeat,
                            repeating-linear-gradient(180deg, #ABABAB 0 12px, transparent 12px 24px) right/2px 100% no-repeat
                        `,
                    }}
                ></div>

                <p className="font-medium">{label}</p>
                <p className="text-gray-500 text-sm mb-3">JPEG, PNG, PDF, MP4 up to 50MB</p>

                <input
                    type="file"
                    id={name}
                    name={name}
                    onChange={onFileSelect}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => document.getElementById(name).click()}
                    className="px-4 py-2 rounded-md border border-yellow-500 text-yellow-600 bg-white hover:bg-yellow-50"
                >
                    Browse File
                </button>
            </div>

            {uploadingFile && (
                <div className="mt-3 bg-white rounded-xl shadow p-3 flex items-center gap-3">
                    <img
                        src="https://img.icons8.com/color/48/000000/file.png"
                        className="w-8 h-8"
                        alt="file icon"
                    />

                    <div className="flex-1">
                        <p className="font-medium text-sm">{uploadingFile.name}</p>

                        <p className="text-xs text-gray-500">
                            {(uploadingFile.size / 1024).toFixed(1)} KB •{" "}
                            {!completed ? (
                                <span className="text-blue-500">Uploading...</span>
                            ) : (
                                <span className="text-green-600 flex items-center gap-1">
                                    <FaCheckCircle size={12} /> Completed
                                </span>
                            )}
                        </p>

                        {!completed && (
                            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-2 bg-yellow-400 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={removeFile}
                        className="text-gray-500 hover:text-black"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
