import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'

import { RouteDetailsModal } from '~components/RouteDetailsModal'

import { defaultMapConfigs, renderLine } from './helpers'

export const MapContent = ({ routes }) => {
  const ref = useRef(null)
  const [map, setMap] = useState(null)
  const [routeDetails, setRouteDetails] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, defaultMapConfigs)

      setMap(map)
    }

    const routeClicked = (index) => {
      setRouteDetails(routes[index])
    }

    if (map && routes) {
      routes.map(({ routeData }, index) => {
        renderLine(map, routeData, () => routeClicked(index))
      })
    }
  }, [ref, map, routes])

  return (
    <>
      <div style={{ height: '300px', width: '50%' }} ref={ref} />

      <RouteDetailsModal
        onClose={() => setRouteDetails(null)}
        data={routeDetails}
      />
    </>
  )
}

export const Map = (props) => {
  return (
    <Wrapper apiKey={'AIzaSyBV1iRYv9bARrGvtAq3a5tb86YRs6KMI8k'}>
      <MapContent {...props} />
    </Wrapper>
  )
}
