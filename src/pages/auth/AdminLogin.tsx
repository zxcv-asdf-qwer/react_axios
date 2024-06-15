import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import AuthService from '@/apis/AuthService.ts'
import { setAuthorizationToken } from '@/libs/axios.ts'

const AdminLogin: React.FC = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    AuthService.LoginForAdmin<any>(userId, password)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          setAuthorizationToken(response.data.access_token)
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
        <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="mb-2 block">
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
            </div>
            <input
              id="userId"
              type="text"
              onChange={(e) => {
                setUserId(e.target.value)
              }}
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
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}
export default AdminLogin
