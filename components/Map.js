import { useState, useRef, useEffect } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"

const initRenderer = (map) => {
  var polylineOptionsActual = new google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 0.5,
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

  const renderRoute = (routeData) => {
    initRenderer(map).setDirections(routeData)
  }

  useEffect(() => {
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, {
        center: {
          lat: 39.74822149361863,
          lng: -8.805537440172467,
        },
        zoom: 10,
      })

      setMap(map)
    }

    if (map && routes) {
      routes.map(renderRoute)
    }
  }, [ref, map, routes])

  return <div style={{ height: "300px", width: "50%" }} ref={ref} />
}

export const MapContainer = (props) => {
  return (
    <Wrapper apiKey={"AIzaSyBV1iRYv9bARrGvtAq3a5tb86YRs6KMI8k"}>
      <Map {...props} />
    </Wrapper>
  )
}
