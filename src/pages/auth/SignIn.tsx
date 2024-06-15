import { useNavigate } from 'react-router-dom'
import { MemberRegisterTypes } from '@/types/Type.ts'
import React, { useEffect, useState } from 'react'
import GoogleBtn from '@/components/GoogleBtn.tsx'
import NaverBtn from '@/components/NaverBtn.tsx'
import { SocialLoginRequest } from '@/types/SocialLoginRequest.ts'
import AuthService from '@/apis/AuthService.ts'
import { isSocialUserResponse } from '@/types/SocialUserResponse.ts'
import { isSocialLoginResponse } from '@/types/SocialLoginResponse.ts'
import { setAuthorizationToken } from '@/libs/axios.ts'

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // useNavigate 훅 사용

  const handleCallback = () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const token = hashParams.get('access_token')
    const storedProvider = localStorage.getItem('provider') as MemberRegisterTypes | null
    if (token && storedProvider) {
      localStorage.setItem('SOCIAL_ACCESS_TOKEN', token)
      doSignIn(token, storedProvider)
    }
  }
  function doSignIn(token: string, provider: MemberRegisterTypes) {
    setIsLoading(true)

    const socialLoginRequest: SocialLoginRequest = {
      token: token,
      memberRegisterType: provider,
      oauthType: 'TOKEN',
    }
    AuthService.signInWithSocial<any>(socialLoginRequest)
      .then((response) => {
        setIsLoading(false) // 로딩 상태 해제
        if (response.status === 200) {
          if (isSocialUserResponse(response.data)) {
            navigate('/auth/userSignUp', { state: response.data })
          }
          if (isSocialLoginResponse(response.data)) {
            localStorage.setItem('USER_TYPE', 'USER')
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            setAuthorizationToken(response.data.access_token)
            navigate('/')
          }
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        setIsLoading(false) // 로딩 상태 해제
        alert(error.message ?? error)
      })
  }

  const handleAdminSignUp = () => {
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
                  onClick={handleAdminSignUp}
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
