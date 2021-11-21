import { useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import { Map } from '~components/map/Map'
import { SelectTime } from '~components/SelectTime'
import { fetchRoutes } from '~services/routes'

export default function Home() {
  const currentMarker = useRef(null)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')

  const [routes, setRoutes] = useState([])

  const searchRoutes = async () => {
    const response = await fetchRoutes({ time: `${hours}${minutes}` })
    setRoutes(response.data)
  }

  const handleMapClick = (map, clickEvent) => {
    const position = clickEvent.latLng

    if (currentMarker.current) {
      currentMarker.current.setMap(null)
    }

    currentMarker.current = new window.google.maps.Marker({
      position: clickEvent.latLng,
      map,
    })

    fetchRoutesByPosition({ lat: position.lat(), lng: position.lng() })
  }

  const fetchRoutesByPosition = async ({ lat, lng }) => {
    console.log('fetchRoutesByPosition', lat, lng)
    const response = await fetchRoutes()
    setRoutes(response.data)
  }

  return (
    <>
      <div className="text-center">
        <h2>
          Welcome to Ride<strong>Together</strong>!
        </h2>
        <p className="lead text-muted">
          Get started by searching for routes below
        </p>
      </div>
      <Row className="align-items-center mt-5 mb-3">
        <Col xs="10">
          <Row className="align-items-end">
            <Col xs="6">
              <SelectTime
                onHoursChange={setHours}
                onMinutesChange={setMinutes}
              />
            </Col>
            <Col xs="auto">
              <Button onClick={searchRoutes} className="px-5">
                <i className="bi-search"></i> &nbsp;Search
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs="2">
          <Form.Label className="small mb-0">Distance radius</Form.Label>
          <Form.Range min="0" max="25" />
        </Col>
      </Row>
      <Map routes={routes} onMapClick={handleMapClick} />
    </>
  )
}
