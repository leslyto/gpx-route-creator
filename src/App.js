import React, { useState, useMemo } from 'react'
import './App.css'
import Sidebar from './Sidebar'
import MapLayout from './MapLayout'
import MapContext from './MapContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  const [markers, setMarkers] = useState([])
  const value = useMemo (() => ({ markers, setMarkers }), [markers, setMarkers])

  return (
    <React.Fragment>
      <MapContext.Provider value={value}>
        <DndProvider backend={HTML5Backend}>
          <Sidebar/>
        </DndProvider>
        <MapLayout/>
      </MapContext.Provider>
    </React.Fragment>
  );
}

export default App;
