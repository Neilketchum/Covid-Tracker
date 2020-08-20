import React from 'react'
import './Map.css'
import {Map as LeafletMap,TileLayer} from 'react-leaflet'

// const position = [18.5204, 73.8567]
function Map({mapZoom,mapCenter}) {
    return (
        <div className = "map"> 
           <LeafletMap center = {mapCenter} zoom = {mapZoom}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
           </LeafletMap>
        </div>
    )
}

export default Map
