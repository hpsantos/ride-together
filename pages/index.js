import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import { Map } from '~components/map/Map'
import { SelectTime } from '~components/SelectTime'
import { fetchRoutes } from '~services/routes'

export default function Home() {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')

  const [routes, setRoutes] = useState([])
  const [routeDataCollection, setRouteDataCollection] = useState([])

  const searchRoutes = async () => {
    const response = await fetchRoutes({ time: `${hours}${minutes}` })

    setRoutes(response.data)
    setRouteDataCollection(response.data.map((route) => route.routeData))
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
      <Map routes={routeDataCollection} />
    </>
  )
}
