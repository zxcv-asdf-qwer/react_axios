import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import GoogleBtn from '@/components/GoogleBtn.tsx'
import NaverBtn from '@/components/NaverBtn.tsx'

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // useNavigate 훅 사용

  const handleCallback = () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const token = hashParams.get('access_token')
  }

  const handleAdminSignIn = () => {
    navigate('/auth/adminSignIn')
  }
  useEffect(() => {
    handleCallback()
  }, [])
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">소셜 로그인</h1>
            <div className="space-y-0.1">
              <GoogleBtn />
              <NaverBtn />
              <div className="flex justify-center">
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent"
                  onClick={handleAdminSignIn}
                >
                  관리자로 시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignIn
