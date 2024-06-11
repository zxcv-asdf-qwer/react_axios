import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
  const token = localStorage.getItem('access_token') // 또는 다른 저장소에서 토큰을 가져오세요

  useEffect(() => {
    // access_token이 있는지 확인
    if (token) {
      setIsLoggedIn(true)
    }
  }, [token])
  const handleSignInClick = () => {
    navigate('/auth/signIn') // 페이지 이동
  }

  const handleLogoutClick = () => {
    // 로그아웃 로직을 여기에 추가합니다
    localStorage.removeItem('access_token') //저장소에서 토큰을 제거
    setIsLoggedIn(false)
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/public/assets/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
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
          <Button onClick={handleLogoutClick}>Logout</Button>
        ) : (
          <Button onClick={handleSignInClick}>Sign In</Button>
        )}
        <Navbar.Toggle />
      </div>
      );
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}

export default Navigation
