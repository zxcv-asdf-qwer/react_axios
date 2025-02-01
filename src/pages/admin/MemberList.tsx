import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination.tsx'
// import MemberManagerService from '@/apis/MemberManagerService.ts'
import { MemberListResponse2, UserInfo } from '@/types/UserInfo.ts'
import SupabaseAuthService from '@/apis/SupabaseAuthService'
import MemberlistPop from './MemberListPop'

function MemberList() {
  const [members, setMembers] = useState<UserInfo[]>([])
  const [page, setPage] = useState(0)
  const [size] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<UserInfo | null>(null)

  useEffect(() => {
    fetchMembers()
  }, [page, size])

  const fetchMembers = () => {
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

  }

  const handleAddMember = () => {
    setSelectedMember(null)
    setIsFormOpen(true)
  }

  const handleEditMember = (member: UserInfo) => {
    setSelectedMember(member)
    setIsFormOpen(true)
  }

  const handleSaveMember = (member: UserInfo) => {
    if (member.id) {
      setMembers(members.map(m => m.id === member.id ? member : m))
    } else {
      setMembers([...members, { ...member, id: Date.now().toString() }])
    }
    setIsFormOpen(false)
    fetchMembers()
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Member List</h1>
      <button
        onClick={handleAddMember}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Member
      </button>
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
            <tr key={member.id} onClick={() => handleEditMember(member)}>
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
      {isFormOpen && (
        <MemberlistPop
          member={selectedMember}
          onSave={handleSaveMember}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  )
}

export default MemberList
