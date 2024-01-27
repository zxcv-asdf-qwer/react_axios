import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useLocation } from 'react-router-dom'

interface Route {
  path: string
  label: string
  active?: boolean
}

function Navigation({ routes }: { routes: Route[] }) {
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/public/assets/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
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
      <Navbar.Collapse>
        {routes.map((route, index) => (
          <Navbar.Link href={route.path} active={route.path === currentPath} key={index}>
            {route.label}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
