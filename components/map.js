import { useState, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export const Map = () => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: {
            lat: 40,
            lng: -7,
          },
          zoom: 10,
        })
      );
    }
  }, [ref, map]);

  return <div style={{ height: "500px", width: "100%" }} ref={ref} />;
};

const render = (status) => {
  return <h1>{status}</h1>;
};

export const MapContainer = () => {
  return (
    <Wrapper apiKey={"AIzaSyBV1iRYv9bARrGvtAq3a5tb86YRs6KMI8k"} render={render}>
      <Map />
    </Wrapper>
  );
};
