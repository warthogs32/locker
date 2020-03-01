import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import GoogleMapReact from 'google-map-react';

import Navbar from '../Navbar';

import './App.css';


// Firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDXHTIuyXFoHfzDM0nkRmkVMEa2B2H8hxY",
  authDomain: "slohacks-269509.firebaseapp.com",
  databaseURL: "https://slohacks-269509.firebaseio.com",
  projectId: "slohacks-269509",
  storageBucket: "slohacks-269509.appspot.com",
  messagingSenderId: "622446993760",
  appId: "1:622446993760:web:8d97fad7d5536ffeec3e05",
  measurementId: "G-79BT5R74K9"
};

firebase.initializeApp(firebaseConfig);


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



const App = props => {
  const [ isDataLoaded, setIsDataLoaded ] = useState(false);
  const [ locationData, setLocationData ] = useState([]);
  const [ imageData, setImageData ] = useState([]);

  // Subscribe state to rtdb on component mount
  useEffect(() => {
    const db = firebase.database();
    const dbRef = db.ref();

    dbRef.on('value', snapshot => {
      console.log(snapshot.val())
      if (!!snapshot.val()) {
        console.log("here")

        setIsDataLoaded(true);

        setLocationData(snapshot.val().location_data);
        setImageData(snapshot.val().image_data);

        console.log(snapshot.val())

      }
      
    });
  }, [])



  if (isDataLoaded) {
    console.log("location: ", locationData)
    console.log("location: ", imageData)

    return (
      <div className="App">
        <Navbar/>

        {/* Map */}
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ 
              key: "AIzaSyDGzlHi8HcYiGxpyLlO8LhLhtaiWlMzJw0"
            }}
            defaultCenter={locationData}
            defaultZoom={10}
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

  return (
    <div>
      Loading
    </div>
  )
}

export default App;
