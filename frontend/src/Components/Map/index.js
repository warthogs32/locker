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
    <div className="Map">
      <h2 className="text-align-center">Where is my Telementary Box?</h2>
      
      <div style={{ height: '40vh', width: '40%' }}>
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
