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

    fetchRoutesByPosition({
      lat: position.lat(),
      lng: position.lng(),
      radius: 0.001,
    })
  }

  const fetchRoutesByPosition = async ({
    lat: markerLat,
    lng: markerLng,
    radius,
  }) => {
    const response = await fetchRoutes()
    const closestRoutes = response.data.filter(({ routeData }) => {
      return routeData.some(
        ({ lat, lng }) =>
          lat < markerLat + radius &&
          lat > markerLat - radius &&
          lng < markerLng + radius &&
          lng > markerLng - radius
      )
    })
    setRoutes(closestRoutes)
  }

  return (
    <>
      <div className="text-center">
        <h2>
          Welcome to Ride<strong>Together!</strong>
        </h2>
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
