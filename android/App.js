import React, { useState } from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as firebase from 'firebase';
import ImageResizer from 'react-native-image-resizer';
import * as ImageManipulator from 'expo-image-manipulator';
import { Accelerometer } from 'expo-sensors'; 

import {
  View,
  AppRegistry,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';

//define how often data is sent to the database in milliseconds
const location_update_frequency = 5000;
const image_update_frequency = 5000;
const accel_update_frequency = 2000;

let firebaseConfig = {
  apiKey: "AIzaSyDXHTIuyXFoHfzDM0nkRmkVMEa2B2H8hxY",
  authDomain: "slohacks-269509.firebaseapp.com",
  databaseURL: "https://slohacks-269509.firebaseio.com",
  projectId: "slohacks-269509",
  storageBucket: "slohacks-269509.appspot.com",
  messagingSenderId: "622446993760",
  appId: "1:622446993760:web:5db59aceda90bf6bec3e05",
  measurementId: "G-VJN70F6YHT"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.front,
      lng: 0, 
      lat: 0,
      accel_data: 0
    }

    this.takePhoto = async (callback) => {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync({
        }).then((imgData) => {

          callback(imgData)
        })
      }
    }


  }


  async componentDidMount() {

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasPermission: status === "granted"})

    // setTimeout(this.takePhoto, 15000)

    const db = firebase.database();
    const dbRef = db.ref();

    dbRef.on('value', snapshot => {
      if (!!snapshot.val()) {
        

      }
      
    });

    setInterval(() => {
      // Instead of navigator.geolocation, just use Geolocation.
      navigator.geolocation.getCurrentPosition(
        (position) => {
            let coords = position.coords

            console.log("THIS IS YOUR POSITION:");
            // console.log("lon: ", coords.longitude);
            // console.log("lat: ", coords.latitude);

            db.ref('/location_data').set({
              lng: coords.longitude,
              lat: coords.latitude
            })
        },
        (error) => {
            // See error code charts below.
            console.log("HANDLED ERR", error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }, location_update_frequency)

    setInterval(() => {
      this.takePhoto(
        async (img) => {
          const resizedImg = await ImageManipulator.manipulateAsync(
            img.uri, 
            [{
              resize: {
                width: 500,
                height: 500
              }
            }], 
            {
              format: "jpeg",
              base64: true
            })

          const resizedImgBase64 = resizedImg.base64

          db.ref('image_data').push({
            img_src: resizedImgBase64
          });

        }
      );
    }, image_update_frequency)

    

    setInterval(() => {
      console.log("here is accel")
      console.log(this.state.accel_data)
      db.ref('accel_data').set({
        x: this.state.accel_data.x, 
        y: this.state.accel_data.y,
        z: this.state.accel_data.z
      })
    }, accel_update_frequency)

  //get accelerometer data
  
  Accelerometer.setUpdateInterval(16);
  this._subscription = Accelerometer.addListener(accelerometerData =>     {
    this.setState({accel_data: accelerometerData})
  });

  // let { x, y, z } = accel_data;  
  }

  render() {

    // console.log("ACCEL DATA");
    // console.log(this.state);  
    if (this.state.hasPermission) {
      return (
        <View style={{flex: 1}}>
          <Camera style={{flex: 1}} type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}

          >

          </Camera>
        </View> 
      );


    }

    return (
      <View style={styles.container}>
        <Text>No permission</Text>
      </View> 
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

AppRegistry.registerComponent('App', () => App);
