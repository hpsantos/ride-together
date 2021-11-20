import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

import { RouteModal } from '~components/RouteModal'
import { useAuth } from '~context/auth'
import { dummyRouteData1 } from '~lib/dummy'
import { fetchUserRoutes } from '~services/user'

export default function Routes() {
  const { user } = useAuth()
  const [routes, setRoutes] = useState([])
  const [routeData, setRouteData] = useState(null)

  const formatRouteTime = (routeTime) => {
    const minutes = routeTime.slice(-2)
    const hours = routeTime.slice(0, routeTime.length - 2)
    return `${hours}:${minutes}`
  }

  const handleViewRoute = () => {
    setRouteData([dummyRouteData1])
  }

  useEffect(() => {
    let mounted = true

    const fetchRoutes = async (username) => {
      if (!mounted) return

      const response = await fetchUserRoutes(username)
      setRoutes(response.data)
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
        <h3 className="mb-4">My Routes</h3>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {routes.length === 0 && (
              <tr>
                <td colSpan="2">No routes available</td>
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
