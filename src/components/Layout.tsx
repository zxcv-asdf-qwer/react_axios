import Navigation from './Navigation.tsx'
import React from 'react'

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
  return (
    <>
      <Navigation routes={routes} />
      <div>{children}</div>
    </>
  )
}

export default Layout
