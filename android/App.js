import React from 'react';
// import Geolocation from 'react-native-geolocation-service';
// import {PermissionsAndroid} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

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
  }

  // state = {
  //   rounds: 16,
  //   size: new Animated.Value(20)
  // }

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


        // this.camera.capture()

        
        // setInterval(() => {
        //   console.log(this.camera); 

        //   // this.camera.capture()  
        //     .then(({ data }) => {
        //       // console.log('DATA', `data:image/jpg;base64,${data}`);
        //       console.log('DATA', data.length);
        //        //videoChannel.publish({ data: `data:image/jpg;base64,${data}` });
        //      })
        //     .catch(err => console.error(err));
        // }, 100);
  }  
  
//   <View>
//   <Text style={{
//     color: '#ff0000', 
//     fontWeight: 'bold', 
//     fontSize: 30,
//     textAlign: 'center'}}>state: location success</Text>
// </View>

  render() {
    if (this.state.hasPermission) {
      return (
        <View style={{flex: 1}}>
          <Camera style={{flex: 1}} type={this.state.type}>

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
