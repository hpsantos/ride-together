import { useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

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
        <h1>Welcome to Ride Together!</h1>
        <p className="lead text-muted">
          Get started by searching for routes below
        </p>
      </div>
      <Row className="justify-content-center my-3">
        <Col xs="auto" sm="3">
          <SelectTime onHoursChange={setHours} onMinutesChange={setMinutes} />
        </Col>
        <Col xs="auto">
          <Button onClick={searchRoutes} className="px-5">
            <i className="bi-search"></i> &nbsp;Search
          </Button>
        </Col>
      </Row>
      <Map routes={routes} onMapClick={handleMapClick} />
    </>
  )
}
