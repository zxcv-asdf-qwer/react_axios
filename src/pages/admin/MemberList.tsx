import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination.tsx'
// import MemberManagerService from '@/apis/MemberManagerService.ts'
import { MemberListResponse2, UserInfo } from '@/types/UserInfo.ts'
import SupabaseAuthService from '@/apis/SupabaseAuthService'

function MemberList() {
  const [members, setMembers] = useState<UserInfo[]>([])
  const [page, setPage] = useState(0)
  const [size] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    SupabaseAuthService.getUserInfo<MemberListResponse2>(page, size)
      .then((response) => {
        if (response.data) {
          console.log(response.data)
          setMembers(response.data)
          setTotalCount(response.totalCount)
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
              UUId
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image Url
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Providers
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">{member.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{member.user_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{member.image_url}</td>
              <td className="px-6 py-4 whitespace-nowrap">{member.providers.map((provider, index) => (
                <span key={index} className="mr-1 px-2 py-1 bg-gray-200 rounded-full text-sm">
                  {provider}
                </span>
              ))}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap"> {Array.from(member.groups)[0]?.groupNm || 'No Group'}</td> */}
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
