"use client";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (selected: number) => void;
}

export const Pagination = ({
  currentPage,
  pageCount,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  const offset = currentPage * itemsPerPage;
  const end = Math.min(offset + itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 text-sm text-text-dark font-plus_jakarta_sans">
      <p>
        Showing <strong>{end}</strong> of{" "}
        <strong>{totalItems}</strong>
      </p>

      <ReactPaginate
        previousLabel={<FiChevronLeft className="text-lg cursor-pointer" />}
        nextLabel={<FiChevronRight className="text-lg cursor-pointer" />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={({ selected }) => onPageChange(selected)}
        forcePage={currentPage}
        containerClassName="flex items-center gap-2 mt-4 sm:mt-0"

        // Page numbers
        pageClassName="font-semibold w-8 h-8 flex items-center justify-center hover:bg-[#F5F5F5]"
        activeClassName="text-primary-100 font-semibold border-2 border-neutral-300 shadow-sm"

        // Previous/Next buttons
        previousClassName="border-2 border-primary-100 w-8 h-8 flex items-center justify-center text-text-dark"
        nextClassName="border-2 border-primary-100 w-8 h-8 flex items-center justify-center text-text-dark"

        // Break dots (...)
        breakClassName="w-8 h-8 flex items-center justify-center text-[#4C0027]"

        disabledClassName="opacity-50 pointer-events-none"
      />
    </div>
  );
};
