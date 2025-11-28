import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import wrongIcon from "../../assets/wrong.svg";
import deleteIcon from "../../assets/delete.svg";

export function FileUpload({ label, name, handleFileChange }) {
    const [uploadingFile, setUploadingFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [files, setFiles] = useState([]);

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

        if (!uploadingFile) {
            setUploadingFile(file);
            handleFileChange(e);
            simulateUpload(file);
        } else {
            const newFile = { file, progress: 0, completed: false };
            setFiles((prev) => [...prev, newFile]);
            handleFileChange(e);
            let p = 0;
            const uploadTimer = setInterval(() => {
                p += 10;
                setFiles((prev) =>
                    prev.map((f, i) =>
                        i === prev.length - 1 ? { ...f, progress: p, completed: p >= 100 } : f
                    )
                );
                if (p >= 100) clearInterval(uploadTimer);
            }, 200);
        }
    };

    const removeFile = (index = null) => {
        if (index === null) {
            setUploadingFile(null);
            setProgress(0);
            setCompleted(false);
        } else {
            setFiles((prev) => prev.filter((_, i) => i !== index));
        }
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
                <div className="mt-3 bg-white rounded-xl shadow p-3 flex items-center gap-3 justify-between">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                            <img
                                src="https://img.icons8.com/color/48/000000/file.png"
                                className="w-8 h-8"
                                alt="file icon"
                            />
                        </div>

                        <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{uploadingFile.name}</p>
                            <p className="text-xs text-gray-500 whitespace-nowrap">
                                {(uploadingFile.size / 1024).toFixed(1)} KB •{" "}
                                {!completed ? (
                                    <span className="text-black">Uploading...</span>
                                ) : (
                                    <span className="text-green-600 inline-flex items-center gap-1">
                                        <FaCheckCircle size={12} /> Completed
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => removeFile()}
                        className="text-gray-500 hover:text-black"
                    >
                        {!completed ? (
                            <img src={wrongIcon} alt="cancel upload" className="w-5 h-5" />
                        ) : (
                            <img
                                src={deleteIcon}
                                alt="delete file"
                                className="w-5 h-5"
                                style={{
                                    filter:
                                        "invert(28%) sepia(94%) saturate(5184%) hue-rotate(-6deg) brightness(93%) contrast(109%)",
                                }}
                            />
                        )}
                    </button>
                </div>
            )}
            {uploadingFile && !completed && (
                <div className="w-full h-2 bg-gray-200 rounded-b-xl overflow-hidden mt-0">
                    <div
                        className="h-2 bg-yellow-400 transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}
            {files.map((f, index) => (
                <div
                    key={index}
                    className="mt-3 bg-white rounded-xl shadow p-3 flex items-center gap-3 justify-between"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                            <img
                                src="https://img.icons8.com/color/48/000000/file.png"
                                className="w-8 h-8"
                                alt="file icon"
                            />
                        </div>

                        <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{f.file.name}</p>
                            <p className="text-xs text-gray-500 whitespace-nowrap">
                                {(f.file.size / 1024).toFixed(1)} KB •{" "}
                                {!f.completed ? (
                                    <span className="text-black">Uploading...</span>
                                ) : (
                                    <span className="text-green-600 inline-flex items-center gap-1">
                                        <FaCheckCircle size={12} /> Completed
                                    </span>
                                )}
                            </p>

                            {!f.completed && (
                                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className="h-2 bg-yellow-400 rounded-full transition-all"
                                        style={{ width: `${f.progress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => removeFile(index)}
                        className="text-gray-500 hover:text-black"
                    >
                        {!f.completed ? (
                            <img src={wrongIcon} alt="cancel upload" className="w-5 h-5" />
                        ) : (
                            <img
                                src={deleteIcon}
                                alt="delete file"
                                className="w-5 h-5"
                                style={{
                                    filter:
                                        "invert(28%) sepia(94%) saturate(5184%) hue-rotate(-6deg) brightness(93%) contrast(109%)",
                                }}
                            />
                        )}
                    </button>
                </div>
            ))}

            {(uploadingFile || files.length > 0) && (
                <div className="mt-3 flex justify-end">
                    <input
                        type="file"
                        id={`${name}-multi`}
                        name={name}
                        onChange={onFileSelect}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById(`${name}-multi`).click()}
                        className="px-4 py-2 rounded-md border border-yellow-500 text-yellow-600 bg-white hover:bg-yellow-50"
                    >
                        + Add More
                    </button>
                </div>
            )}
        </div>
    );
}
