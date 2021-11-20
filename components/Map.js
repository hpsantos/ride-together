import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'

import { generateRandomColor } from "lib/utils"

const initRenderer = (map) => {
  var polylineOptionsActual = new window.google.maps.Polyline({
    strokeColor: generateRandomColor([false, false, false]),
    strokeOpacity: 0.9,
    strokeWeight: 3,
  })

  return new window.google.maps.DirectionsRenderer({
    map,
    preserveViewport: true,
    suppressMarkers: true,
    polylineOptions: polylineOptionsActual,
  })
}

export const Map = ({ routes }) => {
  const ref = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, {
        center: {
          lat: 39.74822149361863,
          lng: -8.805537440172467,
        },
        zoom: 13,
        styles: [
          {
            featureType: "all",
            stylers: [{ saturation: -15 }],
          },
          {
            featureType: "poi",
            stylers: [{ saturation: -50, weight: 1 }],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      setMap(map)
    }

    if (map && routes) {
      routes.map((routeData) => {
        initRenderer(map).setDirections(routeData)
      })
    }
  }, [ref, map, routes])

  return <div style={{ height: '300px', width: '50%' }} ref={ref} />
}

export const MapContainer = (props) => {
  return (
    <Wrapper apiKey={'AIzaSyBV1iRYv9bARrGvtAq3a5tb86YRs6KMI8k'}>
      <Map {...props} />
    </Wrapper>
  )
}
