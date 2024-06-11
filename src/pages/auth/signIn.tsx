import { useNavigate } from 'react-router-dom'
import { MemberRegisterTypes } from '@/types/type.ts'
import { useEffect } from 'react'
import GoogleBtn from '@/pages/auth/googleBtn.tsx'
import NaverBtn from '@/pages/auth/naverBtn.tsx'

const SignIn = () => {
  const navigate = useNavigate() // useNavigate 훅 사용
  const handleLoginSuccess = (tokenResponse: any, provider: MemberRegisterTypes) => {
    console.log(tokenResponse)
    navigate('/auth/authenticator', {
      state: {
        accessToken: tokenResponse.access_token,
        memberRegisterType: provider, // provider 값을 설정
      },
    })
  }
  const handleCallback = () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const token = hashParams.get('access_token')
    const storedProvider = localStorage.getItem('provider') as MemberRegisterTypes | null
    if (token && storedProvider) {
      handleLoginSuccess({ access_token: token }, storedProvider)
    }
  }
  useEffect(() => {
    handleCallback()
  }, [])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">소셜 로그인</h1>
        <div className="space-y-0.5">
          <GoogleBtn />
          <NaverBtn />
        </div>
      </div>
    </div>
  )
}

export default SignIn
