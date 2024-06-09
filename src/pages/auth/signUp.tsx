import { useLocation, useNavigate } from 'react-router-dom'
import { SocialUserResponse } from '@/types/socialUserResponse.ts'
import React, { useEffect, useState } from 'react'
import AuthService from '@/apis/AuthService.ts'
import { SocialCreateRequest } from '@/types/socialCreateRequest.ts'

const AboutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [userNm, setUserNm] = useState('')
  const memberRegisterType = location.state.memberRegisterType
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const socialCreateRequest: SocialCreateRequest = {
      email: email,
      userNm: userNm,
      memberRegisterType: memberRegisterType,
      userType: 'USER',
    }
    AuthService.signUpWithSocial<any>(socialCreateRequest)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          navigate('/')
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }

  useEffect(() => {
    const state = location.state as SocialUserResponse
    if (state && state.email) {
      setEmail(state.email)
    } else {
      // 오류 처리
      console.error('No access token found')
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <input
              id="userNm"
              type="text"
              value={userNm}
              onChange={(e) => setUserNm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
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

export default AboutPage
