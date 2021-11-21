import { useState } from 'react'
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap'

import { Map } from '~components/map/Map'
import { SelectTime } from '~components/SelectTime'
import { useAuth } from '~context/auth'
import { createRoute } from '~services/routes'

export default function NewRoute() {
  const initialState = {
    from: 'Viseu',
    to: 'Leiria',
    hours: '9',
    minutes: '00',
  }
  const { user } = useAuth()
  const [from, setFrom] = useState(() => initialState.from)
  const [to, setTo] = useState(() => initialState.to)
  const [hours, setHours] = useState(initialState.hours)
  const [minutes, setMinutes] = useState(initialState.minutes)
  const [mapRoutes, setMapRoutes] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [alert, setAlert] = useState(null)

  const buildRoute = (routePath) => ({
    from,
    to,
    name: `Trip from ${from} to ${to}`,
    routeData: routePath,
    time: parseInt(`${hours}${minutes}`), // 9h30m
    user: user.name,
  })

  const resetFormState = () => {
    setFrom(initialState.from)
    setTo(initialState.to)
    setHours(initialState.hours)
    setMinutes(initialState.minutes)
    setMapRoutes([])
  }

  const showAlert = (message, variant = 'success') => {
    setAlert({ variant, message })

    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }

  const calculateRoute = (event) => {
    event.preventDefault()

    if (!from || !to) {
      alert('Please provide source & destination.')
      return
    }

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

    showAlert('Route saved successfully')
    resetFormState()
    setIsCreating(false)
  }

  return (
    <>
      <Alert show={alert !== null} variant={alert && alert.variant}>
        {alert && alert.message}
      </Alert>

      <div className="mb-4">
        <h1 className="mb-0">New Route</h1>
      </div>
      <Form variant="inline" onSubmit={calculateRoute}>
        <Row className="align-items-center mb-4">
          <Col xs="auto">
            <Row className="g-2">
              <Col xs="auto">
                <InputGroup>
                  <InputGroup.Text>From</InputGroup.Text>
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
                  <InputGroup.Text>To</InputGroup.Text>
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
              <i className="bi-check-lg"></i>&nbsp; Verify
            </Button>

            <Button
              type="submit"
              className="px-4"
              onClick={saveRoute}
              disabled={isCreating}
            >
              <i className="bi-plus-lg"></i>&nbsp; Save Route
            </Button>
          </Col>
        </Row>
      </Form>
      <Map routes={mapRoutes} />
    </>
  )
}
