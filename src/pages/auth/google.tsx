import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthService from '@/apis/AuthService.ts'
import { SocialLoginRequest } from '@/types/socialLoginRequest.ts'
import { isSocialLoginResponse } from '@/types/socialLoginResponse.ts'
import { isSocialUserResponse } from '@/types/socialUserResponse.ts'

const AuthGoogle = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const state = location.state as { accessToken?: string }

    if (state && state.accessToken) {
      // 토큰을 처리하는 로직을 추가합니다.
      console.log('Access Token:', state.accessToken)

      // 예를 들어, 토큰을 저장하고 홈 페이지로 리디렉션할 수 있습니다.
      // localStorage.setItem('accessToken', state.accessToken);
      // navigate('/'); // 홈 페이지로 리디렉션
      doSignIn(state.accessToken)
    } else {
      // 오류 처리
      console.error('No access token found')
    }
  }, [])

  return (
    <div>
      <h1>Authenticating...</h1>
    </div>
  )

  function doSignIn(token: string) {
    const socialLoginRequest: SocialLoginRequest = {
      token: token,
      memberRegisterType: 'GOOGLE',
      oauthType: 'TOKEN',
    }
    AuthService.signInWithSocial<any>(socialLoginRequest)
      .then((response) => {
        if (response.status === 200) {
          if (isSocialUserResponse(response.data)) {
            navigate('/auth/signUp', { state: response.data })
          }
          if (isSocialLoginResponse(response.data)) {
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            navigate('/')
          }
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }
}

export default AuthGoogle
