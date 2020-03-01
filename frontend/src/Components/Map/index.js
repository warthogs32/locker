import React from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';


import './index.css';


const useStyles = makeStyles({
  root: {
    // width: "45%",
    margin: "1em"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


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

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div id="Map">
          <h2 className="center-text"
            style={{
              fontWeight: "normal"
            }}
          >
            Where is my Telementary Box?
          </h2>
          <p className="center-text">Real-time location tracking</p>
          
          <div style={{ height: '80%', width: '100%' }}>
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
      </CardContent>
    </Card>
  );
  
}

export default Map;
