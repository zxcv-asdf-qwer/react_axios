import React, { useEffect, useState } from 'react'
import { MemberResponse } from '@/types/MemberResponse.ts'
import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import InfoService from '@/apis/InfoService.ts'
import { MemberUpdateRequest } from '@/types/MemberUpdateRequest.ts'
import { GroupDto } from '@/types/GroupDto.ts'
import { useNavigate } from 'react-router-dom'
import { LeaveRequest } from '@/types/LeaveRequest.ts'

const Profile: React.FC = () => {
  const navigate = useNavigate() // useNavigate 훅 사용
  const [editedProfile, setEditedProfile] = useState<MemberUpdateRequest>()
  const [profile, setProfile] = useState<MemberResponse | null>(null)
  const getMyInfo = () => {
    InfoService.findMe<MemberResponse>()
      .then((response) => {
        if (response.status === 200) {
          setProfile(response.data)
          setEditedProfile(response.data) // 초기값 설정
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [e.target.name]: e.target.value,
      })
    }
  }
  const handleSave = () => {
    // memberUpdateRequest 객체가 존재하고, groupKeys가 존재하는 경우 할당
    editedProfile!.groupKeys = profile?.groupKeys ?? new Set<GroupDto>()
    InfoService.updateMyInfo<any>(editedProfile!) // 프로필 수정 API 요청
      .then((response) => {
        if (response.status === 200) {
          getMyInfo()
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }
  const handleDelete = () => {
    const leaveRequest: LeaveRequest = {
      token: localStorage.getItem('SOCIAL_ACCESS_TOKEN') ?? '',
    }
    // 탈퇴 API 요청
    InfoService.revoke<any>(leaveRequest)
      .then((response) => {
        if (response.status === 200) {
          alert('계정이 성공적으로 삭제되었습니다.')
          localStorage.clear() //저장소에서 토큰을 제거
          navigate('/')
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }
  useEffect(() => {
    getMyInfo()
  }, [])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {profile ? (
          <div className="px-6 py-4">
            <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
            <div className="mt-4">
              <form className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  {profile.email}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="userNm" value="Name" />
                  </div>
                  <TextInput
                    id="userNm"
                    type="text"
                    name="userNm"
                    value={editedProfile?.userNm || ''}
                    onChange={handleInputChange}
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="telNo" value="Phone Number" />
                  </div>
                  <TextInput
                    id="telNo"
                    type="tel"
                    name="telNo"
                    value={editedProfile?.telNo || ''}
                    onChange={handleInputChange}
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="address1" value="Address Line 1" />
                  </div>

                  <TextInput
                    id="address1"
                    type="text"
                    name="address1"
                    value={editedProfile?.address1 || ''}
                    onChange={handleInputChange}
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="address2" value="Address Line 2" />
                  </div>

                  <TextInput
                    id="address2"
                    type="text"
                    name="address2"
                    value={editedProfile?.address2 || ''}
                    onChange={handleInputChange}
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="introduce" value="Introduction" />
                  </div>
                  <Textarea
                    id="introduce"
                    name="introduce"
                    onChange={handleInputChange}
                    value={editedProfile?.introduce || ''}
                    className="border p-2 w-full shadow"
                    required
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Button className="min-w-[70px]" size="md" onClick={handleSave}>
                    Save
                  </Button>
                  <Button className="ml-auto" color="failure" size="md" onClick={handleDelete}>
                    Delete Account
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
