import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import GoogleSignIn from '../../public/assets/google_login.png'

const AddUsers = () => {
  const navigate = useNavigate() // useNavigate 훅 사용

  const handleClickLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse)
      navigate('/auth/google', {
        state: {
          accessToken: tokenResponse.access_token,
        },
      })
    },
  })

  return (
    <div>
      <button className="login-btn" onClick={() => handleClickLogin()}>
        <img src={GoogleSignIn} alt="로그인버튼" className="login-img" />
      </button>
    </div>
  )
}

export default AddUsers
