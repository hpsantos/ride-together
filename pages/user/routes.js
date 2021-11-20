import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

import { RouteModal } from '~components/RouteModal'
import { useAuth } from '~context/auth'
import { dummyRouteData1 } from '~lib/dummy'
import { formatRouteTime } from '~lib/utils'
import { fetchUserRoutes } from '~services/user'

export default function Routes() {
  const { user } = useAuth()
  const [routes, setRoutes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [routeData, setRouteData] = useState(null)

  const handleViewRoute = () => {
    setRouteData([dummyRouteData1])
  }

  useEffect(() => {
    let mounted = true

    const fetchRoutes = async (username) => {
      if (!mounted) return

      setIsLoading(true)

      const response = await fetchUserRoutes(username)

      setRoutes(response.data)
      setIsLoading(false)
    }

    if (!user) {
      return Router.push('/user/login')
    }

    fetchRoutes(user.name)

    return () => {
      mounted = false
    }
  }, [user])

  return (
    user && (
      <>
        <div className="d-flex align-items-center mb-4">
          <h3 className="mb-0">My Routes</h3>

          <Link href="/user/routes/new" passHref>
            <Button as="a" className="ms-auto" href="/">
              New Route
            </Button>
          </Link>
        </div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="3" align="center">
                  Loading data...
                </td>
              </tr>
            )}
            {!isLoading && routes.length === 0 && (
              <tr>
                <td colSpan="3">No routes available</td>
              </tr>
            )}
            {routes.map((route) => (
              <tr key={route._id} valign="middle">
                <td>{route.name}</td>
                <td>{formatRouteTime(route.time.toString())}</td>
                <td>
                  <Button size="sm" onClick={handleViewRoute}>
                    View Route
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <RouteModal onClose={() => setRouteData(null)} data={routeData} />
      </>
    )
  )
}
