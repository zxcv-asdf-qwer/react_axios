import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AuthService from '@/apis/AuthService.ts'
import { MemberResponse } from '@/types/MemberResponse.ts'
import InfoService from '@/apis/InfoService.ts'

interface Route {
  path: string
  label: string
  active?: boolean
}

function Navigation({ routes }: { routes: Route[] }) {
  const location = useLocation()
  const navigate = useNavigate() // useNavigate 훅 사용
  const currentPath = location.pathname
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userNm, setUserNm] = useState('')
  const [email, setEmail] = useState('')
  const token = localStorage.getItem('access_token') // 또는 다른 저장소에서 토큰을 가져오세요
  useEffect(() => {
    // access_token이 있는지 확인
    if (token) {
      setIsLoggedIn(true)
      getMyInfo()
    } else {
      setIsLoggedIn(false)
    }
  }, [token])

  const getMyInfo = () => {
    InfoService.findMe<MemberResponse>()
      .then((response) => {
        if (response.status === 200) {
          setUserNm(response.data.userNm)
          setEmail(response.data.email)
        }
      })
      .catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
  }

  const handleLoginClick = () => {
    navigate('/auth/signIn')
    localStorage.clear()
  }

  const handleLogoutClick = () => {
    if (token) {
      // 로그아웃 요청을 보냅니다.
      AuthService.logout<any>().catch((error: { [key: string]: string | number }) => {
        alert(error.message ?? error)
      })
      localStorage.clear() //저장소에서 토큰을 제거
    } else {
      console.error('No id_token found')
    }
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="#">
        <img src="/public/assets/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ColdBrew React</span>
      </Navbar.Brand>
      <Navbar.Collapse>
        {routes
          .filter((route) => route.path.includes('/dashboard'))
          .map((route, index) => (
            <Navbar.Link href={route.path} active={route.path === currentPath} key={index}>
              {route.label}
            </Navbar.Link>
          ))}
      </Navbar.Collapse>
      <div className="flex md:order-2">
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userNm}</span>
              <span className="block truncate text-sm font-medium">{email}</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate('/profile')}>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogoutClick}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button onClick={handleLoginClick}>Sign In</Button>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}

export default Navigation
