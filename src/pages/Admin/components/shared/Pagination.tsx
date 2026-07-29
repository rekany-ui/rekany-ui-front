import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export function Pagination({ totalItems, currentPage, onPageChange, itemsPerPage }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3.5">
      <p className="text-xs text-gray-400">
        {totalItems} élément{totalItems > 1 ? 's' : ''}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaChevronLeft className="text-[10px]" />
        </button>
        <span className="px-2 text-xs text-gray-500">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaChevronRight className="text-[10px]" />
        </button>
      </div>
    </div>
  );
}