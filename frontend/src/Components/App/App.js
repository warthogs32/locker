import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';

import Navbar from '../Navbar';
import RealTimeImage from '../RealTimeImage';
import PrimaryControls from '../PrimaryControls';
import Map from '../Map';
import Highlights from '../Highlights';

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



const App = props => {
  const [ isDataLoaded, setIsDataLoaded ] = useState(false);
  const [ locationData, setLocationData ] = useState([]);
  const [ imageData, setImageData ] = useState([]);
  const [ lockState, setLockState ] = useState(true);
  const [ doorState, setDoorState ] = useState(true);
  const [ packageState, setPackageState ] = useState(true);

  const db = firebase.database();
  const dbRef = db.ref();

  // Subscribe state to rtdb on component mount
  useEffect(() => {
    dbRef.on('value', snapshot => {
      console.log(snapshot.val())
      if (!!snapshot.val()) {
        setIsDataLoaded(true);
        
        setLocationData(snapshot.val().location_data);
        setImageData(snapshot.val().image_data);
        setLockState(snapshot.val().boxLocked);
        setDoorState(snapshot.val().boxOpen);
        setPackageState(snapshot.val().boxFull);

      }
      
    });
  }, [])



  if (isDataLoaded) {
    return (
      <div className="App">
        <Navbar/>
        <div className="flex-container-center">
          <RealTimeImage imageData={imageData}/>
          <div>
            <PrimaryControls 
              db={db}
              lockState={lockState}
              doorState={doorState}
              packageState={packageState}/>
            <Map locationData={locationData}/>
          </div>
          <Highlights imageData={imageData}/>
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
