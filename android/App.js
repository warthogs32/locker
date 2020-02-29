import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNLocation from 'react-native-location';


export default function App() {
  console.log("locations")


  RNLocation.configure({
    distanceFilter: 5.0
  })
  
  RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse"
    }
  }).then(granted => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
          console.log(locations)
        })
      }
    })

  return (
    <View style={styles.container}>
      <Text>Acquiring data: GPS</Text>
      <Text>Acquiring data: GPS</Text>
      <Text>Acquiring data: GPS</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
