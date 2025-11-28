function FileUpload({ label, name, handleFileChange }) {
    return (
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
                onChange={handleFileChange}
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
    );
}

export { FileUpload };
