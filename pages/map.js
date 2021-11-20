import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import { Map } from '../components/map'
import { dummyRouteData1, dummyRouteData2 } from '../lib/dummy'

export default function MapPage() {
  const [from, setFrom] = useState(() => 'Viseu')
  const [to, setTo] = useState(() => 'Leiria')

  const routeData1 = dummyRouteData1
  const routeData2 = dummyRouteData2

  const [mapRoutes, setMapRoutes] = useState([routeData1, routeData2])

  // fetchRoutes().then((routesResponse) => {
  //   setMapRoutes(routesResponse.data)
  // })

  const calculateRoute = (event) => {
    event.preventDefault()

    if (!from || !to) {
      alert('Please provide source & destination.')
    }

    const directionsService = new window.google.maps.DirectionsService()

    const gmapData = {
      origin: from,
      destination: to,
      travelMode: 'DRIVING',
    }

    directionsService.route(gmapData, function (result, status) {
      if (status == 'OK') {
        setMapRoutes([...mapRoutes, result])
      }
    })
  }

  return (
    <>
      <h1>Map test</h1>
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
            <Button variant="primary" type="submit">
              Check Route
            </Button>

            <Button variant="success" type="submit">
              Save Route
            </Button>
          </Col>
        </Row>
      </Form>
      <Map routes={mapRoutes} />
    </>
  )
}
