import React from 'react';
import GoogleMapReact from 'google-map-react';

import './index.css';



// Marker for map
const Marker = (props) => {
  const { color, name, id } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer'}}
      title={name}
    />
  );
};



const Map = props => {
  const { locationData } = props;

  return (
    <div id="Map">
      <h2 className="center-text"
        style={{
          fontWeight: "normal"
        }}
      >
        Where is my Telementary Box?
      </h2>
      <p className="center-text">Real-time location tracking</p>
      
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: "AIzaSyDGzlHi8HcYiGxpyLlO8LhLhtaiWlMzJw0"
          }}
          defaultCenter={locationData}
          defaultZoom={15}
        >
          <Marker
            lat={locationData.lat}
            lng={locationData.lng}
            text=""
          />
        </GoogleMapReact>
      </div>


    </div>
  );
  
}

export default Map;
