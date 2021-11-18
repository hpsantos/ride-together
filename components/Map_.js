import { useState, useRef, useEffect } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"

export const Map = ({ route }) => {
  const ref = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: {
            lat: 40.7,
            lng: -7.9,
          },
          zoom: 10,
        })
      )
    }
  }, [ref, map])

  useEffect(() => {
    if (map && route && route.from && route.to) {
      const directionsService = new window.google.maps.DirectionsService()
      const directionsRenderer = new window.google.maps.DirectionsRenderer()
      directionsRenderer.setMap(map)

      const gmapData = {
        origin: route.from,
        destination: route.to,
        travelMode: "DRIVING",
      }
      directionsService.route(gmapData, function (result, status) {
        if (status == "OK") {
          directionsRenderer.setDirections(result)
        }
      })
    }
  }, [map, route])

  return <div style={{ height: "300px", width: "50%" }} ref={ref} />
}

export const MapContainer = (props) => {
  return (
    <Wrapper apiKey={"AIzaSyBV1iRYv9bARrGvtAq3a5tb86YRs6KMI8k"}>
      <Map {...props} />
    </Wrapper>
  )
}
