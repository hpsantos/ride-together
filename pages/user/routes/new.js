import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import { Map } from '~components/map/Map'
import { SelectTime } from '~components/SelectTime'
import { useAuth } from '~context/auth'
import { createRoute } from '~services/routes'

export default function NewRoute() {
  const { user } = useAuth()
  const [from, setFrom] = useState(() => 'Viseu')
  const [to, setTo] = useState(() => 'Leiria')
  const [hours, setHours] = useState('9')
  const [minutes, setMinutes] = useState('00')
  const [mapRoutes, setMapRoutes] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  const buildRoute = (routePath) => ({
    from,
    to,
    name: `Trip from ${from} to ${to}`,
    routeData: routePath,
    time: parseInt(`${hours}${minutes}`), // 9h30m
    user: user.name,
  })

  const calculateRoute = (event) => {
    event.preventDefault()

    if (!from || !to) {
      alert('Please provide source & destination.')
      return
    }

    // TODO: Clean current routes (not working yet)
    setMapRoutes([])

    const directionsService = new window.google.maps.DirectionsService()

    const gmapData = {
      origin: from,
      destination: to,
      travelMode: 'DRIVING',
    }

    directionsService.route(gmapData, function (result, status) {
      if (status == 'OK') {
        setMapRoutes([buildRoute(result.routes[0].overview_path)])
      }
    })
  }

  const saveRoute = async () => {
    setIsCreating(true)
    // Fix this crap after geekathon
    await createRoute(mapRoutes[0])

    setIsCreating(false)
  }

  return (
    <>
      <h1>New Route</h1>
      <Form variant="inline" onSubmit={calculateRoute}>
        <Row className="align-items-center my-5">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="From (e.g.: Viseu)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Col>

          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="To (e.g.: Leiria)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </Col>

          <Col xs="4">
            <SelectTime
              hours={hours}
              minutes={minutes}
              onHoursChange={setHours}
              onMinutesChange={setMinutes}
            />
          </Col>

          <Col xs="auto">
            <Button className="me-4" variant="secondary" type="submit">
              Check Route
            </Button>

            <Button type="submit" onClick={saveRoute} disabled={isCreating}>
              Save Route
            </Button>
          </Col>
        </Row>
      </Form>

      <Map routes={mapRoutes} />
    </>
  )
}
