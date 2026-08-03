"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          px-4 py-2
          rounded-lg
          bg-gray-200
          dark:bg-gray-700
          text-black
          dark:text-white
          hover:bg-gray-300
          dark:hover:bg-gray-600
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        Previous
      </button>

      <span className="font-semibold text-black dark:text-white">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          px-4 py-2
          rounded-lg
          bg-gray-200
          dark:bg-gray-700
          text-black
          dark:text-white
          hover:bg-gray-300
          dark:hover:bg-gray-600
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        Next
      </button>
    </div>
  );
}