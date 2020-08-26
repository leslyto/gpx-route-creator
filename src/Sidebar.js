import React, { useContext } from 'react'
import MapContext from "./MapContext"
import Waypoint from "./Waypoint"
import GpxGenerator from "./GpxGenerator"
import trashIcon from './assets/trash.png'

const Sidebar = () => {
  const { markers, setMarkers } = useContext(MapContext)

  const deleteMarker = (index) => {
    let updatedMarkers = [...markers]
    updatedMarkers.splice(index, 1)
    setMarkers(updatedMarkers)
  }

  const rearrangeWaypoint = (dragIndex, hoverIndex) => {
    const draggedWaypoint = markers[dragIndex] // get the selected waypoint
    let updatedMarkers = [...markers] // make a clone of the markers array
    updatedMarkers.splice(dragIndex, 1) // remove the selected waypoint from the array.
    updatedMarkers.splice(hoverIndex, 0, draggedWaypoint) // insert it into hoverIndex.
    setMarkers(updatedMarkers) // update the state with rearranged waypoints 
  }
  
  return (
    <React.Fragment>
      <div className='sidebar'>
        <h2>Route Builder</h2>
        <ul>
          {markers.map((marker, index) => (
            <Waypoint
              key={index}
              index={index}
              text={`Waypoint ${index + 1}`}
              rearrangeWaypoint={rearrangeWaypoint}
              deleteMarker={deleteMarker}
            />
          ))}
        </ul>
        <GpxGenerator />
      </div>
    </React.Fragment>
  )
}

export default Sidebar




// {markers.map((marker, index) => (
//   <li key={index}>
//     <span> Waypoint {index + 1} </span>
//     <button onClick={() => deleteMarker(index)}>
//       <img src={trashIcon} alt="Trash icon"></img>
//     </button>
//   </li>
// ))}

  {/* <button onClick={() => deleteMarker(index)}>
                <img src={trashIcon} alt="Trash icon"></img>
              </button> */}