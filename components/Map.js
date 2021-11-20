import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'

import { generateRandomColor } from "lib/utils"

const initRenderer = (map, route) => {
  const path = route.routes[0].overview_path

  const svgMarkerStart = {
    path: "M 15 10 l -4 -4 l -1 1 l 3 3 l -3 3 l 1 1 z M 12 2.016 q 2.906 0 4.945 2.039 t 2.039 4.945 q 0 1.453 -0.727 3.328 t -1.758 3.516 t -2.039 3.07 t -1.711 2.273 l -0.75 0.797 q -0.281 -0.328 -0.75 -0.867 t -1.688 -2.156 t -2.133 -3.141 t -1.664 -3.445 t -0.75 -3.375 q 0 -2.906 2.039 -4.945 t 4.945 -2.039 z",
    fillColor: "blue",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.2,
    anchor: new window.google.maps.Point(12, 21),
  }

  const svgMarkerEnd = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "green",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.2,
    anchor: new window.google.maps.Point(12, 21),
  }

  const line = new window.google.maps.Polyline({
    path: path,
    strokeColor: generateRandomColor([false, false, false]),
    strokeOpacity: 0.9,
    strokeWeight: 3,
  })
  line.setMap(map)

  const startMarker = new window.google.maps.Marker({
    position: path[0],
    icon: svgMarkerStart,
  });

  const endMarker = new window.google.maps.Marker({
    position: path[path.length - 1],
    icon: svgMarkerEnd,
  });

  window.google.maps.event.addListener(line, 'mouseover', function() {
     console.log("Entered polyline");
     startMarker.setMap(map)
     endMarker.setMap(map)
  });

  window.google.maps.event.addListener(line, 'mouseout', function() {
    console.log("Left polyline");
    startMarker.setMap(null)
    endMarker.setMap(null)
  });
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
        initRenderer(map, routeData) // .setDirections(routeData)
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
