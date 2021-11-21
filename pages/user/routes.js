import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

import { RouteModal } from '~components/RouteModal'
import { useAuth } from '~context/auth'
import {
  formatRouteTime,
  getRandomRouteDistance,
  getRandomRouteType,
} from '~lib/utils'
import { fetchUserRoutes } from '~services/user'

export default function Routes() {
  const { user } = useAuth()
  const [routes, setRoutes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentRoute, setCurrentRoute] = useState(null)

  const handleViewRoute = (route) => {
    setCurrentRoute(route)
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
          <h1 className="mb-0">My Routes</h1>

          <Link href="/user/routes/new" passHref>
            <Button as="a" className="ms-auto px-5" href="/">
              <i className="bi-plus-lg"></i>&nbsp; New Route
            </Button>
          </Link>
        </div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Distance</th>
              <th>Time</th>
              <th className="w-auto"></th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="5" align="center">
                  Loading routes...
                </td>
              </tr>
            )}
            {!isLoading && routes.length === 0 && (
              <tr>
                <td colSpan="5">No routes available</td>
              </tr>
            )}
            {routes.map((route) => (
              <tr key={route._id} valign="middle">
                <td>{route.name}</td>
                <td>{getRandomRouteType()}</td>
                <td>{getRandomRouteDistance()}</td>
                <td>{formatRouteTime(route.time.toString())}</td>
                <td className="w-auto">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="me-1"
                    onClick={() => handleViewRoute(route)}
                  >
                    <i className="bi-map"></i>&nbsp; View
                  </Button>

                  <Button size="sm" variant="danger">
                    <i className="bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {currentRoute && (
          <RouteModal
            onClose={() => setCurrentRoute(null)}
            route={currentRoute}
          />
        )}
      </>
    )
  )
}
