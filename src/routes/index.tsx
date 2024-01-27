import { ActionFunction, createBrowserRouter, LoaderFunction, RouterProvider } from 'react-router-dom'
import Layout from '../components/Layout.tsx'

interface RouteCommon {
  loader?: LoaderFunction
  action?: ActionFunction
  ErrorBoundary?: React.ComponentType<any>
}

interface IRoute extends RouteCommon {
  path: string
  label: string
  active?: boolean
  Element: React.ComponentType<any>
}

interface Pages {
  [key: string]: {
    default: React.ComponentType<any>
  } & RouteCommon
}

const pages: Pages = import.meta.glob('../pages/**/*.tsx', { eager: true })

const routes: IRoute[] = []
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1]
  if (!fileName) {
    continue
  }

  const normalizedPathName = fileName.includes('$') ? fileName.replace('$', ':') : fileName.replace(/\/index/, '')

  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    label: normalizedPathName,
    Element: pages[path].default,
    loader: pages[path]?.loader as LoaderFunction | undefined,
    action: pages[path]?.action as ActionFunction | undefined,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  })
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: (
      <Layout routes={routes}>
        <Element />
      </Layout>
    ),
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  })),
)

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
