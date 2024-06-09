import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
    } else {
      // 오류 처리
      console.error('No access token found')
    }
  }, [location, navigate])

  return (
    <div>
      <h1>Authenticating...</h1>
    </div>
  )
}

export default AuthGoogle
