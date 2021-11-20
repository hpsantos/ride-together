import { useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'

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
    await createRoute(mapRoutes[0])

    setIsCreating(false)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="mb-0">New Route</h1>
      </div>

      <Form variant="inline" onSubmit={calculateRoute}>
        <Row className="align-items-center mb-4">
          <Col xs="auto">
            <Row className="g-2">
              <Col xs="auto">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="From (e.g.: Viseu)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col xs="auto">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="To (e.g.: Leiria)"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Col>

          <Col xs="3">
            <SelectTime
              hours={hours}
              minutes={minutes}
              onHoursChange={setHours}
              onMinutesChange={setMinutes}
            />
          </Col>

          <Col xs="auto">
            <Button className="me-2" variant="secondary" type="submit">
              Verify
            </Button>

            <Button
              type="submit"
              className="px-4"
              onClick={saveRoute}
              disabled={isCreating}
            >
              Save Route
            </Button>
          </Col>
        </Row>
      </Form>

      <Map routes={mapRoutes} />
    </>
  )
}
