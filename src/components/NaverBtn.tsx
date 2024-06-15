import NaverSignIn from '../../public/assets/naver_login.png'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    naver: any
  }
}
const NaverIdLogin = styled.div`
  display: none;
`

function NaverBtn() {
  const naverRef = useRef<HTMLInputElement>(null)
  const { naver } = window

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
      callbackUrl: import.meta.env.VITE_AUTH_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 45 },
      callbackHandle: true,
    })
    naverLogin.init()
  }

  useEffect(() => {
    initializeNaverLogin()
  }, [])

  const handleNaverLogin = () => {
    localStorage.setItem('provider', 'NAVER') // localStorage에 provider 저장
    if (naverRef.current) {
      ;(naverRef.current.children[0] as HTMLElement).click()
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <NaverIdLogin ref={naverRef} id="naverIdLogin" />
      </div>
      <div className="flex justify-center">
        <button className="w-full flex justify-center py-2 px-4 border border-transparent" onClick={handleNaverLogin}>
          <img src={NaverSignIn} alt="네이버 로그인 버튼" className="login-img" />
        </button>
      </div>
    </>
  )
}

export default NaverBtn
