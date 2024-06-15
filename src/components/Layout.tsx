import React, { useEffect } from 'react'
import Navigation from '@/components/Navigation.tsx'
import Sidebaro from '@/components/Sidebaro.tsx'
import { setAuthorizationToken } from '@/libs/axios.ts'

interface Route {
  path: string
  label: string
  active?: boolean
}

interface LayoutProps {
  children: React.ReactNode
  routes: Route[]
}

const Layout: React.FC<LayoutProps> = ({ children, routes }) => {
  const userType = localStorage.getItem('USER_TYPE') // 또는 다른 저장소에서 토큰을 가져오세요
  const token = localStorage.getItem('access_token')
  useEffect(() => {
    // access_token이 있는지 확인
    if (token) {
      /**
       * 페이지 로드 시 로컬 스토리지에서 토큰을 불러와 설정
       */
      setAuthorizationToken(token)
    }
  }, [token])
  return (
    <>
      {token && userType === 'ADMIN' ? (
        <div className="flex">
          <Sidebaro routes={routes} />
          <div className="flex-1 p-4">{children}</div>
        </div>
      ) : (
        <div>
          <Navigation routes={routes} />
          <div>{children}</div>
        </div>
      )}
    </>
  )
}

export default Layout
