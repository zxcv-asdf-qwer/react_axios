import { useNavigate } from 'react-router-dom'
import { MemberRegisterTypes } from '@/types/type.ts'
import { useEffect, useState } from 'react'
import GoogleBtn from '@/pages/auth/googleBtn.tsx'
import NaverBtn from '@/pages/auth/naverBtn.tsx'
import { SocialLoginRequest } from '@/types/socialLoginRequest.ts'
import AuthService from '@/apis/AuthService.ts'
import { isSocialUserResponse } from '@/types/socialUserResponse.ts'
import { isSocialLoginResponse } from '@/types/socialLoginResponse.ts'
import { setAuthorizationToken } from '@/libs/axios.ts'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // useNavigate 훅 사용

  const handleCallback = () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const token = hashParams.get('access_token')
    const storedProvider = localStorage.getItem('provider') as MemberRegisterTypes | null
    if (token && storedProvider) {
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
            navigate('/auth/signUp', { state: response.data })
          }
          if (isSocialLoginResponse(response.data)) {
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
            <div className="space-y-0.5">
              <GoogleBtn />
              <NaverBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignIn
