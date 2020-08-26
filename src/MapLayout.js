import React, { useContext }  from "react";
import { Map, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet'
import MapContext from "./MapContext";
import L from 'leaflet'

const MapLayout = () => {
  const { markers, setMarkers } = useContext(MapContext);

  const createMarker = (event) => {
    const clickedLocation = event.latlng
    if (!clickedLocation.lat || !clickedLocation.lng) return null

    setMarkers([...markers, [clickedLocation.lat, clickedLocation.lng]])
  }

  const getMarkerIcon = (waypointNumber) => {
    return L.divIcon({
      className: 'custom-icon',
      html: waypointNumber,
      iconAnchor: [10, 10],
      iconSize: [20, 20],
    })
  }

  return (
    <Map
      center={[42.69, 23.32]}
      zoom={13}
      onClick={createMarker}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map(( marker, index ) => (
        <Marker key={index} position={marker} icon={getMarkerIcon(index + 1)}>
          <Tooltip> Waypoint {index + 1} </Tooltip>
          <Popup> Waypoint {index + 1} </Popup>
        </Marker>
      ))}

      <Polyline positions={[markers]} color={'#2278C5'} weight={5}/>
    </Map>
  );
}

export default MapLayout;
