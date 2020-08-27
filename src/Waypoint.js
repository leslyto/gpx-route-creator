import React, { useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import sandwichIcon from './assets/sandwich.png'
import trashIcon from './assets/trash.png'

const Waypoint = React.forwardRef(
  ({ text, index, deleteMarker, isDragging, connectDragSource, connectDropTarget, hovered }, ref) => {

    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));
    
    return (
      <li ref={elementRef} className='item' style={{ opacity, color: hovered && "#b1b1b1" }}>
        <img src={sandwichIcon} width={20} height={20} alt="Rearrange icon"></img>
        <span>{text}</span>
        <button onClick={() => deleteMarker(index)}>
          <img src={trashIcon} alt="Trash icon"></img>
        </button>
      </li>
    );
  }
);

export default DropTarget(
  'waypoint',
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();

      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;

      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      props.rearrangeWaypoint(dragIndex, hoverIndex);
   
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    },

  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
  })
)(
  DragSource(
    'waypoint',
    {
      beginDrag: (props) => { 

        return ({
        id: props.index,
        index: props.index
      }) }

      
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Waypoint)
);
