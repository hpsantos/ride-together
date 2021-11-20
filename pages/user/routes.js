import { useAuth } from 'context/auth'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { fetchUserRoutes } from 'services/user'

export default function Routes() {
  const { user } = useAuth()
  const [routes, setRoutes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const formatRouteTime = (routeTime) => {
    const minutes = routeTime.slice(-2)
    const hours = routeTime.slice(0, routeTime.length - 2)
    return `${hours}:${minutes}`
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
        <h3 className="mb-4">My Routes</h3>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Hour</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading &&
              <tr>
                <td colSpan="3" align="center">Loading data...</td>
              </tr>
            }
            {!isLoading && routes.length === 0 &&
              <tr>
                <td colSpan="3">No routes available</td>
              </tr>}
            {routes.map((route) => (
              <tr key={route._id} valign="middle">
                <td>{route.name}</td>
                <td>{formatRouteTime(route.time.toString())}</td>
                <td>
                  <Button size="sm">View Route</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  )
}
