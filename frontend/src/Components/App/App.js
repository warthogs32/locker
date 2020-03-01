import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';

import Navbar from '../Navbar';

import './App.css';



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
  const [ locationData, setLocationData ] = useState({});
  const [ imageData, setImageData ] = useState({});

  // Subscribe state to rtdb on component mount
  useEffect(() => {
    const db = firebase.database();
    const dbRef = db.ref();

    dbRef.on('value', snapshot => {
      setLocationData(snapshot.val().geo_data);
      setImageData(snapshot.val().image_data);
    })
  }, [])

  console.log(locationData)
  console.log(imageData)


  return (
    <div className="App">
      <Navbar/>

      App
    </div>
  );
}

export default App;
