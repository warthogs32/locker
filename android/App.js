import React from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as firebase from 'firebase';

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


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.front
    }

    this.takePhoto = async () => {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync({
          base64: true
        }).then(data => {
          console.log(data)
        })
      }
    }
  }


  async componentDidMount() {
    // Instead of navigator.geolocation, just use Geolocation.
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("THIS IS YOUR POSITION:");
            console.log(position);
        },
        (error) => {
            // See error code charts below.
            console.log("HANDLED ERR", error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasPermission: status === "granted"})

    setTimeout(this.takePhoto, 15000)
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
