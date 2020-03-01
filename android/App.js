import React from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as firebase from 'firebase';
import ImageResizer from 'react-native-image-resizer';
import * as ImageManipulator from 'expo-image-manipulator';

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
const image_update_frequency = 20000;

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
// firebase.initializeApp(firebaseConfig);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.front,

      lng: 0, 
      lat: 0
    }

    this.takePhoto = async (callback) => {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync({
          // base64: true
        }).then((imgData) => {

          // console.log(resizedImg)

          // ImageResizer.createResizedImage('data:image/jpg' + data, 256, 512, "JPEG")

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

    // console.log("db ref:, " , dbRef);

    dbRef.on('value', snapshot => {
      // console.log(snapshot.val())
      if (!!snapshot.val()) {
        

      }
      
    });

    setInterval(() => {
      // Instead of navigator.geolocation, just use Geolocation.
      navigator.geolocation.getCurrentPosition(
        (position) => {
            let coords = position.coords

            console.log("THIS IS YOUR POSITION:");
            console.log("lon: ", coords.longitude);
            console.log("lat: ", coords.latitude);

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

          // console.log(resizedImgBase64)

          // db.ref('/image_data/{id}/img_src').putString(
          //   img, 'base64'
          // )

          // console.log(img)
          // console.log("length ", img.length())

          db.ref('image_data').push({
            img_src: resizedImgBase64
          });

        }
      );
    }, 5000)

  }      
  render() {
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
