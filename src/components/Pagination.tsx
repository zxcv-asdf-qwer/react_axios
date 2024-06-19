// src/components/Pagination.tsx
import React from 'react'
import { Pagination as FlowbitePagination } from 'flowbite-react'

type PaginationProps = {
  totalItems: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <div className="flex justify-center mt-4">
      <FlowbitePagination
        currentPage={currentPage + 1} // Flowbite Pagination은 1-based index를 사용합니다.
        totalPages={totalPages}
        onPageChange={(page) => onPageChange(page - 1)} // 0-based index로 변경합니다.
      />
    </div>
  )
}

export default Pagination
