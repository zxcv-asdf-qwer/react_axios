// src/components/MemberList.tsx
import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination.tsx'
import MemberManagerService from '@/apis/MemberManagerService.ts'
import { MemberListResponse, MemberResponse } from '@/types/MemberResponse.ts'

function MemberList() {
  const [members, setMembers] = useState<MemberResponse[]>([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    MemberManagerService.getMemberList<MemberListResponse>(page, size)
      .then((response) => {
        if (response.status === 200) {
          setMembers(response.data.data)
          setTotalCount(response.data.totalCount)
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }, [page, size])

  return (
    <div>
      <h1 className="text-2xl mb-4">Member List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Groups
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.memberId}>
              <td className="px-6 py-4 whitespace-nowrap">{member.userNm}</td>
              <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{member.deptCode.desc}</td>
              <td className="px-6 py-4 whitespace-nowrap">{member.groups.map((group) => group.groupNm).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={totalCount}
        pageSize={size}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  )
}

export default MemberList
