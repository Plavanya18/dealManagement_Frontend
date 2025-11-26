import React from "react";

function Pagination({ page, totalPages, setPage }) {
    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const nextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="flex items-center justify-center gap-10 pt-4">

            <button
                onClick={prevPage}
                disabled={page === 1}
                className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg 
                           disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <span className="text-gray-600 text-xl">‹</span>
            </button>

            <div className="flex items-center gap-4 text-lg">
                <span className="text-[#D4A017] font-medium">{page}</span>
                <span className="text-gray-600">of</span>
                <span className="text-gray-700">{totalPages}</span>
            </div>

            <button
                onClick={nextPage}
                disabled={page === totalPages}
                className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg 
                           disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <span className="text-[#D4A017] text-xl">›</span>
            </button>
        </div>
    );
}

export default Pagination;
