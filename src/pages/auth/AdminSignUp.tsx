import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import AuthService from '@/apis/AuthService.ts'
import { AdminMemberCreateRequest } from '@/types/AdminMemberCreateRequest.ts'
import { DeptCodes } from '@/types/Type.ts'

const deptOptions: DeptCodes[] = ['DEVELOPER', 'OPERATION']

const AdminSignUp: React.FC = () => {
  const navigate = useNavigate()
  const [editedForm, setEditedForm] = useState<AdminMemberCreateRequest>({})
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (editedForm) {
      setEditedForm({
        ...editedForm,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    AuthService.signUpForAdmin<any>(editedForm!)
      .then((response) => {
        if (response.status === 200) {
          navigate('/')
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              id="userId"
              name="userId"
              type="text"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="userPw"
              name="userPw"
              type="password"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="userNm" className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <input
              id="userNm"
              name="userNm"
              type="text"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="deptCode" className="block text-sm font-medium text-gray-700">
              역할
            </label>
            <select
              id="deptCode"
              name="deptCode"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            >
              <option value="">선택하세요</option>
              {deptOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminSignUp
