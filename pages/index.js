import { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import { defaultMarkerConfig } from '~components/map/helpers'
import { Map } from '~components/map/Map'
import { SelectTime } from '~components/SelectTime'
import { useDebounce } from '~lib/utils'
import { fetchRoutes } from '~services/routes'

export default function Home() {
  const currentMarker = useRef(null)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [range, setRange] = useState(0)
  const [routes, setRoutes] = useState([])

  const getMapRadius = (range) => {
    return 0.001 + range / 1000
  }

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
      icon: defaultMarkerConfig(),
      map,
    })

    fetchRoutesByPosition({
      lat: position.lat(),
      lng: position.lng(),
      radius: getMapRadius(range),
    })
  }
  const debouncedRange = useDebounce(range, 500)

  // Effect for API call
  useEffect(
    () => {
      if (debouncedRange) {
        fetchRoutesByPosition({
          lat: currentMarker.current.position.lat(),
          lng: currentMarker.current.position.lng(),
          radius: getMapRadius(debouncedRange),
        })
      }
    },
    [debouncedRange] // Only call effect if debounced search term changes
  )

  const updateRange = (event) => {
    setRange(event.target.value)
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
          <Form.Range
            disabled={currentMarker.current === null}
            value={range}
            onChange={updateRange}
            min="0"
            max="25"
          />
        </Col>
      </Row>
      <Map routes={routes} onMapClick={handleMapClick} />
    </>
  )
}
