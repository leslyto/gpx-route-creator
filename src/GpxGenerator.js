import React, { useContext } from 'react'
import MapContext from "./MapContext"

const GpxGenerator = () => {
  const { markers, setMarkers } = useContext(MapContext)

  const createXmlString = () => {
    let coordinates = markers.map((marker, index) => `<rtept lat="${marker[0]}" lon="${marker[1]}"><name>Waypoint ${index}</name></rtept>`)
    var timestamp = new Date().toISOString()

    let result = 
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <gpx version="1.1" creator="https://mywebsite.com" xmlns="https://mywebsite.com">
      <metadata>
        <name>Route to GPX by Stefan Stoev</name>
        <link href="https://mywebsite.com">
          <text>Route to Gpx</text>
        </link>
        <time>${timestamp}</time>
        <copyright author="Stefan Stoev">
          <year>2020</year>
        </copyright>
      </metadata>
      <rte>
        ${coordinates}
      </rte>
    </gpx>`

    return result
  }
  
  const downloadGpxFile = () => {
    const xml = createXmlString()
    const url = `data:text/jsoncharset=utf-8, ${xml}`
    const link = document.createElement('a')
    link.download = 'myRoute.gpx'
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link);
  }

  return (
    <button className='download-btn' onClick={downloadGpxFile}> Download your Route </button>
  )
}

export default GpxGenerator