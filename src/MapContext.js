import React from "react";

const MapContext = React.createContext({
  markers: [],
  setMarkers: () => {},
});

export default MapContext;
