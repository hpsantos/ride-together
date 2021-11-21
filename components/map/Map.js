import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'

import { RouteDetailsModal } from '~components/RouteDetailsModal'

import { defaultMapConfigs, renderLine } from './helpers'

export const MapContent = ({ routes, onMapClick }) => {
  const ref = useRef(null)
  const listeners = useRef([])
  const lines = useRef([])
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

    if (map) {
      if (onMapClick) {
        listeners.current.push(
          window.google.maps.event.addListener(map, 'click', (event) => {
            onMapClick(map, event)
          })
        )
      }

      lines.current.map((line) => line.setMap(null))
      if (routes) {
        routes.map(({ routeData }, index) => {
          lines.current.push(
            renderLine(map, routeData, () => routeClicked(index), index)
          )
        })

        return () => {
          listeners.current.map((listener) =>
            window.google.maps.event.removeListener(listener)
          )
        }
      }
    }
  }, [ref, map, routes, onMapClick])

  return (
    <>
      <div
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        ref={ref}
      />
      <RouteDetailsModal
        onClose={() => setRouteDetails(null)}
        data={routeDetails}
      />
    </>
  )
}

export const Map = (props) => {
  return (
    <Wrapper apiKey={'YOUR_API_KEY_HERE'}>
      <MapContent {...props} />
    </Wrapper>
  )
}
