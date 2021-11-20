import { MapContainer } from 'components/map'
import { useAuth } from 'context/auth'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { createRoute } from 'services/routes'

export default function NewRoute() {
  const { user } = useAuth()
  const [from, setFrom] = useState(() => 'Viseu')
  const [to, setTo] = useState(() => 'Leiria')
  const [hours, setHours] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [mapRoutes, setMapRoutes] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  const calculateRoute = (event) => {
    event.preventDefault()

    if (!from || !to) {
      alert('Please provide source & destination.')
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
        setMapRoutes([result])
      }
    })
  }

  const saveRoute = async () => {
    setIsCreating(true)

    await createRoute({
      from,
      to,
      name: `Trip from ${from} to ${to}`,
      routeData: mapRoutes[0].routes[0].overviewPath,
      time: 930, // 9h30m
      user: user.name,
    })

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

          <Col xs="auto">
            <Form.Control
              type="number"
              min="0"
              max="23"
              value={hours}
              placeholder="Hours"
              onChange={(e) => setHours(e.target.value)}
            />
          </Col>

          <Col xs="auto">
            <Form.Control
              type="number"
              min="0"
              max="59"
              value={minutes}
              placeholder="Minutes"
              onChange={(e) => setMinutes(e.target.value)}
            />
          </Col>

          <Col xs="auto">
            <Button variant="primary" type="submit">
              Check Route
            </Button>

            <Button
              variant="success"
              type="submit"
              onClick={saveRoute}
              disabled={isCreating}
            >
              Save Route
            </Button>
          </Col>
        </Row>
      </Form>
      <MapContainer routes={mapRoutes} />
    </>
  )
}
