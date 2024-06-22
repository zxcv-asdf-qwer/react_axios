import { useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import AuthService from '@/apis/AuthService.ts'

interface Route {
  path: string
  label: string
  active?: boolean
}

function Sidebaro({ routes }: { routes: Route[] }) {
  const navigate = useNavigate() // useNavigate 훅 사용
  const location = useLocation()
  const token = localStorage.getItem('access_token') // 또는 다른 저장소에서 토큰을 가져오세요

  const handleLogoutClick = () => {
    if (token) {
      // 로그아웃 요청을 보냅니다.
      AuthService.logout<any>()
        .then(() => {
          localStorage.clear() //저장소에서 토큰을 제거
          if (location.pathname === '/') {
            window.location.reload()
          } else {
            navigate('/')
          }
        })
        .catch((error: { [key: string]: string | number }) => {
          alert(error.message ?? error)
        })
    } else {
      console.error('No id_token found')
      if (location.pathname === '/') {
        window.location.reload()
      } else {
        navigate('/')
      }
    }
  }

  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="#" img="/public/assets/favicon.svg" imgAlt="Flowbite logo">
        ColdBrew
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {routes
            .filter((route) => route.path.includes('/admin'))
            .map((route, index) => (
              <Sidebar.Item href={route.path} key={index}>
                {route.label}
              </Sidebar.Item>
            ))}
          <Sidebar.Item href="#" onClick={handleLogoutClick}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default Sidebaro
