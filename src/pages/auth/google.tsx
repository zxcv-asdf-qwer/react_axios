import GoogleSignIn from '../../../public/assets/google_login.png'

function GoogleBtn() {
  const initializeGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const redirectUri = import.meta.env.VITE_AUTH_CALLBACK_URL + '?provider=GOOGLE'
    const responseType = 'token'
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`

    window.location.href = authUrl
  }

  return (
    <>
      <button className="login-btn" onClick={() => initializeGoogleLogin()}>
        <img src={GoogleSignIn} alt="구글 로그인 버튼" className="login-img" />
      </button>
    </>
  )
}

export default GoogleBtn
