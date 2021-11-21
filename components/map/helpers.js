import { getColorList } from '~lib/utils'

export const defaultMapConfigs = {
  center: {
    lat: 39.74822149361863,
    lng: -8.805537440172467,
  },
  zoom: 13,
  styles: [
    {
      featureType: 'all',
      stylers: [{ saturation: -75 }],
    },
    {
      featureType: 'poi',
      stylers: [{ saturation: -25, weight: 1 }],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
  ],
  mapTypeControl: false,
  streetViewControl: false,
  controlSize: 24,
}

export const defaultMarkerConfig = () => ({
  path: 'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z',
  fillColor: '#dd3444',
  fillOpacity: 1,
  strokeColor: '#ffffff',
  strokeWeight: 1,
  rotation: 0,
  scale: 1.5,
  anchor: new window.google.maps.Point(12, 21),
})

export const renderLine = (map, route, setRouteDetails, index) => {
  const line = new window.google.maps.Polyline({
    path: route,
    strokeColor: getColorList()[index],
    strokeOpacity: 0.9,
    strokeWeight: 3,
    map,
  })

  const startMarkerIcon = 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0'

  const startMarker = new window.google.maps.Marker({
    position: route[0],
    icon: {
      path: startMarkerIcon,
      fillColor: '#666666',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 1,
      rotation: 0,
      scale: 0.35,
      anchor: new window.google.maps.Point(12, 21),
    },
  })

  const endMarker = new window.google.maps.Marker({
    position: route[route.length - 1],
    icon: defaultMarkerConfig(),
  })

  window.google.maps.event.addListener(line, 'click', function () {
    setRouteDetails()
  })

  window.google.maps.event.addListener(line, 'mouseover', function () {
    startMarker.setMap(map)
    endMarker.setMap(map)
  })

  window.google.maps.event.addListener(line, 'mouseout', function () {
    startMarker.setMap(null)
    endMarker.setMap(null)
  })

  return line
}
