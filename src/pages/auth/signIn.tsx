import { useNavigate } from 'react-router-dom'
import { MemberRegisterTypes } from '@/types/type.ts'
import NaverBtn from '@/pages/auth/naver.tsx'
import GoogleBtn from '@/pages/auth/google.tsx'
import { useEffect } from 'react'

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
    const queryParams = new URLSearchParams(window.location.search)
    const provider = queryParams.get('provider') as MemberRegisterTypes
    if (token) {
      handleLoginSuccess({ access_token: token }, provider)
    }
  }
  useEffect(() => {
    handleCallback()
  }, [])
  return (
    <div>
      <NaverBtn />
      <GoogleBtn />
    </div>
  )
}

export default SignIn
